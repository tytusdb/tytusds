let arbolb=require('./Abinario');

let bst = new arbolb();

bst.append(10);
bst.append(5);
bst.append(15);
bst.append(14);
bst.append(16);
bst.append(1);
bst.append(6);
bst.eliminar(15);
bst.inorden();

//ELIMINAR UN NODO HOJA SI HIJOS FUNCIONA
