import { NodoSimpleCircular } from './NodoSimpleCircular'

import { Draw } from '../Draw/Draw'
export class ListaSimpleCircular {
    private primero: NodoSimpleCircular
    private ultimo: NodoSimpleCircular
    private draw: Draw
    private id: number;

    constructor() {
        this.primero = null
        this.ultimo = null
        this.id = 0;
        this.draw = new Draw()
    }

    async add(numero: number|string, svg, dibujo, duracion) {
        let temp: NodoSimpleCircular = new NodoSimpleCircular(numero, this.id)
        if (this.primero == null) {
            this.primero = temp
            this.ultimo = temp

            let div: any = this.draw.crearNodo(numero, this.id)
            dibujo.appendChild(div)
            this.id++
            await this.draw.animateNode("nodo" + temp.getId(), "zoomIn", duracion)
            return temp.getId();
        }


        temp.setId(this.id)
        this.id++

        if (this.primero.getSiguiente() !== this.ultimo && this.primero.getSiguiente() !== null) {
            this.draw.removerElemento("arrowprimero-ultimo")
        }

        let div: any = this.draw.crearNodo(numero, temp.getId())
        dibujo.appendChild(div)
        await this.draw.animateNode("nodo" + temp.getId(), "zoomIn", duracion)

        let div2 = document.getElementById("nodo" + this.ultimo.getId())
        let posiciones = this.draw.posicionesLeft(div, div2)
        posiciones.color = 'black'
        this.draw.crearPath(this.ultimo.getId() + "-" + temp.getId(), svg, posiciones)


        let tempUltimo = this.ultimo
        tempUltimo.setSiguiente(temp)
        temp.setSiguiente(this.primero)
        this.ultimo = temp


        this.crearUltimos(svg)

        return temp.getId();
    }


    async addAlInicio(numero: number|string, svg, dibujo, duracion) {
        let temp: NodoSimpleCircular = new NodoSimpleCircular(numero, this.id)
        if (this.primero == null) {
            this.primero = temp
            this.ultimo = temp

            let div: any = this.draw.crearNodo(numero, this.id)
            dibujo.appendChild(div)
            this.id++
            await this.draw.animateNode("nodo" + temp.getId(), "zoomIn", duracion)
            return temp.getId();
        }


        temp.setId(this.id)
        this.id++

        if (this.primero.getSiguiente() !== this.ultimo && this.primero.getSiguiente() !== null) {
            this.draw.removerElemento("arrowultimo-primero")
        }

        let div: any = this.draw.crearNodo(numero, temp.getId())
        dibujo.insertBefore(div, dibujo.firstChild);
        await this.draw.animateNode("nodo" + temp.getId(), "zoomIn", duracion)


        let tempPrimero = this.primero
        temp.setSiguiente(tempPrimero)
        this.ultimo.setSiguiente(temp)
        this.primero = temp
        this.corregirPaths(svg, this.primero)

        return temp.getId();
    }

    async addOrdenado(numero: number|string, svg, dibujo, duracion) {

        // Ingresar si esta vacia
        if (this.primero == null) {
            let temp: NodoSimpleCircular = new NodoSimpleCircular(numero, this.id)
            this.primero = temp
            this.ultimo = temp

            let div: any = this.draw.crearNodo(numero, this.id)
            dibujo.appendChild(div)
            this.id++
            await this.draw.animateNode("nodo" + temp.getId(), "zoomIn", duracion)
            return temp.getId();
        }


        if (this.primero.getSiguiente() !== this.ultimo && this.primero.getSiguiente() !== null) {
            this.draw.removerElemento("arrowprimero-ultimo")
        }

        //Ingresar si solo hay uno
        if (this.primero.getSiguiente() === null) {
            if (numero <= this.primero.getNumero()) await this.addAlInicio(numero, svg, dibujo, duracion)
            else await this.add(numero, svg, dibujo, duracion)
            return 1
        }
        //Ingresar al inicio si es menor
        if (this.primero.getNumero() > numero) {
            await this.addAlInicio(numero, svg, dibujo, duracion)
            return 1
        }




        // Si es mayor al primero pero menor al siguiente
        if (numero >= this.primero.getNumero() && numero < this.primero.getSiguiente().getNumero()) {
            let temp: NodoSimpleCircular = new NodoSimpleCircular(numero, this.id)
            temp.setId(this.id)
            this.id++

            let id1 = this.primero.getId();
            let id2 = this.primero.getSiguiente().getId()

            let tempPrimero = this.primero

            temp.setSiguiente(tempPrimero.getSiguiente())
            tempPrimero.setSiguiente(temp)

            this.draw.removerElemento("arrow" + id1 + "-" + id2)

            let div: any = this.draw.crearNodo(numero, temp.getId())
            dibujo.insertBefore(div, dibujo.children[1]);
            await this.draw.animateNode("nodo" + temp.getId(), "zoomIn", duracion)

            this.corregirPaths(svg, this.primero)
            return 1;
        }

        let tempPrimero = this.primero
        let index = 0

        do {

            let siguiente = tempPrimero.getSiguiente()
            if (numero >= tempPrimero.getNumero() && numero < siguiente.getNumero()) {
                let temp: NodoSimpleCircular = new NodoSimpleCircular(numero, this.id)
                temp.setId(this.id)
                this.id++

                let id1 = this.primero.getId();
                let id2 = this.primero.getSiguiente().getId()


                temp.setSiguiente(tempPrimero.getSiguiente())
                tempPrimero.setSiguiente(temp)

                this.draw.removerElemento("arrow" + id1 + "-" + id2)

                let div: any = this.draw.crearNodo(numero, temp.getId())
                dibujo.insertBefore(div, dibujo.children[index + 1]);
                await this.draw.animateNode("nodo" + temp.getId(), "zoomIn", duracion)

                this.corregirPaths(svg, this.primero)
                return 1;


            }

            index++
            tempPrimero = tempPrimero.getSiguiente()
            if (tempPrimero === this.ultimo) break
            if (tempPrimero === null) break

        } while (tempPrimero != this.primero)


        // Ingresar siempre de ultimo
        await this.add(numero, svg, dibujo, duracion)
        return 1
    }

    search(numero) {
        let temp = this.primero
        if (temp === null) return null
        do {
            if (temp.getNumero() === numero) return temp;
            temp = temp.getSiguiente()
            if (temp === null) break;
        } while (temp != this.primero)

        return null
    }

    async searchAnimation(numero:number|string, duration) {
        let temp = this.primero
        let i = 0
        if (temp === null) return null
        do {
            await this.draw.animateNode("nodo" + temp.getId(), 'bounceIn', duration);
            if (temp.getNumero() === numero) return { nodo: temp, index: i };
            temp = temp.getSiguiente()
            i++;
            if (temp === null) break;
        } while (temp != this.primero)

        return null
    }


    async eliminar(numero: number|string, duracion, svg) {
        this.draw.removerElemento("arrowultimo-primero")
        let temp = this.primero
        if (temp === null) return -1
        //Eliminar Primero
        if (temp.getNumero() === numero) {
            await this.draw.animateNode("nodo" + temp.getId(), 'zoomOut', duracion)
            this.draw.removerElemento("nodo" + temp.getId())
            //Solo hay 1
            if (temp.getSiguiente() === null) {
                this.primero = null
                this.ultimo = null
                return 1;
            }

            this.ultimo.setSiguiente(temp.getSiguiente())

            let id1 = this.primero.getId();
            let id2 = this.primero.getSiguiente().getId()

            this.draw.removerElemento("arrow" + id1 + "-" + id2)

            this.primero = temp.getSiguiente()
            this.draw.removerElemento("arrowultimo-primero")
            this.corregirPaths(svg, this.primero)

            return 1;
        }
        //Eliminar Ultimo
        else if (this.ultimo.getNumero() === numero) {
            let id1 = this.ultimo.getId();
            await this.draw.animateNode("nodo" + id1, 'zoomOut', duracion)
            this.draw.removerElemento("nodo" + id1)
            //Solo hay 2
            if (this.primero.getSiguiente() === this.ultimo) {
                this.primero.setSiguiente(null)
                this.ultimo = this.primero
                let id2 = this.primero.getId()
                this.draw.removerElemento("arrow" + id1 + "-" + id2)
                this.draw.removerElemento("arrow" + id2 + "-" + id1)
                this.corregirPaths(svg, this.primero)
                return 1
            }
            let antesUltimo = this.primero
            do {
                antesUltimo = antesUltimo.getSiguiente()
            } while (antesUltimo.getSiguiente() !== this.ultimo)

            antesUltimo.setSiguiente(this.primero)
            let id2 = antesUltimo.getId()
            this.ultimo = antesUltimo


            this.draw.removerElemento("arrow" + id1 + "-" + id2)
            this.draw.removerElemento("arrow" + id2 + "-" + id1)
            this.draw.removerElemento("arrowultimo-primero")
            this.corregirPaths(svg, this.ultimo)



            return 1;

        }


        do {

            if (temp.getNumero() === numero) {
                let antesDe = this.primero
                do {
                    antesDe = antesDe.getSiguiente()
                } while (antesDe.getSiguiente() !== temp)

                let siguiente = temp.getSiguiente()
                let id1 = temp.getId();
                let id2 = antesDe.getId();
                let id3 = siguiente.getId()


                await this.draw.animateNode("nodo" + id1, 'zoomOut', duracion)
                this.draw.removerElemento("nodo" + id1)

                antesDe.setSiguiente(temp.getSiguiente())

                this.draw.removerElemento("arrow" + id1 + "-" + id3)
                this.draw.removerElemento("arrow" + id2 + "-" + id1)
                this.corregirPaths(svg, antesDe)


                return 1

            }

            temp = temp.getSiguiente();
            if (temp === this.ultimo) break;
            if (temp === null) break;
        } while (temp !== this.ultimo)

        return -1


    }


    getPrimero() {
        return this.primero
    }

    getUltimo() {
        return this.ultimo
    }




    crearUltimos(svg) {


        if (this.primero.getSiguiente() === null) return;
        if (this.primero.getSiguiente() === this.ultimo) return;

        this.draw.removerElemento("arrowultimo-primero")
        this.draw.removerElemento("arrowprimero-ultimo")

        let div = document.getElementById("nodo" + this.primero.getId())
        let div2 = document.getElementById("nodo" + this.ultimo.getId())


        let posiciones = this.draw.posicionesLeft(div, div2)
        posiciones.y1 += 20;
        posiciones.y2 += 20

        posiciones.x1 -= 10
        posiciones.x2 += 50

        this.draw.crearPath("ultimo-primero", svg, posiciones)

    }




    corregirPaths(svg, nodo) {
        this.draw.removerElemento("arrowultimo-primero")
        this.draw.removerElemento("arrowprimero-ultimo")

        let temp = nodo
        if (nodo !== this.ultimo) {
            do {

                let siguiente = temp.getSiguiente()
                if (siguiente !== null) {
                    let id1 = temp.getId()
                    let id2 = siguiente.getId()

                    this.draw.removerElemento("arrow" + id2 + "-" + id1)
                    this.draw.removerElemento("arrow" + id1 + "-" + id2)
                    let div1 = document.getElementById("nodo" + id1)
                    let div2 = document.getElementById("nodo" + id2)

                    let pos = this.draw.posicionesRight(div1, div2)
                    pos.color = 'black'
                    pos.x1 -= 20
                    pos.x2 -= 55
                    this.draw.crearPath(id1 + "-" + id2, svg, pos)

                }
                temp = temp.getSiguiente();
                if (temp === null) break;
                if (temp === this.ultimo) break;
            } while (temp !== this.ultimo)
        }


        this.crearUltimos(svg)
    }


    generarJSON() {
        let data = {
            categoria: "Estructura Lineal",
            nombre: "Lista circular doblemente Enlazada",
            valores: []
        }

        let temp = this.primero

        do {
            data.valores.push(temp.getNumero())
            temp = temp.getSiguiente()
            if (temp === null) break;
        } while (temp != this.primero)

        return JSON.stringify(data)
    }
}