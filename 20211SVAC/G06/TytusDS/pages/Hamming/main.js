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



let fila1 = []
let fila2 = []
let fila3 = []
let fila4 = []
let fila5 = []
let fila6 = []
let respuesta = []

function genera_tabla() {
    var body = document.getElementsByTagName("h3")[0];
    var inputValue = document.getElementById("valor").value
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    let codigo = []
    var cont = 1
    var pos = 0
    var columnas = inputValue.length
    var filas = 0
    if (columnas <= 11) {
        columnas += 5
        filas = 6
    } else if (columnas > 11 && columnas < 27) {
        columnas += 6
        filas = 7
    } else if (columnas > 26) {
        columnas += 7
        filas = 8
    }
    codigo.push(null)
    for (var i = 0; i < filas; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");

        for (var j = 0; j < columnas; j++) {
            var celda = document.createElement("td");
            if (j == 0) {
                if (i == 0) { var textoCelda = document.createTextNode("BIT"); }
                if (i == 1) { var textoCelda = document.createTextNode("DATO"); }
                if (i == 2) { var textoCelda = document.createTextNode("p1"); }
                if (i == 3) { var textoCelda = document.createTextNode("p2"); }
                if (i == 4) { var textoCelda = document.createTextNode("p4"); }
                if (i == 5) { var textoCelda = document.createTextNode("p8"); }
                if (i == 6) { var textoCelda = document.createTextNode("p16"); }
                if (i == 7) { var textoCelda = document.createTextNode("p32"); }
                celda.setAttribute("style", "background:skyblue; border: black 1px solid;padding:5px");
            } else if (i == 0) {
                if (j == 1 || j == 2 || j == 4 || j == 8 || j == 16 || j == 32) {
                    var textoCelda = document.createTextNode(" ");
                    celda.setAttribute("style", "background:skyblue; border: black 1px solid;padding:5px");
                    codigo.push(null)
                } else {
                    var textoCelda = document.createTextNode(inputValue[pos]);
                    codigo.push(inputValue[pos])
                    celda.setAttribute("style", "background:skyblue; border: black 1px solid;padding:5px");
                    pos++
                }
            } else if (i == 1) {
                if (j == 1 || j == 2 || j == 4 || j == 8 || j == 16 || j == 32) {
                    var textoCelda = document.createTextNode("p" + j);
                    celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
                } else {
                    var textoCelda = document.createTextNode("d" + cont);
                    celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
                    cont++
                }
            } else if (i > 1) {
                if (j == 1 || j == 2 || j == 4 || j == 8 || j == 16 || j == 32) {
                    var textoCelda = document.createTextNode(" ");
                    celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                } else {
                    if (i == 2) {
                        if (j % 2 == 0) {
                            var textoCelda = document.createTextNode(" ");
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                        } else {
                            var textoCelda = document.createTextNode(codigo[j]);
                            fila1.push(codigo[j])
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                        }
                    }
                    if (i == 3) {
                        if (j == 2 || j == 3 || j == 6 || j == 7 ||
                            j == 10 || j == 11 || j == 14 || j == 15 ||
                            j == 18 || j == 19 || j == 22 || j == 23 ||
                            j == 26 || j == 27 || j == 30 || j == 31 ||
                            j == 34 || j == 35 || j == 38 || j == 39 ||
                            j == 42 || j == 43 || j == 46 || j == 47) {
                            var textoCelda = document.createTextNode(codigo[j]);
                            fila2.push(codigo[j])
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                        } else {
                            var textoCelda = document.createTextNode(" ");
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                        }
                    }
                    if (i == 4) {
                        if (j == 4 || j == 5 || j == 6 || j == 7 ||
                            j == 12 || j == 13 || j == 14 || j == 15 ||
                            j == 20 || j == 21 || j == 22 || j == 23 ||
                            j == 28 || j == 29 || j == 30 || j == 31 ||
                            j == 36 || j == 37 || j == 38 || j == 39 ||
                            j == 44 || j == 45 || j == 46 || j == 47) {
                            var textoCelda = document.createTextNode(codigo[j]);
                            fila3.push(codigo[j])
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                        } else {
                            var textoCelda = document.createTextNode(" ");
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                        }
                    }
                    if (i == 5) {
                        if (j == 8 || j == 9 || j == 10 || j == 11 ||
                            j == 12 || j == 13 || j == 14 || j == 15 ||
                            j == 24 || j == 25 || j == 26 || j == 27 ||
                            j == 28 || j == 29 || j == 30 || j == 31 ||
                            j == 40 || j == 41 || j == 42 || j == 43 ||
                            j == 44 || j == 45 || j == 46 || j == 47) {
                            var textoCelda = document.createTextNode(codigo[j]);
                            fila4.push(codigo[j])
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                        } else {
                            var textoCelda = document.createTextNode(" ");
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                        }
                    }
                    if (i == 6) {
                        if (j == 16 || j == 17 || j == 18 || j == 19 ||
                            j == 20 || j == 21 || j == 22 || j == 23 ||
                            j == 24 || j == 25 || j == 26 || j == 27 ||
                            j == 28 || j == 29 || j == 30 || j == 31 ||
                            j == 48 || j == 49 || j == 50 || j == 51 ||
                            j == 52 || j == 53 || j == 54 || j == 55 ||
                            j == 56 || j == 57 || j == 58 || j == 59) {
                            var textoCelda = document.createTextNode(codigo[j]);
                            fila5.push(codigo[j])
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                        } else {
                            var textoCelda = document.createTextNode(" ");
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                        }
                    }
                    if (i == 7) {
                        if (j == 32 || j == 33 || j == 34 || j == 35 ||
                            j == 36 || j == 37 || j == 38 || j == 39 ||
                            j == 40 || j == 41 || j == 42 || j == 43 ||
                            j == 44 || j == 45 || j == 46 || j == 47 ||
                            j == 48 || j == 49 || j == 50 || j == 51 ||
                            j == 52 || j == 53 || j == 54 || j == 55 ||
                            j == 56 || j == 57 || j == 58 || j == 59 ||
                            j == 60 || j == 61 || j == 62 || j == 63) {
                            var textoCelda = document.createTextNode(codigo[j]);
                            fila6.push(codigo[j])
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                        } else {
                            var textoCelda = document.createTextNode(" ");
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                        }
                    }
                }
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



function codigo() {
    respuesta = []
    var inputValue = document.getElementById("valor").value
    var columnas = inputValue.length
    var filas = 0
    if (columnas <= 11) {
        columnas += 5
        filas = 6
    } else if (columnas > 11 && columnas < 27) {
        columnas += 6
        filas = 7
    } else if (columnas > 26) {
        columnas += 7
        filas = 8
    }
    const reducer = (accumulator, currentValue) => accumulator ^ currentValue;
    var body = document.getElementsByTagName("h3")[0];
    var inputValue = document.getElementById("valor").value
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    let codigo = []
    var cont = 1
    var pos = 0
    codigo.push(null)
    for (var i = 0; i < filas; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");

        for (var j = 0; j < columnas; j++) {
            var celda = document.createElement("td");
            if (j == 0) {
                if (i == 0) { var textoCelda = document.createTextNode("BIT"); }
                if (i == 1) { var textoCelda = document.createTextNode("DATO"); }
                if (i == 2) { var textoCelda = document.createTextNode("p1"); }
                if (i == 3) { var textoCelda = document.createTextNode("p2"); }
                if (i == 4) { var textoCelda = document.createTextNode("p4"); }
                if (i == 5) { var textoCelda = document.createTextNode("p8"); }
                if (i == 6) { var textoCelda = document.createTextNode("p16"); }
                if (i == 7) { var textoCelda = document.createTextNode("p32"); }
                celda.setAttribute("style", "background:skyblue; border: black 1px solid;padding:5px");
            } else if (i == 0) {
                if (j == 1 || j == 2 || j == 4 || j == 8 || j == 16 || j == 32) {
                    var textoCelda = document.createTextNode(" ");
                    celda.setAttribute("style", "background:skyblue; border: black 1px solid;padding:5px");
                    if (j == 1) {
                        let value = fila1.reduce(reducer)
                        var textoCelda = document.createTextNode(value);
                        respuesta.push(value)
                    } else if (j == 2) {
                        let value = fila2.reduce(reducer)
                        var textoCelda = document.createTextNode(value);
                        respuesta.push(value)
                    } else if (j == 4) {
                        let value = fila3.reduce(reducer)
                        var textoCelda = document.createTextNode(value);
                        respuesta.push(value)
                    } else if (j == 8) {
                        try {
                            let value = fila4.reduce(reducer)
                            var textoCelda = document.createTextNode(value);
                            respuesta.push(value)
                        } catch (error) {
                            var textoCelda = document.createTextNode("0");
                            respuesta.push("0")
                            console.log(error)
                        }
                    } else if (j == 16) {
                        try {
                            let value = fila5.reduce(reducer)
                            var textoCelda = document.createTextNode(value);
                            respuesta.push(value)
                        } catch (error) {
                            var textoCelda = document.createTextNode("0");
                            respuesta.push("0")
                            console.log(error)
                        }
                    } else if (j == 32) {
                        try {
                            let value = fila6.reduce(reducer)
                            var textoCelda = document.createTextNode(value);
                            respuesta.push(value)
                        } catch (error) {
                            var textoCelda = document.createTextNode("0");
                            respuesta.push("0")
                            console.log(error)
                        }
                    }
                    codigo.push(null)
                } else {
                    var textoCelda = document.createTextNode(inputValue[pos]);
                    respuesta.push(inputValue[pos])
                    codigo.push(inputValue[pos])
                    celda.setAttribute("style", "background:skyblue; border: black 1px solid;padding:5px");
                    pos++
                }
            } else if (i == 1) {
                if (j == 1 || j == 2 || j == 4 || j == 8 || j == 16 || j == 32) {
                    var textoCelda = document.createTextNode("p" + j);
                    celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
                } else {
                    var textoCelda = document.createTextNode("d" + cont);
                    celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
                    cont++
                }
            } else if (i > 1) {
                if (j == 1 || j == 2 || j == 4 || j == 8 || j == 16 || j == 32) {
                    var textoCelda = document.createTextNode(" ");
                    celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                    if (j == 1 && i == 2) {
                        let value = fila1.reduce(reducer)
                        var textoCelda = document.createTextNode(value);
                    } else if (j == 2 && i == 3) {
                        let value = fila2.reduce(reducer)
                        var textoCelda = document.createTextNode(value);
                    } else if (j == 4 && i == 4) {
                        let value = fila3.reduce(reducer)
                        var textoCelda = document.createTextNode(value);
                    } else if (j == 8 && i == 5) {
                        try {
                            let value = fila4.reduce(reducer)
                            var textoCelda = document.createTextNode(value);
                        } catch (error) {
                            var textoCelda = document.createTextNode("0");
                            console.log(error)
                        }
                    } else if (j == 16 && i == 6) {
                        try {
                            let value = fila5.reduce(reducer)
                            var textoCelda = document.createTextNode(value);
                        } catch (error) {
                            var textoCelda = document.createTextNode("0");
                            console.log(error)
                        }
                    } else if (j == 32 && i == 7) {
                        try {
                            let value = fila6.reduce(reducer)
                            var textoCelda = document.createTextNode(value);
                        } catch (error) {
                            var textoCelda = document.createTextNode("0");
                            console.log(error)
                        }
                    } else {
                        var textoCelda = document.createTextNode(" ");
                    }
                } else {
                    if (i == 2) {
                        if (j % 2 == 0) {
                            var textoCelda = document.createTextNode(" ");
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                        } else {
                            var textoCelda = document.createTextNode(codigo[j]);
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                        }
                    }
                    if (i == 3) {
                        if (j == 2 || j == 3 || j == 6 || j == 7 ||
                            j == 10 || j == 11 || j == 14 || j == 15 ||
                            j == 18 || j == 19 || j == 22 || j == 23 ||
                            j == 26 || j == 27 || j == 30 || j == 31 ||
                            j == 34 || j == 35 || j == 38 || j == 39 ||
                            j == 42 || j == 43 || j == 46 || j == 47) {
                            var textoCelda = document.createTextNode(codigo[j]);
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                        } else {
                            var textoCelda = document.createTextNode(" ");
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                        }
                    }
                    if (i == 4) {
                        if (j == 4 || j == 5 || j == 6 || j == 7 ||
                            j == 12 || j == 13 || j == 14 || j == 15 ||
                            j == 20 || j == 21 || j == 22 || j == 23 ||
                            j == 28 || j == 29 || j == 30 || j == 31 ||
                            j == 36 || j == 37 || j == 38 || j == 39 ||
                            j == 44 || j == 45 || j == 46 || j == 47) {
                            var textoCelda = document.createTextNode(codigo[j]);
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                        } else {
                            var textoCelda = document.createTextNode(" ");
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                        }
                    }
                    if (i == 5) {
                        if (j == 8 || j == 9 || j == 10 || j == 11 ||
                            j == 12 || j == 13 || j == 14 || j == 15 ||
                            j == 24 || j == 25 || j == 26 || j == 27 ||
                            j == 28 || j == 29 || j == 30 || j == 31 ||
                            j == 40 || j == 41 || j == 42 || j == 43 ||
                            j == 44 || j == 45 || j == 46 || j == 47) {
                            var textoCelda = document.createTextNode(codigo[j]);
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                        } else {
                            var textoCelda = document.createTextNode(" ");
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                        }
                    }
                    if (i == 6) {
                        if (j == 16 || j == 17 || j == 18 || j == 19 ||
                            j == 20 || j == 21 || j == 22 || j == 23 ||
                            j == 24 || j == 25 || j == 26 || j == 27 ||
                            j == 28 || j == 29 || j == 30 || j == 31 ||
                            j == 48 || j == 49 || j == 50 || j == 51 ||
                            j == 52 || j == 53 || j == 54 || j == 55 ||
                            j == 56 || j == 57 || j == 58 || j == 59) {
                            var textoCelda = document.createTextNode(codigo[j]);
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                        } else {
                            var textoCelda = document.createTextNode(" ");
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                        }
                    }
                    if (i == 7) {
                        if (j == 32 || j == 33 || j == 34 || j == 35 ||
                            j == 36 || j == 37 || j == 38 || j == 39 ||
                            j == 40 || j == 41 || j == 42 || j == 43 ||
                            j == 44 || j == 45 || j == 46 || j == 47 ||
                            j == 48 || j == 49 || j == 50 || j == 51 ||
                            j == 52 || j == 53 || j == 54 || j == 55 ||
                            j == 56 || j == 57 || j == 58 || j == 59 ||
                            j == 60 || j == 61 || j == 62 || j == 63) {
                            var textoCelda = document.createTextNode(codigo[j]);
                            fila6.push(codigo[j])
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                        } else {
                            var textoCelda = document.createTextNode(" ");
                            celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                        }
                    }
                }
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
    // tabla.setAttribute("style", "position:relative");
}

function resultado() {
    console.log(respuesta)
    var body = document.getElementsByTagName("h3")[0];
    //var tabla = document.createElement("h3");
    var res = ""
    for (let i = 0; i < respuesta.length; i++) {
        res += respuesta[i].toString()
    }
    var elemento = document.createTextNode("RESULTADO: " + res)
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
    var res = ""
    for (let i = 0; i < respuesta.length; i++) {
        res += respuesta[i].toString()
    }
    var texto = JSON.stringify("Codificacion: " + res);
    download("Hamming.txt", texto);
}

function convertir(porcentaje) {
    let result = (100 - porcentaje) * 10
    if (result == 0) {
        result = 50
    }
    return result
}

function download(filename, textInput) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(textInput));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
}