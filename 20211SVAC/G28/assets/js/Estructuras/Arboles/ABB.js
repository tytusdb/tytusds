const Nodo = require("./Nodo");

class ABB{
    constructor(){
        this.raiz = null;
    }

    Agregar(dato){
        var aux = new Nodo(dato);
        if (this.raiz == null){
            this.raiz = aux;
        }else{
            actual = this.raiz;
            while(true){
                if(actual.dato < dato){
                    if(actual.izquierda != null){
                        actual = actual.izquierda;
                    }else{
                        actual.izquierda = aux;
                        break;
                    }
                }else{
                    if(actual.derecha != null){
                        actual = actual.derecha;
                    }else{
                        actual.derecha = aux;
                        break;
                    }
                }
            }
        }
    }

Eliminar(dato){
    if (this.Buscar(dato)){
        actual = this.raiz;
        while(actual != null){
            if(actual.siguiente.dato == dato){
                this.Borrar(actual);
                break;
            }
            if(actual.dato < dato){
                actual = actual.izquierda;
            }else{
                actual = actual.derecha;
            }
        }
        //borrar y reacomodar arbol como en simulador
    }
}

Borrar(rama){
    if(rama==this.raiz){
        if(rama.izquierda == null && rama.derecha == null){
            this.raiz = null;
        }else{
            if(rama.izquierda == null){
                
            }
        }

    }
}

Buscar(dato){
    actual = this.raiz;
    while(actual != null){
        if(actual.dato == dato){
            return true;
        }
        if(actual.dato < dato){
            actual = actual.izquierda;
        }else{
            actual = actual.derecha;
        }
    }
    return false;
}

Reemplazar(dato){
    // buscar, eliminar y reinsertar
}
}

module.exports = ABB;