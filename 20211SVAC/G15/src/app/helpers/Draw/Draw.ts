export class Draw {

    constructor(){}
    
    posicionesRight(div, div2) {
        return {
            
            x1: div.getBoundingClientRect().right,
            x2: div2.getBoundingClientRect().left + 50,
            y1: div.getBoundingClientRect().top + div.offsetHeight / 2 - 5,
            y2: div2.getBoundingClientRect().top + div2.offsetHeight / 2 - 5,
            color: 'red'
        }
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

    
    removerElemento(id) {
        try {
            document.getElementById(id).remove()
        } catch (e) { }

    }

    
    crearNodo(numero, id) {
        let div = document.createElement('div')
        div.className = "node animate__animated ml-5"
        div.id = "nodo" + id
        div.textContent = numero
        return div
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


}