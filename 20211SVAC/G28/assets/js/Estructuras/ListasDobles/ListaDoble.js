const NodoDoble = require("./NodoDoble");

class ListaSimple {
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    agregar(datos){
        const auxiliar = new NodoDoble(datos);
        if (this.primero == null){
            this.primero = auxiliar;
            this.primero.siguiente = null;
            this.primero.anterior = null;
        } else {
            var actual = this.primero;
            while(actual.siguiente != null){
                actual = actual.siguiente;
            }
            actual.siguiente = auxiliar;
            auxiliar.anterior = actual;
            auxiliar.siguiente = null;
        }
    }

    eliminar(dato){
        if(this.buscar(dato)){
            if(this.primero.dato1 == dato && this.primero.siguiente == null && this.primero.anterior == null){
                //si solo queda 1 elemento y hay que eliminarlo
                this.primero = null;
            }else{
                actual = this.primero;
                while(actual.siguiente != null){
                    if(actual.siguiente.dato1 != dato){
                        if(actual.siguiente.siguiente == null){
                            actual.siguiente.anterior = null;
                            actual.siguiente = null;
                            break; //porque solo elimina el primero que encuentre
                        }else{
                            actual.siguiente = actual.siguiente.siguiente;
                            actual.siguiente.anterior = actual;
                            break;
                        }
                    }
                    actual = actual.siguiente;
                }
            }
        }
    }

    buscar(dato){
        if(this.primero != null){
            for(verificador = this.primero; verificador != null; verificador = verificador.siguiente){
                if (verificador.dato1 == dato){
                    return true;
                }
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
        for(verificador = this.primero; verificador != null; verificador = verificador.siguiente){
            console.log(veificador.datos);
        }
    }

}

module.exports = ListaSimple;