class Nodo{
    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ListaCircularDoble{
    constructor(){
        this.cabeza = null;
        this.cola = null;
    }

    agregarFinal(entrada){
        const nuevoNodo = new Nodo(entrada);
        let actual = this.cabeza;
        if(this.cabeza == null){
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
            nuevoNodo.siguiente = this.cabeza;
            this.cabeza.anterior = nuevoNodo;
            nuevoNodo.anterior = actual;
        }else{
            while(actual.siguiente!=this.cabeza){
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
            nuevoNodo.siguiente = this.cabeza
            this.cola = nuevoNodo;
            this.cabeza.anterior = nuevoNodo;
            nuevoNodo.anterior = actual;
        }
    }

    agregarInicio(entrada){
        const nuevoNodo = new Nodo(entrada);
        if(this.cabeza == null){
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
            nuevoNodo.siguiente = this.cabeza;
            nuevoNodo.anterior = this.cola;

        }else{
            nuevoNodo.siguiente = this.cabeza;
            this.cabeza.anterior = nuevoNodo;
            this.cabeza = nuevoNodo;
            nuevoNodo.anterior = this.cola;
            this.cola.siguiente = this.cabeza;

        }
    }

    buscar(entrada){
        let actual = this.cabeza;
        do{
            if(entrada == actual.dato){
                return entrada;
            }
            actual = actual.siguiente;
        }while(actual!=this.cabeza);
        return null;
    }

    actualizar(entrada, valor){
        let actual = this.cabeza;
        do{
            if(entrada == actual.dato){
                actual.dato = valor;
                break;
            }
            actual = actual.siguiente;
        }while(actual!=this.cabeza);
    }

    eliminar(entrada){
        let actual = this.cabeza;
        let valorAnterior = null;
        let valorMuySiguiente = null;
        let encontrado = false;

        while((actual!=null) && (encontrado==false)){ // si no es null y no se ha encotrado nada
            encontrado = (actual.dato == entrada);
            if(encontrado == false){ // si no es la entrada que se busca, se ejecuta
                valorAnterior = actual; // guardo el anterior
                actual = actual.siguiente; // cambio de nodo, paso al siguiente
            }
        }

        if(actual!=null){ //diferente de null
            if(actual == this.cabeza){ // si lo que se elimino es la cabeza, se reasigna la cabeza
                this.cabeza = actual.siguiente;
                this.cabeza.anterior = this.cola;
                this.cola.siguiente = this.cabeza;
            }else if(actual == this.cola){ // si lo que se elimina es la cola, el anterior de la cola, su siguiente es la cabeza
                this.cola = valorAnterior;
                this.cola.siguiente = this.cabeza;
                this.cabeza.anterior = this.cola;

            }else{
                valorMuySiguiente = actual.siguiente;
                valorAnterior.siguiente = actual.siguiente;
                valorMuySiguiente.anterior = valorAnterior;

            }
            actual = null; // se limpia

        }

    }

    imprimirDelante(){
        console.log("Impresion \n");
        let actual = this.cabeza;
        let res = "";
            do{
                res += actual.dato +" ->  ";
                actual = actual.siguiente;
            }while(actual!=this.cabeza);
            console.log(res);
    }

    imprimirAtras(){
        console.log("Impresion \n");
        let actual = this.cola;
        let res = "";
            do{
                res += actual.dato +" ->  ";
                actual = actual.anterior;
            }while(actual!=this.cola);
            console.log(res);
    }
}

export default ListaCircularDoble;
/*
const nodoPrueba = new ListaCircularDoble();

// nodoPrueba.agregarFinal(1);
// nodoPrueba.agregarFinal(2);
// nodoPrueba.agregarFinal(3);
// nodoPrueba.imprimirDelante();
// nodoPrueba.imprimirAtras();
// nodoPrueba.agregarInicio(0);
// console.log(nodoPrueba.buscar(1));
// nodoPrueba.imprimirDelante();
// nodoPrueba.imprimirAtras();
// nodoPrueba.actualizar(2,5)
// nodoPrueba.imprimirDelante();
// nodoPrueba.imprimirAtras();
nodoPrueba.eliminar(3);
nodoPrueba.imprimirDelante();
nodoPrueba.imprimirAtras();*/

