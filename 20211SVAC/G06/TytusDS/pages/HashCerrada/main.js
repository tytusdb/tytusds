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
    shape: 'triangle',
    size: 20,
    color:"#F63535"
  },
  edges:{
    color:"#17202A",
    arrows:'to'
  },
  physics:{
    wind: {
      x: 0.5
    }
  }
};

// initialize your network!
var network = new vis.Network(container, data, options);

var cont = 0

let tablita = new HashCerrada(10)

/*EVENTOS*/
$('#create').on('click', () => crear())
$('#rehashing').on('click', () => rehashing())
$('#add').on('click', () => agregar())
$('#search').on('click', () => search())
$('#delete').on('click', () => remove())
$('#update').on('click', () => update())
$('#pruebita').on('click', () => prueba())
$('#cargar').on('click', () => cargarJson())
$('#guardar').on('click', () => guardarJson())

function crear(){
  //Reset all options
  nodes = new vis.DataSet([]);
  edges = new vis.DataSet([]);
  container = document.getElementById('mynetwork');
  data = {nodes: nodes,edges: edges};
  options = {
      nodes: {
      shape: 'triangle',
      size: 20,
      color:"#F63535"
    },
    edges:{
      color:"#17202A",
      arrows:'to'
    }/*,
    physics:{
      wind: {
        x: 0.5
      }
    }*/
  };
  network = new vis.Network(container, data, options);
  cont = 0

  let inputValue = parseInt(document.getElementById("m").value);
  tablita = new HashCerrada(inputValue)
  for(let i = 0; i < inputValue; i++){
    /*if(i == 0){
      updatedIds = nodes.add([{
        id: cont,
        label:i.toString()+"|",
        fixed: true,
        x: -600
      }]);
    } else {*/
      updatedIds = nodes.add([{
        id: cont,
        label:i.toString()+"|" 
      }]);
    //}
    updatedIds = edges.add([
      {from: cont-1, to: cont}
    ])
    cont++
  }
  network.selectNodes([updatedIds[0]]);
  network.editNode();
}

function rehashing(){
  let modo = "linear"
  let hash = document.getElementById("hash").value;
  if(hash == 0){
    modo = "linear"
  }
  else if(hash == 1){
    modo = "quadratic"
  }
  else {
    modo = "double"
  }
  let Max = parseInt(document.getElementById("max").value);
  let Min = parseInt(document.getElementById("min").value);
  let array = tablita.rehashing(Max, Min, modo)
  if(array != null){
    //Reset all options
    nodes = new vis.DataSet([]);
    edges = new vis.DataSet([]);
    container = document.getElementById('mynetwork');
    data = {nodes: nodes,edges: edges};
    options = {
        nodes: {
        shape: 'triangle',
        size: 20,
        color:"#F63535"
      },
      edges:{
        color:"#17202A",
        arrows:'to'
      }/*,
      physics:{
        wind: {
          x: 0.5
        }
      }*/
    };
    network = new vis.Network(container, data, options);
    cont = 0

    for(let i = 0; i < array.length; i++){
      if(array[i] != null){
        updatedIds = nodes.add([{
          id: cont,
          label:i.toString()+"|"+array[i]
        }]);
      } else {
        updatedIds = nodes.add([{
          id: cont,
          label:i.toString()+"|" 
        }]);
      }
      updatedIds = edges.add([
        {from: cont-1, to: cont}
      ])
      cont++
    }
    network.selectNodes([updatedIds[0]]);
    network.editNode();

  } else {
    alert("La tabla no está lo suficientemente llena");
  }
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
    //SETEAMOS LA RESOLUSION
    let resolucion = objeto.resolucion
    if(resolucion == "Lineal"){
      document.getElementById("hash").selectedIndex = 1;
    }
    else if(resolucion == "Cuadratica"){
      document.getElementById("hash").selectedIndex = 2;
    }
    else {
      document.getElementById("hash").selectedIndex = 3;
    }
    //SETEAMOS EL MINIMO Y MAXIMO
    document.getElementById("max").value = objeto.maximo.toString();
    document.getElementById("min").value = objeto.minimo.toString();
    //SETEAMOS EL TAMANIO
    tablita = new HashCerrada(objeto.size)
    //AQUI YA AGREGAMOS
    for(let i = 0; i < objeto.valores.length; i++){
      if(resolucion == "Lineal"){
        tablita.setLinearHash(objeto.valores[i])
      }
      else if(resolucion == "Cuadratica"){
        tablita.setQuadraticHash(objeto.valores[i])
      } else {
        tablita.setDoubleHash(objeto.valores[i])
      }
    }
    let array = tablita.getArray()
    //Reset all options
    nodes = new vis.DataSet([]);
    edges = new vis.DataSet([]);
    container = document.getElementById('mynetwork');
    data = {nodes: nodes,edges: edges};
    options = {
        nodes: {
        shape: 'triangle',
        size: 20,
        color:"#F63535"
      },
      edges:{
        color:"#17202A",
        arrows:'to'
      }/*,
      physics:{
        wind: {
          x: 0.5
        }
      }*/
    };
    network = new vis.Network(container, data, options);
    cont = 0

    for(let i = 0; i < array.length; i++){
      if(array[i] != null){
        updatedIds = nodes.add([{
          id: cont,
          label:i.toString()+"|"+array[i]
        }]);
      } else {
        updatedIds = nodes.add([{
          id: cont,
          label:i.toString()+"|" 
        }]);
      }
      updatedIds = edges.add([
        {from: cont-1, to: cont}
      ])
      cont++
    }
    network.selectNodes([updatedIds[0]]);
    network.editNode();
  }
}

function guardarJson(){
  var categoria = "Estructura No Lineal"
  var nombre = "Tabla Hash"
  var metodo
  if(document.getElementById("modo").value == 0){
    metodo = "Simple"
  }
  else if(document.getElementById("modo").value == 1){
    metodo = "Division"
  }
  else {
    metodo = "Multiplicacion"
  }
  var resolucion
  if(document.getElementById("hash").value == 0){
    resolucion = "Lineal"
  }
  else if(document.getElementById("hash").value == 1){
    resolucion = "Cuadratica"
  }
  else {
    resolucion = "Doble"
  }
  var size = tablita.getArray().length
  var constante = 0.1625277911
  var minimo = parseInt(document.getElementById("min").value)
  var maximo = parseInt(document.getElementById("max").value)
  var speed = document.getElementById("formControlRange").value;
  var tipo = "String/Integer"
  let array = tablita.getArray()
  let valores = []
  for(let i = 0; i < array.length; i++){
    if(array[i] != null){
      valores.push(array[i])
    }
  }
  var objeto = {
    categoria: categoria,
    nombre: nombre,
    metodo: metodo,
    resolucion: resolucion,
    size: size,
    constante: constante,
    minimo: minimo,
    maximo: maximo,
    animacion: speed/10,
    tipo: tipo,
    valores: valores
  }
  var JsonString = JSON.stringify(objeto);
  console.log(JsonString)
  download("TablaHashCerrada.json",JsonString);
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


function prueba(){
  console.log(listita.print())
}

function convertir(porcentaje){
  let result = (100 - porcentaje)*10
  if (result == 0){
    result = 50
  }
  return result
}

async function agregar(){
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
  let hash = document.getElementById("hash").value;

  var actualizacion
  if(hash == 0){
    actualizacion = tablita.setLinearHash(inputValue)
  }
  else if(hash == 1){
    actualizacion = tablita.setQuadraticHash(inputValue)
  }
  else {
    actualizacion = tablita.setDoubleHash(inputValue)
  }
  //Aqui hacemos el recorrido
  for(let i = 0; i < actualizacion.recorrido.length; i++){
    network.selectNodes([actualizacion.recorrido[i]])
    network.focus(actualizacion.recorrido[i], animation)
    await new Promise(resolve => setTimeout(resolve, speed+10)); // 3 sec
  }
  if(actualizacion.actualizar != null){
    network.fit()
    await new Promise(resolve => setTimeout(resolve, speed/2));
    nodes.update({id:actualizacion.actualizar, label:actualizacion.actualizar + "|" + inputValue});
  } else {
    network.selectNodes([])
    network.fit()
    alert("La tabla ya está llena :c");
  }
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
  let inputValue = document.getElementById("valor").value;
  if(!isNaN(parseInt(inputValue))){
    inputValue = parseInt(inputValue)
  }
  let hash = document.getElementById("hash").value;

  var actualizacion
  if(hash == 0){
    actualizacion = tablita.searchLinearHash(inputValue)
  }
  else if(hash == 1){
    actualizacion = tablita.searchQuadraticHash(inputValue)
  }
  else {
    actualizacion = tablita.searchDoubleHash(inputValue)
  }
  //Aqui hacemos el recorrido
  for(let i = 0; i < actualizacion.recorrido.length; i++){
    network.selectNodes([actualizacion.recorrido[i]])
    network.focus(actualizacion.recorrido[i], animation)
    await new Promise(resolve => setTimeout(resolve, speed+10)); // 3 sec
  }
  if(actualizacion.encontrado == true){
    network.fit()
    alert("Se ha encontrado el valor exitosamente :)");
  } else {
    network.selectNodes([])
    network.fit()
    alert("No se ha encontrado el valor :c");
  }
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
  let inputUpdate = document.getElementById("nuevoValor").value;
  if(!isNaN(parseInt(inputValue))){
    inputValue = parseInt(inputValue)
  }
  if(!isNaN(parseInt(inputUpdate))){
    inputUpdate = parseInt(inputUpdate)
  }
  let hash = document.getElementById("hash").value;

  var actualizacion
  if(hash == 0){
    actualizacion = tablita.updateLinearHash(inputValue, inputUpdate)
  }
  else if(hash == 1){
    actualizacion = tablita.updateQuadraticHash(inputValue, inputUpdate)
  }
  else {
    actualizacion = tablita.updateDoubleHash(inputValue, inputUpdate)
  }
  //Aqui hacemos el recorrido
  for(let i = 0; i < actualizacion.recorrido.length; i++){
    network.selectNodes([actualizacion.recorrido[i]])
    network.focus(actualizacion.recorrido[i], animation)
    await new Promise(resolve => setTimeout(resolve, speed+10)); // 3 sec
  }
  if(actualizacion.eliminado != null){
    network.fit()
    await new Promise(resolve => setTimeout(resolve, speed/2));
    nodes.update({id:actualizacion.eliminado, label:actualizacion.eliminado + "|"});
    nodes.update({id:actualizacion.actualizar, label:actualizacion.actualizar + "|" + inputUpdate});
  } else {
    network.selectNodes([])
    network.fit()
    alert("No se encontró el valor :c");
  }
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
  let hash = document.getElementById("hash").value;

  var actualizacion
  if(hash == 0){
    actualizacion = tablita.deleteLinearHash(inputValue)
  }
  else if(hash == 1){
    actualizacion = tablita.deleteQuadraticHash(inputValue)
  }
  else {
    actualizacion = tablita.deleteDoubleHash(inputValue)
  }
  //Aqui hacemos el recorrido
  for(let i = 0; i < actualizacion.recorrido.length; i++){
    network.selectNodes([actualizacion.recorrido[i]])
    network.focus(actualizacion.recorrido[i], animation)
    await new Promise(resolve => setTimeout(resolve, speed+10)); // 3 sec
  }
  if(actualizacion.actualizar != null){
    network.fit()
    await new Promise(resolve => setTimeout(resolve, speed/2));
    nodes.update({id:actualizacion.actualizar, label:actualizacion.actualizar + "|"});
  } else {
    network.selectNodes([])
    network.fit()
    alert("No se encontró el valor :c");
  }
}