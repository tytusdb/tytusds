class Nodo {
    constructor(valor){
        this.valor = valor;
        this.siguiente = null;
    }

    getValor(){
        return this.valor
    }
}

class Stack{
    constructor(){
        this.top = null;
        this.tamano = 0;
    };

    push(data){
        let nuevoNodo = new Nodo(data);
        if(this.top == null){
            this.top = nuevoNodo;
        }else{
            nuevoNodo.siguiente = this.top;
            this.top = nuevoNodo;
        }
        this.tamano++;
        //this.items[this.top] = data;
    };


    pop(){
        //let deleteData;

        if(this.top == null) {
            return null;
            //deleteData = this.items[this.top];
            //delete this.items[this.top];
            //this.top--;
            //return deleteData;
        }
        var aux = this.top;
        this.top = this.top.siguiente;
        aux.siguiente = null;
        this.tamano --;
        return aux;
    };

    getSize(){
        return this.tamano;
    };


    isEmpty(){
        if(!this.getSize()){
            return true;
        } else{
            return false;
        };
    };

    peek(){
        if(this.isEmpty()){
            return null
        };
        return this.top;
    };

    /*print(){
        let result = '';
        for(let i = this.top; i > 0; i--){
            result += this.items[i] + '\n';
        };
        return result;
    };*/
};

const stack = new Stack();

//stack.push('Alv1');
//stack.push('Alv2');
//stack.push('Alv3');
//stack.pop();
//console.log(stack.print());



function agregarValor(){
    var x = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    stack.push(x);
    document.getElementById("newValue").focus();
    graficar();
}

function eliminarValor(){
    var x = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    stack.pop();
    document.getElementById("newValue").focus();
    graficar();
}
function graficar(){ 
    var nodes = [];
    var contador = 0; 
    var x_pos = 0;
    var y_pos = -150;      
    // creating an array with nodes
    var aux2 = stack.top;
    for (let index = 0; index < stack.getSize(); index++) {
        nodes.push({id: contador, label: "Valor: " + aux2.valor, x: x_pos, y: y_pos});
        aux2 = aux2.siguiente;
        y_pos = y_pos + 38;
        contador++;
    }
    
    // create a network
    var container = document.getElementById("miRed");
    var data = {
      nodes: nodes,
    };

    const options = {
        nodes: {
            shape: "box",
            widthConstraint: 100,
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


//here I load a JSON Files
function AbrirArchivo(files){
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function(event){
      var contents = event.target.result;
      var json = JSON.parse(contents);
      var count = Object.keys(json.valores).length;
      for (let index = 0; index < count; index++) {
        stack.push(json.valores[index]); 
      }
      graficar();
    };
    reader.onerror = function(event) {
      console.error("File could not be read! Code " + event.target.error.code);
  };
    reader.readAsText(file);
  }