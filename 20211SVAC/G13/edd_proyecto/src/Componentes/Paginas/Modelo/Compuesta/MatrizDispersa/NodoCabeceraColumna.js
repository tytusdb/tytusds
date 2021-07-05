import ListaVertical from './ListaVertical.js';
// const ListaVertical = require('./ListaVertical.js')
class NodoCabeceraColumna {
   
    constructor(x) {
        this.x = x;
        this.siguiente = null;
        this.anterior = null;
        this.columna = new ListaVertical();
    }

    getSiguiente() { return this.siguiente; }

    setSiguiente(siguiente) { this.siguiente = siguiente; }

    getAnterior() { return this.anterior; }

    setAnterior(anterior) { this.anterior = anterior; }

    getColumna() { return this.columna; }

    setColumna(columna) { this.columna = columna; }

    getX() { return this.x; }

    setX(x) { this.x = x; }
}


export default NodoCabeceraColumna;
// module.exports = NodoCabeceraColumna;
