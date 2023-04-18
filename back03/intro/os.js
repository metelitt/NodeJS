const os=require('os')

console.log("Операционная система",os.platform());
console.log("Архитектура процессорв",os.arch());
console.log("Информация о процессоре",os.cpus());
console.log("Информация о cвободной памяти",os.freemem()/1024/1024/1024);
console.log("Информация о всей памяти",os.totalmem()/1024/1024/1024);
console.log("Домашняя директория",os.homedir());
console.log("Время работы системы",os.uptime()/60/60);

