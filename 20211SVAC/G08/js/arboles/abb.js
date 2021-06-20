class Nodo {
    constructor(dato){
        this.dato = dato;
        this.left = null;
        this.right = null;

    }
}

class BSTree{
    constructor(){
        this.root = null;
    }
    insertar(dato){
        let nodo = new Nodo(dato);
        if(this.root == null){
            this.root = nodo;

        } else {
            this.insertNode(this.root, nodo);

        }
    }
    insertNode(node, nuevoNodo){
        if(nuevoNodo.dato < node.dato){
            if(node.left == null){
                node.left = nuevoNodo;
            } else {
                this.insertNode(node.left, nuevoNodo);
            }
        } else {
            if (node.right == null){
                node.right = nuevoNodo;
            } else {
                this.insertNode(node.right, nuevoNodo);
            }
        }
    }
    inOrder(nodo){
        if(nodo != null){
            this.inOrder(nodo.left);
            console.log(nodo.dato);
            this.inOrder(nodo.right);
        }
    }
    preOrder(nodo){
        if(nodo != null){
            console.log(nodo.dato);
            this.preOrder(nodo.left);
            this.preOrder(nodo.right);
        }
    }
    postOrder(nodo){
        if(nodo != null){
            this.postOrder(nodo.left);
            this.postOrder(nodo.right);
            console.log(nodo.dato);
        }
    }
    
    getRoot(){
        return this.root;
    }
    buscar(nodo, datoF){
        if(nodo === null){
            return null;
        } else if(datoF < nodo.dato){
            return this.buscar(nodo.left, datoF);

        } else if(datoF > nodo.dato){
            return this.buscar(nodo.right, datoF);
        } else {
            return nodo;
        }
    }



}

const arbol = new BSTree();
arbol.insertar(15);
arbol.insertar(25);
arbol.insertar(10);
arbol.insertar(7);
arbol.insertar(22);
arbol.insertar(17);
arbol.insertar(13);
arbol.insertar(5);
arbol.insertar(9);
arbol.insertar(27);
const root = arbol.getRoot();
arbol.inOrder(root);
console.log("-------------");
arbol.preOrder(root);
console.log("-------------");

arbol.postOrder(root);
console.log("-------------");
console.log(arbol.buscar(root, 25));
