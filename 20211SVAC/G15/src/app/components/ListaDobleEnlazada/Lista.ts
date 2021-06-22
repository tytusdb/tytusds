import { analyzeAndValidateNgModules } from "@angular/compiler";
import { nullSafeIsEquivalent } from "@angular/compiler/src/output/output_ast";
import { Nodo } from "./Nodo";

export class Lista {

    raiz: Nodo;
    cola: Nodo;
    identificador: number;

    constructor() {
        this.raiz = null;
        this.cola = null;
        this.identificador = 0;
    }

    async insertarFinal(dato: number | string, svg, dibujo, duracion) {
        let NewNodo: Nodo = new Nodo(dato, this.identificador) //creamos un nuevo nodo
        if (this.raiz == null) { //verificamos si la raiz tiene algun dato
            this.raiz = NewNodo // nuevo dato sera la raiz
            this.cola = NewNodo // nuevo dato tambien sera la cola o el ultimo

            let div: any = this.crearNodo(dato, this.identificador) // creamos una nueva division
            dibujo.appendChild(div) //nuevo nodo 
            this.identificador++ //aumentamos posicion
            await this.animateNode("nodo" + NewNodo.getIdentificador(), "zoomIn", duracion)
            return NewNodo.getIdentificador();
        }


        NewNodo.setIdentificador(this.identificador)
        this.identificador++

        if (this.raiz.siguiente !== this.cola && this.raiz.siguiente !== null) {
            this.removerElemento("arrowprimero-ultimo")
            this.removerElemento("arrowultimo-primero")
        }

        let div: any = this.crearNodo(dato, NewNodo.getIdentificador())
        dibujo.appendChild(div)
        await this.animateNode("nodo" + NewNodo.getIdentificador(), "zoomIn", duracion)

        let div2 = document.getElementById("nodo" + this.cola.getIdentificador())
        let posiciones = this.posicionesLeft(div, div2)
        posiciones.color = 'black'

        this.crearPath(this.cola.getIdentificador() + "-" + NewNodo.getIdentificador(), svg, posiciones)
        posiciones = this.posicionesRight(div, div2)
        posiciones.color = 'black'
        this.crearPath(NewNodo.getIdentificador() + "-" + this.cola.getIdentificador(), svg, posiciones)


        /*  NewNodo.siguiente = this.raiz; // al inicio nuestro nuevo nodo apunta a la raiz
         this.raiz.anterior = NewNodo;
         this.raiz = NewNodo; */
        // if (this.raiz != null) {
        let aux = this.cola;
        // while (aux.siguiente != null) {
        // aux = aux.siguiente;
        //   }
        aux.siguiente = NewNodo;
        NewNodo.anterior = aux;
        NewNodo.siguiente = this.raiz
        this.raiz.anterior = NewNodo
        this.cola = NewNodo
        //this.crearUltimos(svg)
        return NewNodo.getIdentificador();
        // }


    }

    async insertarInicio(dato, svg, dibujo, duracion) {
        let NewNodo: Nodo = new Nodo(dato, this.identificador);
        if (this.raiz === null) {
            this.raiz = NewNodo;
            this.cola = NewNodo;
            //    NewNodo.anterior = null
            //    NewNodo.siguiente = null
            //codigo nuevo 
            let div: any = this.crearNodo(dato, this.identificador)
            dibujo.appendChild(div)
            this.identificador++
            await this.animateNode("nodo" + NewNodo.getIdentificador(), "zoomIn", duracion)
            return NewNodo.getIdentificador();

        }/*  else {
            NewNodo.siguiente = this.raiz; // al inicio nuestro nuevo nodo apunta a la raiz
            this.removerElemento("arrowprimero-ultimo")
            this.removerElemento("arrowultimo-primero")
            this.raiz.anterior = NewNodo;
            this.raiz = NewNodo;
        } */
        //  else {
        NewNodo.setIdentificador(this.identificador)
        this.identificador++

        if (this.raiz.siguiente !== this.cola && this.raiz.siguiente !== null) {
            this.removerElemento("arrowprimero-ultimo")
            this.removerElemento("arrowultimo-primero")
        }

        let div: any = this.crearNodo(dato, NewNodo.getIdentificador())
        dibujo.insertBefore(div, dibujo.firstChild);
        await this.animateNode("nodo" + NewNodo.getIdentificador(), "zoomIn", duracion)

        let aux = this.raiz
        NewNodo.siguiente = this.raiz
        aux.anterior = NewNodo
        this.cola.siguiente = NewNodo
        NewNodo.anterior = this.cola
        this.raiz = NewNodo

        // }}




        // if (this.raiz.siguiente !== this.cola && this.raiz.siguiente !== null) {
        //     this.removerElemento("arrowprimero-ultimo")
        //     this.removerElemento("arrowultimo-primero")

        // }




        // NewNodo.siguiente = this.raiz; // al inicio nuestro nuevo nodo apunta a la raiz
        // this.raiz.anterior = NewNodo;
        // this.raiz = NewNodo;

        this.corregirPaths(svg, this.raiz);
        return NewNodo.getIdentificador();
    }

    async insertarOrden(dato: any, svg, dibujo, duracion) {

        let NewNodo = new Nodo(dato, this.identificador)
        /* if (this.raiz == null) { //verificamos si la lista esta vacia
            this.raiz = NewNodo
            this.cola = NewNodo

            let div: any = this.crearNodo(dato, this.identificador)
            dibujo.appendChild(div)
            this.identificador++
            await this.animateNode("nodo" + NewNodo.getIdentificador(), "zoomIn", duracion)
            return NewNodo.getIdentificador();

        } else {


            if (isNaN(dato)) { // not a number
                //string
                if (dato < this.raiz.dato) {
                    this.insertarInicio(dato, svg, dibujo, duracion);
                } else {
                    let aux = this.raiz;
                    NewNodo.setIdentificador(this.identificador)
                    this.identificador++

                    while (aux.siguiente != null) {
                        if (aux.dato < dato && dato < aux.siguiente.dato) {
                            NewNodo.siguiente = aux.siguiente;
                            NewNodo.anterior = aux;
                            aux.siguiente.anterior = NewNodo;
                            aux.siguiente = NewNodo;
                            return;
                        }
                        aux = aux.siguiente;
                    }
                    aux.siguiente = NewNodo;
                    NewNodo.anterior = aux;
                }
            } else { //es un numero el dato ingresado
                if (Number(dato) < Number(this.raiz.dato)) {
                    this.insertarInicio(dato, svg, dibujo, duracion);
                } else {
                    let aux = this.raiz;
                    while (aux.siguiente != null) {
                        if (Number(aux.dato) <= Number(dato) && Number(dato) >= Number(aux.siguiente.dato)) {
                            this.insertarFinal(dato, svg, dibujo, duracion);
                        }
                        else if (Number(aux.dato) <= Number(dato) && Number(dato) <= Number(aux.siguiente.dato)) {
                            NewNodo.setIdentificador(this.identificador)
                            this.identificador++


                            let id1 = this.raiz.getIdentificador();
                            let id2 = this.raiz.siguiente.getIdentificador()

                            NewNodo.siguiente = aux.siguiente;
                            NewNodo.anterior = aux;
                            aux.siguiente.anterior = NewNodo;
                            aux.siguiente = NewNodo;

                            this.removerElemento("arrow" + id1 + "-" + id2)
                            this.removerElemento("arrow" + id2 + "-" + id1)

                            let div: any = this.crearNodo(dato, NewNodo.getIdentificador())
                            dibujo.insertBefore(div, dibujo.children[1]);
                            await this.animateNode("Nodo" + NewNodo.getIdentificador(), "zoomIn", duracion)

                            this.corregirPaths(svg, this.raiz)
                            return 1;
                        }
                        aux = aux.siguiente;
                    }
                    aux.siguiente = NewNodo;
                    NewNodo.anterior = aux;
                }
            }
        }

        if (this.raiz.siguiente !== this.raiz && this.raiz.siguiente !== null) {
            this.removerElemento("arrowprimero-ultimo")
            this.removerElemento("arrowultimo-primero")
        } */

        if (isNaN(dato)) { // viene una letra
            if (this.raiz == null) { //verificamos si la lista esta vacia
                this.raiz = NewNodo
                this.cola = NewNodo

                let div: any = this.crearNodo(dato, this.identificador)
                dibujo.appendChild(div)
                this.identificador++
                await this.animateNode("nodo" + NewNodo.getIdentificador(), "zoomIn", duracion)
                return NewNodo.getIdentificador();
            }
            NewNodo.setIdentificador(this.identificador)
            this.identificador++

            if (this.raiz.siguiente !== this.cola && this.raiz.siguiente !== null) {
                this.removerElemento("arrowprimero-ultimo")
                this.removerElemento("arrowultimo-primero")
            }

            if(dato<this.raiz.dato){
                this.insertarInicio(dato, svg, dibujo, duracion)
            } else {
                let aux=this.raiz;
                let index=0
                while(aux.siguiente!=null){
                    if(aux.dato<=dato && aux.siguiente.dato >= dato){
                        let id1 = aux.getIdentificador();
                        let id2 = aux.siguiente.getIdentificador();
                        NewNodo.siguiente=aux.siguiente;
                        NewNodo.anterior=aux;
                        aux.siguiente.anterior=NewNodo;
                        aux.siguiente = NewNodo;

                        this.removerElemento("arrow" + id1 + "-" + id2)
                        this.removerElemento("arrow" + id2 + "-" + id1)

                       
                        let div: any = this.crearNodo(dato, NewNodo.getIdentificador())
                        dibujo.insertBefore(div, dibujo.children[index + 1]);
                        await this.animateNode("nodo" + NewNodo.getIdentificador(), "zoomIn", duracion)

                        this.corregirPaths(svg, this.raiz)
                        return 1;
                    }
                    index++
                    aux=aux.siguiente;
                    if(aux===this.cola)break
                    if(aux===null) break
                }
                aux.siguiente = NewNodo;
                NewNodo.anterior=aux;
                this.insertarFinal(dato, svg, dibujo, duracion)
                return 1
            }
        } else { // viene un numero 
            if (this.raiz == null) { //verificamos si la lista esta vacia
                this.raiz = NewNodo
                this.cola = NewNodo

                let div: any = this.crearNodo(dato, this.identificador)
                dibujo.appendChild(div)
                this.identificador++
                await this.animateNode("nodo" + NewNodo.getIdentificador(), "zoomIn", duracion)
                return NewNodo.getIdentificador();
            }
            NewNodo.setIdentificador(this.identificador)
            this.identificador++

            if (this.raiz.siguiente !== this.cola && this.raiz.siguiente !== null) {
                this.removerElemento("arrowprimero-ultimo")
                this.removerElemento("arrowultimo-primero")
            }

            if (Number(dato) < Number(this.raiz.dato)) {
                this.insertarInicio(dato, svg, dibujo, duracion)
            } else {
                let index = 0
                let aux=this.raiz;
                while(aux.siguiente!=null){
                    if(Number(aux.dato) <= Number(dato) &&   Number(aux.siguiente.dato) >= Number(dato) ) {
                        
                        let id1 = aux.getIdentificador();
                        let id2 = aux.siguiente.getIdentificador();
                        NewNodo.siguiente=aux.siguiente;
                        NewNodo.anterior=aux;
                        aux.siguiente.anterior=NewNodo;
                        aux.siguiente = NewNodo;

                        this.removerElemento("arrow" + id1 + "-" + id2)
                        this.removerElemento("arrow" + id2 + "-" + id1)

                       
                        let div: any = this.crearNodo(dato, NewNodo.getIdentificador())
                        dibujo.insertBefore(div, dibujo.children[index + 1]);
                        await this.animateNode("nodo" + NewNodo.getIdentificador(), "zoomIn", duracion)

                        this.corregirPaths(svg, this.raiz)
                        return;
                    }
                    index++
                    aux=aux.siguiente;

                    if (aux === this.cola) break
                    if(aux=== null)break
        
                }

                // aux.siguiente = NewNodo;
                // NewNodo.anterior=aux;
                this.insertarFinal(dato,svg,dibujo,duracion)
                return 1
            }
        }
    }

    buscarDato(dato: number | string) {
        let tem = this.raiz
        if (tem === null) return null //no hay elementos en la lista
        do {
            if (tem.dato === dato) return tem;
            tem = tem.siguiente
            if (tem === null) break
        } while (tem != this.raiz)
        return null

        /*        tem = this.raiz
               while (tem != null) {
                   if (tem.dato == dato) return tem
                   tem = tem.siguiente;
               }
               return false; */
    }

    async buscarAnimacion(dato, duration) {
        let aux = this.raiz
        let i = 0
        if (aux === null) return null
        do {
            await this.animateNode("nodo" + aux.getIdentificador(), 'bounceIn', duration);
            if (!isNaN(dato)) {
                if (Number(aux.dato) === Number(dato)) return { nodo: aux, index: i };
                aux = aux.siguiente
                i++;
            }else{
                if (aux.dato=== dato) return { nodo: aux, index: i };
                aux = aux.siguiente
                i++;
            }
            if (aux === null) break;
        } while (aux != this.raiz)

        return null
    }

    async eliminarDato(dato: string | number, duracion, svg) {

        let aux = this.raiz
        //  let aux1 = null;

        if (aux === null) return -1 //no hay datos en la lista

        try {
            if (aux.dato === dato) {

                await this.animateNode("nodo" + aux.getIdentificador(), 'zoomOut', duracion)
                this.removerElemento("nodo" + aux.getIdentificador())

                if (aux.siguiente === null) {
                    this.raiz = null
                    this.cola = null
                    return 1;
                }

                this.cola.siguiente = aux.siguiente
                aux.siguiente.anterior = this.cola

                let id1 = this.raiz.getIdentificador();
                let id2 = this.raiz.siguiente.getIdentificador()

                this.removerElemento("arrow" + id1 + "-" + id2)
                this.removerElemento("arrow" + id2 + "-" + id1)

                this.raiz = aux.siguiente;
                //aux = aux.siguiente
                this.corregirPaths(svg, this.raiz)
                return 1

            } else if (this.cola.dato === dato) {

                let id1 = this.cola.getIdentificador();

                await this.animateNode("nodo" + id1, 'zoomOut', duracion)
                this.removerElemento("nodo" + id1)

                if (this.cola.anterior === this.raiz) {
                    this.raiz.siguiente = null
                    this.cola = this.raiz
                    let id2 = this.raiz.getIdentificador()
                    this.removerElemento("arrow" + id1 + "-" + id2)
                    this.removerElemento("arrow" + id2 + "-" + id1)
                    this.corregirPaths(svg, this.raiz)
                    return 1

                }
                this.cola.anterior.siguiente = this.raiz
                this.raiz.anterior = this.cola.anterior
                let id2 = this.cola.anterior.getIdentificador
                this.cola = this.cola.anterior

                this.removerElemento("arrow" + id1 + "-" + id2)
                this.removerElemento("arrow" + id2 + "-" + id1)
                this.corregirPaths(svg, this.cola)
                return 1
                // } catch (error) { 
            }
            //  else {

            do {
                if (aux.dato === dato) {
                    let anterior = aux.anterior
                    let siguiente = aux.siguiente
                    let id1 = aux.getIdentificador
                    let id2 = anterior.getIdentificador
                    let id3 = siguiente.getIdentificador

                    await this.animateNode("nodo" + id1, 'zoomOut', duracion)
                    this.removerElemento("nodo" + id1)
                    anterior.siguiente = aux.siguiente
                    aux.siguiente.anterior = anterior

                    this.removerElemento("arrow" + id1 + "-" + id2)
                    this.removerElemento("arrow" + id2 + "-" + id1)


                    this.removerElemento("arrow" + id1 + "-" + id3)
                    this.removerElemento("arrow" + id3 + "-" + id1)
                    this.corregirPaths(svg, anterior)

                    return 1
                }
                aux = aux.siguiente;
                if (aux === this.cola) break;
                if (aux === null) break;
            } while (aux != this.cola)

            // return -1
        } catch (error) {

        }
        //  return -1

    }

    crearPath(result, svg, posiciones) {
        const pathLeft = document.createElementNS("http://www.w3.org/2000/svg", "line");
        pathLeft.setAttribute("identificador", "arrow" + result);
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

    crearNodo(dato: any, identificador: number) {
        let div = document.createElement('div')
        div.className = "node animate__animated ml-5"
        div.id = "nodo" + identificador
        div.textContent = dato
        return div
    }

    removerElemento(identificador) {
        try {
            document.getElementById(identificador).remove()
        } catch (e) { }

    }

    crearUltimos(svg) {
        if (this.raiz === null) return;
        if (this.raiz.siguiente === this.cola) return;

        // let div = document.getElementById("Nodo" + this.raiz.getIdentificador())
        // let div2 = document.getElementById("Nodo" + this.cola.getIdentificador())

        // let posiciones = this.posicionesLeft(div, div2)
        // posiciones.y1 += 20;
        // posiciones.y2 += 20

        // posiciones.x1 -= 10
        // posiciones.x2 += 50

        // this.crearPath("primero-ultimo", svg, posiciones)

        // posiciones = this.posicionesRight(div, div2)
        // posiciones = this.posicionesRight(div, div2)
        // posiciones.y1 += 30;
        // posiciones.y2 += 30
        // posiciones.x1 -= 20
        // posiciones.x2 -= 30

        // this.crearPath("ultimo-primero", svg, posiciones)
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

    corregirPaths(svg, Nodo) {
        this.removerElemento("arrowprimero-ultimo")
        this.removerElemento("arrowultimo-primero")


        let temp = Nodo

        do {
            let siguiente = temp.siguiente
            if (siguiente !== null) {
                let id1 = temp.getIdentificador()
                let id2 = siguiente.getIdentificador()

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
            temp = temp.siguiente;
            if (temp === null) break;
            if (temp === this.cola) break;
        } while (temp !== this.cola)

        // this.crearUltimos(svg)
    }

    mostrarDER() {
        let aux = this.raiz;
        while (aux != null) {
            console.log(aux.dato);
            aux = aux.siguiente;
        }
    }

    mostrarIZ() {
        let aux = this.raiz;
        while (aux != null) {
            aux = aux.siguiente;
        }
        aux = this.raiz;
        while (aux.siguiente != null) {
            aux = aux.siguiente;
        }
        while (aux != null) {
            console.log(aux.dato)
            aux = aux.anterior;

        }
    }
    generarJSON() {
        let data = {
            categoria: "Estructura Lineal",
            nombre: "Lista Doble Enlazada",
            valores: []
        }

        let temp = this.raiz

        do {
            data.valores.push(temp.dato)
            temp = temp.siguiente
            if (temp === null) break;
        } while (temp != this.raiz)

        return JSON.stringify(data)
    }



}
