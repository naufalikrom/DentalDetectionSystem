import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logogigi.png";
import { Button } from "@/components/elements/button";

export default function NavbarAbnormalities() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const location = useLocation(); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const sections = ["home", "about", "abnormalities", "contact"];

        const handleScrollUpdate = () => {
            let currentSection = "abnormalities"; // Default

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        currentSection = section;
                    }
                }
            });

            setActiveSection(currentSection);
            history.replaceState(null, "", window.location.pathname);
        };

        window.addEventListener("scroll", handleScrollUpdate);
        return () => window.removeEventListener("scroll", handleScrollUpdate);
    }, []);

    const handleScroll = (id: string) => {
        if (location.pathname !== "/dashboard") {
            // Jika user belum ada di dashboard, navigasikan ke /dashboard#id
            navigate(`/dashboard#${id}`);
            return;
        }

        const element = document.getElementById(id);
        if (element) {
            const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
            const offset = 20; // Tambahkan jarak ekstra dari navbar
            const position = element.offsetTop - navbarHeight - offset;

            setTimeout(() => {
                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            }, 300); // Delay agar navbar bisa menutup dulu

            setActiveSection(id);
        }
    };

    const handleDetection = (e: any) => {
        e.preventDefault();
        navigate("/login", { replace: true });
    };

    return (
        <nav className="bg-slate-100 text-black px-10 fixed z-50 top-0 left-0 w-full shadow-md border-b border-blue-200">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex flex-row items-center">
                    <Link to="/dashboard" replace className="flex items-center">
                        <img src={logo} alt="Logo" className="w-16 h-16" />
                        <h1 className="text-2xl font-bold text-blue-600 ml-3">D</h1>
                        <h1 className="text-2xl font-bold">DS</h1>
                    </Link>
                </div>

                {/* Desktop Menu */}

                <ul className="hidden md:flex space-x-6">
                    {["home", "about", "abnormalities", "contact"].map((item) => (
                        <li key={item}>
                            <button
                                onClick={() => handleScroll(item)}
                                className={`hover:text-blue-400 ${activeSection === item ? "text-blue-400 " : ""}`}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>


                <Button className="hidden md:block" variant="auth" onClick={handleDetection}>
                    Detection
                </Button>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden bg-slate-100 p-4 mt-2 space-y-4 text-center text-black">
                    {["home", "about", "abnormalities", "contact"].map((item) => (
                        <li key={item}>
                            <button
                                onClick={() => {
                                    setIsOpen(false); // Tutup menu dulu
                                    setTimeout(() => handleScroll(item), 300); // Delay agar posisi scroll akurat
                                }}
                                className={`hover:text-blue-400 ${activeSection === item ? "text-blue-400" : ""}`}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}
