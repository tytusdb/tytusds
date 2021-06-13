var arrayNodes = []
var edges = []
var clickedNode
var clickedNodoValue
var network = null

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

    insertarAlInicio(dato){
        if(!this.repetidos && this.buscar(dato)){
            alert("Este dato ya existe, por favor habilite los datos repetidos")
        }else{
            var nuevo = new Nodo(dato)
            nuevo.siguiente = null
            if(this.primero == null){
                this.primero = nuevo
                this.ultimo = this.primero
            }else{

                nuevo.siguiente = this.primero
                this.primero = nuevo
            }
            this.tamanio++
        }
    }

    recorrer(){
        var aux = this.primero;
        if(this.tamanio != 0){
            while(aux != null){
                console.log(aux.id + ", " + aux.dato)
                arrayNodes.push({id: aux.id, label: aux.dato, shape: "box"})  
                
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


let listSimple = new ListaSimple()

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


