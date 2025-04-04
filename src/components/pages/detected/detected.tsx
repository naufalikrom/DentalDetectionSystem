
import Footer from "../../fragments/dashboard/footer"
import { useLogin } from "@/hooks/useLogin";
import NavbarPanoramic from "../../fragments/panoramic/navbarPanoramic";
import { Button } from "@/components/elements/button";
import { useNavigate, useParams } from "react-router-dom";
import arrowBack from '@/assets/arrow.png';
import { useEffect, useState } from "react";
import { GetPanoramicByNoRm } from "@/services/user.services";
import { toast } from "sonner";
import { GetDetected, PutDetection } from "@/services/detected.services";


const DetectedPage = () => {
    const Navigate = useNavigate();
    const { no_rm } = useParams<{ no_rm: string }>();
    const [noRm, setNoRm] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [selectedUrlImage, setSelectedUrlImage] = useState<string | null>(null);
    const [dataDetected, setDataDetected] = useState<DetectedImage | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
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


    const isValidPanoramicImage = (res: any): res is DetectedProps => {
        return res && typeof res === "object" && "no_rm" in res && "name_patient" in res && "image_url" in res;
    };

    useEffect(() => {
        if (!no_rm) return;

        GetPanoramicByNoRm({
            no_rm,
            callback: (success, res) => {
                console.log("API Response:", res);

                if (success) {
                    if (isValidPanoramicImage(res)) {
                        setNoRm(res.no_rm || "");
                        setName(res.name_patient || "");
                        setSelectedUrlImage(res.image_url || null);
                    } else {
                        toast.error("Invalid data format from API");
                        console.error("Unexpected response:", res);
                    }
                } else {
                    toast.error("Failed to load panoramic images");
                    console.error(res);
                }
            },
        }).then(() => {
            GetDetected({
                no_rm: no_rm, callback: (success, res) => {
                    console.log("GetDetected API Response:", res);
                    if (success) {
                        if (res && typeof res === "object" && "id_panoramic_image" in res) {
                            setDataDetected(res as DetectedImage);

                        } else {
                            console.error("Unexpected response format:", res);
                        }
                    } else {
                        console.error(res);
                    }
                }
            });
        });
    }, [no_rm]);

    const handleDetect = () => {
        setIsLoading(true);
        PutDetection({
            no_rm: noRm, callback: (success, res) => {
                if (success) {
                    if (res && typeof res === "object" && "id_panoramic_image" in res) {
                        setDataDetected(res as DetectedImage);
                        setIsLoading(false);
                    } else {
                        console.error("Unexpected response format:", res);
                        setIsLoading(false);
                    }
                } else {
                    console.error(res);
                    setIsLoading(false);
                }
            }
        });
    };


    return (
        <>
            <NavbarPanoramic />
            <main className='pt-20 p-10'>
                <section>
                    <div className="flex w-1/5 justify-between mb-2">
                        <button
                            onClick={() => Navigate("/panoramic", { replace: true })}
                            className="bg-white text-blue-600 font-semibold px-3 py-1 rounded-lg shadow-md hover:bg-blue-100 flex items-center gap-2 hover:cursor-pointer"
                        >
                            <img
                                src={arrowBack}
                                alt="back"
                                className="w-4 h-4 object-cover"
                            />
                            Back
                        </button>
                    </div>
                    <div className="w-full md:w-1/2 text-left md:text-left ">
                        <p className="mt-3 text-gray-900">
                            Name : {name}
                        </p>
                        <p className="mt-3 text-gray-900">
                            Medical Record Number : {noRm}
                        </p>
                    </div>
                </section>
                <section>
                    <hr className="border border-gray-300 mt-6 mb-2" />
                    <div className="flex flex-col w-full justify-between">
                        <div className="w-full flex justify-center">
                            <img
                                src={selectedUrlImage ?? undefined}
                                alt={selectedUrlImage ?? "Image"}
                                className="rounded-t-lg p-8 w-3/5 object-cover"
                            />
                        </div >
                        <div className="flex justify-end ">
                            <Button className="px-10 mb-5" variant="auth" onClick={handleDetect}>
                                Detected Image
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>

    )
}

export default DetectedPage
