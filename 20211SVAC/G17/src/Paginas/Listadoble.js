import React from "react";

class Nodo {
    constructor(valor, siguiente, anterior) {
        this.valor = valor
        this.siguiente = siguiente
        this.anterior = anterior
    }
}

class listaDoble {
    constructor() {
        this.cabeza = null
        this.cola = null
        this.cantidad = 0
    }

    imprimir() {
        let actual = this.cabeza
        let resultado = ''
        while(actual) {
            resultado += actual.valor + '<=> '
            actual = actual.siguiente
        }

        return resultado += ' X '
    }

    imprimirReverso() {
        let actual = this.cola
        let resultado = ''
        while(actual) {
            resultado += actual.valor + ' <-> '
            actual = actual.anterior
        }
        return resultado += ' X '
    }

    agregarEnCabeza(valor) {
        const nuevoNodo = new Nodo(valor, this.cabeza, null)

        if (this.cabeza) {
            nuevoNodo.siguiente = this.cabeza
            this.cabeza.anterior = nuevoNodo
            this.cabeza = nuevoNodo
        } else {
            this.cabeza = nuevoNodo
            this.cola = nuevoNodo
        }
        this.cantidad++
    }

    agregarEnCola(valor) {
        const nuevoNodo = new Nodo(valor, null, this.cola)

        if (this.cola) {
            nuevoNodo.anterior = this.cola
            this.cola.siguiente = nuevoNodo
            this.cola = nuevoNodo
        } else {
            this.cola = nuevoNodo
            this.cabeza = nuevoNodo
        }
        this.cantidad++
    }

    insertarEn(valor, indice) {
        if (indice < 0 || indice > this.cantidad) {
            return null
        }

        const nuevoNodo = new Nodo(valor, null, null)
        let actual = this.cabeza
        let anterior

        if (indice === 0) {
            nuevoNodo.siguiente = actual
            actual.anterior = nuevoNodo
            this.cabeza = nuevoNodo
        } else {
            for (let i = 0; i < indice; i++) {
                anterior = actual
                actual = actual.siguiente
            }
            nuevoNodo.siguiente = actual
            nuevoNodo.anterior = anterior
            actual.anterior = nuevoNodo
            anterior.siguiente = nuevoNodo
        }
        this.cantidad++
    }

    borrarCabeza() {
        if (!this.cabeza) {
            return null
        }

        const valorDevuelto = this.cabeza.valor

        if (this.cabeza === this.cola) {
            this.cabeza = null
            this.cola = null
        } else {
            this.cabeza = this.cabeza.siguiente
            this.cabeza.anterior = null
        }
        this.cantidad--
        return valorDevuelto
    }

    borrarCola() {
        if (!this.cola) {
            return null
        }

        const valorDevuelto = this.cola.valor

        if (this.cabeza === this.cola) {
            this.cabeza = null
            this.cola = null
        } else {
            this.cola = this.cola.anterior
            this.cola.siguiente = null
        }
        this.cantidad--
        return valorDevuelto
    }

    borrarEn(valor) {
        let actual = this.cabeza
        let anterior = null

        while(actual !== null) {
            if (actual.valor === valor) {
                if (!anterior) {
                    return this.borrarCabeza()
                }else if (!actual.siguiente) {
                    return this.borrarCola()
                } else {
                    anterior.siguiente = actual.siguiente
                    actual.siguiente.anterior = anterior
                }
                this.cantidad--
                return actual.valor
            }
            anterior = actual
            actual = actual.siguiente
        }
        return null
    }

    obtenerCantidad() {
        return this.cantidad
    }

    vacia() {
        return this.cantidad === 0
    }
}

const dobleLista = new listaDoble()
dobleLista.agregarEnCola(3)
dobleLista.agregarEnCabeza(4)
dobleLista.agregarEnCabeza(7)
dobleLista.insertarEn(10, 2)
console.log(dobleLista.imprimir())
console.log(dobleLista.imprimirReverso())
console.log(dobleLista.borrarCabeza())
console.log(dobleLista.borrarCola())
console.log(dobleLista.borrarEn(4))
console.log(dobleLista.obtenerCantidad())
console.log(dobleLista.vacia())
console.log(dobleLista.imprimir())
console.log(dobleLista.imprimirReverso())

const ListaDoble = () =>{
    return (
        <div id={"contenido"}>
            <div id={"contol"}>
                <table id={"controles"}>
                    <td>
                        <input type={"text"} size={"10"}/>
                    </td>
                    <td>
                        <input type={"Button"}value={"Agregar"}/>
                    </td>
                    <td>
                        <input type={"Button"}value={"Eliminar"}/>
                    </td>
                    <td>
                        <input type={"Button"}value={"Buscar"}/>
                    </td>
                </table>

            </div>
            <div>
                <h3>Aquí va la lista doble</h3>
            </div>
        </div>
    );
}

export default ListaDoble;
