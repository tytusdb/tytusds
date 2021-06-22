import React from "react";

class Nodo {
    constructor(valor, siguiente, anterior) {
        this.valor = valor
        this.siguiente = siguiente
        this.anterior = anterior
    }
}

class ListaCDoble {
    constructor() {
        this.cabeza = null
        this.cola = null
        this.cantidad = 0
    }

    agregarEnCabeza(valor) {
        const nuevoNodo = new Nodo(valor)
        if (this.cabeza === null) {
            this.cabeza = this.cola = nuevoNodo
            this.cabeza.anterior = null
            this.cola.siguiente = null
        } else {
            this.cola.siguiente = nuevoNodo
            nuevoNodo.anterior = this.cola
            this.cola = nuevoNodo
            this.cola.siguiente = null
        }
        this.cantidad++
        return this
    }

    agregarEnCola(valor) {
        const nuevoNodo = new Nodo(valor)
        if (this.cabeza === null) {
            this.cabeza = this.cola = nuevoNodo
            this.cabeza.anterior = null
        } else {
          this.cola.anterior = nuevoNodo
          nuevoNodo.siguiente = this.cabeza
          this.cabeza = nuevoNodo
          this.cola.anterior = null
        }
        this.cantidad++
        return this
    }

    obtenerPosicion(pos) {
        let i = 0, nodoActual = this.cabeza
        while (nodoActual) {
            if (i === pos) return nodoActual
            nodoActual = nodoActual.siguiente
            i++
        }
        return null
    }

    insertar(indice, valor) {
        const posicion = this.obtenerPosicion(indice), nuevoNodo = new Nodo(valor)
        nuevoNodo.siguiente = posicion.siguiente
        const nodoSiguiente = posicion.siguiente
        nodoSiguiente.anterior = nuevoNodo
        nuevoNodo.anterior = posicion
        posicion.siguiente = nuevoNodo
        this.cantidad++
        return this
    }

    eliminar(indice) {
        let contador = 1, nodoActual = this.cabeza
        while (contador != indice) {
            nodoActual = nodoActual.siguiente
            contador++
        }
        const nodoTemporal = nodoActual.siguiente
        nodoActual.siguiente = nodoTemporal.siguiente
        const nodoSiguiente = nodoTemporal.siguiente
        nodoSiguiente.anterior = nodoActual
        nodoTemporal.siguiente = null
        nodoTemporal.anterior = null
        this.cantidad--
    }
}

const ListaCicularDoble = () =>{
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
                <h3>Aquí va la lista circular doble</h3>
            </div>
        </div>


    );
}

export default ListaCicularDoble;
