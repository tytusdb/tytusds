class Nodo {
    constructor(dato) {
        this.dato = dato
    }
}

class Hash {
    constructor(hash) {
        this.hash = hash
        this.hizq = null
        this.hder = null
    }
}

class Arbol {
    constructor() {
        this.raiz = null
        this.datos = []
    }

    agregar(dato) {
        let valor = new Nodo(dato)
        this.datos.push(valor)
    }

    nuevoMerkle(exp) {
        this.raiz = new Hash(0)
        this.merkle(this.raiz, exp)

    }

    merkle(aux, exp) {
        if (exp > 0) { //para saber que no estamos en la base de datos
            aux.hizq = new Hash(0)
            aux.hder = new Hash(0)
            this.merkle(aux.hizq, exp - 1)
            this.merkle(aux.hder, exp - 1)
        }
    }


}