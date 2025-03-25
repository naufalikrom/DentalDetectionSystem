import Footer from "@/components/fragments/dashboard/footer"
import ContainerEdit from "@/components/fragments/panoramic/containerEdit";
import NavbarPanoramic from "@/components/fragments/panoramic/navbarPanoramic"
import { useLogin } from "@/hooks/useLogin";


const EditPanoramic = () => {
    useLogin();
    return (
        <>
            <NavbarPanoramic />
            <main className='pt-20 p-10'>
                <ContainerEdit />
            </main>
            <Footer />
        </>
    )
}

export default EditPanoramic
