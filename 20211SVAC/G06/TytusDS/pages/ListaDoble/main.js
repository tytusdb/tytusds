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

let listita = new ListaDoble()
let array = []

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
    // create an array with nodes
    let inputValue = document.getElementById("valor").value;
    var updatedIds = nodes.add([{
        id: cont,
        label: listita.agregar(inputValue),
    }]);
    array.push(inputValue)
    console.log("ingresar " + array)
    updatedIds = edges.add([
        { from: cont - 1, to: cont, arrows: 'to' }
    ])
    updatedIds = edges.add([
        { from: cont, to: cont - 1, arrows: 'to' }
    ])
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
    // var idValue = listita.mostrar().indexOf(inputValue)
    var idVal = array.indexOf(inputValue)
    array[idVal] = inputValue2
    view2(idVal)
    listita.actualizar(inputValue2)
    nodes.update({ id: idVal, label: inputValue2 })
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
    //var valor = listita.mostrar().indexOf(nodeId)
    var valor = array.indexOf(nodeId)
    var valor2 = valor
    console.log("valor a borrar " + valor)
        //array.splice(valor, 1)
    console.log("arreglo " + array)
    var num = listita.eliminar(nodeId)
    if (num == "op4" || num == "op3") {
        edges.add([
            { from: valor2 - 1, to: valor2 + 1, arrows: 'to' }
        ])
        edges.add([
            { from: valor2 + 1, to: valor2 - 1, arrows: 'to' }
        ])
    } else if (num == "op2") {
        console.log("ultimo")
        cont-- //por ser el ultimo dato 
    }
    console.log(nodeId)
    console.log(valor)
    network.selectNodes([valor]);
    network.deleteSelected();

}

network.on("animationFinished", function(ctx) {
    if (cont2 >= cont) {
        network.fit()
    } else {
        view()
    }
});