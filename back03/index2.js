const http =require('http')
const mysql=require("mysql2")
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"backendRinat"
})

const server =http.createServer((request,response)=>{
    // console.log("request:",request);
    // response.end('<h1>Hello NodeJS</h1>')
    let data="";
    let result;
    request.on('data',chunk=>{
        data+=chunk
    });
    request.on('end',()=>{
        result=Object.fromEntries(new URLSearchParams(data))
        connection.connect((err)=>{
            if(err) throw err
            console.log("Подключение к БД установлено");  
        })
        connection.query("SELECT id FROM users WHERE email=? and pass=?",[result.email,result.pass],(error,res,metaData)=>{
if(res.length){
    console.log("Log In success")}
    else{
        console.log('Data is not correct')
    }
})
        response.end("Sucseseful log in in index 2")
    });
})
server.listen(3005,()=>{
    // console.log("Server has opened...");
}) 