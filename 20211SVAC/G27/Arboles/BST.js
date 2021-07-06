/* Binary Search Tree */

class Node {
    constructor(valor, izq = null, der = null) {
      this.valor = valor;
      this.izq = izq;
      this.der = der;
    }
  }
  
  class BST {
    constructor() {
      this.root = null;
    }
    add(valor) {
      const node = this.root;
      if (node === null) {
        this.root = new Node(valor);
        return;
      } else {
        const searchTree = function(node) {
          if (valor < node.valor) {
            if (node.izq === null) {
              node.izq = new Node(valor);
              return;
            } else if (node.izq !== null) {
              return searchTree(node.izq);
            }
          } else if (valor > node.valor) {
            if (node.der === null) {
              node.der = new Node(valor);
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
      const removeNode = function(node, valor) {
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
          var tempNode = node.der;
          while (tempNode.izq !== null) {
            tempNode = tempNode.izq;
          }
          node.valor = tempNode.valor;
          node.der = removeNode(node.der, tempNode.valor);
          return node;
        } else if (valor < node.valor) {
          node.izq = removeNode(node.izq, valor);
          return node;
        } else {
          node.der = removeNode(node.der, valor);
          return node;
        }
      }
      this.root = removeNode(this.root, valor);
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

    createData(raiz){ 
      if (raiz != null) {
        nodes.push({id: raiz.valor, label: "Valor: " + raiz.valor});
          if (raiz.izq != null){
            edges.push({
              from: raiz.valor,
              to: raiz.izq.valor,
              arrows: "to",
              physics: false,
              smooth: {type: "cubicBezier"},
            });
            //contador++;
          }
          if (raiz.der != null) {
            contador++;
            edges.push({
              from: raiz.valor,
              to: raiz.der.valor,
              arrows: "to",
              physics: false,
              smooth: {type: "cubicBezier"},
            });
          }
          this.createData(raiz.izq)
          this.createData(raiz.der)
      }
  }
  }

  const bst = new BST();
  var nodes = [];
  var edges = [];
  var contador = 0;
  function graficar(){

    var x_pos = -150;
    var y_pos = 0;
    var contador = 0;       
    nodes = [];
    edges = [];
    // creating an array with nodes
    var root = bst.root;
    bst.createData(root)
    // creating an array with edges 
    // create a network
    var container = document.getElementById("miRed");
    var valor = {
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
    var network = new vis.Network(container, valor, options);
  
  }
  

  function agregarValor(){
    var x = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    bst.add(x);
    document.getElementById("newValue").focus();
    graficar();
  }

  function eliminar(){
    var x = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    bst.remove(x);
    document.getElementById("newValue").focus();
    document.getElementById('GFG').innerHTML = 'Removido!';
    graficar();
  }

  function buscar(){
    var x = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    console.log(bst.find(x))
    /*  document.getElementById('GFG').innerHTML = 'Encontrado!';
    }else{
      document.getElementById('GFG').innerHTML = 'No Encontrado!';
    }
    document.getElementById("newValue").focus();
  }*/
  
  }
  //here I load a JSON Files
function AbrirArchivo(files){
  var file = files[0];
  var reader = new FileReader();
  reader.onload = function(event){
    var contents = event.target.result;
    var json = JSON.parse(contents);
    var count = Object.keys(json.valores).length;
    for (let index = 0; index < count; index++) {
      bst.add(json.valores[index]); 
    }
    graficar();
  };
  reader.onerror = function(event) {
    console.error("File could not be read! Code " + event.target.error.code);
};
  reader.readAsText(file);
}

function inorden(){
  document.getElementById('GFG').innerHTML = 'inOrden: ' + bst.inOrder();
}

function preorden(){
  document.getElementById('GFG').innerHTML = 'preOrden: ' + bst.preOrder();
}

function postorden(){
  document.getElementById('GFG').innerHTML = 'postOrden: ' + bst.postOrder();
}

