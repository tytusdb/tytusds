// create a network
var container = document.getElementById("mynetwork");
let matricita = new Matriz()
let DOTstring = matricita.createGraph()
var parsedData = vis.parseDOTNetwork(DOTstring);
var data = {nodes: parsedData.nodes, edges: parsedData.edges}
var options = {nodes:{shape: "star"},edges:{color:"#17202A"},layout: { randomSeed: 9 }};
var network = new vis.Network(container, data, options);

/*EVENTOS*/
$('#add').on('click', () => agregar())
$('#search').on('click', () => search())
$('#delete').on('click', () => remove())
$('#update').on('click', () => update())
$('#pruebita').on('click', () => prueba())
$('#cargar').on('click', () => cargarJson())
$('#guardar').on('click', () => guardarJson())

function graficarMatriz(){
  //reset the network
  container = document.getElementById("mynetwork");
  DOTstring = matricita.createGraph()
  parsedData = vis.parseDOTNetwork(DOTstring);
  data = {nodes: parsedData.nodes, edges: parsedData.edges}
  options = {nodes:{shape: "star"},edges:{color:"#17202A"},layout: { randomSeed: 9 }};
  network = new vis.Network(container, data, options);
}

function prueba(){
  var animation = {
    scale: 4,
    animation: {
      duration:1000,
      easingFunction: "linear"
    }
  }
  network.focus("Principal", animation)
}

async function cargarJson(){
  matricita = new Matriz()
  var objeto = null
  //Obtenemos el archivo 
  let upload = document.getElementById('formFileSm');
  let fr = new FileReader()
  fr.readAsText(upload.files[0])
  fr.onload = async function(){
    objeto = JSON.parse(fr.result)
    //Seteamos la animacion
    document.getElementById("formControlRange").value = (objeto.animacion*10).toString();
    //Aqui ya ingresamos
    for(let i = 0; i < objeto.valores.length; i++){
      matricita.insertar((objeto.valores[i].valor).toString(), objeto.valores[i].indices[0], objeto.valores[i].indices[1])
    }
    //Graficamos
    graficarMatriz()
  }
}

function guardarJson(){
  var categoria = "Estructura Compuesta"
  var nombre = "Matriz Dispersa"
  var speed = document.getElementById("formControlRange").value;
  let valores = matricita.getValores()
  var objeto = {
    categoria: categoria,
    nombre: nombre,
    animacion: speed/10,
    valores: valores
  }
  var JsonString = JSON.stringify(objeto);
  download("Matriz.json",JsonString);
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
  //Obtenemos los valores
  let inputValue = document.getElementById("valor").value;
  let x = parseInt(document.getElementById("x").value);
  let y = parseInt(document.getElementById("y").value);
  //Ingresamos los valores a la matriz y graficamos
  matricita.insertar(inputValue, x, y)
  graficarMatriz()
  //Ahora limpiamos
  document.getElementById("valor").value = ""
  document.getElementById("x").value = ""
  document.getElementById("y").value = ""
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
  //Obtenemos el recorrido del arbol y recorremos
  let buscado = matricita.search(inputValue)
  network.selectNodes(["Principal"])
  network.focus("Principal", animation)
  await new Promise(resolve => setTimeout(resolve, speed+10))
  for(let i = 0; i < buscado.recorrido.length; i++){
    network.selectNodes([buscado.recorrido[i]])
    network.focus(buscado.recorrido[i], animation)
    await new Promise(resolve => setTimeout(resolve, speed+10))
  }
  //Si encontro o no el valor
  if(buscado.encontrado == true){
    alert("Valor encontrado!");
  } else {
    network.selectEdges([])
    alert("No se ha encontrado el valor!");
  }
  network.fit()
  //Ahora limpiamos
  document.getElementById("valor").value = ""
}

async function update(){
  //Obtenemos la velocidad para la animacion
  let inputValue = document.getElementById("valor").value;
  let inputUpdate = document.getElementById("nuevoValor").value;
  var speed = document.getElementById("formControlRange").value;
  speed = convertir(speed)
  var animation = {
    scale: 4,
    animation: {
      duration:speed,
      easingFunction: "linear"
    }
  }
  //Obtenemos el recorrido del arbol y recorremos
  let buscado = matricita.update(inputValue, inputUpdate)
  network.selectNodes(["Principal"])
  network.focus("Principal", animation)
  await new Promise(resolve => setTimeout(resolve, speed+10))
  for(let i = 0; i < buscado.recorrido.length; i++){
    network.selectNodes([buscado.recorrido[i]])
    network.focus(buscado.recorrido[i], animation)
    await new Promise(resolve => setTimeout(resolve, speed+10))
  }
  network.fit()
  //Si encontro o no el valor
  if(buscado.encontrado == true){
    //Ahora volvemos a graficar
    await new Promise(resolve => setTimeout(resolve, speed/2))
    graficarMatriz()
    network.selectNodes([buscado.actualizado])
  } else {
    network.selectEdges([])
    alert("No se ha encontrado el valor :c");
  }
  //Ahora limpiamos
  document.getElementById("valor").value = ""
  document.getElementById("nuevoValor").value = ""
}

async function remove(){
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
  //Obtenemos el recorrido del arbol y recorremos
  let buscado = matricita.delete(inputValue)
  network.selectNodes(["Principal"])
  network.focus("Principal", animation)
  await new Promise(resolve => setTimeout(resolve, speed+10))
  for(let i = 0; i < buscado.recorrido.length; i++){
    network.selectNodes([buscado.recorrido[i]])
    network.focus(buscado.recorrido[i], animation)
    await new Promise(resolve => setTimeout(resolve, speed+10))
  }
  network.fit()
  //Si encontro o no el valor
  if(buscado.encontrado == true){
    await new Promise(resolve => setTimeout(resolve, speed/2))
    graficarMatriz()
  } else {
    network.selectEdges([])
    alert("No se ha encontrado el valor!");
  }
  //Ahora limpiamos
  document.getElementById("valor").value = ""
}