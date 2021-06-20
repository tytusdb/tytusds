class Nodo{
    constructor(dato){
        this.dato = dato
        this.anterior = null
        this.siguiente = null
        this.izquierdo = null
        this.derecho = null
    }
}

var arr = []

class Rama{
    constructor(){
        this.contador = 0
        this.hoja = true
        this.raiz = null
    }

    insertar(nodo){
        if(this.raiz == null){
            this.raiz = nodo
            this.contador++
        }else{
            let tmp = this.raiz
            do{
                if(nodo.dato<=tmp.dato){
                    this.contador++
                    if(tmp == this.raiz){
                        this.raiz.anterior = nodo
                        nodo.siguiente = this.raiz
                        this.raiz.izquierdo = nodo.derecho
                        this.raiz = nodo
                        break
                    }else{
                        nodo.anterior = tmp.anterior
                        nodo.siguiente = tmp
                        tmp.anterior.siguiente = nodo
                        tmp.anterior.derecho = nodo.izquierdo
                        tmp.anterior= nodo
                        tmp.izquierdo = nodo.derecho
                        break
                    }
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

class ArbolB{
    constructor(orden){
        this.raiz = null
        this.orden = orden
    }

    insertar(dato){
        let nodo = new Nodo(dato)
        if(this.raiz == null){
            this.raiz = new Rama()
            this.raiz.insertar(nodo)
            return
        }else{
            let tmp = this.add(nodo, this.raiz)
            if(tmp instanceof Nodo){
                this.raiz = new Rama()
                this.raiz.insertar(tmp)
                this.raiz.hoja = false
            }
        }
    }

    add(nodo, rama){
        if(rama.hoja){
            rama.insertar(nodo)
            if(rama.contador == this.orden){
                return this.divRam(rama)
            }else{
                return rama
            }
        }else{
            let tmp = rama.raiz 
            do{
                if(nodo.dato == tmp.dato){
                    return rama
                }else if(nodo.dato < tmp.dato){
                    let aux = this.add(nodo, tmp.izquierdo)
                    if( aux instanceof Nodo){
                        rama.insertar(aux)
                        if(rama.contador == this.orden){
                            return this.divRam(rama)
                        }
                    }
                    return rama
                }else if(tmp.siguiente == null){
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
    
}




