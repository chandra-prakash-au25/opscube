import React from 'react'
import back from './back.jpg';
import logo from './logo.jpg';
import axios from 'axios'
import { useEffect,useState } from 'react';
const Order = () => {
const [book,setBook]=useState()

const handlecancel=(id)=>{
  const user=JSON.parse(localStorage.getItem("bookuser"))
  const token=user['token']
  axios.delete('http://localhost:4000/api/order/order',  {headers:{
    'token': `Basic ${token}`
  },
  params:{
    "orderid":id
}
}
  ).then(function (response) {
    console.log(response.data)
    window.location.reload(true)
    
     }).catch(function (error) {
      console.log(error)
      alert(error)
     });


}
useEffect(()=>{
  const user=JSON.parse(localStorage.getItem("bookuser"))
  const token=user['token']
  const userid=user['other'].id
  console.log(userid,'============')   
  if(user['other'].isAdmin){
  axios.get('http://localhost:4000/api/order/orders',{headers:{
    'token': `Basic ${token}`
  },
  params:{
    "id":userid
  }
}
  ).then(function (response) {
    setBook(response.data)
    console.log(response.data)
     }).catch(function (error) {
        alert(error)
         console.error(error);
     });
    }
    else{
      axios.get('http://localhost:4000/api/order/userorder',{headers:{
        'token': `Basic ${token}`
      },
      params:{
        "id":userid
      }
    }
      ).then(function (response) {
        setBook(response.data)
        console.log(response.data)
         }).catch(function (error) {
            alert(error)
             console.error(error);
         });

    }

},[])

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
            <div className="heading"><h1>ORDERS</h1></div> 
            <div className="products">

            {book && book.map((book,i)=>{
            return(
              <div className="product" key={i}>
                    <div><h4>{book.title}</h4></div>
                    <div><img className="bookimg" src={back} alt="img"/></div>
                    <div className="price"><p><b>PRICE:-</b>{book.price}</p></div>
                    <div className="price"><p>count :{book.count}</p></div>
                    <div><p>{book.desc}</p></div>
                    <span>You have ordered sucessfully</span>
                    <button onClick={()=>{handlecancel(book.id)}}>Cancel</button>


            
              </div>
            )
          })
          
          }

    
                
              
    
            </div> 
            </div>
        </div>
      )
    
}

export default Order