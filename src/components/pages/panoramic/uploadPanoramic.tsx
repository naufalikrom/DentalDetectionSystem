import Footer from "@/components/fragments/dashboard/footer"
import ContainerUpload from "@/components/fragments/panoramic/containerUpload";
import NavbarPanoramic from "@/components/fragments/panoramic/navbarPanoramic"
import { useLogin } from "@/hooks/useLogin";


const UploadPanoramic = () => {
    useLogin();
    return (
        <>
            <NavbarPanoramic />
            <main className='pt-20 p-10'>
                <ContainerUpload />

            </main>
            <Footer />
        </>
    )
}

export default UploadPanoramic
