let path=require('path');
console.log('Название файла:',path.basename(__filename));
console.log('Название директории:',path.dirname(__dirname));
console.log('Расшириние файла:',path.extname(__filename));
console.log('Parse:',path.parse(__filename));
console.log('Join:',path.join(__dirname,'server','index.html'));