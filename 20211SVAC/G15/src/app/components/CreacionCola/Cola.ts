import { NullTemplateVisitor } from "@angular/compiler";
import { toInteger } from "@ng-bootstrap/ng-bootstrap/util/util";
import { NodoCola } from "./NodoCola";

export class Cola {

    raiz: NodoCola;
    fondo: NodoCola;
    identificador: number;

    constructor() {
        this.raiz = null;
        this.fondo = null;
        this.identificador = 0;
    }

    empty() {
        if (this.raiz === null) {
            return true
        } else {
            return false
        }
    }

    crearNodo(dato: any, identificador: number) {
        let div = document.createElement('div')
        div.className = "node animate__animated ml-5"
        div.id = "nodo" + identificador
        div.textContent = dato
        return div
    }

    async add(dato: number | string, svg, dibujo, duracion) {
        let NewNodo: NodoCola = new NodoCola(dato, this.identificador) //creamos un nuevo nodo
        if (this.raiz == null) {
            this.raiz = NewNodo
            this.fondo = NewNodo

            let div: any = this.crearNodo(dato, this.identificador)
            dibujo.appendChild(div) //nuevo nodo 
            this.identificador++ //aumentamos posicion
            await this.animateNode("nodo" + NewNodo.identificador, "zoomIn", duracion)
            return NewNodo.identificador
        } 

        NewNodo.identificador = this.identificador
        this.identificador++

        let div: any = this.crearNodo(dato, NewNodo.identificador)
        dibujo.appendChild(div) //nuevo nodo 
        await this.animateNode("nodo" + NewNodo.identificador, "zoomIn", duracion)

        this.fondo.sigueinte = NewNodo
        // NewNodo.dato = dato
        // NewNodo.sigueinte = null
        this.fondo = NewNodo
        return NewNodo.identificador
    }

    animateNode(element, animation, duration) {
        let prefix = 'animate__'
        return new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`;
            const node = document.getElementById(element);
            node.classList.add(animationName)
            node.style.setProperty('--animate-duration', duration);

            function handleAnimationEnd(event) {
                event.stopPropagation();
                node.classList.remove(animationName);
                resolve('Animation ended');
            }

            node.addEventListener('animationend', handleAnimationEnd, { once: true });

            //resolve('Animation ended');
        });
    }

    async buscarAnimacion(dato: string | number, duration) {
        let aux = this.raiz
        let i = 0
        if (aux === null) return null
        do {
            await this.animateNode("nodo" + aux.identificador, 'bounceIn', duration);
            if (aux.dato === dato) return { Nodo: aux, index: i };
            aux = aux.sigueinte
            i++;
            if (aux === null) break;
        } while (aux != this.raiz)

        return null
    }

    removerElemento(identificador) {
        try {
            document.getElementById(identificador).remove()
        } catch (e) { }

    }

    async delete(duracion, svg) {
        let aux = this.raiz
        if (this.raiz != null) {
            await this.animateNode("nodo" + aux.identificador, 'zoomOut', duracion)
            this.removerElemento("nodo" + aux.identificador)
            this.raiz = this.raiz.sigueinte
            aux.sigueinte = null
        }
        if (this.raiz === null) {
            this.fondo = null
            return -1
        }
        let id1 = this.raiz.identificador;
        let id2 = this.raiz.sigueinte.identificador
        this.removerElemento("arrow" + id1 + "-" + id2)
        this.removerElemento("arrow" + id2 + "-" + id1)
        return 1
    }

    search(dato: number | string) {
        // if (this.empty) {
        //     return null
        // } else {
        //     return this.raiz.dato
        // }
        let aux = this.raiz
        if (aux === null) return null
        do {
            if (aux.dato === dato) return aux
            aux = aux.sigueinte
            if (aux === null) break
        } while (aux != this.raiz)
        return null
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