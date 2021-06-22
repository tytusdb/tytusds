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
var vista = 0

let listita = new ListaDoble()
let array = []
let array2 = []

/*EVENTOS*/
$('#add').on('click', () => agregar())
$('#search').on('click', () => search())
$('#update').on('click', () => actualizar())
$('#delete').on('click', () => deleteEdgeMode(document.getElementById("valor").value))
$('#cargar').on('click', () => cargarJson())
$('#guardar').on('click', () => guardarJson())

function prueba() {
    console.log(listita.mostrar())
    console.log("jola")
}

let primero = 0

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
    primero = listita.primero
    var valor = {
        id: cont,
        label: inputValue,
    }
    var updatedIds = nodes.add([{
        id: cont,
        label: listita.agregar(inputValue),
        shape: "hexagon",
        color: "#7BE141"
    }]);
    array.push(valor)
    array2.push(valor.label)
        //console.log("ingresar " + array)
        //console.log("ingresar " + array2)
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
    var uno = array2.indexOf(primero.dato)
    var dos = array[uno].id
    cont2 = dos
    view()
}

let bandera = false

function actualizar() {
    let inputValue = document.getElementById("valor").value;
    let inputValue2 = document.getElementById("cambio").value;
    console.log(inputValue)
    var idVal = array2.indexOf(inputValue)
    console.log(idVal)
    view2(array[idVal].id)
    array[idVal].label = inputValue2
    array2[idVal] = inputValue2
    bandera = listita.actualizar(inputValue, inputValue2)
    nodes.update({ id: array[idVal].id, label: inputValue2 })
    bandera = false
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

async function deleteEdgeMode(nodeId) {
    var speed = document.getElementById("formControlRange").value;
    speed = convertir(speed)
    var valor = array2.indexOf(nodeId)
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
    array.splice(valor, 1)
    array2.splice(valor, 1)
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
            var valor = {
                id: i,
                label: obj.valores[i].toString(),
            }
            updatedIds = nodes.add([{
                id: i,
                label: listita.agregar(obj.valores[i].toString()),
                shape: "hexagon",
                color: "#7BE141"
            }]);
            array.push(valor)
            array2.push(valor.label)
            updatedIds = edges.add([
                { from: i - 1, to: i, arrows: 'to' }
            ])
            updatedIds = edges.add([
                { from: i, to: i - 1, arrows: 'to' }
            ])
            cont++
        }
        network.selectNodes([updatedIds[0]]);
        network.editNode();
    };
}

var archivo = 1

function guardarJson() {
    var animacion = document.getElementById("formControlRange").value
    var obj = {
        categoria: "Estructura Lineal",
        nombre: "Lista Doble",
        repeticion: document.getElementById("flexSwitchCheckDefault").checked,
        animacion: animacion / 10,
        valores: array2
    }
    var texto = JSON.stringify(obj);
    console.log(obj)
    download("Lista Doblemente Enlazada" + archivo + ".json", texto);
    archivo++
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

if (vista == 0) {
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

}
network.on("animationFinished", function(ctx) {
    if (!bandera) {
        network.fit()
    } else {
        view2(document.getElementById("valor").value, document.getElementById("cambio").value)
    }
});