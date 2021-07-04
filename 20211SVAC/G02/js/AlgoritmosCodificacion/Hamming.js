var ma, contador
var arrayNodes = []
var edges = []
var network = null
var dataDownload = []
var slider = document.getElementById("customRange2")

function actualizarTablero(){
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

function llenarPalabra(palabra, longitud, red){
    var str = "", contadorparidad = 0, contadorpalabra = 0 
    for(var i = 0; i < longitud; i++){
        if(Math.pow(2, contadorparidad) == i+1){
            str += "-"
            contadorparidad++
        }else{
            str += palabra.charAt(contadorpalabra++)
        }
    }
    var str = paridad(str, red)
    return str
}

function paridad(palabra, red){
    var mat = [], str = ""
    var pow = 0, contadoraux = 0, ingresando = false
    for(var i = 0; i<red; i++){
        mat.push([])
    }
    for(var i = 0; i< red; i++){
        pow = Math.pow(2, i) -1
        ingresando = true
        for(var j = pow; j < palabra.length; j++){
            if(ingresando){
                contadoraux++
                mat[i][j] = palabra.charAt(j)
                if(contadoraux == pow+1){
                    ingresando = false
                    contadoraux = 0
                }
            }else{
                mat[i][j] = "-"
                contadoraux++
                if(contadoraux == pow+1){
                    ingresando = true
                    contadoraux = 0
                }
            }
        }
        contadoraux = 0
        ingresando = false
    }
    for(var i = 0; i<red; i++){
        pow = Math.pow(2, i) -1
        for(var j = pow; j < palabra.length; j++){
            if(mat[i][j] == "1"){
                contadoraux++
            }
        }
        if(espar(contadoraux)){
            mat[i][pow] = "0"
        }else{
            mat[i][pow] = "1"
        }
        contadoraux = 0
    }
    contadoraux = 0
    for(var i = 0; i < palabra.length; i++){
        if(i == (Math.pow(2, contadoraux)-1)){
            str += mat[contadoraux][Math.pow(2, contadoraux)-1]
            contadoraux++
        }else{
            str += palabra.charAt(i)
        }
    }
    ma = mat
    return str
}

function espar(valor){
    if (valor%2==0) {
        return true;
    }
    return false;
}

function Hamming(cadena){
    var longitud = cadena.length
    var red = 1
    while(Math.pow(2, red) < (longitud+red+1)){
        red++
    }
    return cadena = llenarPalabra(cadena, longitud+red+1, red)
}

function graficar(){
    var str = ""
    for(var i = 0; i< ma.length; i++){
        for(var j = 0; j < ma[i].length; j++){
            if(ma[i][j] == undefined){
                str+=  + " |"
            }else if(ma[i][j] == "0" || ma[i][j] == "1"){
                str+= ma[i][j] + "|"
            }else{
                str+=  + " |"
            }
        }
        arrayNodes.push({id: contador, label: str, shape: "box"})
        if(contador > 0){
            edges.push({from: contador-1, to: contador})
        }
        str = ""
        contador++
    }
    contador = 0
    actualizarTablero()
}

function Cif(){
    var valor = document.getElementById("codificar").value
    document.getElementById("codificado").value = Hamming(valor)
}