// create an array with nodes
var nodes = new vis.DataSet([

]);

// create an array with edges
var edges = new vis.DataSet([

]);

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {};

// initialize your network!
var network = new vis.Network(container, data, options);

var cont = 0

let colita = new ListaCircularDoble()

/*EVENTOS*/
$('#add').on('click', () => agregar())
$('#search').on('click', () => search())
$('#delete').on('click', () => remove())
$('#pop').on('click', () => pop())
$('#update').on('click', () => update())
$('#pruebita').on('click', () => prueba())
$('#cargar').on('click', () => cargarJson())
$('#guardar').on('click', () => guardarJson())

async function cargarJson(){
  network = new vis.Network(container, data, options);
  colita = new ListaCircularDoble()
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
    //AQUI YA AGREGAMOS
    var updatedIds
    for(let i = 0; i < objeto.valores.length; i++){
      //VERIFICAMOS SI VIENEN REPETIDOS
      if(objeto.repeticion == false){
        let encontrado = colita.search(objeto.valores[i])
        if(encontrado != null){
          continue
        }
      }
      /*AQUI EMPIEZA LA INSERTADA POR CADA NODO*/
      let beforeId = -1
      let afterId = -1
      //Ahora hay que conseguir el id de antes y despues de la lista
      let valor = {
        value: objeto.valores[i],
        id: cont
      }
      colita.add(valor)
      let actual = colita.getUltimo()
      let primero = colita.isFirst()
      if(!primero){
        //conseguimos los ids
        beforeId = actual.anterior.valor.id
        afterId = actual.siguiente.valor.id
      }
      //Ahora agregamos el nodo visualmente
      let noditos = network.getConnectedEdges(beforeId)
      for(let i = 0; i < noditos.length; i++){
        let link = edges.get(noditos[i])
        if(link.to == afterId){
          network.selectEdges([link.id])
          network.deleteSelected()
        }
      }
      var updatedIds = nodes.add([{
        id: cont,
        label:(objeto.valores[i]).toString(),
        shape: "dot",
        color:"#990033"
      }]);
      updatedIds = edges.add([
        {from: beforeId, to: cont, arrows:'to;from', color:"#17202A"}
      ])
      updatedIds = edges.add([
        {from: cont, to: afterId, arrows:'to;from', color:"#17202A"}
      ])
      cont++
      /*Y AQUI TERMINA LA INSERTADA POR CADA NODO*/
    }
    network.selectNodes([updatedIds[0]]);
    network.editNode();
  }
}

function guardarJson(){
  var categoria = "Estructura Lineal"
  var nombre = "Lista Circular Doblemente Enlazada"
  var repetir = document.getElementById("flexSwitchCheckDefault").checked;
  var speed = document.getElementById("formControlRange").value;
  let array = colita.toArray()
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
  console.log(JsonString)
  download("ListaCircularDoble.json",JsonString);
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
  console.log(colita.print())
}

function convertir(porcentaje){
  let result = (100 - porcentaje)*10
  if (result == 0){
    result = 50
  }
  return result
}

function agregar(){
  //Obtenemos los datos para ingresar
  var repetir = document.getElementById("flexSwitchCheckDefault").checked;
  let inputValue = document.getElementById("valor").value;
  if(repetir == false){
    let existe = colita.search(inputValue)
    if(existe != null){
      alert("Ese valor ya existe :c")
      return
    }
  }
  let beforeId = -1
  let afterId = -1
  //Ahora hay que conseguir el id de antes y despues de la lista
  let valor = {
    value: inputValue,
    id: cont
  }
  colita.add(valor)
  let actual = colita.getUltimo()
  let primero = colita.isFirst()
  if(!primero){
    //conseguimos los ids
    beforeId = actual.anterior.valor.id
    afterId = actual.siguiente.valor.id
  }
  //Ahora agregamos el nodo visualmente
  let noditos = network.getConnectedEdges(beforeId)
  for(let i = 0; i < noditos.length; i++){
    let link = edges.get(noditos[i])
    if(link.to == afterId){
      network.selectEdges([link.id])
      network.deleteSelected()
    }
  }
  var updatedIds = nodes.add([{
    id: cont,
    label:inputValue,
    shape: "dot",
    color:"#990033"
  }]);
  updatedIds = edges.add([
    {from: beforeId, to: cont, arrows:'to;from', color:"#17202A"}
  ])
  updatedIds = edges.add([
    {from: cont, to: afterId, arrows:'to;from', color:"#17202A"}
  ])
  cont++
  network.selectNodes([updatedIds[0]]);
  network.editNode();
}

async function search(){
  var speed = document.getElementById("formControlRange").value;
  speed = convertir(speed)
  var animation = {
    scale: 4,
    animation: {
      duration:speed,
      easingFunction: "linear"
    }
  }
  let input = document.getElementById("valor").value;
  let nodo = colita.search(input)
  let array = colita.toArray()
  if(nodo != null){
    for(let i = 0; i < array.length; i++){
      let currentId = array[i].id
      network.selectNodes([currentId])
      network.focus(currentId, animation)
      await new Promise(resolve => setTimeout(resolve, speed+10)); // 3 sec
      if(currentId == nodo.valor.id){
        alert("Valor encontrado!");
        break
      }
    }
    network.fit()
  } else {
    for(let i = 0; i < array.length; i++){
      network.selectNodes([array[i].id])
      network.focus(array[i].id, animation)
      await new Promise(resolve => setTimeout(resolve, speed+10)); // 3 sec
    }
    network.selectEdges([])
    network.fit()
    alert("No se ha encontrado el valor!");
  }
}

async function update(){
  var speed = document.getElementById("formControlRange").value;
  speed = convertir(speed)
  var animation = {
    scale: 4,
    animation: {
      duration:speed,
      easingFunction: "linear"
    }
  }
  let input = document.getElementById("valor").value;
  let inputUpdate = document.getElementById("nuevoValor").value;
  let nodo = colita.update(input, inputUpdate)
  let array = colita.toArray()
  if(nodo != null){
    for(let i = 0; i < nodes.length; i++){
      let currentId = array[i].id
      network.selectNodes([currentId])
      network.focus(currentId, animation)
      await new Promise(resolve => setTimeout(resolve, speed+10)); // 3 sec
      if(currentId == nodo.valor.id){
        network.fit()
        await new Promise(resolve => setTimeout(resolve, speed/2));
        nodes.update({id:currentId, label:inputUpdate});
        break
      }
    }
    network.fit()
  } else {
    for(let i = 0; i < array.length; i++){
      network.selectNodes([array[i].id])
      network.focus(array[i].id, animation)
      await new Promise(resolve => setTimeout(resolve, speed+10));
    }
    network.selectEdges([])
    network.fit()
    alert("No se ha encontrado el valor!");
  }
}

async function remove(){
  var speed = document.getElementById("formControlRange").value;
  speed = convertir(speed)
  var animation = {
    scale: 4,
    animation: {
      duration:speed,
      easingFunction: "linear"
    }
  }
  let input = document.getElementById("valor").value;
  let array = colita.toArray()
  let nodo = colita.delete(input)
  if(nodo != null){
    for(let i = 0; i < array.length; i++){
      let currentId = array[i].id
      /*Esto es lo de la animacion*/
      network.selectNodes([currentId])
      network.focus(currentId, animation)
      await new Promise(resolve => setTimeout(resolve, speed+10)); // 3 sec
      /*Termina lo de la animacion*/
      if(currentId == nodo.valor.id){
        network.fit()
        await new Promise(resolve => setTimeout(resolve, speed/2)); // 3 sec
        network.deleteSelected();
        var updatedIds
        let primero = colita.isFirst()
        if(!primero){
          updatedIds = edges.add([
            {from: nodo.anterior.valor.id, to: nodo.siguiente.valor.id, arrows:'to;from', color:"#17202A"}
          ])
        }
        network.selectNodes([updatedIds[0]]);
        network.editNode();
        break
      }
    }
    network.fit()
  } else {
    for(let i = 0; i < array.length; i++){
      network.selectNodes([array[i].id])
      network.focus(array[i].id, animation)
      await new Promise(resolve => setTimeout(resolve, speed+10)); // 3 sec
    }
    network.selectEdges([])
    network.fit()
    alert("No se ha encontrado el valor!");
  }
}