class Nodo{
    constructor(valor){
        this.valor = valor
        this.siguiente = null
        this.anterior = null
    }
}

class Rama{
    constructor(){
        this.hoja = false
        this.llaves = []
        this.hijos = []
        this.padre = null
    }

    insertar(valor){

    }
}

class B{
    constructor(orden, repetidos){
        this.raiz = null
        this.orden = orden
        this.repetidos = repetidos
    }

    agregar(valor){
        this.raiz = _agregar(valor, this.raiz)
    }
} 

function _agregar(valor, raiz){

}