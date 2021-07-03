//Contador Nodos
var idNodos = 0

//Clase Lista Doble
class ListaDoble{
    //Constructor
    constructor(){
        this.cabeza = null
        this.cola = null
        this.size = 0
    }

    //Insercion de lista
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

    //Eliminacion de lista
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
            }else if(dato == aux.dato && aux == this.cola && this.cola.anterior != null){
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

//Lista de nodos para recorridos
var n = null

//Clase Nodo para Lista Doble
class NodoListaDoble{
    //Constructor
    constructor(dato){
        this.siguiente = null
        this.anterior = null
        this.dato = dato
        this.id = 0
    }
}

//Clase Nodo Grafo
class Nodo{
    //Constructor
    constructor(dato){
        this.dato = dato
        this.id = 0
        this.enlaces = new ListaDoble()
        this.adyacentes = new ListaDoble()
    }
}

//Clase enlaces
class Enlaces{
    //Constructor
    constructor(inicio, distancia, destino){
        this.inicio = inicio
        this.destino = destino
        this.distancia = distancia
    }
}

//Clase Lista de Adyacencia Principal
class ListaAdyacencia{
    constructor(inicio, final){
        this.ListaAdyacencia = new ListaDoble()
        this.inicio = inicio
        this.final = final
    }

    //Metodo de obtencion de vertices no dirigos
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

    //Metodo de insercion para Grafo no dirigido
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

    //Metodo de primer enlace para Grafo no Dirigido
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

    //Metodo de obtencion de vertices para grafos dirigidos
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

    //Insercion de Grafos Dirigidos
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

    //Primer enlaces para Grafo Dirigido
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

    //Enlaces para grafos dirigidos
    Enlazar(n1, n2, distancia){
        let origen = null
        let destino = null
        let dat1 = null
        let dat2 = null
        origen = this.getVertice(n1)
        destino = this.getVertice(n2)
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
    }

    //Metodo para validacion de datos ya existentes en una lista
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

    //Recorrido por anchura
    BFS(){
        n = new ListaDoble()
        let aux = this.ListaAdyacencia.cabeza
        while (aux != null){
            if(this.contiente(n, aux.dato) == false){
                n.insertar(aux.dato)
            }
            let tmp = aux.dato.adyacentes.cabeza
            while (tmp != null){
                if(this.contiente(n, tmp.dato) == false){
                    n.insertar(tmp.dato)
                }
                tmp = tmp.siguiente
            }
            aux = aux.siguiente
        }
        let imp = n.cabeza
        let arregloEdge = []
        while (imp.siguiente!=null){
            let siguiente = imp.siguiente
            let egde = {from: imp.dato.id, to: siguiente.dato.id}
            arregloEdge.push(egde)
            imp = imp.siguiente
        }
        return arregloEdge
    }    

    //Recorrido por Profundidad
    DFS(){
        n = new ListaDoble()
        let aux = this.ListaAdyacencia.cabeza
        this.subDFS(aux.dato)
        let imp = n.cabeza
        let arregloEdge = []
        while(imp.siguiente!= null){
            let siguiente = imp.siguiente
            let egde = {from: imp.dato.id, to: siguiente.dato.id}
            arregloEdge.push(egde)
            imp = imp.siguiente
        }
        return arregloEdge
    }

    //Sub metodo para Recorrido por Produndidad
    subDFS(nodo){
        if(this.contiente(n, nodo) == false){
            n.insertar(nodo)
        }else{
            return
        }
        let aux2 = nodo.adyacentes.cabeza
        while(aux2!=null){
            this.subDFS(aux2.dato)
            aux2 = aux2.siguiente
        }
    }

    //Metodo Buscar
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

    //Metodo Modificar
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

    //Metodo Eliminar
    eliminar(datelim){
        let bool = false
        let aux = this.ListaAdyacencia.cabeza
        while (aux != null){
            if(aux.dato.dato == datelim){
                bool = true
                this.ListaAdyacencia.eliminar(aux.dato)
                console.log("El dato eliminado fue "+datelim)
            }
            let enl = aux.dato.enlaces.cabeza
            while(enl!=null){
                if(enl.dato.inicio.dato == datelim || enl.dato.destino.dato == datelim){
                    aux.dato.enlaces.eliminar(enl.dato)
                }
                enl = enl.siguiente
            }
            let ady = aux.dato.adyacentes.cabeza
            while(ady!=null){
                if(ady.dato.dato == datelim){
                    aux.dato.adyacentes.eliminar(ady.dato)
                }
                ady = ady.siguiente
            }
            aux = aux.siguiente
        }
        if(bool == false){
            console.log("No encontro nada")    
        }
    }

    //Metodo Cargar
    cargar(arreglo,nombre) {
        arreglo.map(elemento=> {
            let vertice = elemento.vertice
            if(nombre === "Grafo Dirigido"){
                if(elemento.aristas.length != 0){    
                    elemento.aristas.map(e =>{
                        this.insertar(vertice,vertice, e.arista, e.distancia)
                    })
                }
            }else{
                if(elemento.aristas.length != 0){    
                    elemento.aristas.map(e =>{
                        this.insertarNoDirigido(vertice,vertice, e.arista, e.distancia)
                    })
                }
            }
        })
    }

    //Metodo Guardar
   /*  guardar() {
        let archivojs = [];
        let aux = this.ListaAdyacencia.cabeza
        while (aux != null){
            archivojs.push("vertice")
            archivojs.push(aux.dato.dato)
            let tmp = aux.dato.enlaces.cabeza
            while(tmp!=null){
                archivojs.push("arista")
                archivojs.push(tmp.dato.destino.dato)
                archivojs.push("distancia")
                archivojs.push(tmp.dato.distancia)            
                tmp=tmp.siguiente
            }       
            aux=aux.siguiente
        }
        let json = JSON.stringify(archivojs)
        let nombre = "RecorridoAnchuraProfundidad"
        fs.writeFile(nombre, json)  
    } */

    //Carga de array para graficacion de nodos
    graficarNodos(){
        let arreglo = []
        let aux = this.ListaAdyacencia.cabeza
        while(aux!=null){
            let dato = {id: aux.dato.id, label:aux.dato.dato.toString(),}
            arreglo.push(dato)
            aux = aux.siguiente
        }
        return arreglo
    }

    //Carga de array para graficacion de enlaces
    graficarEnlaces(){
        let arregloEdge = []
        let aux = this.ListaAdyacencia.cabeza
        while(aux!=null){
            let tmp = aux.dato.enlaces.cabeza
            while(tmp!= null){
                let egde = {from: tmp.dato.inicio.id, to: tmp.dato.destino.id , label: tmp.dato.distancia.toString()}
                arregloEdge.push(egde)
                tmp = tmp.siguiente
            }
            aux = aux.siguiente
        }
        return arregloEdge
    } 
}

export default ListaAdyacencia;