import React, { useEffect ,useState} from 'react'
import {useNavigate} from "react-router-dom"
import { useRef } from 'react'
import {Link} from "react-router-dom"
import axios from"axios"
function SignIn() { 
  let us=useRef();
  let ps=useRef();
  const [email,setemail]=useState(false)
  const [invalidemail,setInvalidemail]=useState(false)
  const [password,setPassword]=useState(false)
  const [minpassword,setminpassword]=useState(false)
  const [emailorpass,setemailorpass]=useState(false)
  const nav=useNavigate()
  useEffect(()=>{

    if(localStorage.getItem('token')){
      nav('/dashboard')
    }
  },[])
  return (
    <>
      <div className='w-full h-screen bg-white flex flex-col text-wrap justify-center items-center '>

           <div className='bg-white w-80  py-5 px-5 border rounded-md h-fit shadow-2xl  '>

            <h1 className='text-center  font-bold text-3xl'>Sign In</h1>

            <p className='text-slate-500 text-center'>Enter your credentials to access your account</p>
            
            

            <label htmlFor="email" className='font-medium'>Email</label>
            <div className='mb-1 p-0'>

            <input type="text" ref={us} className='my-2 border text-slate-950 border-slate w-full py-1 px-1 rounded-md' id='email' placeholder='johndoe@example.com' /><br />
             {email  && <p className='text-xs text-red-500'>Email is required</p> }
              {invalidemail && <p className='text-xs text-red-500'>Invalid email!!</p> }
            </div>

            <label htmlFor="password" className='font-medium'>Password</label><br />
          <div className='p-0 mb-1 '>

            <input type="password" ref={ps} className='border text-slate-950 border-slate w-full py-1 px-1 rounded-md my-2' id='password'  /><br />
            {password && <p className='text-xs text-red-500'>Password is required</p> }
            {minpassword && <p className='text-xs text-red-500'>Password must contain at least 6 character(s)</p> }
            {emailorpass && <p className=' text-xs text-red-500'>Email doesn't exist or password is wrong</p> }
            
          </div>

            <button className=' my-2 py-1 w-full text-center text-white bg-black border rounded-md' onClick={async function (){
   let ob={
  username:us.current.value,
  password:ps.current.value
 }
 if(us.current.value==''){
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
 const res= await axios.post('http://localhost:3000/api/v1/user/signin',JSON.stringify(ob),{
  headers:{
    'Content-Type':'application/json'
  }
 }).then((e)=>{
    //console.log(e);

 localStorage.setItem('token',e.data.token)
  nav("/dashboard")
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
 if(e.response.data.msg=="Some error ocurred"){
 
  setemailorpass(true)
  setTimeout(() => {
     setemailorpass(!true)
  }, 3000);
  return
 }
 })

}}>Sign In</button>

            <p className='text-center font-semibold '>Don't have an account?<Link to={'/signup'} className=' cursor-pointer inline underline'>Sign Up</Link></p>


           </div>
      </div>
    </>
  )
}

export default SignIn
