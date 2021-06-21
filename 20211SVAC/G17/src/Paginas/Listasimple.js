import React from "react";

class Nodo{
    constructor(valor, siguiente){
        this.valor = valor
        this.siguiente = siguiente
    }
}

class ListaSimple{
    constructor(){
        this.cabeza = null
        this.cantidad = 0
    }

    agregar(valor) {
        const nuevoNodo = new Nodo(valor, null)
        if (!this.cabeza) {
            this.cabeza = nuevoNodo
        } else {
            let actual = this.cabeza
            while (actual.siguiente) {
                actual = actual.siguiente
            }
            actual.siguiente = nuevoNodo
        }
        this.cantidad++
    }

    insertarEn(valor, indice) {
        if (indice < 0 || indice > this.cantidad) {
            return null
        }

        const nuevoNodo = new Nodo(valor)
        let actual = this.cabeza
        let anterior

        if (indice === 0) {
            nuevoNodo.siguiente = actual
            this.cabeza = nuevoNodo
        }else {
          for (let i = 0; i < indice; i++) {
              anterior = actual
              actual = actual.siguiente
          }

          nuevoNodo.siguiente = actual
          anterior.siguiente = nuevoNodo
        }
        this.cantidad++
    }

    imprimir() {
        if (!this.cantidad){
            return null
        }

        let actual = this.cabeza
        let resultado = ''
        while (actual) {
            resultado += actual.valor += ' => '
            actual = actual.siguiente
        }
        resultado += 'X'
        return resultado
    }

    borrar(valor) {
        let actual = this.cabeza
        let anterior = null

        while (actual != null) {
            if (actual.valor === valor) {
                if (!anterior) {
                    this.cabeza = actual.siguiente
                } else {
                    anterior.siguiente = actual.siguiente
                }
                this.cantidad--
                return actual.valor
            }
            anterior = actual
            actual = actual.siguiente
        }
        return null
    }

    borrarDe(indice) {
        if (indice < 0 || indice > this.cantidad) {
            return null
        }

        let actual = this.cabeza
        let anterior = null

        if (indice === 0) {
            this.cabeza = actual.siguiente
        } else {
            for (let i = 0; i < indice; i++) {
                anterior = actual
                actual = actual.siguiente
            }
            anterior.siguiente = actual.siguiente
        }
        this.cantidad--
        return actual.valor
    }

    vacia() {
        return this.cantidad === 0
    }

    obtenerCantidad() {
        return this.cantidad
    }
}

const listaSimple = new ListaSimple()
listaSimple.agregar(12)
listaSimple.insertarEn(10, 1)
listaSimple.agregar(9)
listaSimple.agregar(50)
listaSimple.borrarDe(1)
listaSimple.borrar(50)
console.log(listaSimple.vacia())
console.log(listaSimple.imprimir())
console.log(listaSimple.obtenerCantidad())

const ListaSimple = () =>{

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
            <h3>Aquí va la lista simple</h3>
        </div>
    </div>

    );
}

export default ListaSimple;
