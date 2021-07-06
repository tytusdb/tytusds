// create an array with nodes
var nodes = new vis.DataSet([]);
// create an array with edges
var edges = new vis.DataSet([])
// create a network
var container = document.getElementById('mynetwork');
// provide the data in the vis format
var data = {nodes: nodes, edges: edges}
var options = {
  layout: {
    hierarchical: {
        direction: 'UD',
        sortMethod: 'directed',
        shakeTowards: 'roots',
        nodeSpacing: 200  
    }
  },
  nodes: {
    shape: 'circle',
    size: 20,
    color:"#CD5C5C"
  },
  edges:{
    color:"#17202A",
    arrows:'to'
  }
}
// initialize your network!
var network = new vis.Network(container, data, options);
var updatedIds

/*EVENTOS*/
$('#codificar').on('click', () => Codificar(document.getElementById("cadenita").value))
$('#cargar').on('click', () => cargarJson())
$('#guardar').on('click', () => guardarJson())

function Codificar(cadenita){
  // Reseteamos el network
  nodes = new vis.DataSet([]);
  edges = new vis.DataSet([])
  container = document.getElementById('mynetwork');
  data = {nodes: nodes, edges: edges}
  options = {
    layout: {
      hierarchical: {
          direction: 'UD',
          sortMethod: 'directed',
          shakeTowards: 'roots'
      }
    },
    nodes: {
      shape: 'box',
      size: 30,
      color:"#1F7367",
      font: {color:'white'}
    },
    edges:{
      color:"#17202A",
      arrows:'to'
    }
  }
  network = new vis.Network(container, data, options);
  //Ahora ya miramos que pedo
  let arbolito = Huffman(cadenita)
  generarArbol(null, arbolito.arbolito)
  graficarSimbolos(arbolito.arbolito, arbolito.original, cadenita.length)
}

function graficarSimbolos(arbolito, original, l){
  let header = document.getElementById("header");
  header.innerHTML = "";
  let content = document.getElementById("contenido");
  content.innerHTML = "";
  let headerRow = document.createElement("tr");
  let row = document.createElement("tr");
  for(let i = 0; i < original.length; i++){
    let simbolo = document.createElement("th");
    let simboloText = document.createTextNode(original[i].simbolo + " " + original[i].index +"/" + l)
    simbolo.appendChild(simboloText)
    simbolo.setAttribute("scope", "row");
    headerRow.appendChild(simbolo)
    //Ahora la codificacion
    let code = document.createElement("td");
    let codeText = document.createTextNode(getCode(arbolito, "", original[i].simbolo))
    code.appendChild(codeText)
    row.appendChild(code)
  }
  header.appendChild(headerRow)
  content.appendChild(row)
  console.log(original)
}

function getCode(arbolito, code, simbolo){
  if(arbolito != null){
    if(arbolito.simbolo == simbolo){
      return code += arbolito.binario
    } else {
      if(getCode(arbolito.left, code, simbolo) != ""){
        if(arbolito.binario == null) return getCode(arbolito.left, code, simbolo)
        return getCode(arbolito.left, code + arbolito.binario, simbolo)
      } else {
        if(arbolito.binario == null) return getCode(arbolito.right, code, simbolo)
        return getCode(arbolito.right, code + arbolito.binario, simbolo)
      }
    }
  }
  return ""
}

function generarArbol(padre, arbolito){
  if(arbolito != null){
    let label = ""
    if(arbolito.simbolo != ""){
      label += arbolito.simbolo + " | "
    }
    label += "(" + arbolito.index.toString() + ")"
    if(arbolito.binario != null){
      label += " | " + arbolito.binario
    }
    updatedIds = nodes.add([{
      id: arbolito.id,
      label:label
    }])
    if(padre != null){
      updatedIds = edges.add([
        {from: padre.id, to: arbolito.id}
      ])
    }
    generarArbol(arbolito, arbolito.left)
    generarArbol(arbolito, arbolito.right)
  }
}

async function cargarJson(){
  //Obtenemos el archivo 
  let upload = document.getElementById('formFileSm');
  let fr = new FileReader()
  fr.readAsText(upload.files[0])
  fr.onload = async function(){
    Codificar(fr.result)
  }
}

function guardarJson(){
  var categoria = "Estructuras Arboreas"
  var nombre = "ABB"
  var repetir = document.getElementById("flexSwitchCheckDefault").checked;
  var speed = document.getElementById("formControlRange").value;
  let array = arbolito.preorden()
  let valores = []
  for(let i = 0; i < array.length; i++){
    valores.push(array[i].value)
  }
  var objeto = {
    categoria: categoria,
    nombre: nombre,
    repeticion: repetir,
    animacion: speed/10,
    valores: valores
  }
  var JsonString = JSON.stringify(objeto);
  download("ABB.json",JsonString);
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}