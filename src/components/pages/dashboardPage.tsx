import Abnormalities from '../fragments/dashboard/abnormalities';
import About from '../fragments/dashboard/aboutUs';
import ContactUs from '../fragments/dashboard/contact';
import Footer from '../fragments/dashboard/footer';
import Hero from '../fragments/dashboard/hero';
import Navbar from '../fragments/dashboard/navbar';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
                    const offset = 20; 
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: elementPosition - navbarHeight - offset,
                        behavior: "smooth"
                    });
                }, 100); // Delay agar scroll bekerja setelah render
            }
        }
    }, [location]);

    return (
        <>
            <Navbar type='home' />
            <main className='p-10'>
                <section id="home" className='pt-28 md:pt-2'>
                    <Hero />
                </section>
                <section id="about">
                    <About />
                </section>
                <section id="abnormalities">
                    <Abnormalities />
                </section>
                <section id="contact">
                    <ContactUs />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Dashboard;

