class NodoAVL{
    constructor(dato){
        this.valor = dato;
        this.derecha = null;
        this.izquierda = null;
        this.padre = null;
        this.factorB = 0
        this.altura = 0
    }
}

class AVL{
    constructor(){
        this.root = null;
        this.size = 0;
    }

    agregar(dato){
        if(dato != null){
            if(!this.buscar(dato)){
                this.root = this.insertar(dato,this.root)
                this.size++;
            }
        }else{
            console.log('No se recibio ningun dato en la entrada.')
        }
    }

    insertar(dato, nodo){
        if(nodo == null){
            return new NodoAVL(dato);
        }

        if(dato > nodo.valor){
            nodo.derecha = this.insertar(dato, nodo.derecha);
            nodo.derecha.padre = nodo;
        }else{
            nodo.izquierda = this.insertar(dato, nodo.izquierda);
            nodo.izquierda.padre = nodo;
        }

        this.actualiz(nodo);

        return this.balancear(nodo);
    }

    max(a,b){   //Devuelve el mayor de dos numeros.
        if(a > b){
            return a;
        }else{
            return b;
        }
    }

    actualiz(nodo){   //metodo que actualiza la altura y balance del nodo al agregarlo o rotarlo.
        let alturaL = (nodo.izquierda == null) ? -1 : nodo.izquierda.altura;
        console.log(alturaL);
        let alturaR = (nodo.derecha == null) ? -1 : nodo.derecha.altura;
        console.log(alturaR);
        nodo.altura = 1 + this.max(alturaR,alturaL);
        console.log('max: ',this.max(alturaR,alturaL));

        nodo.factorB = alturaR - alturaL;
        console.log('Nodo: ',nodo.valor);
        console.log('altura:',nodo.altura);
        console.log('factor:',nodo.factorB);
        console.log('')
    }

    balancear(nodo){    //revisa el factor de balance del nodo y hace la rotacion necesaria segun el caso.
        if(nodo.factorB == -2){
            if(nodo.izquierda.factorB <= 0){
                return this.rotacionR(nodo);
            }else{
                return this.lr(nodo);
            }
        }else if(nodo.factorB == 2){
            if(nodo.derecha.factorB >= 0){
                return this.rotacionL(nodo);
            }else{
                return this.rl(nodo);
            }
        }

        return nodo;
    }

    rotacionL(nodo){
        console.log(nodo.valor);
        let nuevoP = nodo.derecha;

        nodo.derecha = nuevoP.izquierda;
        if(nodo.derecha != null){
            nodo.derecha.padre = nodo;
        }

        nuevoP.izquierda = nodo;
        if(nuevoP.izquierda != null){
            nuevoP.izquierda.padre = nuevoP;
        }

        this.actualiz(nodo);
        this.actualiz(nuevoP);
        return nuevoP;
    }

    rotacionR(nodo){
        console.log(nodo.valor);
        let nuevoP = nodo.izquierda;

        nodo.izquierda = nuevoP.derecha;
        if(nodo.izquierda != null){
            nodo.izquierda.padre = nodo;
        }

        nuevoP.derecha = nodo;
        if(nuevoP.derecha != null){
            nuevoP.derecha.padre = nuevoP;
        }
        

        this.actualiz(nodo);
        this.actualiz(nuevoP);
        return nuevoP;
    }

    lr(nodo){   //rota a la izquierda y luego a la derecha.
        nodo.izquierda = this.rotacionL(nodo);
        return this.rotacionR(nodo);
    }

    rl(nodo){   //rota a la derecha y luego a la izquierda.
        nodo.derecha = this.rotacionR(nodo);
        return this.rotacionL(nodo);
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
        let nodo = this.nodo(dato);

        if(nodo != null){
            let padre = nodo.padre;

            let isDerecha = false;
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
            console.log('El dato ingresado no existe en el arbol.');
        }
    }

    buscar(dato, actual = this.root){
        if (this.size > 0){
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
        }else{
            return false;
        }
    }

    actualizar(existente, nuevo){
        if(this.buscar(existente)){
            this.eliminar(existente);
            this.insertar(nuevo);
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

module.exports = AVL;