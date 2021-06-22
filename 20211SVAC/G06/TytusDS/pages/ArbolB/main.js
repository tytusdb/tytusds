// create an array with nodes
var nodes = new vis.DataSet([
  /*{id: 1, label: "bb"},
  {id: 2, label: "bb2"},
  {id: 3, label: "bb3"},
  {id: 4, label: "bb4"}*/
]);

// create an array with edges
var edges = new vis.DataSet([
  /*{from:1, to:2},
  {from:1, to:3},
  {from:3, to:4},*/
]);

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
  layout: {
    hierarchical: {
        direction: 'UD',
        sortMethod: 'directed',
        shakeTowards: 'roots',
        nodeSpacing: 100,
    }
  },
  nodes: {
    shape: 'box',
    size: 20,
    color:"#512E5F",
    font: {color:'white'}
  },
  edges:{
    color:"#17202A",
    arrows:'to'
  },
  physics: {
    hierarchicalRepulsion: {
      avoidOverlap: 1,
    },
  }
};

// initialize your network!
var network = new vis.Network(container, data, options);

let arbolito = null

var noditos = []

/*EVENTOS*/
$('#add').on('click', () => agregar())
$('#search').on('click', () => search())
$('#delete').on('click', () => remove())
$('#update').on('click', () => update())
$('#pruebita').on('click', () => prueba())
$('#cargar').on('click', () => cargarJson())
$('#guardar').on('click', () => guardarJson())

function prueba(){
  arbolito.preorden()
  console.log(arbolito.root)
}

async function cargarJson(){
  network = new vis.Network(container, data, options);
  var objeto = null
  //Obtenemos el archivo 
  let upload = document.getElementById('formFileSm');
  let fr = new FileReader()
  fr.readAsText(upload.files[0])
  fr.onload = async function(){
    objeto = JSON.parse(fr.result)
    //SETEAMOS LA ANIMACION
    document.getElementById("formControlRange").value = (objeto.animacion*10).toString();
    //SETEAMOS LA REPETICION
    if(objeto.repeticion == true){
      document.getElementById("flexSwitchCheckDefault").checked = true;
    } else {
      document.getElementById("flexSwitchCheckDefault").checked = false;
    }
    //Seteamos el grado
    arbolito = new ArbolB(objeto.grado)
    //AQUI YA AGREGAMOS
    var updatedIds
    for(let i = 0; i < objeto.valores.length; i++){
        //VERIFICAMOS SI VIENEN REPETIDOS
        if(objeto.repeticion == false){
          let existe = arbolito.search(objeto.valores.length)
          if(existe.encontrado == true){
            alert("Ese valor ya existe :c")
            continue
          }
        }
        arbolito.insertar(objeto.valores[i])
    }
    /*AHORA INGRESAMOS EL VALOR Y RECORREMOS EL ARRAY*/
    let data = arbolito.getData()
    network.selectNodes(noditos)
    network.deleteSelected();
    noditos = []
    for(let i = 0; i < data.nodes.length; i++){
      noditos.push(data.nodes[i].id)
    }
    var updatedIds
    if(data.nodes.length > 0){
        updatedIds = nodes.add(data.nodes.reverse());
    }
    if(data.edges.length > 0){
        updatedIds = edges.add(data.edges.reverse());
    }
    network.editNode();
  }
}

function guardarJson(){
  var categoria = "Estructuras Arboreas"
  var nombre = "Arbol B"
  var repetir = document.getElementById("flexSwitchCheckDefault").checked;
  var speed = document.getElementById("formControlRange").value;
  let grado = arbolito.orden
  let array = arbolito.getData()
  let valores = []
  for(let i = 0; i < array.array.length; i++){
    valores.push(array.array[i])
  }
  var objeto = {
    categoria: categoria,
    nombre: nombre,
    grado: grado,
    repeticion: repetir,
    animacion: speed/10,
    valores: valores
  }
  var JsonString = JSON.stringify(objeto);
  console.log(JsonString)
  download("ArbolB.json",JsonString);
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

function convertir(porcentaje){
  let result = (100 - porcentaje)*10
  if (result == 0){
    result = 50
  }
  return result
}

async function agregar(){
  let inputValue = document.getElementById("valor").value;
  var repetir = document.getElementById("flexSwitchCheckDefault").checked;
  var speed = document.getElementById("formControlRange").value;
  speed = convertir(speed)
  var animation = {
    scale: 4,
    animation: {
      duration:speed,
      easingFunction: "linear"
    }
  }

  /*******************************************/
  //Verificamos si el valor es un numero o string
  if(!isNaN(parseInt(inputValue))){
    inputValue = parseInt(inputValue)
  }


  //SETEAMOS EL ARBOLITO
  let grado = document.getElementById("prioridad").value;
  if(arbolito == null){
    arbolito = new ArbolB(parseInt(grado))
  }

  /*ESTO ES PARA VALIDAR SI EXISTE EL ELEMENTO*/
  if(repetir == false){
    let existe = arbolito.search(inputValue)
    if(existe.encontrado == true){
      alert("Ese valor ya existe :c")
      return
    }
  }

  /*AHORA INGRESAMOS EL VALOR Y RECORREMOS EL ARRAY*/
  arbolito.insertar(inputValue)
  let data = arbolito.getData()
  network.selectNodes(noditos)
  network.deleteSelected();
  noditos = []
  for(let i = 0; i < data.nodes.length; i++){
    noditos.push(data.nodes[i].id)
  }
  console.log(data.nodes)
  var updatedIds
  if(data.nodes.length > 0){
      updatedIds = nodes.add(data.nodes.reverse());
  }
  if(data.edges.length > 0){
      updatedIds = edges.add(data.edges.reverse());
  }
  network.editNode();
}

async function search(){
  //Obtenemos la velocidad para la animacion
  let inputValue = document.getElementById("valor").value;
  var speed = document.getElementById("formControlRange").value;
  speed = convertir(speed)
  var animation = {
    scale: 4,
    animation: {
      duration:speed,
      easingFunction: "linear"
    }
  }

  //Verificamos si el valor es un numero o string
  if(!isNaN(parseInt(inputValue))){
    inputValue = parseInt(inputValue)
  }
  //Obtenemos el recorrido del arbol y recorremos
  let array = arbolito.search(inputValue)
  for(let i = 0; i < array.recorrido.length; i++){
    let currentId = array.recorrido[i]
    network.selectNodes([currentId])
    network.focus(currentId, animation)
    await new Promise(resolve => setTimeout(resolve, speed+10))
  }
  //Si encontro o no el valor
  if(array.encontrado == true){
    alert("Valor encontrado!");
  } else {
    network.selectEdges([])
    alert("No se ha encontrado el valor!");
  }
  network.fit()
}