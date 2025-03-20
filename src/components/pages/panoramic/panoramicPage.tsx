
import Footer from "../../fragments/dashboard/footer"
import { useLogin } from "@/hooks/useLogin";
import NavbarPanoramic from "../../fragments/panoramic/navbarPanoramic";
import { Button } from "@/components/elements/button";
import karies from '../../../assets/dentalCaries2.jpg';
import CardAbnormalities from "@/components/fragments/panoramic/cardPanoramic";


const PanoramicPage = () => {

    useLogin();

    const abnormalities = [
        {
            id: 1,
            title: "Dental Caries",
            image: karies,
            description: "Dental caries, commonly known as tooth decay or cavities, is a bacterial infection that gradually destroys the enamel (the hard outer layer of the tooth). It occurs when bacteria in the mouth produce acids that erode the enamel, leading to cavities. If untreated, the decay can spread deeper into the tooth, causing pain and possible infection.",
            link: "/abnormalities"
        },
        {
            id: 2,
            title: "Periapical Lesion",
            image: karies,
            description: "A periapical lesion is an infection or inflammation at the tip of a tooth’s root, usually caused by bacteria reaching the tooth pulp. This leads to an abscess, which can cause pain, swelling, and serious complications if untreated.",
            link: "/abnormalities"
        },
        {
            id: 3,
            title: "Root Resorption",
            image: karies,
            description: "Root resorption is a condition where the body mistakenly breaks down and dissolves the tooth’s root. It can occur inside the tooth (internal resorption) or on the outer surface of the root (external resorption), potentially leading to tooth loss.",
            link: "/abnormalities"
        },
        {
            id: 4,
            title: "Third Molar Impaction",
            image: karies,
            description: "Third molar impaction occurs when a wisdom tooth does not have enough space to grow properly, causing it to remain trapped under the gums or grow at an abnormal angle. This can lead to pain, infections, and damage to nearby teeth.",
            link: "/abnormalities"
        }
    ]

    return (
        <>
            <NavbarPanoramic />
            <main className='pt-20 p-10'>
                <section>
                    <div className="w-full md:w-1/2 text-left md:text-left ">
                        <h1 className="text-4xl font-bold mb-3">Hello, {useLogin().username}</h1>
                        <h1 className="text-3xl font-bold">Welcome to  <span className="text-3xl font-bold"><span className="text-3xl font-bold text-blue-600">Dental</span> Detection System</span></h1>

                        <p className="mt-3 text-gray-900">
                            Dental detection system is a system that detects dental abnormalities with a deep learning system which is needed to help dentists diagnose dental abnormalities or help people with dental diseases to find out predictions of dental abnormalities they suffer.
                        </p>
                    </div>
                </section>
                <section>
                    <hr className="border border-gray-300 mt-6 mb-2" />
                    <div className="flex w-full justify-between">
                        <h1 className="text-2xl font-semibold">Dental Detection</h1>
                        <Button className="px-10 mb-5" variant="auth" onClick={() => { }}>
                            Let's Start
                        </Button>
                    </div>
                </section>
                <section>
                    <div className="flex flex-col md:flex-row justify-center py-5 w-1/2 md:w-full">
                        {abnormalities.map((disease) => (
                            <CardAbnormalities key={disease.id}>
                                <CardAbnormalities.Header image={disease.image} />
                                <CardAbnormalities.Body title={disease.title}>
                                    {disease.description}
                                </CardAbnormalities.Body>
                                <CardAbnormalities.Footer link={`${disease.link}/${disease.id}`} />
                            </CardAbnormalities>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>

    )
}

export default PanoramicPage
