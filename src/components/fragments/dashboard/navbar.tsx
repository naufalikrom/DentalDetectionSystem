import { useEffect, useState, HTMLProps, RefObject } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logogigi.png";
import { Button } from "@/components/elements/button";

interface NavbarProps extends Readonly<HTMLProps<HTMLDivElement>> {
  readonly type?: string;
  readonly state?: Readonly<{
    gotoHome: RefObject<HTMLDivElement | null>;
    gotoAbout: RefObject<HTMLDivElement | null>;
    gotoAbnormalities: RefObject<HTMLDivElement | null>;
    gotoContact: RefObject<HTMLDivElement | null>;
  }>
}
export default function Navbar({ type, state }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");


  useEffect(() => {
    const sections = ["home", "about", "abnormalities", "contact"];

    const handleScrollUpdate = () => {
      let currentSection;

      if (type === "home") {
        currentSection = "home"; // Default
      } else {
        currentSection = "abnormalities";
      }

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
      history.replaceState(null, "", `#${currentSection}`);
    };

    window.addEventListener("scroll", handleScrollUpdate);
    return () => window.removeEventListener("scroll", handleScrollUpdate);
  }, []);

  const handleScroll = (ref: RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;

      window.scrollTo({
        top: ref.current.offsetTop - navbarHeight,
        left: 0,
        behavior: "smooth",
      });

      // Update hash di URL
      history.replaceState(null, "", `#${ref.current.id}`);
    }
  };
  const handelDetection = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/panoramic";
    } else {
      window.location.href = "/login";
    }
  }

  return (
    <nav className="bg-slate-100 text-black px-10 fixed z-50 top-0 left-0 w-full shadow-md border-b border-blue-200">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-row items-center">
          <Link to="/dashboard" className="flex items-center">
            <img src={logo} alt="Logo" className="w-16 h-16" />
            <h1 className="text-2xl font-bold text-blue-600 ml-3">D</h1>
            <h1 className="text-2xl font-bold">DS</h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        {state && (
          <ul className="hidden md:flex space-x-6">
            {["home", "about", "abnormalities", "contact"].map((item) => (
              <li key={item}>
                <button
                  onClick={() =>
                    handleScroll(
                      state[
                      `goto${item.charAt(0).toUpperCase() + item.slice(1)}` as keyof typeof state
                      ]
                    )
                  }
                  className={`hover:text-blue-400 ${activeSection === item ? "text-blue-400 " : ""
                    }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        )}



        <Button className="hidden md:block" variant="auth" onClick={handelDetection}>
          Detection
        </Button>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && state && (
        <ul className="md:hidden bg-slate-100 p-4 mt-2 space-y-4 text-center text-black">
          {["home", "about", "abnormalities", "contact"].map((item) => (
            <li key={item}>
              <button
                // onClick={() => {
                //   setIsOpen(false); // Tutup menu dulu
                //   setTimeout(() => handleScroll(item), 300); // Delay agar posisi scroll akurat
                // }}
                onClick={() =>
                  handleScroll(
                    state[
                    `goto${item.charAt(0).toUpperCase() + item.slice(1)}` as keyof typeof state
                    ]
                  )
                }
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
