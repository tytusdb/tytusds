class Pila{
    constructor(){
        this.stack = [];
    }

    //Ingresar a la pila
    push(dato){
        this.stack.push(dato);
        return this.stack;
    }
   
    //Sacar elementos de la pila
    pop(){
      return this.stack.pop();
    }

    //Muestra el ultimo elemento de la pila
    peek(){
        return this.stack[this.stack.length - 1];
    }

    size(){
        return this.stack.length;
    }

    //Imprimir datos de la pila
    print(){
        console.log(this.stack);
    }
}

const stack = new Pila();
console.log("Tamaño de la pila: " + stack.size());//Tamaño 0
console.log("Ingresando valores");
console.log(stack.push(1));
console.log(stack.push(2));
console.log(stack.push(3));
console.log("Tamaño de la pila: " +stack.size());
console.log("Ultimo de la pila: " +stack.peek()); //Muestra 3
console.log("Sacamos ultimo de la pila: " +stack.pop()); //Sacamos 3
console.log("Ultimo de la pila: " +stack.peek());//Muestra 2

