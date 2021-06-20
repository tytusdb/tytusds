class NodoCola {
    constructor(dato, siguiente) {
      this.dato = dato;
      this.siguiente = siguiente;
    }
}
  
class Cola {
    constructor() {
      this.primero = null;
      this.guardarCola = null;
    }

    //Ingresar datos a la cola
    enqueue(dato) {
      const nuevo = new NodoCola(dato, null);
      if (this.guardarCola) {
        this.guardarCola.siguiente = nuevo;
      }
      this.guardarCola = nuevo
      if (!this.primero) {
        this.primero = this.guardarCola
      }
    }

    //Sacar el primero de la cola
    dequeue() {
      if (!this.primero) {
        return null;
      }
      const nodoPrimero = this.primero;
      if (this.primero.siguiente) {
        this.primero = this.primero.siguiente;
      } else {
        this.primero = null; 
        this.guardarCola = null; 
      }
      return nodoPrimero;
    }

    //mostrar datos de la cola
    print() {
      let mostrarNodo = this.primero;
      while (mostrarNodo) {
        console.log(mostrarNodo.dato);
        mostrarNodo = mostrarNodo.siguiente;
      }
    }

    //Metodo buscar
    buscar(dato){
      let mostrarNodo = this.primero;
      var encontrar = false;
      while (mostrarNodo) {
        if(mostrarNodo.dato === dato){
          encontrar = true;
          return encontrar;
        }
        mostrarNodo = mostrarNodo.siguiente;
      }
      return encontrar
    }
  }

const cola = new Cola();
console.log("Ingresando valores");
cola.enqueue("1");
cola.enqueue("2");
cola.enqueue("3");
cola.print();
console.log("Sacamos primero de la cola: ");
cola.dequeue() //Sacamos 1
cola.print();