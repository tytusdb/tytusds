class Node {
    constructor(data, next, anterior) {
        this.data = data;
        this.next = next;
        this.anterior = anterior;
        this.arbol = tree;
    };
};

class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    };

    addToHead(data,arbol) {
        const newNode = new Node(data, this.head, null,arbol);
        //console.log(arbol)
        if (this.head) {
            newNode.next = this.head;
            this.head.anterior = newNode;
            this.head = newNode;
            //console.log(newNode)
        } else {
            this.head = newNode;
            this.tail = newNode;
        };
        this.size++;
    };

    addToTail(data) {
        const newNode = new Node(data, null, this.tail);

        if (this.tail) {
            newNode.anterior = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        } else {
            this.tail = newNode;
            this.head = newNode;
        };
        this.size++;
    };

    insertAt(data, index) {
        if (index < 0 || index > this.size) {
            return null
        };

        const newNode = new Node(data, null, null);
        let current = this.head;
        let previous;

        if (index === 0) {
            newNode.next = current;
            current.anterior = newNode;
            this.head = newNode;
        } else {
            for (let i = 0; i < index; i++) {
                previous = current;
                current = current.next;
            };

            newNode.next =current;
            newNode.anterior = previous;
            current.anterior = newNode;
            previous.next = newNode;
        };
        this.size++;
    };

    removeFromHead() {
        if (!this.head) {
            return null
        };

        const valueToReturn = this.head.data;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.anterior = null;
        };
        this.size--;
        return valueToReturn;
    }

    removeFromTail() {
        if (!this.tail) {
            return null
        };

        const valueToReturn = this.tail.data;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.anterior;
            this.tail.next = null;
        };
        this.size--;
        return valueToReturn;
    };

    removeData(data) {
        let current = this.head;
        let previous = null;

        while(current !== null) {
            if (current.data === data) {
                if (!previous) {
                    this.removeFromHead();
                } else if (!current.next) {
                    this.removeFromTail();
                } else {
                    previous.next = current.next;
                    current.next.anterior = previous;
                };
                this.size--;
                return current.data;
            };
            previous = current;
            current = current.next;
        };
        return null;
    }

    print() {
        let current = this.head;
        let result = '';
        while(current) {
            //hola = current.arbol.print();
            //console.log(hola);
            console.log("cabecera: " + current.data);
            console.log(hola)
            result += current.data +' <-> ';
            current = current.next;
            
            
        };

        return result += ' X ';
    };

    reversePrint() {
        let current = this.tail;
        let result = '';
        while(current) {
            result += current.data + ' <-> ';
            current = current.next;
        };

        return result += ' X ';
    };

    getSize() {
        return this.size;
    };

    isEmpty() {
        return this.size === 0;
    };
}
let listaGuardar =[]
class BST {
    #root = null;
    #compare;
    
    constructor(compareFn = null) {
      if(compareFn && typeof compareFn === 'function') {
        this.#compare = compareFn;
      } else {
        this.#compare = (a, b) => {
          if(a > b) return BST.comparison.BIGGER;
          if(a < b) return BST.comparison.SMALLER;
        
          return BST.comparison.EQUAL;
        }
      }
    }
    
    get root() {
      return this.#root;
    }
  
    get min() {
      if(this.root === null) return null;
      
      return this.#minNode(this.root).key;
    }
  
    get max() {
      if(this.root === null) return null;
      
      return this.#maxNode(this.root).key;
    }
  
    static get comparison() {
      return Object.freeze({
        BIGGER: 1,
        BIGGER_OR_EQUAL: [1, 0],
        SMALLER: -1,
        SMALLER_OR_EQUAL: [-1, 0],
        EQUAL: 0
      })
    }
  
    createNode(key) {
      return Object.seal({
        key, left: null, right: null
      })
    }
  
    insert(key) {
      const newNode = this.createNode(key);
      
      if(this.root === null) {
        this.#root = newNode;
      } else {
        this.#insertNode(newNode);
      }
    }
  
    print() {
      this.#printNode();
    }
  
    traverseInOrder(cb) {
      this.#inOrder(this.root, cb);
    }
  
    traverseReversedOrder(cb) {
      this.#reverseOrder(this.root, cb);
    }
  
    traversePreOrder(cb) {
      this.#preOrder(this.root, cb);
    }
  
    traversePostOrder(cb) {
      this.#postOrder(this.root, cb);
    }
  
    search(key) {
      return this.#searchTree(key);
    }
  
    remove(key) {
      this.#root = this.#removeNode(key);
    }
  
    #removeNode = (key, node = this.root) => {
      if(node === null) return null;
  
      if(this.#compare(key, node.key) === BST.comparison.SMALLER) {
        node.left = this.#removeNode(key, node.left);
        return node;
      }
      
      if(this.#compare(key, node.key) === BST.comparison.BIGGER) {
        node.right = this.#removeNode(key, node.right);
        return node;
      }
      
      if(node.left === null && node.right === null) {
        node = null;
      } else if(node.left === null) {
        node = node.right;
      } else if(node.right === null) {
        node = node.left;
      } else {
        const max = this.#maxNode(node.left);
        node.key = max.key;
        node.left = this.#removeNode(max.key, node.left)
      }
  
      return node;
    }
    
    #maxNode = (node) => {
      while(node && node.right) {
        node = node.right;
      }
  
      return node;
    }
    
    #minNode = (node) => {
      while(node && node.left) {
        node = node.left;
      }
  
      return node;
    }
  
    #searchTree = (key, node = this.root) => {
      if(node === null) return false;
  
      if(this.#compare(key, node.key) === BST.comparison.EQUAL) return true;
         
      if(this.#compare(key, node.key) === BST.comparison.SMALLER) {
         return this.#searchTree(key, node.left);
      }
      
      return this.#searchTree(key, node.right);
    }
  
    #postOrder = (node, cb) => {
      if(node !== null) {
        this.#postOrder(node.left, cb);
        this.#postOrder(node.right, cb);
        cb(node.key);
      }
    }
  
    #preOrder = (node, cb) => {
      if(node !== null) {
        cb(node.key);
        this.#preOrder(node.left, cb);
        this.#preOrder(node.right, cb);
      }
    }
  
    #reverseOrder = (node, cb) => {
      if(node !== null) {
        this.#reverseOrder(node.right, cb);
        cb(node.key);
        this.#reverseOrder(node.left, cb);
      }
    }
  
    #inOrder = (node, cb) => {
      if(node !== null) {
        this.#inOrder(node.left, cb);
        cb(node.key);
        this.#inOrder(node.right, cb);
      }
    }
  
    #insertNode = (newNode, currentNode = this.root) => {
      if(this.#compare(newNode.key, currentNode.key) === BST.comparison.SMALLER) {
         if(currentNode.left === null) {
           currentNode.left = newNode;
         } else {
          this.#insertNode(newNode, currentNode.left)
        }                            
      } else {
         if(currentNode.right === null) {
           currentNode.right = newNode;
         } else {
           this.#insertNode(newNode, currentNode.right)
         }  
      }
    }
    
    #printNode = (node = this.root, spaceCount = 0, label = '* ') => {
      if(node === null) {
        return console.log(`${' -'.repeat(spaceCount)}${label}null`);
      }
  
      console.log(`${' -'.repeat(spaceCount)}${label}${node.key}`);
      this.#printNode(node.right, spaceCount + 2, 'R: ');
      this.#printNode(node.left, spaceCount + 2, 'L: ');
    }
  }
  
  class AVLTree extends BST {
    #root = null;
    #compare;
    #Balance = Object.freeze({
      UNBALANCED_LEFT: 2,
      SEMIUNBALANCED_LEFT: 1,
      SEMIUNBALANCED_RIGHT: -1,
      UNBALANCED_RIGHT: -2,
      BALANCED: 0,
    });
    
    constructor(compareFn = null) {
      let fn = null;
      
      if(compareFn && typeof compareFn === 'function') {
        fn = compareFn;
      } else {
        fn = (a, b) => {
          if(a > b) return BST.comparison.BIGGER;
          if(a < b) return BST.comparison.SMALLER;
        
          return BST.comparison.EQUAL;
        }
      }
  
      super(fn);
      this.#compare = fn;
    }
  
    get root() {
      return this.#root;
    }
  
    insert(key) {
      const newNode = this.createNode(key);
  
      if (this.root === null) {
        this.#root = newNode;
      } else {
        this.#root = this.#insertNode(newNode);
      }
    }
  
    remove(key) {
      this.#root = this.#removeNode(key);
    }
  
    print() {
      let node = this.#printNode();
      return node
    }
  
    #removeNode = (key, node = this.root) => {
      if (node === null) return null;
  
      if (this.#compare(key, node.key) === BST.comparison.SMALLER) {
        node.left = this.#removeNode(key, node.left);
        return this.#balanceNode(node);
      }
  
      if (this.#compare(key, node.key) === BST.comparison.BIGGER) {
        node.right = this.#removeNode(key, node.right);
        return this.#balanceNode(node);
      }
  
      // match node is the leaf node
      if (node.left === null && node.right === null) {
        node = null;
      } else if (node.left === null) {// match node lack left or right node
        node = node.right;
      } else if (node.right === null) {
        node = node.left;
      } else { // match node has both of its nodes
        const max = this.#maxNode(node.left);
        node.key = max.key;
        node.left = this.#removeNode(max.key, node.left);
      }
  
      return this.#balanceNode(node, key);
    };
  
    #maxNode = (node) => {
      while (node !== null && node.right !== null) {
        node = node.right;
      }
  
      return node;
    };
  
    #insertNode(newNode, currentNode = this.root) {
      if (this.#compare(newNode.key, currentNode.key) === BST.comparison.SMALLER) {
        currentNode.left = currentNode.left === null
            ? newNode
            : this.#insertNode(newNode, currentNode.left);
      } else {
        currentNode.right = currentNode.right === null
            ? newNode
            : this.#insertNode(newNode, currentNode.right);
      }
  
      return this.#balanceNode(currentNode, newNode.key);
    }
  
    #balanceNode(node, key = null) {
      if (node === null) {
        return node;
      }
  
      const balance = this.#getNodeBalanceFactor(node);
  
      if (balance === this.#Balance.UNBALANCED_LEFT) {
        if (key) {
          node = this.#compare(key, node.left.key) === BST.comparison.SMALLER 
            ? this.#RRotation(node) 
            : this.#LRRotation(node);
        } else if (node.left) {
          const leftBalance = this.#getNodeBalanceFactor(node.left);
  
          if (
            // leftBalance === this.#Balance.BALANCED ||
            leftBalance === this.#Balance.SEMIUNBALANCED_LEFT
          ) {
            console.log('no key left 1', leftBalance)
            return this.#RRotation(node);
          }
  
          if (leftBalance === this.#Balance.SEMIUNBALANCED_RIGHT) {
            console.log('no key left 2', leftBalance)
            return this.#LRRotation(node);
          }
        }
      }
  
      if (balance === this.#Balance.UNBALANCED_RIGHT) {
        if (key) {
          node = BST.comparison.BIGGER_OR_EQUAL.includes(this.#compare(key, node.right.key))
            ? this.#LRotation(node)
            : this.#RLRotation(node);
        } else if (node.right) {
          const rightBalance = this.#getNodeBalanceFactor(node.right);
          console.log('right', rightBalance)
  
          if (
            // rightBalance === this.#Balance.BALANCED ||
            rightBalance === this.#Balance.SEMIUNBALANCED_RIGHT
          ) {
             console.log('no key right 1', rightBalance)
            return this.#LRotation(node);
          }
  
          if (rightBalance === this.#Balance.SEMIUNBALANCED_LEFT) {
              console.log('no key right 2', rightBalance)
            return this.#RLRotation(node);
          }
        }
      }
  
      return node;
    }
  
    #RRotation(node) {
      const detached = node.left;
      node.left = detached.right;
      detached.right = node;
      return detached;
    }
  
    #LRotation(node) {
      const detached = node.right;
      node.right = detached.left;
      detached.left = node;
      return detached;
    }
  
    #LRRotation(node) {
      node.left = this.#LRotation(node.left);
      return this.#RRotation(node);
    }
  
    #RLRotation(node) {
      node.right = this.#RRotation(node.right);
      return this.#LRotation(node);
    }
  
    #getNodeHeight(node) {
      if (node === null) {
        return 0;
      }
  
      return (
        Math.max(
          this.#getNodeHeight(node.left),
          this.#getNodeHeight(node.right)
        ) + 1
      );
    }
  
    #getNodeBalanceFactor(node) {
      return this.#getNodeHeight(node.left) - this.#getNodeHeight(node.right);
    }
  
    #printNode = (node = this.root, spaceCount = 0, label = '* ') => {
      if (node === null) return console.log(`${' -'.repeat(spaceCount)}${label}[0/0] null`);
  
      console.log(
        `${' -'.repeat(spaceCount)}${label}` +
        `[${this.#getNodeHeight(node)}/${this.#getNodeBalanceFactor(node)}] ${node.key}`
      );
      listaGuardar.push(node.key)
  
      this.#printNode(node.right, spaceCount + 2, 'R: ');
      this.#printNode(node.left, spaceCount + 2, 'L: ');
      return node
    };
  }
  
const tree = new AVLTree();
tree.insert(70) 
tree.insert(50)
tree.insert(80)
//tree.remove(40)
hola = tree.print()
//console.log(hola)

const doubleLinkedList = new DoubleLinkedList();
doubleLinkedList.addToHead(3,hola);
doubleLinkedList.addToHead(2,hola);
//doubleLinkedList.addToTail(7);
//doubleLinkedList.addToTail(8);
//doubleLinkedList.insertAt(4, 2);
//doubleLinkedList.removeFromHead();
//doubleLinkedList.removeFromTail();
//doubleLinkedList.removeData(4);
console.log(doubleLinkedList.getSize());

console.log(doubleLinkedList.print())