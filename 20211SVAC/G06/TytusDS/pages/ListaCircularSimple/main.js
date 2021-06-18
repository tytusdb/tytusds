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

/*EVENTOS*/
$('#add').on('click', () => agregar())
$('#search').on('click', () => search())
$('#update').on('click', () => actualizar())
$('#delete').on('click', () => deleteEdgeMode(document.getElementById("valor").value))

function prueba() {
    console.log(listita.mostrar())
    console.log("jola")
}

function agregar() {

    let inputValue = document.getElementById("valor").value;
    var valor = {
        id: cont,
        label: inputValue,
    }
    var updatedIds = nodes.add([{
        id: cont,
        label: listita.agregar(inputValue).dato,
    }]);
    array.push(valor)
    array2.push(valor.label)
    if (listita.agregar(inputValue).pos == true) {
        updatedIds = edges.add([
            { from: cont - 1, to: cont, arrows: 'to' }
        ])
        updatedIds = edges.add([
            { from: cont, to: 0, arrows: 'to' }
        ])
    }
    cont++
    network.selectNodes([updatedIds[0]]);
    network.editNode();
}



var cont2 = 1

function search() {
    cont2 = 1
    view()
}

function actualizar() {
    let inputValue = document.getElementById("valor").value;
    let inputValue2 = document.getElementById("cambio").value;
    console.log(inputValue)
    var idVal = array2.indexOf(inputValue)
    console.log(idVal)
        //var idValue = array2.indexOf(inputValue)
    array[idVal].label = inputValue2
    array2[idVal] = inputValue2
    view2(idVal)
    listita.actualizar(inputValue2)
    nodes.update({ id: idVal, label: inputValue2 })
    console.log(array)
    console.log(array2)
}

async function view() {
    var animation = {
        scale: 4,
        animation: {
            duration: 500,
            easingFunction: "linear"
        }
    }
    network.selectNodes([cont2])
    network.focus(cont2, animation)
        //await new Promise(resolve => setTimeout(resolve, 1100)); // 3 sec
    cont2++
}

async function view2(nodo) {
    var animation = {
        scale: 4,
        animation: {
            duration: 500,
            easingFunction: "linear"
        }
    }
    network.selectNodes([nodo])
    network.focus(nodo, animation)
        //await new Promise(resolve => setTimeout(resolve, 1100)); // 3 sec

}

function deleteEdgeMode(nodeId) {
    var valor = array2.indexOf(nodeId)
    console.log("pos a borrar " + valor)
    network.selectNodes([array[valor].id]);
    array.splice(valor, 1)
    array2.splice(valor, 1)
    console.log("arreglo " + array2)
    console.log("arreglo " + array)
    console.log(array[valor - 1].id)
    console.log(array[valor].id)
    var num = listita.eliminar(nodeId)
    if (num == "op4" || num == "op3") {
        edges.add([
            { from: array[valor - 1].id, to: array[valor].id, arrows: 'to' }
        ])
        edges.add([
            { from: array[valor].id, to: array[valor - 1].id, arrows: 'to' }
        ])
    } else if (num == "op2") {
        console.log("ultimo")
        cont-- //por ser el ultimo dato 
    }
    network.deleteSelected();

}

network.on("animationFinished", function(ctx) {
    if (cont2 >= cont) {
        network.fit()
    } else {
        view()
    }
});