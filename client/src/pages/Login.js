import React from 'react'
import './Login.css'
import {Link,useNavigate} from "react-router-dom"
import { useState } from 'react';
import axios from 'axios'

const Login = (e) => {
  const [username,setUser]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  const handleClick=()=>{
    localStorage.clear();
      console.log(username,password)
      const data={
        "username":username,
        "password":password
      }
      axios.post('api/auth/login',data
      ).then(function (response) {
        console.log(response.data)
        localStorage.setItem("bookuser",JSON.stringify(response.data))
        navigate('/home', { replace: true })
         }).catch(function (error) {
             console.error(error);
         });

        e.preventDefault();
  }
  return (
    <div className='container'>
      <div className='form'>
      <div className='heading'><h1>Login</h1></div>
      <div className='username'>

          <span>UserName:</span><br/>
          <input type="text" placeholder="username" onChange={(e)=>setUser(e.target.value)}/>
        </div>
        <div className='username' >
          <span>Password:</span><br/>
          <input type="text" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button onClick={handleClick}>Login</button>
        <p>Don't have account Register <Link to="register">Register</Link></p>
      </div>
    </div>
  )
}

export default Login