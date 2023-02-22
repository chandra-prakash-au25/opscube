const db=require('./db.js')
const router=require('express').Router()
const jwt =require("jsonwebtoken");
const multer=require('multer');
const upload=multer({dest:'./uploads'})
const express=require('express')


const {
    verifyTokenAndAdmin,
  } = require("./auth");


router.get("/books",(req,res)=>{
    const q='SELECT * FROM BOOKS'
    try{
        db.query(q,(err,data)=>{
            if (err)
            {return res.status(501).json(err);}
            return res.status(200).json(data)
        })
    
    }
    catch{
        res.status(500).json("error occured")
    }

})
//upload.single('image')
router.post("/book",verifyTokenAndAdmin,upload.single('image'),(req,res)=>{
    console.log(req.file.path,"=============")
    console.log(req.body)
    const q="INSERT INTO BOOKS(`title`,`author`,`price`,`desc`,`img`) VALUES (?)";
    const values=[req.body.title,req.body.author,req.body.price,req.body.desc,req.file.path]
    try{
        db.query(q,[values],(err,data)=>{
            if(err){
              return res.status(500).json(err)  
            }
            return res.status(200).json(data)
        })
    }
    catch{
        res.status(500).json("something went wrong")
    }

    
})


router.delete("/book",verifyTokenAndAdmin,(req,res)=>{
    const q="DELETE FROM BOOKS WHERE ID=?"
    const id =req.query.bookid
    try{
        db.query(q,[id],(err,data)=>{
            if(err){
                return res.status(500).json(err)
            }
            return res.status(200).json(data)

        })
    }
    catch{
        res.status(500).json("something went wrong")
    }
    
})


router.get("/single/book",(req,res)=>{
    const q="SELECT * FROM BOOKS WHERE ID=?"
    const id =req.query.bookid
    console.log(id)
    try{
        db.query(q,[id],(err,data)=>{
            if(err){
                return res.status(500).json(err)
            }
            return res.status(200).json(data)
        })
    }
    catch{
        res.status(500).json("something went wrong")
    }
    
})


router.get("/books/search",(req,res)=>{
       const keyword=req.query.search
       console.log(keyword)
       const q='SELECT * FROM BOOKS WHERE (?) in (`title`,`price`,`author`,`desc`)'
       try{
            db.query(q,[keyword],(err,data)=>{
                if(err){
                    return res.status(500).json(err)
                }
                return res.status(200).json(data)
            })
       }
       catch{
        res.status(500).json("someting went wrong")
       }
})



module.exports=router