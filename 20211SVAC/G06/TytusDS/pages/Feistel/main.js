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
$('#add').on('click', () => genera_tabla())
$('#result').on('click', () => resultado())
$('#cargar').on('click', () => cargarJson())
$('#guardar').on('click', () => guardarJson())
$('#codigo').on('click', () => codigo())

// lla 00110001
// izq 01000011
// der 01000110

let fila1 = []
let fila2 = []
let fila3 = []
let fila4 = []
let fila5 = []
let fila6 = []
let respuesta = []
var cripto = ""

var cont = 0

var LeftValue
    //"01000011"
var RightValue
    // "01000110"
var KeyValue
    //"00110001"

function genera_tabla() {
    var body = document.getElementsByTagName("h1")[0];
    let arr1 = []
    let arr2 = []
    let arr3 = []
    let total = ""
    let total2 = ""
    console.log(LeftValue)
    if (cont == 0) {
        LeftValue = document.getElementById("izquierdo").value
        RightValue = document.getElementById("derecho").value
        KeyValue = document.getElementById("llave").value
    }
    for (let i = 0; i < LeftValue.length; i++) {
        arr1.push(LeftValue[i])
        arr2.push(RightValue[i])
        arr3.push(KeyValue[i])
    }
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    let codigo = []
    var xor = 0
    codigo.push(null)
    for (var i = 0; i < 5; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");

        for (var j = 0; j < 4; j++) {
            var celda = document.createElement("td");
            if (i == 0) {
                if (j == 0) {
                    var textoCelda = document.createTextNode("W" + cont);
                    celda.setAttribute("style", "background:skyblue; border: black 1px solid;padding:5px");
                } else if (j == 1) {
                    var textoCelda = document.createTextNode(LeftValue);
                    celda.setAttribute("style", "background:skyblue; border: black 1px solid;padding:5px");
                } else if (j == 2) {
                    var textoCelda = document.createTextNode(RightValue);
                    celda.setAttribute("style", "background:skyblue; border: black 1px solid;padding:5px");
                } else {
                    var textoCelda = document.createTextNode("  ");
                    celda.setAttribute("style", "background:skyblue; border: black 1px solid;padding:5px");
                }
            } else if (i == 1) {
                if (j == 0 || j == 1) {
                    var textoCelda = document.createTextNode("");
                    celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
                } else if (j == 2) {
                    var textoCelda = document.createTextNode(KeyValue);
                    celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
                } else {
                    var textoCelda = document.createTextNode("K" + cont);
                    celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
                }
            } else if (i == 2) {
                if (j == 0 || j == 1) {
                    var textoCelda = document.createTextNode("");
                    celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
                } else if (j == 2) {
                    for (let k = 0; k < arr1.length; k++) {
                        total += (arr3[k] ^ arr2[k])
                    }
                    var textoCelda = document.createTextNode(total);
                    celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
                } else {
                    var textoCelda = document.createTextNode("F" + cont);
                    celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
                }
            } else if (i == 3) {
                if (j == 0 || j == 1 || j == 3) {
                    var textoCelda = document.createTextNode("");
                    celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
                } else {
                    var textoCelda = document.createTextNode(LeftValue);
                    celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
                }
            } else if (i == 4) {
                if (j == 0) {
                    cont++
                    var textoCelda = document.createTextNode("W" + cont);
                    celda.setAttribute("style", "background:skyblue; border: black 1px solid;padding:5px");
                } else if (j == 1) {
                    var textoCelda = document.createTextNode(RightValue);
                    celda.setAttribute("style", "background:skyblue; border: black 1px solid;padding:5px");
                } else if (j == 2) {
                    for (let k = 0; k < arr1.length; k++) {
                        total2 += (total[k] ^ arr1[k])
                    }
                    var textoCelda = document.createTextNode(total2);
                    LeftValue = RightValue
                    RightValue = total2
                    cripto = LeftValue.toString() + RightValue.toString()
                    var a = arr3.shift()
                    var le = ""
                    arr3.push(a)
                    for (let l = 0; l < arr3.length; l++) {
                        le += arr3[l]
                    }
                    KeyValue = le
                    celda.setAttribute("style", "background:skyblue; border: black 1px solid;padding:5px");
                } else {
                    var textoCelda = document.createTextNode("");
                    celda.setAttribute("style", "background:skyblue; border: black 1px solid;padding:5px");
                }
            } else {
                var textoCelda = document.createTextNode("00");
                celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
            }
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }

        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
    }

    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}


function resultado() {
    console.log(cripto)
    var body = document.getElementsByTagName("h1")[0];
    var elemento = document.createTextNode("RESULTADO: " + cripto.toString())
    body.appendChild(elemento)

}


function cargarJson() {
    var file = document.getElementById('formFileSm').files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        const obj = JSON.parse(reader.result)
        var updatedIds
        for (let i = 0; i < obj.valores.length; i++) {
            var valor = {
                id: i,
                label: obj.valores[i].vertice.toString(),
            }
            array.push(obj.valores[i].vertice.toString())
            grafo.addNode(obj.valores[i].vertice.toString(), i)
            updatedIds = nodes.add([{
                shape: 'dot',
                color: "#ffff3b",
                id: i,
                label: obj.valores[i].vertice.toString(),
            }]);
            //if (obj.valores[i].aristas != null) {
            var a, b, long

            //}
            cont++
        }
        for (let i = 0; i < obj.valores.length; i++) {
            for (let j = 0; j < obj.valores[i].aristas.length; j++) {
                grafo.addEdge(obj.valores[i].vertice, obj.valores[i].aristas[j].arista)
                arista.push({ "vertice": obj.valores[i].vertice, "arista": obj.valores[i].aristas[j].arista, "distancia": obj.valores[i].aristas[j].distancia })
                a = grafo.getId(obj.valores[i].vertice)
                b = grafo.getId(obj.valores[i].aristas[j].arista)
                long = obj.valores[i].aristas[j].distancia
                updatedIds = edges.add([{
                    label: long.toString(),
                    from: a,
                    to: b,
                    arrows: 'to'
                }]);
            }
        }
        network.selectNodes([updatedIds[0]]);
        network.editNode();
    };
}

var archivo = 1;

function guardarJson() {
    var texto = "Criptograma: " + cripto.toString()
    texto = JSON.stringify(texto);
    download("Feistel.txt", texto);
}

function download(filename, textInput) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(textInput));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
}