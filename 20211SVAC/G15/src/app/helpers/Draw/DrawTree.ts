export class DrawTree {


    /**
     * Funcion para animar cualquier Div 
     * @param element el div a animar
     * @param animation tipo de animacion
     * @param duration duracion
     * @returns 
     */
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
                let duracion = duration.split('s')[0]
                duracion = +duracion

                resolve('Animation ended');
            }

            node.addEventListener('animationend', handleAnimationEnd, { once: true });

            //resolve('Animation ended');
        });
    }

    /**
     * Crea un nodo para los nodos
     * del arbol
     * @param node 
     * @param contenedor 
     */
    createNode(node, contenedor) {
        let divContainer = document.createElement('div');
        let div = document.createElement('div');
        let p = document.createElement('p');
        divContainer.className = 'animate__animated  node-container';
        divContainer.id = 'node-container-' + node.getId();
        div.className = ' nodo';
        div.id = 'node-' + node.getId();
        p.append(node.getNumero());
        div.appendChild(p);
        divContainer.appendChild(div);
        contenedor.appendChild(divContainer);
    }

    /**
     * Agrega un nodo, ya sea como raiz
     * o de manera recursiva
     * @param node 
     * @param position 
     * @param previousId 
     * @param contenedor 
     * @param duracion 
     */
    async addNode(node, position, previousId, contenedor, duracion, raiz) {
        this.createNode(node, contenedor);
        await this.animateNode("node-container-" + node.getId(), "zoomIn", duracion)
        this.sleep(4000)
        if (node === raiz) {

            let position: any = document.getElementById('node-' + node.getId()).getBoundingClientRect();
            document.getElementById('node-' + node.getId()).style.left = (window.screen.width / 2) - (position.width / 2) + 'px';

        }
        else {
            let previous = document.getElementById('node-' + previousId).getBoundingClientRect()
            let temp = document.getElementById('node-' + node.getId())
            temp.style.top = (previous.y + 25) + 'px';

            if (position === "right") temp.style.left = (previous.x + 25) + 'px'
            else if (position === "left") temp.style.left = (previous.x - 25) + 'px'

            this.ajustarNodos(raiz)
            this.crearLinea('node-' + node.getId(), 'node-' + previousId, contenedor)
        }


        return 1

    }

    /**
     * Crea un div de tipo flecha
     * @param id 
     * @param from 
     * @param to 
     * @param contenedor 
     * @param color 
     */
    crearFlecha(id, from, to, contenedor, color) {
        let divContenedor = document.createElement('div')
        divContenedor.className = 'arrow-container'
        divContenedor.id = id
        divContenedor.dataset.from = from
        divContenedor.dataset.to = to
        divContenedor.dataset.color = color

        let linea = document.createElement('div')
        linea.id = 'linea-' + id
        linea.className = 'line';
        let flecha = document.createElement('div')
        flecha.id = 'flecha-' + divContenedor.id
        flecha.className = 'arrow'



        divContenedor.appendChild(linea)
        divContenedor.appendChild(flecha)
        contenedor.appendChild(divContenedor)
    }


    crearLinea(actual, anterior, contenedor) {
        this.crearFlecha('arrow-' + actual, anterior, actual, contenedor, 'black')
        let element = document.getElementById('arrow-' + actual)
        this.dibujarPath(element.dataset.from, element.dataset.to, element, element.dataset.color)

    }

    /**
     * Dibuja la flecha junto a su linea
     * en un angulo correcto
     * con la distancia correcta
     * @param from 
     * @param to 
     * @param flecha 
     * @param color 
     */
    dibujarPath(from, to, flecha, color) {
        let fromElement = document.getElementById(from)
        let toElement = document.getElementById(to)
        let coordenadas = this.obtenerDistanciaMin(fromElement, toElement)
        let angulo = this.obtenerAngulo(coordenadas)

        let linea = document.getElementById('linea-' + flecha.id)
        linea.style.width = (coordenadas[0]) + 'px'
        flecha.style.width = (coordenadas[0]) + 'px'

        if (this.mayor(fromElement, toElement)) angulo += 180

        let posicion = this.mismoAlto(fromElement, toElement)
        if (posicion) {
            if (posicion[0] === 1) coordenadas[1][1] = posicion[1]
            else if (posicion[0] === 2) coordenadas[1][0] = posicion[1]

            flecha.style.left = coordenadas[1][0] + 'px';
            flecha.style.top = coordenadas[1][1] + 'px';
            flecha.style.transform = 'rotate(' + angulo + 'deg)';
            flecha.style.transformOrigin = '0 0';
            if (color) {
                linea.style.borderColor = color;
                document.getElementById('flecha-' + flecha.id).style.borderLeft = '10px solid ' + color;
            }
            flecha.style.visibility = 'visible';
        }




    }

    ajustarNodos(raiz) {
        this.recalcularPosicion(raiz, null, "center", window.screen.width / 2 - 25)
        this.recalcularTodo()

    }

    /**
     * Con numeros muy grandes es necesario
     * correr los nodos
     * @param node 
     * @param anterior 
     * @param posicion 
     * @param x 
     * @returns 
     */
    recalcularPosicion(node, anterior, posicion, x) {

        if (node === null) return

        let width = document.getElementById('node-' + node.getId()).getBoundingClientRect().width
        let extra = (this.nodosCompletos(node) + this.getAltura(node)) * width / 2

        let left = x - extra - width

        let right = x + extra + 20

        if (anterior) {
            let ant = document.getElementById('node-' + anterior.getId()).getBoundingClientRect()
            let actual = document.getElementById('node-' + node.getId())
            let r = width / 2
            let izquierda = (x - r)
            izquierda = (izquierda < 0) ? 0 : izquierda
            actual.style.top = (ant.y + width + 50) + 'px'
            if (posicion === "right") actual.style.left = (x + r) + 'px'
            else if (posicion === "left") actual.style.left = izquierda + 'px'
        }
        else {

            let posicion = document.getElementById('node-' + node.getId()).getBoundingClientRect()
            let izquierda = (window.screen.width / 2) - (posicion.width / 2)
            izquierda = (izquierda < 0) ? 0 : izquierda
            document.getElementById('node-' + node.getId()).style.left = izquierda + 'px'
        }


        this.recalcularPosicion(node.getLeft(), node, "left", left - extra + width * 1.5)
        this.recalcularPosicion(node.getRight(), node, "right", right + extra - width * 1.5)
    }


    /**
     * Obtener la cantidad de nodos
     * @param node 
     * @returns 
     */
    nodosCompletos(node) {
        if (node === null) return 0
        if (node.getLeft() !== null && node.getRight() !== null) return this.nodosCompletos(node.getLeft()) + this.nodosCompletos(node.getRight()) + 1
        return this.nodosCompletos(node.getLeft()) + this.nodosCompletos(node.getRight())
    }

    /**
     * Obtener la altura del arbol
     * @param node 
     */
    getAltura(node) {
        if (node === null) return 0
        return 1 + Math.max(this.getAltura(node.getLeft()), this.getAltura(node.getRight()))
    }

    /**
     * Metodo para obtener la distancia entre ambos div
     * y colocar la flecha en el lugar correcto
     * de cada div
     * @param from Div de inicio
     * @param to Div final
     */
    obtenerDistanciaMin(from, to) {
        let fromElement = from.getBoundingClientRect()
        let toElement = to.getBoundingClientRect()

        let min1 = []
        let min2 = []

        let fromWidth = fromElement.right - fromElement.left
        let fromHeight = fromElement.bottom - fromElement.top
        let toWidth = fromElement.right - fromElement.left
        let toHeight = fromElement.bottom - fromElement.top

        let total1 = (fromWidth * 2) + (fromHeight * 2)
        let total2 = (toWidth * 2) + (toHeight * 2)




        let x1 = fromElement.left
        let y1 = fromElement.top

        let x2 = toElement.left
        let y2 = toElement.top

        let distanciaMinima = 100000
        let distancia = 0

        for (let i = 1; i <= total1; i++) {
            for (let j = 1; j <= total2; j++) {
                distancia = this.obtenerDistancia(x1, y1, x2, y2)

                if (distancia < distanciaMinima) {
                    distanciaMinima = distancia
                    min1 = [x1, y1]
                    min2 = [x2, y2]
                }

                [x2, y2] = this.obtenerCoordenadas(x2, y2, toElement)
            }

            x2 = toElement.left
            y2 = toElement.top

            let temp = this.obtenerCoordenadas(x1, y1, fromElement)
            x1 = temp[0]
            y1 = temp[1]

        }

        return [distanciaMinima, min1, min2]
    }

    /**
     * Obtener la distancia 
     * con la ecuacion de la recta
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     * @returns 
     */
    obtenerDistancia(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    }


    /**
     * Ajustar la punta de la flecha 
     * para que quede justo en el circulo
     * y no se pase o quede corto
     * @param x 
     * @param y 
     * @param div 
     * @returns 
     */
    obtenerCoordenadas(x, y, div) {
        if (x === div.right) {
            if (y === div.bottom) x--
            else y++
        }
        else {
            if (y === div.bottom) {
                if (x === div.left) {
                    if (y !== div.top) y--
                }
                else x--
            }
            else x++
        }

        return [x, y]
    }

    /**
     * Devuelve el angulo entre las coordenadas
     * entre divs
     * @param coordenadas 
     * @returns 
     */
    obtenerAngulo(coordenadas) {
        let x1 = coordenadas[1][0]
        let y1 = coordenadas[1][1]

        let x2 = coordenadas[2][0]
        let y2 = coordenadas[2][1]

        return Math.atan((y2 - y1) / (x2 - x1)) * 180 / Math.PI
    }

    /**
     * Obtener la posicion en x
     * y saber cual es mayor a cual
     * @param primero 
     * @param segundo 
     * @returns 
     */
    mayor(primero, segundo) {
        let p = primero.getBoundingClientRect()
        let s = segundo.getBoundingClientRect()

        return p.x > s.x
    }

    /**
     * Verificar si esta al mismo
     * alto los div
     * @param primero 
     * @param segundo 
     * @returns 
     */
    mismoAlto(primero, segundo) {
        let p = primero.getBoundingClientRect()
        let s = segundo.getBoundingClientRect()

        let primeroWidth = p.right - p.left
        let primeroHeight = p.bottom - p.top


        let segundoWidth = s.right - s.left
        let segundoHeight = s.bottom - s.top

        if (p.y >= s.y - primeroHeight && p.y <= s.y + primeroHeight) {
            if (p.x > s.x + segundoWidth || p.x < s.x) {
                let distancia = p.y + primeroHeight - s.y
                let y = s.y + distancia / 2
                return [1, y]
            }
            else return undefined
        }

        if (p.x >= s.x - primeroWidth && p.x <= s.x + primeroWidth) {
            if (p.y > s.y + segundoHeight || p.y < s.y) {
                let distancia = p.x + primeroWidth - s.x
                let x = s.x + distancia / 2
                return [2, x]
            }
            else undefined
        }

        return -1
    }


    recalcularTodo() {
        const arrows = document.getElementsByClassName('arrow-container');

        Array.from(arrows).forEach((element: any) => {
            this.dibujarPath(element.dataset.from, element.dataset.to, element, element.dataset.color);
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}