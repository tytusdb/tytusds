import React from "react";

class cola{
    constructor() {
        this.valores = {}
        this.inicio = 0
        this.final = 0
    }

    enqueue(valor) {
        this.valores[this.final] = valor
        this.final++
    }

    dequeue() {
        if (this.inicio === this.final) {
            return null
        }

        delete this.valores[this.inicio]
        this.inicio++
        return this.valores[this.inicio]
    }
}


const Cola = () =>{
const newcola = new cola()
newcola.enqueue(1)
newcola.enqueue(2)
newcola.enqueue(3)
newcola.enqueue(4)
console.log(newcola.dequeue())
console.log(newcola)

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
                <h3>Aquí va la Cola</h3>
            </div>
        </div>


    );
}

export default Cola;
