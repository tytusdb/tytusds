class NodoBinario{
    constructor(dato){
        this.valor = dato;
        this.derecha = null;
        this.izquierda = null;
        this.padre = null;
    }
}

class ArbolBinario{
    constructor(){
        this.root = null;
        this.size = 0;
    }

    agregar(dato, actual = this.root){
    
        if (this.size > 0){
            if (dato > actual.valor){
                if ( actual.derecha != null){ //si el nodo a la derecha no esta vacio, continua buscando.
                    this.agregar(dato, actual.derecha);
                }else{
                    let nuevo = new NodoBinario(dato);
                    actual.derecha = nuevo;
                    actual.derecha.padre = actual;
                    this.size++;
                }
            }else{
                if (actual.izquierda != null){  //si el nodo a la izquierda no esta vacio, continua buscando.
                    this.agregar(dato, actual.izquierda);
                }else{
                    let nuevo = new NodoBinario(dato);
                    actual.izquierda = nuevo;
                    actual.izquierda.padre = actual;
                    this.size++;
                }
            }
        }else{
            let nuevo = new NodoBinario(dato);
            this.root = nuevo;
            this.size++;
        }
    }

    nodo(dato, actual = this.root){ //funcion que devuelve nodo, se usa en eliminar()
        if (dato > actual.valor){
            if(actual.derecha != null){
                return this.nodo(dato, actual.derecha);
            }else{
                return null;
            }
        }else if (dato < actual.valor){
            if(actual.izquierda != null){
                return this.nodo(dato, actual.izquierda);
            }else{
                return null;
            }
        }else{
            return actual;
        }
    }

    hallarMinR(nodo){ //metodo para hallar el nodo de valor minimo a la izquierda del original al eliminar
        nodo = nodo.derecha;
        let noHijosL = false; //variable para chequear cuando el nodo ya no tenga hijos en izquierda
        while(!noHijosL){
            if(nodo.izquierda == null){
                noHijosL = true;
            }else{
                nodo = nodo.izquierda;
            }
        }

        return nodo
    }

    eliminar(dato){
        let nodo = this.nodo(dato); //busca el nodo en el arbol

        if(nodo != null){   //la funcion nodo() retorna null si no lo encuentra
            let padre = nodo.padre;

            let isDerecha = false;  //revisa si el nodo es un hijo derecho o izquierdo
            if (nodo != this.root){
                if(padre.derecha == nodo){
                    isDerecha = true;
                }
            }

            if(nodo.izquierda == null && nodo.derecha == null){ //caso sin hijos
                if(nodo != this.root){
                    if(isDerecha){
                        padre.derecha = null;
                    }else{
                        padre.izquierda = null;
                    }

                    this.size--;
                }else{
                    this.root = null;
                    this.size--;
                }
            }else if((nodo.derecha == null && nodo.izquierda != null)){ //caso un hijo L
                if(nodo != this.root){
                    if(isDerecha){
                        padre.derecha = nodo.izquierda;
                    }else{
                        padre.izquierda = nodo.izquierda;
                    }
                }else{
                    this.root = this.root.izquierda;
                }
            }
            else if((nodo.derecha != null && nodo.izquierda == null)){ //caso un hijo R
                if(nodo != this.root){
                    if(isDerecha){
                        padre.derecha = nodo.derecha;
                    }else{
                        padre.izquierda = nodo.derecha;
                    }
                }else{
                    this.root = this.root.derecha;
                }

            }else if(nodo.derecha != null && nodo.izquierda != null){ //caso dos hijos
                let minR = this.hallarMinR(nodo); //Se busca el valor minimo mayor al nodo
                this.eliminar(minR.valor);  //Se elimina el valor del nodo encontrado
                nodo.valor = minR.valor;    //Se reemplaza el valor del nodo por el minimo encontrado
            }
        }else{
            console.log('El dato ingresado no existe en el arbol.')
        }
    }

    buscar(dato, actual = this.root){
        if (dato > actual.valor){
            if(actual.derecha != null){
                return this.buscar(dato, actual.derecha);
            }else{
                return false;
            }
        }else if (dato < actual.valor){
            if(actual.izquierda != null){
                return this.buscar(dato, actual.izquierda);
            }else{
                return false;
            }
        }else{
            return true;
        }
    }

    actualizar(existente, nuevo){
        if(this.buscar(existente)){
            this.eliminar(existente);
            this.agregar(nuevo);
        }
    }

    cargar(){
        console.log('leyendo json.');
    }

    guardar(){
        console.log('guardando en json.')
    }

    preorden(nodo = this.root){
        if (nodo != null){
            console.log('Valor: ',nodo.valor);
            this.preorden(nodo.izquierda);
            this.preorden(nodo.derecha);
        }
    }

    inorden(nodo = this.root){
        if (nodo != null){
            this.inorden(nodo.izquierda);
            console.log('Valor: ',nodo.valor);
            this.inorden(nodo.derecha);
        }
    }

    postorden(nodo = this.root){
        if (nodo != null){
            this.postorden(nodo.izquierda);
            this.postorden(nodo.derecha);
            console.log('Valor: ',nodo.valor);
        }
    }
}

module.exports = ArbolBinario;