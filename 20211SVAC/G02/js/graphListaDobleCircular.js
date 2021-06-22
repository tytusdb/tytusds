var arrayNodes = []
var edges = []
var clickedNode
var clickedNodoValue
var network = null
var dataDownload = []
var switchToggle = document.getElementById("flexSwitchCheckDefault")
var slider = document.getElementById("customRange2")

class Nodo{
    constructor(id,dato){
        this.id = id
        this.dato = dato
        this.siguiente = null
        this.anterior = null
    }
}

class ListaDobleCircular{
    constructor(){
        this.primero = null
        this.ultimo = null
        this.tamanio = 0
        this.id = 1
    }

    isVacia(){
        return this.primero == null
    }

    getSize(){
        return this.tamanio
    }

    agregarInicio(dato){
        if(dato == ""){
            alert("No se pueden agregar elementos vacios.")
        }else{
            if((this.buscar(dato) && (switchToggle.checked == false))){
                alert("Este dato ya existe :D")
            }else{
                if (this.isVacia()){
                    this.primero = this.ultimo = new Nodo(this.id, dato)
                    this.ultimo.siguiente = this.primero
                    this.tamanio++
                    this.id++
                }else{
                    let aux = new Nodo(this.id, dato)
                    aux.siguiente = this.primero
                    this.primero = aux
                    this.ultimo.siguiente = this.primero
                    this.tamanio++
                    this.id++
                }
            }
        }
    }

    agregarFinal(dato){
        if(dato == ""){
            alert("No se pueden agregar elementos vacios.")
        }else{
            if((this.buscar(dato) && (switchToggle.checked == false))){
                alert("Este dato ya existe :D")
            }else{
                if(this.isVacia()){
                    this.primero = this.ultimo = new Nodo(this.id, dato)
                    this.ultimo.siguiente = this.primero
                    this.id++
                    this.tamanio++
                }else{
                    let aux = this.ultimo
                    this.ultimo = aux.siguiente = new Nodo(this.id, dato)
                    this.ultimo.siguiente = this.primero
                    this.tamanio++
                    this.id++
                }
            }
            
            
        } 
    }

    eliminar(id){
        let actual = this.primero;
        let anterior = null;
        let nodo = this.buscarNodoId(id)
        if (nodo != null) {
            while (actual.dato != nodo.dato) {
                anterior = actual;               
                actual = actual.siguiente
                if (actual == this.primero){
                    break
                }
            }

            if(actual == this.primero) {
                this.primero = actual.siguiente
                this.primero.siguiente = actual.siguiente.siguiente
                actual.siguiente = null
                this.ultimo.siguiente = this.primero

            } else if(actual == this.ultimo) {
                this.ultimo = anterior
                actual.siguiente = null
                this.ultimo.siguiente = this.primero

            } else {
                anterior.siguiente = actual.siguiente
                actual.siguiente = null
            }
            this.size -= 1;

        }else {
            console.log(`El elemento no existe en la lista`);
            alert(`El elemento no existe en la lista`);
        }
       
      
    }


    actualizar(datoActual, datoNuevo){
        if(datoActual == this.primero.id && this.tamanio == 1){
            this.primero.dato = datoNuevo
            this.ultimo.dato = datoNuevo
        }else if(datoActual == this.primero.id){
            this.primero.dato = datoNuevo
        }else if(datoActual == this.ultimo.id){
            this.ultimo.dato = datoNuevo
        }else{
            this.primero = this._actualizar(datoActual, datoNuevo, this.primero)
        }

    }

    //Metodo recursivo para la actualizacion de datos
    _actualizar(datoActual, datoNuevo, temp){
        if(datoActual == temp.id){
            temp.dato = datoNuevo
        }else{
            temp.siguiente =  this._actualizar(datoActual, datoNuevo, temp.siguiente)
        }
        return temp
    }


    recorrer(){
        dataDownload= []
        let aux = this.primero
        while (aux.siguiente){
            console.log(aux.id + "," + aux.dato)
            arrayNodes.push({id: aux.id, label: aux.dato, shape: "box"}) 
            dataDownload.push(aux.dato)
            if(aux.siguiente != this.primero){
                edges.push({from: aux.id, to: aux.siguiente.id, arrows: "to, from"})
            }else {
                edges.push({from: aux.id, to: this.primero.id, arrows: "to, from"})
            }            
            aux = aux.siguiente
          
            if (aux == this.primero){
                break
            } 
        }    
    }

    // Buscar un elemento por medio del valor que contenga el nodo y retorna el id. 
    buscarNodo(dato){
        if (this.tamanio == 0){
            console.log("No hay elementos en la lista.")
        } else{
            let isEncontrado = false
            let aux = this.primero
            while(aux != null){
                if (aux.dato == dato){
                    isEncontrado = true
                    return aux.id   
                }
                aux = aux.siguiente

                if (aux == this.primero){
                    console.log("El elemento no se encuentra")
                    alert("El dato no se encuentra en la lista.")
                    break
                }
            }
        }
    }

    // Buscar nodo por medio de su id y retornar el nodo como tal.
    buscarNodoId(dato){
        if (this.tamanio == 0){
            console.log("No hay elementos en la lista.")
        } else{
            let isEncontrado = false
            let aux = this.primero
            while(aux != null){
                if (aux.id == dato){
                    isEncontrado = true
                    return aux   
                }
                aux = aux.siguiente

                if (aux == this.primero){
                    console.log("El elemento no se encuentra")
                    alert("El dato no se encuentra en la lista.")
                    break
                }
            }

        }
        return null
    }


    //Metodo de busqueda return false/true
    buscar(dato){
        let isEncontrado = false
        let aux = this.primero
        while(aux != null){
            if (aux.dato == dato){
                // isEncontrado = true
                return true  
            }
            aux = aux.siguiente
            if (aux == this.primero){
                return false
                
            }
        }
        
        
    }


}

var listDoubleCir = new ListaDobleCircular()


function read(){
    var fileInput = document.querySelector('input[type="file"]');

    var file = fileInput.files.item(0);
    var reader = new FileReader();

    reader.readAsText(file);
    
    reader.onload = function() {
        var obj = JSON.parse(reader.result)
        let val = obj.valores
        repetido = obj.repeticion
        slider.value = obj.animacion
        let contador = 0 
        switch(repetido){
            case true:
                switchToggle.checked = true
                for(let i=0; i<val.length; i++){
                    contador = contador + 0.5
                    setTimeout(function(){
                        // agregar1(val, i)
                        listDoubleCir.agregarFinal(val[i].toString())
                        actualizarTablero()
                    },(500)*(11- slider.value)*contador)
                    
                }
                break;
            case false:
                switchToggle.checked = false
                for(let i=0; i<val.length; i++){
                    contador = contador + 0.5
                    setTimeout(function(){
                        // agregar1(val, i)
                        listDoubleCir.agregarFinal(val[i].toString())
                        actualizarTablero()
                    },(500)*(11- slider.value)*contador)
                    
                }
                break
            default:
                console.log("No hay indicador de repitencia.")
                alert("No hay indicador de repitencia.")
                break
        }

        actualizarTablero()
    }
    
}

function actualizarTablero(){
    listDoubleCir.recorrer()
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
            }
        },
        edges: {
            smooth: {
              type: 'curvedCW',
              forceDirection: 'none',
              roundness: 0.25
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
            // console.log('pointer', properties.pointer);
            clickedNodoValue =  this.body.nodes[nodeID]
            clickedNodoValue = clickedNodoValue.options.label
            document.getElementById("valueNodo").value = clickedNodoValue;
        }
    });
    arrayNodes = []
    edges = []  
}

function crearNodo() {
    var valueNodo = document.getElementById('valueNodo').value
    listDoubleCir.agregarFinal(valueNodo) 
    actualizarTablero()
    // /console.log("")
    // listaCirc.recorrer()
    document.getElementById("valueNodo").value = "";
}

function crearNodoInicio() {
    var valueNodo = document.getElementById('valueNodo').value
    listDoubleCir.agregarInicio(valueNodo) 
    actualizarTablero()
    // /console.log("")
    // listaCirc.recorrer()
    document.getElementById("valueNodo").value = ""; 
}

function eliminarNodo(){
    listDoubleCir.eliminar(clickedNode)
    actualizarTablero()
}

function modificarNodo(){
    let valueNodo = document.getElementById("valueNodo").value; 
    listDoubleCir.actualizar(clickedNode, valueNodo)
    actualizarTablero()
    document.getElementById("valueNodo").value = ""
}

function searchNode(){
    focus()
    setTimeout(zoomExtended, (1000)*(11-slider.value))
    document.getElementById("valueNodo").value = ""
}

function focus() {
    var valueNodo = document.getElementById('valueNodo').value
    let nodeId = listDoubleCir.buscarNodo(valueNodo)
    // console.log(nodeId)

    var options = {
        // position: {x:positionx,y:positiony}, // this is not relevant when focusing on nodes
        scale: 3.0,
        offset: {x:0,y:0},
        animation: {
            duration: (1000)*(11-slider.value),
            easingFunction: "easeOutQuint"
        },
        
    }
    if (nodeId != undefined){
        network.focus(nodeId, options);
    }
}

function zoomExtended(){
    // var duration = parseInt(document.getElementById("duration").value);
    var options = {
        scale: 1.0,
        duration: 4500,
        offset: {x:0,y:0},
        easingFunction: "easeOutCubic",
        
    }

    network.moveTo(options);
}


function guardarLista(){
    
    let arrayDescargado ={
        categoria: "Estructura lineal",
        nombre: "Lista Doblemente Circular",
        valores: dataDownload
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
        a.download = "dataListaDobleCircular.json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}