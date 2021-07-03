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








}




