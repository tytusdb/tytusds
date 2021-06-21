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
 aux;
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


const stack = new Stack();

function agregarValor(){
    var x = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    stack.push(x);
    document.getElementById("newValue").focus();
    graficar();
}



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