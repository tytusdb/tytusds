class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

class ListaCircularSimple {
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }

    agregar(dato) {
        let nuevo = new Nodo(dato);
        if (this.primero == null) {
            this.primero = nuevo
            this.ultimo = nuevo
            this.ultimo.siguiente = this.primero
        } else {
            this.ultimo.siguiente = nuevo;
            nuevo.siguiente = this.primero;
            this.ultimo = nuevo;
        }
        return {
            dato: dato,
            pos: true
        }
    }

    buscar(datoB) {
        let aux = this.primero;
        if (aux == null) {
            console.log("LISTA VACIA")
        } else {
            do {
                if (aux.dato == datoB) {
                    console.log(aux.dato)
                    console.log("ENCONTRADO")
                    aux = aux.siguiente;
                    return true
                } else {
                    aux = aux.siguiente;
                }
            } while (aux != this.ultimo.siguiente)
            return false
        }
    }

    actualizar(datoB, valor) {
        let aux = this.primero;
        if (aux == null) {
            console.log("LISTA VACIA")
        } else {
            do {
                if (aux.dato == datoB) {
                    aux.dato = valor;
                    console.log("DATO ACTUALIZADO")
                    return true
                } else {
                    aux = aux.siguiente;
                }
            } while (aux != this.ultimo.siguiente)
        }
    }

    eliminar(datoB) {
        let aux = this.primero
        if (aux == null) {
            console.log("VACIA")
        } else {
            if (aux.dato == datoB && this.primero == aux && this.ultimo == aux) { //unico dato
                this.ultimo = null
                this.primero = null
                return
            }
            if (aux.dato == datoB && aux == this.primero) { // se elimina el primero
                if (aux.siguiente == this.ultimo) { //si solo hay 2
                    aux = aux.siguiente
                    this.primero = aux
                    this.ultimo = aux
                    this.ultimo.siguiente = this.primero
                    return "op1"
                } else { //si hay mas de 2
                    aux = aux.siguiente
                    this.primero = aux
                    this.ultimo.siguiente = aux
                    return "op2"
                }
            }
            do {
                if (aux != this.ultimo) {
                    if (aux.siguiente.dato == datoB && aux.siguiente.siguiente == this.ultimo) { //penultimo dato
                        aux.siguiente = this.ultimo
                        return "op5"
                    } else if (aux.siguiente == this.ultimo) { //ultimo dato
                        if (aux.siguiente.dato == datoB) {
                            aux.siguiente = this.primero
                            this.ultimo = aux
                            return "op3"
                        }
                    } else if (aux.siguiente.dato == datoB) { //en medio
                        //console.log("entre")
                        aux.siguiente = aux.siguiente.siguiente
                        return "op4"
                    }
                }
                aux = aux.siguiente
            } while (aux != this.ultimo.siguiente)
        }
    }

    mostrar() {
        let aux = this.primero
        let res = [];
        if (aux == null) {
            return "Lista Vacia"
        } else {
            do {
                res.push(aux.dato.toString())
                console.log(aux)
                aux = aux.siguiente;
            } while (aux != this.ultimo.siguiente);
        }
        console.log(res);
        return res
    }
}

function lol() {
    console.log("lol")
}

lol();