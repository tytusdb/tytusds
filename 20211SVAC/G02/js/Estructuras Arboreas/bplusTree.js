var contador = 2
var arrayNodes = []
var edges = []
var clickedNode
var clickedNodoValue
var network = null
var switchToggle = document.getElementById("flexSwitchCheckDefault")
var slider = document.getElementById("customRange2")
class Nodo{
    constructor(padre, id){
        this.id = id
        this.claves = []
        this.hijos = []
        this.padre = padre
        this.siguiente = null
    }
    
    //Agrega valores al nodo
    agregar(valor){
        this.claves.push(valor)
        if(this.claves.length > 1){
            this.claves = sort(this.claves)
        }
    }

}

class ArbolBMas{
    constructor(grado){
        this.repetidos = false
        this.grado = grado
        if(espar(grado)){
            this.enmedio = grado/2
        }else{
            this.enmedio = (grado-1)/2
        }
        this.raiz = new Nodo(null, 1)
    }

    //Agrega valores
    agregar(valor){
        this.raiz = this._agregar(valor, this.raiz)
    }

    //Metodo recursivo para agregar valores
    _agregar(valor, temp){
        if(temp.hijos.length == 0){
            temp.agregar(valor)
        }else{
            var encontrar = false
            for(var i = 0; i<temp.claves.length; i++){
                if(valor < temp.claves[i]){
                    encontrar = true
                    temp.hijos[i] = this._agregar(valor, temp.hijos[i])
                    break;
                }
            }
            if(!encontrar){
                temp.hijos[temp.claves.length] = this._agregar(valor, temp.hijos[temp.claves.length])
            }
        }
        if(temp.claves.length == this.grado){
            if(temp.padre == null){
                contador++
                var c = temp;
                temp = new Nodo(null, contador)
                temp.agregar(c.claves[this.enmedio])
                contador++
                temp.hijos.push(new Nodo(temp, contador))
                contador++
                temp.hijos.push(new Nodo(temp, contador))
                for(var i = 0; i<this.enmedio; i++){
                    temp.hijos[0].agregar(c.claves[i])
                    temp.hijos[1].agregar(c.claves[i+this.enmedio+1])
                }
                if(c.hijos.length > 0){
                    for(var i = 0; i<this.enmedio+1; i++){
                        temp.hijos[0].hijos[i] = c.hijos[i]
                        temp.hijos[0].hijos[i].padre = temp.hijos[0]
                        temp.hijos[1].hijos[i] = c.hijos[i+this.enmedio+1]
                        temp.hijos[1].hijos[i].padre = temp.hijos[1]
                    }
                    if(c.hijos[0].hijos.length>0){
                        temp.hijos[0].hijos[temp.hijos[0].hijos.length-1].siguiente = temp.hijos[1].hijos[0]
                    }
                }
                else{
                    temp.hijos[0].siguiente = temp.hijos[1]
                }
            }else{
                var claveMedia = temp.claves[this.enmedio]
                temp.padre.agregar(claveMedia)
                var index
                var tieneHijos = false
                if(temp.hijos.length > 0){
                    tieneHijos = true
                }
                for(index = 0; index < temp.padre.claves.length; index++){
                    if(temp.padre.claves[index] == claveMedia){
                        break
                    }
                }
                for(var i = temp.padre.claves.length; i>index+1; i--){
                    temp.padre.hijos[i] = temp.padre.hijos[i-1]
                }
                var aux = temp
                contador++
                temp.padre.hijos[index] = new Nodo(temp.padre, contador)
                contador ++
                temp.padre.hijos[index+1] = new Nodo(temp.padre, contador)
                for(var i = 0; i<this.enmedio; i++){
                    console.log(aux.claves[i])
                    temp.padre.hijos[index].agregar(aux.claves[i])
                    temp.padre.hijos[index+1].agregar(aux.claves[i+this.enmedio+1])
                }
                temp = temp.padre.hijos[index]

                if(tieneHijos){
                    for(var i = 0; i<this.enmedio+1; i++){
                        temp.padre.hijos[index].hijos[i] = aux.hijos[i]
                        temp.padre.hijos[index].hijos[i].padre = temp.padre.hijos[index]
                    }
                    for(var i = this.enmedio+1; i<this.grado+1; i++){
                        temp.padre.hijos[index+1].hijos[i-this.enmedio-1] = aux.hijos[i]
                        temp.padre.hijos[index+1].hijos[i-this.enmedio-1].padre = temp.padre.hijos[index+1]
                    } 
                    if(temp.padre.hijos[0].hijos.length>0){
                        if(index > 0){
                            temp.padre.hijos[index-1].hijos[temp.padre.hijos[index-1].hijos.length-1].siguiente = temp.padre.hijos[index].hijos[0]
                        }
                        temp.padre.hijos[index].hijos[temp.padre.hijos[index].hijos.length-1].siguiente = temp.padre.hijos[index+1].hijos[0]
                    }
                }else{
                    if(index > 0){
                        temp.padre.hijos[index-1].siguiente = temp.padre.hijos[index]
                    }
                    temp.padre.hijos[index].siguiente = temp.padre.hijos[index+1]
                    if(index< (temp.padre.hijos.length-1)){
                        temp.padre.hijos[index+1].siguiente = temp.padre.hijos[index+2]
                    }
                }
            }
        }
        return temp
    }

    //Método de busqueda retorna un booleano
    buscar(valor, temp){
        if(temp != null){
            for(var i = 0; i< temp.claves.length; i++){
                if(temp.claves[i] == valor){
                    return true
                }
                if(valor < temp.claves[i]){
                    if(temp.hijos.length > 0){
                        return this.buscar(valor, temp.hijos[i])
                    }
                    break
                }
            }
            if(temp.hijos.length > 0){
                return this.buscar(valor, temp.hijos[temp.claves.length])
            }
        }
        return false
    }

    buscarNodo(valor, temp){
        if(temp != null){
            for(var i = 0; i< temp.claves.length; i++){
                if(temp.claves[i] == valor){
                    return temp.id
                }
                if(valor < temp.claves[i]){
                    if(temp.hijos.length > 0){
                        return this.buscarNodo(valor, temp.hijos[i])
                    }
                    break
                }
            }
            if(temp.hijos.length > 0){
                return this.buscarNodo(valor, temp.hijos[temp.claves.length])
            }
        }
    }

    //Metodo inserta nodos y ramas para graficar
    recorrerGraficar(temp){
        if(temp != null){
            var texto = ""
            var i
            for(var i = 0; i<temp.claves.length; i++){
                if(i == temp.claves.length-1){
                    texto = texto + temp.claves[i].toString();
                }else{
                    texto = texto + temp.claves[i].toString() + "|"
                }
            }
            arrayNodes.push({id: temp.id, label: texto, shape: "box"})
            texto = ""
            for(var i = 0; i<temp.hijos.length; i++){
                edges.push({from: temp.id, to: temp.hijos[i].id})
                this.recorrerGraficar(temp.hijos[i])
            }
        }
    }

    recorrerListaGraficar(temp){
        if(temp != null){
            if(temp.hijos.length == 0 && temp.siguiente!= null){
                this.recorrerLista(temp)
                return
            }else{
                if(temp.hijos.length>0){
                    this.recorrerListaGraficar(temp.hijos[0])
                }
                return
            }
        }
    }

    recorrerLista(temp){
        if(temp != null){
            if(temp.siguiente!= null){
                edges.push({from: temp.id, to: temp.siguiente.id, arrows: "to"})
                if(temp.siguiente.siguiente!= null){
                    this.recorrerLista(temp.siguiente)
                }
            }
        }
    }
}


//Metodo de ordenamiento burbuja
function sort(arreglo){
    var aux = 0;
    for(var i=0; i< arreglo.length-1; i++){
        for(var j=i+1; j<arreglo.length; j++){
            if(arreglo[i] > arreglo[j]){
                aux = arreglo[i];
                arreglo[i] = arreglo[j];
                arreglo[j] = aux;
            }
        }
    }
    return arreglo;
}

//Metodo que nos indica si el grado es par o impar
function espar(valor){
    if (valor%2==0) {
        return true;
    }
    return false;
}

let arbol = null

function actualizarTablero(){
    arbol.recorrerGraficar(arbol.raiz);
    arbol.recorrerListaGraficar(arbol.raiz)
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
        },
        edges: {
            smooth: {
              type: 'curvedCW',
              forceDirection: 'none',
              roundness: 1
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

function crearArbol(){
    var grado = document.getElementById("Grado").value
    if(arbol == null){
        arbol = new ArbolBMas(grado)
        alert("Arbol creado exitosamente")
    }else{
        alert("El arbol ya existe")
    }
    
    document.getElementById("Grado").value = ""  
}

function insertarNodo(){
    var valor
    if(document.getElementById("valueNodo").value.charCodeAt(0)>=48 && document.getElementById("valueNodo").value.charCodeAt(0)<=57){
        valor = parseInt(document.getElementById("valueNodo").value, 10)
    }else{
        valor = document.getElementById("valueNodo").value
    }
    if(arbol.buscar(valor, arbol.raiz) && switchToggle.checked == false){
        alert("No se aceptan valores repetidos")
    }else{
        arbol.agregar(valor)
    }
    document.getElementById("valueNodo").value = ""
    actualizarTablero()
}

function searchNode(){
    var valor
    if(document.getElementById("valueNodo").value.charCodeAt(0)>=48 && document.getElementById("valueNodo").value.charCodeAt(0)<=57){
        valor = parseInt(document.getElementById("valueNodo").value, 10);
    }else{
        valor = document.getElementById("valueNodo").value
    }
    if(arbol.buscar(valor, arbol.raiz)){
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
    nodeId = arbol.buscarNodo(valueNodo, arbol.raiz)
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
        if(arbol == null){
            arbol = new ArbolBMas(obj.grado)
        }
        arbol.repetidos = obj.repeticion
        slider.value = obj.animacion
        
        let contador =0
        switch(arbol.repetidos){
            case true:
                switchToggle.checked = true
                for(let i=0; i<val.length; i++){
                    contador = contador + 0.5
                    setTimeout(function (params) {
                        arbol.agregar(val[i])
                        actualizarTablero()
                    },(1000)*Math.round(parseInt(slider.value)/2)*contador) 
                }
                break;
            case false:
                switchToggle.checked = false
                for(let i=0; i<val.length; i++){
                    contador = contador + 0.5
                    if (arbol.buscar(val[i], arbol.raiz)){
                        console.log("no se aceptan valores repetidos")
                    }else{                    
                        contador = contador + 0.5
                        setTimeout(function (params) {
                            arbol.agregar(val[i])
                            actualizarTablero()
                        },(1000)*Math.round(parseInt(slider.value)/2)*contador)
                    }
                    
                }
                break;
        }
    }
}