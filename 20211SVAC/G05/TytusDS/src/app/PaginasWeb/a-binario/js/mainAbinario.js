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
bst.append(5);
bst.append(15);
bst.append(14);
bst.append(16);
bst.append(15)
bst.append(1);
bst.append(6);
bst.preorden();
bst.eliminar(15);
bst.eliminar(10);
bst.eliminar(14);
bst.eliminar(16);
bst.eliminar(15);
console.log("xD");
bst.preorden();



//ELIMINAR UN NODO HOJA SI HIJOS FUNCIONA
