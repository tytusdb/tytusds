var arrayNodes = [];
var edges = [];
var cargaV1 = [];
var cargaV2 = [];
var cargaDistancia = [];
let diccIds = {};
var network = null;
var clickedNode;
var clickedNodoValue;
var slidervar = '';
var fileInput = document.querySelector('input[type="file"]');
var slider = document.getElementById("customRange2");

let dataDowloand = [];

class GrafoLista {
    constructor() {
        this.listaAdyacente = {};
    }

    addVertice (vertice) {
        if (!this.buscarVertice(vertice))
        {
            this.listaAdyacente[vertice] = [];
        }else
        {
            console.log('Vertice Ingresado Ya existe: ', vertice);
            alert('Vertice Ingresado Ya existe');
        }
    }

    addArista (comienzo, destino, peso) {
        if (!this.listaAdyacente[comienzo])
        {
            this.addVertice(comienzo);
        }
        if (!this.listaAdyacente[destino])
        {
            this.addVertice(destino);
        }
        this.listaAdyacente[comienzo].push([destino, peso]);
    }

    removeArista (comienzo, destino){
        for (let dataV in this.listaAdyacente) {
            if (dataV === comienzo)
            {
                for (let i = 0; i < this.listaAdyacente[dataV].length; i++) {
                    if (destino === this.listaAdyacente[dataV][i])
                    {
                        if (i != 0)
                        {
                            this.listaAdyacente[dataV].splice(i, i);
                        }else{
                            this.listaAdyacente[dataV].splice(i, i+1);
                        }
                    }
                }
            }
        }
    }

    removerVertice (vertice) {
        if(this.buscarVertice(vertice))
        {
            for (let data in this.listaAdyacente) {

                for (let i = 0; i < this.listaAdyacente[data].length; i++) {
                    if (vertice === this.listaAdyacente[data][i])
                    {
                        if (i != 0)
                        {
                            this.listaAdyacente[data].splice(i, i);
                        }else{
                            this.listaAdyacente[data].splice(i, i+1);
                        }
                    }
                }

                if (vertice === data)
                {
                    delete this.listaAdyacente[vertice];
                }

            }
        }else{
            console.log('Vertice a eliminar no existe');
            alert('Vertice a eliminar no existe');
        }
    }

    buscarVertice (nodo) {
        let encontrado = false;
        for (let vertice in this.listaAdyacente) {
            if (vertice === nodo)
            {
                encontrado = true;
                return true;
            }
        }
        if (!encontrado)
        {
            return false;
        }
    }

    recorrerAL (){
        dataDowloand = [];
        let conexiones = [];

        this.numVertice();
        for (let vertis in this.listaAdyacente)
        {
            arrayNodes.push({id:diccIds[vertis], label: vertis, shape: 'circle'})
        }
        //conexion
        for (let vertis in this.listaAdyacente)
        {
            conexiones = [];
            for (let i = 0; i < this.listaAdyacente[vertis].length; i++)
            {
                let dataTemp = this.listaAdyacente[vertis][i];
                edges.push({from:diccIds[vertis], to: diccIds[dataTemp[0]], label: dataTemp[1]})
                conexiones.push({'arista':dataTemp[0], 'distancia': dataTemp[1]})
            }
            dataDowloand.push({'Vertice':vertis, 'Aristas':conexiones})
        }
    }

    //recorrida costo uniforme

    numVertice (){
        diccIds = {};
        let contador = 0;
        if (this.listaAdyacente.length !== 0){
            for (let listaKey in this.listaAdyacente) {
                diccIds[listaKey] = contador;
                contador ++;
            }
        }
    }

    menorPeso (pesos) {
        let minimo = pesos[0];
        let contador = 0;
        let temp = 0;
        for (let i = 0; i < pesos.length; i++) {
            if (pesos[i] < minimo)
            {
                minimo = pesos[i];
                temp = contador;
            }
            contador ++;
        }
        return temp;
    }

    valorxPosicion (index) {
        let clave = '';
        if (index <= this.sizeListaAdy())
        {
            let contador = 0;
            for (let key in this.listaAdyacente)
            {
                if (contador === index)
                {
                    clave = key;
                    return clave;
                }
                contador ++;
            }
        }else
        {
            console.log('Posicion no existe en lista adyacente')
        }
    }

    sizeListaAdy () {
        let contador = 0;
        for (let key in this.listaAdyacente)
        {
            contador++;
        }
        return contador;
    }

    idVertice (nodo) {
        let contador = 0;
        for (let key in this.listaAdyacente) {
            if (nodo === key)
            {
                return contador;
            }
            contador ++ ;
        }
    }

    actualizarVertice (verticeviejo, verticeNuevo) {
        let dicTemp = {};
        let vvv = {};
        dicTemp = this.listaAdyacente;
        this.listaAdyacente = {}

        for (let keyVertice in dicTemp)
        {
            if (verticeviejo === keyVertice)
            {
                this.listaAdyacente[verticeNuevo] = [];
                vvv[keyVertice] = [verticeNuevo]
            }else{
                this.listaAdyacente[keyVertice] = [];
                vvv[keyVertice] = [keyVertice]
            }

            let contador = 0;
            for (let i = 0; i < dicTemp[keyVertice].length; i++)
            {
                let aristaTemp = dicTemp[keyVertice][i][0]
                if (aristaTemp === verticeviejo)
                {
                    dicTemp[keyVertice][i][0] = verticeNuevo;
                    this.listaAdyacente[vvv[keyVertice].toString()].push(dicTemp[keyVertice][i]);
                }else{
                    this.listaAdyacente[vvv[keyVertice].toString()].push(dicTemp[keyVertice][i]);
                }
            }
        }
    }
}

let Costo = new GrafoLista();

function actualizarT() {
    Costo.recorrerAL();

    var nodes = new vis.DataSet(arrayNodes);
    var container = document.getElementById("mynetwork");
    var data = {
        nodes: arrayNodes,
        edges: edges,
    };
    var options = {
        physics: false,
        edges: {
            width:2,
            arrows:{
                to:{
                    enabled: true,
                    scaleFactor: 0.5,
                    type: 'arrow'
                }
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
    let valueArista = document.getElementById('valueArista').value;
    let valuePeso = document.getElementById('valuePeso').value;
    if (valueArista === '' || valuePeso === '' || valueNodo === '')
    {
        alert('Ingrese datos en los inputs')
    }else{
        Costo.addArista(valueNodo, valueArista, valuePeso);
    }
    actualizarT();
    document.getElementById("valueNodo").value="";
    document.getElementById("valueArista").value="";
    document.getElementById('valuePeso').value="";
}

function insertarNodos (array) {
    let vertice;
    let contador1 = 0;
    let contador = 0;
    let arraytemp = []
    slider.value = slidervar;

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (j === 0){
                vertice = array[i][0];
            }
            contador = 0;
            for (let k = 0; k < array[i][j].length; k++) {
                if (contador1 === 1)
                {
                    arraytemp.push(vertice.toString(), array[i][j][k - 1].toString(), array[i][j][k].toString())
                    contador1 = 0;
                }else {
                    contador1 ++;
                }
            }
        }
    }

    contador = 0;
    for (let i = 0; i < arraytemp.length; i++) {
        if (i % 3  === 0)
        {
            console.log(i)
            contador = contador + 0.5;
            setTimeout(function () {
                Costo.addArista(arraytemp[i], arraytemp[i + 1], arraytemp[i + 2]);
                actualizarT();
            },(500)*(11 - slider.value)*contador)
        }
    }
}

function readFile(callback) {
    arrayNodes = [];
    edges = [];
    cargaV1 = [];
    cargaV2 = [];
    cargaDistancia = [];
    this.listaAdyacente = {};

    var file = fileInput.files.item(0);
    var reader = new FileReader();

    reader.readAsText(file);
    reader.onload = function (){
        var obj = JSON.parse(reader.result);
        let val = obj.valores;
        slidervar = obj.animacion;

        for (let i = 0; i < val.length; i++)
        {
            cargaV2 = [];
            cargaDistancia = [];
            for (let j = 0; j < val[i].aristas.length; j++)
            {
                cargaV2.push(val[i].aristas[j].arista)
                cargaV2.push(val[i].aristas[j].distancia)
            }
            cargaV1.push([val[i].vertice, cargaV2])
        }
        console.log('final', cargaV1)
        insertarNodos(cargaV1)
    }

}

function focus() {
    var valueNodo = document.getElementById('valueNodo').value
    let nodeId = Costo.idVertice(valueNodo);
    console.log(nodeId)
    var options = {
        scale: 5.0,
        offset: {x:0,y:0},
        animation: {
            duration: (1000)*(11 - slider.value),
            easingFunction: "easeOutQuint"
        }
    }
    network.focus(nodeId, options);
}

function actualizarNodo() {
    let valueNodo = document.getElementById('valueNodo').value
    let valorVertice = Costo.valorxPosicion(clickedNode)
    Costo.actualizarVertice(valorVertice, valueNodo);
    actualizarT();
    document.getElementById("valueNodo").value="";
}

function eliminarVertice(){
    let valorVertice = Costo.valorxPosicion(clickedNode)
    Costo.removerVertice(valorVertice);
    actualizarT();
    document.getElementById("valueNodo").value="";
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
        categoria: "Estructura No lineal",
        nombre: "Grafo Dirigido/No Dirigido",
        almacenamiento: "Lista de adyacencia",
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
        a.download = "data_Grafos.json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}