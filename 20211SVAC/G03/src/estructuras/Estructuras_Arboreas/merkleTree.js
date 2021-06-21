
class NodoListaTemporal{
    constructor(datTemporal){
        this.datTemporal = datTemporal
        this.siguiente = null
        this.anterior = null
    }
}

class ListaTemporal{
    constructor(){
        this.cabeza = null
        this.cola = null
        this.size = 0
    }

    //Metodo Insertar
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

var recarga = []

class Nodo{
    constructor(dato, izquierda, derecha, nodohijo){
        this.dato = dato
        this.hash = null
        this.nodohijo = nodohijo
        this.izquierda = izquierda
        this.derecha = derecha
    }
}


class MerkleTree{
    constructor(){
        this.raiz = null
    }

    suma(nodo) {
        if (nodo.derecha != null && nodo.izquierda != null){
            return nodo.derecha.dato + nodo.izquierda.dato
        }
        return -1
    }

    insertar(dato){
        let nodo = new Nodo(dato, null, null, true)
        if(this.raiz == null){
            let listatmp = new ListaTemporal()
            listatmp.insertLista(nodo)
            listatmp.insertLista(new Nodo(-1, null, null, true))
            this.construirArbol(listatmp)           
        }else{
            let listatmp = this.ObtenerLista()
            listatmp.insertLista(nodo)
            this.construirArbol(listatmp)
        }
    }

    ObtenerLista(){
        let listatmp = new ListaTemporal()
        this.obtenerlista(listatmp, this.raiz.izquierda)
        this.obtenerlista(listatmp, this.raiz.derecha)
        return listatmp
    }

    obtenerlista(lista, nodo){
        if(nodo != null){
            this.obtenerlista(lista, nodo.izquierda)
            if(nodo != null && nodo.dato != -1){
                lista.insertLista(nodo)
            }
            this.obtenerlista(lista, nodo.derecha)
        }
    }

    construirArbol(lista){
        let tamanio = new Float64Array(lista.size)
        let cant = 1
        let operacion = tamanio.length/2
        while (operacion > 1){
            cant++
            operacion = operacion/2
        }
        let vectorTotal = new Float64Array(cant)
        let totalnodos = Math.pow(2, vectorTotal.length)
        while(lista.size < Math.floor(totalnodos)){
            lista.insertLista(new Nodo(-1,null,null,true))
        }
        while(lista.size>1){
            let primero = lista.cabeza
            let segundo = primero.siguiente
            lista.eliminarLista(primero.datTemporal)
            lista.eliminarLista(segundo.datTemporal)
            let nodo1 = primero.datTemporal
            let nodo2 = segundo.datTemporal
            let suma = nodo1.dato + nodo2.dato
            let nuevo = new Nodo(suma, nodo1, nodo2,false)
            lista.insertLista(nuevo)
        }
        this.raiz = lista.cabeza.datTemporal
    }

    
}

  