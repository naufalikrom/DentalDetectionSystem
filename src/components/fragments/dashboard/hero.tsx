import { Button } from "@/components/elements/button";
import hero from "../../../assets/dentalDetectionSystem.jpg"

const Hero = () => {
    const handleDetection = (e:any) => {
        e.preventDefault();
        window.location.href = "/login";
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center h-screen">
            {/* Left Section */}
            <div className="w-full md:w-1/2 text-left md:text-left ">
                <h1 className="text-5xl font-bold text-blue-600">Dental</h1>
                <h1 className="text-5xl font-bold">Detection System</h1>
                <p className="mt-6 text-gray-900">
                    Dental detection system is a system that detects dental abnormalities with a deep learning system which is needed to help dentists diagnose dental abnormalities or help people with dental diseases to find out predictions of dental abnormalities they suffer.
                </p>
                <Button className="mt-6 px-10 mb-5" variant="auth" onClick={handleDetection}>
                    Let's Start
                </Button>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <img
                    src={hero}
                    alt="Radiodiagnosis"
                    className="w-full max-h-[90vh] object-contain rounded-lg"
                />
            </div>
        </div>
    );
};



export default Hero
