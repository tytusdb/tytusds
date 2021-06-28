let lbst=require('./ABinario');

let bst= new lbst();
bst.append(0,15);
bst.append(0,5);
bst.append(0,10);
bst.append(0,20);
bst.preorden();
let nodo=bst._buscar(bst.l_horizontal.head,20);
console.log(nodo.valor);
