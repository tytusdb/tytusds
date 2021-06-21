class Nodo{
    constructor(valor){
        this.valor = valor;
        this.siguiente =null;
        this.anterior = null;
    }

    getValor(){
        return this.valor;
    }
}
class Queue{
    constructor(){
        this.cabeza = null;
        this.cola = null;
        this.tamano = 0;
    };
    
    enqueue(data){
        //this.items[this.end] = data;
        //this.end++;
        if(this.cabeza ==null){
            this.cabeza = new Nodo(data);
            this.cola = this.cabeza;
        }else{
            let nuevoNodo = new Nodo(data);
            nuevoNodo.siguiente = this.cola;
            this.cola.anterior = nuevoNodo;
            this.cola = nuevoNodo;
        }
        this.tamano++;
    };

    dequeue(){
        let aux = this.cabeza;
        if(aux ==null){
            return null;
        };

        this.cabeza = this.cabeza.anterior;
        aux.siguiente = null;
        aux.anterior = null;
        this.tamano--;
        return aux;
    };
    
    getSize(){
        return this.tamano;
    };

    isEmpty(){
        if (this.getSize() === 0){
            return true;
        }else{ 
            return false;
        };
    };

    peek(){
        if(this.getSize() === 0){
            return null;
        };
        return this.cabeza;
    };

    /*print(){
        if(this.getSize() === 0){
            return null;
        };
        let result = '';
        for (let i = this.front; i < this.end; i++){
            result += this.items[i] + '\n'; 
        };
        return result;
    };*/
};

const queue = new Queue();

function agregarValor(){
    var x = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    queue.enqueue(x);
    document.getElementById("newValue").focus();
    graficar();
}

function eliminarValor(){
    var valor = queue.peek().valor;
    document.getElementById("newValue").value = "";
    document.getElementById("newValue").value = valor;
    queue.dequeue();
    graficar();
}

function AbrirArchivo(files){
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function(event){
      var contents = event.target.result;
      var json = JSON.parse(contents);
      var count = Object.keys(json.valores).length;
      for (let index = 0; index < count; index++) {
        queue.enqueue(json.valores[index]); 
      }
      graficar();
    };
    reader.onerror = function(event) {
      console.error("File could not be read! Code " + event.target.error.code);
  };
    reader.readAsText(file);
  }

  function graficar(){
    var x_pos = -150;
    var y_pos = 0;
    var nodes = [];
    var edges = [];
    var contador = 0;   
    // creating an array with nodes
    var aux2 = queue.cabeza;

    nodes.push({id: "Cabeza", label: "Cabeza", x: -150, y: -100});

    for (let index = 0; index < queue.getSize(); index++) {
        nodes.push({id: contador, label: "Valor: " + aux2.valor, x: x_pos, y: y_pos});
        aux2 = aux2.anterior;
        x_pos = x_pos + 100;
        contador++;
    }
    // create an array with edges

    if(queue.isEmpty){
        edges.push({
            from: "Cabeza",
            to: 0,
            arrows: "to",
            physics: false,
            smooth: {type: "cubicBezier"},
          });
    }
    
    
    

    // create a network
    var container = document.getElementById("miRed");
    var data = {
      nodes: nodes,
      edges: edges,
    };

    const options = {
        nodes: {
            shape: "box",
            widthConstraint: 80,
            color: "#cccccc",
            margin: 10,
            font: {
              size: 16,
            },
          },
        physics: {
            enabled: false,
        },
        interaction: {
            hover: true,
          },
    };

    var network = new vis.Network(container, data, options);
  
}