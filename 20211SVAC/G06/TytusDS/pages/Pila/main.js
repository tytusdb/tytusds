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
$('#guardar').on('click', () => guardarJson())

function prueba() {
    console.log(listita.mostrar())
    console.log("jola")
}

function agregar(inputValue) {
    var repetir = document.getElementById("flexSwitchCheckDefault").checked;
    if (repetir == false) {
        let encontrado = listita.buscar(inputValue)
        if (encontrado) {
            alert("¡¡ERROR!! Valor ya existente")
            return
        }
    }
    var valor = {
        id: cont,
        label: inputValue,
    }
    var updatedIds = nodes.add([{
        shape: 'box',
        color: "#ffff3b",
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

let bandera = false

function actualizar() {
    let inputValue = document.getElementById("valor").value; //valor 
    let inputValue2 = document.getElementById("cambio").value; //nuevo
    console.log(inputValue)
    var idVal = array2.indexOf(inputValue)
    console.log(idVal)
    view2(array[idVal].id)
    array[idVal].label = inputValue2
    array2[idVal] = inputValue2
    bandera = listita.actualizar(inputValue, inputValue2)
    nodes.update({ id: array[idVal].id, label: inputValue2 })
    bandera = false
    console.log(array)
    console.log(array2)
}

async function view() {
    let animacion = document.getElementById("formControlRange").value;
    let inputValue = document.getElementById("valor").value;
    var idVal = array2.indexOf(inputValue)
    var animation = {
        scale: 4,
        animation: {
            duration: convertir(animacion),
            easingFunction: "linear"
        }
    }
    network.selectNodes([cont2])
    network.focus(cont2, animation)
    await new Promise(resolve => setTimeout(resolve, 1100)); // 3 sec
    cont2++
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
}

async function deleteEdgeMode() {
    var speed = document.getElementById("formControlRange").value;
    speed = convertir(speed)
    var animation = {
        scale: 4,
        animation: {
            duration: speed,
            easingFunction: "linear"
        }
    }
    network.selectNodes([array[cont - 1].id])
    network.focus(array[cont - 1].id, animation)
    await new Promise(resolve => setTimeout(resolve, speed + 10));
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
                shape: 'box',
                color: "#ffff3b",
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

var archivo = 1;

function guardarJson() {
    var animacion = document.getElementById("formControlRange").value
    var obj = {
        categoria: "Estructura Lineal",
        nombre: "Pila",
        repeticion: document.getElementById("flexSwitchCheckDefault").checked,
        animacion: animacion / 10,
        valores: array2
    }
    var texto = JSON.stringify(obj);
    download("Pila" + archivo + ".json", texto);
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