import Abnormalities from '../fragments/dashboard/abnormalities';
import About from '../fragments/dashboard/aboutUs';
import ContactUs from '../fragments/dashboard/contact';
import Footer from '../fragments/dashboard/footer';
import Hero from '../fragments/dashboard/hero';
import Navbar from '../fragments/dashboard/navbar';
import { useRef } from "react";

const Dashboard = () => {

    const gotoHome = useRef<HTMLDivElement | null>(null);
    const gotoAbout = useRef<HTMLDivElement | null>(null);
    const gotoAbnormalities = useRef<HTMLDivElement | null>(null);
    const gotoContact = useRef<HTMLDivElement | null>(null);

    return (
        <>
            <Navbar type='home' state= {{ gotoHome, gotoAbout, gotoAbnormalities, gotoContact }}/>
            <main className='p-10'>
                <section ref={gotoHome} id='home'>
                    <Hero />
                </section>
                <section ref={gotoAbout} id='about'>
                    <About />
                </section>
                <section ref={gotoAbnormalities} id='abnormalities'>
                    <Abnormalities />
                </section>
                <section ref={gotoContact} id='contact'>
                    <ContactUs />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Dashboard;

