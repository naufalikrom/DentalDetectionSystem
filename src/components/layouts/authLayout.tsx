import React, { HTMLProps } from 'react';
import loginpicture from "../../assets/loginpage.jpg"
import { Link } from 'react-router-dom';

interface LayoutProps extends HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  title?: string;
  type?: string;
}
const AuthLayout = ({ children, title, type }: LayoutProps) => {

  return (
    <div className="flex w-full h-screen bg-gradient-to-br from-teal-900 to-blue-900 justify-center items-center">
      <div className='flex w-3/5 bg-white rounded-2xl'>
        <div className='flex flex-row w-full p-5'>
          <div className='flex w-1/2 h-full mr-2 justify-center'>
            <img src={loginpicture} alt='dentalLoginPage' className='className="w-full h-full object-cover rounded-2xl' />
          </div>
          <div className='flex flex-col w-1/2 h-full ml-3'>
            <h1 className='text-3xl font-bold mb-2 text-blue-600'>{title}</h1>
            <p className='font-medium mb-8 text-slate-500'> Welcome, please enter your details </p>
            {children}
            <p className="text-sm">
              {type === "login" ? "Don't have an account? " : "Have an account? "}
              {type === "login" && (
                <Link to="/register"
                  className="font-bold text-blue-600 hover:underline">
                  Sign Up
                </Link>
              )}
              {type === "register" && (
                <Link to="/login"
                  className="font-bold text-blue-600 hover:underline">
                  Sign In
                </Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AuthLayout
