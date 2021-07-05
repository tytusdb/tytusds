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
let letras = ["A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P",
    "Q", "R", "S", "T", "U", "V", "W", "X",
    "Y", "Z", "AA", "BB", "CC", "DD", "EE", "FF", "GG",
    "HH", "II", "JJ", "KK", "LL", "MM", "NN",
    "OO", "PP", "QQ", "RR", "SS", "TT", "UU",
    "VV", "WW", "XX", "YY", "ZZ", "AAA", "BBB", "CCC",
    "DDD", "EEE", "FFF", "GGG", "HHH", "III", "JJJ", "KKK", "LLL",
    "MMM", "NNN", "OOO", "PPP", "QQQ", "RRR", "SSS", "TTT", "UUU",
    "VVV", "WWW", "XXX", "YYY", "ZZZ"
]

let listita = new ListaDoble();
let circular = new ListaCircularSimple();
let array = []
let array2 = []
let arrayC = []
let array2C = []
let array3C = []
let arrayPrueba = []

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
    var opcion = document.getElementById('struct1').value
    let arregloCircular = []
    let map = new Map()
    var file = document.getElementById('formFileSm').files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        const obj = JSON.parse(reader.result)
        var updatedIds
        var updatedIds2
        for (let i = 0; i < obj.valores.length; i++) {
            let encontrado = array2.indexOf(obj.valores[i].principal.toString())
            if (encontrado == -1) {
                listita.agregar(obj.valores[i].principal.toString())
            } else {
                continue
            }
            var valor = {
                id: cont,
                label: obj.valores[i].principal.toString(),
            }
            updatedIds = nodes.add([{
                id: cont,
                label: listita.agregar(obj.valores[i].principal.toString()),
                shape: "hexagon",
                color: "#7BE141"
            }]);
            array.push(valor)
            array2.push(valor.label) //elemento guardado solo label
            updatedIds = edges.add([
                { from: cont - 1, to: cont, arrows: 'to' }
            ])
            updatedIds = edges.add([
                { from: cont, to: cont - 1, arrows: 'to' }
            ])
            cont++
            //cont++
            //CIRCULAR SIMPLE//
            /*let primero = circular.primero
            let actual = circular.ultimo
            var valor2 = {
                id: i + letras[i],
                label: obj.valores[i].secundario.toString(),
            }//sdsds
            arrayPrueba.push(i)
            arrayC.push(valor2)
            array3C.push(actual)
            array2C.push(valor2.label) //elemento guardado solo label
            let antes = 0
            if (obj.valores[i].secundario.toString() != primero.dato) {
                let pos = array2C.indexOf(actual.dato)
                antes = (arrayPrueba[pos] - 1)
            }
            next = actual.siguiente.dato //el valor de la posicion siguiente
            let id = arrayC[array2C.indexOf(next)].id //el id del valor siguiente
            let noditos = network.getConnectedEdges(antes + letras[i])
            for (let k = 0; k < noditos.length; k++) {
                let link = edges.get(noditos[k])
                console.log(link.to, "link")
                console.log(id, "id")
                if (link.to == id) {
                    network.selectEdges([link.id])
                    network.deleteSelected()
                }
            }
            updatedIds2 = nodes.add([{
                id: i + letras[i],
                shape: "diamond",
                color: "#ba76ff",
                label: dato.dato,
            }]);
            updatedIds2 = edges.add([
                { from: antes + letras[i], to: cont + letras[i], arrows: 'to' }
            ])
            updatedIds2 = edges.add([
                { from: cont + letras[i], to: id, arrows: 'to' }
            ])*/
        }
        for (let k = 0; k < obj.valores.length; k++) {
            let circular = listita.agregarCircular(obj.valores[k].principal.toString(), obj.valores[k].secundario.toString())
            map.set(obj.valores[k].principal.toString(), circular)
            let primero = circular.primero
            let actual = circular.ultimo
            var valor2 = {
                id: k + letras[k],
                label: obj.valores[k].secundario.toString(),
            }
            arrayPrueba.push(k)
            arrayC.push(valor2)
            array3C.push(actual)
            array2C.push(valor2.label) //elemento guardado solo label
            let antes = 0
            if (obj.valores[k].secundario.toString() != primero.dato) {
                let pos = array2C.indexOf(actual.dato)
                antes = (arrayPrueba[pos] - 1)
            }
            next = actual.siguiente.dato //el valor de la posicion siguiente
            let id = arrayC[array2C.indexOf(next)].id //el id del valor siguiente
            let noditos = network.getConnectedEdges(antes + letras[k - 1])
            for (let l = 0; l < noditos.length; l++) {
                let link = edges.get(noditos[l])
                if (link.to == id) {
                    network.selectEdges([link.id])
                    network.deleteSelected()
                }
            }
            updatedIds2 = nodes.add([{
                id: k + letras[k],
                shape: "diamond",
                color: "#ba76ff",
                label: obj.valores[k].secundario.toString(),
            }]);
            updatedIds2 = edges.add([
                { from: antes + letras[k - 1], to: k + letras[k], arrows: 'to' }
            ])
            updatedIds2 = edges.add([
                { from: k + letras[k], to: id, arrows: 'to' }
            ])
        }
        console.log(map)
        console.log(map.entries())
        map.forEach((value, key) => {
            console.log(value.length)
        });
        network.selectNodes([updatedIds[0]]);
        network.editNode();
        network.selectNodes([updatedIds2[0]]);
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