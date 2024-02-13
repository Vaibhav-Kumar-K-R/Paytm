import React, { useEffect } from 'react'
import {useSearchParams,useNavigate} from "react-router-dom"

function Paymentssuccess() {
   const [searchParams]=useSearchParams()
   const nav=useNavigate()
   const name=searchParams.get('name')
   const amount=searchParams.get('amount')
   useEffect(()=>{
        setTimeout(() => {
            nav('/dashboard')
        }, 5000);
   },[])
   return (
    <div className='flex justify-center w-full h-screen flex-col items-center bg-slate-100'>
       <div className='w-96 h-72  bg-white shadow-2xl flex flex-col items-center justify-center py-4 p-2'>
            <h1 className='text-center text-2xl font-md flex-wrap text-wrap'>Your Payment to {name} of ₹{amount} was successfull...</h1>
                <img src="../public/success.jpg" alt="" className='h-fit w-3/12 justify-center items-center bg-transparent'/>
                <p className='text-lg text-center '>Redirecting you to DashBoard page in 5 seconds...</p>
            
       </div>
     </div>
  )
}

export default Paymentssuccess
