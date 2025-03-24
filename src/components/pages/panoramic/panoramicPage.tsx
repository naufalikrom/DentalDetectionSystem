
import Footer from "../../fragments/dashboard/footer"
import { useLogin } from "@/hooks/useLogin";
import NavbarPanoramic from "../../fragments/panoramic/navbarPanoramic";
import { Button } from "@/components/elements/button";
import karies from '../../../assets/dentalCaries2.jpg';
import CardAbnormalities from "@/components/fragments/panoramic/cardPanoramic";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetPanoramic } from "@/services/user.services";
import { toast } from "sonner";


const PanoramicPage = () => {
    const Navigate = useNavigate();
    const [panoramic, setPanoramic] = useState<panoramicImage[]>([]);
    const id_user = useLogin().idUser;
    useLogin();

    interface panoramicImage {
        "id": number,
        "id_user": number,
        "no_rm": string,
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
                    <div className="flex flex-col md:flex-row justify-center py-5 w-1/2 md:w-full">
                        {panoramic.map((panoramic) => (
                            <CardAbnormalities key={panoramic.id}>
                                <CardAbnormalities.Header image={panoramic.image_url} />
                                <CardAbnormalities.Body title={panoramic.no_rm}/>
                            </CardAbnormalities>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>

    )
}

export default PanoramicPage
