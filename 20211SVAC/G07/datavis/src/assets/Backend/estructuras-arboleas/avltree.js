class Nodo{
    constructor(valor){
        this.valor=valor;
        this.izquierdo=null;
        this.derecho=null;
        this.altura=0;
    }
}
class AVL{
    constructor(){
        this.raiz = null;
    }
    max(v1,v2){
        if (v1>v2) return v1;
        return v2;
    }
    insertar(valor){
        this.raiz = this.add(valor,this.raiz);
    }
    altura(nodo){
        if(nodo==null)return -1;
        return nodo.altura;
    }

    add(valor,nodo){
        if (nodo==null)return new Nodo(valor);
        else{
            if (valor < nodo.valor){
                nodo.izquierdo = this.add(valor, nodo.izquierdo)
                if (this.altura(nodo.derecho)-this.altura(nodo.izquierdo)==-2){
                    if(valor <nodo.izquierdo.valor){
                        nodo = this.RotIz(nodo);
                    }else{
                        nodo = this.RotDoIzq(nodo);
                    }
                }
            }else if(valor >nodo.valor){
                nodo.derecho = this.add(valor, nod.derecho);
                if (this.altura(nodo.derecho)-this.altura(nodo.izquierdo)==2){
                    if (valor <nodo.derecho.valor){
                        nodo = this.RotDer(nodo);
                    }else{
                        nodo = this.RotDoDer(nodo);
                    }
                }
            }else{
                nodo.valor = valor;
            }

        }
        nodo.altura = this.max(this.altura(nodo.izquierdo),this.altura(nodo.derecho))+1;
        return nodo;
    }


    RotIz(nodo){
        let aux = nodo.izquierdo;
        nodo.izquierdo = aux.derecho;
        aux.derecho= nodo;
        nodo.altura = this.max(this.altura(nodo.derecho),this.altura(nodo.izquierdo))+1;
        aux.altura = this.max(this.altura(nodo.izquierdo),this.altura(nodo.altura))+1;
        return aux;
    }
    RotDoIzq(nodo){
        nodo.izquierdo = this.RotDer(nodo);
        return this.RotIz(nodo);

    }

    RotDer(nodo){
        let aux = nodo.derecho;
        nodo.derecho=aux.izquierdo;
        nodo.altura = this.max(this.altura(nodo.derecho),this.altura(nodo.izquierdo))+1;
        aux.altura = this.max(this.altura(nodo.derecho),this.altura(nodo.altura))+1;
        return aux;
    }
    RotDoDer(nodo){
        nodo.derecho = this.RotIz(nodo);
        return this.RotDer(nodo);
    }

}

export default AVL;
