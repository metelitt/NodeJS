const fs=require('fs')
let path=require('path');
// fs.mkdir(path.join(__dirname,'test'),(error)=>{
//     if(error){
//         throw error
//     }
//     console.log("папка создана");
// })
let filePath=path.join(__dirname,'test','text.txt')
// fs.writeFile(filePath,'Hello NodeJS',(err)=>{
//     if(err){
//           throw err
//     }
//     fs.appendFile(filePath," \n Hello Again",(err)=>{
//         if(err){
//             throw err
//         }
//         console.log("file update");
//     })
//     console.log("file created");
// })
fs.readFile(filePath,'utf-8',(err,content)=>{
    if(err){
        throw err  //return console.log(err.message);
    }
console.log("Content",content);
})