import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
function AllTransactions() {
    const [data,setdata]=useState([])
    useEffect(()=>{
         if(!localStorage||!localStorage.getItem('token')){
          nav('/signin')
        }
       
         async function fetchData1(){
      try {
        const response=await axios.get('http://localhost:3000/api/v1/user/alltransactions',{
       headers:{
         Authorization:`Bearer ${localStorage.getItem('token')}`
       }
       })
      
        setdata(response.data.msg.reverse());
     
      } catch (error) {
        console.error("Error fetching data\n ",error)
      }
    }
    fetchData1()
    },[])
  return (
    <div>
     {(data.length==0)? 
     <div>
      <Link to={'/dashboard'} className='ml-10 mt-20 p-2 relative top-10 bg-black text-white border-0 rounded-md px-4'>Go Back</Link>
       <div className='text-4xl font-md text-center flex justify-center items-center h-screen w-full  '>No transactions yet!!</div>
     </div>:(
    <div className={`flex flex-wrap flex-col items-center  justify-between px-4 py-1  `}>
        <Link to={'/dashboard'}><button className='absolute mt-2 left-5 text-lg bg-black text-white px-5 pb-1 rounded border-0'>Go Back</button></Link> 
        <h1 className='block text-3xl text-center font-md mt-10 mb-3 underline'> Your Transactions</h1> <br />
        <div className='bg-slate-100 mx-10 w-8/12 flex flex-col p-2  justify-center items-center'>
        
        {data.map((ele,i)=>{
          if(ele.to=="Me"){
             return <div key={i} className='border border-white m-1 p-2 w-full flex flex-wrap flex-row justify-between'>
                  <div>

                  <button  className='border-2 border-solid-black px-3 py-1 rounded-3xl'>{ele.from.charAt(0)}</button>
                  <div  className='inline px-3 font-semibold text-lg'>{ele.from}</div>
                  
                  </div>
                  <div>
                      <p className='text-lg'>{ele.dateandtime}</p>
                      <p className='text-lg font-md text-green-700 font-medium text-right '>+ ₹{ele.amount}</p>
                  </div>
              </div>
          }else{

          return <div key={i} className='border border-white m-1 p-2 w-full flex flex-wrap flex-row justify-between'>
                  <div>

                  <button  className='border-2 border-solid-black px-3 py-1 rounded-3xl'>{ele.to.charAt(0)}</button>
                  <p  className='inline px-3 font-semibold  text-lg'>{ele.to}</p>
                  </div>
                  <div>
                    <p className='text-lg'>{ele.dateandtime}</p>
                    <p className='text-lg font-md text-red-500 font-medium text-right'>- ₹{ele.amount}</p>
                  </div>
              </div>
          }

        })}
            
        
      </div>
      
    </div>
  )}
    </div>
  )
}

export default AllTransactions
