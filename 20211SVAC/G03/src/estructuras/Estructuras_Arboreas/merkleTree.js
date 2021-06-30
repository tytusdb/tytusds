//Libreria para encriptado
const { sha256 } = require("js-sha256")

//Clase Nodo para lista temporal de carga de datos
class NodoListaTemporal{
    //Constructor
    constructor(datTemporal){
        this.datTemporal = datTemporal
        this.siguiente = null
        this.anterior = null
    }
}

var contadorglobal = 0
var salida = ""

//Clase Lista temporal para carga de datos
class ListaTemporal{
    //Constructor
    constructor(){
        this.cabeza = null
        this.cola = null
        this.size = 0
    }

    //Metodo Insertar en lista temporal
    insertLista(dato){
        let nodo = new NodoListaTemporal(dato);
        //Insercion de primer nodo
        if(this.cabeza == null){
            this.cabeza = nodo;
            this.cola = nodo;
            this.size++;
        }else if(this.cabeza != null){ // Insercion de nodo No Cabeza
            let aux = this.cabeza;
            while(aux != this.cola){
                aux = aux.siguiente;
            }
            aux.siguiente = nodo;
            nodo.anterior = aux
            this.cola = nodo;
            this.size++;
        }
    }

    //Metodo Eliminar par alista temporal
    eliminarLista(dato){
        let nodo = this.cabeza
        if(this.cabeza.datTemporal == dato && this.cabeza == this.cola){
            //Dato unico eliminado
            this.cabeza = null
            this.cola = null
            this.size = 0
            return
        }
        while(nodo.datTemporal != dato && nodo != this.cola){
            nodo = nodo.siguiente
        }
        if(nodo.datTemporal== dato && nodo.anterior == null && nodo.siguiente != null){
            //Dato Eliminado en el al inicio
            let tmp = nodo.siguiente
            this.cabeza = tmp
            tmp.anterior = null
            nodo.siguiente = null
            this.size--
            return
        }else if(nodo.datTemporal == dato && nodo.siguiente != null && nodo.anterior != null){
            //Dato Eliminado en el centro
            let tmp = nodo.siguiente
            tmp.anterior = nodo.anterior
            nodo.anterior.siguiente = tmp
            nodo.siguiente = null
            nodo.anterior = null
            this.size--
            return
        }else if(nodo.datTemporal == dato && nodo.siguiente == null && nodo.anterior != null){
            //Dato eliminado al final de la lista
            let tmp = nodo.anterior
            this.cola = tmp
            tmp.siguiente = null
            nodo.anterior = null
            this.size--
            return
        }
        if(nodo == null){
            //Dato no encontrado
            console.log("No se encontro el dato a eliminar")
            return
        }
    }
}

//arreglo para reestructuracion de datos
var recarga = []

//Clase Nodo para arbol merkle
class Nodo{
    //Constructor
    constructor(dato, izquierda, derecha, nodohijo){
        this.dato = dato
        this.hash = null
        this.id = 0
        this.nodohijo = nodohijo
        this.izquierda = izquierda
        this.derecha = derecha
    }
}

//Clase Arbol Merkle
class MerkleTree{
    //Constructor
    constructor(){
        this.raiz = null
    }

    //Metodo Insertar en arbol Merkle
    insertar(dato){
        let nodo = new Nodo(dato, null, null, true)
        //Insercion de primer nodo
        if(this.raiz == null){
            let listatmp = new ListaTemporal()
            listatmp.insertLista(nodo)
            listatmp.insertLista(new Nodo(-1, null, null, true))
            this.construirArbol(listatmp)           
        }else{  //Insercion de Nodo no primero
            let listatmp = this.ObtenerLista()
            listatmp.insertLista(nodo)
            this.construirArbol(listatmp)
        }
        //Hasheo de datos en sha256
        this.hashing()
        contadorglobal = 0
    }

    //Metodo de Carga de datos en lista temporal para insercion de arbol
    ObtenerLista(){
        let listatmp = new ListaTemporal()
        this.obtenerlista(listatmp, this.raiz.izquierda)
        this.obtenerlista(listatmp, this.raiz.derecha)
        return listatmp
    }

    //Sub metodo de carga de datos en lista temporal para insercion de arbol
    obtenerlista(lista, nodo){
        if(nodo != null){
            this.obtenerlista(lista, nodo.izquierda)
            if(nodo != null && nodo.dato != -1 && nodo.nodohijo == true){
                lista.insertLista(nodo)
            }
            this.obtenerlista(lista, nodo.derecha)
        }
    }

    //Metodo para armado base de arbol
    construirArbol(lista){
        let tamanio = new Float64Array(lista.size)
        let cant = 1
        let operacion = tamanio.length/2
        //Calculo de nodos actuales
        while (operacion > 1){
            cant++
            operacion = operacion/2
        }
        let vectorTotal = new Float64Array(cant)
        let totalnodos = Math.pow(2, vectorTotal.length)    //Calculo de nodos hijos para arbol merkle
        //Complemetacion de nodos hijo para arbol merkle final
        while(lista.size < Math.floor(totalnodos)){
            lista.insertLista(new Nodo(-1,null,null,true))
        }
        //Insercion de datos en arbol
        while(lista.size>1){
            let primero = lista.cabeza
            let segundo = primero.siguiente
            lista.eliminarLista(primero.datTemporal)
            lista.eliminarLista(segundo.datTemporal)
            let nodo1 = primero.datTemporal
            nodo1.id = contadorglobal + 1
            let nodo2 = segundo.datTemporal
            nodo2.id = contadorglobal + 2 
            let suma = nodo1.dato + nodo2.dato
            let nuevo = new Nodo(suma, nodo1, nodo2,false)
            nuevo.id = contadorglobal
            lista.insertLista(nuevo)
            contadorglobal = contadorglobal + 3
        }
        //Asignacion de raiz
        this.raiz = lista.cabeza.datTemporal
    }

    //Metodo Asignacion de Hash
    hashing(){
        if(this.raiz ==null){
            console.log("No existe arbol")
            return
        }
        this.subHashing(this.raiz)
    }

    //SubMetodo Asignacion de Hash
    subHashing(nodo){
        if(nodo != null){
            let hasheo = sha256.create()
            hasheo.update(String(nodo.dato))
            hasheo.hex()
            nodo.hash = hasheo
            this.subHashing(nodo.izquierda)
            this.subHashing(nodo.derecha)
        }
    }

    //Metodo Imprimir
    imprimiendo(){
        if(this.raiz ==null){
            console.log("No existe arbol")
            return
        }
        this.imprimir(this.raiz)
    }

    //SubMetodo Imprimir
    imprimir(nodo){
        if(nodo != null){
            console.log(nodo.dato + " Es el dato")
            console.log(nodo.hash + " Es el Hash")
            this.imprimir(nodo.izquierda)
            this.imprimir(nodo.derecha)
        }
    }

    //Metodo Buscar
    buscando(dato){
        if(this.raiz ==null){
            console.log("No existe arbol")
            return
        }
        let hasheo = sha256.create()
        hasheo.update(String(dato))
        hasheo.hex()
        let nodo = this.raiz
        this.buscar(hasheo, nodo)
    }

    //SubMetodo Buscar
    buscar(hasheo, nodo){
        if(nodo!= null){
            let noha = nodo.hash.hex()
            let has = hasheo.hex()
            if(has == noha && nodo.nodohijo == true){
                console.log(nodo.hash + " fue encontrado para "+nodo.dato)
                return
            }
            this.buscar(hasheo, nodo.izquierda)
            this.buscar(hasheo, nodo.derecha)
        }
    }

    //Metodo Eliminar
    Eliminar(dato){
        if(this.raiz ==null){
            console.log("No existe arbol")
            return
        }
        let hasheo = sha256.create()
        hasheo.update(String(dato))
        hasheo.hex()
        let nodo = this.raiz
        this.eliminando(hasheo, nodo)
    }

    //SubMetodo Eliminar
    eliminando(hasheo, nodo){
        if(nodo!= null){
            let noha = nodo.hash.hex()
            let has = hasheo.hex()
            if(has == noha && nodo.nodohijo == true){
                nodo.nodohijo = false
                this.cargaArbolLista()
                this.raiz = null
                for(let i = 0;i<recarga.length;i++){
                    this.insertar(recarga[i])
                }
                recarga = []
                this.hashing()
                console.log("Dato Eliminado")
                return
            }
            this.eliminando(hasheo, nodo.izquierda)
            this.eliminando(hasheo, nodo.derecha)
        }
    }
    
    //Metodo cargarlista para reestructuracion del arbol
    cargaArbolLista(){
        if(this.raiz ==null){
            console.log("No existe arbol")
            return
        }
        let nodo = this.raiz
        this.cargandoArbolLista(nodo)
    }

    //SubMetodo Cargando lista para reestructuracion del arbol
    cargandoArbolLista(nodo){
        if(nodo!= null){
            if(nodo.nodohijo == true && nodo.dato != -1){
                recarga.push(nodo.dato)
            }
            this.cargandoArbolLista(nodo.izquierda)
            this.cargandoArbolLista(nodo.derecha)
        }
    }

    //Metodo Modificar
    modificar(datoelim, nuevodato){
        if(this.raiz ==null){
            console.log("No existe arbol")
            return
        }
        let hasheo = sha256.create()
        hasheo.update(String(datoelim))
        hasheo.hex()
        let nodo = this.raiz
        this.modificando(hasheo, nuevodato, nodo)
    }




    
    //SubMetodo modificar
    modificando(hasheo, nuevodato, nodo){
        if(nodo!= null){
            let noha = nodo.hash.hex()
            let has1 = hasheo.hex()
            if(has1 == noha && nodo.nodohijo == true){
                nodo.dato = nuevodato
                this.cargaArbolLista()
                this.raiz = null
                for(let i = 0;i<recarga.length;i++){
                    this.insertar(recarga[i])
                }
                recarga = []
                this.hashing()
                console.log("Dato Modificado")
                return
            }
            this.modificando(hasheo, nuevodato, nodo.izquierda)
            this.modificando(hasheo, nuevodato, nodo.derecha)
        }
    }

    //Metodo Cargar
    cargar(arreglo) {
        arreglo.map(elemento => {
            this.insertar(elemento);
        })
    }

    //Metodo Guardar
    guardando(){
        if(this.raiz==null){
            console.log("no existe arbol")
            return
        }
        let nodo = this.raiz;
        this.guardar(nodo)
    }

    //Metodo Guardar
    guardar(){
        let vector = []
        return this.preOrden(this.raiz, vector);
    }

    preOrden(nodo,vector){
        if(nodo != null){
        vector.push(nodo.dato)
        this.preOrden(nodo.izquierda,vector)
        this.preOrden(nodo.derecha,vector)
        }
        return vector
    }

    graficarNodos(nodo,vector,datoBuscar){

        if(nodo.izquierda == null && nodo.derecha == null){
            let dato
            if(datoBuscar == nodo.dato){
                dato = {id: nodo.dato, label: nodo.dato.toString(), color: "lime"}
            }else{
                dato = {id: nodo.dato, label: nodo.dato.toString(),}
            }
            
            vector.push(dato)
        }else{
            let dato
            if(datoBuscar == nodo.dato){
                dato = {id: nodo.dato, label: nodo.dato.toString(), color: "lime"}
            }else{
                dato = {id: nodo.dato, label: nodo.dato.toString(),}
            }
            
            vector.push(dato)
        }
        
        if(nodo.izquierda != null){
            this.graficarNodos(nodo.izquierda,vector,datoBuscar)
        }

        if (nodo.derecha != null){
            this.graficarNodos(nodo.derecha,vector,datoBuscar)
        }

        return vector
    }

    obtenerNodos(datoBuscar){
        let vector = []

        return this.graficarNodos(this.raiz,vector,datoBuscar)
    }

    graficarApuntadores(nodo,vector){

        if(nodo.izquierda != null){
            this.graficarApuntadores(nodo.izquierda,vector)
            let edge = {from:nodo.dato, to:nodo.izquierda.dato}
            vector.push(edge)
        }

        if (nodo.derecha != null){
            this.graficarApuntadores(nodo.derecha,vector)
            let edge = {from:nodo.dato, to:nodo.derecha.dato}
            vector.push(edge)
        }

        return vector
    }

    obtenerAputadores(){
        let vector = []

        return this.graficarApuntadores(this.raiz,vector)
    }

    //Metodo Graficar
    graficar(valorBuscar){
        
        salida = ""
        if(this.raiz == null){
            console.log("No hay nada aun")
            return
        }
        let nodo = this.raiz
        let contador = 0
        salida+= "digraph G{\nnode[shape=record]\nedge[color=\"green\"]\n"
        this.graficando(nodo,valorBuscar)
        salida+= "}"
        console.log(salida)
        contador = 0

        return salida
    }

    //SubMetodo Buscar
    graficando(nodo,valorBuscar){
        if(nodo!= null){
            if(valorBuscar == nodo.dato){
                salida += "node"+nodo.id+" [color=\"green\" label = \" iz| "+nodo.dato+"|"+nodo.hash.hex()+" |de \"]; \n"
            }else{
                salida += "node"+nodo.id+" [label = \" iz| "+nodo.dato+"|"+nodo.hash.hex()+" |de \"]; \n"
            }
            if(nodo.derecha != null){
                salida += "node"+nodo.id + " -> node" +nodo.derecha.id + "\n"
            }
            if(nodo.izquierda != null){
                salida+= "node"+nodo.id + " -> node" + nodo.izquierda.id + "\n"
            }
            if(nodo.izquierda!=null){
                this.graficando(nodo.izquierda,valorBuscar)
            }
            if(nodo.derecha != null){
                this.graficando(nodo.derecha,valorBuscar)
            }
        }
    }
}


export default MerkleTree;