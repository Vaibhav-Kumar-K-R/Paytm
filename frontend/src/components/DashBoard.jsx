import React, { useEffect, useState } from 'react'
import axios from "axios"
import UserList from './UserList'
import Loading from './Loading'
import {useNavigate} from "react-router-dom"

function DashBoard() {
  const [username,setUsername]=useState("User")
  const [loading,setloading]=useState(true)
const [balance,setbalance]=useState(0)
  const [arr,setArr]=useState([])
  const nav=useNavigate()
  useEffect(()=>{

    async function getuserprofile(){
    
      let respons;
      

       try {
        if(!localStorage||!localStorage.getItem('token')){
          nav('/signin')
        }
       
       respons=await axios.get('https://paytm-backend-clone.onrender.com/api/v1/user/usermy',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
        })
        const b=await axios.get('https://paytm-backend-clone.onrender.com/api/v1/account/balance',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
        })
        
        setbalance(b.data.balance)
        setUsername(respons.data.msg.firstName+" "+respons.data.msg.lastName)
        
       
      // setArr(response.data.users)
      } catch (error) {
        console.error("Error fetching data\n ",error)
      }
       try {
        const response=await axios.get('https://paytm-backend-clone.onrender.com/api/v1/user/all')
       // if(Array.includes())
       
        for(let i=0;i<response.data.users.length;i++){
          if(response.data.users[i].firstName==respons.data.msg.firstName){
            response.data.users.splice(i,1);
          }
        }
        console.log(respons.data.users+"  ");
       setArr(response.data.users)
      } catch (error) {
        console.error("Error fetching data\n ",error)
      }
    }
    getuserprofile().then(()=>{
      setloading(false)
    })
   
  },[])
  
 
 
  
  return ( 
    loading?<Loading></Loading>:<>
      <div className='flex flex-wrap justify-between px-5 py-3 border border-slate-100'>
        <h1 className='font-md text-3xl cursor-pointer'>
            Payments App
        </h1>
        <div className='flex justify-between  mx-2 flex-wrap-reverse'>
          <button className='relative right-7 inline border-2 border-solid-black px-5 py-1 rounded-md bg-black text-white ' onClick={()=>{
          
           nav('/alltransactions')
          }}>See all transactions</button>
           <button className='relative right-7 inline border-2 border-solid-black px-5 py-1 rounded-md bg-black text-white ' onClick={(e)=>{
           localStorage.removeItem('token');
           nav('/signin')
          }}>Logout</button>
        <p className='font-normal inline'>Hello, {username} <button className='border-2 border-solid-black px-3 py-1 rounded-full'>{username.charAt(0).toUpperCase()}</button></p> <br /> 
        </div>
      </div>
      <div className='w-full font-semibold p-4  '>
        Your Balance ₹{balance.toFixed(2)} <br /> <br />
        Users <br /> <br />
        
         <input type="text" id='text' className='border border-slate-300 rounded-md px-2 w-full py-1' placeholder='Search users...' onChange={(e)=>{
              fetchData(setArr)
         }} />
      </div>
      <div className='flex flex-col'>
      {(arr.length==0)?(  <div className='flex items-center justify-center '>
          <div className='border-t-4 relative top-40 border-t-blue-500 border-l-4 border-r-4 border-b-4 rounded-3xl border-white full w-12 h-12 animate-spin'>

          </div>
        </div>):( arr.map((e,i)=>{
        return  <UserList key={e._id} id={e._id} name={e.firstName+" "+e.lastName}/>
      }))}
      
         
      </div>
     
    </>
  )
}
async function fetchData(setArr){
  
      try {
        const response=await axios.get('https://paytm-backend-clone.onrender.com/api/v1/user/bulk',{
          params:{
            filters:document.getElementById('text').value
          }
        })
        let a=Array.from(response.data.users)
       setArr(a)
      } catch (error) {
        console.error("Error fetching data\n"+error)
      }
    }
export default DashBoard
