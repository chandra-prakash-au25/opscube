import React from 'react'
import './Login.css'
import {Link,useNavigate} from "react-router-dom"
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username,setUser]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
  const navigate=useNavigate()
  const handleClick=(e)=>{
      console.log(username,password,email)
      const data={
        "username":username,
        "password":password,
        "email":email
      }
      axios.post('api/auth/register', data
      ).then(function (response) {
        console.log(response)
        navigate('/', { replace: true })
         }).catch(function (error) {
             console.error(error);
         });
         e.preventDefault();

  }
  return (
    <div className='container'>
      <div className='form'>
      <div className='heading'><h1>Register</h1></div>
      <div className='username'>
          <span>UserName:</span><br/>
          <input type="text" placeholder="username" onChange={(e)=>setUser(e.target.value)}/>
        </div>
        <div className='username'>
          <span>Email:</span><br/>
          <input type="text" placeholder="username" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className='username' >
          <span>Password:</span><br/>
          <input type="text" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button onClick={handleClick}>Register</button>
        <p>already have account login <Link to="/">Login</Link></p>
      </div>
    </div>
  )
}

export default Register