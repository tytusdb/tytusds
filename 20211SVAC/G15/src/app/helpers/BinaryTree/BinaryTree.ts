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


    public async update(numero: number | string, nuevo: number | string, duracion) {
        let result = await this.delete(numero, duracion)
        if (result !== undefined) {
            result = await this.addNode(nuevo, document.getElementById('tree'), duracion)
            return 1
        }
        return 0
    }

    public addNode(numero: number | string, contenedor, duracion) {
        let nodo = new NodeBinary(numero, this.id)
        this.id++

        if (this.raiz === null) {
            this.setRaiz(nodo)
            this.drawTree.addNode(nodo, "center", -1, contenedor, duracion, this.raiz)
            return true
        }

        return this.insertNode(nodo, this.raiz, this.raiz.getId(), contenedor, duracion)
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


    public async delete(numero: number | string, duracion) {
        let result = await this.removeNode(this.raiz, numero, null, duracion)
        await this.drawTree.ajustarNodos(this.raiz)
        return result
    }

    private async removeNode(node: NodeBinary, numero: number | string, padre: NodeBinary, duracion): Promise<NodeBinary> {
        if (node === null) return undefined

        if (numero < node.getNumero()) {

            let subTree: NodeBinary = await this.removeNode(node.getLeft(), numero, node, duracion)
            node.setLeft(subTree)
            return node
        }
        else if (numero > node.getNumero()) {
            let subTree: NodeBinary = await this.removeNode(node.getRight(), numero, node, duracion)
            node.setRight(subTree)
            return node
        }
        else {
            if (node.getLeft() === null && node.getRight() === null) {
                await this.eliminarNodoHoja(node, duracion)
                if (node === this.raiz) this.raiz = null
                else node = null
                return null;
            }

            if (node.getLeft() === null) {
                await this.recalcularNodos(node.getRight(), node, padre, "right", duracion, true)
                if (node === this.raiz) this.raiz = this.raiz.getRight()
                else node = node.getRight()

                return node
            }

            if (node.getRight() === null) {
                await this.recalcularNodos(node.getLeft(), node, padre, "left", duracion, true)
                if (node === this.raiz) this.raiz = this.raiz.getLeft()
                else node = node.getLeft()

                return node
            }



            let aux: NodeBinary = await this.findMinNode(node.getRight())
            node.setNumero(aux.getNumero())

            let div = document.getElementById('node-' + node.getId())
            div.innerHTML = '';
            let p = document.createElement('p');
            p.append('' + node.getNumero());
            div.appendChild(p);
            let result = await this.removeNode(node.getRight(), aux.getNumero(), null, duracion)

            if (result !== null) {
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



    private insertNode(nodo: NodeBinary, raiz: NodeBinary, id: number, contenedor, duracion) {
        if (raiz === null) {
            raiz = nodo
            this.drawTree.addNode(nodo, "center", -1, contenedor, duracion, this.raiz)
            return true
        }

        if (raiz.getNumero() >= nodo.getNumero()) {
            if (raiz.getLeft() === null) {
                raiz.setLeft(nodo)
                this.drawTree.addNode(nodo, "left", raiz.getId(), contenedor, duracion, this.raiz)
                return true
            }
            return this.insertNode(nodo, raiz.getLeft(), raiz.getId(), contenedor, duracion)
        }
        else if (raiz.getNumero() < nodo.getNumero()) {
            if (raiz.getRight() === null) {
                raiz.setRight(nodo)
                this.drawTree.addNode(nodo, "right", raiz.getId(), contenedor, duracion, this.raiz)
                return true
            }
            return this.insertNode(nodo, raiz.getRight(), raiz.getId(), contenedor, duracion)
        }
        else return false
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


  

}