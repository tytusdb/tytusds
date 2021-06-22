let arbolb=require('./Abinario');

let bst = new arbolb();
let l={
  hola:"xD",
  mañana:"jijo"
}
let m={
  hola:"xD",
    mañana:"jijo"
}
console.log(JSON.stringify(l)===JSON.stringify(m));

bst.append(10);
bst.append(10);
console.log("xD");
bst.preorden();



//ELIMINAR UN NODO HOJA SI HIJOS FUNCIONA
