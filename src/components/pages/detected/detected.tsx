import { useEffect, useState } from 'react';
import Footer from '../../fragments/dashboard/footer';
import { useLogin } from '@/hooks/useLogin';
import NavbarPanoramic from '../../fragments/panoramic/navbarPanoramic';
import { Button } from '@/components/elements/button';
import { useNavigate, useParams } from 'react-router-dom';
import arrowBack from '@/assets/arrow.png';
import { GetPanoramicByNoRm } from '@/services/user.services';
import { toast } from 'sonner';
import { GetDetected, PutDetection } from '@/services/detected.services';
import Lottie from 'lottie-react';
import loading from '@/assets/loading.json';

const DetectedPage = () => {
    const Navigate = useNavigate();
    const { no_rm } = useParams<{ no_rm: string }>();
    const [noRm, setNoRm] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [selectedUrlImage, setSelectedUrlImage] = useState<string | null>(null);
    const [dataDetected, setDataDetected] = useState<DetectedImage | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [useSquared, setUseSquared] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [selectedTN, setSelectedTN] = useState<string>('');
    const [selectedDiagnosis, setSelectedDiagnosis] = useState<string>('');
    const [zoomLevel, setZoomLevel] = useState<number>(1);

    useLogin();

    interface DetectedProps {
        id: number;
        id_user: number;
        no_rm: string;
        name_patient: string;
        image_url: string;
    }

    interface DetectedImage {
        id: number;
        id_panoramic_image: number;
        detected_image_url: string;
        result_detection_images: {
            [key: string]: {
                cropped_image_url: string;
                cropped_squared_image_url: string;
                detection_desease_result: string;
            };
        };
    }

    const isValidPanoramicImage = (res: unknown): res is DetectedProps => {
        return (
            typeof res === 'object' &&
            res !== null &&
            'no_rm' in res &&
            'name_patient' in res &&
            'image_url' in res
        );
    };

    const openModal = (imageUrl: string, toothNumber: string, diagnosis: string) => {
        setSelectedImage(imageUrl);
        setSelectedTN(toothNumber);
        setSelectedDiagnosis(diagnosis);
        setZoomLevel(1);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTN('');
        setSelectedDiagnosis('');
        setSelectedImage('');
        setZoomLevel(1);
    };

    const toggleZoom = () => {
        setZoomLevel((prev) => (prev === 1 ? 2 : 1));
    };

    // Update selectedImage when useSquared changes
    useEffect(() => {
        if (isModalOpen && selectedTN && dataDetected) {
            const imageData = dataDetected.result_detection_images[selectedTN];
            if (imageData) {
                setSelectedImage(
                    `http://localhost:8000${useSquared ? imageData.cropped_squared_image_url : imageData.cropped_image_url}`
                );
            }
        }
    }, [useSquared, isModalOpen, selectedTN, dataDetected]);

    useEffect(() => {
        if (!no_rm) return;
        console.log('Current no_rm:', no_rm);
        setIsLoading(true);
        setDataDetected(null);
        setNoRm('');
        setName('');
        setSelectedUrlImage(null);

        let isMounted = true;

        GetPanoramicByNoRm({
            no_rm,
            callback: (success, res) => {
                console.log('GetPanoramicByNoRm Response:', res);
                if (isMounted && success && isValidPanoramicImage(res)) {
                    setNoRm(res.no_rm || '');
                    setName(res.name_patient || '');
                    setSelectedUrlImage(res.image_url || null);
                } else if (isMounted && !success) {
                    toast.error('Failed to load panoramic images');
                    console.error('GetPanoramicByNoRm Error:', res);
                } else if (isMounted) {
                    toast.error('Invalid data format from API');
                    console.error('Unexpected response:', res);
                }
            },
        }).then(() => {
            GetDetected({
                no_rm,
                callback: (success, res) => {
                    console.log('GetDetected Response for no_rm:', no_rm, res);
                    if (isMounted && success && isValidDetectedImage(res)) {
                        setDataDetected(res);
                    } else if (isMounted && !success) {
                        console.error('GetDetected Error:', res);
                        toast.error('Failed to load detected images');
                    } else if (isMounted) {
                        console.error('Unexpected response format:', res);
                        toast.error('Invalid detected image data');
                    }
                    if (isMounted) setIsLoading(false);
                },
            });
        });

        return () => {
            isMounted = false;
        };
    }, [no_rm]);
    // Add type guard
    const isValidDetectedImage = (res: unknown): res is DetectedImage => {
        return (
            typeof res === 'object' &&
            res !== null &&
            'id' in res &&
            'id_panoramic_image' in res &&
            'detected_image_url' in res &&
            'result_detection_images' in res
        );
    };

    const handleDetect = () => {
        setIsLoading(true);
        PutDetection({
            no_rm: noRm,
            callback: (success, res) => {
                if (success) {
                    if (res && typeof res === 'object' && 'id_panoramic_image' in res) {
                        setDataDetected(res as DetectedImage);
                        setIsLoading(false);
                    } else {
                        console.error('Unexpected response format:', res);
                        setIsLoading(false);
                    }
                } else {
                    console.error(res);
                    setIsLoading(false);
                }
            },
        });
    };

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <Lottie animationData={loading} className="w-48 h-48" />
                        <p className="mt-4 text-gray-700 font-semibold">Processing Detection...</p>
                    </div>
                </div>
            )}
            <NavbarPanoramic />
            <main className="pt-20 p-10">
                <section>
                    <div className="flex w-1/5 justify-between mb-2">
                        <button
                            onClick={() => Navigate('/panoramic', { replace: true })}
                            className="bg-white text-blue-600 font-semibold px-3 py-1 rounded-lg shadow-md hover:bg-blue-100 flex items-center gap-2 hover:cursor-pointer"
                        >
                            <img src={arrowBack} alt="back" className="w-4 h-4 object-cover" />
                            Back
                        </button>
                    </div>
                    <div className="w-full md:w-1/2 text-left md:text-left">
                        <p className="mt-3 text-gray-900">Name: {name}</p>
                        <p className="mt-3 text-gray-900">Medical Record Number: {noRm}</p>
                    </div>
                </section>
                <section>
                    <hr className="border border-gray-300 mt-6 mb-2" />
                    <div className="flex flex-col w-full justify-between">
                        <div className="w-full flex justify-center">
                            <img
                                src={selectedUrlImage ?? undefined}
                                alt={selectedUrlImage ?? 'Image'}
                                className="rounded-t-lg p-8 w-3/5 object-cover"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button className="px-10 mb-5" variant="auth" onClick={handleDetect}>
                                Detected Image
                            </Button>
                        </div>
                    </div>
                </section>
                <section>
                    {!isLoading && dataDetected && (
                        <div className="mt-10">
                            <div className="w-full flex justify-center mb-5">
                                <img
                                    src={`http://localhost:8000${dataDetected.detected_image_url}`}
                                    alt="Detected Image"
                                    className="rounded-lg w-3/5 object-cover"
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <label className="text-sm font-medium text-gray-700">Squared Image</label>
                                <input
                                    type="checkbox"
                                    checked={useSquared}
                                    onChange={() => setUseSquared(!useSquared)}
                                    className="toggle-checkbox"
                                />
                            </div>
                            <hr className="border border-gray-300 mt-6 mb-2" />
                            <div className="overflow-x-auto">
                                <table className="w-full border border-gray-200 rounded-lg shadow-md">
                                    <thead className="bg-gray-100 text-gray-700">
                                        <tr>
                                            <th className="px-4 py-2 border">No</th>
                                            <th className="px-4 py-2 border">Tooth Number</th>
                                            <th className="px-4 py-2 border">Image</th>
                                            <th className="px-4 py-2 border">Diagnosis</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(dataDetected?.result_detection_images || {})
                                            .map(([toothNumber, value]) => ({ toothNumber, ...value }))
                                            .sort(
                                                (a, b) =>
                                                    parseInt(a.toothNumber.split('_')[1]) -
                                                    parseInt(b.toothNumber.split('_')[1])
                                            )
                                            .map((item, index) => (
                                                <tr
                                                    key={item.toothNumber}
                                                    className="text-center border-b hover:bg-gray-100"
                                                >
                                                    <td className="px-4 py-2 border">{index + 1}</td>
                                                    <td className="px-4 py-2 border">{item.toothNumber}</td>
                                                    <td className="px-4 py-2 border">
                                                        <img
                                                            src={`http://localhost:8000${useSquared
                                                                ? item.cropped_squared_image_url
                                                                : item.cropped_image_url
                                                                }`}
                                                            className="h-20 mx-auto rounded w-auto object-contain cursor-pointer"
                                                            alt={`Tooth ${item.toothNumber}`}
                                                            onClick={() =>
                                                                openModal(
                                                                    `http://localhost:8000${useSquared
                                                                        ? item.cropped_squared_image_url
                                                                        : item.cropped_image_url
                                                                    }`,
                                                                    item.toothNumber,
                                                                    item.detection_desease_result
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 border">{item.detection_desease_result}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </section>
            </main>

            {/* Card-Style Modal for Zoomable Image */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-white rounded-lg shadow-xl w-fit"
                        style={{
                            transform: `scale(${zoomLevel})`,
                            transition: 'transform 0.2s',
                            padding: '16px',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-row items-start">
                            <img
                                src={selectedImage}
                                className="max-w-full max-h-[80vh] object-contain rounded"
                                alt="Zoomed Tooth"
                                onClick={toggleZoom}
                            />
                            <div className="flex flex-col pl-4 pr-4">
                                <p className="mt-3 text-gray-900">Tooth Number: {selectedTN}</p>
                                <p className="mt-3 text-gray-900">Diagnosis: {selectedDiagnosis}</p>
                                <div className="flex items-center gap-2 mt-4">
                                    <label className="text-sm font-medium text-gray-700">Squared Image</label>
                                    <input
                                        type="checkbox"
                                        checked={useSquared}
                                        onChange={() => setUseSquared(!useSquared)}
                                        className="toggle-checkbox"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default DetectedPage;