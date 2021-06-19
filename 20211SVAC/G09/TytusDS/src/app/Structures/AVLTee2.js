class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.izquierdo = null;
        this.derecho = null;
        this.altura = 0;
    }
}

class AVLTree {
    constructor() {
        this.raiz = null;
    }

    MAX(primerValor, SegundoValor) {
        if (primerValor > SegundoValor) return primerValor;
        return SegundoValor;
    }

    altura(nodoTree) {
        if (nodoTree == null) return -1;
        return nodoTree.altura;
    }

    insertar(dato) {
        this.raiz = this.add(dato, this.raiz);
    }

    add(dato, nodoTree) {
        if (nodoTree == null) return new Nodo(dato);
        else {
            if (dato < nodoTree.dato) {
                nodoTree.izquierdo = this.add(dato, nodoTree.izquierdo)
                if (this.altura(nodoTree.derecho) - this.altura(nodoTree.izquierdo) == -2) {
                    if (dato < nodoTree.izquierdo.dato) {
                        nodoTree = this.LeftRotation(nodoTree);
                    } else {
                        nodoTree = this.DoubleRotationLeft(nodoTree);
                    }
                }
            } else if (dato > nodoTree.dato) {
                nodoTree.derecho = this.add(dato, nodoTree.derecho);
                if (this.altura(nodoTree.derecho) - this.altura(nodoTree.izquierdo) == 2) {
                    if (dato > nodoTree.derecho.dato) {
                        nodoTree = this.RightRotation(nodoTree);
                    } else {
                        nodoTree = this.DoubleRotationRight(nodoTree);
                    }
                }
            } else {
                nodoTree.dato = dato;
            }
        }
        nodoTree.altura = this.MAX(this.altura(nodoTree.izquierdo), this.altura(nodoTree.derecho)) + 1
        return nodoTree;
    }

    _

    LeftRotation(nodoTree) {
        let aux = nodoTree.izquierdo;
        nodoTree.izquierdo = aux.derecho;
        aux.derecho = nodoTree;
        nodoTree.altura = this.MAX(this.altura(nodoTree.derecho), this.altura(nodoTree.izquierdo)) + 1;
        aux.altura = this.MAX(this.altura(nodoTree.izquierdo), nodoTree.altura) + 1;
        return aux;
    }

    DoubleRotationLeft(nodoTree) {
        nodoTree.izquierdo = this.RightRotation(nodoTree.izquierdo);
        return this.LeftRotation(nodoTree);
    }

    RightRotation(nodoTree) {
        var aux = nodoTree.derecho;
        nodoTree.derecho = aux.izquierdo;
        aux.izquierdo = nodoTree;
        nodoTree.altura = this.MAX(this.altura(nodoTree.derecho), this.altura(nodoTree.izquierdo)) + 1;
        aux.altura = this.MAX(this.altura(nodoTree.derecho), nodoTree.altura) + 1;
        return aux;
    }

    DoubleRotationRight(nodoTree) {
        nodoTree.derecho = this.LeftRotation(nodoTree.derecho);
        return this.RightRotation(nodoTree);
    }


    preOrden() {
        this.pre_orden(this.raiz);
    }

    pre_orden(nodoTree) {
        if (nodoTree != null) {
            console.log("Valor:", nodoTree.dato);
            this.pre_orden(nodoTree.izquierdo);
            this.pre_orden(nodoTree.derecho);
        }
    }

    inOrden() {
        this.in_orden(this.raiz);
    }

    in_orden(nodoTree) {
        if (nodoTree != null) {
            this.in_orden(nodoTree.izquierdo);
            console.log("Valor:", nodoTree.dato);
            this.in_orden(nodoTree.derecho);
        }
    }

    postOrden() {
        this.post_orden(this.raiz);
    }

    post_orden(nodoTree) {
        if (nodoTree != null) {
            this.post_orden(nodoTree.izquierdo);
            this.post_orden(nodoTree.derecho);
            console.log("Valor:", nodoTree.dato);
        }
    }
}

var avl = new AVLTree();
avl.insertar(1)
avl.insertar(2)
avl.insertar(3)
avl.insertar(4)
avl.insertar(5)
avl.insertar(6)
avl.insertar(7)
avl.insertar(8)
avl.insertar(9)
avl.inOrden()

//
// preorden = 4,2,1,3,8,6,5,7,10,9,11
// inorden = 1,2,3,4,5,6,7,8,9,10,11
// postorden = 1,3,2,5,7,6,9,11,10,8,4