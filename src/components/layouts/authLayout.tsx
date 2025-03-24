import React, { HTMLProps, use } from 'react';
import loginpicture from "../../assets/loginpage.jpg"
import { Link, useNavigate } from 'react-router-dom';
import arrowBack from '../../assets/arrow.png';

interface LayoutProps extends HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  title?: string;
  type?: string;
}
const AuthLayout = ({ children, title, type }: LayoutProps) => {
  const Navigate = useNavigate();
  return (
    <div className="flex w-full h-screen bg-gradient-to-br from-teal-900 to-blue-900 justify-center items-center">
      <div className='flex w-3/5 bg-white rounded-2xl'>
        <div className='flex flex-row w-full p-5'>
          <div className="relative flex w-1/2 h-full mr-2 justify-center">
            <button
              onClick={() => {Navigate("/dashboard", { replace: true })}}
              className="absolute top-3 left-3 bg-white text-blue-600 font-semibold px-3 py-1 rounded-lg shadow-md hover:bg-blue-100"
            >
              <img
              src={arrowBack}
              alt="back"
              className="w-4 h-4 object-cover rounded-2xl"
            />
            </button>
            <img
              src={loginpicture}
              alt="dentalLoginPage"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className='flex flex-col w-1/2 h-full ml-3'>
            <h1 className='text-3xl font-bold mb-2 text-blue-600'>{title}</h1>
            <p className='font-medium mb-8 text-slate-500'> Welcome, please enter your details </p>
            {children}
            <div className='flex justify-center'>
              {type === "login" ? haveAccount() : notHaveAccount()}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

const haveAccount = () => {
  return (
    <p className="text-sm">
      Don't have an account? {" "}
      <Link
        to="/register"
        className="font-bold text-blue-600 hover:underline"
      >
        Sign Up
      </Link>
    </p>
  )
}

const notHaveAccount = () => {
  return (
    <p className="text-sm">
      Have an account? {" "}
      <Link
        to="/login"
        className="font-bold text-blue-600 hover:underline"
      >
        Sign In
      </Link>
    </p>
  )
}

export default AuthLayout
