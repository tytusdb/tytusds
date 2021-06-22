import React from "react";

class pila {
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



const Pila = () =>{
    const newpila = new pila()
console.log(newpila.vacia())
newpila.push('Plato #1')
newpila.push('Plato #2')
newpila.push('Plato #3')
console.log(newpila.pop())
console.log(newpila.peek())
console.log(newpila.obtenerCantidad())
console.log(newpila.vacia())
console.log(newpila.imprimir())
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
