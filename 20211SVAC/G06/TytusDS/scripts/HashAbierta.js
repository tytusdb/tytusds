class Nodo {
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
        let nuevo = new Nodo(dato);
        if (this.primero == null) {
            this.primero = nuevo;
            this.ultimo = nuevo;
        } else {
            nuevo.anterior = this.ultimo
            this.ultimo.siguiente = nuevo
            this.ultimo = nuevo
        }
        return nuevo
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
            console.log("NO SE ENCONTRO")
            return false
        }
    }

    buscarB(datoB) {
        let aux = this.primero;
        if (aux == null) {
            console.log("LISTA VACIA")
        } else {
            while (aux != null) {
                if (aux.dato == datoB) {
                    console.log(aux.dato)
                    console.log("ENCONTRADO")
                    return aux
                        //aux = aux.siguiente;
                } else {
                    aux = aux.siguiente;
                }
            }
            console.log("NO SE ENCONTRO")
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

class Table {
    constructor(largo) {
        this.largo = largo
        this.tabla = []
    }
}

class Hash {
    constructor() {
        //this.primero = null
        //this.ultimo = null
        this.crear = null
        this.nuevo = null
    }

    crearHash(long) {
        this.crear = new Table(long)
        for (let i = 0; i < this.crear.largo; i++) {
            this.crear.tabla[i] = 0
        }
    }

    insert(valor) {
        let aux = parseInt(valor)
        try {
            if (parseInt(valor) < this.crear.largo) {
                c //onsole.log("menor")
                if (this.crear.tabla[valor] == 0) {
                    this.crear.tabla[valor] = new ListaDoble();
                    this.crear.tabla[valor].agregar(valor)
                } else {
                    this.crear.tabla[valor].agregar(valor)
                }
            } else {
                //console.log("mayor")
                while (aux >= this.crear.largo) {
                    aux -= this.crear.largo
                }
                //console.log("aux", aux)
                if (aux < this.crear.largo) {
                    if (this.crear.tabla[aux] == 0) {
                        this.crear.tabla[aux] = new ListaDoble();
                        this.crear.tabla[aux].agregar(valor)
                    } else {
                        this.crear.tabla[aux].agregar(valor)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
        console.log(this.crear.tabla)
        return aux
            // console.log("lol", this.crear.tabla[1])
    }

    search(valor) {
        var estado = ""
        if (valor < this.crear.largo) {
            if (this.crear.tabla[valor] != 0) {
                estado = this.crear.tabla[valor].buscar(valor)
                console.log(estado, "e")
            } else {
                estado = "vacio"
                console.log("vacio")
            }
        } else {
            let aux = valor
            while (aux >= this.crear.largo) {
                aux -= this.crear.largo
            }
            if (this.crear.tabla[aux] != 0) {
                if (aux < this.crear.largo) {
                    estado = this.crear.tabla[aux].buscar(valor)
                    console.log(estado, "e")
                }
            } else {
                estado = "vacio"
                    //console.log("vacio")
            }
        }
        return estado
    }

    act(valor, nuevo) {
        let aux = this.crear.tabla[valor].search(valor)
        if (aux != "vacio") {
            this.crear.tabla[valor].actualizar(valor, nuevo)
        }
        console.log(this.crear.tabla)
    }

    delete(valor) {
        let res = ""
        if (parseInt(valor) < this.crear.largo) {
            let aux = this.search(parseInt(valor))
            if (aux != "vacio") {
                res = this.crear.tabla[parseInt(valor)].eliminar(parseInt(valor))
            }
        } else {
            let aux = parseInt(valor)
            while (aux >= this.crear.largo) {
                aux -= this.crear.largo
            }
            if (aux < this.crear.largo) {
                let aux2 = this.search(parseInt(valor))
                if (aux2 != "vacio") {
                    res = this.crear.tabla[aux].eliminar(parseInt(valor))
                }
            }
        }
        console.log(this.crear.tabla)
        return res
    }

}


function lol() {
    var no = new Hash()
    let array = [1, 4, 6, 9, 11, 100]
    no.crearHash(5)
    for (let i = 0; i < array.length; i++) {
        no.insert(array[i])
    }
    console.log(no.search(6), "l")
        /*no.insert(4)
        no.insert(6)
        no.insert(9)
        no.insert(11)
        no.insert(100)*/
}

lol();

/*function lol() {
    var no = new ListaDoble();
    no.agregar(10);
    no.agregar(20);
    no.agregar(30);
    console.log(no.mostrar().length)
    for (let i = 0; i < 3; i++) {
        console.log(no.mostrar()[i])
    }

}

lol();*/