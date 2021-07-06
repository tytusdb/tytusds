class NodoCS {
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
        let nuevo = new NodoCS(dato);
        if (this.primero == null) {
            this.primero = nuevo
            this.ultimo = nuevo
            this.ultimo.siguiente = this.primero
        } else {
            this.ultimo.siguiente = nuevo;
            nuevo.siguiente = this.primero;
            this.ultimo = nuevo;
        }
        return nuevo
            /*return {
                dato: dato,
                pos: true
            }*/
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

class NodoLD {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
        this.anterior = null;
        this.arreglo = [];
        this.contador = 0
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

    agregarCircular(prim, sec) {
        let aux = this.primero
        while (aux != null) {
            //console.log(aux)
            //console.log(aux.arreglo)
            if (aux.dato == prim) {
                if (aux.arreglo[0] == undefined) {
                    aux.arreglo[0] = new ListaCircularSimple();
                    aux.arreglo[0].agregar(sec)
                    let a = aux.arreglo[0]
                    aux = aux.siguiente
                    return a
                } else {
                    aux.arreglo[0].agregar(sec)
                    let a = aux.arreglo[0]
                    aux = aux.siguiente
                    return a
                }
            } else {
                aux = aux.siguiente
            }
        }
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
                    return false
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

/*function lol() {
    var l = new ListaDoble()
    l.agregar(5)
    l.agregar(6)
    l.agregar(7)
    l.agregarCircular(6, 10)
    l.agregarCircular(7, 5)
    l.agregarCircular(6, 11)
    console.log(l.mostrar())
}


lol();*/