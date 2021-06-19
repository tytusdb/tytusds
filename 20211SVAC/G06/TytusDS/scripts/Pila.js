class Nodo {
    constructor(dato) {
        this.dato = dato
        this.siguiente = null;
    }
}

class Pila {
    constructor() {
        this.top = null;
        this.bottom = null;
        this.capacidad = 0;
    }

    agregar(datoA) {
        let nuevo = new Nodo(datoA)
        if (this.bottom == null) {
            this.bottom = nuevo
            this.top = nuevo
        } else {
            this.top.siguiente = nuevo
            this.top = nuevo
        }
        this.capacidad++
            return datoA
    }

    buscar(datoB) {
        let aux = this.bottom;
        if (aux == null) {
            console.log("LISTA VACIA")
        } else {
            while (aux != null) {
                if (aux.dato == datoB) {
                    console.log(aux.dato)
                    console.log("ENCONTRADO")
                }
                aux = aux.siguiente;
            }
        }
    }

    eliminar() {
        let aux = this.bottom
        if (aux == null) {
            console.log("Pila vacia")
        } else {
            if (aux == this.bottom && aux == this.top) { //unico dato
                this.top = null
                this.bottom = null
            }
            while (aux != null) {
                if (aux.siguiente == this.top) {
                    aux.siguiente = null
                    this.top = aux
                }
                aux = aux.siguiente
            }
        }
    }

    actualizar(datoB, valor) {
        let aux = this.bottom;
        if (aux == null) {
            console.log("PILA VACIA")
        } else {
            while (aux != null) {
                if (aux.dato == datoB) {
                    aux.dato = valor;
                    console.log("DATO ACTUALIZADO")
                    break
                } else {
                    aux = aux.siguiente;
                }
            }
        }
    }

    mostrar() {
        let aux = this.bottom
        let res = [];
        if (aux == null) {
            return "Pila Vacia"
        } else {
            while (aux != null) {
                res.push(aux.dato.toString())
                console.log(aux)
                aux = aux.siguiente;
            }
        }
        console.log(res);
        return res
    }
}

/*function lol() {
    var no = new Pila();
    no.agregar(10);
    no.agregar(20);
    no.agregar(30);
    no.agregar(40);
    no.mostrar();
    no.buscar(40)
    no.actualizar(20, 200)
    no.mostrar();
}

lol();*/