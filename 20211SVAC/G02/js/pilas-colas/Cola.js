var arrayNodes = [];
var edges = [];
var carga = [];
var network = null;
var clickedNode;
var clickedNodoValue;
var slidervar = '';
var fileInput = document.querySelector('input[type="file"]');
var switchToggle = document.getElementById("flexSwitchCheckDefault");
var slider = document.getElementById("customRange2");

class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

class Cola {
    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }

    encolar(dato){
        const nodo = new Nodo(dato);

        if (this.size > 0)
        {
            this.ultimo.siguiente = nodo;
            this.ultimo = nodo;
            this.size++;
        }else{
            this.primero = nodo;
            this.ultimo = nodo;
            this.size++;
        }
    }

    encolarCondicion (dato) {
        const nodo = new Nodo(dato);

        if (switchToggle.checked === false) {
            if (this.size > 0) {
                if (!this.buscar(dato)) {
                    this.ultimo.siguiente = nodo;
                    this.ultimo = nodo;
                    this.size++;
                }
            } else {
                this.primero = nodo;
                this.ultimo = nodo;
                this.size++;
            }
        }else
        {
            if (this.size > 0) {
                this.ultimo.siguiente = nodo;
                this.ultimo = nodo;
                this.size++;
            } else {
                this.primero = nodo;
                this.ultimo = nodo;
                this.size++;
            }
        }
    }

    desencolar(){
        const actual = this.primero;
        this.primero = this.primero.siguiente;
        this.size --;

        return actual.dato;
    }

    imprimir(){
        let id = 0;
        let actual = this.primero;
        if (this.size != 0){
            while (actual)
            {
                if (id > 0)
                {
                    arrayNodes.push({id: id, label: actual.dato, shape: "box"})
                    edges.push({from: id - 1, to: id})
                }else{
                    arrayNodes.push({id: id, label: actual.dato, shape: "box"})
                }
                actual = actual.siguiente;
                id++;
            }
        }else{
            alert("Lista vacia");
        }
    }

    actualizar(actual, remplazo){
        let data = this.primero;
        if(this.buscar(actual))
        {
            this.remplazar(actual, remplazo);
        }
    }

    buscar(dato){
        let actual = this.primero
        if (this.size != 0)
        {
            while (actual)
            {
                if (actual.dato === dato)
                {
                    return true;
                }
                actual = actual.siguiente;
            }
        }else{
            alert('Dato No encontrado')
            return false;
        }
    }

    buscarNodo(dato){
        let id = 0;
        let encontro = false;
        let actual = this.primero;
        if (this.cantidad() != 0)
        {
            while (actual)
            {
                if (actual.dato === dato)
                {
                    encontro = true;
                    return id;
                }
                actual = actual.siguiente;
                id++;
            }
            if (encontro == false)
            {
                alert("Dato a buscar no se encuentra en la COLA");
            }
        }
    }

    remplazar(datoV, datoN){
        let actual = this.primero;
        while (actual)
        {
            if (actual.dato === datoV)
            {
                actual.dato = datoN;
            }
            actual = actual.siguiente
        }
    }

    isVacia(){
        return this.size === 0;
    }

    peek(){
        console.log(this.primero.dato);
        return this.primero.dato;
    }

    cantidad(){
        console.log(this.size);
        return this.size;
    }
}

let cola = new Cola();

function actualizarT() {
    cola.imprimir();

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
                direction: 'DU',
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

function insertarNodo() {
    let valueNodo = document.getElementById('valueNodo').value;
    cola.encolarCondicion(valueNodo);
    actualizarT();
    document.getElementById("valueNodo").value="";
}

function insertarNodos(array) {
    let temp = array;
    let contador = 0;
    slider.value = slidervar;

    for (let i = 0; i < temp.length; i++) {
        contador = contador + 0.5;
        setTimeout(function (params) {
            cola.encolar(temp[i]);
            actualizarT();
        },(1000)*Math.round(parseInt(slider.value)/2)*contador)
    }
}

function readFile(callback) {

    arrayNodes = [];
    edges = [];
    carga = [];
    cola = new Cola();

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
                        carga.push(val[i].toString());
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

function focus() {
    var valueNodo = document.getElementById('valueNodo').value
    let nodeId = cola.buscarNodo(valueNodo);
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

function actualizarNodo(){
    var valueNodo = document.getElementById('valueNodo').value
    cola.actualizar(clickedNodoValue, valueNodo);
    actualizarT();
    document.getElementById("valueNodo").value="";
}

function desencolarNodo(){
    cola.desencolar();
    actualizarT();
    document.getElementById("valueNodo").value="";
}

function buscarNodo(){
    focus();
    setTimeout(zoomExtended, (1000)*(slider.value));
    document.getElementById("valueNodo").value="";
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