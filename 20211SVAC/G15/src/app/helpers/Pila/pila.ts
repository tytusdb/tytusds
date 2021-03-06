import { nodo } from './nodo'
import { Draw } from '../Draw/Draw'
export class pila {
    private primero: nodo
    private draw: Draw
    private id: number;

    constructor() {
        this.primero = null
        this.id = 0;
        this.draw = new Draw()
    }

    async push(dato: number|string, dibujo, duracion) {
        let temp: nodo = new nodo(dato, this.id)
        if (this.primero == null) {
            this.primero = temp
           
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

    async pop(duracion) {
        let temp = this.primero
        if (temp === null) return -1
       
        await this.draw.animateNode("nodo" + temp.getId(), 'zoomOut', duracion)
        this.draw.removerElemento("nodo" + temp.getId())
            
        if (temp.getSiguiente() === null) { //caso de que no haya mas datos 
            this.primero = null
            return 1;
        }

        this.primero = temp.getSiguiente()
        return 1;
        

    }

    async searchAnimation(dato, duration) {
        console.log(this.primero)
        let temp = this.primero
        let i = 0
        if (temp === null) return null
        do {
            await this.draw.animateNode("nodo" + temp.getId(), 'bounceIn', duration);
            console.log(temp.getDato())
            if (!isNaN(dato)) {
                if (Number(temp.getDato()) === Number(dato)) return { nodo: temp, index: i };
                temp = temp.getSiguiente()
                i++;
            }else{
                if (temp.getDato() === dato) return { nodo: temp, index: i };
                temp = temp.getSiguiente()
                i++;
            }

            
            if (temp === null) break;
        } while (temp != this.primero)

        return null
    }

    getPrimero() {
        return this.primero
    }

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