class Nodo{
    constructor(valor){
        this.valor = valor;
        this.izquierdo = null;
        this.derecho = null;
    }
}
class bst{
    constructor(){
        this.raiz = null;
    }

    insertar(valor){
        if (this.raiz==null){
            this.raiz = new Nodo(valor);
        }else{
            this.add(valor,this.raiz);
        }


    }

    add(valor,nodo){
        if(valor<nodo.valor){
            if (nodo.izquierdo==null) add(valor,nodo.izquierdo);
            else nodo.izquierdo = new Nodo(valor);

        }else if(valor>nodo.valor){
            if(nodo.derecho==null) this.add(valor, nodo.derecho);
            else nodo.derecho = new Nodo(valor);
        }
    }
    search()
    preorden(nodo){
        if (nodo!=0){
            print(nodo.valor);

        }
    }
    enorden(nodo){
        if (nodo!=0){
            this.preorden(nodo.izquierdo);
            print(nodo.valor);
            this.preorden(nodo.derecho);
        }
    }
    postorden(nodo){
        this.preorden(nodo.izquierdo);
        this.preorden(nodo.derecho);
        print(nodo.valor);
    }
}

export default bst;
