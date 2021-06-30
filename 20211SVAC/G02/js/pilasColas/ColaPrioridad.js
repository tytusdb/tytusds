var arrayNodes = [];
var edges = [];
var cargaVal = [];
var cargaPriori = [];
var network = null;
var clickedNode;
var clickedNodoValue;
var slidervar = '';
var fileInput = document.querySelector('input[type="file"]');
var switchToggle = document.getElementById("flexSwitchCheckDefault");
var slider = document.getElementById("customRange2");

let dataDowloand = [];

class Nodo {
    constructor(dato, prioridad) {
        this.dato = dato;
        this.priori = prioridad;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ColaPrioridad {
    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }

    encolar(dato, prioridad){
        let nodo = new Nodo(dato, prioridad);
        let actual = this.primero;

        nodo.anterior = nodo.siguiente = null;

        if (!this.isVacia()) {
            if (actual. priori> prioridad){
                this.primero.anterior = nodo;
                nodo.siguiente = this.primero;
                this.primero = nodo;
            }else{
                while (actual.siguiente != null && actual.siguiente.priori <= prioridad)
                {
                    actual = actual.siguiente;
                }
                this.primero.anterior = actual;
                nodo.siguiente = actual.siguiente;
                actual.siguiente = nodo;

                this.size++;
            }
        }else{
            this.primero = nodo;
            this.ultimo = this.primero;
            this.size++;
        }


    }

    encolarCondicion(dato, prioridad){
        let nodo = new Nodo(dato, prioridad);
        let actual = this.primero;

        nodo.anterior = nodo.siguiente = null;

        if (switchToggle.checked === false) {
            if (!this.isVacia()) {
                if (!this.buscar(dato)) {
                    if (actual.priori > prioridad) {
                        this.primero.anterior = nodo;
                        nodo.siguiente = this.primero;
                        this.primero = nodo;
                    } else {
                        while (actual.siguiente != null && actual.siguiente.priori <= prioridad) {
                            actual = actual.siguiente;
                        }
                        this.primero.anterior = actual;
                        nodo.siguiente = actual.siguiente;
                        actual.siguiente = nodo;

                        this.size++;
                    }
                }
            } else {
                this.primero = nodo;
                this.ultimo = this.primero;
                this.size++;
            }
        }else
        {
            if (!this.isVacia()) {
                if (actual.priori > prioridad) {
                    this.primero.anterior = nodo;
                    nodo.siguiente = this.primero;
                    this.primero = nodo;
                } else {
                    while (actual.siguiente != null && actual.siguiente.priori <= prioridad) {
                        actual = actual.siguiente;
                    }
                    this.primero.anterior = actual;
                    nodo.siguiente = actual.siguiente;
                    actual.siguiente = nodo;

                    this.size++;
                }
            } else {
                this.primero = nodo;
                this.ultimo = this.primero;
                this.size++;
            }
        }
    }

    desencolar(){
        if (this.isVacia()){
            return 'Cola Vacia'
        }else{
            var actual = this.primero;
            this.primero = this.primero.siguiente;
            this.size--;
        }
    }

    imprimir(){
        dataDowloand = [];
        let actual = this.primero;
        let i = 0;
        //this.ordenarp();
        if (!this.isVacia())
        {
            while (actual)
            {
                if (i != 0)
                {
                    arrayNodes.push({id: i, label: actual.dato+", "+actual.priori, shape: "box"});
                    edges.push({from: i - 1, to: i});
                    dataDowloand.push(actual.dato+", "+actual.priori);
                }else{
                    arrayNodes.push({id: i, label: actual.dato+", "+actual.priori, shape: "box"});
                    dataDowloand.push(actual.dato+", "+actual.priori)
                }
                i++;
                actual = actual.siguiente
            }
        }
    }

    isVacia(){
        return this.primero == null;
    }

    actualizar (viejo, nuevo) {
        var generado, priori;
        generado= viejo.split(',');
        viejo = generado[0];
        priori = generado[1]
        if (this.buscar(viejo))
        {
            this.remplazar(viejo, nuevo, priori);
        }
    }

    buscar (valor) {
        let actual = this.primero
        let encontrado = false;
        if (!this.isVacia())
        {
            while (actual)
            {
                if(valor === actual.dato)
                {
                    encontrado = true;
                    return true;
                }
                actual = actual.siguiente;
            }
            if (encontrado === false)
            {
                return false;
            }
        }else{
            alert('Ingrese datos a la Cola de prioridad para buscarlos');
            return false;
        }
    }

    buscarNodo (valor) {
        let actual = this.primero;
        var encontrado = false;
        var id = 0;

        if (!this.isVacia())
        {
            while (actual)
            {
                if(valor === actual.dato)
                {
                    encontrado = true;
                    return id;
                }
                actual = actual.siguiente;
                id++;
            }
            if (encontrado === false)
            {
                alert("El dato ingreso no se encuentra en la Cola de prioridad");
            }
        }else{
            alert('Ingrese datos a la Cola de prioridad para buscarlos');
        }

    }

    remplazar (viejo, nuevo, prioridad) {
        let actual = this.primero;
        while (actual)
        {
            if (viejo === actual.dato)
            {
                actual.dato = nuevo ;
                actual.priori =prioridad;
                break;
            }
            actual = actual.siguiente;
        }
    }
}

let colaPrioridad = new ColaPrioridad();

function actualizarT() {
    colaPrioridad.imprimir();

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
    let valuePrioridad = document.getElementById("valuePrioridad").value;
    if (valuePrioridad === "") valuePrioridad = 5;
    colaPrioridad.encolarCondicion(valueNodo, valuePrioridad);
    actualizarT();
    document.getElementById("valueNodo").value="";
    document.getElementById("valuePrioridad").value="";
}

function insertarNodos(arrayVal, arrayP) {
    let temp = arrayVal;
    let temp1 = arrayP;
    let contador = 0;
    slider.value = slidervar;

    for (let i = 0; i < temp.length; i++) {
        contador = contador + 0.5;
        setTimeout(function (params) {
            colaPrioridad.encolar(temp[i], temp1[i]);
            actualizarT();
        },(500)*(11 - slider.value)*contador)
    }
    document.getElementById("valueNodo").value="";
}

function readFile(callback) {

    arrayNodes = [];
    edges = [];
    cargaVal = [];
    cargaPriori = [];
    colaPrioridad = new ColaPrioridad();

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
                    if (cargaVal.includes(val[i].valor) === false)
                    {
                        cargaVal.push(val[i].valor);
                        cargaPriori.push(val[i].prioridad)
                    }
                }
                insertarNodos(cargaVal, cargaPriori);
                break;

            case true:
                for (var i = 0; i<val.length; i++)
                {
                    cargaVal.push(val[i].valor);
                    cargaPriori.push(val[i].prioridad);
                }
                insertarNodos(cargaVal, cargaPriori);
                break;
            default:
                console.log('Falta indicador de repitencia')
        }
    }
}

function focus() {
    var valueNodo = document.getElementById('valueNodo').value
    let nodeId = colaPrioridad.buscarNodo(valueNodo);
    console.log(nodeId)
    var options = {
        // position: {x:positionx,y:positiony}, // this is not relevant when focusing on nodes
        scale: 5.0,
        offset: {x:0,y:0},
        animation: {
            duration: (1000)*(11 - slider.value),
            easingFunction: "easeOutQuint"
        }
    }
    network.focus(nodeId, options);
}

function actualizarNodo(){
    var valueNodo = document.getElementById('valueNodo').value
    colaPrioridad.actualizar(clickedNodoValue, valueNodo);
    actualizarT();
    document.getElementById("valueNodo").value="";
}

function desencolarNodo(){
    colaPrioridad.desencolar();
    actualizarT();
    document.getElementById("valueNodo").value="";
    document.getElementById("valuePrioridad").value="";
}

function buscarNodo(){
    focus()
    setTimeout(zoomExtended, (1000)*(11 - slider.value))
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

function descargar(){

    let arrayDescargado ={
        categoria: "Estructura lineal",
        nombre: "Cola Prioridad",
        valores: dataDowloand
    }

    var json = JSON.stringify(arrayDescargado, null, "\t");
    json = [json];
    var blob1 = new Blob(json, { type: "text/json;charset=utf-8" });
    //Check the Browser.
    var isIE = false || !!document.documentMode;
    if (isIE) {
        window.navigator.msSaveBlob(blob1, "data.json");
    } else {
        var url = window.URL || window.webkitURL;
        link = url.createObjectURL(blob1);
        var a = document.createElement("a");
        a.download = "data_ColaPrioridad.json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}