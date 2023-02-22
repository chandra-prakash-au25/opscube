const express=require('express')
const app=express()
const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const cors=require('cors')
app.use(cors())
const db=require('./routes/db')
const user=require('./routes/user')
const book=require('./routes/book')
const order=require('./routes/order')
const multer=require('multer');
const upload=multer({dest:'./uploads'})


const {
    verifyTokenAndAdmin,
  } = require("./routes/auth");




app.use('./uploads',express.static('./uploads'))



app.get('/',(req,res)=>{
    res.send("hello")
})

app.use('/api/auth',user)
app.use('/api/book',book)
app.use('/api/order',order)

app.listen(4000,()=>{
    console.log("server is running")
})