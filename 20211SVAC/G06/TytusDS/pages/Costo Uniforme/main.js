// create an array with nodes
var nodes = new vis.DataSet([]);

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

let grafo = new Graph();

/*EVENTOS*/
$('#add').on('click', () => agregar())
$('#conect').on('click', () => aristas())
$('#search').on('click', () => search())
$('#update').on('click', () => actualizar())
$('#delete').on('click', () => remove())
$('#cargar').on('click', () => cargarJson())
$('#guardar').on('click', () => guardarJson())
$('#recorrer').on('click', () => recorrer())


let letras = ["A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O", "P",
    "Q", "R", "S", "T", "U", "V", "W", "X", "Y"
]
let array = []
let arista = []



function agregar() {
    var inputValue = document.getElementById("valor").value
    grafo.addNode(inputValue, cont)
    console.log(cont)
    var valor = {
        id: cont,
        label: inputValue,
    }
    var updatedIds = nodes.add([{
        shape: 'dot',
        color: "#ffff3b",
        id: cont,
        label: inputValue,
    }]);
    array.push(inputValue)
    cont++
    network.selectNodes([updatedIds[0]]);
    network.editNode();
}

function aristas() {
    var nodo1 = document.getElementById("valorUno").value
    var nodo2 = document.getElementById("valorDos").value
    var long = document.getElementById("long").value
    arista.push({ "vertice": nodo1, "arista": nodo2, "distancia": long })
    console.log(arista)
    if (long == null) {
        long = 0
    }
    grafo.addEdge(nodo1, nodo2)
    var a = grafo.getId(nodo1)
    console.log(a)
    var b = grafo.getId(nodo2)
    console.log(b)
    updatedIds = edges.add([{
        label: long,
        from: a,
        to: b,
        arrows: 'to'
    }]);
    network.selectNodes([updatedIds[0]]);
    network.editNode();
}

var cont2 = 1

function search() {
    cont2 = 0
    view()
}

let bandera = false

async function actualizar() {
    let inputValue = document.getElementById("valor").value; //valor 
    let inputValue2 = document.getElementById("cambio").value; //nuevo
    let animacion = document.getElementById("formControlRange").value;
    var animation = {
        scale: 4,
        animation: {
            duration: convertir(animacion),
            easingFunction: "linear"
        }
    }
    var act = grafo.update(inputValue, inputValue2)
    console.log(act)
    network.focus(act, animation)
    await new Promise(resolve => setTimeout(resolve, convertir(animacion) + 10)); // 3 sec
    var index = array.indexOf(inputValue)
    array[index] = inputValue2
    nodes.update({ id: act, label: inputValue2 })
    await new Promise(resolve => setTimeout(resolve, convertir(animacion) + 10)); // 3 sec
    network.fit()

}

async function view() {
    var nodo1 = document.getElementById("valorUno").value
    var nodo2 = document.getElementById("valorDos").value
    let animacion = document.getElementById("formControlRange").value;
    var list = grafo.depth(nodo1, nodo2)
        //console.log(list)
    var ubicacion = list[0]
    var animation = {
        scale: 4,
        animation: {
            duration: convertir(animacion),
            easingFunction: "linear"
        }
    }
    if (ubicacion != null) {
        for (let i = 0; i < list.indexOf(nodo2) + 1; i++) {
            let currentId = grafo.getId(list[i])
            network.selectNodes([currentId])
            network.focus(currentId, animation)
            await new Promise(resolve => setTimeout(resolve, convertir(animacion) + 10)); // 3 sec
            if (currentId == grafo.getId(nodo2)) {
                alert("Valor encontrado!");
                break
            }
            cont2++
        }
        network.fit()
    } else {
        alert("NO HAY NODOS")
    }
}


async function remove() {
    let inputValue = document.getElementById("valor").value;
    var speed = document.getElementById("formControlRange").value;
    speed = convertir(speed)
    var animation = {
        scale: 4,
        animation: {
            duration: speed,
            easingFunction: "linear"
        }
    }
    if (!grafo.existNode(inputValue)) {
        alert("Ese nodo no existe")
        return
    }
    var index = array.indexOf(inputValue)
    array.splice(index, 1)
    var eliminado = grafo.deleteNode(inputValue)
    network.focus(eliminado, animation)
    await new Promise(resolve => setTimeout(resolve, speed + 10));
    network.fit()
    await new Promise(resolve => setTimeout(resolve, speed + 10));
    network.selectNodes([eliminado]);
    network.deleteSelected();

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
    var speed = document.getElementById("formControlRange").value
    let data = grafo.getData()
    let valores = []
    for (let i = 0; i < data.length; i++) {
        let valor = {
            vertice: null,
            aristas: []
        }
        valor.vertice = data[i].value
        for (let j = 0; j < data[i].edges.length; j++) {
            let valorArista = {
                arista: null,
                distancia: 0
            }
            valorArista.arista = data[i].edges[j]
            let aristitas = network.getConnectedEdges(grafo.getId(data[i].value))
            for (let k = 0; k < aristitas.length; k++) {
                let link = edges.get(aristitas[k])
                if (link.to == grafo.getId(data[i].edges[j])) {
                    if (link.label != null && link.label != "") {
                        let distancia = link.label
                        if (!isNaN(parseInt(distancia))) {
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
    var obj = {
        categoria: "Estructura No Lineal",
        nombre: "Grafo por profundidad",
        almacenamiento: "Matriz/Lista",
        animacion: speed / 10,
        valores: valores
    }
    var texto = JSON.stringify(obj);
    download("Grafo.json", texto);
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

async function recorrer() {
    let animacion = document.getElementById("formControlRange").value;
    var animation = {
        scale: 4,
        animation: {
            duration: convertir(animacion),
            easingFunction: "linear"
        }
    }
    let arreglo = grafo.getData()
    console.log(arreglo)
    for (let i = 0; i < arreglo.length; i++) {
        let currentId = arreglo[i].id
        network.selectNodes([currentId])
        network.focus(currentId, animation)
        await new Promise(resolve => setTimeout(resolve, convertir(animacion) + 10)); // 3 sec
    }
    alert("Recorrido Finalizado :)")
    network.fit()

}