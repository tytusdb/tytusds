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
    constructor(){
        this.ListaAdyacencia = new ListaDoble()
        this.caminoFinal = []
        this.distanciaFinal = 0
        this.inicio = null
        this.final = null
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

    //Primer enlace para grafos dirigidos
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

    //Enlaces para gradfos dirigidos
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

    //Metodo arranque para costo minimo
    costoMinimo(ini, fin){
        let arregloEdge = []
        this.inicio = ini
        this.final = fin
        console.log("Empezamos en: "+this.inicio)
        console.log("Queremos terminar en: " + this.final)
        let iniRec = this.ListaAdyacencia.cabeza
        while(iniRec!=null){
            if(iniRec.dato.dato == this.inicio){
                let enl = iniRec.dato.enlaces.cabeza
                while(enl!= null){
                    let adyman = iniRec.dato.adyacentes.cabeza
                    while(adyman!=null){
                        if(adyman.dato.dato == enl.dato.destino.dato){
                            adyman.dato.distTotal = enl.dato.distancia
                            adyman.dato.camino.insertar(iniRec.dato)
                            this.formarcaminooptimo(adyman.dato)
                            adyman.dato.camino.eliminar(iniRec.dato)
                            
                        }
                        adyman = adyman.siguiente
                    }
                    enl = enl.siguiente
                }
            }
            iniRec = iniRec.siguiente
        }
        console.log("Al parecer funciono, la distancia final total es: "+this.distanciaFinal)
        for(let i = 0;i<this.caminoFinal.length-1;i++){
            let egde = {from: this.caminoFinal[i].id, to: this.caminoFinal[i+1].id }
            arregloEdge.push(egde)
            console.log("El camino usado fue: " + this.caminoFinal[i].dato + " con id " + this.caminoFinal[i].id)
        }
        return arregloEdge
    }

    //Metodo recursivo para arbol de Recubrimiento minimo
    recubrimientoMinimo(){
        let arregloEdge = []
        let iniRec = this.ListaAdyacencia.cabeza
        while(iniRec!=null){
            if(iniRec.dato.dato == this.inicio){
                let enl = iniRec.dato.enlaces.cabeza
                while(enl!= null){
                    let adyman = iniRec.dato.adyacentes.cabeza
                    while(adyman!=null){
                        if(adyman.dato.dato == enl.dato.destino.dato){
                            adyman.dato.distTotal = enl.dato.distancia
                            adyman.dato.camino.insertar(iniRec.dato)
                            this.formarcaminooptimo(adyman.dato)
                            adyman.dato.camino.eliminar(iniRec.dato)
                            
                        }
                        adyman = adyman.siguiente
                    }
                    enl = enl.siguiente
                }
            }
            iniRec = iniRec.siguiente
        }
        console.log("Al parecer funciono, la distancia final total es: "+this.distanciaFinal)
        for(let i = 0;i<this.caminoFinal.length-1;i++){
            let egde = {from: this.caminoFinal[i].id, to: this.caminoFinal[i+1].id }
            arregloEdge.push(egde)
            console.log("El camino usado fue: " + this.caminoFinal[i].dato + " con id " + this.caminoFinal[i].id)
        }
        return arregloEdge
    }

    //Metodo Recursivo para busqueda de camino a final
    formarcaminooptimo(nodo){
        if(nodo.dato == this.final){
            if(nodo.distTotal<this.distanciaFinal&&nodo.distTotal!=0){
                this.caminoFinal = []
                this.distanciaFinal = nodo.distTotal
                nodo.camino.insertar(nodo)
                let cargacamino = nodo.camino.cabeza
                while (cargacamino != null){
                    this.caminoFinal.push(cargacamino.dato)
                    cargacamino = cargacamino.siguiente
                }
                nodo.camino.eliminar(nodo)
                console.log("Hay una nueva carga de datos finales")
            }else if(this.distanciaFinal == 0){
                this.distanciaFinal = nodo.distTotal
                nodo.camino.insertar(nodo)
                let cargacamino = nodo.camino.cabeza
                while (cargacamino != null){
                    this.caminoFinal.push(cargacamino.dato)
                    cargacamino = cargacamino.siguiente
                }
                nodo.camino.eliminar(nodo)
                console.log("Hay una nueva carga de datos finales")
            }
        }else{
            let nuevosenlaces = nodo.enlaces.cabeza
            while(nuevosenlaces!= null){
                if(nodo.camino!=null){
                    let verificacioncaminodestino = nodo.camino.cabeza
                    let permiso = false
                    while(verificacioncaminodestino!=null){
                        if(verificacioncaminodestino.dato.dato == nuevosenlaces.dato.destino.dato){
                            permiso = true
                            break
                        }
                        verificacioncaminodestino = verificacioncaminodestino.siguiente
                    }
                    if(permiso == false){
                        let adymandar = nodo.adyacentes.cabeza
                        while(adymandar!= null){
                            if(adymandar.dato.dato == nuevosenlaces.dato.destino.dato){
                                adymandar.dato.distTotal = nuevosenlaces.dato.distancia + nodo.distTotal
                                nodo.camino.insertar(nodo)
                                adymandar.dato.camino = nodo.camino
                                this.formarcaminooptimo(adymandar.dato)
                                nodo.camino.eliminar(nodo)
                                adymandar.dato.camino.eliminar(nodo)
                                break
                            }
                            adymandar = adymandar.siguiente
                        }
                    }
                }else{
                    let adymandar = nodo.adyacentes.cabeza
                    while(adymandar!= null){
                        if(adymandar.dato.dato == nuevosenlaces.dato.dato){
                            adymandar.dato.distTotal = nuevosenlaces.dato.distancia + nodo.distTotal
                            nodo.camino.insertar(nodo)
                            adymandar.dato.camino = nodo.camino
                            formarcaminooptimo(adymandar.dato)
                            nodo.camino.eliminar(nodo)
                            adymandar.dato.camino.eliminar(nodo)
                        break
                        }
                        adymandar= adymandar.siguiente
                    }
                }
                nuevosenlaces = nuevosenlaces.siguiente
            }
        }        
    }

    //Metodo Carga
    cargar(arreglo) {
        arreglo.array.map(vertice, arista, distancia => {
            this.insert(vertice, vertice, arista, distancia)
        })
    }

    //Metodo Guardar
    guardar() {
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
        let nombre = "CostoMinimo"
        fs.writeFile(nombre, json)  
    }

    //Carga de array para graficacion de nodos
    graficarNodos(){
        let aux = this.ListaAdyacencia.cabeza
        while(aux!=null){
            let dato = {id: aux.dato.id, label:aux.dato.dato,}
            arreglo.push(dato)
            aux = aux.siguiente
        }
        return arreglo
    }

    //Carga de array para graficacion de enlaces
    graficarEnlaces(){
        let aux = this.ListaAdyacencia.cabeza
        while(aux!=null){
            let tmp = aux.dato.enlaces.cabeza
            while(tmp!= null){
                let egde = {from: tmp.inicio.dato.id, to: tmp.final.dato.id , label: tmp.distancia}
                arregloEdge.push(egde)
                tmp = tmp.siguiente
            }
            aux = aux.siguiente
        }
        return arregloEdge
    } 
}

let lista = new ListaAdyacencia()
lista.insertar(1,1,2,2)
lista.insertar(2,2,3,3)
lista.insertar(4,2,4,1)
lista.insertar(3,3,1,8)
lista.insertar(3,3,4,1)
lista.costoMinimo(1,4)
