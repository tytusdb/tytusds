
class NodoPila {
    constructor(dato, siguiente) {
      this.dato = dato;
      this.siguiente = siguiente;
    }
}
  
class Pila{

    constructor() {
      this.primero = null;
    }
    
    //Ingresar datos
    push(dato) {
      const nuevo = new NodoPila(dato, this.primero);
      this.primero = nuevo;
    }

    //Sacar el ultimo de la pila
    pop() {
      if (this.primero) {
        if (this.primero.siguiente) {
          const nodoAux = this.primero.siguiente;
          this.primero = nodoAux;
        } else {
          this.primero = null;
        }
      }
    }

    //Mostrar valores de la pila
    print() {
      let mostrarNodo = this.primero;
      while (mostrarNodo) {
        console.log(mostrarNodo.dato);
        mostrarNodo = mostrarNodo.siguiente;
      }
    }
}

const stack = new Pila();
console.log("Ingresando valores");
stack.push(1);
stack.push(2);
stack.push(3);
stack.print();
console.log("Sacamos ultimo de la pila: ");
stack.pop(); //Sacamos 3
stack.print();


