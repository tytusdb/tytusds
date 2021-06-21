class Nodo{
    constructor(dato) {
    this.dato = dato;
    this.izquierdo=null;
    this.derecho=null;
    }
}

class BinaryTree{
    constructor() {
        this.raiz = null;
    }

   
    preOrden(){
        this.pre_orden(this.raiz);
    }

    pre_orden(nodo){
        if(nodo!=null){
            console.log("Valor:",nodo.dato);
            this.pre_orden(nodo.izquierdo);
            this.pre_orden(nodo.derecho);
        }
    }

   
    postOrden(){
        this.post_orden(this.raiz);
    }
    post_orden(nodo){
        if(nodo!=null){
            this.post_orden(nodo.izquierdo);
            this.post_orden(nodo.derecho);
            console.log("Dato:",nodo.dato);
        }
    }
    inOrden(){
        this.in_orden(this.raiz);
    }
    in_orden(nodo){
        if(nodo!=null){ // va recorriendo los datos hasta que sea null
            this.in_orden(nodo.izquierdo);//reccore lado izquierdo
            console.log("Dato:",nodo.dato);
            this.in_orden(nodo.derecho);
             //recorre lado derecho
             //la raiz se recorre dependiendo de la raiz del nivel 0, si es izquierda o derecha
        }
    }
    agregarNuevoDato(dato){
        this.raiz = this.agregarDato(dato, this.raiz);
    }

    agregarDato(dato, nodo){
        if (nodo == null){
            return new Nodo(dato);
        }else{
            if ( dato > nodo.dato){
                nodo.derecho = this.agregarDato(dato, nodo.derecho);
            }else {
                nodo.izquierdo = this.agregarDato(dato, nodo.izquierdo);
            }
        }
        return nodo;
    }

}

module.exports = BinaryTree;

var abb = new BinaryTree();

abb.agregarNuevoDato(5)
abb.agregarNuevoDato(3)
abb.agregarNuevoDato(8)
abb.agregarNuevoDato(7)
abb.agregarNuevoDato(9)
abb.agregarNuevoDato(4)
abb.agregarNuevoDato(2)
abb.inOrden();