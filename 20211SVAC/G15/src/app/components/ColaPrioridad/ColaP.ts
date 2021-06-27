import { analyzeNgModules, NullTemplateVisitor } from "@angular/compiler";
import { toInteger } from "@ng-bootstrap/ng-bootstrap/util/util";
import { NodoP } from "./NodoP"

export class ColaP {

  
    raiz: NodoP;
    fondo: NodoP;
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

    crearNodo(dato: any, prioridad:number, identificador: number) {
        let div = document.createElement('div')
        div.className = "node animate__animated ml-5"
        div.id = "nodo" + identificador
        div.textContent = dato
        return div
    }

    async insertarInicio(dato, prioridad, dibujo, duracion) {
        let NewNodo: NodoP = new NodoP(dato, prioridad, this.identificador);
        if (this.raiz === null) {
            this.raiz = NewNodo;
            this.fondo = NewNodo;
            let div: any = this.crearNodo(dato,prioridad, this.identificador)
            dibujo.appendChild(div)
            this.identificador++
            await this.animateNode("nodo" + NewNodo.identificador, "zoomIn", duracion)
            return NewNodo.identificador;

        }

        NewNodo.identificador = this.identificador
        this.identificador++

        if (this.raiz.sigueinte !== this.fondo && this.raiz.sigueinte !== null) {
            this.removerElemento("arrowprimero-ultimo")
            this.removerElemento("arrowultimo-primero")
        }

        let div: any = this.crearNodo(dato, prioridad, NewNodo.identificador)
        dibujo.insertBefore(div, dibujo.firstChild);
        await this.animateNode("nodo" + NewNodo.identificador, "zoomIn", duracion)

        let aux = this.raiz
        NewNodo.sigueinte= this.raiz
        aux.anterior = NewNodo
        this.fondo.sigueinte = NewNodo
        NewNodo.anterior = this.fondo
        this.raiz = NewNodo
        return NewNodo.identificador;
    }

    async add(dato: number | string, prioridad: number,  dibujo, duracion) {
        let NewNodo: NodoP = new NodoP(dato,prioridad, this.identificador) //creamos un nuevo nodo
        if (this.raiz == null) {
            this.raiz = NewNodo
            this.fondo = NewNodo

            let div: any = this.crearNodo(dato, prioridad, this.identificador)
            dibujo.appendChild(div) //nuevo nodo 
            this.identificador++ //aumentamos posicion
            await this.animateNode("nodo" + NewNodo.identificador, "zoomIn", duracion)
            return NewNodo.identificador
        } 

        NewNodo.identificador = this.identificador
        this.identificador++

        if (this.raiz.sigueinte !== this.fondo && this.raiz.sigueinte !== null) {
            this.removerElemento("arrowprimero-ultimo")
            this.removerElemento("arrowultimo-primero")
        }

        if (Number(prioridad) > Number(this.raiz.prioridad)) {
            this.insertarInicio(dato, prioridad,dibujo,duracion)
        } else {
            let index =0 
            let aux= this.raiz
            while (aux.sigueinte!=null) {
                if (Number(prioridad) <= Number(aux.prioridad) && Number(aux.sigueinte.prioridad) <= Number(prioridad)) {
                    let id1 = aux.identificador;
                    let id2 = aux.sigueinte.identificador;
                    NewNodo.sigueinte=aux.sigueinte;
                    NewNodo.anterior=aux;
                    aux.sigueinte.anterior=NewNodo;
                    aux.sigueinte = NewNodo;

                    this.removerElemento("arrow" + id1 + "-" + id2)
                    this.removerElemento("arrow" + id2 + "-" + id1)

                   
                    let div: any = this.crearNodo(dato,prioridad, NewNodo.identificador)
                    dibujo.insertBefore(div, dibujo.children[index + 1]);
                    await this.animateNode("nodo" + NewNodo.identificador, "zoomIn", duracion)

                    return;
                }
                index++
                aux = aux.sigueinte
                if (aux === this.fondo) break
                    if(aux=== null)break
            }
            this.insertarFinal(dato,prioridad,dibujo,duracion)
                return 1
        }
    }

    async insertarFinal(dato: number | string, prioridad: number, dibujo, duracion) {
        let NewNodo: NodoP = new NodoP(dato, prioridad,this.identificador) //creamos un nuevo nodo
        if (this.raiz == null) {
            this.raiz = NewNodo
            this.fondo = NewNodo

            let div: any = this.crearNodo(dato,prioridad, this.identificador)
            dibujo.appendChild(div) //nuevo nodo 
            this.identificador++ //aumentamos posicion
            await this.animateNode("nodo" + NewNodo.identificador, "zoomIn", duracion)
            return NewNodo.identificador
        } 

        NewNodo.identificador = this.identificador
        this.identificador++

        if (this.raiz.sigueinte !== this.fondo && this.raiz.sigueinte !== null) {
            this.removerElemento("arrowprimero-ultimo")
            this.removerElemento("arrowultimo-primero")
        }

        let div: any = this.crearNodo(dato,prioridad, NewNodo.identificador)
        dibujo.appendChild(div) //nuevo nodo 
        await this.animateNode("nodo" + NewNodo.identificador, "zoomIn", duracion)

        let div2 = document.getElementById("nodo" + this.fondo.identificador)

        let aux = this.fondo;
        aux.sigueinte = NewNodo;
        NewNodo.anterior = aux;
        NewNodo.sigueinte = this.raiz
        this.raiz.anterior = NewNodo
        this.fondo = NewNodo
        //this.crearUltimos(svg)
        return NewNodo.identificador;
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

        });
    }

    async buscarAnimacion(dato: string | number, duration) {
        let aux = this.raiz
        let i = 0
        if (aux === null) return null
        do {
            await this.animateNode("nodo" + aux.identificador, 'bounceIn', duration);
            if (aux.dato === dato) return { NodoP: aux, index: i };
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
        if (aux === null) return -1
        if (this.raiz != null) {
            await this.animateNode("nodo" + aux.identificador, 'zoomOut', duracion)
            this.removerElemento("nodo" + aux.identificador)

            if (aux.sigueinte === null) {
                this.raiz = null
                this.fondo = null
                return 1;
            }

            this.fondo.sigueinte = aux.sigueinte
            aux.sigueinte.anterior = this.fondo

            let id1 = this.raiz.identificador;
            let id2 = this.raiz.sigueinte.identificador

            this.removerElemento("arrow" + id1 + "-" + id2)
            this.removerElemento("arrow" + id2 + "-" + id1)

            this.raiz = aux.sigueinte;
            return 1
        }
        do {
            if (aux.dato != null) {
                let anterior = aux.anterior
                let siguiente = aux.sigueinte
                let id1 = aux.identificador
                let id2 = anterior.identificador
                let id3 = siguiente.identificador

                await this.animateNode("nodo" + id1, 'zoomOut', duracion)
                this.removerElemento("nodo" + id1)
                anterior.sigueinte = aux.sigueinte
                aux.sigueinte.anterior = anterior

                this.removerElemento("arrow" + id1 + "-" + id2)
                this.removerElemento("arrow" + id2 + "-" + id1)


                this.removerElemento("arrow" + id1 + "-" + id3)
                this.removerElemento("arrow" + id3 + "-" + id1)
                //this.corregirPaths(svg, anterior)

                return 1
            }
            aux = aux.sigueinte;
            if (aux === this.fondo) break;
            if (aux === null) break;
        } while (aux != this.fondo)
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

    mostrar() {
        let aux = this.raiz
        console.log("LISTADOS DE TODOS LOS ELEMENTOS ")
        while (aux != null) {
            console.log(aux.dato + "-")
            aux = aux.sigueinte
        }
        console.log("")
    }

    generarJSON() {
        let data = {
            categoria: "Estructura Lineal",
            nombre: "Cola Prioridad",
            valores:[]
        }

        let temp = this.raiz

        do {
        
            data.valores.push({"valor":temp.dato,"prioridad":temp.prioridad})
            
            temp = temp.sigueinte
            if (temp === null) break;
        } while (temp != this.raiz)

        return JSON.stringify(data)
    }

    

    
}
