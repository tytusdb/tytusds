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
let fila7 = []
let respuesta = []

function genera_tabla() {
    cont3 = 0
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
    } else if (columnas > 26 && columnas < 58) {
        columnas += 7
        filas = 8
    } else if (columnas > 57) {
        columnas += 8
        filas = 9
    }
    var suce = 1
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
                if (i == 8) { var textoCelda = document.createTextNode("p64"); }
                celda.setAttribute("style", "background:skyblue; border: black 1px solid;padding:5px");
            } else if (i == 0) {
                if (j == 1 || j == 2 || j == 4 || j == 8 || j == 16 || j == 32 || j == 64) {
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
                if (j == 1 || j == 2 || j == 4 || j == 8 || j == 16 || j == 32 || j == 64) {
                    var textoCelda = document.createTextNode("p" + j);
                    celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
                } else {
                    var textoCelda = document.createTextNode("d" + cont);
                    celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
                    cont++
                }
            } else if (i > 1) {
                if (j == 1 || j == 2 || j == 4 || j == 8 || j == 16 || j == 32 || j == 64) {
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
                        var textoCelda
                        for (let k = 0; k < columnas; k++) {
                            suce = (4 * k) - 2
                            if (j - 1 == suce) {
                                textoCelda = document.createTextNode(codigo[j]);
                                fila2.push(codigo[j])
                                celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                            } else {
                                textoCelda = document.createTextNode(" ");
                                celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                            }
                            celda.appendChild(textoCelda);
                            hilera.appendChild(celda);
                        }
                        for (let k = 0; k < columnas; k++) {
                            suce = (4 * k) - 1
                            if (j + 1 == suce) {
                                textoCelda = document.createTextNode(codigo[j]);
                                fila2.push(codigo[j])
                                celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                            } else {
                                textoCelda = document.createTextNode(" ");
                                celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                            }
                            celda.appendChild(textoCelda);
                            hilera.appendChild(celda);
                        }
                    }
                    if (i == 4) {
                        var textoCelda
                        for (let k = 0; k < columnas; k++) {
                            suce = (8 * k)
                            if (j == suce - 4 || j == suce - 3 || j == suce - 2 || j == suce - 1) {
                                textoCelda = document.createTextNode(codigo[j]);
                                fila3.push(codigo[j])
                                celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                            } else {
                                textoCelda = document.createTextNode(" ");
                                celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                            }
                            celda.appendChild(textoCelda);
                            hilera.appendChild(celda);
                        }
                    }
                    if (i == 5) {
                        var textoCelda
                        for (let k = 0; k < columnas; k++) {
                            suce = (16 * k)
                            if (j == suce - 8 || j == suce - 7 || j == suce - 6 || j == suce - 5 ||
                                j == suce - 4 || j == suce - 3 || j == suce - 2 || j == suce - 1) {
                                textoCelda = document.createTextNode(codigo[j]);
                                fila4.push(codigo[j])
                                celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                            } else {
                                textoCelda = document.createTextNode(" ");
                                celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                            }
                            celda.appendChild(textoCelda);
                            hilera.appendChild(celda);
                        }
                    }
                    if (i == 6) {
                        var textoCelda
                        for (let k = 0; k < columnas; k++) {
                            suce = (32 * k)
                            for (let p = 16; p > 0; p--) {
                                if (j == suce - p) {
                                    textoCelda = document.createTextNode(codigo[j]);
                                    fila5.push(codigo[j])
                                    celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                                } else {
                                    textoCelda = document.createTextNode(" ");
                                    celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                                }
                                celda.appendChild(textoCelda);
                                hilera.appendChild(celda);
                            }
                        }
                    }
                    if (i == 7) {
                        var textoCelda
                        for (let k = 0; k < columnas; k++) {
                            suce = (64 * k)
                            for (let p = 32; p > 0; p--) {
                                if (j == suce - p) {
                                    textoCelda = document.createTextNode(codigo[j]);
                                    fila6.push(codigo[j])
                                    celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                                } else {
                                    textoCelda = document.createTextNode(" ");
                                    celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                                }
                                celda.appendChild(textoCelda);
                                hilera.appendChild(celda);
                            }
                        }
                    }
                    if (i == 8) {
                        var textoCelda
                        for (let k = 0; k < columnas; k++) {
                            suce = (128 * k)
                            for (let p = 64; p > 0; p--) {
                                if (j == suce - p) {
                                    textoCelda = document.createTextNode(codigo[j]);
                                    fila7.push(codigo[j])
                                    celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                                } else {
                                    textoCelda = document.createTextNode(" ");
                                    celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                                }
                                celda.appendChild(textoCelda);
                                hilera.appendChild(celda);
                            }
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
    } else if (columnas > 26 && columnas < 58) {
        columnas += 7
        filas = 8
    } else if (columnas > 57) {
        columnas += 8
        filas = 9
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
                if (i == 8) { var textoCelda = document.createTextNode("p64"); }
                celda.setAttribute("style", "background:skyblue; border: black 1px solid;padding:5px");
            } else if (i == 0) {
                if (j == 1 || j == 2 || j == 4 || j == 8 || j == 16 || j == 32 || j == 64) {
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
                    } else if (j == 64) {
                        try {
                            let value = fila7.reduce(reducer)
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
                if (j == 1 || j == 2 || j == 4 || j == 8 || j == 16 || j == 32 || j == 64) {
                    var textoCelda = document.createTextNode("p" + j);
                    celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
                } else {
                    var textoCelda = document.createTextNode("d" + cont);
                    celda.setAttribute("style", "background:pink; border: black 1px solid;padding:5px");
                    cont++
                }
            } else if (i > 1) {
                if (j == 1 || j == 2 || j == 4 || j == 8 || j == 16 || j == 32 || j == 64) {
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
                    } else if (j == 64 && i == 8) {
                        try {
                            let value = fila7.reduce(reducer)
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
                        var textoCelda
                        for (let k = 0; k < columnas; k++) {
                            suce = (4 * k) - 2
                            if (j - 1 == suce) {
                                textoCelda = document.createTextNode(codigo[j]);
                                celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                            } else {
                                textoCelda = document.createTextNode(" ");
                                celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                            }
                            celda.appendChild(textoCelda);
                            hilera.appendChild(celda);
                        }
                        for (let k = 0; k < columnas; k++) {
                            suce = (4 * k) - 1
                            if (j + 1 == suce) {
                                textoCelda = document.createTextNode(codigo[j]);
                                celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                            } else {
                                textoCelda = document.createTextNode(" ");
                                celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                            }
                            celda.appendChild(textoCelda);
                            hilera.appendChild(celda);
                        }
                    }
                    if (i == 4) {
                        var textoCelda
                        for (let k = 0; k < columnas; k++) {
                            suce = (8 * k)
                            if (j == suce - 4 || j == suce - 3 || j == suce - 2 || j == suce - 1) {
                                textoCelda = document.createTextNode(codigo[j]);
                                celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                            } else {
                                textoCelda = document.createTextNode(" ");
                                celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                            }
                            celda.appendChild(textoCelda);
                            hilera.appendChild(celda);
                        }
                    }
                    if (i == 5) {
                        var textoCelda
                        for (let k = 0; k < columnas; k++) {
                            suce = (16 * k)
                            if (j == suce - 8 || j == suce - 7 || j == suce - 6 || j == suce - 5 ||
                                j == suce - 4 || j == suce - 3 || j == suce - 2 || j == suce - 1) {
                                textoCelda = document.createTextNode(codigo[j]);
                                celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                            } else {
                                textoCelda = document.createTextNode(" ");
                                celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                            }
                            celda.appendChild(textoCelda);
                            hilera.appendChild(celda);
                        }
                    }
                    if (i == 6) {
                        var textoCelda
                        for (let k = 0; k < columnas; k++) {
                            suce = (32 * k)
                            for (let p = 16; p > 0; p--) {
                                if (j == suce - p) {
                                    textoCelda = document.createTextNode(codigo[j]);
                                    celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                                } else {
                                    textoCelda = document.createTextNode(" ");
                                    celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                                }
                                celda.appendChild(textoCelda);
                                hilera.appendChild(celda);
                            }
                        }
                    }
                    if (i == 7) {
                        var textoCelda
                        for (let k = 0; k < columnas; k++) {
                            suce = (64 * k)
                            for (let p = 32; p > 0; p--) {
                                if (j == suce - p) {
                                    textoCelda = document.createTextNode(codigo[j]);
                                    celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                                } else {
                                    textoCelda = document.createTextNode(" ");
                                    celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                                }
                                celda.appendChild(textoCelda);
                                hilera.appendChild(celda);
                            }
                        }
                    }
                    if (i == 8) {
                        var textoCelda
                        for (let k = 0; k < columnas; k++) {
                            suce = (128 * k)
                            for (let p = 64; p > 0; p--) {
                                if (j == suce - p) {
                                    textoCelda = document.createTextNode(codigo[j]);
                                    celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");
                                } else {
                                    textoCelda = document.createTextNode(" ");
                                    celda.setAttribute("style", "background:white; border: black 1px solid;padding:5px");

                                }
                                celda.appendChild(textoCelda);
                                hilera.appendChild(celda);
                            }
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
        document.getElementById("valor").value = obj
        console.log(obj)
    };

}

var archivo = 1;

function guardarJson() {
    var res = ""
    for (let i = 0; i < respuesta.length; i++) {
        res += respuesta[i].toString()
    }
    var texto = JSON.stringify(res);
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