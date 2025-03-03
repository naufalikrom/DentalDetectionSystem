
import underDev from "../../assets/underDevelopment.jpg"

const OnGoingPage = () => {
   


    return (
        <div className="flex w-full h-screen bg-gradient-to-br from-teal-900 to-blue-900 justify-center items-center">
            <div className='flex w-3/5 h-3/4 bg-white rounded-2xl items-center justify-center'>
            <div className="flex flex-col items-center">
                <img src={underDev} alt="errorImage" className="mb-5 w-1/2 "/>
                <p className="text-3xl font-bold mb-3">Oops!</p>
                <p className="text-xl">Sorry, This feature is still under development</p>
            </div>
            </div>
        </div>
    )
}

export default OnGoingPage
