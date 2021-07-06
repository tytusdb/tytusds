var arrayNodes = []
var edges = []
var arregloaux = []
var contador = 1
var clickedNode
var index
var clickedNodoValue
var network = null
var switchToggle = document.getElementById("flexSwitchCheckDefault")
var slider = document.getElementById("customRange2")

class NodoBloque{
    constructor(valor, id){
        this.valor = valor
        this.id = id
    }
}
class NodoHash{
    constructor(valor, id){
        this.valor = valor
        this.izq = null
        this.der = null
        this.id = id
    }
}

class ArbolDeMerkle{
    constructor(){
        this.repetidos = false
        this.raiz = null
        this.claves = []
    }

    agregar(valor){
        contador++
        this.claves.push(new NodoBloque(valor, contador))
        this.reorganizar()

    }

    buscarNodo(valor){
        for(var i = 0; i < this.claves.length; i++){
            if(this.claves[i].valor == valor){
                return this.claves[i].id
            }
        }
        return -1
    }

    buscar(valor){
        for(var i = 0; i < this.claves.length; i++){
            if(this.claves[i].valor == valor){
                return true
            }
        }
        return false
    }

    reorganizar(){
        var arreglo = []
        for(var i = 0; i < this.claves.length; i++){
            if(this.claves[i].valor != this.claves[i].id.toString(2)){
                arreglo.push(this.claves[i])
            }
        }
        this.claves = arreglo
    }

    recorrerGuardar(){
        this.reorganizar()
        for(var i = 0; i<this.claves.length; i++){
            arregloaux.push(this.claves[i].valor.toString(16))
        }
    }

    eliminar(id, valor){
        var arreglo = []
        for(var i = 0; i < this.claves.length; i++){
            if(this.claves[i].valor != valor && this.claves[i].valor != this.claves[i].id.toString(2) && this.claves[i].id != id){
                arreglo.push(this.claves[i])
            }
        }
        this.claves = arreglo
    }

    actualizar(id, valor, valorNuevo){
        for(var i = 0; i < this.claves.length; i++){
            if(this.claves[i].valor == valor && this.claves[i].id == id){
                this.claves[i].valor = valorNuevo
            }
        }
    }

    estructurar(){
        var exponente = 0
        for(exponente; Math.pow(2, exponente) < this.claves.length; exponente++){}
        var tamanio = this.claves.length
        for(tamanio; tamanio < Math.pow(2, exponente);tamanio++){
            contador++
            this.claves.push(new NodoBloque(contador.toString(2),contador))
        }
        index = Math.pow(2, exponente)
        this.crearArbol(exponente)
        this.llenarArbol(this.raiz, Math.pow(2, exponente))
    }

    crearArbol(exponente){
        contador++
        this.raiz = new NodoHash(0, contador)
        this._crearArbol(this.raiz, exponente)
    }

    _crearArbol(temp, exponente){
        if(exponente>0){
            contador++
            temp.izq = new NodoHash(0, contador)
            contador++
            temp.der = new NodoHash(0, contador)
            this._crearArbol(temp.izq, exponente - 1)
            this._crearArbol(temp.der, exponente - 1)
        }
    }
    llenarArbol(temp, cantidad){
        if (temp != null) {
            this.llenarArbol(temp.izq, cantidad)
            this.llenarArbol(temp.der, cantidad)
            
            if (temp.izq == null && temp.der == null) {
              temp.izq = this.claves[cantidad-index--]
              temp.valor = (temp.izq.valor*1000).toString(16)
            } else {
              temp.valor = (parseInt(temp.izq.valor, 16)+parseInt(temp.der.valor, 16)).toString(16)
            }      
          }
    }

    recorrerGraficar(temp){
        if(temp != null){
            this.recorrerGraficar(temp.izq)
            arrayNodes.push({id: temp.id, label: temp.valor.toString(), shape: "box"})
            if(temp.izq != null){
                edges.push({from: temp.id, to: temp.izq.id, arrows: "from"})
            }
            if(temp.der != null){
                edges.push({from: temp.id, to: temp.der.id, arrows: "from"})
            }
            this.recorrerGraficar(temp.der)
        }
    }
}
let arbolbb = new ArbolDeMerkle()

function actualizarTablero(){
    arbolbb.recorrerGraficar(arbolbb.raiz);
    var nodes = new vis.DataSet(arrayNodes);
    var container = document.getElementById("mynetwork");
    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = { 
        physics: false,
        layout: {
            hierarchical: {
                direction: 'UD',
                nodeSpacing: 250,
                sortMethod : 'directed',
                shakeTowards: 'roots'

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

function insertarNodo(){
    var valor
    if(document.getElementById("valueNodo").value.charCodeAt(0)>=48 && document.getElementById("valueNodo").value.charCodeAt(0)<=57){
        valor = parseInt(document.getElementById("valueNodo").value, 10)
    }else{
        valor = document.getElementById("valueNodo").value
    }
    if(arbolbb.buscar(valor) && switchToggle.checked == false){
        alert("No se aceptan valores repetidos")
    }else{
        arbolbb.agregar(valor)
    }
    document.getElementById("valueNodo").value = ""
    arbolbb.estructurar()
    actualizarTablero()
}

function eliminarNodo(){
    if(clickedNodoValue != undefined){
        arbolbb.eliminar(clickedNode, clickedNodoValue)
        arbolbb.estructurar()
        actualizarTablero()
    }else{
        alert("Seleccione un nodo")
    }
    document.getElementById("valueNodo").value = ""
}

function actualizarNodo(){
    var valor = document.getElementById("valueNodo").value
    document.getElementById("valueNodo").value = ""
    if(clickedNodoValue != undefined){
        if(valor.charCodeAt(0)>=48 && valor.charCodeAt(0)<=57){
            arbolbb.actualizar(clickedNode, clickedNodoValue, parseInt(valor,10))
        }else{
            arbolbb.actualizar(clickedNode, clickedNodoValue, valor)
        }
        }else{
            alert("Seleccione un nodo")
        }
    arbolbb.estructurar()
    actualizarTablero()
}

function searchNode(){
    var valor
    if(document.getElementById("valueNodo").value.charCodeAt(0)>=48 && document.getElementById("valueNodo").value.charCodeAt(0)<=57){
        valor = parseInt(document.getElementById("valueNodo").value, 10);
    }else{
        valor = document.getElementById("valueNodo").value
    }
    if(arbolbb.buscar(valor)){
        focus()
        setTimeout(zoomExtended, 2000)
    }else{
        alert("El dato no se encuentra dentro del arbol")
    }
    document.getElementById("valueNodo").value = ""
}


function focus() {
    let nodeId
    var valueNodo
    if(document.getElementById("valueNodo").value.charCodeAt(0)>=48 && document.getElementById("valueNodo").value.charCodeAt(0)<=57){
        valueNodo = parseInt(document.getElementById("valueNodo").value, 10);
    }else{
        valueNodo = document.getElementById("valueNodo").value
    }
    nodeId = arbolbb.buscarNodo(valueNodo, arbolbb.raiz)
    document.getElementById("valueNodo").value = ""
    var options = {
        scale: 3.0,
        offset: {x:0,y:0},
        animation: {
            duration: (1000)*(slider.value),
            easingFunction: "easeOutQuint"
        }
    }
    network.focus(nodeId, options);
}

function zoomExtended(){
    var options = {
        scale: 1.0,
        duration: 4500,
        offset: {x:0,y:0},
        easingFunction: "easeOutCubic"
    }

    network.moveTo(options);
}

function read(){
    var fileInput = document.querySelector('input[type="file"]');

    var file = fileInput.files.item(0);
    var reader = new FileReader();

    reader.readAsText(file);
    
    reader.onload = function() {
        var obj = JSON.parse(reader.result)
        let val = obj.valores
        arbolbb.repetidos = obj.repeticion
        slider.value = obj.animacion
        
        let contadorr =0
        switch(arbolbb.repetidos){
            case true:
                switchToggle.checked = true
                for(let i=0; i<val.length; i++){
                    contadorr = contadorr + 0.5
                    setTimeout(function (params) {
                        arbolbb.agregar(val[i],16)
                        arbolbb.estructurar()
                        actualizarTablero()
                    },(1000)*Math.round(parseInt(slider.value)/2)*contadorr) 
                }
                break;
            case false:
                switchToggle.checked = false
                for(let i=0; i<val.length; i++){
                    contadorr = contadorr + 0.5
                    if (arbolbb.buscar(val[i], arbolbb.raiz)){
                        console.log("no se aceptan valores repetidos")
                    }else{
                        contadorr = contadorr + 0.5
                        setTimeout(function (params) {
                            arbolbb.agregar(+val[i])
                            arbolbb.estructurar()
                            actualizarTablero()
                        },(1000)*Math.round(parseInt(slider.value)/2)*contadorr)                        
                    }
                    
                }
                break;
        }
    }
}

function descargar(){
    arbolbb.recorrerGuardar()
    let array = {
        categoria: "Estructura Arboreas",
        nombre:  "Arbol de Merkle",
        repeticion: switchToggle.checked,
        animacion: parseInt(slider.value),
        valores: arregloaux
    }
    arregloaux = []
    var json = JSON.stringify(array, null, "\t");
    json = [json];
    var blob1 = new Blob(json, { type: "text/json;charset=utf-8" });
    var isIE = false || !!document.documentMode;
    if (isIE) {
        window.navigator.msSaveBlob(blob1, "data.json");
    } else {
        var url = window.URL || window.webkitURL;
        link = url.createObjectURL(blob1);
        var a = document.createElement("a");
        a.download = "dataArbolMerkle.json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}