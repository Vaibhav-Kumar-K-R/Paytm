import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
const MainPage = () => {
  const nav=useNavigate()
  useEffect(()=>{

    if(localStorage.getItem('token')){
      nav('/dashboard')
    }
  },[])
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 text-white py-4">
        <h1 className="text-2xl font-semibold text-center">Payments Website</h1>
      </header>

      <div className="max-w-2xl mx-auto p-6 mt-8 bg-white shadow-md rounded-md">
        <div className="mb-8 text-center">
          <Link to={"/signin"} className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4">Sign In</Link>
          <Link to={"/signup"} className="bg-green-500 text-white py-2 px-4 rounded-md">Sign Up</Link>
        </div>

        {/* Your main content here */}
       <p className='text-center text-xl font-md'> Welcome to Payments App</p>
      </div>
    </div>
  );
};

export default MainPage;