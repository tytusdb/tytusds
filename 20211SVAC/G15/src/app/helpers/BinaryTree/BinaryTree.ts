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


    public addNode(numero: number, contenedor,duracion) {
        let nodo = new NodeBinary(numero, this.id)
        this.id++

        if (this.raiz === null) {
            this.setRaiz(nodo)
            this.drawTree.addNode(nodo, "center", -1, contenedor,duracion,this.raiz)
            return true
        }

        return this.insertNode(nodo, this.raiz, this.raiz.getId(), contenedor,duracion)
    }




    private insertNode(nodo: NodeBinary, raiz: NodeBinary, id: number, contenedor,duracion) {
        if (raiz === null) {
            raiz = nodo
            this.drawTree.addNode(nodo, "center", -1, contenedor,duracion,this.raiz)
            return true
        }

        if (raiz.getNumero() > nodo.getNumero()) {
            if (raiz.getLeft() === null) {
                raiz.setLeft(nodo)
                this.drawTree.addNode(nodo, "left", raiz.getId(), contenedor,duracion,this.raiz)
                return true
            }
            return this.insertNode(nodo, raiz.getLeft(), raiz.getId(), contenedor,duracion)
        }
        else if (raiz.getNumero() < nodo.getNumero()) {
            if (raiz.getRight() === null) {
                raiz.setRight(nodo)
                this.drawTree.addNode(nodo, "right", raiz.getId(), contenedor,duracion,this.raiz)
                return true
            }
            return this.insertNode(nodo, raiz.getRight(), raiz.getId(), contenedor,duracion)
        }
        else return false
    }

}