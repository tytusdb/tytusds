let Feistel=require('./feistel');
let feistel= new Feistel('0100001101000110','00110001',4);
let cifrado=feistel.Cifrar();
console.log(cifrado);
