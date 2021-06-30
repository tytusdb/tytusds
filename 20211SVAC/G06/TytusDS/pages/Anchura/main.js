// create an array with nodes
var nodes = new vis.DataSet([
  //nodes
]);

// create an array with edges
var edges = new vis.DataSet([
  //links
]);

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    nodes: {
    shape: 'hexagon',
    size: 20,
    color:"#6ABF87"
  },
  edges:{
    color:"#17202A",
    arrows:'to'
  }
};

// initialize your network!
var network = new vis.Network(container, data, options);

var cont = 0

let grafito = new Graph()

/*EVENTOS*/
$('#createNode').on('click', () => crearNodo())
$('#createEdge').on('click', () => crearArista())
$('#recorrer').on('click', () => recorrer())
$('#search').on('click', () => search())
$('#delete').on('click', () => remove())
$('#update').on('click', () => update())
$('#pruebita').on('click', () => prueba())
$('#cargar').on('click', () => cargarJson())
$('#guardar').on('click', () => guardarJson())

function prueba(){
  grafito.print()
  console.log(edges)
}

function crearNodo(){
  let inputValue = document.getElementById("valor").value;
  if(!isNaN(parseInt(inputValue))){
    inputValue = parseInt(inputValue)
  }
  if(grafito.existNode(inputValue)){
    alert("Ese nodo ya existe :c")
    return
  }
  grafito.addNode(inputValue, cont)
  var updatedIds = nodes.add([{
    id: cont,
    label:inputValue.toString()
  }]);
  cont++
  document.getElementById("valor").value = ""
}

function crearArista(){
  let From = document.getElementById("from").value;
  let To = document.getElementById("to").value;
  let Distancia = document.getElementById("distancia").value;
  if(!isNaN(parseInt(From))){
    From = parseInt(From)
  }
  if(!isNaN(parseInt(To))){
    To = parseInt(To)
  }
  if(!grafito.existNode(From)){
    alert("El nodo '" + From + "' no existe :c")
    return
  }
  if(!grafito.existNode(To)){
    alert("El nodo '" + To + "' no existe :c")
    return
  }
  if(grafito.existEdge(From, To)){
    alert("Esa arista ya existe :c")
    return
  }
  grafito.addEdge(From, To)
  let FromId = grafito.getId(From)
  let ToId = grafito.getId(To)
  var updatedIds = edges.add([{
    from: FromId,
    to: ToId,
    label: Distancia
  }]);
  document.getElementById("from").value = ""
  document.getElementById("to").value = ""
  document.getElementById("distancia").value = ""
}

async function cargarJson(){
  var objeto = null
  //Obtenemos el archivo 
  let upload = document.getElementById('formFileSm');
  let fr = new FileReader()
  fr.readAsText(upload.files[0])
  fr.onload = async function(){
    objeto = JSON.parse(fr.result)
    //SETEAMOS LA ANIMACION
    document.getElementById("formControlRange").value = (objeto.animacion*10).toString();
    //SETEAMOS EL TAMANIO
    grafito = new Graph()
    //Reset all options
    nodes = new vis.DataSet([]);
    edges = new vis.DataSet([]);
    container = document.getElementById('mynetwork');
    data = {nodes: nodes,edges: edges};
    options = {
        nodes: {
        shape: 'hexagon',
        size: 20,
        color:"#6ABF87"
      },
      edges:{
        color:"#17202A",
        arrows:'to'
      }
    }
    network = new vis.Network(container, data, options);
    cont = 0
    //AQUI YA AGREGAMOS
    var updatedIds
    //Agregamos los nodos
    for(let i = 0; i < objeto.valores.length; i++){
      if(grafito.existNode(objeto.valores[i].vertice)) continue
      grafito.addNode(objeto.valores[i].vertice, cont)
      updatedIds = nodes.add([{
        id: cont,
        label:objeto.valores[i].vertice.toString()
      }]);
      cont++    
    }
    //Agregamos las aristas
    for(let i = 0; i < objeto.valores.length; i++){
      for(let j = 0; j < objeto.valores[i].aristas.length; j++){
        if(grafito.existEdge(objeto.valores[i].vertice, objeto.valores[i].aristas[j].arista)) continue
        grafito.addEdge(objeto.valores[i].vertice, objeto.valores[i].aristas[j].arista)
        let FromId = grafito.getId(objeto.valores[i].vertice)
        let ToId = grafito.getId(objeto.valores[i].aristas[j].arista)
        updatedIds = edges.add([{
          from: FromId,
          to: ToId,
          label: objeto.valores[i].aristas[j].distancia.toString()
        }]);
        /*if(objeto.nombre == "Grafo No Dirigido"){
          grafito.addEdge(objeto.valores[i].aristas[j].arista, objeto.valores[i].vertice)
          let ToId = grafito.getId(objeto.valores[i].vertice)
          let FromId = grafito.getId(objeto.valores[i].aristas[j].arista)
          updatedIds = edges.add([{
            from: FromId,
            to: ToId,
            label: objeto.valores[i].aristas[j].distancia.toString()
          }]);
        }*/
      }
    }
  }
}

function guardarJson(){
  var categoria = "Estructura No Lineal"
  var nombre = "Grafo No Dirigido"
  var almacenamiento = "Matriz/Lista"
  var speed = document.getElementById("formControlRange").value;
  let data = grafito.getData()
  let valores = []
  for(let i = 0; i < data.length; i++){
    let valor = {
      vertice: null,
      aristas: []
    }
    valor.vertice = data[i].value
    for(let j = 0; j < data[i].edges.length; j++){
      let valorArista = {
        arista: null,
        distancia: 0
      }
      valorArista.arista = data[i].edges[j]
      //Wa intentar obtener la distancia de adorno :v
      let aristitas = network.getConnectedEdges(grafito.getId(data[i].value))
      for(let k = 0; k < aristitas.length; k++){
        let link = edges.get(aristitas[k])
        if(link.to == grafito.getId(data[i].edges[j])){
          if(link.label != null && link.label != ""){
            let distancia = link.label
              if(!isNaN(parseInt(distancia))){
                distancia = parseInt(distancia)
              }
              valorArista.distancia = distancia
          }
        }
      }
      valor.aristas.push(valorArista)
    }
    valores.push(valor)
  }
  var objeto = {
    categoria: categoria,
    nombre: nombre,
    almacenamiento: almacenamiento,
    animacion: speed/10,
    valores: valores
  }
  var JsonString = JSON.stringify(objeto);
  console.log(JsonString)
  download("GrafoDirigido.json",JsonString);
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

async function search(){
  var speed = convertir(document.getElementById("formControlRange").value);
  var animation = {
    scale: 4,
    animation: {
      duration:speed,
      easingFunction: "linear"
    }
  }
  let From = document.getElementById("from").value;
  let To = document.getElementById("to").value;
  if(!isNaN(parseInt(From))){
    From = parseInt(From)
  }
  if(!isNaN(parseInt(To))){
    To = parseInt(To)
  }
  if(!grafito.existNode(From)){
    alert("El nodo '" + From + "' no existe :c")
    return
  }
  if(!grafito.existNode(To)){
    alert("El nodo '" + To + "' no existe :c")
    return
  }
  let recorrido = grafito.breadth(From, To)
  for(let i = 0; i < recorrido.recorrido.length; i++){
    network.selectNodes([recorrido.recorrido[i]])
    network.focus(recorrido.recorrido[i], animation)
    await new Promise(resolve => setTimeout(resolve, speed+10))
  }
  network.fit()
  if(recorrido.encontrado){
    alert("Se ha encontrado el fin exitosamente :D")
  } else {
    alert("No se ha encontrado el fin :c")
  }
  document.getElementById("from").value = ""
  document.getElementById("to").value = ""
}

async function recorrer(){
  var speed = convertir(document.getElementById("formControlRange").value);
  var animation = {
    scale: 4,
    animation: {
      duration:speed,
      easingFunction: "linear"
    }
  }
  let From = document.getElementById("from").value;
  if(!isNaN(parseInt(From))){
    From = parseInt(From)
  }
  if(!grafito.existNode(From)){
    alert("El nodo '" + From + "' no existe :c")
    return
  }
  let recorrido = grafito.recorrer(From)
  for(let i = 0; i < recorrido.recorrido.length; i++){
    network.selectNodes([recorrido.recorrido[i]])
    network.focus(recorrido.recorrido[i], animation)
    await new Promise(resolve => setTimeout(resolve, speed+10))
  }
  network.selectNodes([])
  network.fit()
  document.getElementById("from").value = ""
}

async function update(){
  var speed = convertir(document.getElementById("formControlRange").value);
  var animation = {
    scale: 4,
    animation: {
      duration:speed,
      easingFunction: "linear"
    }
  }
  let inputValue = document.getElementById("valor").value;
  if(!isNaN(parseInt(inputValue))){
    inputValue = parseInt(inputValue)
  }
  let inputUpdate = document.getElementById("nuevoValor").value;
  if(!isNaN(parseInt(inputUpdate))){
    inputUpdate = parseInt(inputUpdate)
  }
  if(!grafito.existNode(inputValue)){
    alert("El nodo '" + inputValue + "' no existe :c")
    return
  }
  if(grafito.existNode(inputUpdate)){
    alert("El nodo '" + inputUpdate + "' ya existe :c")
    return
  }
  let actualizado = grafito.updateNode(inputValue, inputUpdate)
  network.focus(actualizado, animation)
  await new Promise(resolve => setTimeout(resolve, speed+10));
  network.fit()
  await new Promise(resolve => setTimeout(resolve, speed/2));
  nodes.update({id:actualizado, label:inputUpdate.toString()});
  document.getElementById("valor").value = ""
  document.getElementById("nuevoValor").value = ""
}

async function remove(){
  var speed = convertir(document.getElementById("formControlRange").value);
  var animation = {
    scale: 4,
    animation: {
      duration:speed,
      easingFunction: "linear"
    }
  }
  let inputValue = document.getElementById("valor").value;
  if(!isNaN(parseInt(inputValue))){
    inputValue = parseInt(inputValue)
  }
  if(!grafito.existNode(inputValue)){
    alert("El nodo '" + inputValue + "' no existe :c")
    return
  }
  let eliminado = grafito.deleteNode(inputValue)
  network.focus(eliminado, animation)
  await new Promise(resolve => setTimeout(resolve, speed+10));
  network.fit()
  await new Promise(resolve => setTimeout(resolve, speed/2));
  network.selectNodes([eliminado])
  network.deleteSelected()
  inputValue = document.getElementById("valor").value = ""
}