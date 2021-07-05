class NodoD {
    constructor(_valor) {
        this.valor = _valor;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ListaCircularDoble {
    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.indice = null;
        this.len = 0;
    }

    add(dato) {
        let nuevo = new NodoD(dato)
        if (this.primero == null) {
            this.primero = nuevo
            this.primero.siguiente = this.primero
            nuevo.anterior = this.ultimo
            this.ultimo = nuevo;
            this.indice = this.primero
            this.len++
        } else {
            this.ultimo.siguiente = nuevo
            nuevo.siguiente = this.primero
            nuevo.anterior = this.ultimo
            this.ultimo = nuevo
            this.primero.anterior = this.ultimo
            this.len++
        }
    }

    delete(valor) {
        let eliminado = null
        if (this.primero != null) {
            let tmp = this.primero
            let ant = this.ultimo
            do {
                if (tmp.valor.value == valor) {
                    if (tmp == this.primero && this.primero == this.ultimo) {
                        eliminado = this.primero
                        this.primero = null
                        this.ultimo = null
                        this.indice = null
                        this.len--
                            return eliminado
                    } else if (tmp == this.primero) {
                        eliminado = this.primero
                        this.primero = this.primero.siguiente
                        this.ultimo.siguiente = this.primero
                        this.primero.anterior = this.ultimo
                        this.len--
                            return eliminado
                    } else if (tmp == this.ultimo) {
                        eliminado = this.ultimo
                        this.ultimo = ant
                        this.primero.anterior = this.ultimo
                        this.ultimo.siguiente = this.primero
                        this.len--
                            return eliminado
                    } else {
                        eliminado = tmp
                        ant.siguiente = tmp.siguiente
                        tmp.siguiente.anterior = ant
                        this.len--
                            return eliminado
                    }
                }
                ant = tmp
                tmp = tmp.siguiente
            } while (tmp != this.primero);
        }
        return eliminado
    }

    getPrimero() {
        return this.primero
    }

    getUltimo() {
        return this.ultimo
    }

    update(valor, nuevoValor) {
        let tmp = this.primero;
        do {
            if (tmp.valor.value == valor) {
                tmp.valor.value = nuevoValor
                return tmp
            }
            tmp = tmp.siguiente
        } while (tmp != this.primero);
        return null
    }

    search(valor) {
        let tmp = this.primero
        let encontrado = false
        var dato
        if (tmp != null) {
            do {
                if (tmp.valor.value == valor) {
                    encontrado = true
                    dato = tmp
                    return dato
                }
                tmp = tmp.siguiente
            } while (tmp != this.primero);
            if (encontrado) {
                return dato
            }
        }
        return null
    }

    isFirst() {
        if (this.primero == this.ultimo) {
            return true
        }
        return false
    }

    toArray() {
        let array = []
        let tmp = this.primero
        do {
            array.push(tmp.valor)
            tmp = tmp.siguiente
        } while (tmp != this.primero);
        return array
    }

    print() {
        let tmp = this.primero;
        let cadena = "";
        do {
            if (tmp != null) {
                cadena += "->" + tmp.valor.value + "<-"
                tmp = tmp.siguiente
            }
        } while (tmp != this.primero);
        return cadena;
    }
}