var Matriz = require('./matriz');
//var Lista_Doble = require('./lista_doble');
//var Lista_Simple = require('./lista_simple');
//var Lista_Circular_Simple = require('./lista_circular_simple');
//var Lista_Circular_Doble = require('./lista_circular_doble');
//var Pila = require('./pila');
//var Cola = require('./cola')

/* Matriz Ortogonal */
let matriz = new Matriz();

matriz.insertar(0, 0, 0);
matriz.insertar(1, 1, 0);
matriz.insertar(2, 1, 1);
matriz.insertar(3, 2, 1);
matriz.insertar(4, 2, 2);
matriz.insertar(5, 2, 3);
matriz.insertar(6, 2, 4);
matriz.insertar(7, 2, 5);
matriz.insertar(8, 3, 1);
matriz.insertar(9, 5, 3);
matriz.insertar(10, 5, 5);

matriz.imprimir_horizontal();
console.log("-------------------")
matriz.imprimir_vertical();

/* Lista Doble Enlazada */

/*let lista_doble = new Lista_Doble();

lista_doble.insertar(1);
lista_doble.insertar(2);
lista_doble.insertar(3);
lista_doble.insertar(4);
lista_doble.insertar(5);
lista_doble.insertar(5);
lista_doble.insertar(5);
lista_doble.insertar(6);
lista_doble.insertar(10);

console.log("-------Lista Doble Enlazada------------")
lista_doble.print();
console.log("-------------------")
lista_doble.buscar(5);
lista_doble.buscar(7);
console.log("-------------------")
//lista_doble.eliminar(100);
lista_doble.eliminar(30);
lista_doble.eliminar(4);
lista_doble.eliminar(5);
lista_doble.print();
console.log("-------------------")
lista_doble.actualizar(45, 20);
lista_doble.actualizar(1, );
lista_doble.actualizar(3, 90);
lista_doble.actualizar(10, 30);
lista_doble.print();*/

/* Lista Simple Enlazada */

/*let lista_simple = new Lista_Simple();

lista_simple.insertar(1);
lista_simple.insertar(2);
lista_simple.insertar(3);
lista_simple.insertar(4);
lista_simple.insertar(5);
lista_simple.insertar(6);

console.log("------Lista Simple Enlazada--------");
lista_simple.print();
console.log("--------------");
lista_simple.buscar(2);
lista_simple.buscar(9);
console.log("--------------");
//lista_simple.eliminar(1);
lista_simple.eliminar(10);
lista_simple.eliminar(2);
lista_simple.print();
console.log("--------------");
lista_simple.actualizar(18,100);
lista_simple.actualizar(1,100);
lista_simple.actualizar(3,50);
lista_simple.actualizar(6,25);
lista_simple.print();*/

/* Lista Circular Simple Enlazada */

/*let lista_circular_simple = new Lista_Circular_Simple();

console.log("------Lista Circular Simple Enlazada---------");
lista_circular_simple.insertar(1);
lista_circular_simple.insertar("juan");
lista_circular_simple.insertar(2);
lista_circular_simple.insertar(3);
lista_circular_simple.insertar(4);
lista_circular_simple.insertar(5);
lista_circular_simple.insertar(6);
lista_circular_simple.print();
console.log("--------------");
lista_circular_simple.buscar(3);
lista_circular_simple.buscar(5);
console.log("--------------");
lista_circular_simple.actualizar("juan","pedro");
lista_circular_simple.actualizar(3,100);
lista_circular_simple.actualizar(4,67);
lista_circular_simple.print();
console.log("--------------");
lista_circular_simple.eliminar(1);
lista_circular_simple.eliminar(3);
lista_circular_simple.eliminar(100);
lista_circular_simple.eliminar(6);
lista_circular_simple.print();*/

/* Lista Circular Simple Enlazada */

/*let lista_circular_doble = new Lista_Circular_Doble();

console.log("------Lista Circular Doble Enlazada---------");
lista_circular_doble.insertar(1);
lista_circular_doble.insertar(2);
lista_circular_doble.insertar(3);
lista_circular_doble.insertar(4);
lista_circular_doble.insertar(5);
lista_circular_doble.print();
lista_circular_doble.print_alreves();
console.log("-------------------");
lista_circular_doble.buscar(1);
lista_circular_doble.buscar(5);
lista_circular_doble.buscar(15);
console.log("-------------------");
lista_circular_doble.actualizar(4,100);
lista_circular_doble.print();
console.log("-------------------");
lista_circular_doble.eliminar(5);
lista_circular_doble.print();*/

/* Pila */

/*let pila = new Pila();

console.log("------Pila---------");
pila.insertar_push(1);
pila.insertar_push(2);
pila.insertar_push(3);
pila.insertar_push(4);
pila.insertar_push(5);
pila.print_pila();
console.log("-------------------");
pila.buscar_pila(2);
pila.buscar_pila(56);
console.log("-------------------");
pila.actualizar_pila(56,90)
pila.print_pila();
console.log("-------------------");
pila.eliminar_pop();
pila.eliminar_pop();
pila.eliminar_pop();
pila.eliminar_pop();
pila.print_pila();*/

/* Cola */

/*let cola = new Cola();

console.log("------Cola---------");
cola.insertar_add(1);
cola.insertar_add(2);
cola.insertar_add(3);
cola.insertar_add(4);
cola.insertar_add(5);
cola.print_cola();
console.log("-------------------");
cola.buscar_cola(1);
cola.buscar_cola(3);
cola.buscar_cola(5);
cola.buscar_cola(100);
console.log("-------------------");
cola.actualizar_cola(1,30);
cola.actualizar_cola(3,60);
cola.actualizar_cola(5,90);
cola.actualizar_cola(16,30);
cola.print_cola();
console.log("-------------------");
cola.eliminar_remove();
cola.eliminar_remove();
cola.eliminar_remove();
cola.eliminar_remove();
cola.print_cola();*/
