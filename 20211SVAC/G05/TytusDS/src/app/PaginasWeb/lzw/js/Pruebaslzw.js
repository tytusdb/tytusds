let lzw= require('./lzw');
let texto;
texto="pablo papa de pablito";

let Lzw = new lzw(texto);
Lzw.Gcodigo()
console.log(Lzw.codigo);
console.log(Lzw.diccionario);

let l= ["hola","xd"]
console.log(l.indexOf("hola"))
