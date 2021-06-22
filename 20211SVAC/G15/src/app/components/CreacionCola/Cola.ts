import { NullTemplateVisitor } from "@angular/compiler";
import { toInteger } from "@ng-bootstrap/ng-bootstrap/util/util";
import { NodoCola } from "./NodoCola";
import { Draw } from "src/app/helpers/Draw/Draw";
export class Cola {

    raiz: NodoCola;
    fondo: NodoCola;
    identificador: number;
    draw: Draw

    constructor() {
        this.raiz = null;
        this.fondo = null;
        this.identificador = 0;
        this.draw = new Draw()
    }

    empty() {
        if (this.raiz === null) {
            return true
        } else {
            return false
        }
    }

    async add(dato: number | string, dibujo, duracion) {
        let NewNodo: NodoCola = new NodoCola(dato, this.identificador) //creamos un nuevo nodo
        if (this.raiz == null) {
            this.raiz = NewNodo
            this.fondo = NewNodo

            let div: any = this.draw.crearNodo(dato, this.identificador)
            dibujo.appendChild(div) //nuevo nodo 
            this.identificador++ //aumentamos posicion
            await this.draw.animateNode("nodo" + NewNodo.identificador, "zoomIn", duracion)
            return NewNodo.identificador
        }

        NewNodo.identificador = this.identificador
        this.identificador++

        let div: any = this.draw.crearNodo(dato, NewNodo.identificador)
        dibujo.appendChild(div) //nuevo nodo 
        await this.draw.animateNode("nodo" + NewNodo.identificador, "zoomIn", duracion)

        this.fondo.sigueinte = NewNodo
        this.fondo = NewNodo
        return NewNodo.identificador
    }

    async buscarAnimacion(dato, duration) {
        let aux = this.raiz
        let i = 0
        if (aux === null) return null
        do {
            await this.draw.animateNode("nodo" + aux.identificador, 'bounceIn', duration);
            if (!isNaN(dato)) {
                if (Number(aux.dato) === Number(dato)) return { NodoCola: aux, index: i };
                aux = aux.sigueinte
                i++
            } else {
                if (aux.dato === dato) return { NodoCola: aux, index: i };
                aux = aux.sigueinte
                i++;
            }
            if (aux === null) break;
        } while (aux != this.raiz)

        return null
    }

    async delete(duracion, svg) {
        let aux = this.raiz
        if (this.raiz != null) {
            await this.draw.animateNode("nodo" + aux.identificador, 'zoomOut', duracion)
            this.draw.removerElemento("nodo" + aux.identificador)
            this.raiz = this.raiz.sigueinte
            aux.sigueinte = null
        }
        if (this.raiz === null) {
            this.fondo = null
            return -1
        }
        let id1 = this.raiz.identificador;
        let id2 = this.raiz.sigueinte.identificador
        this.draw.removerElemento("arrow" + id1 + "-" + id2)
        this.draw.removerElemento("arrow" + id2 + "-" + id1)
        return 1
    }

    search(dato: number | string) {
        let aux = this.raiz
        if (aux === null) return null
        do {
            if (aux.dato === dato) return aux
            aux = aux.sigueinte
            if (aux === null) break
        } while (aux != this.raiz)
        return null
    }

    generarJSON() {
        let data = {
            categoria: "Estructura Lineal",
            nombre: "Cola",
            valores: []
        }

        let temp = this.raiz

        do {
            data.valores.push(temp.dato)
            temp = temp.sigueinte
            if (temp === null) break;
        } while (temp != this.raiz)

        return JSON.stringify(data)
    }

    mostrar() {
        let aux = this.raiz
        console.log("LISTADOS DE TODOS LOS ELEMENTOS ")
        while (aux != null) {
            console.log(aux.dato + "-")
            aux = aux.sigueinte
        }
        console.log("")
    }

}