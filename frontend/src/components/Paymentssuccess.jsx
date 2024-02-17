import React, { useEffect, useState } from 'react'
import {useSearchParams,useNavigate,Link} from "react-router-dom"

function Paymentssuccess() {
   const [searchParams]=useSearchParams()
   const nav=useNavigate()
   const name=searchParams.get('name')
   const amount=searchParams.get('amount')
   const [n,setn]=useState(5)
   const [move,setMove]=useState(true)
   useEffect(()=>{
    
      
         
         let a= setInterval(()=>{
          
           setn(prev=>prev-1)
          },1000)
       let b= setTimeout(() => {
          nav('/dashboard')
        }, 6000);
      
     
    
   },[move])
   return (
    <div className='flex justify-center w-full h-screen flex-col items-center bg-slate-100'>
       <div className='w-96 h-72  bg-white shadow-2xl flex flex-col items-center justify-center py-4 p-2'>
        
       
            <h1 className='text-center text-2xl font-md flex-wrap text-wrap'>Your Payment to {name} of ₹{amount} was successfull...</h1>
                <img src="../success.jpg" alt="" className='h-fit w-3/12 justify-center items-center bg-transparent'/>
                <p className='text-lg text-center '>Redirecting you to DashBoard page in {n} seconds...</p>
            
       </div>
     </div>
  )
}

export default Paymentssuccess
