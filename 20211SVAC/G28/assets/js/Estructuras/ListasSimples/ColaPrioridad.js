const Nodo = require("./Nodo");

class ColaPrioridad {
    constructor(){
        this.primero = null;
    }

    agregar(valor){ //encolar
        const auxiliar = new Nodo(valor);
        if (this.primero == null){
            this.primero = auxiliar;
        } else {
            if(this.cabeza.siguiente == null){
                //si solo hay 1 elemento
                if(this.cabeza.prioridad > valor.prioridad){
                    this.cabeza.siguiente = auxiliar;
                }else{
                    auxiliar.siguiente = this.cabeza;
                    this.cabeza = auxiliar;
                }
            }else{
                if (this.cabeza.prioridad < auxiliar.prioridad ){
                    auxiliar.siguiente = this.cabeza;
                    this.cabeza = auxiliar;
                }else{

                    actual = this.primero;
                    while(actual.siguiente.prioridad >= auxiliar.prioridad){
                        actual = actual.siguiente;
                        if (actual.siguiente == null){
                            break;
                        }
                    }
                    //aquí el siguiente es una prioridad menor al auxiliar
                    auxiliar.siguiente = actual.siguiente;
                    actual.siguiente = auxiliar;
                }
            }
        }
    }

    eliminar(){ //desencolar
        retorno = this.primero;
        if (this.primero == null){
            console.log("Cola vacía");
            return null;
        }else{
        if (this.primero.siguiente != null){
                this.primero = retorno.siguiente;
            }else{
                this.primero = null;
            }
            return retorno.datos;
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

module.exports = ColaPrioridad;