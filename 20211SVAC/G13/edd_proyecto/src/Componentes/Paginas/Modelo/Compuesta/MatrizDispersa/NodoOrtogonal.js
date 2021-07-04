class NodoOrtogonal {
 
    constructor(x, y, dato) {
        this.dato = dato;
        this.x = x;
        this.y = y;
        this.arriba = null;
        this.abajo = null;
        this.izquierda = null;
        this.derecha = null;
    }

    getDato = () => { return this.dato; }
    setDato = (dato) =>{ this.dato = dato; }

    getX = () => {return this.x; }

    getY = () => {return this.y; }

    getArriba = () => {return this.arriba; }

    setArriba = (arriba) => {this.arriba = arriba; }

    getAbajo = () => {return this.abajo; }

    setAbajo = (abajo) => { this.abajo = abajo; }

    getIzquierda = () => {return this.izquierda; }

    setIzquierda = (izquierda) => {this.izquierda = izquierda; }

    getDerecha = () => {return this.derecha; }

    setDerecha = (derecha) => {this.derecha = derecha; }
}



export default NodoOrtogonal;
// module.exports = NodoOrtogonal;