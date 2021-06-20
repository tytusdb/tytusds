// create an array with nodes
var arrayNodes = [];
var edges = [];
var carga = [];
var network = null;
var clickedNode;
var clickedNodoValue;
var fileInput = document.querySelector('input[type="file"]');


class Pila {
    elementos = [];
    constructor() {
        this.tamanio = 0;
    }

    Apilar(dato) {
        if (this.tamanio > 0 )
        {
            this.elementos.push(dato);
            this.tamanio++;
        }else{
            this.elementos.push(dato);
            this.tamanio++;
        }
    }

    //recorrido y llenado de nodos
    mostrar(){
        if (this.elementos.length > 0 )
        {
            for (let i = 0; i < this.elementos.length; i++) {
                if (i != 0)
                {
                    arrayNodes.push({id: i, label: this.elementos[i], shape: "box"});
                    edges.push({from: i - 1, to: i})
                }else{
                    arrayNodes.push({id:i, label: this.elementos[i], shape: "box"});
                }
            }
        }else{
            console.log('No hay datos en pila')
        }
    }

    Desapilar() {
        return this.elementos.pop()
    }

    buscar(dato){
        if (this.elementos.length > 0)
        {
            if (this.elementos[this.buscarNodoId(dato)] === dato)
            {
                return true
            }else
            {
                alert('Dato no se encuentra en Pila');
                return false;
            }
        }else{
            alert("No hay datos en la Pila")
        }
    }

    buscarNodoId(dato) {
        var encontrado = false;
        if (this.elementos.length > 0) {
            for (let i = 0; i < this.elementos.length; i++) {
                if (this.elementos[i] === dato) {
                    encontrado = true;
                    return i;
                }
            }
            if (encontrado === false) {
                alert('No se encontro el Nodo');
                return false;
            }
        } else {
            alert("No hay datos en la Pila")

        }
    }

    remplazar(datoV, datoN){
        for (let i = 0; i < this.elementos.length; i++)
        {
            if (datoV === this.elementos[i])
            {
                this.elementos[i] = datoN;
                break;
            }
        }
    }

    actualizar(valorV, valorN){
        if(this.buscar(valorV))
        {
            this.remplazar(valorV, valorN);
        }
    }

    IsVacia() {
        return this.elementos.length === 0;
    }

    vacia() {
        return this.elementos = [];
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
            duration: 2500,
            easingFunction: "easeOutQuint"
        }
    }
    network.focus(nodeId, options);
}

function BuscarNodo() {
    focus();
    document.getElementById("valueNodo").value="";
}

function insertarNodos(array) {
    let temp = array;
    for (let i = 0; i < temp.length; i++) {
        pila.Apilar(temp[i]);
    }
    actualizarT();
}

function readFile(callback) {

    arrayNodes = [];
    edges = [];
    carga = [];
    pila.vacia();

    var file = fileInput.files.item(0);
    var reader = new FileReader();

    reader.readAsText(file);
    reader.onload = function (){
        var obj = JSON.parse(reader.result);
        let val = obj.valores;
        repetidos = obj.repeticion;

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