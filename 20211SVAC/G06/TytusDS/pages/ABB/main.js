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
        nodeSpacing: 200  
    }
  },
  nodes: {
    shape: 'star',
    size: 20,
    color:"#CD5C5C"
  },
  edges:{
    color:"#17202A",
    arrows:'to'
  }
};

// initialize your network!
var network = new vis.Network(container, data, options);

var cont = 0

let arbolito = new ABB()

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
  arbolito = new ABB()
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
          let encontrado = arbolito.exist(objeto.valores[i])
          if(encontrado == true){
            continue
          }
        }
        //let inputValue = objeto.valores[i]
        var nuevoValor = {
          id: cont,
          value: objeto.valores[i]
        }
        let array = arbolito.add(nuevoValor)
        //Ahora ingresamos el valor en el canvas
        let beforeId = -1
        if(array.length > 0){
          beforeId = array[array.length-1].id
        }
        updatedIds = nodes.add([{
          id: cont,
          label:(objeto.valores[i]).toString()
        }]);
        updatedIds = edges.add([
        {from: beforeId, to: cont}
        ])
        cont++
    }
    //console.log(updatedIds)
    network.selectNodes([updatedIds[0]]);
    network.editNode();
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


  /*ESTO ES PARA VALIDAR SI EXISTE EL ELEMENTO*/
  if(repetir == false){
    let existe = arbolito.exist(inputValue)
    if(existe != null){
      alert("Ese valor ya existe :c")
      return
    }
  }
  /*******************************************/
  //Verificamos si el valor es un numero o string
  if(!isNaN(parseInt(inputValue))){
    inputValue = parseInt(inputValue)
  }
  /*AHORA INGRESAMOS EL VALOR Y RECORREMOS EL ARRAY*/
  var nuevoValor = {
    id: cont,
    value: inputValue
  }
  let array = arbolito.add(nuevoValor)
  for(let i = 0; i < array.length; i++){
    //Esto es full animacion
    let currentId = array[i].id
    network.selectNodes([currentId])
    network.focus(currentId, animation)
    await new Promise(resolve => setTimeout(resolve, speed+10)); // 3 sec
  }
  network.fit()
  await new Promise(resolve => setTimeout(resolve, speed/2));
  //Ahora ingresamos el valor en el canvas
  let beforeId = -1
  var position = 0
  if(array.length > 0){
    beforeId = array[array.length-1].id
    position = network.getPosition(beforeId)
  }
  var updatedIds = nodes.add([{
    id: cont,
    label:(inputValue).toString(),
    x: position.x-100
  }]);
  updatedIds = edges.add([
  {from: beforeId, to: cont}
  ])
  cont++
  network.selectNodes([updatedIds[0]]);
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
    let currentId = array.recorrido[i].id
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

async function update(){
  var speed = document.getElementById("formControlRange").value;
  //Obtenemos la velocidad para la animacion
  let inputValue = document.getElementById("valor").value;
  let input = document.getElementById("nuevoValor").value;
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
  if(!isNaN(parseInt(input))){
    input = parseInt(input)
  }
  //Obtenemos el recorrido del arbol y recorremos
  let array = arbolito.search(inputValue)
  for(let i = 0; i < array.recorrido.length; i++){
    let currentId = array.recorrido[i].id
    network.selectNodes([currentId])
    network.focus(currentId, animation)
    await new Promise(resolve => setTimeout(resolve, speed+10))
  }
  //Si encontro o no el valor
  if(array.encontrado == true){
    //PROCEDEMOS A HACER TODO EL PROCESO
    /******PROCESO PARA ELMINAR EL VALOR QUE ESTAMOS ACTUALIZANDO*******/
    network.fit()
    await new Promise(resolve => setTimeout(resolve, speed/2));
    //Eliminamos el nodo papi
    let arbolitoNuevo = arbolito.delete(inputValue)
    //Verificamos si hay nodo para eliminar
    if(arbolitoNuevo.eliminado != null){
      network.selectNodes([arbolitoNuevo.eliminado.valor.id])
      network.deleteSelected();
    }
    //Verificamos si hay que actualizar un nodo
    console.log(arbolitoNuevo.actualizado)
    if(arbolitoNuevo.actualizado != null){
      nodes.update({id:(arbolitoNuevo.actualizado.valor.id), label:(arbolitoNuevo.actualizado.valor.value).toString()});
    }
    /******PROCESO PARA INGRESAR EL NUEVO VALOR ACTUALIZADO*****/
    var nuevoValor = {
      id: cont,
      value: input
    }
    let array = arbolito.add(nuevoValor)
    let beforeId = -1
    var position = 0
    if(array.length > 0){
      beforeId = array[array.length-1].id
      position = network.getPosition(beforeId)
    }
    var updatedIds = nodes.add([{
      id: cont,
      label:(input).toString(),
      x: position.x-100
    }]);
    if(arbolitoNuevo.nuevoPadre != null && arbolitoNuevo.nuevoHijo != null){
      updatedIds = edges.add([
        {from: beforeId, to: cont},
        {from: arbolitoNuevo.nuevoPadre.valor.id, to: arbolitoNuevo.nuevoHijo.valor.id}
      ])
    } else {
      updatedIds = edges.add([
        {from: beforeId, to: cont}
      ])
    }
    cont++
    network.selectNodes([updatedIds[0]]);
    network.editNode();
  } else {
    network.selectEdges([])
    alert("No se ha encontrado el valor!");
  }
  network.fit()
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

  //Verificamos si el valor es un numero o string
  if(!isNaN(parseInt(inputValue))){
    inputValue = parseInt(inputValue)
  }
  //Obtenemos el recorrido del arbol y recorremos
  let array = arbolito.search(inputValue)
  for(let i = 0; i < array.recorrido.length; i++){
    let currentId = array.recorrido[i].id
    network.selectNodes([currentId])
    network.focus(currentId, animation)
    await new Promise(resolve => setTimeout(resolve, speed+10))
  }
  //Si encontro o no el valor
  if(array.encontrado == true){
    network.fit()
    await new Promise(resolve => setTimeout(resolve, speed/2));
    //Eliminamos el nodo papi
    let arbolitoNuevo = arbolito.delete(inputValue)
    //Verificamos si hay nodo para eliminar
    if(arbolitoNuevo.eliminado != null){
      network.selectNodes([arbolitoNuevo.eliminado.valor.id])
      network.deleteSelected();
    }
    //Verificamos si hay que actualizar un nodo
    console.log(arbolitoNuevo.actualizado)
    if(arbolitoNuevo.actualizado != null){
      nodes.update({id:(arbolitoNuevo.actualizado.valor.id), label:(arbolitoNuevo.actualizado.valor.value).toString()});
    }
    //Verificamos si hay nodoPadre y nodo Hijo
    if(arbolitoNuevo.nuevoPadre != null && arbolitoNuevo.nuevoHijo != null){
        var updatedIds = edges.add([
          {from: arbolitoNuevo.nuevoPadre.valor.id, to: arbolitoNuevo.nuevoHijo.valor.id}
        ])
        network.selectNodes([updatedIds[0]]);
        network.editNode();
    }
  } else {
    network.fit()
    network.selectEdges([])
    alert("No se ha encontrado el valor!");
  }
}