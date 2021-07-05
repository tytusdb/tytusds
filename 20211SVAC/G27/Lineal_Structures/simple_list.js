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

  delete(valor){
    var anteriorNodo = this.find_before(valor);
    if(this.primero.valor == valor){
      this.primero = this.primero.siguiente;
      return true
    }
    if(!(anteriorNodo.siguiente == null)){
      anteriorNodo.siguiente = anteriorNodo.siguiente.siguiente;
      return true
    }
    
  }

  find_before(valor){
    var actualNode = this.primero;
    while(!(actualNode.siguiente === null) && (actualNode.siguiente.valor != valor)){
      actualNode = actualNode.siguiente
    }
    return actualNode
}

sacarValor(){
      var actualNode = this.primero;
      this.primero = actualNode.siguiente;
      actualNode.siguiente = null;
  }


find(valor){
      var actualNode = this.primero;
      while(actualNode.siguiente.valor != valor){
          actualNode = actualNode.siguiente;
      }
      return actualNode;
  }

find_valor(posicion){
    var actualNode = this.primero;
    for (let index = 0; index < posicion -1; index++) {
      actualNode = actualNode.siguiente;
    }
    return actualNode.valor;
  }
}

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
  var edges = [];
  var contador = 0;       
  // creating an array with nodes
  var aux = lista.primero;

  nodes.push({id: "Cabeza", label: "Cabeza", x: -150, y: -100});
  nodes.push({id: "Cola", label: "Cola", x: -150, y: 100});
  while(aux != null){
    nodes.push({id: contador, label: "Valor: " + aux.valor, x: x_pos, y: y_pos});
    edges.push({
      from: contador,
      to: contador+1,
      arrows: "to",
      physics: false,
      smooth: {type: "cubicBezier"},
    });
    aux = aux.siguiente;
    x_pos = x_pos + 100;
    contador++; 
  }

  // creating an array with edges 

  edges.push({
    from: "Cabeza",
    to: 0,
    arrows: "to",
    physics: false,
    smooth: {type: "cubicBezier"},
  });
  
  edges.push({
    from: "Cola",
    to: contador-1,
    arrows: "to",
    physics: false,
    smooth: {type: "cubicBezier"},
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

function eliminarValor(){
var x = document.getElementById("newValue").value;
document.getElementById("newValue").value ="";
lista.delete(x);
document.getElementById("newValue").focus();
graficar();
}

function encontrar(){
var x = document.getElementById("newValue").value;
document.getElementById("newValue").value =lista.find_valor(x);
document.getElementById("newValue").focus();
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
    lista.insert(json.valores[index]); 
  }
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
  var aux = lista.primero;
  arreglo = []
  while(aux != null){
    arreglo.push(aux.valor);
    aux = aux.siguiente; 
  }
}

function DescargarArchivo(){
    var json = JSON.parse(contents);
    getValores();
    json.valores = arreglo;
    const myJSON = JSON.stringify(json);
    //console.log(json);
    //texto de vent actual
  
    //formato para guardar el archivo
    var nombre="Simple_List.json";//nombre del archivo
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