import React from "react";

class Nodo {
    constructor(valor, prioridad) {
        this.valor = valor
        this.prioridad = prioridad
    }
}

class ColaPrioridad {
    constructor() {
        this.valores = []
    }

    enqueue(valor, prioridad) {
        let nuevoNodo = new Nodo(valor, prioridad)
        this.valor.push(nuevoNodo)
        let indice = this.valores.length -1
        const elemento = this.valores[indice]

        while (indice > 0) {
            let padreIndice = Math.floor((indice - 1)/2)
            const padre = this.valores[parentesisIndice]

            if (elemento.priority >= padre.priority) break
            this.valores[padreIndice] = elemento
            this.valores[indice] = padre
            indice = padreIndice
        }
        return this.valores
    }

    dequeue() {
        const min = this.valores[0]
        const final = this.valores.pop()
        if (this.valores.length > 0) {
            this.valores[0] = final
            let indice = 0
            const longitud = this.valores.length
            const elemento = this.valores[0]

            while (true) {
                let indiceIzquierdo = 2 * indice + 1
                let indiceDerecho = 2 * indice + 2
                let hijoIzquierdo, hijoDerecho
                let cambiar = null

                if (hijoIzquierdo < longitud) {
                    hijoIzquierdo = this.valores[hijoIzquierdo]
                    if (hijoIzquierdo.priority < elemento.priority) {
                        cambiar = hijoIzquierdo
                    }
                }

                if (hijoDerecho < longitud) {
                    hijoDerecho = this.valores[hijoDerecho]
                    if ((cambiar === null && hijoDerecho.priority < elemento.priority) || (cambiar != null && hijoDerecho.priority < hijoIzquierdo.priority)) {
                        cambiar = hijoDerecho
                    }
                }

                if (cambiar === null) break
                this.valores[indice] = this.valores[cambiar]
                this.valores[cambiar] = elemento
                indice = cambiar
            }
        }
        return min
    }
}

const ColaPriori = () =>{
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
                <h3>Aquí va la cola de prioridad</h3>
            </div>
        </div>

    );
}

export default ColaPriori;
