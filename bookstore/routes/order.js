const db=require('./db.js')
const router=require('express').Router()
const jwt =require("jsonwebtoken");

const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./auth");

  router.get("/orders",verifyTokenAndAdmin,(req,res)=>{
    const q1="SELECT t1.count, t1.id,t1.userid,t1.bookid, t2.title,t2.price,t2.author,t2.desc,t2.img FROM ORDERS t1 INNER JOIN BOOKS t2 ON t2.id = t1.bookid ;"
    const q='SELECT * FROM ORDERS'
    try{
        db.query(q1,(err,data)=>{
            if (err)
            {return res.status(501).json(err);}

            return res.status(200).json(data)
        })
    
    }
    catch{
        res.status(500).json("error occured")
    }

})
router.get("/userorder",verifyTokenAndAuthorization,(req,res)=>{
    const id=req.query.id
    const q="SELECT t1.count, t1.id,t1.userid,t1.bookid, t2.title,t2.price,t2.author,t2.desc,t2.img FROM ORDERS t1 INNER JOIN BOOKS t2 ON t2.id = t1.bookid AND t1.userid=(?);"
    try{
        db.query(q,[id],(err,data)=>{
            if (err)
            {return res.status(501).json(err);}
            return res.status(200).json(data)
        })
    
    }
    catch{
        res.status(500).json("error occured")
    }

})

router.post("/order",verifyTokenAndAuthorization,(req,res)=>{
    console.log(req.body)
    const q="INSERT INTO ORDERS(`bookid`,`userid`,`count`) VALUES (?)";
    const values=[req.body.bookid,req.body.userid,req.body.count]
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


router.delete("/order",verifyTokenAndAuthorization,(req,res)=>{
    const q="DELETE FROM ORDERS WHERE id=?"
    const id =parseInt(req.query.orderid)
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


module.exports=router