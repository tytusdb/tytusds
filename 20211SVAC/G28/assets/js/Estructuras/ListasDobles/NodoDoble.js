class NodoDoble {
    constructor(datos = null){
        this.datos = datos;
        this.siguiente = null;
        this.anterior = null;
   }
}

module.exports = NodoDoble;