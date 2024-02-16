import React, { useRef } from 'react'
import {useNavigate} from "react-router-dom"
function UserList(props) {
  let nav=useNavigate()
    let fn=useRef()
  return (
    <div className={`flex flex-row justify-between px-4 py-1 hover:bg-slate-100 cursor-pointer `}>
      <div>

       <button  className='border-2 border-solid-black px-3 py-1 rounded-3xl'>{props.name.charAt(0)}</button>
       <p ref={fn} className='inline px-3 font-semibold'>{props.name}</p>
        </div>
        <button onClick={()=>{
       nav(`/moneytransfer?id=${props.id}&name=${props.name}`)
        
        }} className='border-2 border-solid-black px-3 py-1 rounded-md bg-black text-white'>Send Money</button>
    </div>
  )
}

export default UserList
