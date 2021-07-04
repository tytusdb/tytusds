class NodoLD {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
        this.anterior = null;
    }
}
class ListaDoble {
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }

    agregar(dato) {
        let nuevo = new NodoLD(dato);
        if (this.primero == null) {
            this.primero = nuevo;
            this.ultimo = nuevo;
        } else {
            nuevo.anterior = this.ultimo
            this.ultimo.siguiente = nuevo
            this.ultimo = nuevo
        }
        return dato
    }

    buscar(datoB) {
        let aux = this.primero;
        if (aux == null) {
            console.log("LISTA VACIA")
        } else {
            while (aux != null) {
                if (aux.dato == datoB) {
                    console.log(aux.dato)
                    console.log("ENCONTRADO")
                    aux = aux.siguiente;
                    return true
                } else {
                    aux = aux.siguiente;
                }
            }
            return false
        }
    }

    actualizar(datoB, valor) {
        let aux = this.primero;
        if (aux == null) {
            console.log("LISTA VACIA")
        } else {
            while (aux != null) {
                if (aux.dato == datoB) {
                    aux.dato = valor;
                    console.log("DATO ACTUALIZADO")
                    return true
                } else {
                    aux = aux.siguiente;
                }
            }
        }
    }

    eliminar(datoB) {
        let aux = this.primero
        let flag = true
        if (aux == null) {
            console.log("VACIA")
        } else {
            while (aux != null) {
                if (aux.anterior == null) { //primer dato
                    if (aux.dato == datoB) {
                        aux.siguiente.anterior = null;
                        this.primero = aux.siguiente
                        return "op1"
                    }
                }
                if (aux.siguiente == null) { //ultimo dato
                    if (aux.dato == datoB) {
                        aux.anterior.siguiente = null;
                        this.ultimo = aux.anterior;
                        return "op2"
                    }
                }
                if (aux.siguiente == this.ultimo) { //penultimo dato
                    if (aux.dato == datoB) {
                        aux.anterior.siguiente = this.ultimo
                        this.ultimo.anterior = aux.anterior
                        return "op3"
                    }
                }
                if (aux.siguiente != this.ultimo) { //En medio
                    if (aux.dato == datoB) {
                        aux.siguiente.anterior = aux.anterior
                        aux.anterior.siguiente = aux.siguiente
                        return "op4"
                    }
                }
                aux = aux.siguiente
            }
        }
    }

    mostrar() {
        //console.log(this.primero)
        let aux = this.primero
        let res = [];
        if (aux == null) {
            return "Lista Vacia"
        } else {
            while (aux != null) {
                res.push(aux.dato.toString())
                    //console.log(aux)
                aux = aux.siguiente;
            }
        }
        //console.log(res);
        return res
    }
}

function lol() {
    console.log("loldoble")
}

lol();