import { useRouteError } from "react-router-dom"
import errorpicture from "../../assets/error.jpg"

const ErrorPage = () => {
    const error = useRouteError() as any


    return (
        <div className="flex w-full h-screen bg-gradient-to-br from-teal-900 to-blue-900 justify-center items-center">
            <div className='flex w-3/5 h-3/4 bg-white rounded-2xl items-center justify-center'>
            <div className="flex flex-col items-center">
                <img src={errorpicture} alt="errorImage" className="mb-5 w-1/2 "/>
                <p className="text-3xl font-bold mb-3">Oops!</p>
                <p className="text-xl">Sorry, an unexpected error has occured</p>
                <p className="text-xl">{error.statusText || error.message}</p>
            </div>
            </div>
        </div>
    )
}

export default ErrorPage
