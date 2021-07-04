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
var largo = 0
let listita = new Hash()
let array = []
let array2 = []
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

/*EVENTOS*/
$('#add').on('click', () => agregar())
$('#crear').on('click', () => arreglo())
$('#search').on('click', () => search())
$('#update').on('click', () => actualizar())
$('#delete').on('click', () => deleteEdgeMode())
$('#cargar').on('click', () => cargarJson())
$('#guardar').on('click', () => guardarJson())

function arreglo() {
    largo = document.getElementById("largo").value;
    listita.crearHash(largo)
    for (let i = 0; i < largo; i++) {
        var valor = {
            id: i,
            label: i.toString(),
        }
        updatedIds = nodes.add([{
            shape: 'box',
            color: "#ffff3b",
            id: i,
            label: "      " + i.toString() + "       "
        }]);
        updatedIds = edges.add([
            { from: i - 1, to: i, arrows: 'to' }
        ]);
        cont++
    }
}

let primero = 0

function agregar() {
    var repetir = document.getElementById("flexSwitchCheckDefault").checked;
    var inputValue = document.getElementById("valor").value;
    let prueba = inputValue
    let len = inputValue.length
    var bool = isNaN(inputValue)
    if (bool == true) {
        inputValue = 0
        for (k = 0; k < len; k++) {
            inputValue += prueba.toString().charCodeAt(k)
            console.log(inputValue)
            if (k == inputValue.length) {
                bool = false
            }
        }
    } else {
        console.log(inputValue)
    }
    //console.log((inputValue))
    var valor = {
        id: cont,
        label: inputValue,
    }
    let repet = listita.search(inputValue)
    let pos
    if (repet != true) {
        pos = listita.insert(inputValue)
    } else {
        alert("VALOR REPETIDO!!!")
    }
    array.push(prueba)
        //console.log(valor.label + letras[pos] + "VALOR LABEL")
    try {
        var updatedIds = nodes.add([{
            id: valor.label + letras[pos],
            label: prueba.toString(),
            color: "#7BE141"
        }]);
        //console.log("ingresar " + array)
        //console.log("ingresar " + array2)
        if (listita.crear.tabla[pos].primero.dato == valor.label) {
            updatedIds = edges.add([
                { from: pos, to: valor.label + letras[pos], arrows: 'to' }
            ])
            updatedIds = edges.add([
                { from: valor.label + letras[pos], to: pos, arrows: 'to' }
            ])
        } else {
            let aux = listita.crear.tabla[pos].ultimo.anterior.dato
            console.log(aux)
            updatedIds = edges.add([
                { from: aux + letras[pos], to: valor.label + letras[pos], arrows: 'to' }
            ])
            updatedIds = edges.add([
                { from: valor.label + letras[pos], to: aux + letras[pos], arrows: 'to' }
            ])
        }
    } catch (error) {
        console.log(error)
    }
    cont++
    network.selectNodes([updatedIds[0]]);
    network.editNode();
}

async function agregarActualizar(id) {
    var speed = document.getElementById("formControlRange").value;
    speed = convertir(speed)
    var animation = {
        scale: 4,
        animation: {
            duration: speed,
            easingFunction: "linear"
        }
    }
    let prueba = id
    let len = id.length
    var bool = isNaN(id)
    if (bool == true) {
        id = 0
        for (k = 0; k < len; k++) {
            id += prueba.toString().charCodeAt(k)
            console.log(id)
            if (k == id.length) {
                bool = false
            }
        }
    } else {
        console.log(id)
    }
    console.log((id))
    var valor = {
        id: cont,
        label: id,
    }
    let pos = listita.insert(id)
    array.push(prueba)
    console.log(valor.label + letras[pos] + "VALOR LABEL")
    var updatedIds = nodes.add([{
        id: valor.label + letras[pos],
        label: prueba.toString(),
        color: "#7BE141"
    }]);
    //console.log("ingresar " + array)
    //console.log("ingresar " + array2)
    if (listita.crear.tabla[pos].primero.dato == valor.label) {
        updatedIds = edges.add([
            { from: pos, to: valor.label + letras[pos], arrows: 'to' }
        ])
        updatedIds = edges.add([
            { from: valor.label + letras[pos], to: pos, arrows: 'to' }
        ])
    } else {
        let aux = listita.crear.tabla[pos].ultimo.anterior.dato
        console.log(aux)
        updatedIds = edges.add([
            { from: aux + letras[pos], to: valor.label + letras[pos], arrows: 'to' }
        ])
        updatedIds = edges.add([
            { from: valor.label + letras[pos], to: aux + letras[pos], arrows: 'to' }
        ])
    }
    //cont++
    //await new Promise(resolve => setTimeout(resolve, convertir(animacion) + 10));
    network.selectNodes([updatedIds[0]]);
    network.editNode();
}



var cont2 = 1
var cont3 = 1

function search() {
    cont2 = 2
    var inputValue = document.getElementById("valor").value;
    var bool = isNaN(inputValue)
    if (bool == true) {
        view3()
    } else {
        view()
        console.log(inputValue)
    }
}

let bandera = false

async function actualizar() {
    //let inputValue = document.getElementById("valor").value;
    let inputValue2 = document.getElementById("cambio").value;
    var id = inputValue2
    var speed = document.getElementById("formControlRange").value;
    speed = convertir(speed)
    cont3 = 2
    var animation = {
        scale: 4,
        animation: {
            duration: speed,
            easingFunction: "linear"
        }
    }
    this.deleteEdgeMode()
    await new Promise(resolve => setTimeout(resolve, speed + 10));
    this.agregarActualizar(inputValue2)
    cont3++
    /*while (parseInt(id) >= largo) {
        id -= largo
    }
    network.selectNodes([inputValue2 + letras[id]])
    network.focus(inputValue2 + letras[id], animation)*/

}

async function view() {
    let inputValue = document.getElementById("valor").value;
    let id = inputValue
    let animacion = document.getElementById("formControlRange").value;
    var animation = {
        scale: 4,
        animation: {
            duration: convertir(animacion),
            easingFunction: "linear"
        }
    }
    while (parseInt(id) >= largo) {
        id -= largo
    }
    console.log(id)
    network.selectNodes([cont2])
    network.focus(inputValue + letras[id], animation)
    await new Promise(resolve => setTimeout(resolve, convertir(animacion) + 10)); // 3 sec
    //alert("ENCONTRADO" + inputValue)
    cont2++
    //}
}

async function view3() {
    let inputValue = document.getElementById("valor").value;
    let animacion = document.getElementById("formControlRange").value;
    let id = 0
    var animation = {
        scale: 4,
        animation: {
            duration: convertir(animacion),
            easingFunction: "linear"
        }
    }
    let prueba = inputValue
    let len = inputValue.length
    var bool = isNaN(inputValue)
    if (bool == true) {
        inputValue = 0
        for (k = 0; k < len; k++) {
            inputValue += prueba.toString().charCodeAt(k)
            console.log(inputValue)
            if (k == inputValue.length) {
                bool = false
            }
            id = inputValue
        }
    } else {
        console.log(inputValue)
    }
    while (parseInt(id) >= largo) {
        id -= largo
    }
    console.log(id)
    network.selectNodes([cont2])
    network.focus(inputValue + letras[id], animation)
    await new Promise(resolve => setTimeout(resolve, convertir(animacion) + 10)); // 3 sec
    //alert("ENCONTRADO" + inputValue)
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

async function deleteEdgeMode() {
    var speed = document.getElementById("formControlRange").value;
    let inputValue = document.getElementById("valor").value;
    if (isNaN(inputValue) == false) {
        let id = inputValue
        speed = convertir(speed)
        var valor = array.indexOf(inputValue)
        var animation = {
            scale: 4,
            animation: {
                duration: speed,
                easingFunction: "linear"
            }
        }
        while (parseInt(id) >= largo) {
            id -= largo
        }
        network.selectNodes([inputValue + letras[id]])
        network.focus(inputValue + letras[id], animation)
        await new Promise(resolve => setTimeout(resolve, speed + 10));
        network.selectNodes([inputValue + letras[id]]);
        array.splice(valor, 1)
        if (listita.crear.tabla[id].buscarB(inputValue).anterior != null) {
            var an = listita.crear.tabla[id].buscarB(inputValue).anterior.dato
        }
        if (listita.crear.tabla[id].buscarB(inputValue).siguiente != null) {
            var si = listita.crear.tabla[id].buscarB(inputValue).siguiente.dato
        }
        var num = listita.delete(inputValue)
        console.log(num)
        if (num == "op4" || num == "op3") {
            console.log(listita.crear.tabla[id])
            updatedIds = edges.add([
                { from: an + letras[id], to: si + letras[id], arrows: 'to' }
            ])
            updatedIds = edges.add([
                    { from: si + letras[id], to: an + letras[id], arrows: 'to' }
                ])
                //alert("Eliminado")
        } else if (num == "op1") {
            updatedIds = edges.add([
                { from: id, to: si + letras[id], arrows: 'to' }
            ])
            updatedIds = edges.add([
                    { from: si + letras[id], to: id, arrows: 'to' }
                ])
                //alert("Eliminado")
        } else if (num == "op2") {
            console.log("ultimo")
                //alert("Eliminado")
        }
        /*network.deleteSelected();
        network.selectNodes([updatedIds[0]]);
        network.editNode();*/
    } else {
        let prueba = inputValue
        let len = inputValue.length
        var bool = isNaN(inputValue)
        if (bool == true) {
            inputValue = 0
            for (k = 0; k < len; k++) {
                inputValue += prueba.toString().charCodeAt(k)
                console.log(inputValue)
                if (k == inputValue.length) {
                    bool = false
                }
                id = inputValue
            }
        } else {
            console.log(inputValue)
        }
        speed = convertir(speed)
        var valor = array.indexOf(inputValue)
        var animation = {
            scale: 4,
            animation: {
                duration: speed,
                easingFunction: "linear"
            }
        }
        while (parseInt(id) >= largo) {
            id -= largo
        }
        network.selectNodes([inputValue + letras[id]])
        network.focus(inputValue + letras[id], animation)
        await new Promise(resolve => setTimeout(resolve, speed + 10));
        network.selectNodes([inputValue + letras[id]]);
        array.splice(valor, 1)
        if (listita.crear.tabla[id].buscarB(inputValue).anterior != null) {
            var an = listita.crear.tabla[id].buscarB(inputValue).anterior.dato
        }
        if (listita.crear.tabla[id].buscarB(inputValue).siguiente != null) {
            var si = listita.crear.tabla[id].buscarB(inputValue).siguiente.dato
        }
        console.log(an, si)
        var num = listita.delete(inputValue)
        console.log(num)
        if (num == "op4" || num == "op3") {
            console.log(listita.crear.tabla[id])
            updatedIds = edges.add([
                { from: an + letras[id], to: si + letras[id], arrows: 'to' }
            ])
            updatedIds = edges.add([
                    { from: si + letras[id], to: an + letras[id], arrows: 'to' }
                ])
                //alert("Eliminado")
        } else if (num == "op1") {
            updatedIds = edges.add([
                { from: id, to: si + letras[id], arrows: 'to' }
            ])
            updatedIds = edges.add([
                    { from: si + letras[id], to: id, arrows: 'to' }
                ])
                //alert("Eliminado")
        } else if (num == "op2") {
            console.log("ultimo")
                //alert("Eliminado")
        }
    }
    cont2++
    network.deleteSelected();
    network.selectNodes([updatedIds[0]]);
    network.editNode();
}

function cargarJson() {
    var file = document.getElementById('formFileSm').files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    let err = []
    reader.onload = function() {
        const obj = JSON.parse(reader.result)
        var updatedIds
        largo = obj.m
        listita.crearHash(largo)
        for (let i = 0; i < largo; i++) {
            var valor = {
                id: i,
                label: i.toString(),
            }
            updatedIds = nodes.add([{
                shape: 'box',
                color: "#ffff3b",
                id: i,
                label: "      " + i.toString() + "       "
            }]);
            updatedIds = edges.add([
                { from: i - 1, to: i, arrows: 'to' }
            ]);
        }
        for (let i = 0; i < obj.valores.length; i++) {
            let prueba = obj.valores[i]
            let len = obj.valores[i].length
            var bool = isNaN(obj.valores[i])
            if (bool == true) {
                obj.valores[i] = 0
                for (k = 0; k < len; k++) {
                    obj.valores[i] += prueba.toString().charCodeAt(k)
                        //console.log(obj.valores[i])
                    if (k == obj.valores[i].length) {
                        bool = false
                    }
                    id = obj.valores[i]
                }
            } else {
                //console.log(obj.valores[i])
            }
            let pos
            array.push(prueba)
            let repetir = listita.search(obj.valores[i])
            if (repetir != true) {
                pos = listita.insert(obj.valores[i])
            }
            try {
                cont++
                updatedIds = nodes.add([{
                    id: obj.valores[i] + letras[pos],
                    label: prueba,
                    color: "#7BE141"
                }]);
                if (listita.crear.tabla[pos].primero.dato == obj.valores[i]) {
                    updatedIds = edges.add([
                        { from: pos, to: obj.valores[i] + letras[pos], arrows: 'to' }
                    ])
                    updatedIds = edges.add([
                        { from: obj.valores[i] + letras[pos], to: pos, arrows: 'to' }
                    ])
                } else {
                    let aux = listita.crear.tabla[pos].ultimo.anterior.dato
                    updatedIds = edges.add([
                        { from: aux + letras[pos], to: obj.valores[i] + letras[pos], arrows: 'to' }
                    ])
                    updatedIds = edges.add([
                        { from: obj.valores[i] + letras[pos], to: aux + letras[pos], arrows: 'to' }
                    ])
                }
            } catch (error) {
                continue
            }
            //console.log(listita.crear.tabla[pos].primero.dato)
            //console.log(obj.valores[i])
            //cont++
        }
        network.selectNodes([updatedIds[0]]);
        network.editNode();
    };
}

function guardarJson() {
    //var largo = document.getElementById("largo").value;
    var animacion = document.getElementById("formControlRange").value
    var obj = {
        categoria: "Estructura No Lineal",
        nombre: "Tabla Hash Abierta",
        animacion: animacion / 10,
        tamaño: largo,
        valores: array
    }
    var texto = JSON.stringify(obj);
    console.log(obj)
    download("Tabla Hash Abierta.json", texto);
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
        try {
            if (cont2 > 2) {
                network.fit()
            } else {
                view()
            }
        } catch (error) {
            console.log(error)
        }
    });

}

/*network.on("animationFinished", function(ctx) {
    try {
        if (cont3 > 2) {
            network.fit()
        } else {
            view3()
        }
    } catch (error) {
        console.log(error)
    }
});
*/
network.on("animationFinished", function(ctx) {
    if (!bandera) {
        network.fit()
    } else {
        view2(document.getElementById("valor").value, document.getElementById("cambio").value)
    }
});