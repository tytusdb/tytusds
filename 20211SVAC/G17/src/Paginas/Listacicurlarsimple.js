import React from "react";

class Nodo{
    constructor(valor, siguiente){
        this.valor = valor
        this.siguiente = siguiente
    }
}

class ListaCSimple {
    constructor() {
        this.cabeza = null
        this.cantidad = 0
    }

    agregar(valor) {
        let nuevoNodo = new Nodo(valor, null)
        let actual = this.cabeza
        if (actual === undefined){
            this.cabeza = nuevoNodo
            nuevoNodo.siguiente = this.cabeza
        } else {
            while (actual.siguiente != null) {
                actual = actual.siguiente
            }
            actual.siguiente = nuevoNodo
            nuevoNodo.siguiente = this.cabeza
        }
        this.cantidad++
        return this
    }

    obtenerElemento(indice) {
        let nuevoNodo = this.cabeza
        if (indice >= 0 && indice < this.cantidad) {
            for (let i = 0; i < indice; i++) {
                nuevoNodo = nuevoNodo.siguiente
            }
            return nuevoNodo
        }
        return undefined
    }

    insertar(indice, valor) {
        if (indice >= 0 && indice <= this.cantidad) {
            const nuevoNodo = new Nodo(valor)
            let actual = this.cabeza
            if (indice === 0 ) {
                if (this.cabeza === undefined) {
                    this.cabeza = nuevoNodo
                    nuevoNodo.siguiente = this.cabeza
                } else {
                    nuevoNodo.siguiente = actual
                    this.cabeza = nuevoNodo
                }
            } else if (indice === this.cantidad) {
                const anterior = this.obtenerElemento(indice - 1)
                anterior.siguiente = nuevoNodo
                nuevoNodo.siguiente = actual
            } else {
                const anterior = this.obtenerElemento(indice - 1)
                actual = anterior.siguiente
                anterior.siguiente = nuevoNodo
                nuevoNodo.siguiente = actual
            }
            this.cantidad++
            return this
        }
        return undefined
    }

    vacia() {
        return this.cantidad === 0
    }

    removerIndice(indice) {
        if (indice >= 0 && indice < this.cantidad) {
            if (this.vacia) {
                return undefined
            }

            let actual = this.cabeza
            if (indice === 0) {
                this.cabeza = actual.siguiente
            } else if (indice === this.cantidad-1) {
                const anterior = this.obtenerElemento(indice - 1)
                actual = anterior.siguiente
                anterior.siguiente = actual.siguiente
            } else {
                const anterior = this.obtenerElemento(indice - 1)
                actual = anterior.siguiente
                anterior.siguiente = actual.siguiente
            }
            this.cabeza--
            return actual.valor
        }
        return undefined
    }
}

const ListaCircularSimple = () =>{
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
                <h3>Aquí va la lista circular simple</h3>
            </div>
        </div>



    );
}

export default ListaCircularSimple;
