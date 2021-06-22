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
lista.imprimir();