const NodoDoble = require("./NodoDoble");

class ListaCircularDoble {
    constructor(){
        this.primero = null;
    }

    agregar(datos){ //agregar al final 
        const auxiliar = new NodoDoble(datos);
        if (this.primero == null){
            this.primero = auxiliar;
            this.primero.siguiente = this.primero;
            this.primero.anterior = this.primero;
        } else {
            var actual = this.primero;
            while(actual.siguiente != this.primero){
                actual = actual.siguiente;
            }
            actual.siguiente = auxiliar;
            auxiliar.anterior = actual;
            auxiliar.siguiente = primero;
            this.primero.anterior = auxiliar;
        }
    }

    eliminar(dato){
        if(this.buscar(dato)){ //si el dato a buscar esta en la lista
            actual = this.primero;
            while(actual.siguiente != this.primero){
                if(actual.siguiente.dato1 == dato){
                    actual.siguiente = actual.siguiente.siguiente;
                    actual.siguiente.anterior = actual;
                    break;
                }
                actual = actual.siguiente;
            }
            if(this.primero.dato1 == dato && this.primero.siguiente == this.primero){
                this.primero.siguiente = null;
                this.primero.anterior = null;
                this.primero = null;
                //caso en el que se elimine el unico elemento de la lista
            }
        }
    }

    buscar(dato){
        if(this.primero != null){
            for(verificador = this.primero; verificador.siguiente != this.primero; verificador = verificador.siguiente){
                if (verificador.dato1 == dato){
                    return true;
                }
            }
            if (verificador.dato1 == dato){
                return true;
            }
        }
        return false;
    }

    actualizar(antiguo, nuevo){
        if(this.buscar(antiguo)){
            var actual = this.primero;
            while(true){
                if (verificador.dato1 == antiguo){
                    verificador.dato1 = nuevo;
                    break;
                    //actualizar solo el primero que coincida
                }
                actual = actual.siguiente;
            }
        }
    }

    imprimir(){
        console.log("LISTA CIRCULAR SIMPLEMENTE ENLAZADA: ")
        if(this.primero == null){
            console.log("lista vacia");
        }else{
            var actual = this.primero;
            while(actual.siguiente != this.primero){
                console.log(actual.datos.dato1)
                console.log(actual.datos.dato2)
                actual = actual.siguiente;
            }
            console.log(actual.datos.dato1)
            console.log(actual.datos.dato2)
        }
    }
}

module.exports = ListaCircularDoble;