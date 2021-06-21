const datos = require("./datos");
// const ListaSimple = require("./ListaSimple");
const Cola = require("./Cola");
 var lista = new Cola();
 lista.imprimir();

 var d1 = new datos(1,2);
 var d2 = new datos(3,6);
 var d3 = new datos(5,7);
 lista.imprimir();
 
console.log("-----FASE 1----------");
 lista.agregar(d1, false);
 lista.agregar(d2, false);
 lista.agregar(d3, false);
 lista.imprimir();

 console.log("------FASE 2---------");
 lista.agregar(d1, true);
 lista.agregar(d2, false);
 lista.agregar(d3, true);
 lista.imprimir();

 console.log("-------FASE 3--------");
 lista.agregar(d1, false);
 lista.agregar(d2, true);
 lista.agregar(d3, true);

lista.imprimir();
console.log("######### COMPROBANDO ########");
lista.actualizar(3,9,false);
lista.imprimir

lista.eliminar();
//revisar el eliminar, porque no encontro el 5 y si esta
//revisar lo de permitir repetidos no esta funcionand

console.log("------FASE 4--------");

lista.imprimir();

console.log("-------FASE 5--------");
lista.eliminar();
lista.imprimir();

console.log("-------FASE 5.2--------");
lista.eliminar();
lista.imprimir();

lista.eliminar();

console.log("-------FASE 6--------");
console.log(lista.buscar(1));

console.log("-------FASE 7--------");
lista.actualizar(5, 8, false);
lista.imprimir();
//no esta funcionando el buscar, retorna no encontraod y si hay varios 1

//listas circular si esta eliminando, pero no borra la cabeza cuando esta ahi el dago a eliminar
//arreglar eso