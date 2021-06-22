// create an array with nodes
var nodes = new vis.DataSet([
    /*{id: 1, label: "bb"},
    {id: 2, label: "bb2"},
    {id: 3, label: "bb3"},
    {id: 4, label: "bb4"}*/
]);

// create an array with edges
var edges = new vis.DataSet([
    /*{from:1, to:2},
    {from:1, to:3},
    {from:3, to:4},*/
]);

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    layout: {
        hierarchical: {
            direction: 'UD',
            sortMethod: 'directed',
            shakeTowards: 'roots',
            nodeSpacing: 200
        }
    },
    nodes: {
        shape: 'hexagon',
        size: 20,
        color: "#6adbeb"
    },
    edges: {
        color: "#17202A",
        arrows: 'to'
    }
};

// initialize your network!
var network = new vis.Network(container, data, options);

var cont = 0

let arbol = new AVL()

/*EVENTOS*/
$('#add').on('click', () => agregar())
$('#search').on('click', () => search())
$('#delete').on('click', () => remove())
$('#update').on('click', () => update())
$('#pruebita').on('click', () => prueba())
$('#cargar').on('click', () => cargarJson())
$('#guardar').on('click', () => guardarJson())

async function cargarJson() {
    network = new vis.Network(container, data, options);
    listita = new ListaSimple()
    var objeto = null
        //Obtenemos el archivo 
    let upload = document.getElementById('formFileSm');
    let fr = new FileReader()
    fr.readAsText(upload.files[0])
    fr.onload = async function() {
        objeto = JSON.parse(fr.result)
            //SETEAMOS LA ANIMACION
        document.getElementById("formControlRange").value = (objeto.animacion * 10).toString();
        //SETEAMOS LA REPETICION
        if (objeto.repeticion == true) {
            document.getElementById("flexSwitchCheckDefault").checked = true;
        } else {
            document.getElementById("flexSwitchCheckDefault").checked = false;
        }
        //AQUI YA AGREGAMOS
        var updatedIds
        for (let i = 0; i < objeto.valores.length; i++) {
            //VERIFICAMOS SI VIENEN REPETIDOS
            if (objeto.repeticion == false) {
                let encontrado = listita.search(objeto.valores[i])
                if (encontrado != null) {
                    continue
                }
            }
            let array = listita.toArray()
            var beforeId
            if (array.length < 1) {
                beforeId = -1
            } else {
                beforeId = (array[array.length - 1]).id
            }
            let valor = {
                id: cont,
                value: (objeto.valores[i]).toString()
            }
            updatedIds = nodes.add([{
                id: cont,
                label: (listita.add(valor)).value,
                shape: "star",
                color: "#72EDC0"
            }]);
            updatedIds = edges.add([
                { from: beforeId, to: cont, arrows: 'to', color: "#17202A" }
            ])
            cont++
        }
        network.selectNodes([updatedIds[0]]);
        network.editNode();
        //await new Promise(resolve => setTimeout(resolve, 500)); // 3 sec
    }
}

function guardarJson() {
    var categoria = "Estructura Lineal"
    var nombre = "Lista Simplemente Enlazada"
    var repetir = document.getElementById("flexSwitchCheckDefault").checked;
    var speed = document.getElementById("formControlRange").value;
    let array = listita.toArray()
    let valores = []
    for (let i = 0; i < array.length; i++) {
        valores.push(array[i].value)
    }
    var objeto = {
        categoria: categoria,
        nombre: nombre,
        repeticion: repetir,
        animacion: speed / 10,
        valores: valores
    }
    var JsonString = JSON.stringify(objeto);
    console.log(JsonString)
    download("ListaSimple.json", JsonString);
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function convertir(porcentaje) {
    let result = (100 - porcentaje) * 10
    if (result == 0) {
        result = 50
    }
    return result
}



async function agregar() {
    let inputValue = document.getElementById("valor").value;
    var repetir = document.getElementById("flexSwitchCheckDefault").checked;
    var speed = document.getElementById("formControlRange").value;
    speed = convertir(speed)
    var animation = {
        scale: 4,
        animation: {
            duration: speed,
            easingFunction: "linear"
        }
    }


    /*ESTO ES PARA VALIDAR SI EXISTE EL ELEMENTO*/
    if (repetir == false) {
        let existe = arbol.buscar(arbol.raiz, inputValue)
        if (existe != null) {
            alert("Ese valor ya existe :c")
            return
        }
    }
    /*******************************************/
    //Verificamos si el valor es un numero o string
    if (parseInt(inputValue) != NaN) {
        inputValue = parseInt(inputValue)
    }
    /*AHORA INGRESAMOS EL VALOR Y RECORREMOS EL ARRAY*/
    var nuevoValor = {
        id: cont,
        value: inputValue
    }
    let array = arbol.insertar(nuevoValor)
    console.log(array)
    for (let i = 0; i < array.length; i++) {
        //Esto es full animacion
        let currentId = array[i].id
        network.selectNodes([currentId])
        network.focus(currentId, animation)
        await new Promise(resolve => setTimeout(resolve, speed + 10)); // 3 sec
    }
    network.fit()
    await new Promise(resolve => setTimeout(resolve, speed / 2));
    //Ahora ingresamos el valor en el canvas
    let beforeId = -1
    var position = 0
    if (array.length > 0) {
        beforeId = array[array.length - 1].id
        position = network.getPosition(beforeId)
    }
    let bandera = 0
    if (cont == 0) {
        var updatedIds = nodes.add([{
            id: cont,
            label: (inputValue).toString(),
            x: position.x - 100
        }]);
    } else if (array[array.length - 1].value < inputValue && cont != 0) {
        var updatedIds = nodes.add([{
            id: cont,
            label: (inputValue).toString(),
            x: position.x + 100
        }]);
    } else if (array[array.length - 1].value > inputValue && cont != 0) {
        var updatedIds = nodes.add([{
            id: cont,
            label: (inputValue).toString(),
            x: position.x - 100
        }]);
    }
    updatedIds = edges.add([
        { from: beforeId, to: cont }
    ])
    cont++
    network.selectNodes([updatedIds[0]]);
    network.editNode();
}

async function search() {
    //Obtenemos la velocidad para la animacion
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

    let input = document.getElementById("valor").value;
    //Verificamos si el valor es un numero o string
    if (parseInt(inputValue) != NaN) {
        inputValue = parseInt(inputValue)
    }
    //Obtenemos el recorrido del arbol y recorremos
    let array = arbolito.search(input)
    for (let i = 0; i < array.recorrido.length; i++) {
        let currentId = array.recorrido[i].id
        network.selectNodes([currentId])
        network.focus(currentId, animation)
        await new Promise(resolve => setTimeout(resolve, speed + 10))
    }
    //Si encontro o no el valor
    if (array.encontrado == true) {
        alert("Valor encontrado!");
    } else {
        network.selectEdges([])
        alert("No se ha encontrado el valor!");
    }
    network.fit()
}