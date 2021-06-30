//Node
class Node{
  constructor(elm, next = null, prev=null){
    this.element = elm;
    this.next = next;
    this.prev = prev;
  }
}

class circularLinkedList{
    constructor(){
      this.length = 0;
      this.head = null;
      this.tail = null;
    }
    
    //Get element at specific index
    getElementAt = function(index) {
      if(index >= 0 && index <= this.length){
        let node = this.head;
        for(let i = 0; i < index && node != null; i++){
          node = node.next;
        }
        return node;
      }
      return undefined;
    }

    //Add new element
    append = function(element) {
      let node = new Node(element),
          current = this.head,
          previous;

      if(!this.head){
        this.head = node;
        this.tail = node;
      }else{
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
      }
      
      //Mark head's prev element as last element
      this.head.prev = this.tail;

      //Mark tail's next element as first element
      this.tail.next = this.head;
  
      this.length++;
    }


  //Add element 
  insert = function(position, element) {

    //Check of out-of-bound values
    if(position >= 0 && position <= this.length){
      let node = new Node(element),
          current = this.head,
          previous,
          index = 0;

      if(position === 0){
        if(!this.head){
          this.head = node;
          this.tail = node;
        }else{
          node.next = current;
          current.prev = node;
          this.head = node;
        }
      }else if(position === this.length){
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      }else{
        while(index++ < position){
          previous = current;
          current = current.next;
        }

        node.next = current;
        previous.next = node;

        //New
        current.prev = node;
        node.prev = previous; 
      }
      
      //Mark head's prev element as last element
      this.head.prev = this.tail;

      //Mark tail's next element as first element
      this.tail.next = this.head;

      this.length++;
      return true;
    }else{
      return false;
    }
  }

  //Remove element at any position
  removeAt = function(position){
    //look for out-of-bounds value
    if(position > -1 && position < this.length){
      let current = this.head, previous, index = 0;

      //Removing first item
      if(position === 0){
        this.head = current.next;

        //if there is only one item, update tail //NEW
        if(length === 1){
          this.tail = null;
        }else{
          this.head.prev = null;
        }
      }else if(position === this.length - 1){
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = null;
      }else{
        while(index++ < position){
          previous = current;
          current = current.next;
        }

        //link previous with current's next - skip it
        previous.next = current.next; 
        current.next.prev = previous;
      }
      
      if(this.head){
        //Mark head's prev element as last element
        this.head.prev = this.tail;

        //Mark tail's next element as first element
        this.tail.next = this.head;
      }

      this.length--;
      return current.element;
    }else{
      return null;
    }
  }

  //Get the indexOf item 
  indexOf = function(elm){
    let current = this.head,
        index = -1;

    //If element found then return its position
    while(current){
      if(elm === current.element){
        return index;
      }
      index++;
      current = current.next;
    }

    //Else return -1
    return -1;
  };

  //Find the item in the list
  isPresent = (elm) => {
    return this.indexOf(elm) !== -1;
  };

  //Delete an item from the list
  delete = (elm) => {
    return this.removeAt(this.indexOf(elm));
  };  

  //Delete first item from the list
  deleteHead = function(){
    this.removeAt(0);
  }

  //Delete last item from the list
  deleteTail = function(){
    this.removeAt(this.length-1);
  }

  //Print item of the string
  toString = function(){
    let current = this.head,
    string = '';

    //Keep track of the head
    const temp = this.head.element;
    
    while(current){
      //If head is the next element then break
      if(temp === current.next.element){
        string += current.element + (current.next ? '\n' : '');
        break;
      }
      
      string += current.element + (current.next ? '\n' : '');
      current = current.next;
    }

    return string;
  };

  //Convert list to array
  toArray = function(){
    let arr = [],
    current = this.head;

    //Keep track of head
    const temp = this.head.element

    while(current){
      //Break if first element detected
      if(temp === current.next.element){
        arr.push(current.element);
        break;
      }
      
      arr.push(current.element);
      current = current.next;
    }

    return arr;
  };

  //Check if list is empty
  isEmpty = function(){
    return this.length === 0;
  };

  //Get the size of the list
  size = function(){
    return this.length;
  }

  //Get the head
  getHead = function() {
    return this.head;
  }

  //Get the tail
  getTail = function() {
    return this.tail;
  }
}

var lista = new circularLinkedList;

function agregarValor(){
  var x = document.getElementById("newValue").value;
  document.getElementById("newValue").value = "";
  lista.append(x); 
  document.getElementById("newValue").focus();
  //console.log(lista.toString());  
  graficar();
}
function agregarValorEn(){
  var x = document.getElementById("newValue").value;
  document.getElementById("newValue").value = "";
  var p = document.getElementById("Posicion").value;
  document.getElementById("Posicion").value = "";
  lista.insert(p,x);
  document.getElementById("newValue").focus();
  //console.log(lista.toString());  
  graficar();
}

function sacarInicio(){
  lista.deleteHead();
  graficar();
}

function eliminarValorEn(){
  var x = document.getElementById("Posicion").value;
  document.getElementById("Posicion").value ="";
  lista.removeAt(x);
  document.getElementById("Posicion").focus();
  //console.log(lista.toString());
  graficar();
}

function eliminarValor(){
  var x = document.getElementById("newValue").value;
  document.getElementById("newValue").value ="";
  lista.delete(x);
  document.getElementById("newValue").focus();
  //console.log(lista.toString());
  graficar();
}

function graficar(){
  var x_pos = -150;
  var y_pos = 0;
  var nodes = [];
  var edges = [];
  var contador = 0;       
  // creating an array with nodes
  var aux = lista.head;
  do{
    nodes.push({id: contador, label: "Valor: " + aux.element, x: x_pos, y: y_pos});
    x_pos = x_pos + 100; 
    edges.push({
      from: contador,
      to: contador+1,
      arrows: "to",
      physics: false,
      smooth: {type: "cubicBezier"},
    });
    edges.push({
      from: contador + 1,
      to: contador,
      arrows: "to",
      physics: false,
      smooth: {type: "cubicBezier"},
    });
    aux = aux.next;
    contador++; 
  }while(aux != lista.head);

  edges.push({
      from: contador-1,
      to: 0,
      arrows: "to",
      physics: false,
      smooth: {type: "curvedCW"},
    });
  
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
  };
  var network = new vis.Network(container, data, options);

}

//here I load a JSON Files
function AbrirArchivo(files){
  var file = files[0];
  var reader = new FileReader();
  reader.onload = function(event){
    contents = event.target.result;
    var json = JSON.parse(contents);
    var count = Object.keys(json.valores).length;
    for (let index = 0; index < count; index++) {
      lista.append(json.valores[index]); 
    }
    //console.log(lista.toString());
    graficar();
  };
  reader.onerror = function(event) {
    console.error("File could not be read! Code " + event.target.error.code);
  };
  reader.readAsText(file);
  }

var contents;
var arreglo =[];

function getValores(){
  var aux = lista.head;
  arreglo = []
  do{
    arreglo.push(aux.element);
    aux = aux.next; 
  }while(aux != lista.head);
}

function DescargarArchivo(){
    var json = JSON.parse(contents);
    getValores();
    json.valores = arreglo;
    const myJSON = JSON.stringify(json);
    //console.log(json);
    //texto de vent actual
  
    //formato para guardar el archivo
    var nombre="Simple_Circular_List.json";//nombre del archivo
    var file=new Blob([myJSON], {type: 'text/plain'});
  
    if(window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(file, nombre);
    }else{
        var a=document.createElement("a"),url=URL.createObjectURL(file);
        a.href=url;
        a.download=nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
        },0); 
      }
  }


