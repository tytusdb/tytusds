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

let listita = new Pila()
let array = []
let array2 = []

/*EVENTOS*/
$('#add').on('click', () => agregar(document.getElementById("valor").value))
$('#search').on('click', () => search())
$('#update').on('click', () => actualizar())
$('#delete').on('click', () => deleteEdgeMode())
$('#cargar').on('click', () => cargarJson())

function prueba() {
    console.log(listita.mostrar())
    console.log("jola")
}

function agregar(inputValue) {
    var valor = {
        id: cont,
        label: inputValue,
    }
    var updatedIds = nodes.add([{
        shape: 'box',
        id: cont,
        label: listita.agregar(inputValue),
    }]);
    array.push(valor)
    array2.push(valor.label)
    updatedIds = edges.add([
        { from: cont - 1, to: cont, arrows: 'to' }
    ])
    console.log(array)
    cont++
    network.selectNodes([updatedIds[0]]);
    network.editNode();
}





var cont2 = 1

function search() {
    cont2 = 0
    view()
}

function actualizar() {
    let inputValue = document.getElementById("valor").value; //valor 
    let inputValue2 = document.getElementById("cambio").value; //nuevo
    console.log(inputValue)
    var idVal = array2.indexOf(inputValue)
    console.log(idVal)
    array[idVal].label = inputValue2
    array2[idVal] = inputValue2
    view2(array[idVal].id)
    listita.actualizar(inputValue, inputValue2)
    nodes.update({ id: array[idVal].id, label: inputValue2 })
    console.log(array)
    console.log(array2)
}

async function view() {
    let inputValue = document.getElementById("valor").value;
    var idVal = array2.indexOf(inputValue)
    var animation = {
        scale: 4,
        animation: {
            duration: 500,
            easingFunction: "linear"
        }
    }
    while (cont2 <= array[idVal].id) {
        network.selectNodes([cont2])
        network.focus(cont2, animation)
        await new Promise(resolve => setTimeout(resolve, 1100)); // 3 sec
        cont2++
    }
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
}

function deleteEdgeMode() {
    network.selectNodes([array[cont - 1].id]);
    array.splice(cont - 1, 1)
    array2.splice(cont - 1, 1)
    listita.eliminar()
    network.deleteSelected();
    cont--

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
                label: obj.valores[i].toString(),
            }
            updatedIds = nodes.add([{
                shape: 'box',
                id: i,
                label: listita.agregar(obj.valores[i].toString()),
            }]);
            array.push(valor)
            array2.push(valor.label)
            updatedIds = edges.add([
                { from: i - 1, to: i, arrows: 'to' }
            ]);
            cont++
        }
        network.selectNodes([updatedIds[0]]);
        network.editNode();
    };
}


network.on("animationFinished", function(ctx) {
    if (cont2 >= cont) {
        network.fit()
    } else {
        view()
    }
});