var arrayNodes = []
var edges = []
var clickedNode
var clickedNodoValue
var network = null
var dataDownload = []
var slider = document.getElementById("customRange2")
var switchToggle = document.getElementById("flexSwitchCheckDefault")
class Nodo{
    constructor(id, dato){
        this.id = id
        this.dato = dato
        this.siguiente = null
    }
}

class ListaSimple{
    constructor(){
        this.repetidos = false
        this.primero = this.ultimo = null
        this.tamanio = 0
        this.id = 1
    }

    insertaFinal(dato){
        if(dato == ""){
            alert("No se pueden agregar elementos vacios.")
        }else{
            if((this.buscar(dato) && (switchToggle.checked == false))){
                alert("Este dato ya existe")
            }else{
                var nuevo = new Nodo(this.id, dato)
                nuevo.siguiente = null
        
                if(this.primero == null){
                    this.primero = nuevo
                    this.ultimo = this.primero
                }else{
                    this.ultimo.siguiente = nuevo
                    this.ultimo = nuevo
                }
                this.tamanio++
                this.id++
            }   
        }
        
    }


    insertarAlInicio(dato){
        if(dato == ""){
            alert("No se pueden agregar elementos vacios.")
        }else{
            if((this.buscar(dato) && (switchToggle.checked == false))){
                alert("Este dato ya existe.")
            }else{
                var nuevo = new Nodo(this.id, dato)
                nuevo.siguiente = null
                if(this.primero == null){
                    this.primero = nuevo
                    this.ultimo = this.primero
                }else{
                    nuevo.siguiente = this.primero
                    this.primero = nuevo
                }
                this.tamanio++
                this.id++
            }
        }
    }

    recorrer(){
        dataDownload= []
        var aux = this.primero;
        if(this.tamanio != 0){
            while(aux != null){
                console.log(aux.id + ", " + aux.dato)
                arrayNodes.push({id: aux.id, label: aux.dato, shape: "box"})  
                dataDownload.push(aux.dato)
                if(aux.siguiente != null){
                    edges.push({from: aux.id, to: aux.siguiente.id, arrows: "to"})
                }
                aux = aux.siguiente;
            }    
        }else{
            console.log("No hay datos que mostrar")
            alert("La lista ha quedado vacia")
        }

        
    }

    eliminar(dato){
        if(this.tamanio == 1 && this.primero.id == dato){
            this.primero = this.ultimo = null;
        }else if(this.primero.id == dato){
            this.primero = this.primero.siguiente;
        }else{
            var aux = this.primero;
            while(aux.siguiente.id != dato){
                aux = aux.siguiente;
                if(aux.siguiente == null){
                    console.log("El valor a eliminar no existe");
                    return;
                }
            }
            if(aux.siguiente == this.ultimo){
                aux.siguiente = null
                this.ultimo = aux
            }else{
                aux.siguiente = aux.siguiente.siguiente;
            }
        }
        this.tamanio--;
    }

    //Metodo de sobrecarga para actualizar datos
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

    //Metodo de sobrecarga para la busqueda
    buscar(dato){
        if(this.primero == null){
            return false
        }else if(this.primero.dato == dato || this.ultimo.dato == dato){
            return true
        }else{
            return this._buscar(dato, this.primero.siguiente)
        }
    }

    //Metodo de recursivo para la busqueda
    _buscar(dato, temp){
        if(temp != null){
            if(temp.dato == dato){
                return true
            }else if(temp.siguiente!= null){
                return this._buscar(dato, temp.siguiente)
            }
        }
        return false
    }

    // BUSCA UN NODO POR MEDIO DE SU DATO Y RETORNA SU ID.
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
            }

            if (isEncontrado == false){
                console.log("El elemento no se encuentra")
                alert("El dato no se encuentra en la lista.")
            }
        }
    }
}


var listSimple = new ListaSimple()


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
        let contador =0
        switch(repetido){
            case true:
                switchToggle.checked = true
                for(let i=0; i<val.length; i++){
                    contador = contador + 0.5
                    setTimeout(function (params) {
                        listSimple.insertaFinal(val[i].toString())
                        actualizarTablero()
                    },(500)*(11- slider.value)*contador)
                    
                }
                break;
            case false:
                switchToggle.checked = false
                
                for(let i=0; i<val.length; i++){
                    contador = contador + 0.5
                    setTimeout(function (params) {
                        listSimple.insertaFinal(val[i].toString())
                        actualizarTablero()
                    },(500)*(11 - slider.value)*contador)
                }
                break
            default:
                console.log("No hay indicador de repitencia.")
                alert("No hay indicador de repitencia.")
                break
        }

        
    }
    
    
}



function actualizarTablero(){
    
    listSimple.recorrer()
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
                direction: 'LR',
                
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


function crearNodo(){
    let valueNodo = document.getElementById("valueNodo").value; 
    listSimple.insertaFinal(valueNodo)
    actualizarTablero()
    document.getElementById("valueNodo").value = "";
}

function crearNodoInicio(){
    var valueNodo = document.getElementById('valueNodo').value
    listSimple.insertarAlInicio(valueNodo) 
    actualizarTablero()
    console.log("")
    document.getElementById("valueNodo").value = "";
}

function eliminarNodo(){
    // let valueNodo = document.getElementById("valueNodo").value; 
    listSimple.eliminar(clickedNode)
    actualizarTablero()
    document.getElementById("valueNodo").value = "";
}

function modificarNodo(){
    let valueNodo = document.getElementById("valueNodo").value; 
    // dato actual, dato nuevo
    listSimple.actualizar(clickedNode, valueNodo)
    actualizarTablero()
    document.getElementById("valueNodo").value = ""
}

function searchNode(){
    focus()
    setTimeout(zoomExtended, (1000)*(11- slider.value))
    document.getElementById("valueNodo").value = ""
}


function focus() {
    var valueNodo = document.getElementById('valueNodo').value
    let nodeId = listSimple.buscarNodo(valueNodo)
    // console.log(nodeId)
    var options = {
        // position: {x:positionx,y:positiony}, // this is not relevant when focusing on nodes
        scale: 3.0,
        offset: {x:0,y:0},
        animation: {
            duration: (1000)*(11 - slider.value),
            easingFunction: "easeOutQuint"
        }
    }
    network.focus(nodeId, options);
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


function guardarLista(){
    
    let arrayDescargado ={
        categoria: "Estructura lineal",
        nombre: "Lista Simple",
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
        a.download = "dataListSimple.json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

