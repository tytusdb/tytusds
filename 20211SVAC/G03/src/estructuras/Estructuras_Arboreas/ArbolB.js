//Clase Nodo
class Nodo{
    //Constructor
    constructor(dato){
        this.dato = dato
        this.anterior = null
        this.siguiente = null
        this.izquierdo = null
        this.derecho = null
    }
}

//Arreglo de uso unico
var arr = []

//Clase Rama
class Rama{
    //Constructor
    constructor(){
        this.contador = 0
        this.hoja = true
        this.raiz = null
    }

    //Metodo Insertar en Rama
    insertar(nodo){
        //Insertar Primer Nodo
        if(this.raiz == null){
            this.raiz = nodo
            this.contador++
        }else{  //Insertar Nodo no Primero
            let tmp = this.raiz
            do{
                if(nodo.dato<=tmp.dato){    //Insercion de dato menor igual
                    this.contador++
                    //Insercion en nodo no vacio
                    if(tmp == this.raiz){
                        this.raiz.anterior = nodo
                        nodo.siguiente = this.raiz
                        this.raiz.izquierdo = nodo.derecho
                        this.raiz = nodo
                        break
                    }else{
                        //Insercion entre nodos
                        nodo.anterior = tmp.anterior
                        nodo.siguiente = tmp
                        tmp.anterior.siguiente = nodo
                        tmp.anterior.derecho = nodo.izquierdo
                        tmp.anterior= nodo
                        tmp.izquierdo = nodo.derecho
                        break
                    }
                //Insercion en nodos vacios
                }else if(tmp.siguiente == null){
                    this.contador++
                    tmp.siguiente = nodo
                    tmp.derecho =   nodo.izquierdo
                    nodo.anterior = tmp
                    nodo.siguiente = null
                    break
                }
                tmp = tmp.siguiente
            }while(tmp != null)
        }
    }

}

//Clase Arbol
class ArbolB{
    //Constructor
    constructor(orden){
        this.raiz = null
        this.orden = orden
    }

    //Metodo Insercion en arbol
    insertar(dato){
        let nodo = new Nodo(dato)
        //Insercion para arbol vacio
        if(this.raiz == null){
            this.raiz = new Rama()
            this.raiz.insertar(nodo)
            return
        }else{
            //Insercion para arbol no vacio
            let tmp = this.add(nodo, this.raiz)
            if(tmp instanceof Nodo){
                this.raiz = new Rama()
                this.raiz.insertar(tmp)
                this.raiz.hoja = false
            }
        }
    }

    //Metodo para agregar y verificar estado de las ramas
    add(nodo, rama){
        //Si es un nodo hijo
        if(rama.hoja){
            rama.insertar(nodo)
            if(rama.contador == this.orden){
                //Division de rama
                return this.divRam(rama)
            }else{
                //Retornar rama no llena
                return rama
            }
        //Si no es un nodo hijo
        }else{
            let tmp = rama.raiz 
            do{
                if(nodo.dato == tmp.dato){
                    //No inserta duplicados
                    return rama
                }else if(nodo.dato < tmp.dato){ //Insercion de nodo menor
                    let aux = this.add(nodo, tmp.izquierdo)
                    if( aux instanceof Nodo){
                        rama.insertar(aux)
                        if(rama.contador == this.orden){
                            return this.divRam(rama)
                        }
                    }
                    return rama
                }else if(tmp.siguiente == null){    //Insercion para nodo con un solo valor
                    let aux = this.add(nodo, tmp.derecho)
                    if(aux instanceof Nodo){
                        rama.insertar(aux)
                        if(rama.contador == this.orden){
                            return this.divRam(rama)
                        }
                    }
                    return rama
                }
                tmp = tmp.siguiente
            }while(tmp != null)
        }
        return rama
    }

    //Metodo de division de rama
    divRam(rama){
        let der = new Rama()
        let izq = new Rama()
        let mitad = null
        let tmp = rama.raiz
        let inicio = 1
        let medio = parseInt(this.orden/2) + 1
        let final = this.orden
        for(let i = 1; i < this.orden + 1;i++, tmp = tmp.siguiente){
            let nodo = new Nodo(tmp.dato)
            nodo.izquierdo = tmp.izquierdo
            nodo.derecho = tmp.derecho
            if(nodo.derecho != null && nodo.izquierdo != null){
                izq.hoja = false
                der.hoja = false
            }
            if(i >= inicio && i < medio){
                izq.insertar(nodo)
            }else if(i == medio){
                mitad = nodo
            }else if(i <= final && i > medio){
                der.insertar(nodo)
            }
        }
        mitad.izquierdo = izq
        mitad.derecho = der
        return mitad
    }

    //Metodo de impresion de Arbol
    printArbol(){
        if (this.raiz == null){
            console.log("no existe arbol")
            return 
        }
        this.subprint(this.raiz) 
    }

    //Sub metodo de impresion de arbol
    subprint(rama){
        if (rama.raiz == null){
            console.log("no hay nodos")
            return 
        }
        let aux = rama.raiz
        if(aux.izquierdo != null){
            this.subprint(aux.izquierdo)
        }
        if(aux.derecho!=null){
            this.subprint(aux.derecho)
        }
        if(aux.anterior == null && aux.siguiente == null){
            console.log(aux.dato)
            return
        }
        while(aux!= null){
            console.log(aux.dato)
            aux = aux.siguiente
            if(aux != null && aux.derecho!=null){
                this.subprint(aux.derecho)
            }
        }
    }

}