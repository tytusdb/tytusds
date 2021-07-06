import ListaHorizontal from './ListaHorizontal.js';
// const ListaHorizontal = require('./ListaHorizontal.js')
class NodoCabeceraFila {
    
    constructor(y) {
        this.y = y;
        this.siguiente = null;
        this.anterior = null;
        this.fila = new ListaHorizontal();
    }

    getSiguiente() { return this.siguiente; }

    setSiguiente(siguiente) { this.siguiente = siguiente; }

    getAnterior() { return this.anterior; }

    setAnterior(antertior) { this.anterior = antertior; }

    getFila() { return this.fila; }

    setFila(fila) { this.fila = fila; }

    getY() { return this.y; }

    setY(y) { this.y = y; }
}


export default NodoCabeceraFila;
// module.exports = NodoCabeceraFila;
