class Nodo{
    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
    }
}

class ListaCircularSimple{
    constructor(){
        this.cabeza = null;
        this.cola = null;
    }

    agregarFinal(entrada){
        const nuevoNodo = new Nodo(entrada);
        let actual = this.cabeza;
        if(this.cabeza==null){
            this.cabeza = nuevoNodo;
            nuevoNodo.siguiente = this.cabeza;
            this.cola = nuevoNodo;

        }else{

            while(actual.siguiente!=this.cabeza){
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
            nuevoNodo.siguiente= this.cabeza;
            this.cola = nuevoNodo;
        }

    }

    agregarInicio(entrada){
        const nuevoNodo = new Nodo(entrada);
        if(this.cabeza==null){
            this.cabeza = nuevoNodo;
            nuevoNodo.siguiente = this.cabeza;
            this.cola = nuevoNodo;
        }else{
            nuevoNodo.siguiente = this.cabeza;
            this.cabeza = nuevoNodo;
            this.cola.siguiente = nuevoNodo;

        }
    }

    eliminar(entrada){
        let actual = this.cabeza;
        let anterior = null;
        let encontrado = false;

        while((actual!=null) && (encontrado==false)){ // si no es null y no se ha encotrado nada
            encontrado = (actual.dato == entrada);
            if(encontrado == false){ // si no es la entrada que se busca, se ejecuta
                anterior = actual; // guardo el anterior
                actual = actual.siguiente; // cambio de nodo, paso al siguiente
            }
        }

        if(actual!=null){ //diferente de null
            if(actual == this.cabeza){ // si lo que se elimino es la cabeza, se reasigna la cabeza
                this.cabeza = actual.siguiente;
            }else if(actual == this.cola){ // si lo que se elimina es la cola, el anterior de la cola, su siguiente es la cabeza
                actual.anterior.siguiente = this.cabeza;
            }else{
                anterior.siguiente = actual.siguiente;  // si es cualquiera, el anterior se enlaza con el siguiente del eliminado
            }
            actual = null; // se limpia

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

    imprimir(){
        console.log("Impresion \n");
        let actual = this.cabeza;
        let res = "";
            do{
                res += actual.dato +" ->  ";
                actual = actual.siguiente;
            }while(actual!=this.cabeza);
            console.log(res);
    }


}

export default ListaCircularSimple;
/*
const nodoPrueba = new ListaCircularSimple();
nodoPrueba.agregarInicio(0);
nodoPrueba.agregarFinal(1);
nodoPrueba.agregarFinal(2);
nodoPrueba.agregarFinal(3);
nodoPrueba.imprimir();
console.log(nodoPrueba.buscar(2));
nodoPrueba.actualizar(2,4);
nodoPrueba.imprimir();
nodoPrueba.eliminar(1);
nodoPrueba.imprimir();
*/
