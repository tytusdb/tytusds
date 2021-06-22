/* Binary Search Tree */

class Node {
    constructor(data, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }
  
  class BST {
    constructor() {
      this.root = null;
    }
    add(data) {
      const node = this.root;
      if (node === null) {
        this.root = new Node(data);
        return;
      } else {
        const searchTree = function(node) {
          if (data < node.data) {
            if (node.left === null) {
              node.left = new Node(data);
              return;
            } else if (node.left !== null) {
              return searchTree(node.left);
            }
          } else if (data > node.data) {
            if (node.right === null) {
              node.right = new Node(data);
              return;
            } else if (node.right !== null) {
              return searchTree(node.right);
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
      while (current.left !== null) {
        current = current.left;
      }
      return current.data;
    }
    findMax() {
      let current = this.root;
      while (current.right !== null) {
        current = current.right;
      }
      return current.data;
    }
    find(data) {
      let current = this.root;
      while (current.data !== data) {
        if (data < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
        if (current === null) {
          return null;
        }
      }
      return current;
    }
    isPresent(data) {
      let current = this.root;
      while (current) {
        if (data === current.data) {
          return true;
        }
        if (data < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
      return false;
    }
    remove(data) {
      const removeNode = function(node, data) {
        if (node == null) {
          return null;
        }
        if (data == node.data) {
          // node has no children 
          if (node.left == null && node.right == null) {
            return null;
          }
          // node has no left child 
          if (node.left == null) {
            return node.right;
          }
          // node has no right child 
          if (node.right == null) {
            return node.left;
          }
          // node has two children 
          var tempNode = node.right;
          while (tempNode.left !== null) {
            tempNode = tempNode.left;
          }
          node.data = tempNode.data;
          node.right = removeNode(node.right, tempNode.data);
          return node;
        } else if (data < node.data) {
          node.left = removeNode(node.left, data);
          return node;
        } else {
          node.right = removeNode(node.right, data);
          return node;
        }
      }
      this.root = removeNode(this.root, data);
    }
    isBalanced() {
      return (this.findMinHeight() >= this.findMaxHeight() - 1)
    }
    findMinHeight(node = this.root) {
        if (node == null) {
            return -1;
        };
        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);
        if (left < right) {
            return left + 1;
        } else {
            return right + 1;
        };
    }
    findMaxHeight(node = this.root) {
        if (node == null) {
            return -1;
        };
        let left = this.findMaxHeight(node.left);
        let right = this.findMaxHeight(node.right);
        if (left > right) {
            return left + 1;
        } else {
            return right + 1;
        };
    }

    inOrder() {
      if (this.root == null) {
        return null;
      } else {
        var result = new Array();
        function traverseInOrder(node) {       
          node.left && traverseInOrder(node.left);
          result.push(node.data);
          node.right && traverseInOrder(node.right);
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
          result.push(node.data);
          node.left && traversePreOrder(node.left);
          node.right && traversePreOrder(node.right);
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
          node.left && traversePostOrder(node.left);
          node.right && traversePostOrder(node.right);
          result.push(node.data);
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
                result.push(node.data);
                if (node.left != null) {
                    Q.push(node.left);
                };
                if (node.right != null) {
                    Q.push(node.right);
                };
            };
            return result;
        } else {
            return null;
        };
    };

    createData(raiz){ 
      if (raiz != null) {
        nodes.push({id: raiz.data, label: "Valor: " + raiz.data});
          if (raiz.left != null){
            edges.push({
              from: raiz.data,
              to: raiz.left.data,
              arrows: "to",
              physics: false,
              smooth: {type: "cubicBezier"},
            });
            //contador++;
          }
          if (raiz.right != null) {
            contador++;
            edges.push({
              from: raiz.data,
              to: raiz.right.data,
              arrows: "to",
              physics: false,
              smooth: {type: "cubicBezier"},
            });
          }
          this.createData(raiz.left)
          this.createData(raiz.right)
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
    // creating an array with nodes
    var root = bst.root;
    bst.createData(root)
    // creating an array with edges 
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

