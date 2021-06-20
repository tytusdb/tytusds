import React from "react";

class Pila {
    constructor() {
        this.objetos = {}
        this.arriba = 0
    }

    push(valor) {
        this.arriba++
        this.objetos[this.arriba] = valor
    }

    pop() {
        let borrarValor

        if (this.arriba) {
            borrarValor = this.objetos[this.arriba]
            delete this.objetos[this.arriba]
            this.arriba--
            return borrarValor
        }
    }

    obtenerCantidad() {
        return this.arriba
    }

    vacia() {
        return this.obtenerCantidad() === 0
    }

    peek() {
        if (this.vacia()) {
            return null
        }

        return this.objetos[this.arriba]
    }

    imprimir() {
        let resultado = ''
        for (let i = this.arriba; i > 0; i--) {
            resultado += this.objetos[i] + ' '
        }
        return resultado
    }
}

const pila = new Pila()
console.log(pila.vacia())
pila.push('Plato #1')
pila.push('Plato #2')
pila.push('Plato #3')
console.log(pila.pop())
console.log(pila.peek())
console.log(pila.obtenerCantidad())
console.log(pila.vacia())
console.log(pila.imprimir())

const Pila = () =>{
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
                <h3>Aquí va la Pila</h3>
            </div>
        </div>

    );
}

export default Pila;
