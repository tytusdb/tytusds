//Contador para identificadores unicos de los nodos
var idNodos = 0

//Clase para la lista de adyacencia como lista doble
class ListaDoble{
    //Constructor
    constructor(){
        this.cabeza = null
        this.cola = null
        this.size = 0
    }

    //Insercion para la lista doble
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

    //Eliminacion para la lista doble
    eliminar(dato){
        let aux = this.cabeza
        while(aux != null){
            if(dato == aux.dato && aux == this.cabeza && this.cabeza.siguiente!=null){
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
            }else if(dato == aux.dato && aux == this.cola && this.cola.anterior!=null){
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

//Clase Nodos para Lista Doble
class NodoListaDoble{
    //Constructor
    constructor(dato){
        this.siguiente = null
        this.anterior = null
        this.dato = dato
        this.id = 0
    }
}

//Clase Nodo para Grafo
class Nodo{
    //Constructor
    constructor(dato){
        this.dato = dato
        this.id = 0
        this.distTotal = 0
        this.camino = new ListaDoble()
        this.enlaces = new ListaDoble()
        this.adyacentes = new ListaDoble()
    }
}

//Clas Enlaces para Grafos
class Enlaces{
    //Constructor
    constructor(inicio, distancia, destino){
        this.inicio = inicio
        this.destino = destino
        this.distancia = distancia
    }
}



//Clase Lista Principal de Adyacencia
class ListaAdyacencia{
    //Constructor
    constructor(inicio, final){
        this.ListaAdyacencia = new ListaDoble()
        this.caminoFinal = []
        this.distanciaFinal = 0
        this.inicio = inicio
        this.final = final
    }
    
    
    //Obtencion de Nodos o Vertices para validacion booleana
    getVerticeNoDirigido(dato){
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
    
    
    //Insercion en grafo no dirigido
    insertarNoDirigido(dato, inicio, final, distancia){
        if (this.getVerticeNoDirigido(dato)==null){
            let n = new Nodo(dato)
            n.id = idNodos
            this.ListaAdyacencia.insertar(n)
            idNodos++
            this.EnlazarNoDirigido(inicio, final, distancia)
        }else if(this.getVerticeNoDirigido(dato) == dato){
            let n = new Nodo(dato)
            n.id = idNodos
            this.ListaAdyacencia.insertar(n)
            idNodos++
            this.enlazarprimeroNoDirigido(inicio, final, distancia,final)
        }else{
            this.EnlazarNoDirigido(inicio, final, distancia)
            console.log("Al parecer ya lo creo o es el primero")
        }
    }    


    
    //Enlace primero en grafo no dirigido
    enlazarprimeroNoDirigido(n1, n2, distancia, dato){
        let nodo2 = new Nodo(dato)
        nodo2.id = idNodos
        idNodos++
        this.ListaAdyacencia.insertar(nodo2)
        let origen = null
        let destino = null
        origen = this.getVerticeNoDirigido(n1)
        destino = this.getVerticeNoDirigido(n2)    
        if(origen == null || destino == null){
            console.log("No se encontro un nodo para el enlace we en primero")
            return
        }
        origen.adyacentes.insertar(destino)
        destino.adyacentes.insertar(origen)
        let c = new Enlaces(origen, distancia, destino)
        origen.enlaces.insertar(c)
        let d = new Enlaces(destino, distancia, origen)
        destino.enlaces.insertar(d)
    }

    //Enlaces para grafos no dirigidos
    EnlazarNoDirigido(n1, n2, distancia){
        let origen = null
        let destino = null
        let dat1 = null
        let dat2 = null
        origen = this.getVerticeNoDirigido(n1)
        destino = this.getVerticeNoDirigido(n2)
        if(origen==null){
            let nodo2 = new Nodo(n1)
            nodo2.id = idNodos
            idNodos++
            this.ListaAdyacencia.insertar(nodo2)
            origen = this.getVerticeNoDirigido(n1)
        }
        if(destino == null){
            let nodo2 = new Nodo(n2)
            nodo2.id = idNodos
            idNodos++
            this.ListaAdyacencia.insertar(nodo2)
            destino = this.getVerticeNoDirigido(n2)
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
        let d = new Enlaces(destino, distancia, origen)
        destino.enlaces.insertar(d)
    }

    //Obtencion de vertices para grafos dirigidos
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

   
    
    //Insercion de grafos dirigdos
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






}




