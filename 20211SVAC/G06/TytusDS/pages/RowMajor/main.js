// create an array with nodes
var nodes = new vis.DataSet([]);
// create an array with edges
var edges = new vis.DataSet([]);
// create a network
var container = document.getElementById('mynetwork');
// provide the data in the vis format
var data = {nodes: nodes, edges: edges};
var options = {
    nodes: {
    shape: 'dot',
    color:"#EDBB94"
  },
  edges:{
    color:"#17202A",
    arrows:'to'
  }
};
// initialize your network!
var network = new vis.Network(container, data, options);
var cont = 0

/*EVENTOS*/
$('#create').on('click', () => create())
$('#add').on('click', () => add())
$('#delete').on('click', () => remove())
$('#rowMajor').on('click', () => rowMajor())
$('#cargar').on('click', () => cargarJson())
$('#guardar').on('click', () => guardarJson())

//matriz global
let matriz = []
//array ya converitdo de labels
let array = []
//array ya convertido de valores
let a = []

var cont = 0

function create(){
    //Solo creamos la matriz
    let n = parseInt(document.getElementById("n").value)
    let m = parseInt(document.getElementById("m").value)
    matriz = new Array(n)
    for(let i = 0; i < n; i++){
        matriz[i] = new Array(m)
    }
    generarTabla()
    //Limpiamos
    document.getElementById("n").value = ""
    document.getElementById("m").value = ""
}

function add(){
    //Obtenemos los valores
    inputValue = document.getElementById("valor").value
    let n = parseInt(document.getElementById("n").value)
    let m = parseInt(document.getElementById("m").value)
    //Y los seteamos
    matriz[n][m] = inputValue
    //Generamos la tabla
    generarTabla()
    //Limpiamos
    document.getElementById("valor").value = ""
    document.getElementById("n").value = ""
    document.getElementById("m").value = ""
}

function remove(){
    //Obtenemos los valores
    let n = parseInt(document.getElementById("n").value)
    let m = parseInt(document.getElementById("m").value)
    //Y los seteamos
    matriz[n][m] = null
    //Generamos la tabla
    generarTabla()
    //Limpiamos
    document.getElementById("n").value = ""
    document.getElementById("m").value = ""
}

async function rowMajor() {
    //Reseteamos el network
    var nodes = new vis.DataSet([]);
    var edges = new vis.DataSet([]);
    var container = document.getElementById('mynetwork');
    var data = {nodes: nodes, edges: edges};
    var options = { nodes: { shape: 'dot', color:"#7BE141" }, edges:{ color:"#17202A", arrows:'to' } }
    var network = new vis.Network(container, data, options);
    var cont = 0
    a = []
    array = []
    colores = []
    //Obtenemos el arreglo rowMajor
    let contador = 0
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            if(matriz[i][j] == null){
                array.push(contador + " |")
                colores.push("#EDBB94")
                a.push("")
            } else {
                array.push(contador + " | " + matriz[i][j].toString())
                colores.push("#949DED")
                a.push(matriz[i][j].toString())
            }
            contador++
        }
    }
    //Aqui ya solo los presentamos
    var updatedIds
    for (let i = 0; i < array.length; i++) {
        updatedIds = nodes.add([{
            id: i,
            label: array[i],
            color: colores[i]
        }])
        updatedIds = edges.add([
            { from: i - 1, to: i}
        ])
    }
    //Para darle algo de animacion solo recorro los nodos gg
    var speed = document.getElementById("formControlRange").value;
    speed = convertir(speed)
    var animation = {
        scale: 2,
        animation: {
            duration:speed,
            easingFunction: "linear"
        }
    }
    await new Promise(resolve => setTimeout(resolve, 1000)); // 3 sec
    for (let i = 0; i < array.length; i++) {
        network.focus(i, animation)
        await new Promise(resolve => setTimeout(resolve, speed+10)); // 3 sec
    }
    network.fit()
}

function generarTabla(){
    var body = document.getElementById("matriz");
    body.innerHTML = ""
    var tabla = document.createElement("table");
    tabla.setAttribute("border", "2");
    tabla.setAttribute("class", "table")
    tabla.setAttribute("style", "font-family: 'Merriweather', serif;")
    var tblBody = document.createElement("tbody");
    for (let i = 0; i < matriz.length; i++) {
        var hilera = document.createElement("tr");
        for (let j = 0; j < matriz[0].length; j++) {
            var celda = document.createElement("td");
            var textoCelda
            if(matriz[i][j] != null){
                textoCelda = document.createTextNode(matriz[i][j].toString())
            } else {
                textoCelda = document.createTextNode("");
            }
            celda.appendChild(textoCelda);
            celda.setAttribute("style", "border: black 1px solid;background:skyblue");
            hilera.appendChild(celda);
            hilera.setAttribute("style", "border: black 1px solid;background:skyblue;");
        }
        tblBody.appendChild(hilera);
    }
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
    tabla.setAttribute("border", "2");
}

function cargarJson(){
    var file = document.getElementById('formFileSm').files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        let objeto = JSON.parse(reader.result)
        //Seteamos la animacion
        document.getElementById("formControlRange").value = (objeto.animacion*10).toString();
        //Solo creamos la matriz
        let n = objeto.m[0]
        let m = objeto.m[1]
        matriz = new Array(n)
        for(let i = 0; i < n; i++){
            matriz[i] = new Array(m)
        }
        //Ahora metemos los valores dentro de la matriz
        for(let i = 0; i < objeto.valores.length; i++){
            let x = objeto.valores[i].indices[0]
            let y = objeto.valores[i].indices[1]
            let valor = objeto.valores[i].valor
            matriz[x][y] = valor
        }
        //Generamos la tabla mediante la matriz global
        generarTabla()
    }
}

function guardarJson() {
    var obj = {
        categoria: "Estructura Compuesta",
        nombre: "Row Major",
        valores: a
    }
    texto = JSON.stringify(obj);
    download("rowMajor.json", texto);
}

function download(filename, textInput) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(textInput));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
}

function convertir(porcentaje){
  let result = (100 - porcentaje)*10
  if (result == 0){
    result = 50
  }
  return result
}