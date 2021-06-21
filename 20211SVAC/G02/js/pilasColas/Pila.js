// create an array with nodes
var arrayNodes = [];
var edges = [];
var carga = [];
var network = null;
var clickedNode;
var clickedNodoValue;
var slidervar = '';
var fileInput = document.querySelector('input[type="file"]');
var switchToggle = document.getElementById("flexSwitchCheckDefault")
var slider = document.getElementById("customRange2");

class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

class Pila {
    constructor() {
        this.primero = null;
        this.tamanio = 0;
    }

    Apilar(dato) {
        const nodo = new Nodo(dato);
        if (switchToggle.checked === false) {
            if (!this.IsVacia()) {
                if (!this.buscarrepetido(dato))
                {
                    nodo.siguiente = this.primero;
                    this.primero = nodo;
                    this.tamanio++;
                }
            } else {
                this.primero = nodo;
                this.tamanio++;
            }
        }else {
            if (!this.IsVacia()) {
                nodo.siguiente = this.primero;
                this.primero = nodo;
                this.tamanio++;
            } else {
                this.primero = nodo;
                this.tamanio++;
            }
        }
    }

    ApilarJson(dato) {
        const nodo = new Nodo(dato);
        if (!this.IsVacia()) {
            nodo.siguiente = this.primero;
            this.primero = nodo;
            this.tamanio++;
        } else {
            this.primero = nodo;
            this.tamanio++;
        }
    }

    //recorrido y llenado de nodos
    mostrar(){
        let i = 0;
        if (!this.IsVacia())
        {
            var actual = this.primero;
            while (actual) {
                if (i != 0)
                {
                    arrayNodes.push({id: i, label: actual.dato, shape: "box"});
                    edges.push({from: i - 1, to: i})
                    i++;
                }else{
                    arrayNodes.push({id:i, label: actual.dato, shape: "box"});
                    i++;
                }
                actual = actual.siguiente;
            }
        }
    }

    Desapilar() {
        if(!this.IsVacia())
        {
            var actual = this.primero.dato;
            this.primero = this.primero.siguiente;
            this.tamanio--;
        }else{
            alert('No hay datos para eliminar');
        }
    }

    buscar(dato){
        var actual = this.primero;
        var encontrado = false;
        if (!this.IsVacia())
        {
            while (actual) {
                if (actual.dato === dato) {
                    encontrado = true;
                    return true
                }
                actual = actual.siguiente;
            }
            if (encontrado === false){
                alert('No se encontro el dato buscado');
            }
        }else{
            alert("No hay datos en la Pila");
        }
    }

    buscarrepetido(dato){
        var actual = this.primero;
        var encontrado = false;
        if (!this.IsVacia())
        {
            while (actual) {
                if (actual.dato === dato) {
                    encontrado = true;
                    return true
                }
                actual = actual.siguiente;
            }
            if (encontrado === false){
                return false;
            }
        }else{
            alert("No hay datos en la Pila");
        }
    }

    buscarNodoId(dato) {
        var i = 0;
        var encontrado = false;
        var actual = this.primero;
        if (!this.IsVacia()) {
            while (actual) {
                if (dato == actual.dato) {
                    encontrado = true;
                    return i;
                }
                i++;
                actual = actual.siguiente;
            }
            if (encontrado === false) {
                alert('No se encontro el Nodo');
                return false;
            }
        } else {
            alert("No hay datos en la Pila");

        }
    }

    remplazar(datoV, datoN){
        var actual = this.primero;
        while (actual)
        {
            if (actual.dato === datoV)
            {
                actual.dato = datoN;
                break;
            }
            actual = actual.siguiente;
        }
    }

    actualizar(valorV, valorN){
        if(this.buscar(valorV))
        {
            this.remplazar(valorV, valorN);
        }
    }

    IsVacia() {
        return this.primero == null;
    }
}

let pila = new Pila();

function actualizarT() {
    pila.mostrar();

    var nodes = new vis.DataSet(arrayNodes);
    var container = document.getElementById("mynetwork");
    var data = {
        nodes: arrayNodes,
        edges: edges,
    };
    var options = {
        physics: false,
        layout: {
            hierarchical: {
                direction: 'UD',
                levelSeparation: 25

            }
        },
        interaction: {
            zoomView: true,
            zoomSpeed: 0.001,
            navigationButtons: true,
            keyboard: {
                enabled: true,
                speed: {
                    x: 15,
                    y: 15,
                    zoom: 0.1
                },
            }
        }
    };
    network = new vis.Network(container, data, options);
    network.on('click', function (properties) {
        var nodeID = properties.nodes[0];
        if (nodeID) {
            clickedNode = this.body.nodes[nodeID];
            clickedNode = clickedNode.options.id
            console.log('clicked node:', clickedNode);
            clickedNodoValue =  this.body.nodes[nodeID]
            clickedNodoValue = clickedNodoValue.options.label
            document.getElementById("valueNodo").value = clickedNodoValue;
        }
    });
    arrayNodes = []
    edges = []
}

function InsertarNodo() {
    let valueNodo = document.getElementById('valueNodo').value;
    pila.Apilar(valueNodo);
    actualizarT();
    document.getElementById("valueNodo").value="";
}

function DesapilarNodo() {
    pila.Desapilar();
    actualizarT();
    document.getElementById("valueNodo").value="";
}

function ActualizarNodo() {
    var valueNodo = document.getElementById('valueNodo').value
    pila.actualizar(clickedNodoValue, valueNodo);
    actualizarT();
    document.getElementById("valueNodo").value="";
}

function focus() {
    var valueNodo = document.getElementById('valueNodo').value
    let nodeId = pila.buscarNodoId(valueNodo);
    console.log(nodeId)
    var options = {
        // position: {x:positionx,y:positiony}, // this is not relevant when focusing on nodes
        scale: 5.0,
        offset: {x:0,y:0},
        animation: {
            duration: (1000)*(slider.value),
            easingFunction: "easeOutQuint"
        }
    }
    network.focus(nodeId, options);
}

function BuscarNodo() {
    focus();
    setTimeout(zoomExtended, (1000)*(slider.value));
    document.getElementById("valueNodo").value="";
}

function insertarNodos(array) {
    let temp = array;
    let contador = 0;
    slider.value = slidervar;

    for (let i = 0; i < temp.length; i++) {
        contador = contador + 0.5;
        setTimeout(function (params) {
            pila.ApilarJson(temp[i].toString());
            actualizarT();
        },(1000)*Math.round(parseInt(slider.value)/2)*contador)
    }
}

function readFile(callback) {

    arrayNodes = [];
    edges = [];
    carga = [];
    pila = new Pila();

    var file = fileInput.files.item(0);
    var reader = new FileReader();

    reader.readAsText(file);
    reader.onload = function (){
        var obj = JSON.parse(reader.result);
        let val = obj.valores;
        repetidos = obj.repeticion;
        slidervar = obj.animacion;

        switch (repetidos) {
            case false:
                for (var i = 0; i<val.length; i++)
                {
                    if (carga.includes(val[i]) === false)
                    {
                        carga.push(val[i]);
                    }
                }
                insertarNodos(carga);
                break;

            case true:
                for (var i = 0; i<val.length; i++)
                {
                    carga.push(val[i].toString());
                }
                insertarNodos(carga);
                break;
            default:
                console.log('Falta indicador de repitencia')
        }
    }
}

function zoomExtended(){
    // var duration = parseInt(document.getElementById("duration").value);
    var options = {
        scale: 1.0,
        duration: 4500,
        offset: {x:0,y:0},
        easingFunction: "easeOutCubic"
    }

    network.moveTo(options);
}