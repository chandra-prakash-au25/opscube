const mysql=require('mysql2')


const db=mysql.createConnection({
    host:'localhost',
    user:"chandra",
    password:'chandra',
    database:"bookstore",
    port:3306
})


module.exports=db