import { nodo } from './nodo'
import { Draw } from '../Draw/Draw'
export class pila {
    private primero: nodo
   // private ultimo: nodo
    private draw: Draw
    private id: number;

    constructor() {
        this.primero = null
        //this.ultimo = null
        this.id = 0;
        this.draw = new Draw()
    }

    async push(dato: number|string, svg, dibujo, duracion) {
        let temp: nodo = new nodo(dato, this.id)
        if (this.primero == null) {
            this.primero = temp
           // this.ultimo = temp

            let div: any = this.draw.crearNodo(dato, this.id)
            dibujo.appendChild(div)
            this.id++
            await this.draw.animateNode("nodo" + temp.getId(), "zoomIn", duracion)
            return temp.getId();
        }


        temp.setId(this.id)
        this.id++

        let div: any = this.draw.crearNodo(dato, temp.getId())
        dibujo.insertBefore(div, dibujo.firstChild);
        await this.draw.animateNode("nodo" + temp.getId(), "zoomIn", duracion)


        let tempPrimero = this.primero
        temp.setSiguiente(tempPrimero)
        //this.ultimo.setSiguiente(temp)
        this.primero = temp

        return temp.getId();
    }

    search(dato) {
        let temp = this.primero
        if (temp === null) return null
        do {
            if (temp.getDato() === dato) return temp;
            temp = temp.getSiguiente()
            if (temp === null) break;
        } while (temp != this.primero)

        return null
    }

    async searchAnimation(dato, duration) {
        let temp = this.primero
        let i = 0
        if (temp === null) return null
        do {
            await this.draw.animateNode("nodo" + temp.getId(), 'bounceIn', duration);
            if (temp.getDato() === dato) return { nodo: temp, index: i };
            temp = temp.getSiguiente()
            i++;
            if (temp === null) break;
        } while (temp != this.primero)

        return null
    }

    getPrimero() {
        return this.primero
    }

   /* getUltimo() {
        return this.ultimo
    }*/

    generarJSON() {
        let data = {
            categoria: "Estructura Lineal",
            nombre: "Pila",
            valores: []
        }

        let temp = this.primero

        do {
            data.valores.push(temp.getDato())
            temp = temp.getSiguiente()
            if (temp === null) break;
        } while (temp != this.primero)

        return JSON.stringify(data)
    }
}