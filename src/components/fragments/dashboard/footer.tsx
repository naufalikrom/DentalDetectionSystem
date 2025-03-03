import logo from "../../../assets/logogigi.png";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white p-6">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo */}
                    <div className="mb-4 md:mb-0">
                        <div className="flex items-center">
                            <img src={logo} alt="Logo" className="w-16 h-16" />
                            <h1 className="text-2xl font-bold text-blue-600 ml-3">D</h1>
                            <h1 className="text-2xl font-bold">DS</h1>

                        </div>
                        <p className="text-gray-400 text-sm">AI-powered dental detection</p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-400 text-xs">
                    &copy;Naufal. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
