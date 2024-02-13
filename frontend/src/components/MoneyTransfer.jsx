import React, { useEffect,useRef, useState } from 'react'
import axios from 'axios'
import {useSearchParams,useNavigate} from "react-router-dom"
function MoneyTransfer() {
  const [lowbalance,setlowbalance]=useState(false)
  const [nobalance,setnobalance]=useState(false)
  const [loading,setloading]=useState(false)
  const amt=useRef()
  const [searchParams]=useSearchParams()
  const id=searchParams.get("id")
  const name=searchParams.get("name")
const nav=useNavigate()

  return (
    <div className='flex justify-center w-full h-screen flex-col items-center bg-slate-100'>
      <div className='w-fit  h-fit bg-white border rounded-md shadow-2xl flex flex-col items-center p-8 my-8'>
        <h1 className='text-3xl font-md text-center font-bold p-4'>  Send Money</h1>
          <p className='inline p-5 py-1  pb-0 font-sm text-2xl font-bold my-0 mr-auto '>  <button className='px-3 py-1 text-white font-sm bg-green-500 rounded-full border'>{name.charAt(0)}</button> {name} </p> <br />
           
           {lowbalance && <p className='text-left text-md text-red-500'>Minimum amount that can be sent is ₹1</p>}
           {nobalance&& <p className='text-md font-bold py-1 text-red-500 text-wrap'>Your balance is too low to make payments!!</p> }
            <input type="number" ref={amt} id="amount" placeholder='Enter amount(in Rs.)' className='mx-5 p-2 bg-white w-72 border rounded-sm  ' />
            <button className=' my-3 bg-green-500 w-72 text-white  px-5 py-2 border rounded-md justify-center' onClick={async(e)=>{
             if(amt.current.value<=0){
                setlowbalance(true)
                setTimeout(()=>{
                  setlowbalance(!true)
                },3000)
                return;
             }
             setloading(true)
               const res= await axios.post('http://localhost:3000/api/v1/account/transfer',JSON.stringify({
                to:id,
                amount:amt.current.value
               }),{
  headers:{
    "Content-Type":'application/json' ,
    Authorization:`Bearer ${localStorage.getItem('token')}`
  }
 }).then((e)=>{
//  alert(`Your Payment to ${name} was successfull...Redirecting you back to the dashboard page`)
 // nav('/dashboard')
  nav(`/paymentsuccess?name=${name}&amount=${amt.current.value}`)
 }
 ).catch((e)=>{
  
 
  if(e.response.data.msg=="Insufficient balance"){
    setnobalance(true);

  }
 })
    
            }}>{loading?<div className='flex items-center justify-center '>
          <div className='border-t-4  border-t-green-300 border-l-4 border-r-4 border-b-4 rounded-3xl border-white full w-5 h-5 animate-spin bg-opacity-75'>
               
          </div>
        </div>:"Initiate transfer"}</button>
      </div>
    </div>
  )
}

export default MoneyTransfer