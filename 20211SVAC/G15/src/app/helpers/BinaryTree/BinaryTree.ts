import { NodeBinary } from './NodeBinary'
export class BinaryTree {
    private raiz: NodeBinary
    private id: number;

    constructor() {
        this.raiz = null
        this.id = 0
    }

    public setRaiz(nodo: NodeBinary) {
        this.raiz = nodo
    }

    public getRaiz() {
        return this.raiz
    }


    public addNode(numero: number) {
        let nodo = new NodeBinary(numero, this.id)
        this.id++

        if (this.raiz === null) {
            this.setRaiz(nodo)
            return true
        }

        return this.insertNode(nodo, this.raiz, this.raiz.getId() )
    }


  

    private insertNode(nodo: NodeBinary, raiz: NodeBinary, id: number) {
        if (raiz === null) {
            raiz = nodo
            return true
        }

        if (raiz.getNumero() > nodo.getNumero()) {
            if (raiz.getLeft() === null) {
                raiz.setLeft(nodo)
                return true
            }
            return this.insertNode(nodo, raiz.getLeft(), raiz.getId())
        }
        else if (raiz.getNumero() < nodo.getNumero()) {
            if (raiz.getRight() === null) {
                raiz.setRight(nodo)
                return true
            }
            return this.insertNode(nodo, raiz.getRight(), raiz.getId())
        }
        else return false
    }

}