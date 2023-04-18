const express=require('express');
const mysql=require("mysql2");
const multer=require("multer");//новый парсер
const crypto=require("crypto");
const cookieParser = require('cookie-parser');
const app=express();
const PORT=3000;
app.use(cookieParser('secret key'))
// parser данных application 
// const urlecodedParser=express.urlencoded({extended:false})
// соединение с базой данных 
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"backendRinat"
})
// соединение с базой данных
connection.connect((err)=>{
    if(err) throw err
    console.log("Подключение к БД установлено");  
})
// get
app.get("/",(req,res)=>{
    res.cookie('token', '12345ABCDE') //secret key
res.send('<h1><a href="/reg">Зарегестрироваться</a> | <a href="/login">Войти</a></h1>')
})
app.get("/reg",(req,res)=>{
    res.sendFile(__dirname+('/reg.html'))
})
app.get("/login",(req,res)=>{
    res.sendFile(__dirname+('/login.html'))
})
app.get("/lk",(req,res)=>{
    if(req.cookies['token']=='12345ABCDE'){
        res.sendFile(__dirname+('/index.html'))
    }else{
        res.send("Доступ запрещён")
    }
})

app.get("/logout",(req,res)=>{
    res.clearCookie('token')
    res.send("Log Out")
})
// post /reg
app.post("/reg",multer().none(),(req,response)=>{
    // console.log("body:",req.body);

let sentResult="success"
const email=req.body.email.toLowerCase()
const hashPass=crypto
        .createHash('sha256','back02')
        .update(req.body.pass)
        .digest("hex");

       connection.query("SELECT id FROM users WHERE email=?",[email],(error,res,metaData)=>{
        if(res.length){
            console.log("exist")
            sentResult="exist"
            response.send(sentResult)
        }
        else{
            let user=[req.body.name,req.body.lastname,email,hashPass];
                    connection.query("INSERT INTO `users`(`name`, `lastname`, `email`, `pass`) VALUES (?,?,?,?)",user,(error,result,metaData)=>{
        console.log(error);
        console.log(result);
        response.send(sentResult);
                })
        }
                })
})
// post /login
app.post("/login",multer().none(),(req,response)=>{

    const email=req.body.email.toLowerCase()
   
    connection.query("SELECT * FROM users WHERE email=?",[email],(error,res,metaData)=>{
        if(res.length){
            const hashPass=crypto
            .createHash('sha256','back02')
            .update(req.body.pass)
            .digest("hex");
            if(hashPass==res[0].pass){
                console.log('log in success');
                response.send('success')
            }else{
                console.log("Pass is not correct");
                response.send('error pass')
            }
        }else{
            console.log("Login is not correct");
            response.send('error email')
        }
        })
})


// listen
app.listen(PORT,()=>{
    console.log(`Сервер запущен на порту:${PORT}`);
})