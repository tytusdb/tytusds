class Nodo{
    constructor(valor) {
    this.valor = valor;
    this.izquierdo=null;
    this.derecho=null;
    this.altura = 0;
    this.x = 0;
    this.y = 0;
    }
}

class Arbol_Binario{
    constructor() {
        this.raiz = null;
        this.valores = 0;
    }

    MAXIMO(valor1, valor2) {
        if (valor1 > valor2) return valor1;
        return valor2;
    }

    altura(nodo) {
        if (nodo == null) return -1;
        return nodo.altura;
    }

    insertar(valor){
        this.raiz = this.add(valor, this.raiz);
        this.valores++;
    }

    add(valor, nodo){
        if (nodo == null){
            return new Nodo(valor);
        }else{
            if ( valor > nodo.valor){
                nodo.derecho = this.add(valor, nodo.derecho);
            }else {
                nodo.izquierdo = this.add(valor, nodo.izquierdo);
            }
        }
        nodo.altura = this.MAXIMO(this.altura(nodo.izquierdo), this.altura(nodo.derecho)) + 1
        return nodo;
    }

    preOrden(){
        this.pre_orden(this.raiz);
    }

    pre_orden(nodo){
        if(nodo!=null){
            console.log("Valor:",nodo.valor);
            this.pre_orden(nodo.izquierdo);
            this.pre_orden(nodo.derecho);
        }
    }

    inOrden(){
        this.in_orden(this.raiz);
    }

    in_orden(nodo){
        if(nodo!=null){
            this.in_orden(nodo.izquierdo);
            console.log("Valor:",nodo.valor);
            this.in_orden(nodo.derecho);
        }
    }

    postOrden(){
        this.post_orden(this.raiz);
    }
    post_orden(nodo){
        if(nodo!=null){
            this.post_orden(nodo.izquierdo);
            this.post_orden(nodo.derecho);
            console.log("Valor:",nodo.valor);
        }
    }

    graficar(){
        let tx=(150*this.valores)/2
        let ty=1
        let temp=[this.raiz.altura]
        console.log(temp)
        this.graficarNodo(this.raiz,tx,ty,150*(this.raiz.altura+1))
    }
    
    graficarNodo(nodo,x,y,d){
        if (nodo!=null){
            console.log(nodo.valor)
            console.log(nodo.altura)
            nodo.x=x
            nodo.y=(y)*75
    
            document.getElementById("result").innerHTML+=
                `<div class="circle" style="top: ${nodo.y+"px"};left: ${nodo.x + 'px'}" id=${"a" + nodo.valor}>${nodo.valor}</div><br />`;
           if (nodo.izquierdo!==null){
               document.getElementById("result").innerHTML+=
                   `<div class="long-arrow-left" style="top: ${(nodo.y+75)+"px"};left: ${(nodo.x-45) + 'px'}" id=${"a" + nodo.valor+"L"}></div><br />`;
           }
            if (nodo.derecho!==null){
                document.getElementById("result").innerHTML+=
                    `<div class="long-arrow-right" style="top: ${(nodo.y+75)+"px"};left: ${(nodo.x+105) + 'px'}" id=${"a" + nodo.valor+"R"}></div><br />`;
            }
            this.graficarNodo(nodo.izquierdo,(x-parseInt(d)/2),y+2,d/2)
            this.graficarNodo(nodo.derecho,(x+parseInt(d)/2),y+2,d/2) 
        }
    }
}

/* Implementacion */

let abb = new Arbol_Binario();

function insertar_nodo(){
    var dato = document.getElementById('dato_pag').value;
    var dato=parseInt(dato)
    document.getElementById("result").innerHTML="";

    abb.insertar(dato);
    /*abb.insertar(1)
    abb.insertar(10)
    abb.insertar(5)
    abb.insertar(3)
    abb.insertar(14)
    abb.insertar(6)
    abb.insertar(7)
    abb.insertar(11)
    abb.insertar(0)
    abb.insertar(17)*/
    abb.graficar();
}

