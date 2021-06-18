var contador = 1
var arrayNodes = []
var edges = []
var clickedNode
var clickedNodoValue
var network = null
class Nodo{
    constructor(padre, id){
        this.id = id
        this.claves = []
        this.hijos = []
        this.padre = padre
    }
    
    //Agrega valores al nodo

    agregar(valor){
        this.claves.push(valor)
        if(this.claves.length > 1){
            this.claves = sort(this.claves)
        }
    }

    eliminar(valor){
        var arreglo = []
        for(i = 0; i< this.claves.length; i++){
            if(valor != this.claves[i]){
                arreglo.push(this.claves[i])
            }
        }
        this.claves = arreglo
    }

    buscar(valor){
        var i = 0
        for(i = 0; i<this.claves.length; i++){
            if(this.claves[i] == valor){
                return i
            }
        }
        return -1
    }
}

class ArbolB{
    constructor(grado){
        this.repetidos = false
        this.grado = grado
        if(espar(grado)){
            this.enmedio = grado/2
        }else{
            this.enmedio = (grado-1)/2
        }
        this.raiz = new Nodo(null, 0)
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
            for(i = 0; i<temp.claves.length; i++){
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
                for(i = 0; i<this.enmedio; i++){
                    temp.hijos[0].agregar(c.claves[i])
                    temp.hijos[1].agregar(c.claves[i+this.enmedio+1])
                }
                if(c.hijos.length > 0){
                    for(i = 0; i<this.enmedio+1; i++){
                        temp.hijos[0].hijos[i] = c.hijos[i]
                        temp.hijos[0].hijos[i].padre = temp.hijos[0]
                        temp.hijos[1].hijos[i] = c.hijos[i+this.enmedio+1]
                        temp.hijos[1].hijos[i].padre = temp.hijos[1]
                    }
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

                for(i = temp.padre.claves.length; i>index+1; i--){
                    temp.padre.hijos[i] = temp.padre.hijos[i-1]
                }

                var aux = temp
                contador++
                temp.padre.hijos[index] = new Nodo(temp.padre, contador)
                //console.log("Claves  "+temp.padre.hijos[index].claves)

                contador ++
                temp.padre.hijos[index+1] = new Nodo(temp.padre, contador)
                for(i = 0; i<this.enmedio; i++){
                    console.log(aux.claves[i])
                    temp.padre.hijos[index].agregar(aux.claves[i])
                    temp.padre.hijos[index+1].agregar(aux.claves[i+this.enmedio+1])
                }
                temp = temp.padre.hijos[index]

                if(tieneHijos){
                    for(i = 0; i<this.enmedio+1; i++){
                        temp.padre.hijos[index].hijos[i] = aux.hijos[i]
                        temp.padre.hijos[index].hijos[i].padre = temp.padre.hijos[index]
                    }
                    for(i = this.enmedio+1; i<this.grado+1; i++){
                        temp.padre.hijos[index+1].hijos[i-this.enmedio-1] = aux.hijos[i]
                        temp.padre.hijos[index+1].hijos[i-this.enmedio-1].padre = temp.padre.hijos[index+1]
                    }
                    
                }
            }
        }
        return temp
    }

    eliminar(valor){
        if(this.buscar(valor, this.raiz)){
            if(this.raiz.buscar(valor) != -1){
                if(this.raiz.hijos.length == 0){
                    this.raiz.eliminar(valor)
                }else{
                    
                }
            }
        }else{
            alert("El valor no existe dentro del arbol")
        }
    }

    _eliminar(valor, temp){
        if(temp!= null){
            if(temp.buscar(valor) != -1){
                if(temp.hijos.length == 0){
                    if(temp.claves.length>this.enmedio || temp.padre == null){
                        return temp.eliminar(valor)
                    }else{
                        var pivote = 0
                        for(pivote; pivote < temp.padre.hijos.length; pivote++){
                            if(temp.padre.hijos == temp){
                                break
                            }
                        }
                        temp.eliminar(valor)
                        if(pivote == temp.padre.hijos.length-1){

                        }else{
                            temp.agregar(temp.claves[pivote])
                        }
                    }
                    
                }else{}
            }else{
                //Sirve para buscar en otros nodos en caso de no encontrarlo
                if(temp.hijos.length>0){
                    //for(){}
                }
            }
        }
        return temp
    }

    //Método de busqueda retorna un booleano
    buscar(valor, temp){
        if(temp != null){
            for(i = 0; i< temp.claves.length; i++){
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
            for(i = 0; i< temp.claves.length; i++){
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
            for(i = 0; i<temp.claves.length; i++){
                if(i == temp.claves.length-1){
                    texto = texto + temp.claves[i].toString();
                }else{
                    texto = texto + temp.claves[i].toString() + "|"
                }
            }
            arrayNodes.push({id: temp.id, label: texto, shape: "box"})
            texto = ""
            for(i = 0; i<temp.hijos.length; i++){
                edges.push({from: temp.id, to: temp.hijos[i].id})
                this.recorrerGraficar(temp.hijos[i])
            }
        }
    }
}


//Metodo de ordenamiento burbuja
function sort(arreglo){
    var aux = 0;
    for(i=0; i< arreglo.length-1; i++){
        for(j=i+1; j<arreglo.length; j++){
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
                nodeSpacing: 150,
                sortMethod : 'directed'
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
        arbol = new ArbolB(grado)
        alert("Arbol creado exitosamente")
    }else{
        alert("El arbol ya existe")
    }
    
    document.getElementById("Grado").value = ""  
}

function insertarNodo(){
    var valor = parseInt(document.getElementById("valueNodo").value, 10);
    document.getElementById("valueNodo").value = "" 
    arbol.agregar(valor)
    actualizarTablero()
}

function searchNode(){
    var valor = parseInt(document.getElementById("valueNodo").value, 10);
    if(arbol.buscar(valor, arbol.raiz)){
        focus()
        setTimeout(zoomExtended, 2000)
    }else{
        alert("El dato no se encuentra dentro del arbol")
    }
    document.getElementById("valueNodo").value = ""
}

function focus() {
    var valueNodo = parseInt(document.getElementById("valueNodo").value, 10);
    let nodeId = arbol.buscarNodo(valueNodo, arbol.raiz)
    document.getElementById("valueNodo").value = ""
    var options = {
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
    var options = {
        scale: 1.0,
        duration: 4500,
        offset: {x:0,y:0},
        easingFunction: "easeOutCubic"
    }

    network.moveTo(options);
}