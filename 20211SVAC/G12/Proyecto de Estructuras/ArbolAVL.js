class Nodo{
    constructor(val) {
        this.val=val
        this.izq=null
        this.der=null
        this.altura=0
        this.x=0
        this.y=0
    }
}
class AVL{
    constructor() {
        this.raiz=null
        this.valores=0
    }

    Max(valor1, valor2) {
        if (valor1 > valor2) return valor1;
        return valor2;
    }

    altura(nodo) {
        if (nodo == null) return -1;
        return nodo.altura;
    }

    insertar(valor) {
        this.raiz = this.add(valor, this.raiz);
        this.valores++
    }

    add(val,nodo){
        if (nodo == null) return new Nodo(val)
        else{
            if (val<nodo.val){
                nodo.izq=this.add(val,nodo.izq)
                if (this.altura(nodo.der)-(this.altura(nodo.izq))==-2){
                    if (val < nodo.izq.val) {
                        nodo = this.RotacionIzquierda(nodo);
                    } else {
                        nodo = this.RotacionDobleIzquierda(nodo);
                    }
                }
            }else if (val > nodo.val) {
                nodo.der = this.add(val, nodo.der);
                if (this.altura(nodo.der) - this.altura(nodo.izq) == 2) {
                    if (val > nodo.der.val) {
                        nodo = this.RotacionDerecha(nodo);
                    } else {
                        nodo = this.RotacionDobleDerecha(nodo);
                    }
                }
            }else {
                nodo.val=val;
            }
        }
        nodo.altura=this.Max(this.altura(nodo.izq),this.altura(nodo.der))+1
        return nodo
    }
    RotacionIzquierda(nodo){
        let aux = nodo.izq;
        nodo.izq = aux.der;
        aux.der = nodo;
        nodo.altura = this.Max(this.altura(nodo.der), this.altura(nodo.izq)) + 1;
        aux.altura = this.Max(this.altura(nodo.izq), nodo.altura) + 1;
        return aux;
    }

    RotacionDobleIzquierda(nodo) {
        nodo.izq = this.RotacionDerecha(nodo.izq);
        return this.RotacionIzquierda(nodo);
    }

    RotacionDerecha(nodo) {
        var aux = nodo.der;
        nodo.der = aux.izq;
        aux.izq = nodo;
        nodo.altura = this.Max(this.altura(nodo.der), this.altura(nodo.izq)) + 1;
        aux.altura = this.Max(this.altura(nodo.der), nodo.altura) + 1;
        return aux;
    }

    RotacionDobleDerecha(nodo) {
        nodo.der = this.RotacionIzquierda(nodo.der);
        return this.RotacionDerecha(nodo);
    }

    graficar(){
        let tx=(150*this.valores)/2
        let ty=1
        this.graficarNodo(this.raiz,tx,ty)
    }

    graficarNodo(nodo,x,y){
        if (nodo!=null){
            console.log(nodo.val)
            console.log(nodo.altura)
            nodo.x=x
            nodo.y=(y)*75

            document.getElementById("result").innerHTML+=
                `<div class="circle" style="top: ${nodo.y+"px"};left: ${nodo.x + 'px'}" id=${"a" + nodo.val}>${nodo.val}</div><br />`;
           if (nodo.izq!==null){
               document.getElementById("result").innerHTML+=
                   `<div class="long-arrow-left" style="top: ${(nodo.y+75)+"px"};left: ${(nodo.x-45) + 'px'}" id=${"a" + nodo.val+"L"}></div><br />`;
           }
            if (nodo.der!==null){
                document.getElementById("result").innerHTML+=
                    `<div class="long-arrow-right" style="top: ${(nodo.y+75)+"px"};left: ${(nodo.x+105) + 'px'}" id=${"a" + nodo.val+"R"}></div><br />`;
            }
            this.graficarNodo(nodo.izq,(x-150),y+2)
            this.graficarNodo(nodo.der,(x+150),y+2)


        }
    }

}

