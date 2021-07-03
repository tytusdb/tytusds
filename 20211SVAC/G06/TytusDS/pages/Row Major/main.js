// create an array with nodes
var nodes = new vis.DataSet([]);
// https://motocal.com/



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
//var timeline = new vis.Timeline(container);

var cont = 0

//let grafo = new Graph();

/*EVENTOS*/
$('#add').on('click', () => ColumnMajor())
$('#result').on('click', () => resultado())
$('#cargar').on('click', () => cargarJson())
$('#guardar').on('click', () => guardarJson())
$('#codigo').on('click', () => codigo())

// lla 00110001
// izq 01000011
// der 01000110

let matriz = []
let fila, columna
let respuesta = []
var cripto = ""
let dat = []

var cont = 0

var LeftValue
    //"01000011"
var RightValue
    // "01000110"
var KeyValue
    //"00110001"

function ColumnMajor() {
    let m = []
    var updatedIds
    for (let i = 0; i < fila; i++) {
        var cc = []
        for (let j = 0; j < columna; j++) {
            cc.push(0)
        }
        m.push(cc)
    }
    for (let i = 0; i < matriz.length; i++) {
        var f = parseInt(matriz[i].fila)
        var c = parseInt(matriz[i].col)
        var t = matriz[i].val.toString()
        m[f][c] = t
    }
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[0].length; j++) {
            dat.push(m[i][j].toString())
        }
    }
    for (let u = 0; u < dat.length; u++) {
        updatedIds = nodes.add([{
            id: u,
            label: dat[u],
            shape: "dot",
            color: "#7BE141"
        }]);
        updatedIds = edges.add([
            { from: u - 1, to: u, arrows: 'to' }
        ])
    }
    network.selectNodes([updatedIds[0]]);
    network.editNode();
}


function resultado() {
    console.log(cripto)
    var body = document.getElementsByTagName("h1")[0];
    var elemento = document.createTextNode("RESULTADO: " + cripto.toString())
    body.appendChild(elemento)
    for (let j = 0; j < row; j++) {
        var hilera = document.createElement("tr");
        for (let k = 0; k < column; k++) {
            var celda = document.createElement("td");
            for (let i = 0; i < obj.valores.length; i++) {
                var f = obj.valores[i].indices[0]
                var c = obj.valores[i].indices[1]
                var val = obj.valores[i].valor
                if (j == f && k == c) {
                    var textoCelda = document.createTextNode(obj.valores[i].valor);
                } else {
                    var textoCelda = document.createTextNode("");
                }
                celda.appendChild(textoCelda);
                celda.setAttribute("style", "border: black 1px solid;background:skyblue;padding:5px");
                hilera.appendChild(celda);
                hilera.setAttribute("style", "border: black 1px solid;background:skyblue;padding:5px");
            }
            tblBody.appendChild(hilera);
        }
        tabla.appendChild(tblBody);
        body.appendChild(tabla);
        tabla.setAttribute("border", "2");
    }
}


function cargarJson() {
    var file = document.getElementById('formFileSm').files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        var body = document.getElementsByTagName("h1")[0];
        const obj = JSON.parse(reader.result)
        var row = obj.m[0]
        fila = row
        var column = obj.m[1]
        columna = column
        var tabla = document.createElement("table");
        tabla.setAttribute("border", "2");
        var tblBody = document.createElement("tbody");
        for (let j = 0; j < row; j++) {
            var hilera = document.createElement("tr");
            for (let k = 0; k < column; k++) {
                var celda = document.createElement("td");
                for (let i = 0; i < obj.valores.length; i++) {
                    var f = obj.valores[i].indices[0]
                    var c = obj.valores[i].indices[1]
                    var val = obj.valores[i].valor
                    if (j == f && k == c) {
                        var textoCelda = document.createTextNode(obj.valores[i].valor);
                        matriz.push({ "val": obj.valores[i].valor, "fila": f, "col": c })
                    } else {
                        var textoCelda = document.createTextNode("");
                    }
                    celda.appendChild(textoCelda);
                    celda.setAttribute("style", "border: black 1px solid;background:skyblue;padding:5px");
                    hilera.appendChild(celda);
                    hilera.setAttribute("style", "border: black 1px solid;background:skyblue;padding:5px");
                }
                tblBody.appendChild(hilera);
            }
            tabla.appendChild(tblBody);
            body.appendChild(tabla);
            tabla.setAttribute("border", "2");
        }
    };
}

var archivo = 1;

function guardarJson() {
    var obj = {
        categoria: "Estructura Compuesta",
        nombre: "Row Major",
        valores: dat
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