//Contador para identificadores unicos de los nodos
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

    //Regresar Minimo
    regresarMinimo(){
        let aux = this.cabeza
        let regresar = null
        while(aux!=null){
            if(regresar == null){
                regresar = aux.dato
            }else if(aux.dato<regresar){
                regresar = aux.dato
            }
            aux = aux.siguiente
        }
        return regresar
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
        this.distTotal = 0
        this.camino = new ListaDoble()
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
    constructor(){
        this.ListaAdyacencia = new ListaDoble()
        this.caminoFinal = []
        this.distanciaFinal = 0
        this.inicio = null
        this.final = null
        this.profundidad = null
        this.busquedaRecorrido = null
        this.anchura = null
        this.costoUnfi = null
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
        this.profundidad = null
        this.costoUnfi = null
        this.busquedaRecorrido  = null
        this.busquedaRecorrido = null
        this.caminoFinal = null
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
        let egde = null
        let agregado = new ListaDoble()
        let arregloEdge = []
        while (imp.siguiente!=null){
            let ady = imp.dato.adyacentes.cabeza
            while(ady!=null){
                let siguiente = imp.siguiente
                while(siguiente!= null){
                    if(siguiente.dato.dato== ady.dato.dato){
                        if(agregado.contiente(agregado, siguiente.dato) == false){
                            egde = {from: imp.dato.id, to: siguiente.dato.id}
                            arregloEdge.push(egde)
                            agregado.insertar(siguiente.dato)
                        }
                    }
                    siguiente = siguiente.siguiente
                }
                ady = ady.siguiente
            }
            imp = imp.siguiente
        }
        this.anchura = arregloEdge
        console.log(arregloEdge)
        return arregloEdge
    }        

    //Recorrido por Profundidad
    DFS(){
        
        this.anchura = null
        this.busquedaRecorrido = null
        this.costoUnfi  = null
        this.caminoFinal = null
        n = new ListaDoble()
        let aux = this.ListaAdyacencia.cabeza
        let arregloEdge = []
        arregloEdge = this.subDFS(aux.dato,arregloEdge)
        this.profundidad = arregloEdge
        return arregloEdge
    }

    //Sub metodo para Recorrido por Produndidad
    subDFS(nodo, arregloEdge){
        let edge = null
        if(this.contiente(n, nodo) == false){
            n.insertar(nodo)
        }
        let aux2 = nodo.enlaces.cabeza
        while(aux2!=null){
            if(aux2.dato.inicio.dato == nodo.dato){
                if(aux2.dato.destino.camino.size==0){
                    edge = {from: aux2.dato.inicio.id, to: aux2.dato.destino.id, label: aux2.dato.distancia}
                    arregloEdge.push(edge)
                    aux2.dato.destino.camino.insertar(aux2.dato.inicio.dato)
                    this.subDFS(aux2.dato.destino, arregloEdge)
                }
                aux2 = aux2.siguiente
            }
        }
        return arregloEdge
    }

    //Metodo arranque para costo minimo
    busquedaEspecifica(fin){
        this.profundidad = null
        this.anchura = null
        this.costoUnfi = null
        this.caminoFinal = []
        let arregloEdge = []
        this.final = fin
        console.log("Queremos terminar en: " + this.final)
        let iniRec = this.ListaAdyacencia.cabeza
        if(this.final == iniRec.dato.dato && this.caminoFinal.length == 0){
            let egde = {from: "null", to: iniRec.dato.id }
            arregloEdge.push(egde)
            iniRec = null
        }
        while(iniRec!=null){
            let enl = iniRec.dato.enlaces.cabeza
                while(enl!= null){
                    let adyman = iniRec.dato.adyacentes.cabeza
                    while(adyman!=null){
                        if(adyman.dato.dato == enl.dato.destino.dato){
                            adyman.dato.distTotal = enl.dato.distancia
                            adyman.dato.camino.insertar(iniRec.dato)
                            this.subbusqueda(adyman.dato)
                            adyman.dato.camino.eliminar(iniRec.dato)                        
                        }
                        adyman = adyman.siguiente
                    }
                    enl = enl.siguiente
                }
                if(this.caminoFinal.length!=0){
                    break
                }
            iniRec = iniRec.siguiente
        }
        let borrar = this.ListaAdyacencia.cabeza
        while(borrar!= null){
            borrar.dato.camino = new ListaDoble()
            borrar = borrar.siguiente
        }
        console.log("Al parecer funciono, la distancia final total es: "+this.distanciaFinal)
        if(this.caminoFinal.length!=0){
            for(let i = 0;i<this.caminoFinal.length-1;i++){
                let egde = {from: this.caminoFinal[i].id, to: this.caminoFinal[i+1].id }
                arregloEdge.push(egde)
                console.log("El camino usado fue: " + this.caminoFinal[i].dato + " con id " + this.caminoFinal[i].id)
            }    
        }
        if(arregloEdge.length == 0){
            alert("Error1. Valor no existente. ")
        }
        this.busquedaRecorrido = arregloEdge
        return arregloEdge
    }

    //Metodo Recursivo para busqueda de camino a final
    subbusqueda(nodo){
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
                                this.subbusqueda(adymandar.dato)
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
                            this.subbusqueda(adymandar.dato)
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

    //Metodo de Rebubrimiento Minimo
    recubrimientoMinimo(ini){
        this.anchura = null
        this.profundidad = null
        this.busquedaRecorrido = null
        this.costoUnfi = null
        let borrar = this.ListaAdyacencia.cabeza
        while(borrar!= null){
            borrar.dato.camino = new ListaDoble()
            borrar = borrar.siguiente
        }
        this.caminoFinal = []
        this.inicio = ini
        let costos = new ListaDoble()
        console.log("Empezamos en: "+this.inicio)
        let iniRec = this.ListaAdyacencia.cabeza
        while(iniRec!= null){
            if(iniRec.dato.dato == this.inicio){
                let enl = iniRec.dato.enlaces.cabeza
                while(enl!= null){
                    costos.insertar(enl.dato.distancia)
                    enl = enl.siguiente
                }
                let minimodis = costos.regresarMinimo()
                enl = iniRec.dato.enlaces.cabeza
                while(enl!= null){
                    if(iniRec.dato.dato == enl.dato.inicio.dato){
                        if(enl.dato.distancia == minimodis){    
                            enl.dato.destino.camino.insertar(iniRec.dato)
                            let egde = {from: enl.dato.inicio.id, to: enl.dato.destino.id, label: enl.dato.distancia, color:"orange" }
                            this.caminoFinal.push(egde)
                            this.seguirRecorriendo(enl.dato.destino)
                            costos.eliminar(enl.dato.distancia)
                            minimodis = costos.regresarMinimo()
                            let enlacesmandar = iniRec.dato.enlaces
                            enlacesmandar.eliminar(enl.dato)
                            this.restoCaminos(costos,minimodis,enlacesmandar,iniRec.dato)
                        }    
                    }
                    enl = enl.siguiente
                }
            }
            iniRec = iniRec.siguiente
        }
        if(this.caminoFinal.length == 0){
            alert("Error1. Valor no existente. ")
        }
        return this.caminoFinal
    }

    //submetodo Recubrimiento minimo
    seguirRecorriendo(nodo){
        let costos = new ListaDoble()
        let enl = nodo.enlaces.cabeza
        while(enl!= null){
            if(nodo.dato == enl.dato.inicio.dato){
                if(enl.dato.inicio.camino.contiente(enl.dato.inicio.camino, enl.dato.destino) == false){
                    costos.insertar(enl.dato.distancia)        
                }
            }
            enl = enl.siguiente
        }
        let minimodis = costos.regresarMinimo()
        enl = nodo.enlaces.cabeza
        while(enl!= null){            
            if(enl.dato.distancia == minimodis){
                if(enl.dato.destino.camino.size == 0){
                    enl.dato.destino.camino.insertar(nodo)
                    let egde = {from: enl.dato.inicio.id, to: enl.dato.destino.id, label: enl.dato.distancia }
                    this.caminoFinal.push(egde)
                    this.seguirRecorriendo(enl.dato.destino)
                    costos.eliminar(minimodis)
                    minimodis = costos.regresarMinimo()
                    let enlacesmandar = nodo.enlaces
                    enlacesmandar.eliminar(enl.dato)
                    this.restoCaminos(costos, minimodis,enlacesmandar,nodo)    
                }else{
                    costos.eliminar(minimodis)
                    minimodis = costos.regresarMinimo()
                    let enlacesmandar = nodo.enlaces
                    enlacesmandar.eliminar(enl.dato)
                    this.restoCaminos(costos, minimodis,enlacesmandar,nodo)
                }
            }
            enl = enl.siguiente
        }
    }

    //SubSubMetodoRecorrido
    restoCaminos(lisCostos,minimodis, lisEnlaces,nodo){
        let enl = lisEnlaces.cabeza
        while(enl!= null){
            if(nodo.dato == enl.dato.inicio.dato){
                if(enl.dato.distancia == minimodis){
                    if(enl.dato.destino.camino.size == 0){
                        enl.dato.destino.camino.insertar(enl.dato.inicio)
                        let egde = {from: enl.dato.inicio.id, to: enl.dato.destino.id, label: enl.dato.distancia }
                        this.caminoFinal.push(egde)
                        this.seguirRecorriendo(enl.dato.destino)
                        lisCostos.eliminar(minimodis)
                        minimodis = lisCostos.regresarMinimo()
                        let enlacesmandar = lisEnlaces
                        enlacesmandar.eliminar(enl.dato)
                        if(enlacesmandar.size!=0){
                            this.restoCaminos(lisCostos,minimodis,enlacesmandar,nodo)
                        }
                    }else{
                        lisCostos.eliminar(minimodis)
                        minimodis = lisCostos.regresarMinimo()
                        let enlacesmandar = lisEnlaces
                        enlacesmandar.eliminar(enl.dato)
                        if(enlacesmandar.size!=0){
                            this.restoCaminos(lisCostos,minimodis,enlacesmandar,nodo)
                        }
                    }
                }    
            }
            enl = enl.siguiente
        }
    }

    //Metodo arranque para costo minimo
    costoMinimo(ini, fin){
        this.profundidad = null
        this.anchura = null
        this.busquedaRecorrido = null
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
        let borrar = this.ListaAdyacencia.cabeza
        while(borrar!= null){
            borrar.dato.camino = new ListaDoble()
            borrar = borrar.siguiente
        }
        console.log("Al parecer funciono, la distancia final total es: "+this.distanciaFinal)
        for(let i = 0;i<this.caminoFinal.length-1;i++){
            let egde = {from: this.caminoFinal[i].id, to: this.caminoFinal[i+1].id }
            arregloEdge.push(egde)
            console.log("El camino usado fue: " + this.caminoFinal[i].dato + " con id " + this.caminoFinal[i].id)
        }
        if(arregloEdge.length==0){
            alert("Error1. Valor no existente.")
        }
        this.costoUnfi = arregloEdge
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
                            this.formarcaminooptimo(adymandar.dato)
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


    guardar(){
        let arreglo = []
        let aux = this.ListaAdyacencia.cabeza
        while(aux!=null){
            let tmp = aux.dato.enlaces.cabeza
            while(tmp!= null){
                let arista = []
                arista.push({arista:tmp.dato.destino.dato , distancia: tmp.dato.distancia.toString()})
                let dato = {vertice: tmp.dato.inicio.dato, aristas:arista}
                arreglo.push(dato)
                tmp = tmp.siguiente
            }
            aux = aux.siguiente
        }
        
        return arreglo
    }
    //Carga de array para graficacion de nodos
    graficarNodos(valorBusqueda){
        let arreglo = []
        let aux = this.ListaAdyacencia.cabeza
        while(aux!=null){
            let dato = {id: aux.dato.id, label:aux.dato.dato.toString(),}
            if(aux.dato.dato == valorBusqueda){
                dato = {id: aux.dato.id, label:aux.dato.dato.toString(), color: "lime"}
            }

            if(this.busquedaRecorrido != null){
                for (let x = 0; x < this.busquedaRecorrido.length; x++) {
                    if(this.busquedaRecorrido[x].from ===aux.dato.id){
                        dato = {id: aux.dato.id, label:aux.dato.dato.toString(), color: "lime"}   
                    }else if(this.busquedaRecorrido[x].to === aux.dato.id){
                        dato = {id: aux.dato.id, label:aux.dato.dato.toString(), color: "lime"}
                    }
                    
                }
            }

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
                if(this.anchura != null){
                    for (let x = 0; x < this.anchura.length; x++) {
                        if(this.anchura[x].from === tmp.dato.inicio.id && this.anchura[x].to === tmp.dato.destino.id){
                            egde = {from: tmp.dato.inicio.id, to: tmp.dato.destino.id , label: tmp.dato.distancia.toString(),  color: "rgb(20,24,200)"}   
                        }
                        
                    }     
                     
                }else if(this.profundidad != null){
                    for (let x = 0; x < this.profundidad.length; x++) {
                        if(this.profundidad[x].from === tmp.dato.inicio.id && this.profundidad[x].to === tmp.dato.destino.id){
                            egde = {from: tmp.dato.inicio.id, to: tmp.dato.destino.id , label: tmp.dato.distancia.toString(),  color: "rgb(20,24,200)"}   
                        }
                        
                    }
                }else if(this.busquedaRecorrido != null){
                    for (let x = 0; x < this.busquedaRecorrido.length; x++) {
                        if(this.busquedaRecorrido[x].from === tmp.dato.inicio.id && this.busquedaRecorrido[x].to === tmp.dato.destino.id){
                            egde = {from: tmp.dato.inicio.id, to: tmp.dato.destino.id , label: tmp.dato.distancia.toString(),  color: "lime"}   
                        }
                        
                    }
                }else if(this.costoUnfi != null){
                    for (let x = 0; x < this.costoUnfi.length; x++) {
                        if(this.costoUnfi[x].from === tmp.dato.inicio.id && this.costoUnfi[x].to === tmp.dato.destino.id){
                            egde = {from: tmp.dato.inicio.id, to: tmp.dato.destino.id , label: tmp.dato.distancia.toString(),  color: "orange"}   
                        }
                        
                    }
                }else if(this.caminoFinal != null){
                    for (let x = 0; x < this.caminoFinal.length; x++) {
                        if(this.caminoFinal[x].from === tmp.dato.inicio.id && this.caminoFinal[x].to === tmp.dato.destino.id){
                            egde = {from: tmp.dato.inicio.id, to: tmp.dato.destino.id , label: tmp.dato.distancia.toString(),  color: "orange"}   
                        }
                        
                    }
                }
                
                arregloEdge.push(egde)
                tmp = tmp.siguiente
            }
            aux = aux.siguiente
        }
        /* if(this.anchura != null){
            
            return arregloEdge.concat(this.anchura)
        }
        
        if(this.profundidad != null){
            return arregloEdge.concat(this.profundidad)
        } */

        if(this.caminoFinal != null){
            return arregloEdge.concat(this.caminoFinal)
        }
        return arregloEdge
    } 
}

export default ListaAdyacencia;
