import React, { useRef, useState } from 'react'
import {useNavigate} from"react-router-dom"
import axios from "axios"
import {Link} from "react-router-dom"
 function SignUp() {
  const navigate=useNavigate()
  let fn=useRef()
  let ln=useRef()
  let em=useRef()
  let ps=useRef()
  const [firstName,setfirstName]=useState(false)
  const [lastName,setlastName]=useState(false)
  const [email,setemail]=useState(false)
  const [password,setPassword]=useState(false)
  const [invalidemail,setInvalidemail]=useState(false)
  const [minpassword,setminpassword]=useState(false)
  const [emailtaken,setemailtaken]=useState(false)
  const [loading,setloading]=useState(false)
  return (
    <>
      <div className='w-full h-screen bg-white flex flex-col text-wrap justify-center items-center '>

           <div className='bg-white w-80  py-5 px-5 border rounded-md h-fit shadow-2xl'>

            <h1 className='text-center  font-bold text-3xl'>Sign Up</h1>

            <p className='text-slate-500 text-center'>Enter your information to create an account</p>

            <label htmlFor="Fname" className='font-medium '>First Name</label><br />
           <div className='p-0 mb-1'>

            <input type="text" ref={fn} className='border text-slate-950 border-slate w-full py-1 px-1 rounded-md my-0' id='Fname' placeholder='John'  /><br />
            {firstName && <p className='text-xs text-red-500'>Firstname is required</p> }
            
           </div>

           
            
      
            <label htmlFor="Lname" className='font-medium'>Last name</label> <br />
            <div className='p-0 mb-1'>

            <input type="text" className='border text-slate-950 border-slate w-full py-1 px-1 rounded-md my-2' id='Lname' placeholder='Doe' ref={ln} /><br />
            {lastName && <p className='text-xs text-red-500'>Lastname is required</p> }
            </div>

            <label htmlFor="email" className='font-medium'>Email</label>
            <div className='p-0 mb-1'>

            <input type="text" ref={em} className='my-2 border text-slate-950 border-slate w-full py-1 px-1 rounded-md' id='email' placeholder='johndoe@example.com' /><br />
            {email  && <p className='text-xs text-red-500'>Email is required</p> }
            {invalidemail && <p className='text-xs text-red-500'>Invalid email!!</p> }
            {emailtaken && <p className='text-xs text-red-500'>Email already taken!!</p>}
            </div>

            <label htmlFor="password" className='font-medium'>Password</label><br />
            <div className='p-0 mb-1'>
            <input type="password"ref={ps} className='border text-slate-950 border-slate w-full py-1 px-1 rounded-md my-1' id='password'  /><br /> 
            {password && <p className='text-xs text-red-500'>Password is required</p> }
            {minpassword && <p className='text-xs text-red-500'>Password must contain at least 6 character(s)</p> }

            </div>

          <button className=' my-2 py-1 w-full text-center text-white bg-black border rounded-md' onClick={async()=>{
            if(fn.current.value==''){
               setfirstName(true);
              setTimeout(() => {
                 setfirstName(!true);
              }, 3000);
              return ;
              
            }
            if(ln.current.value==''){
               setlastName(true);
              setTimeout(() => {
                 setlastName(!true);
              }, 3000);
              return ;
            }
            if(em.current.value==''){
              setemail(true);
              setTimeout(() => {
                 setemail(!true);
              }, 3000);
              return ;
            }
            if(ps.current.value==''){
              setPassword(true);
              setTimeout(() => {
                 setPassword(!true);
              }, 3000);
              return ;
            }
          
            let ob={
  username:em.current.value,
  firstName:fn.current.value,
  lastName:ln.current.value,
  password:ps.current.value
 }
 setloading(true)
 try {
    const res= await axios.post('http://localhost:3000/api/v1/user/signup',JSON.stringify(ob),{
  headers:{
    'Content-Type':'application/json',
   
  }
 }).then((e)=>{


 localStorage.setItem('token',e.data.token)
  navigate("/dashboard")
 }
 ).catch((e)=>{
 
 if(e.response.data.msg=="Invalid email"){
  setInvalidemail(true)
  setTimeout(() => {
     setInvalidemail(!true)
  }, 3000);
  return
 }
 if(e.response.data.msg=="Password must contain at least 6 character(s)"){
  setminpassword(true)
  setTimeout(() => {
     setminpassword(!true)
  }, 3000);
  return
 }
 if(e.response.data.msg=="Email already taken"){

 }
 })
 } catch (error) {
  console.log(error);
 }
 
      
}}>{loading?<div className='flex items-center justify-center '>
          <div className='border-t-4  border-t-black border-l-4 border-r-4 border-b-4 rounded-3xl border-white full w-7 h-7 animate-spin bg-opacity-75'>
               
          </div>
        </div>:"Sign Up"}</button>

             <p className='text-center font-semibold '>Already have an account?<Link to={'/signin'} className=' cursor-pointer underline'>Sign In</Link></p>



           </div>
      </div>   
    </>
  )
}

export default SignUp