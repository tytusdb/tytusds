var idNodos = 0

class ListaDoble{
    constructor(){
        this.cabeza = null
        this.cola = null
        this.size = 0
    }

    insertar(dato){
        if(this.cabeza == null){
            let nodo = new NodoListaDoble(dato)
            this.cabeza = nodo
            this.cola = nodo
            this.size++
        }else{
            let nodo = new NodoListaDoble(dato)
            let aux = this.cabeza
            while(aux.siguiente != null){
                aux = aux.siguiente
            }
            aux.siguiente = nodo
            nodo.anterior = aux
            this.cola = nodo
            this.size++
        }
    }

    eliminar(dato){
        let aux = this.cabeza
        while(aux != null){
            if(dato == aux.dato && aux == this.cabeza){
                let tmp = this.cabeza.siguiente
                tmp.anterior = null
                this.cabeza.siguiente = null
                this.cabeza = tmp          
                this.size--      
                return
            }else if(dato == aux.dato && aux.anterior != null && aux.siguiente != null){
                let tmp = aux.siguiente
                tmp.anterior = aux.anterior
                aux.anterior.siguiente = tmp
                aux.siguiente = null
                aux.anterior = null
                this.size--
                return
            }else if(dato == aux.dato && aux == this.cola){
                let tmp = this.cola.anterior
                tmp.siguiente = null
                this.cola.anterior = null
                this.cola = tmp
                this.size--
                return
            }else if(dato == aux.dato && this.cola == this.cabeza){
                this.cola = null
                this.cabeza = null
                this.size--
                return
            }
            aux = aux.siguiente
        }
    }
}

var idNodos = 0

class ListaDoble{
    constructor(){
        this.cabeza = null
        this.cola = null
        this.size = 0
    }

    insertar(dato){
        if(this.cabeza == null){
            let nodo = new NodoListaDoble(dato)
            this.cabeza = nodo
            this.cola = nodo
            this.size++
        }else{
            let nodo = new NodoListaDoble(dato)
            let aux = this.cabeza
            while(aux.siguiente != null){
                aux = aux.siguiente
            }
            aux.siguiente = nodo
            nodo.anterior = aux
            this.cola = nodo
            this.size++
        }
    }

    eliminar(dato){
        let aux = this.cabeza
        while(aux != null){
            if(dato == aux.dato && aux == this.cabeza){
                let tmp = this.cabeza.siguiente
                tmp.anterior = null
                this.cabeza.siguiente = null
                this.cabeza = tmp          
                this.size--      
                return
            }else if(dato == aux.dato && aux.anterior != null && aux.siguiente != null){
                let tmp = aux.siguiente
                tmp.anterior = aux.anterior
                aux.anterior.siguiente = tmp
                aux.siguiente = null
                aux.anterior = null
                this.size--
                return
            }else if(dato == aux.dato && aux == this.cola){
                let tmp = this.cola.anterior
                tmp.siguiente = null
                this.cola.anterior = null
                this.cola = tmp
                this.size--
                return
            }else if(dato == aux.dato && this.cola == this.cabeza){
                this.cola = null
                this.cabeza = null
                this.size--
                return
            }
            aux = aux.siguiente
        }
    }
}

class NodoListaDoble{
    constructor(dato){
        this.siguiente = null
        this.anterior = null
        this.dato = dato
        this.id = 0
    }
}

class Nodo{
    constructor(dato){
        this.dato = dato
        this.id = 0
        this.enlaces = new ListaDoble()
        this.adyacentes = new ListaDoble()
    }

}

class Enlaces{
    constructor(inicio, distancia, destino){
        this.inicio = inicio
        this.destino = destino
        this.distancia = distancia
    }
}

class ListaAdyacencia{
    constructor(inicio, final){
        this.ListaAdyacencia = new ListaDoble()
        this.inicio = inicio
        this.final = final
    }

    getVertice(dato){
        let aux = this.ListaAdyacencia.cabeza
        while(aux!= null){
            if (aux.dato.dato == dato){
                return aux.dato
            }
            aux= aux.siguiente
        }
        if(this.ListaAdyacencia.size == 0){
            return dato
        }
        return null
    }

    insertar(dato, inicio, final, distancia){
        if (this.getVertice(dato)==null){
            let n = new Nodo(dato)
            n.id = idNodos
            this.ListaAdyacencia.insertar(n)
            idNodos++
            this.Enlazar(inicio, final, distancia)
        }else if(this.getVertice(dato) == dato){
            let n = new Nodo(dato)
            n.id = idNodos
            this.ListaAdyacencia.insertar(n)
            idNodos++
            this.enlazarprimero(inicio, final, distancia,final)
        }else{
            this.Enlazar(inicio, final, distancia)
            console.log("Al parecer ya lo creo o es el primero")
        }
    }    

    enlazarprimero(n1, n2, distancia, dato){
        let nodo2 = new Nodo(dato)
        nodo2.id = idNodos
        idNodos++
        this.ListaAdyacencia.insertar(nodo2)
        let origen = null
        let destino = null
        origen = this.getVertice(n1)
        destino = this.getVertice(n2)    
        if(origen == null || destino == null){
            console.log("No se encontro un nodo para el enlace we en primero")
            return
        }
        origen.adyacentes.insertar(destino)
        destino.adyacentes.insertar(origen)
        let c = new Enlaces(origen, distancia, destino)
        origen.enlaces.insertar(c)

    }

    Enlazar(n1, n2, distancia){
        let origen = null
        let destino = null
        let dat1 = null
        let dat2 = null
        origen = this.getVertice(n1)
        destino = this.getVertice(n2)
        if(origen == null || destino == null){
            console.log("No se encontro un nodo para el enlace we")
            return
        }
        let aux = origen.adyacentes.cabeza
        while(aux!= null){
            if (aux.dato.dato ==  destino.dato){
                dat1 = destino.dato
                break
            }
            aux= aux.siguiente
        }
        if(dat1 == null){
            origen.adyacentes.insertar(destino)
        }
        if(origen.adyacentes.size == 0){
            origen.adyacentes.insertar(destino)
        }
        let aux2 = destino.adyacentes.cabeza
        while(aux2!= null){
            if (aux2.dato.dato ==  origen.dato){
                dat2 = origen.dato
                break
            }
            aux2 = aux2.siguiente
        }
        if(dat2 == null){
            destino.adyacentes.insertar(origen)
        }
        if(destino.adyacentes.size == 0){
            destino.adyacentes.insertar(origen)
        }
        let c = new Enlaces(origen, distancia, destino)
        origen.enlaces.insertar(c)
    }

    //Obtencion de Listas ya existentes no vacias
    contiente(buscando, elemento){
        let buscar = buscando.cabeza
        while(buscar!=null){
            if(buscar.dato.dato == elemento.dato){
                return true
            }
            buscar = buscar.siguiente
        }
        return false
    }

    //Metodo de recursion por anchura
    BFS(){
        let nuevo = new ListaDoble()
        let aux = this.ListaAdyacencia.cabeza
        while (aux != null){
            if(this.contiente(nuevo, aux.dato) == false){
                nuevo.insertar(aux.dato)
            }
            let tmp = aux.dato.adyacentes.cabeza
            while (tmp != null){
                if(this.contiente(nuevo, tmp.dato) == false){
                    nuevo.insertar(tmp.dato)
                }
                tmp = tmp.siguiente
            }
            aux = aux.siguiente
        }
        let n = nuevo.cabeza
        while (n!=null){
            console.log(n.dato.dato)
            n = n.siguiente
        }
    }    

    //Metodo de busqueda
    buscar(dato){
        let bool = false
        let aux = this.ListaAdyacencia.cabeza
        while (aux != null){
            if(aux.dato.dato == dato){
                bool = true
                console.log("El dato encontrado fue "+dato)
                break
            }
            aux=aux.siguiente
        }
        if(bool == false){
            console.log("No encontro nada")    
        }
    }

    //Metodo modificar
    modificar(datobus, datocam){
        let bool = false
        let aux = this.ListaAdyacencia.cabeza
        while(aux!=null){
            if(aux.dato.dato == datobus){
                bool = true
                aux.dato.dato = datocam
                console.log("El dato modificado fue " + datobus + " a " + aux.dato.dato)
                break
            }
            aux = aux.siguiente
        }
        if(bool == false){
            console.log("No encontro nada")    
        }
    }
}