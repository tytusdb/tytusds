class Nodo {
    constructor(valor){
        this.valor = valor;
        this.siguiente = null;
    }

    getValor(){
        return this.valor;
    }
}

class simple_list{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.tamano = 0;
    }

    insert(valor){
        let nuevoValor = new Nodo(valor);
        if(this.primero == null){
            this.primero = nuevoValor;
            this.ultimo = nuevoValor;
            this.tamano++;
        }else{
            this.ultimo.siguiente = nuevoValor;
            this.ultimo = nuevoValor;
        }
    }

    sacarValor(){
        var actualNode = this.primero;
        this.primero = actualNode.siguiente;
        actualNode.siguiente = null;
    }

    delete(valor){
        var actualNode = this.find(valor);
        if(actualNode === this.primero){
            this.primero = actualNode.siguiente;
            actualNode.siguiente = null;
        }
        else if(!(actualNode.siguiente === null)){
            actualNode.anterior.siguiente = actualNode.siguiente;
            actualNode.siguiente.anterior = actualNode.anterior;
            actualNode.siguiente = null;
            actualNode.anterior = null;
        }
    }

    find(valor){
        var actualNode = this.primero;
        while(actualNode.siguiente.valor != valor){
            actualNode = actualNode.siguiente;
        }
        return actualNode;
    }
}
//Esto es una modificacion de prueba 


var lista = new simple_list;

function agregarValor(){
    var x = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    lista.insert(x);
    document.getElementById("newValue").focus();
    graficar();
}

function sacarInicio(){
    lista.sacarValor();
    graficar();
}

function graficar(){
    var x_pos = -150;
    var y_pos = 0;
    var nodes = [];
    var contador = 0;       
    // creating an array with nodes
    var aux = lista.primero;

    nodes.push({id: "Cabeza", label: "Cabeza", x: -150, y: -100});
    nodes.push({id: "Cola", label: "Cola", x: -150, y: 100});
    while(aux != null){
      nodes.push({id: aux.valor, label: "Valor: " + aux.valor, x: x_pos, y: y_pos});
      aux = aux.siguiente;
      x_pos = x_pos + 100;  
    }

    // creating an array with edges 
    var edges = [];

    var p = lista.primero;
    while(p != null){
      if(p.siguiente != null){
        edges.push({
          from: p.valor,
          to: p.siguiente.valor,
          arrows: "to",
          physics: false,
          smooth: {type: "cubicBezier"},
        });
      }
      p = p.siguiente;
    }

    
    edges.push({
      from: "Cabeza",
      to: lista.primero.valor,
      arrows: "to",
      physics: false,
      smooth: {type: "cubicBezier"},
    });
    
    edges.push({
      from: "Cola",
      to: lista.ultimo.valor,
      arrows: "to",
      physics: false,
      smooth: {type: "cubicBezier"},
    });

    // create a network
    var container = document.getElementById("mynetwork");
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