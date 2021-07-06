class Nodo {
    constructor(valor,pos_x,pos_y){
        this.valor = valor;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.siguiente = null;
        this.anterior = null;
        this.arriba = null;
        this.abajo = null;
        this.izq = null;
        this.der = null;
    }
}

class llist{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.tamano = 0;
    } 

    ordenar(nodo){
        let temp = this.primero;
        this.ultimo.siguiente = nodo;
        nodo.anterior = this.ultimo;
        this.ultimo = nodo;

    }

    insertar(valor){
        let nodo = new Nodo(valor,null,null);
        if(this.primero == null){
            this.primero = nodo;
            this.ultimo = nodo;
            return;    
        }else{
            let temp = this.primero;
            while(temp != null){
                if(temp.valor < nodo.valor){
                    temp = temp.siguiente;
                }else{
                    if(temp==this.primero){
                        nodo.siguiente = temp;
                        temp.anterior = nodo;
                        this.primero = nodo;
                        return;
                    }else{
                        nodo.anterior = temp.anterior;
                        temp.anterior.siguiente = nodo;
                        nodo.siguiente = temp;
                        temp.anterior = nodo;
                        return;
                    }
                }
            }
            this.ultimo.siguiente = nodo;
            nodo.anterior = this.ultimo;
            this.ultimo = nodo;
        }
    }

    busqueda(valor){
        let temp = this.primero;
        while(temp != null){
            if(temp.valor == valor){
                return temp;
            }
            temp = temp.siguiente
        }
        return null;
    }

    updateValor(valor,pos_x,pos_y){
        let temp = this.primero;
        while(temp!=null){
            if(temp.pos_x == pos_x && temp.pos_y == pos_y){
                temp.valor = valor;
            }
            temp = temp.siguiente;
        }
        return null;
    }

}


class BST {
    constructor() {
      this.root = null;
    }
    add(valor) {
      const node = this.root;
      if (node === null) {
        this.root = new Nodo(valor);
        return;
      } else {
        const searchTree = function(node) {
          if (valor < node.valor) {
            if (node.izq === null) {
              node.izq = new Nodo(valor);
              return;
            } else if (node.izq !== null) {
              return searchTree(node.izq);
            }
          } else if (valor > node.valor) {
            if (node.der === null) {
              node.der = new Nodo(valor);
              return;
            } else if (node.der !== null) {
              return searchTree(node.der);
            }
          } else {
            return null;
          }
        };
        return searchTree(node);
      }
    }
    findMin() {
      let current = this.root;
      while (current.izq !== null) {
        current = current.izq;
      }
      return current.valor;
    }
    findMax() {
      let current = this.root;
      while (current.der !== null) {
        current = current.der;
      }
      return current.valor;
    }
    find(valor) {
      let current = this.root;
      while (current.valor !== valor) {
        if (valor < current.valor) {
          current = current.izq;
        } else {
          current = current.der;
        }
        if (current === null) {
          return null;
        }
      }
      return current;
    }
    isPresent(valor) {
      let current = this.root;
      while (current) {
        if (valor === current.valor) {
          return true;
        }
        if (valor < current.valor) {
          current = current.izq;
        } else {
          current = current.der;
        }
      }
      return false;
    }
    remove(valor) {
      const removeNodo = function(node, valor) {
        if (node == null) {
          return null;
        }
        if (valor == node.valor) {
          // node has no children 
          if (node.izq == null && node.der == null) {
            return null;
          }
          // node has no izq child 
          if (node.izq == null) {
            return node.der;
          }
          // node has no der child 
          if (node.der == null) {
            return node.izq;
          }
          // node has two children 
          var tempNodo = node.der;
          while (tempNodo.izq !== null) {
            tempNodo = tempNodo.izq;
          }
          node.valor = tempNodo.valor;
          node.der = removeNodo(node.der, tempNodo.valor);
          return node;
        } else if (valor < node.valor) {
          node.izq = removeNodo(node.izq, valor);
          return node;
        } else {
          node.der = removeNodo(node.der, valor);
          return node;
        }
      }
      this.root = removeNodo(this.root, valor);
    }
    isBalanced() {
      return (this.findMinHeight() >= this.findMaxHeight() - 1)
    }
    findMinHeight(node = this.root) {
        if (node == null) {
            return -1;
        };
        let izq = this.findMinHeight(node.izq);
        let der = this.findMinHeight(node.der);
        if (izq < der) {
            return izq + 1;
        } else {
            return der + 1;
        };
    }
    findMaxHeight(node = this.root) {
        if (node == null) {
            return -1;
        };
        let izq = this.findMaxHeight(node.izq);
        let der = this.findMaxHeight(node.der);
        if (izq > der) {
            return izq + 1;
        } else {
            return der + 1;
        };
    }

    inOrder() {
      if (this.root == null) {
        return null;
      } else {
        var result = new Array();
        function traverseInOrder(node) {       
          node.izq && traverseInOrder(node.izq);
          result.push(node.valor);
          node.der && traverseInOrder(node.der);
        }
        traverseInOrder(this.root);
        return result;
      };
    }
    preOrder() {
      if (this.root == null) {
        return null;
      } else {
        var result = new Array();
        function traversePreOrder(node) {
          result.push(node.valor);
          node.izq && traversePreOrder(node.izq);
          node.der && traversePreOrder(node.der);
        };
        traversePreOrder(this.root);
        return result;
      };
    }
    postOrder() {
      if (this.root == null) {
        return null;
      } else {
        var result = new Array();
        function traversePostOrder(node) {
          node.izq && traversePostOrder(node.izq);
          node.der && traversePostOrder(node.der);
          result.push(node.valor);
        };
        traversePostOrder(this.root);
        return result;
      }
    }
    
    levelOrder() {
        let result = [];
        let Q = []; 
        if (this.root != null) {
            Q.push(this.root);
            while(Q.length > 0) {
                let node = Q.shift();
                result.push(node.valor);
                if (node.izq != null) {
                    Q.push(node.izq);
                };
                if (node.der != null) {
                    Q.push(node.der);
                };
            };
            return result;
        } else {
            return null;
        };
    };

    createData(raiz,cont,x,y){
      var contador = cont;
      var x_pos = x;
      var y_pos = y;

      if (raiz != null) {
        console.log(raiz.valor + 'A' + contador);
        nodes.push({id: raiz.valor + 'A' + contador, label: "Valor: " + raiz.valor, x: x_pos, y: y_pos});
          if (raiz.izq != null){
            edges.push({
              from: raiz.valor + 'A' + contador,
              to: raiz.izq.valor + 'A' + contador,
              arrows: "to",
              physics: false,
              smooth: {type: "cubicBezier"},
            });
          }
          if (raiz.der != null) {
            console.log(raiz.valor);
            edges.push({
             from: raiz.valor +'A' + contador,
             to: raiz.der.valor+ 'A' + contador,
             arrows: "to",
             physics: false,
             smooth: {type: "cubicBezier"},
            });
          }
          this.createData(raiz.izq,contador,x,y)
          this.createData(raiz.der,contador,x,y)
      }
  }
  }


 class compuesta{
     constructor(){
         this.lista = new llist();
     }

     insertar(valor, valor2){
        let nodX = this.lista.busqueda(valor);
        //console.log(nodX);
        //console.log(nodY);
        if(nodX==null){
            this.No_Existen(valor,valor2);
        }else if(nodX!=null){
            this.ExisteVertical(valor,valor2);
        }
    }

    No_Existen(valor,valor2){
        this.lista.insertar(valor);
        let nodo_x = this.lista.busqueda(valor);
        let myBBS = new BST();
        myBBS.add(valor2);
        nodo_x.abajo = myBBS;
    }

    ExisteVertical(valor,valor2){
        let nodo_x = this.lista.busqueda(valor);
        let arbol = nodo_x.abajo;
        arbol.add(valor2);
    }

    displayLista(){
        var temp = this.lista.primero;
        var x_pos = -150;
        var y_pos = -150;
        var cad = "";
        var contador = 0;
        while(temp.siguiente != null){
            nodes.push({id: temp.valor + "_" + contador + "L", label: "Valor: " + temp.valor, x: x_pos, y: y_pos});
            edges.push({
                from:  temp.valor + "_" + contador + "L",
                to: temp.siguiente.valor + "_" + contador + "L",
                arrows: "to",
                physics: false,
                smooth: {type: "cubicBezier"},
              });
            edges.push({
                from:  temp.siguiente.valor + "_" + contador + "L",
                to: temp.valor + "_" + contador + "L",
                arrows: "to",
                physics: false,
                smooth: {type: "cubicBezier"},
              });
            
            cad += temp.valor + " -> " ;
            temp = temp.siguiente;
            x_pos +=120;
            const arbol = temp.abajo.root;
            edges.push({
                from: temp.valor + "_" + contador + "L",
                to: arbol.valor + 'A' + contador,
                arrows: "to",
                physics: false,
                smooth: {type: "cubicBezier"},
              });
            temp.abajo.createData(arbol,contador,-50,50);
            console.log(arbol.valor);
            contador++;
        }
        contador++;
        const arbol = temp.abajo.root;
        nodes.push({id: temp.valor + "_" + contador + "L", label: "Valor: " + temp.valor, x: x_pos, y: y_pos});
        temp.abajo.createData(arbol,contador,-50,50);
        //temp.abajo.createData(arbol,contador);
        //console.log(arbol.valor);

        cad += temp.valor;
        console.log(cad);
    }
    

 }

const myCompuesta = new compuesta();
var nodes = [];
var edges = [];

function AbrirArchivo(files){
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function(event){
      contents = event.target.result;
      var json = JSON.parse(contents);
      //console.log(json.m);
      var count = Object.keys(json.valores).length;
      for (let index = 0; index < count; index++) {
        myCompuesta.insertar(json.valores[index].principal,json.valores[index].secundario);
      }
      graficar();
    };
    reader.onerror = function(event) {
      console.error("File could not be read! Code " + event.target.error.code);
    };
    reader.readAsText(file);
}

function graficar(){
    // creating an array with nodes
    // create an array with edges
    myCompuesta.displayLista();
    // create a network
    var container = document.getElementById("miRed");
    var data = {
      nodes: nodes,
      edges: edges,
    };

    const options = {
  
        nodes: {
          shape: "box",
        },
    
        physics: {
          hierarchicalRepulsion: {
            nodeDistance: 110,
          },
        },
        layout: {
          hierarchical: {
              levelSeparation: 100,
              nodeSpacing: 100,
              parentCentralization: true,
              direction: 'UD',        // UD, DU, LR, RL
              sortMethod: 'directed',  // hubsize, directed
              shakeTowards: 'roots'  // roots, leaves                        
          },
        }, 
      };
    var network = new vis.Network(container, data, options);
  
}




