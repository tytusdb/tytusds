import { NodoDobleCircular } from './NodoDobleCircular'
export class ListaDobleCircular {
    private primero: NodoDobleCircular
    private ultimo: NodoDobleCircular
    private id: number;

    constructor() {
        this.primero = null
        this.ultimo = null
        this.id = 0;
    }

    async add(numero: number, svg, dibujo, duracion) {
        let temp: NodoDobleCircular = new NodoDobleCircular(numero, this.id)
        if (this.primero == null) {
            this.primero = temp
            this.ultimo = temp

            let div: any = this.crearNodo(numero, this.id)
            dibujo.appendChild(div)
            this.id++
            await this.animateNode("nodo" + temp.getId(), "zoomIn", duracion)
            return temp.getId();
        }


        temp.setId(this.id)
        this.id++

        if (this.primero.getSiguiente() !== this.ultimo && this.primero.getSiguiente() !== null) {
            this.removerElemento("arrowprimero-ultimo")
            this.removerElemento("arrowultimo-primero")

        }

        let div: any = this.crearNodo(numero, temp.getId())
        dibujo.appendChild(div)
        await this.animateNode("nodo" + temp.getId(), "zoomIn", duracion)

        let div2 = document.getElementById("nodo" + this.ultimo.getId())
        let posiciones = this.posicionesLeft(div, div2)
        posiciones.color = 'black'



        this.crearPath(this.ultimo.getId() + "-" + temp.getId(), svg, posiciones)
        posiciones = this.posicionesRight(div, div2)
        posiciones.color = 'black'
        this.crearPath(temp.getId() + "-" + this.ultimo.getId(), svg, posiciones)


        let tempUltimo = this.ultimo
        tempUltimo.setSiguiente(temp)
        temp.setAnterior(tempUltimo)
        temp.setSiguiente(this.primero)
        this.primero.setAnterior(temp)
        this.ultimo = temp


        this.crearUltimos(svg)

        return temp.getId();
    }


    async addAlInicio(numero: number, svg, dibujo, duracion) {
        let temp: NodoDobleCircular = new NodoDobleCircular(numero, this.id)
        if (this.primero == null) {
            this.primero = temp
            this.ultimo = temp

            let div: any = this.crearNodo(numero, this.id)
            dibujo.appendChild(div)
            this.id++
            await this.animateNode("nodo" + temp.getId(), "zoomIn", duracion)
            return temp.getId();
        }


        temp.setId(this.id)
        this.id++

        if (this.primero.getSiguiente() !== this.ultimo && this.primero.getSiguiente() !== null) {
            this.removerElemento("arrowprimero-ultimo")
            this.removerElemento("arrowultimo-primero")

        }

        let div: any = this.crearNodo(numero, temp.getId())
        dibujo.insertBefore(div, dibujo.firstChild);
        await this.animateNode("nodo" + temp.getId(), "zoomIn", duracion)


        let tempPrimero = this.primero
        temp.setSiguiente(tempPrimero)
        tempPrimero.setAnterior(temp)
        this.ultimo.setSiguiente(temp)
        temp.setAnterior(this.ultimo)
        this.primero = temp
        this.corregirPaths(svg, this.primero)

        return temp.getId();
    }

    async addOrdenado(numero: number, svg, dibujo, duracion) {

        // Ingresar si esta vacia
        if (this.primero == null) {
            let temp: NodoDobleCircular = new NodoDobleCircular(numero, this.id)
            this.primero = temp
            this.ultimo = temp

            let div: any = this.crearNodo(numero, this.id)
            dibujo.appendChild(div)
            this.id++
            await this.animateNode("nodo" + temp.getId(), "zoomIn", duracion)
            return temp.getId();
        }


        if (this.primero.getSiguiente() !== this.ultimo && this.primero.getSiguiente() !== null) {
            this.removerElemento("arrowprimero-ultimo")
            this.removerElemento("arrowultimo-primero")

        }

        //Ingresar si solo hay uno
        if (this.primero.getSiguiente() === null) {
            if(numero <= this.primero.getNumero()) await this.addAlInicio(numero,svg,dibujo,duracion)
            else  await this.add(numero, svg, dibujo, duracion)
            return 1
        }
        //Ingresar al inicio si es menor
        if(this.primero.getNumero() > numero){
            await this.addAlInicio(numero,svg,dibujo,duracion)
            return 1
        }


       

        // Si es mayor al primero pero menor al siguiente
        if (numero >= this.primero.getNumero() && numero < this.primero.getSiguiente().getNumero()) {
            let temp: NodoDobleCircular = new NodoDobleCircular(numero, this.id)
            temp.setId(this.id)
            this.id++

            let id1 = this.primero.getId();
            let id2 = this.primero.getSiguiente().getId()

            let tempPrimero = this.primero

            temp.setAnterior(tempPrimero)
            temp.setSiguiente(tempPrimero.getSiguiente())
            tempPrimero.setSiguiente(temp)
            tempPrimero.getSiguiente().setAnterior(temp)

            this.removerElemento("arrow" + id1 + "-" + id2)
            this.removerElemento("arrow" + id2 + "-" + id1)

            let div: any = this.crearNodo(numero, temp.getId())
            dibujo.insertBefore(div, dibujo.children[1]);
            await this.animateNode("nodo" + temp.getId(), "zoomIn", duracion)

            this.corregirPaths(svg, this.primero)
            return 1;
        }

        let tempPrimero = this.primero
        let index = 0

        do {

            let siguiente = tempPrimero.getSiguiente()
            if (numero >= tempPrimero.getNumero() && numero < siguiente.getNumero()) {
                let temp: NodoDobleCircular = new NodoDobleCircular(numero, this.id)
                temp.setId(this.id)
                this.id++

                let id1 = this.primero.getId();
                let id2 = this.primero.getSiguiente().getId()


                temp.setAnterior(tempPrimero)
                temp.setSiguiente(tempPrimero.getSiguiente())
                tempPrimero.setSiguiente(temp)
                tempPrimero.getSiguiente().setAnterior(temp)

                this.removerElemento("arrow" + id1 + "-" + id2)
                this.removerElemento("arrow" + id2 + "-" + id1)

                let div: any = this.crearNodo(numero, temp.getId())
                dibujo.insertBefore(div, dibujo.children[index + 1]);
                await this.animateNode("nodo" + temp.getId(), "zoomIn", duracion)

                this.corregirPaths(svg, this.primero)
                return 1;


            }

            index++
            tempPrimero = tempPrimero.getSiguiente()
            if (tempPrimero === this.ultimo) break
            if (tempPrimero === null) break

        } while (tempPrimero != this.primero)


        // Ingresar siempre de ultimo
        await this.add(numero,svg,dibujo,duracion)
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

    async searchAnimation(numero, duration) {
        let temp = this.primero
        let i = 0
        if (temp === null) return null
        do {
            await this.animateNode("nodo" + temp.getId(), 'bounceIn', duration);
            if (temp.getNumero() === numero) return { nodo: temp, index: i };
            temp = temp.getSiguiente()
            i++;
            if (temp === null) break;
        } while (temp != this.primero)

        return null
    }


    async eliminar(numero: number, duracion, svg) {
        let temp = this.primero
        if (temp === null) return -1
        //Eliminar Primero
        if (temp.getNumero() === numero) {
            await this.animateNode("nodo" + temp.getId(), 'zoomOut', duracion)
            this.removerElemento("nodo" + temp.getId())
            //Solo hay 1
            if (temp.getSiguiente() === null) {
                this.primero = null
                this.ultimo = null
                return 1;
            }

            this.ultimo.setSiguiente(temp.getSiguiente())
            temp.getSiguiente().setAnterior(this.ultimo)

            let id1 = this.primero.getId();
            let id2 = this.primero.getSiguiente().getId()

            this.removerElemento("arrow" + id1 + "-" + id2)
            this.removerElemento("arrow" + id2 + "-" + id1)


            this.primero = temp.getSiguiente()
            this.corregirPaths(svg, this.primero)

            return 1;
        }
        //Eliminar Ultimo
        else if (this.ultimo.getNumero() === numero) {
            let id1 = this.ultimo.getId();
            await this.animateNode("nodo" + id1, 'zoomOut', duracion)
            this.removerElemento("nodo" + id1)
            //Solo hay 2
            if (this.ultimo.getAnterior() === this.primero) {
                this.primero.setSiguiente(null)
                this.ultimo = this.primero
                let id2 = this.primero.getId()
                this.removerElemento("arrow" + id1 + "-" + id2)
                this.removerElemento("arrow" + id2 + "-" + id1)
                this.corregirPaths(svg, this.primero)
                return 1
            }
            console.log("HGola")
            this.ultimo.getAnterior().setSiguiente(this.primero)
            this.primero.setAnterior(this.ultimo.getAnterior())
            let id2 = this.ultimo.getAnterior().getId()
            this.ultimo = this.ultimo.getAnterior()


            this.removerElemento("arrow" + id1 + "-" + id2)
            this.removerElemento("arrow" + id2 + "-" + id1)
            this.corregirPaths(svg, this.ultimo)



            return 1;

        }


        do {

            if (temp.getNumero() === numero) {
                let anterior = temp.getAnterior()
                let siguiente = temp.getSiguiente()
                let id1 = temp.getId();
                let id2 = anterior.getId();
                let id3 = siguiente.getId()


                await this.animateNode("nodo" + id1, 'zoomOut', duracion)
                this.removerElemento("nodo" + id1)

                anterior.setSiguiente(temp.getSiguiente())
                temp.getSiguiente().setAnterior(anterior)

                this.removerElemento("arrow" + id1 + "-" + id2)
                this.removerElemento("arrow" + id2 + "-" + id1)

                this.removerElemento("arrow" + id1 + "-" + id3)
                this.removerElemento("arrow" + id3 + "-" + id1)
                this.corregirPaths(svg, anterior)


                return 1

            }

            temp = temp.getSiguiente();
            if (temp === this.ultimo) break;
            if (temp === null) break;
        } while (temp !== this.ultimo)

        return -1


    }





    crearPath(result, svg, posiciones) {
        const pathLeft = document.createElementNS("http://www.w3.org/2000/svg", "line");
        pathLeft.setAttribute("id", "arrow" + result);
        pathLeft.setAttribute('stroke-width', '2');
        pathLeft.setAttribute('stroke', posiciones.color);
        pathLeft.setAttribute('marker-end', 'url(#arrowhead)');

        svg.appendChild(pathLeft);
        pathLeft.setAttribute('x1', `${posiciones.x1}`);
        pathLeft.setAttribute('x2', `${posiciones.x2}`);
        pathLeft.setAttribute('y1', `${posiciones.y1}`);
        pathLeft.setAttribute('y2', `${posiciones.y2}`);
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

    getPrimero() {
        return this.primero
    }

    getUltimo() {
        return this.ultimo
    }


    crearNodo(numero, id) {
        let div = document.createElement('div')
        div.className = "node animate__animated ml-5"
        div.id = "nodo" + id
        div.textContent = numero
        return div
    }

    removerElemento(id) {
        try {
            document.getElementById(id).remove()
        } catch (e) { }

    }

    crearUltimos(svg) {
        if (this.primero.getSiguiente() === null) return;
        if (this.primero.getSiguiente() === this.ultimo) return;

        let div = document.getElementById("nodo" + this.primero.getId())
        let div2 = document.getElementById("nodo" + this.ultimo.getId())


        let posiciones = this.posicionesLeft(div, div2)
        posiciones.y1 += 20;
        posiciones.y2 += 20

        posiciones.x1 -= 10
        posiciones.x2 += 50

        this.crearPath("primero-ultimo", svg, posiciones)

        posiciones = this.posicionesRight(div, div2)
        posiciones.y1 += 30;
        posiciones.y2 += 30
        posiciones.x1 -= 20
        posiciones.x2 -= 30

        this.crearPath("ultimo-primero", svg, posiciones)
    }

    posicionesLeft(div, div2) {
        return {
            x1: div2.getBoundingClientRect().right,
            x2: div.getBoundingClientRect().left,
            y1: div2.getBoundingClientRect().top + div2.offsetHeight / 2,
            y2: div.getBoundingClientRect().top + div.offsetHeight / 2,
            color: 'red'
        }
    }

    posicionesRight(div, div2) {
        return {
            x1: div.getBoundingClientRect().right,
            x2: div2.getBoundingClientRect().left + 50,
            y1: div.getBoundingClientRect().top + div.offsetHeight / 2 - 5,
            y2: div2.getBoundingClientRect().top + div2.offsetHeight / 2 - 5,
            color: 'red'
        }
    }


    corregirPaths(svg, nodo) {
        this.removerElemento("arrowprimero-ultimo")
        this.removerElemento("arrowultimo-primero")


        let temp = nodo

        do {
            let siguiente = temp.getSiguiente()
            if (siguiente !== null) {
                let id1 = temp.getId()
                let id2 = siguiente.getId()

                this.removerElemento("arrow" + id1 + "-" + id2)
                this.removerElemento("arrow" + id2 + "-" + id1)
                let div1 = document.getElementById("nodo" + id1)
                let div2 = document.getElementById("nodo" + id2)

                let pos = this.posicionesLeft(div1, div2)
                pos.color = 'black'
                pos.x1 -= 20
                pos.x2 += 55
                this.crearPath(id1 + "-" + id2, svg, pos)

                pos = this.posicionesRight(div1, div2)
                pos.color = 'black'
                pos.x2 -= 55
                this.crearPath(id2 + "-" + id1, svg, pos)
            }
            temp = temp.getSiguiente();
            if (temp === null) break;
            if (temp === this.ultimo) break;
        } while (temp !== this.ultimo)

        this.crearUltimos(svg)
    }


    generarJSON(){
        let data = {
            categoria: "Estructura Lineal",
            nombre : "Lista circular doblemente Enlazada",
            valores: []
        }

        let temp = this.primero

        do{
            data.valores.push(temp.getNumero())
            temp = temp.getSiguiente()
            if(temp === null) break;
        }while(temp != this.primero)

        return JSON.stringify(data)
    }
}