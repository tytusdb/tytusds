var arrayNodes = []
var edges = []  
var slider = document.getElementById("customRange2")
var switchToggle = document.getElementById("flexSwitchCheckDefault")
var switchToggle2 = document.getElementById("flexSwitchCheckDefault2")
var clickedNode
var clickedNodoValue
var network = null
class Vertice{
    constructor(nombre, numeroVertice){
        this.nombre = nombre
        this.numeroVertice = numeroVertice
    }
}

class GrafoMatriz{
    constructor(esDirigido, esPonderado){
        this.esPonderado = esPonderado
        this.esDirigido = esDirigido
        this.vertices = []
        this.matAd = []
    }

    numeroVertice(nombre){
        for(var i=0; i<this.vertices.length; i++){
            if(this.vertices[i].nombre == nombre){
                return this.vertices[i].numeroVertice
            }
        }
        return -1
    }

    Existe(nombre){
        for(var i=0; i<this.vertices.length; i++){
            if(this.vertices[i].nombre == nombre){
                return true
            }
        }
        return false
    }

    nuevoVertice(nombre){
        if(!this.Existe(nombre)){
            this.vertices.push(new Vertice(nombre, this.vertices.length))
            for(var i = 0; i < this.vertices.length; i++){
                if(this.matAd[i] == undefined){
                    this.matAd[i] = []
                }
                for(var j = 0; j < this.vertices.length; j++){
                    if(this.matAd[i][j] == undefined){
                        this.matAd[i][j] = 0
                    }
                }
            }
        }else{
            alert("El nodo o vertice ya se encuentra dentro del grafo")
        }
    }

    nuevoArco(nombre1, nombre2, valor){
        var numero1 = this.numeroVertice(nombre1)
        var numero2 = this.numeroVertice(nombre2)
        if(numero1 != -1 && numero2 != -1){
            if(this.matAd[numero1][numero2] == 0){
                if(valor == undefined || valor == 0){
                    this.matAd[numero1][numero2] = 1
                }else{
                    this.matAd[numero1][numero2] = valor
                }
            }
        }else{
            if(numero1 == -1 && numero2 == -1){
                this.nuevoVertice(nombre1)
                this.nuevoVertice(nombre2)
            }else if(numero1 == -1 && numero2 != -1){
                this.nuevoVertice(nombre1)
            }else{
                this.nuevoVertice(nombre2)
            }
            this.nuevoArco(nombre1, nombre2, valor)
        }
    }

    actualizar(nombre, nombreNuevo){
        var numerover = this.numeroVertice(nombre)
        if(numerover != -1){
            this.vertices[numerover].nombre = nombreNuevo
        }
    }

    eliminarVertice(nombre){
        var numerover = this.numeroVertice(nombre)
        var aux = []
        var auxMatAd = []
        if(numerover != -1){
            for(var i = 0; i<this.vertices.length; i++){
                if(i != numerover){
                    this.vertices[i].numeroVertice = aux.length
                    aux.push(this.vertices[i])
                }
            }

            for(var i = 0; i < this.vertices.length; i++){
                if( i != numerover){
                    if(auxMatAd[i] == undefined){
                        auxMatAd[i] = []
                    }
                    for(var j = 0; j < this.vertices.length; j++){
                        if(j != numerover){
                            if(j< numerover){
                                auxMatAd[i][j] = this.matAd[i][j]
                            }else{
                                auxMatAd[i][j-1] = this.matAd[i][j]
                            }
                        }
                    }
                }
            }
            this.vertices = aux
            this.matAd = auxMatAd
        }
    }

    recorrerGraficar(){
        for(var i = 0; i < this.vertices.length; i++){
            arrayNodes.push({id: this.vertices[i].numeroVertice, label: this.vertices[i].nombre.toString(), shape: "circle"})
        }
        for(var i = 0; i < this.vertices.length; i++){
            for(var j = 0; j < this.vertices.length; j++){
                if(this.matAd[i][j] > 0){
                    if(switchToggle2.checked){
                        if(switchToggle.checked){
                            edges.push({from: i, to: j, arrows: "to", label: this.matAd[i][j].toString()})
                        }else{
                            edges.push({from: i, to: j, label: this.matAd[i][j].toString()})
                        }
                    }else{
                        if(switchToggle.checked){
                            edges.push({from: i, to: j, arrows: "to"})
                        }else{
                            edges.push({from: i, to: j})
                        }
                    }
                }
            }
        }
    }
}

class Nodo{
    constructor(dato){
        this.dato = dato
        this.siguiente = null
    }
}

class Cola{
    constructor(){
        this.primero = null
        this.tamanio = 0
    }

    insertar(dato){
        if(this.tamanio == 0){
            this.primero = new Nodo(dato)
        }else{
            this.primero = this._insertar(dato, this.primero)
        }
        this.tamanio++
    }

    insertarInicio(dato){
        var nuevo = new Nodo(dato)
        nuevo.siguiente = this.primero
        this.primero = nuevo
        this.tamanio++
    }

    buscar(nombre, temp){
        if(temp != null){
            if(temp.dato.nombre == nombre){
                return true
            }else{
                return this.buscar(nombre, temp.siguiente)
            }
        }
        return false
    }

    _insertar(dato, temp){
        if(temp != null){
            if(temp.siguiente == null){
                temp.siguiente = new Nodo(dato)
            }else{
                temp.siguiente = this._insertar(dato, temp.siguiente)
            }
        }
        return temp
    }

    colaVacia(){
        if(this.tamanio == 0){
            return true
        }
        return false
    }
    eliminar(){
        if(this.tamanio == 0){
            return null
        }else{
            var aux = this.primero
            this.primero = this.primero.siguiente
            this.tamanio--
            return aux
        }
    }
}

function buscar(array, nombre){
    for(var i = 0; i < array.length; i++){
        if(array[i].nombre == nombre){
            return true
        }
    }
    return false
}

function RecorrerAnchura(g, nombre){
    var v = g.numeroVertice(nombre)
    var m = []
    var w
    if(v != -1){
        var cola = new Cola()
        cola.insertar(g.vertices[v])
        while(!cola.colaVacia()){
            var vertice = cola.eliminar().dato
            m.push(vertice)
            w = vertice.numeroVertice
            for(var j = 0; j < g.vertices.length; j++){
                if(g.matAd[w][j] > 0 && !buscar(m, g.vertices[j].nombre) && !cola.buscar(g.vertices[j].nombre, cola.primero)){
                    cola.insertar(g.vertices[j])
                }
            }
        }
    }
    var q = ""
    for(var k = 0; k < m.length; k++){
        if(k == m.length-1){
            q += m[k].nombre
        }else{
            q += m[k].nombre + "-"
        }
    }
    return q
}

function RecorrerProfundidad(g, nombre){
    var v = g.numeroVertice(nombre)
    var m = []
    var w
    if(v != -1){
        var cola = new Cola()
        cola.insertarInicio(g.vertices[v])
        console.log(cola.colaVacia())
        while(!cola.colaVacia()){
            var vertice = cola.eliminar().dato
            m.push(vertice)
            w = vertice.numeroVertice
            for(var j = 0; j < g.vertices.length; j++){
                if(g.matAd[w][j] > 0 && !buscar(m, g.vertices[j].nombre) && !cola.buscar(g.vertices[j].nombre, cola.primero)){
                    cola.insertarInicio(g.vertices[j])
                }
            }
        }
    }
    var q = ""
    for(var k = 0; k < m.length; k++){
        if(k == m.length-1){
            q += m[k].nombre
        }else{
            q += m[k].nombre + "-"
        }
    }
    return q
}

function buscarAnchura(g, nombre, nombreFin){
    var v = g.numeroVertice(nombre)
    var m = []
    var w
    if(v != -1){
        var cola = new Cola()
        cola.insertar(g.vertices[v])
        while(!cola.colaVacia()){
            var vertice = cola.eliminar().dato
            m.push(vertice)
            if(vertice.nombre == nombreFin){
                break
            }
            w = vertice.numeroVertice
            for(var j = 0; j < g.vertices.length; j++){
                if(g.matAd[w][j] > 0 && !buscar(m, g.vertices[j].nombre) && !cola.buscar(g.vertices[j].nombre, cola.primero)){
                    cola.insertar(g.vertices[j])
                }
            }
        }
    }
    var q = ""
    for(var k = 0; k < m.length; k++){
        if(k == m.length-1){
            q += m[k].nombre
        }else{
            q += m[k].nombre + "-"
        }
    }
    return q
}

function buscarProfundidad(g, nombre, nombreFin){
    var v = g.numeroVertice(nombre)
    var m = []
    var w
    if(v != -1){
        var cola = new Cola()
        cola.insertarInicio(g.vertices[v])
        console.log(cola.colaVacia())
        while(!cola.colaVacia()){
            var vertice = cola.eliminar().dato
            m.push(vertice)
            if(vertice.nombre == nombreFin){
                break
            }
            w = vertice.numeroVertice
            for(var j = 0; j < g.vertices.length; j++){
                if(g.matAd[w][j] > 0 && !buscar(m, g.vertices[j].nombre) && !cola.buscar(g.vertices[j].nombre, cola.primero)){
                    cola.insertarInicio(g.vertices[j])
                }
            }
        }
    }
    var q = ""
    for(var k = 0; k < m.length; k++){
        if(k == m.length-1){
            q += m[k].nombre
        }else{
            q += m[k].nombre + "-"
        }
    }
    return q
}

function actualizarTablero(){
    Grafo.recorrerGraficar();
    var nodes = new vis.DataSet(arrayNodes);
    var container = document.getElementById("mynetwork");
    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = { 
        physics: false
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
let Grafo = new GrafoMatriz(switchToggle.checked, switchToggle2.checked)
function crearVertice(){
    var valor = document.getElementById("valueNodo").value
    Grafo.nuevoVertice(valor)
    actualizarTablero()
    document.getElementById("valueNodo").value = ""
    document.getElementById("valueNodo2").value = ""
    document.getElementById("peso").value = ""
    document.getElementById("record").value = ""
}

function crearArco(){
    var valor = document.getElementById("valueNodo").value
    var valor2 = document.getElementById("valueNodo2").value
    var valor3 = document.getElementById("peso").value
    Grafo.nuevoArco(valor, valor2, valor3)
    actualizarTablero()
    document.getElementById("valueNodo").value = ""
    document.getElementById("valueNodo2").value = ""
    document.getElementById("peso").value = ""
    document.getElementById("record").value = ""
}

function eliminarVertice(){
    var valor = document.getElementById("valueNodo").value
    Grafo.eliminarVertice(valor)
    actualizarTablero()
    document.getElementById("valueNodo").value = ""
    document.getElementById("valueNodo2").value = ""
    document.getElementById("peso").value = ""
    document.getElementById("record").value = ""
}

function actualizarVertice(){
    var valor = document.getElementById("valueNodo").value
    var valor2 = document.getElementById("valueNodo2").value
    Grafo.actualizar(valor, valor2)
    actualizarTablero()
    document.getElementById("valueNodo").value = ""
    document.getElementById("valueNodo2").value = ""
    document.getElementById("peso").value = ""
    document.getElementById("record").value = ""
}

function recorrerAn(){
    var valor = document.getElementById("valueNodo").value
    str = RecorrerAnchura(Grafo, valor)
    document.getElementById("record").value = str
    actualizarTablero()
    document.getElementById("valueNodo").value = ""
    document.getElementById("valueNodo2").value = ""
    document.getElementById("peso").value = ""
}

function recorrerPro(){
    var valor = document.getElementById("valueNodo").value
    str = RecorrerProfundidad(Grafo, valor)
    document.getElementById("record").value = str
    actualizarTablero()
    document.getElementById("valueNodo").value = ""
    document.getElementById("valueNodo2").value = ""
    document.getElementById("peso").value = ""
}

function buscarAn(){
    var valor = document.getElementById("valueNodo").value
    var valor2 = document.getElementById("valueNodo2").value
    str = buscarAnchura(Grafo, valor, valor2)
    document.getElementById("record").value = str
    actualizarTablero()
    document.getElementById("valueNodo").value = ""
    document.getElementById("valueNodo2").value = ""
    document.getElementById("peso").value = ""
}

function buscarPro(){
    var valor = document.getElementById("valueNodo").value
    var valor2 = document.getElementById("valueNodo2").value
    str = buscarProfundidad(Grafo, valor, valor2)
    document.getElementById("record").value = str
    actualizarTablero()
    document.getElementById("valueNodo").value = ""
    document.getElementById("valueNodo2").value = ""
    document.getElementById("peso").value = "" 
}

function descargar(){}