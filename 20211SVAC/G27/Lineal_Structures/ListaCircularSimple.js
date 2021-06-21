class Node{
	constructor(data, next = null){
		this.data = data;
		this.next = next;
        
	}
}
class CircularLinkedList{
    constructor(){
        this.head = null;
    }

    insertAtFirst(data){
        let newNode = new Node(data);

        if(!this.head){
            newNode.next = newNode;
            this.head = newNode;
        }
        let curr = this.head;
        while(curr.next !== this.head){
            curr = curr.next;
        }
        curr.next = newNode;
        newNode.next = this.head;
        this.head = newNode;
    }

    insertAtLast(data){
        let newNode = new Node(data);

        if(!this.head){
            newNode.next = newNode;
            this.head = newNode;
        }
        let curr = this.head;
        while(curr.next !== this.head){
            curr = curr.next;
        }
        curr.next = newNode;
        newNode.next = this.head;
    }

    print(){
        let cadena = "";
        if(!this.head){
            return;
        }
        let curr = this.head;
        do{
            var valor = curr.data;
            cadena += valor + " ->";
            curr = curr.next;
        }while(curr != this.head)
        cadena += curr.data;
        console.log(cadena);
    }

    count(){
        if(!this.head){
            return;
        }
        let curr = this.head;
        let count = 0;
        while(curr.next !== this.head){
            curr = curr.next;
            count++;
        }
        return count;
    }

    removeFirst(){
        if(!this.head){
            return 
        }
        let curr = this.head;
        while(curr.next !== this.head){
            curr = curr.next;
        }
        curr.next = this.head.next;
        this.head = this.head.next;

        return this.head;
    }
    clear() {
        this.head = null;
        } 
        


    find(valor){
        var actualNode = this.head;
        while(actualNode.valor != valor){
        actualNode = actualNode.next;
        }
            return actualNode;
        }
    

    removeLast(){
        if(!this.head){
            return 
        }
        let curr = this.head.next;
        let prev = null;
        while(curr.next !== this.head){
            prev = curr;
            curr = curr.next;
        }
        prev.next = this.head;

        return this.head;
    }
}

let cList = new CircularLinkedList();
cList.clear();

function agregarValorFinal(){
    var x = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    cList.insertAtLast(x);
    document.getElementById("newValue").focus();
    graficar();
}

function agregarValorInicio(){
    var x = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    cList.insertAtFirst(x);
    document.getElementById("newValue").focus();
    graficar();
}

function eliminarValorInicio(){
    cList.removeFirst();
    document.getElementById("newValue").focus();
    graficar();
  }

  function eliminarValorFinal(){
    cList.removeLast();
    document.getElementById("newValue").focus();
    graficar();
  }

function graficar(){
    var x_pos = -150;
    var y_pos = 0;
    var nodes = [];
    var edges = [];
    var contador = 0;       
    // creating an array with nodes
    var aux = cList.head;
    do{
      nodes.push({id: contador, label: "Valor: " + aux.data, x: x_pos, y: y_pos});
      x_pos = x_pos + 100; 
      edges.push({
        from: contador,
        to: contador+1,
        arrows: "to",
        physics: false,
        smooth: {type: "cubicBezier"},
      });
      aux = aux.next;
      contador++; 
    }while(aux != cList.head);

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
    var contents = event.target.result;
    var json = JSON.parse(contents);
    var count = Object.keys(json.valores).length;
    for (let index = 0; index < count; index++) {
      cList.insertAtLast(json.valores[index]); 
    }
    graficar();
  };
  reader.onerror = function(event) {
    console.error("File could not be read! Code " + event.target.error.code);
  };
  reader.readAsText(file);
  }