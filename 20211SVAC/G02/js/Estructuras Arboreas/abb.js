//Variables auxiliares globales
var valor = 0
var contador = 1
var seReordena = false
var arrayNodes = []
var edges = []
var clickedNode //
var clickedNodoValue
var network = null
var switchToggle = document.getElementById("flexSwitchCheckDefault")
var slider = document.getElementById("customRange2")
//Clase nodo del arbol binario de busqueda
class Nodo{
    constructor(dato, id){
        this.dato = dato
        this.id = id
        this.izq = null
        this.der = null
    }
}

//Clase Arbol binario de busqueda
class ArbolBB{
    constructor(){
        this.repetidos = false
        this.raiz = null
    }
    //Método de sobrecarga para ingresar valores al arbol
    agregar(dato){
        if(switchToggle.checked == false && this.buscar(dato,  this.raiz)){
        }else{
            this.raiz = this._agregar(dato, this.raiz)
            contador++;
        }
    }

    //Método recursivo para agregar valores al arbol 
    _agregar(dato, temp){
        if(temp == null){
            return temp = new Nodo(dato, contador)
        }
        if(dato < temp.dato){
            temp.izq = this._agregar(dato, temp.izq) 
        }else{
            temp.der = this._agregar(dato, temp.der)
        }
        return temp
    }

    buscarNodo(valueNodo, temp){
        if(temp != null){
            if(valueNodo == temp.dato){
                return temp.id
            }else if(valueNodo < temp.dato){
                return this.buscarNodo(valueNodo, temp.izq)
            }else{
                return this.buscarNodo(valueNodo, temp.der)
            }
        }
    }
    
    //Metodo de busqueda dentro del arbol, devuelve un valor booleano
    buscar(dato, temp){
        if(temp != null){
            if(dato == temp.dato){
                return true
            }else if(dato < temp.dato){
                return this.buscar(dato, temp.izq)
            }else{
                return this.buscar(dato, temp.der)
            }
        }
        return false
    }

    //Método de sobrecarga para eliminar
    eliminar(id ,dato){
        this.raiz = this._eliminar(id ,dato, this.raiz)
    }

    //Método recursivo para eliminar
    _eliminar(id ,dato, temp){
        if(temp != null){
            if(dato == temp.dato && id == temp.id){
                if(temp.izq == null && temp.der == null){
                    return temp = null
                }else if(temp.izq != null){
                    temp.izq = this.buscarIzquierda(temp.izq)
                    temp.dato = valor
                }else{
                    temp.der = this.buscarDerecha(temp.der)
                    temp.dato = valor
                }
            }else if(dato < temp.dato){
                temp.izq = this._eliminar(id, dato, temp.izq)
            }else{
                temp.der = this._eliminar(id, dato, temp.der)
            }
            return temp
        }
    }

    //Este método buscar el valor mas a la derecha del nodo izquierdo, se utiliza para el método eliminar
    buscarIzquierda(temp){
        if(temp.der == null){
            valor = temp.dato
            return temp.izq
        }
        temp.der = this.buscarIzquierda(temp.der)
        return temp
    }

    //Este método buscar el valor mas a la izquierda del nodo derecho, se utiliza para el método eliminar
    buscarDerecha(temp){
        if(temp.izq == null){
            valor = temp.dato
            return temp.der
        }
        temp.izq = this.buscarDerecha(temp.izq)
        return temp
    }

    //Método de sobrecarga para la actualización
    actualizar(id, dato, datoNuevo){
        if(this.buscar(dato, this.raiz)){
            if(this.buscar(datoNuevo, this.raiz) && switchToggle.checked == false){
                alert("No se aceptan valores repetidos")
                return
            }
            this.raiz = this._actualizar(id,dato, datoNuevo, this.raiz)
            if(seReordena){
                this.eliminar(id, dato)
                this.agregar(datoNuevo)
                seReordena = false
            }
        }else{
            alert("El dato a actualizar no existe dentro del arbol")
        }
    }

    //Método recursivo para la actualización
    _actualizar(id ,dato, datoNuevo, temp){
        if(temp != null){
            if(dato == temp.dato && temp.id == id){
                var izquierda =this.buscarIzquierdaActualizar(temp.izq)
                var derecha
                if(this.buscarDerechaActualizar(temp.der) == -1){
                    derecha = datoNuevo+1
                }else{
                    derecha = this.buscarDerechaActualizar(temp.der)
                }
                if(datoNuevo > izquierda && datoNuevo <= derecha){
                    temp.dato = datoNuevo
                }else{
                    seReordena = true
                }
            }else if(dato< temp.dato){
                if(datoNuevo < temp.dato){
                    temp.izq = this._actualizar(id ,dato, datoNuevo, temp.izq)
                }else{
                    seReordena = true
                }
            }else{
                if(datoNuevo >= temp.dato){
                    temp.der = this._actualizar(id, dato, datoNuevo, temp.der)
                }else{
                    seReordena = true
                }
            }
            return temp
        }
    }

    //Método para validar el numero a actualizar
    buscarIzquierdaActualizar(temp){
        if(temp == null){
            return -1
        }else if(temp.der == null){
            return temp.dato
        }
        return this.buscarIzquierdaActualizar(temp.der)
    }

    //Método para validar el numero a actualizar
    buscarDerechaActualizar(temp){
        if(temp == null){
            return -1
        }else if(temp.izq == null){
            return temp.dato
        }
        return this.buscarDerechaActualizar(temp.izq)
    }

    //Imprime los valores en pre orden
    enPreOrden(temp){
        if(temp != null){
            console.log(temp.dato)
            this.enOrden(temp.izq)
            this.enOrden(temp.der)
        }
    }

    //Imprime los valores en orden
    enOrden(temp){
        if(temp != null){
            this.enOrden(temp.izq)
            console.log(temp.dato)
            this.enOrden(temp.der)
        }
    }

    //Imprime los valores en post orden
    enPostOrden(temp){
        if(temp != null){
            this.enOrden(temp.izq)
            this.enOrden(temp.der)
            console.log(temp.dato)
        }
    }

    recorrerGraficar(temp){
        if(temp != null){
            this.recorrerGraficar(temp.izq)
            arrayNodes.push({id: temp.id, label: temp.dato.toString(), shape: "circle"})
            if(temp.izq != null){
                edges.push({from: temp.id, to: temp.izq.id, arrows: "to"})
            }
            if(temp.der != null){
                edges.push({from: temp.id, to: temp.der.id, arrows: "to"})
            }
            this.recorrerGraficar(temp.der)
        }
    }
}

let arbolbb = new ArbolBB()

function actualizarTablero(){
    arbolbb.recorrerGraficar(arbolbb.raiz);
    var nodes = new vis.DataSet(arrayNodes);
    var container = document.getElementById("mynetwork");
    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = { 
        physics: {
            solver: "barnesHut"
            ,barnesHut: {
                avoidOverlap: 1
            }
        },
        layout: {
            hierarchical: {
                direction: 'UD',
                nodeSpacing: 150,
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
    if(arbolbb.buscar(valor, arbolbb.raiz) && switchToggle.checked == false){
        alert("No se aceptan valores repetidos")
    }else{
        arbolbb.agregar(valor)
    }
    actualizarTablero()
    document.getElementById("valueNodo").value = ""
}

function eliminarNodo(){
    if(clickedNodoValue != undefined){
        arbolbb.eliminar(clickedNode, clickedNodoValue)
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
            arbolbb.actualizar(clickedNode, clickedNodoValue, parseInt(valor))
        }else{
            arbolbb.actualizar(clickedNode, clickedNodoValue, valor)
        }
    }else{
        alert("Seleccione un nodo")
    }
    actualizarTablero()
}

function searchNode(){
    var valor
    if(document.getElementById("valueNodo").value.charCodeAt(0)>=48 && document.getElementById("valueNodo").value.charCodeAt(0)<=57){
        valor = parseInt(document.getElementById("valueNodo").value, 10);
    }else{
        valor = document.getElementById("valueNodo").value
    }
    if(arbolbb.buscar(valor, arbolbb.raiz)){
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
        
        let contador =0
        switch(arbolbb.repetidos){
            case true:
                switchToggle.checked = true
                for(let i=0; i<val.length; i++){
                    contador = contador + 0.5
                    setTimeout(function (params) {
                        arbolbb.agregar(val[i])
                        actualizarTablero()
                    },(1000)*Math.round(parseInt(slider.value)/2)*contador) 
                }
                break;
            case false:
                switchToggle.checked = false
                for(let i=0; i<val.length; i++){
                    contador = contador + 0.5
                    if (arbolbb.buscar(val[i], arbolbb.raiz)){
                        console.log("no se aceptan valores repetidos")
                    }else{                    
                        contador = contador + 0.5
                        setTimeout(function (params) {
                            arbolbb.agregar(val[i])
                            actualizarTablero()
                        },(1000)*Math.round(parseInt(slider.value)/2)*contador)
                    }
                    
                }
                break;
        }
    }
}