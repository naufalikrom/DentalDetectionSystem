import { useLocation, Link, useNavigate } from 'react-router-dom';
import karies from '../../../assets/dentalCaries2.jpg';
import lesi from '../../../assets/dentalLesi.jpg';
import resoption from '../../../assets/dentalResorption.jpg';
import impaction from '../../../assets/dentalimpaction.jpg';
import { Button } from '@/components/elements/button';
const DentalAbnormalities = () => {
    const navigate = useNavigate();
    const abnormalities = [
        {
            id: 1,
            title: "Dental Caries",
            image: karies,
            description: "Dental caries, commonly known as tooth decay or cavities, is a bacterial infection that gradually destroys the enamel, the hard outer layer of the tooth. It occurs when bacteria in the mouth produce acids that erode the enamel, leading to cavities. If untreated, the decay can spread deeper into the tooth, causing pain and possible infection. Several factors contribute to dental caries, including poor oral hygiene, frequent consumption of sugary or acidic foods and drinks, dry mouth (lack of saliva), inadequate fluoride exposure, and bacteria in plaque producing acid that breaks down tooth enamel. Treatment depends on the severity of the decay. Small cavities can be treated with dental fillings to restore the tooth structure, while moderate cavities may require crowns to cover and protect the tooth. In cases of deep decay, root canal treatment is necessary to remove the infected pulp, and in severe cases, tooth extraction may be required. Fluoride treatments can help reverse early-stage cavities and prevent further damage.",
            link: "/abnormalities"
        },
        {
            id: 2,
            title: "Periapical Lesion",
            image: lesi,
            description: "A periapical lesion is an infection or inflammation at the tip of a tooth’s root, usually caused by bacteria reaching the tooth pulp. This leads to an abscess, which can cause pain, swelling, and serious complications if untreated. The main causes of periapical lesions include untreated cavities that allow bacteria to reach the pulp, deep fillings that irritate the tooth, dental trauma or injury, and bacterial infections spreading from surrounding tissues. Treatment typically involves root canal therapy to remove the infected pulp and seal the tooth. In cases where the infection is severe and the tooth cannot be saved, extraction may be necessary. Antibiotics are sometimes prescribed if the infection spreads beyond the tooth. In severe cases, drainage of the abscess may be required to relieve pressure and remove pus.",
            link: "/abnormalities"
        },
        {
            id: 3,
            title: "Root Resorption",
            image: resoption,
            description: "Root resorption is a condition where the body mistakenly breaks down and dissolves the tooth’s root. It can occur inside the tooth (internal resorption) or on the outer surface of the root (external resorption), potentially leading to tooth loss. This condition can be caused by dental trauma or injury, excessive force from orthodontic treatment (such as braces), chronic inflammation from infections, or pressure from impacted teeth. Treatment varies depending on the severity of the resorption. If the resorption is mild and not progressing, monitoring may be sufficient. Root canal therapy is used to remove damaged tissue and save the tooth when possible. However, if the resorption is severe and the tooth cannot be saved, extraction may be necessary. Addressing underlying causes, such as adjusting orthodontic treatment or treating infections, can help slow the progression of root resorption.",
            link: "/abnormalities"
        },
        {
            id: 4,
            title: "Third Molar Impaction",
            image: impaction,
            description: "Third molar impaction occurs when a wisdom tooth does not have enough space to grow properly, causing it to remain trapped under the gums or grow at an abnormal angle. This can lead to pain, infections, and damage to nearby teeth. The primary causes of third molar impaction include a lack of space in the jaw, improper growth angles of the wisdom tooth, and genetic factors influencing jaw and tooth size. Treatment depends on the severity of the impaction. If the impacted tooth is not causing any issues, monitoring may be sufficient. However, if it causes pain, infections, or damage to nearby teeth, wisdom tooth extraction is usually recommended. Medication such as pain relievers and antibiotics can help manage symptoms before extraction. Maintaining good oral hygiene is also essential to prevent infections around the impacted tooth.",
            link: "/abnormalities"
        }
    ]

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const selectedAbnormality = abnormalities.find(ab => ab.id === Number(id));

    const handleBack = (e: any) => {
        e.preventDefault();
        navigate("/dashboard#abnormalities", { replace: true });
    }
    return (
        <div className='flex flex-col pt-16'>
            <h1 className='text-5xl font-bold text-center mb-6 text-blue-600'>{selectedAbnormality?.title}</h1>
            <div className="flex flex-col md:flex-row items-center justify-center h-full">
                <div className="w-full md:w-1/2 text-left md:text-left ">
                    <p className="my-6 text-gray-900">
                        {selectedAbnormality?.description}
                    </p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <img
                        src={selectedAbnormality?.image}
                        alt="Radiodiagnosis"
                        className="w-full max-h-[45vh] object-contain rounded-lg mb-6"
                    />
                </div>
            </div>
            <Button className="flex w-1/9 px-10" variant="auth" onClick={handleBack}>
                back
            </Button>
        </div>
    )
}

export default DentalAbnormalities
