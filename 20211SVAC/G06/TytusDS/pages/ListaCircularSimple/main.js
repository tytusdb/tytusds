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

let listita = new ListaCircularSimple()
let array = []
let array2 = []
let array3 = []

/*EVENTOS*/
$('#add').on('click', () => agregar())
$('#search').on('click', () => search())
$('#update').on('click', () => actualizar())
$('#delete').on('click', () => deleteEdgeMode(document.getElementById("valor").value))
$('#cargar').on('click', () => cargarJson())
$('#guardar').on('click', () => guardarJson())

function prueba() {
    //console.log(listita.mostrar())
    //console.log("jola")
}

let primero = 0;

function agregar() {
    var repetir = document.getElementById("flexSwitchCheckDefault").checked;
    let inputValue = document.getElementById("valor").value;
    if (repetir == false) {
        let encontrado = listita.buscar(inputValue)
        if (encontrado) {
            alert("¡¡ERROR!! Valor ya existente")
            return
        }
    }
    let dato = listita.agregar(inputValue)
    primero = listita.primero
    let actual = listita.ultimo
    console.log(primero)
    console.log(actual)
    var valor = {
        id: cont,
        label: inputValue,
    }
    array.push(valor)
    array3.push(actual)
    array2.push(valor.label)
    console.log(array2)
    let antes = 0
    if (inputValue != primero.dato) {
        let pos = array2.indexOf(actual.dato)
        antes = (array[pos].id - 1)
        console.log("Ante id:" + antes)
    }
    // =console.log(array3)
    next = actual.siguiente.dato //el valor de la posicion siguiente
    let id = array[array2.indexOf(next)].id //el id del valor siguiente
    console.log(parseInt(id))
    let noditos = network.getConnectedEdges(antes)
    for (let i = 0; i < noditos.length; i++) {
        let link = edges.get(noditos[i])
        console.log("linkto" + link.to)
        if (link.to == id) {
            network.selectEdges([link.id])
            network.deleteSelected()
        }
    }
    var updatedIds = nodes.add([{
        id: cont,
        shape: "diamond",
        color: "#ba76ff",
        label: dato.dato,
    }]);
    updatedIds = edges.add([
        { from: antes, to: cont, arrows: 'to' }
    ])
    updatedIds = edges.add([
        { from: cont, to: id, arrows: 'to' }
    ])
    cont++
    network.selectNodes([updatedIds[0]]);
    network.editNode();
}

var cont2 = 1

function search() {
    var uno = array2.indexOf(primero.dato)
    var dos = array[uno].id
    cont2 = dos
    view()
}

let bandera = false

function actualizar() {
    let inputValue = document.getElementById("valor").value;
    let inputValue2 = document.getElementById("cambio").value;
    var idVal = array2.indexOf(inputValue)
    var prueba = array[idVal].id
    console.log(prueba)
    view2(prueba)
    array[idVal].label = inputValue2
    array2[idVal] = inputValue2
    array3[idVal].dato = inputValue2
    bandera = listita.actualizar(inputValue, inputValue2)
    nodes.update({ id: prueba, label: inputValue2 })
    bandera = false
    console.log(array)
    console.log(array2)
    console.log(array3)

}

async function view() {
    let inputValue = document.getElementById("valor").value;
    let animacion = document.getElementById("formControlRange").value;
    var idVal = array2.indexOf(inputValue)
    var animation = {
            scale: 4,
            animation: {
                duration: convertir(animacion),
                easingFunction: "linear"
            }
        }
        //while (cont2 <= array[idVal].id) {
    network.selectNodes([cont2])
    network.focus(cont2, animation)
    await new Promise(resolve => setTimeout(resolve, convertir(animacion) + 10)); // 3 sec
    cont2++
    //}
    //cont2++
}

async function deleteEdgeMode(nodeId) {
    var speed = document.getElementById("formControlRange").value;
    speed = convertir(speed)
    var valor = array2.indexOf(nodeId) //pos en arreglo
    var animation = {
        scale: 4,
        animation: {
            duration: speed,
            easingFunction: "linear"
        }
    }
    network.selectNodes([array[valor].id])
    network.focus(array[valor].id, animation)
    await new Promise(resolve => setTimeout(resolve, speed + 10));
    network.selectNodes([array[valor].id]);
    let posAnterior = 0
    let posSiguiente = 0
    if (valor != 0) {
        posAnterior = array3[valor - 1].dato
        console.log(posAnterior)
    }
    posSiguiente = array3[valor].siguiente.dato
    console.log(posSiguiente)
    array.splice(valor, 1)
    array2.splice(valor, 1)
    array3.splice(valor, 1)
    var num = listita.eliminar(nodeId)
    console.log(num)
    console.log(array)
    console.log(array2)
    console.log(array3)
    if (num == "op3") { //ultimo
        updatedIds = edges.add([
            { from: array[array2.indexOf(posAnterior)].id, to: array[array2.indexOf(posSiguiente)].id, arrows: 'to' }
        ])
        cont--
    } else if (num == "op2") { //primero
        updatedIds = edges.add([
            { from: cont - 1, to: array[array2.indexOf(posSiguiente)].id, arrows: 'to' }
        ])
    } else if (num == "op4" || num == "op5") {
        console.log(array[array2.indexOf(posAnterior)])
        console.log(array[array2.indexOf(posSiguiente)])
        updatedIds = edges.add([
                { from: array[array2.indexOf(posAnterior)].id, to: array[array2.indexOf(posSiguiente)].id, arrows: 'to' }
            ])
            /*updatedIds = edges.add([
                    { from: array2.indexOf(posAnterior), to: array2.indexOf(posSiguiente) + 1, arrows: 'to' }
                ])*/
            /*updatedIds = edges.add([
                { from: posAnterior, to: posSiguiente, arrows: 'to' }
            ])*/
    }
    network.deleteSelected();
    network.selectNodes([updatedIds[0]]);
    network.editNode();

}

function cargarJson() {
    var file = document.getElementById('formFileSm').files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        const obj = JSON.parse(reader.result)
        var updatedIds
        var repetir = obj.repeticion
        if (repetir == true) {
            document.getElementById("flexSwitchCheckDefault").checked = true;
        } else {
            document.getElementById("flexSwitchCheckDefault").checked = false;
        }
        for (let i = 0; i < obj.valores.length; i++) {
            if (repetir == false) {
                let encontrado = listita.buscar(obj.valores[i].toString())
                if (encontrado) {
                    continue
                }
            }
            let dato = listita.agregar(obj.valores[i].toString())
            let primero = listita.primero
            let actual = listita.ultimo
            var valor = {
                id: i,
                label: obj.valores[i].toString(),
            }
            array.push(valor)
            array3.push(actual)
            array2.push(valor.label)
            let antes = 0
            if (obj.valores[i].toString() != primero.dato) {
                let pos = array2.indexOf(actual.dato)
                antes = (array[pos].id - 1)
            }
            // =console.log(array3)
            next = actual.siguiente.dato //el valor de la posicion siguiente
            let id = array[array2.indexOf(next)].id //el id del valor siguiente
            let noditos = network.getConnectedEdges(antes)
            for (let i = 0; i < noditos.length; i++) {
                let link = edges.get(noditos[i])
                if (link.to == id) {
                    network.selectEdges([link.id])
                    network.deleteSelected()
                }
            }
            var updatedIds = nodes.add([{
                id: i,
                shape: "diamond",
                color: "#ba76ff",
                label: dato.dato,
            }]);
            updatedIds = edges.add([
                { from: antes, to: cont, arrows: 'to' }
            ])
            updatedIds = edges.add([
                { from: cont, to: id, arrows: 'to' }
            ])
            cont++
        }
        network.selectNodes([updatedIds[0]]);
        network.editNode();
    };
}

async function view2(nodo) {
    let animacion = document.getElementById("formControlRange").value;
    var animation = {
        scale: 4,
        animation: {
            duration: convertir(animacion),
            easingFunction: "linear"
        }
    }
    network.selectNodes([nodo])
    network.focus(nodo, animation)
    await new Promise(resolve => setTimeout(resolve, convertir(animacion) + 10)); // 3 sec
}

var archivo = 1

function guardarJson() {
    var animacion = document.getElementById("formControlRange").value
    var obj = {
        categoria: "Estructura Lineal",
        nombre: "Lista Circular",
        repeticion: document.getElementById("flexSwitchCheckDefault").checked,
        animacion: animacion / 10,
        valores: array2
    }
    var texto = JSON.stringify(obj);
    //console.log(obj)
    download("Lista Circular Simplemente Enlazada" + archivo + ".json", texto);
    archivo++
}

function download(filename, textInput) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(textInput));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
}

function convertir(porcentaje) {
    let result = (100 - porcentaje) * 10
    if (result == 0) {
        result = 50
    }
    return result
}

network.on("animationFinished", function(ctx) {
    let inputValue = document.getElementById("valor").value;
    var idVal = array2.indexOf(inputValue)
    try {
        if (cont2 > array[idVal].id) {
            network.fit()
        } else {
            view()
        }
    } catch (error) {
        console.log(error)
    }
});

network.on("animationFinished", function(ctx) {
    if (!bandera) {
        network.fit()
    } else {
        view2(document.getElementById("valor").value, document.getElementById("cambio").value)
    }
});