

const About = () => {
    return (
        <div className="flex flex-col items-center mt-26 md:mt-0">
            <div className="w-full text-center md:text-left flex justify-center">
                <h1 className="text-5xl font-bold text-center mb-6">
                    About 
                </h1>
                <h1 className="text-5xl font-bold text-center mb-6 ml-3 text-blue-600">
                     System
                </h1>
            </div>

            <div className="w-full flex flex-col justify-center m-4 md:m-0">
                <p className="mt-6 text-gray-900">This dental detection system is used as a system that can help users because there is AI to detect abnormalities that occur in the patient's teeth. With this AI system, it is hoped that this system can help dentists diagnose dental abnormalities and patients to see temporary diagnoses quickly and accurately. The system in this DDS uses a deep learning method, namely by using YOLOv8 as an object detection, then there is a Vision Transformer as an object classification which classifies dental abnormalities and normal teeth so that this system starts from the uploaded panoramic photo and then detects so that the results that will be obtained are pieces of teeth and the results of detection.</p>
                <p className="mt-6 text-gray-900">Dentists or patients can input panoramic radiographic images to the system. after the system processes the image, there will be results in the form of image pieces per tooth and in the tooth image pieces there will be a description of the tooth number using international standards, namely odontogram. in addition to the description of the tooth number, there will be a description of normal teeth or dental abnormalities.</p>
            </div>
        </div>
    )
}

export default About
