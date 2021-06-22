class Nodo {
    constructor(dato) {
        this.dato = dato
        this.hizq = null
        this.hder = null
        this.altura = 0
    }
}

class AVL {
    constructor() {
        this.raiz = null
    }

    max(num1, num2) {
        if (num1 > num2) {
            return num1
        } else {
            return num2
        }
    }

    altura(aux) {
        if (aux != null) {
            return aux.altura
        } else {
            return -1
        }
    }

    rsi(nodo) {
        let aux = nodo.hizq
        nodo.hizq = aux.hder
        aux.hder = nodo
        nodo.altura = this.max(this.altura(nodo.hder), this.altura(nodo.hizq)) + 1
        aux.altura = this.max(this.altura(nodo.hizq), nodo.altura) + 1
        return aux
    }

    rsd(nodo) {
        let aux = nodo.hder
        nodo.hder = aux.hizq
        aux.hizq = nodo
        nodo.altura = this.max(this.altura(nodo.hder), this.altura(nodo.hizq)) + 1
        aux.altura = this.max(this.altura(nodo.hder), nodo.altura) + 1
        return aux
    }

    rdi(nodo) {
        nodo.hizq = this.rsd(nodo.hizq)
        return this.rsi(nodo)
    }

    rdd(nodo) {
        nodo.hder = this.rsi(nodo.hder)
        return this.rsd(nodo)
    }

    agregar(valor, nodo) {
        if (nodo == null) {
            return new Nodo(valor)
        } else {
            if (valor < nodo.dato) {
                nodo.hizq = this.agregar(valor, nodo.hizq)
                if (this.altura(nodo.hder) - this.altura(nodo.hizq) == -2) {
                    if (valor < nodo.hizq.dato) {
                        nodo = this.rsi(nodo);
                    } else {
                        nodo = this.rdi(nodo);
                    }
                }
            } else if (valor > nodo.dato) {
                nodo.hder = this.agregar(valor, nodo.hder)
                if (this.altura(nodo.hder) - this.altura(nodo.hizq) == 2) {
                    if (valor > nodo.hder.dato) {
                        nodo = this.rsd(nodo);
                    } else {
                        nodo = this.rdd(nodo);
                    }
                }
            } else {
                nodo.dato = valor
            }
        }
        nodo.altura = this.max(this.altura(nodo.hizq), this.altura(nodo.hder)) + 1
        console.log(nodo)
        return nodo
    }

    inOrder(aux) {
        if (aux != null) {
            this.inOrder(aux.hizq)
            console.log(aux.dato, "|")
            this.inOrder(aux.hder)
        }
    }

    PrintInOrder() {
        this.inOrder(this.raiz)
    }

    PreOrder(aux) {
        if (aux != null) {
            console.log(aux.dato, "|")
            this.PreOrder(aux.hizq)
            this.PreOrder(aux.hder)
        }
    }

    PrintPreOrder() {
        this.PreOrder(this.raiz)
    }

    PostOrder(aux) {
        if (aux != null) {
            this.PostOrder(aux.hizq)
            this.PostOrder(aux.hder)
            console.log(aux.dato, "|")
        }
    }

    PrintPostOrder() {
        this.PostOrder(this.raiz)
    }

    insertar(value) {
        this.raiz = this.agregar(value, this.raiz)
    }
}

function lol() {
    var no = new AVL();
    no.insertar(10);
    no.insertar(30);
    no.insertar(20);
    no.insertar(5);
    no.PrintInOrder();

}

lol();