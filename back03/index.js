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
        connection.query("SELECT id FROM users WHERE pass=?",[result.pass],(error,res,metaData)=>{
if(res.length){
    console.log("Добро пожаловать")
console.log(res);}
  else{
    console.log("Зарегестрируйтесь");
}
  
})


        connection.query("SELECT id FROM users WHERE email=?",[result.email],(error,res,metaData)=>{
if(res.length){
    console.log("exist")}
else{
    let user=[result.name,result.lastname,result.email,result.pass];
            connection.query("INSERT INTO `users`(`name`, `lastname`, `email`, `pass`) VALUES (?,?,?,?)",user,(error,result,metaData)=>{
console.log(error);
console.log(result);
        })
}
        })
        response.end("Sucseseful")
    });
})
server.listen(3000,()=>{
    console.log("Server has opened...");
})