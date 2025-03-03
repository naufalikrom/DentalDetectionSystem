import CardAbnormalities from '../dashboard/cardAbnormalities';
import karies from '../../../assets/dentalCaries2.jpg';
import lesi from '../../../assets/dentalLesi.jpg';
import resoption from '../../../assets/dentalResorption.jpg';
import impaction from '../../../assets/dentalimpaction.jpg';

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
        image: lesi,
        description: "A periapical lesion is an infection or inflammation at the tip of a tooth’s root, usually caused by bacteria reaching the tooth pulp. This leads to an abscess, which can cause pain, swelling, and serious complications if untreated.",
        link: "/abnormalities"
    },
    {
        id: 3,
        title: "Root Resorption",
        image: resoption,
        description: "Root resorption is a condition where the body mistakenly breaks down and dissolves the tooth’s root. It can occur inside the tooth (internal resorption) or on the outer surface of the root (external resorption), potentially leading to tooth loss.",
        link: "/abnormalities"
    },
    {
        id: 4,
        title: "Third Molar Impaction",
        image: impaction,
        description: "Third molar impaction occurs when a wisdom tooth does not have enough space to grow properly, causing it to remain trapped under the gums or grow at an abnormal angle. This can lead to pain, infections, and damage to nearby teeth.",
        link: "/abnormalities"
    }
]

const Abnormalities = () => {
    return (
        <div className='flex flex-col items-center mt-10 w-full'>
            <div className='flex'>
                <h5 className='text-5xl font-bold text-center mb-6 text-blue-600'>Dental</h5>
                <h5 className='text-5xl font-bold text-center mb-6 ml-4'>Abnormalities</h5>
            </div>
            <div className="flex flex-col md:flex-row justify-center py-5 w-1/2 md:w-full">
                {abnormalities.map((disease) => (
                    <CardAbnormalities key={disease.id}>
                        <CardAbnormalities.Header image={disease.image} />
                        <CardAbnormalities.Body title={disease.title}>
                            {disease.description}
                        </CardAbnormalities.Body>
                        <CardAbnormalities.Footer link={`${disease.link}?id=${disease.id}`} />
                    </CardAbnormalities>
                ))}
            </div>
        </div>
    )
}

export default Abnormalities
