
import Footer from "../../fragments/dashboard/footer"
import { useLogin } from "@/hooks/useLogin";
import NavbarPanoramic from "../../fragments/panoramic/navbarPanoramic";
import { Button } from "@/components/elements/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetPanoramic } from "@/services/user.services";
import { toast } from "sonner";
import CardPanoramic from "@/components/fragments/panoramic/cardPanoramic";
import Lottie from "lottie-react";
import empty from '@/assets/empty.json';


const PanoramicPage = () => {
    const Navigate = useNavigate();
    const [panoramic, setPanoramic] = useState<PanoramicImage[]>([]);
    const id_user = useLogin().idUser;
    useLogin();

    interface PanoramicImage {
        "id": number,
        "id_user": number,
        "no_rm": string,
        "name_patient": string,
        "image_url": string
    }

    useEffect(() => {
        if (!id_user) return;

        GetPanoramic({
            id_user: id_user,
            page: 1,
            limit: 6,
            callback: (success, dataOrError) => {
                if (success) {
                    // Pastikan data yang diterima adalah array sebelum menggunakannya
                    if (Array.isArray(dataOrError)) {
                        setPanoramic(dataOrError);
                    } else {
                        toast.error("Invalid data format from API");
                        console.error("Unexpected response:", dataOrError);
                    }
                } else {
                    toast.error("Failed to load panoramic images");
                    console.error(dataOrError);
                }
            }
        });
    }, [id_user]);


    return (
        <>
            <NavbarPanoramic />
            <main className='pt-20 p-10'>
                <section>
                    <div className="w-full md:w-1/2 text-left md:text-left ">
                        <h1 className="text-4xl font-bold mb-3">Hello, {useLogin().username}</h1>
                        <h1 className="text-3xl font-bold">Welcome to  <span className="text-3xl font-bold"><span className="text-3xl font-bold text-blue-600">Dental</span> Detection System</span></h1>

                        <p className="mt-3 text-gray-900">
                            Dental detection system is a system that detects dental abnormalities with a deep learning system which is needed to help dentists diagnose dental abnormalities or help people with dental diseases to find out predictions of dental abnormalities they suffer.
                        </p>
                    </div>
                </section>
                <section>
                    <hr className="border border-gray-300 mt-6 mb-2" />
                    <div className="flex w-full justify-between">
                        <h1 className="text-2xl font-semibold">Dental Detection</h1>
                        <Button className="px-10 mb-5" variant="auth" onClick={() => { Navigate("/upload") }}>
                            Upload Image
                        </Button>
                    </div>
                </section>
                <section>
                    {panoramic.length === 0 && (
                        <div className="flex flex-col justify-center items-center w-full max-h-screen">
                            <Lottie animationData={empty} className="w-1/2 h-96" />
                            <p className="text-xl mb-3">Data patient is empty, please upload image</p>
                        </div>
                    )}
                    <div className="flex flex-col md:flex-row justify-center py-5 w-1/2 md:w-full">
                        {panoramic.map((panoramic) => (
                            <CardPanoramic key={panoramic.id}>
                                <CardPanoramic.Header image={panoramic.image_url} />
                                <CardPanoramic.Body no_rm={panoramic.no_rm} name={panoramic.name_patient} />
                                {/* <CardPanoramic.Footer link={`${disease.link}/${disease.id}`} /> */}
                                <CardPanoramic.Footer link={''} no_rm={panoramic.no_rm} />
                            </CardPanoramic>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>

    )
}

export default PanoramicPage
