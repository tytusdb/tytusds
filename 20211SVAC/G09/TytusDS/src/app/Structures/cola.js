class Cola{
    constructor(){
        this.cola = [];
    }

    //Verifica si la cola esta vacia
    isEmpty(){
        return this.cola.length === 0;
    }

    //Agrega un nuevo elemento de la cola
    //Agrega al final de la cola
    enqueue(dato){
       this.cola.push(dato);
       return this.cola;

    }

    //Elimina el primer elemento de la cola
    dequeue(){
        return this.cola.shift();
    }

    //Muestra el primer elemento de la cola
    peek(){
        return this.cola[0];
    }

    //Muestra el tamaño de la cola
    size(){
        return this.cola.length;
    }

    //Imprime los datos de la cola
    print(){
        return this.cola;
    }


}

const cola = new Cola();
console.log("Tamaño de la cola: " + cola.size());//Tamaño 0
console.log("Ingresando valores");
console.log(cola.enqueue(1));
console.log(cola.enqueue(2));
console.log(cola.enqueue(3));
console.log(cola.enqueue(4));
console.log("Tamaño de la cola: " +cola.size());
console.log("Primero de la cola: " +cola.peek()); //Muestra 1
console.log("Sacamos primero de la cola: " +cola.dequeue()); //Sacamos 1
console.log("Primero de la cola: " +cola.peek());//Muestra 2