class Nodo
{
    constructor(valor)
    {
        this.valor = valor;
        this.izquierda = null;
        this.derecha = null;
    }
    get_valor(){return this.valor;}
    set_valor(valor){this.valor=valor;}
    get_izquierda(){return this.izquierda;}
    set_izquierda(valor){this.izquierda=valor;}
    get_derecha(){return this.derecha;}
    set_derecha(valor){this.derecha=valor;}
}
module.exports = Nodo;