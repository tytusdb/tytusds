class Nodo{
    constructor(dato){
        this.dato = dato
        this.izquierda = null
        this.derecha = null
    }
}
class ABB{
    constructor(){
        this.raiz = null
    }

    insertar(dato){
        this.raiz = this.add(dato, this.raiz)
        console.log("Inserto un nodo" )
    }

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

    
}

