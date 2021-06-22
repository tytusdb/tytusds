
// create an array with nodes

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
        this.dato = dato;
        this.id = id
        this.siguiente = null;
        this.anterior = null;
    }
}
class Lista{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.tamanio = 0;
        this.id = 1
    }

    insertarAlFinal(dato){
        if(dato == ""){
            alert("No se pueden agregar elementos vacios.")
        }else {
            if((this.buscar(dato) && (switchToggle.checked == false))){
                alert("Este dato ya existe.")
            }else{
                var nuevo = new Nodo(this.id, dato)
                nuevo.anterior = nuevo.siguiente = null
                if(this.primero == null){
                    this.primero = nuevo
                    this.ultimo = this.primero
                    // arrayNodes.push({id: this.id, label: nuevo.dato, shape: "box"})
                    this.tamanio++
                    this.id++
                }else{
                    this.ultimo.siguiente = nuevo
                    nuevo.anterior = this.ultimo
                    this.ultimo = nuevo
                    // arrayNodes.push({id: this.id, label: nuevo.dato, shape: "box"})
                    // edges.push({from: this.id-1, to: this.id, arrows: "to, from"})
                    this.tamanio++
                    this.id++
                }
            }
        }
    }

    insertarAlInicio(dato){
        if(dato == ""){
            alert("No se permiten agregar elementos vacios")
        }else{
            if((this.buscar(dato) && (switchToggle.checked == false))){
                alert("Este dato ya existe.")
            }else{
                var nuevo = new Nodo(this.id, dato)
                nuevo.anterior = nuevo.siguiente = null
                if(this.primero == null){
                    this.primero = nuevo
                    this.ultimo = this.primero
                }else{
                    this.primero.anterior = nuevo
                    nuevo.siguiente = this.primero
                    this.primero = nuevo
                }
                this.tamanio++
                this.id++
            }
        }
  
    }


    eliminar(id){
        if(this.tamanio == 1 && this.primero.id == id){
            this.primero = this.ultimo = null;
        }else if(this.primero.id == id){
            this.primero = this.primero.siguiente;
            this.primero.anterior = null;
        }else if(this.ultimo.id == id){
            this.ultimo = this.ultimo.anterior;
            this.ultimo.siguiente = null;
        } 
        else{
            var aux = this.primero;
            while(aux.siguiente.id != id){
                aux = aux.siguiente;
                if(aux.siguiente == null){
                    console.log("El valor a eliminar no existe");
                    return;
                }
            }
            aux.siguiente = aux.siguiente.siguiente;
            aux.siguiente.anterior = aux
        }
        this.tamanio--;
    }

    recorrer(){
        dataDownload= []
        var aux = this.primero;
        if(this.tamanio!= 0){
            while(aux != null){
                console.log(aux.id + ", " + aux.dato)
                arrayNodes.push({id: aux.id, label: aux.dato, shape: "box"})  
                dataDownload.push(aux.dato)
                if(aux.siguiente != null){
                    edges.push({from: aux.id, to: aux.siguiente.id, arrows: "to, from"})
                }
                aux = aux.siguiente;
            }    
        }else{
            console.log("No hay datos que mostrar")
            alert("La lista ha quedado vacia")
        }
    }
    

     //Metodo para la busqueda por posicion 
    buscarPosicion(posicion){
        var isEncontrado = false;
        if (this.tamanio == 0){
            console.log("No hay elementos en la lista")
        }else {
            if (posicion >= 0 && posicion < this.tamanio){
                let aux = this.primero
                for (let i=0; i<posicion; i++){
                    aux = aux.siguiente
                }
                isEncontrado = true
                return aux.dato
            } else {
                isEncontrado = false
                console.log("Indice no valido, esta fuera de rango.")
            }
        }
    }

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

    
}

let lista =  new Lista()

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
                        lista.insertarAlFinal(val[i].toString())
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
                        lista.insertarAlFinal(val[i].toString())
                        actualizarTablero()
                    },(500)*(11- slider.value)*contador)
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
    lista.recorrer()
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
            //ID DEL NODO
            clickedNode = clickedNode.options.id
            console.log('clicked node:', clickedNode);
            // console.log('pointer', properties.pointer);
            clickedNodoValue =  this.body.nodes[nodeID]
            //VALOR DEL NODO
            clickedNodoValue = clickedNodoValue.options.label
            document.getElementById("valueNodo").value = clickedNodoValue;
        }
    });
    arrayNodes = []
    edges = []  
}


function crearNodo(){
    var valueNodo = document.getElementById('valueNodo').value
    lista.insertarAlFinal(valueNodo) 
    actualizarTablero()
    document.getElementById("valueNodo").value = "";
}

function crearNodoInicio(){
    var valueNodo = document.getElementById('valueNodo').value
    lista.insertarAlInicio(valueNodo) 
    actualizarTablero()
    document.getElementById("valueNodo").value = "";
}

function eliminarNodo(){
    // var valueNodo = document.getElementById('valueNodo').value
    lista.eliminar(clickedNode)
    // lista.recorrer()
    actualizarTablero()
    document.getElementById("valueNodo").value = "";
}

function modificarNodo(){
    // datoActual, dato nuevo
    var valueNodo = document.getElementById('valueNodo').value
    lista.actualizar(clickedNode, valueNodo)
    actualizarTablero()
}

function searchNode(){
    focus()
    setTimeout(zoomExtended, (1000)*(11-slider.value))
    
}


function focus() {
    var valueNodo = document.getElementById('valueNodo').value
    let nodeId = lista.buscarNodo(valueNodo)
    console.log(nodeId)
    var options = {
        // position: {x:positionx,y:positiony}, // this is not relevant when focusing on nodes
        scale: 3.0,
        offset: {x:0,y:0},
        animation: {
            duration: (1000)*(11-slider.value),
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
        nombre: "Lista Doble",
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
        a.download = "dataListaDoble.json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}





  
