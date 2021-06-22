let Listacircular=require('./ListaCircular');
let l=new Listacircular();
l.appendO(2);
l.appendO(4);
l.appendO(8);
l.appendO(9);

console.log(l.indexBusqueda("2"))
l.imprimir();

