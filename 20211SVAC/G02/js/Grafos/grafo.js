var arrayNodes = []
var edges = []  
var slider = document.getElementById("customRange2")
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
                if(valor == undefined || !this.esPonderado || valor == 0){
                    this.matAd[numero1][numero2] = 1
                }else{
                    this.matAd[numero1][numero2] = valor
                }
            }
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
                    if(this.esPonderado){
                        if(this.esDirigido){
                            edges.push({from: i, to: j, arrows: "to", label: this.matAd[i][j].toString()})
                        }else{
                            edges.push({from: i, to: j, label: this.matAd[i][j].toString()})
                        }
                    }else{
                        if(this.esDirigido){
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

let Grafo = new GrafoMatriz(true, true)

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

function insertarNodo(){
    var valor = document.getElementById("valueNodo").value
    Grafo.nuevoVertice("Jonathan")
    Grafo.nuevoVertice("Julio")
    Grafo.nuevoVertice("Kevin")
    Grafo.nuevoVertice("Alexander")
    Grafo.nuevoVertice("Josue")
    Grafo.nuevoVertice("Pedro")
    Grafo.nuevoArco("Jonathan", "Alexander", 6)
    Grafo.nuevoArco("Jonathan", "Kevin", 1)
    Grafo.nuevoArco("Julio", "Kevin", 2)
    Grafo.nuevoArco("Kevin", "Josue", 10)
    Grafo.nuevoArco("Pedro", "Jonathan", 4)
    Grafo.nuevoArco("Josue", "Jonathan", 5)
    Grafo.nuevoArco("Alexander", "Julio", 8)
    Grafo.nuevoArco("Pedro", "Kevin", 12)

    actualizarTablero()
    document.getElementById("valueNodo").value = ""
}