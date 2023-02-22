import "./Login.css";
import logo from './logo.jpg'
import back from './back.jpg'
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'


const Home = () => {
  const Navigate=useNavigate()
  const [bookdata,setBooks]=useState()
  const [isAdmin,setIsAdmin]=useState(0)
  const [search,setSearch]=useState()

  const handleSearch=()=>{
    const user=JSON.parse(localStorage.getItem("bookuser"))
    const token=user['token']
    axios.get('api/book/books/search',  {headers:{
      'token': `Basic ${token}`
             },
          params:{
          "search":search
       }
      }
    ).then(function (response) {
      setBooks(response.data)
      console.log(response.data)
      setBooks(response.data)

      
       }).catch(function (error) {
           console.error(error);
       });


  }
  const handleDelete=(id)=>{
    const user=JSON.parse(localStorage.getItem("bookuser"))
    const token=user['token']
    axios.delete('api/book/book',  {headers:{
      'token': `Basic ${token}`
    },
  params:{
    "bookid":id
  }
  }
    ).then(function (response) {
      console.log(response.data)
      Navigate('/home', { replace: true })
      window.location.reload(true)
      
       }).catch(function (error) {
        console.log(error)
        alert(error)
       });


  }
  const handleBuy=(id)=>{
    console.log(id)
    const user=JSON.parse(localStorage.getItem("bookuser"))
    const token=user['token']
    const other=user['other']
    console.log(other.id)
    axios.post('api/order/order', {"bookid":id,"userid":other.id,"count":1}, {headers:{
      'token': `Basic ${token}`
    },
    params:{
      "id":other.id
    }
  }
    ).then(function (response) {
      setBooks(response.data)
      console.log(response.data)
      Navigate('/home/order', { replace: true })

      
       }).catch(function (error) {
        console.log(error)
        alert(error)
       });



  }
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("bookuser"))
    setIsAdmin(user['other'].isAdmin)  
    console.log(isAdmin,'======================')
    axios.get('api/book/books'
    ).then(function (response) {
      setBooks(response.data)
      console.log(response.data)
       }).catch(function (error) {
          alert(error)
           console.error(error);
       });

  },[])
  return (
    <div className="home">
        <div className="navbar">
          <div className="left"><img className="logo"src={logo}/></div>
          <div className="right">
              <input className="search" placeholder="author,title desc..." onChange={(e)=>setSearch(e.target.value)} type='text'/>
              <button onClick={handleSearch}>Search</button>
              <Link to='order' className="link">Orders</Link>
          </div>
        </div>
        <div className="home2">
        <div className="heading"><h1>BOOK STORE</h1></div> 
        <div className="products">
          {bookdata && bookdata.map((book,i)=>{
            return(
              <div className="product" key={i}>
                <div><h4>{book.title}</h4></div>
                <div><img className="bookimg" src={back} alt="img"/></div>
                <div className="price"><p><b>PRICE:-</b>{book.price}</p></div>
                <div><p>Author:{book.author}</p></div>
                <div><p>desc:{book.desc} </p></div>

                {isAdmin ?
                <div>
                    <button  onClick={()=>Navigate("/addorupdate")}>ADD NEW </button>
                    <button onClick={(e)=>handleDelete(book.id)}>DELETE</button>

                </div>:<button onClick={()=>handleBuy(book.id)}>BUY NOW</button>

                }
              </div>
            )
          })
          
          }

        </div> 
        </div>
    </div>
  )
}

export default Home