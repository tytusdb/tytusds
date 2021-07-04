let lbst=require('./ABinario');

let bst= new lbst();
bst.append(0,15);
bst.append(0,5);
bst.append(0,10);
bst.append(0,20);
bst.append(15,16);
bst.append(15,6);
bst.append(15,1);
bst.append(15,7);
bst.append(15,17);
bst.recorrer();
let nodos=bst.Rlnodos();
let edges=bst.Rledges();
bst.Rdatos();
console.log(edges);
bst.delete(0);
bst.recorrer();

