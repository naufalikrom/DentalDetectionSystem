import { useEffect, useState } from "react";
import Footer from "../fragments/dashboard/footer"
import { useLogin } from "@/hooks/useLogin";
import NavbarPanoramic from "../fragments/panoramic/navbarPanoramic";


const PanoramicPage = () => {

    useLogin();

    return (
        <>
            <NavbarPanoramic/>
            <main className='p-10'>
                <section>

                </section>
            </main>
            <Footer />
        </>
        
    )
}

export default PanoramicPage
