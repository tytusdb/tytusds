//Clase Nodo
class Nodo{
    constructor(dato){  //Constructor
        this.dato = dato
        this.izquierda = null
        this.derecha = null
    }
}
//Clase Arbol Binario de Busqueda
class ABB{
    //Constructor
    constructor(){
        this.raiz = null
    }

    //Metodo Insertar
    insertar(dato){
        this.raiz = this.add(dato, this.raiz)
        console.log("Inserto un nodo" )
    }

    //Sub Metodo Insertar
    add(dato, nodo){
        if(nodo == null){
            return new Nodo(dato)
        }else{
            if(dato > nodo.dato){
                nodo.derecha =  this.add(dato,nodo.derecha)
            }else{
                nodo.izquierda =  this.add(dato,nodo.izquierda)
            }
        }
        return nodo
    }

    //Metodo Buscar
    buscar(dato, nodo){
        if(nodo!= null){
            if(dato == nodo.dato){
                console.log(nodo.dato + " fue encontrado")
                return 
            }
            this.buscar(dato, nodo.izquierda)
            this.buscar(dato, nodo.derecha)
        }
    }

    //SubMetodo Buscar
    buscando(dato){
        if(this.raiz ==null){
            console.log("No existe arbol")
            return
        }
        if(dato == this.raiz.dato){
            console.log(this.raiz.dato)
            return
        }
        let nodo = this.raiz
        this.buscar(dato, nodo)
    }

    //Metodo Imprimir
    imprimir(nodo){
        if(nodo != null){
            console.log(nodo.dato)
            this.imprimir(nodo.izquierda)
            this.imprimir(nodo.derecha)
        }
    }

    //Sub Metodo Imprimir
    imprimiendo(){
        if(this.raiz ==null){
            console.log("No existe arbol")
            return
        }
        this.imprimir(this.raiz)
    }
}