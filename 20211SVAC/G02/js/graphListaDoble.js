
// create an array with nodes

var arrayNodes = []
var edges = []
var clickedNode
var clickedNodoValue
var network = null
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
        var aux = this.primero;
        if(this.tamanio!= 0){
            while(aux != null){
                console.log(aux.id + ", " + aux.dato)
                arrayNodes.push({id: aux.id, label: aux.dato, shape: "box"})  
                
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
        if(this.buscar(datoActual)){
            if(this.buscar(datoNuevo) && !this.repetidos){
                alert("No se aceptan valores repetidos")
                return
            }
            if(datoActual == this.primero.dato && this.tamanio == 1){
                this.primero.dato = datoNuevo
                this.ultimo.dato = datoNuevo
            }else if(datoActual == this.primero.dato){
                this.primero.dato = datoNuevo
            }else if(datoActual == this.ultimo.dato){
                this.ultimo.dato = datoNuevo
            }else{
                this.primero = this._actualizar(datoActual, datoNuevo, this.primero)
            }
        }else{
            alert("El valor no existe dentro de la lista")
        }
    }
    
    //Metodo recursivo para la actualizacion de datos
    _actualizar(datoActual, datoNuevo, temp){
        if(datoActual == temp.dato){
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
    var valueNodo = document.getElementById('valueNodo').value
    lista.insertarAlFinal(valueNodo) 
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
    lista.actualizar(clickedNodoValue, valueNodo)
    actualizarTablero()
}

function searchNode(){
    focus()
    setTimeout(zoomExtended, 2000)
    
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
            duration: 2500,
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





  
