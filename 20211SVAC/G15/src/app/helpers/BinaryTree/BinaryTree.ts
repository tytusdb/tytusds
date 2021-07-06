import { NodeBinary } from './NodeBinary'
import { DrawTree } from '../Draw/DrawTree'
export class BinaryTree {
    private raiz: NodeBinary
    private id: number;
    private drawTree: DrawTree;


    constructor() {
        this.raiz = null
        this.id = 0
        this.drawTree = new DrawTree()
    }

    public setRaiz(nodo: NodeBinary) {
        this.raiz = nodo
    }

    public getRaiz() {
        return this.raiz
    }


    public async update(numero: number | string, nuevo: number | string, duracion,animacion) {
        let result = await this.delete(numero, duracion,animacion)
        if (result !== undefined) {
            result = await this.addNode(nuevo, document.getElementById('tree'), duracion, animacion)
            return 1
        }
        return null
    }

    public addNode(numero: number | string, contenedor, duracion, dibujar) {
        let nodo = new NodeBinary(numero, this.id)
        this.id++

        if (this.raiz === null) {
            this.setRaiz(nodo)
            if (dibujar) this.drawTree.addNode(nodo, "center", -1, contenedor, duracion, this.raiz)
            return nodo
        }

        return this.insertNode(nodo, this.raiz, this.raiz.getId(), contenedor, duracion, dibujar)
    }

    public async search(numero: number | string, duracion) {
        if (this.raiz === null) return null
        if (this.raiz.getNumero() === numero) {
            await this.drawTree.animateNode('node-container-' + this.raiz.getId(), 'swing', duracion)
            return this.raiz
        }
        if (this.raiz.getNumero() >= numero) {
            await this.drawTree.animateNode('node-container-' + this.raiz.getId(), 'swing', duracion)
            return await this.buscarRecursivo(numero, duracion, this.raiz.getLeft())
        }
        return await this.buscarRecursivo(numero, duracion, this.raiz.getRight())
    }

    private async buscarRecursivo(numero: number | string, duracion, raiz: NodeBinary) {
        if (raiz === null) return null
        if (raiz.getNumero() === numero) {
            await this.drawTree.animateNode('node-container-' + raiz.getId(), 'swing', duracion)
            return raiz
        }
        if (raiz.getNumero() >= numero) {
            await this.drawTree.animateNode('node-container-' + raiz.getId(), 'swing', duracion)
            return await this.buscarRecursivo(numero, duracion, raiz.getLeft())
        }
        await this.drawTree.animateNode('node-container-' + raiz.getId(), 'swing', duracion)
        return await this.buscarRecursivo(numero, duracion, raiz.getRight())

    }


    public async delete(numero: number | string, duracion,animacion) {
        let result = await this.removeNode(this.raiz, numero, null, duracion,animacion)
        if(animacion) await this.drawTree.ajustarNodos(this.raiz)
        return result
    }

    private async removeNode(node: NodeBinary, numero: number | string, padre: NodeBinary, duracion, animacion): Promise<NodeBinary> {
        if (node === null) return undefined

        if (numero < node.getNumero()) {

            let subTree: NodeBinary = await this.removeNode(node.getLeft(), numero, node, duracion, animacion)
            node.setLeft(subTree)
            return node
        }
        else if (numero > node.getNumero()) {
            let subTree: NodeBinary = await this.removeNode(node.getRight(), numero, node, duracion, animacion)
            node.setRight(subTree)
            return node
        }
        else {
            if (node.getLeft() === null && node.getRight() === null) {
                if (animacion) await this.eliminarNodoHoja(node, duracion)
                if (node === this.raiz) this.raiz = null
                else node = null
                return null;
            }

            if (node.getLeft() === null) {
                if (animacion) await this.recalcularNodos(node.getRight(), node, padre, "right", duracion, true)
                if (node === this.raiz) this.raiz = this.raiz.getRight()
                else node = node.getRight()

                return node
            }

            if (node.getRight() === null) {
                if (animacion) await this.recalcularNodos(node.getLeft(), node, padre, "left", duracion, true)
                if (node === this.raiz) this.raiz = this.raiz.getLeft()
                else node = node.getLeft()

                return node
            }



            let aux: NodeBinary = await this.findMinNode(node.getRight())
            node.setNumero(aux.getNumero())

            if (animacion) {
                let div = document.getElementById('node-' + node.getId())
                div.innerHTML = '';
                let p = document.createElement('p');
                p.append('' + node.getNumero());
                div.appendChild(p);
            }

            let result = await this.removeNode(node.getRight(), aux.getNumero(), null, duracion, animacion)

            if (result !== null && animacion) {
                document.getElementById('tree').removeChild(document.getElementById('arrow-node-' + node.getRight().getId()))
                await this.drawTree.crearLinea('node-' + result.getId(), 'node-' + node.getId(), document.getElementById('tree'))
            }

            if (node === this.raiz) this.raiz.setRight(result)
            else node.setRight(result)


            return node

        }
    }





    private async eliminarNodoHoja(nodo, duracion) {
        let flecha = document.getElementById('arrow-node-' + nodo.getId())
        await this.drawTree.animateNode('node-container-' + nodo.getId(), 'zoomOut', duracion)
        let container = document.getElementById('node-container-' + nodo.getId())
        try {
            document.getElementById('tree').removeChild(flecha)
        } catch (e) { }
        document.getElementById('tree').removeChild(container)
        return 1
    }

    async recalcularNodos(node, anterior, padre, posicion, duracion, eliminar) {
        if (node === null) return null

        await this.mover(node, anterior, padre, posicion, duracion, eliminar)
        await this.recalcularNodos(node.getLeft(), node, null, "left", duracion, false)
        await this.recalcularNodos(node.getRight(), node, null, "right", duracion, false)
    }


    private async mover(nodo, anterior, padre, posicion, duracion, eliminar) {
        if (anterior === null) return
        let anteriorId = 'node-' + anterior.getId()
        let anteriorCoordenadas = document.getElementById(anteriorId).getBoundingClientRect()
        let actual = document.getElementById('node-' + nodo.getId())

        actual.style.top = (anteriorCoordenadas.y) + 'px'

        if (posicion === "right") actual.style.left = (anteriorCoordenadas.x) + 'px';
        else actual.style.left = (anteriorCoordenadas.x) + 'px';



        try {
            let flecha = document.getElementById('arrow-node-' + nodo.getId())
            document.getElementById('tree').removeChild(flecha)
            if (padre !== null) {
                flecha = document.getElementById('arrow-node-' + anterior.getId())
                document.getElementById('tree').removeChild(flecha)
            }


        } catch (e) { }
        if (padre !== null) await this.drawTree.crearLinea('node-' + nodo.getId(), 'node-' + padre.getId(), document.getElementById('tree'))
        if (eliminar) {
            await this.drawTree.animateNode('node-container-' + anterior.getId(), 'zoomOut', duracion)
            document.getElementById('tree').removeChild(document.getElementById('node-container-' + anterior.getId()))
        }
        else await this.drawTree.crearLinea('node-' + nodo.getId(), 'node-' + anterior.getId(), document.getElementById('tree'))


        return 1

    }


    private async findMinNode(nodo: NodeBinary): Promise<NodeBinary> {
        if (nodo.getLeft() === null) return nodo
        return await this.findMinNode(nodo.getLeft())

    }



    private insertNode(nodo: NodeBinary, raiz: NodeBinary, id: number, contenedor, duracion, dibujar) {
        if (raiz === null) {
            raiz = nodo
            if (dibujar) this.drawTree.addNode(nodo, "center", -1, contenedor, duracion, this.raiz)
            return nodo
        }

        if (raiz.getNumero() >= nodo.getNumero()) {
            if (raiz.getLeft() === null) {
                raiz.setLeft(nodo)
                if (dibujar) this.drawTree.addNode(nodo, "left", raiz.getId(), contenedor, duracion, this.raiz)
                return nodo
            }
            return this.insertNode(nodo, raiz.getLeft(), raiz.getId(), contenedor, duracion, dibujar)
        }
        else if (raiz.getNumero() < nodo.getNumero()) {
            if (raiz.getRight() === null) {
                raiz.setRight(nodo)
                if (dibujar) this.drawTree.addNode(nodo, "right", raiz.getId(), contenedor, duracion, this.raiz)
                return nodo
            }
            return this.insertNode(nodo, raiz.getRight(), raiz.getId(), contenedor, duracion, dibujar)
        }
        else return null
    }


    public generarJSON() {
        return this.obtenerJSON(this.raiz)
    }

    private obtenerJSON(nodo) {
        if (nodo === null) return []
        let temp = []
        temp.push(nodo.getNumero())
        let izq = this.obtenerJSON(nodo.getLeft())
        temp = temp.concat(izq)
        let der = this.obtenerJSON(nodo.getRight())
        temp = temp.concat(der)

        return temp

    }


    public searchWithOutAnimation(numero) {
        return this.busquedaRecursivaSinAnimacion(this.raiz, numero)
    }

    private busquedaRecursivaSinAnimacion(nodo, numero) {
        if (nodo === null) return null
        if (nodo.getNumero() < numero) return this.busquedaRecursivaSinAnimacion(nodo.getRight(), numero)
        if (nodo.getNumero() > numero) return this.busquedaRecursivaSinAnimacion(nodo.getLeft(), numero)
        if (nodo.getNumero() === numero) return nodo
        return null
    }


    public getViz(level, padre) {
        let data = {
            nodes: [],
            edges: []
        }

        if (this.raiz !== null) {
            let id = padre + "abb" + this.raiz.getId()
            data.edges.push({
                from: padre,
                to: id
            })
        }
        let result: any = this.preOrden(level, padre, this.raiz)
        data.nodes = data.nodes.concat(result.nodes)
        data.edges = data.edges.concat(result.edges)
        return data

    }

    public async getVizPadre(level) {
        let data = {
            nodes: [],
            edges: []
        }

        let result: any = await this.preOrdenPadre(level, this.raiz)
        //console.log(result)
        data.nodes = data.nodes.concat(result.nodes)
        data.edges = data.edges.concat(result.edges)
        return data

    }



    private preOrden(level, padre, raiz: NodeBinary) {
        let data = {
            nodes: [],
            edges: []
        }


        if (raiz === null) return data

        let id = padre + "abb" + raiz.getId()
        data.nodes.push({
            id: id,
            label: '' + raiz.getNumero(),
            level: level
        })

        if (raiz.getLeft() !== null) {
            let id2 = padre + "abb" + raiz.getLeft().getId()
            data.edges.push({
                from: id,
                to: id2
            })
        }


        if (raiz.getRight() !== null) {
            let id2 = padre + "abb" + raiz.getRight().getId()
            data.edges.push({
                from: id,
                to: id2
            })
        }

        let result: any = this.preOrden(level + 1, padre, raiz.getLeft())
        data.nodes = data.nodes.concat(result.nodes)
        data.edges = data.edges.concat(result.edges)

        result = this.preOrden(level + 1, padre, raiz.getRight())
        data.nodes = data.nodes.concat(result.nodes)
        data.edges = data.edges.concat(result.edges)

        return data

    }


    private async preOrdenPadre(level, raiz: NodeBinary) {
        let data = {
            nodes: [],
            edges: []
        }


        if (raiz === null) return data

        let id = "abb" + raiz.getId()
        data.nodes.push({
            id: id,
            label: '' + raiz.getNumero(),
            level: level
        })

        let resultado = await raiz.getEstructura().getVizHijo(level, id)
        data.nodes = data.nodes.concat(resultado.nodes)
        data.edges = data.edges.concat(resultado.edges)

        if (raiz.getLeft() !== null) {
            let id2 = "abb" + raiz.getLeft().getId()
            data.edges.push({
                from: id,
                to: id2
            })
        }


        if (raiz.getRight() !== null) {
            let id2 = "abb" + raiz.getRight().getId()
            data.edges.push({
                from: id,
                to: id2
            })
        }

        let result: any = await this.preOrdenPadre(level + 1, raiz.getLeft())
        data.nodes = data.nodes.concat(result.nodes)
        data.edges = data.edges.concat(result.edges)

        result = await this.preOrdenPadre(level + 1, raiz.getRight())
        data.nodes = data.nodes.concat(result.nodes)
        data.edges = data.edges.concat(result.edges)

        return data

    }




}