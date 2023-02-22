import React from 'react'
import logo from './logo.jpg';
import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Newproduct = () => {
    const [title,setTitle]=useState()
    const [price,setPrice]=useState()
    const [author,setAuthor]=useState()
    const [desc,setDesc]=useState()
    const [img,setImg]=useState()
    const navigate=useNavigate()

    const handleadd=()=>{
    var formData=new FormData()
    formData.append('title',title)            
    formData.append('author',author)            
    formData.append('price',price)            
    formData.append('desc',desc)            
    formData.append('image',img)   
    
    const user=JSON.parse(localStorage.getItem("bookuser"))
    const token=user['token']
    
    axios.post('api/book/book',formData,{headers:{
        'token': `Basic ${token}`
      }
    }
    ).then(function (response) {
      console.log(response.data)
      navigate('/home', { replace: true })
       }).catch(function (error) {
           alert(error)
       });

        }

    
    return (
        <div className="home">
            <div className="navbar">
              <div className="left"><img className="logo"src={logo}/></div>
              <div className="right">
                  <input className="search" placeholder="author,title desc..." type='text'/>
                  <button>Search</button>
              </div>
            </div>
            <div className="home2">
            <div className="heading"><h1>ADD NEW BOOK</h1></div> 
            <div className="products">
                <div className='row' ><span>TITLE:</span><input type="text" onChange={(e)=>setTitle(e.target.value)}  className='.add'/></div>
                <div className='row' ><span>PRICE:</span><input type="text" onChange={(e)=>setPrice(e.target.value)} className='.add'/></div>
                <div className='row' ><span>AUTHOR:</span><input type="text" onChange={(e)=>setAuthor(e.target.value)} className='.add'/></div>
                <div className='row' ><span>IMAGE:</span><input type="file" onChange={(e)=>setImg(e.target.files[0])}className='.add'/></div>
                <div className='row' ><span>DESCRITION:</span><textarea type="text"onChange={(e)=>setDesc(e.target.value)}  className='text'/></div>
                <button onClick={handleadd}>ADD</button>
            </div> 
            </div>
        </div>
      )
    
}

export default Newproduct