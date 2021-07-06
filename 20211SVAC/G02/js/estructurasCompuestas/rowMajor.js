arrayNodes = []
edges = [] 
var network = null
var slider = document.getElementById("customRange2")
var filas = 0 
var columna = 0
var array = []
var arrayRow = []
var arrayCol = []
var dataDownload= []
var dataDownload1= []
class Matriz{
    constructor(fila, columna){
        this.fila = fila
        this.columna = columna
        this.init()
        
    }

    init(){
        for (let i=0; i<this.fila; i++){
            let arrayFila = []
            for(let y=0; y<this.columna; y++){
                arrayFila.push(-1)
            }
            array.push(arrayFila)
        } 
    }

    agregar(posicionX, posicionY, valor){
        if((parseInt(posicionX) > this.fila) || (parseInt(posicionY) > this.columna)){
            alert("Posicion fuera de limite de matriz.")
        }else{
            if (array[posicionX][posicionY] != -1){
                alert("Ya existe un valor en esa posicion.")
            }else{
                array[posicionX][posicionY] = valor
            }
           
        }
        
    }

    eliminar(posicionX, posicionY){
        if((parseInt(posicionX) > this.fila) || (parseInt(posicionY) > this.columna)){
            alert("Posicion fuera de limite de matriz.")
        }else{
            if (array[posicionX][posicionY] == -1){
                alert("No hay elemento por eliminar en esta posicion.")
            }else{
                array[posicionX][posicionY] = -1
            }   
            
        }
    }

    modificar(posicionX, posicionY, valorModificado){
        if((parseInt(posicionX) > this.fila) || (parseInt(posicionY) > this.columna)){
            alert("Posicion fuera de limite de matriz.")
        }else{
            if (array[posicionX][posicionY] == -1){
                alert("No hay elemento por modificar en esta posicion.")
            }else{
                array[posicionX][posicionY] = valorModificado
            }
        }
    }

    buscar(valor){
        let encontrado = false
        for (let i=0; i<this.fila; i++){
            for(let y=0; y<this.columna; y++){
                // console.log(array[i][y])
                if(array[i][y] == valor){
                    encontrado = true
                    alert("Encontrado, en la posicion: " + i.toString() + ", " + y.toString())
                }    
            }
        }

        if(encontrado == false){
            alert("El dato no se encuentra en la matriz")
        }
        
    }

    rowMajor(){
        dataDownload= []
        arrayNodes = []
        edges = []
        arrayRow = []
        console.log(this.fila)
        console.log(this.columna)
        for(let i=0; i<this.fila; i++){
            for(let y=0; y<this.columna; y++){
                arrayRow.push(array[i][y])
            }
        }
        let conteo = 0
        for(let i=0; i<arrayRow.length; i++){
            setTimeout(function(params) {
                arrayNodes.push({id: i, label: arrayRow[i].toString(), shape: "box"})
                dataDownload.push(arrayRow[i].toString())
                if(i >= 1){
                    edges.push({from: i-1, to: i, shape: "box", arrows: "to"})
                }
                actualizarTablero()
            },(500)*(11- slider.value)*conteo)
            conteo++
           
        } 
        
    }

    colMajor(){
        dataDownload= []
        arrayNodes = []
        edges = []
        arrayCol = []
        for(let i=0; i<this.columna; i++){
            for(let y=0; y<this.fila; y++){
                let valor = array[y][i]
                arrayCol.push(valor)
            }
        }
        let conteo = 0
        for(let i=0; i<arrayCol.length; i++){
            setTimeout(function(params) {
                arrayNodes.push({id: i, label: arrayCol[i].toString(), shape: "box"})
                dataDownload.push(arrayCol[i].toString())
                if(i >= 1){
                    edges.push({from: i-1, to: i, shape: "box", arrows: "to"})
                }
                actualizarTablero()
            },(500)*(11- slider.value)*conteo)
            conteo++
           
        } 
    }

}

var matriz = null
function crearMatriz(){
    var valueFila = document.getElementById('valueFila').value
    var valueColumna = document.getElementById('valueColumna').value
    matriz = new Matriz(valueFila, valueColumna)
    graficarMatrizHTML()
    document.getElementById('valueFila').value = ""
    document.getElementById('valueColumna').value = ""

}

function agregarValor(){
    var posicionX = document.getElementById('posicionX').value
    var posicionY = document.getElementById('posicionY').value
    var valueNodo = document.getElementById('valueNodo').value
    matriz.agregar(posicionX, posicionY, valueNodo)
    graficarMatrizHTML()
    document.getElementById('posicionX').value = ""
    document.getElementById('posicionY').value = ""
    document.getElementById('valueNodo').value = ""
}

function eliminarValor(){
    var posicionX = document.getElementById('posicionX').value
    var posicionY = document.getElementById('posicionY').value
    matriz.eliminar(posicionX, posicionY)
    graficarMatrizHTML()
    document.getElementById('posicionX').value = ""
    document.getElementById('posicionY').value = ""
}

function modificarValor(){
    var posicionX = document.getElementById('posicionX').value
    var posicionY = document.getElementById('posicionY').value
    var valueNodo = document.getElementById('valueNodo').value
    matriz.modificar(posicionX, posicionY, valueNodo)
    graficarMatrizHTML()
    document.getElementById('posicionX').value = ""
    document.getElementById('posicionY').value = ""
    document.getElementById('valueNodo').value = ""
}

function buscarValor() {
    var valueNodo = document.getElementById('valueNodo').value
    matriz.buscar(valueNodo)
    document.getElementById('valueNodo').value = ""

}

function descargar(){
    let arrayDescargado ={
        categoria: "Estructura Compuesta",
        nombre: "Row y col major.",
        name: "Matriz",
        matriz: array,
        lista: "Lista",
        valores: dataDownload,
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
        a.download = "DataColumRowMajor.json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

function aplicarRow(){
    matriz.rowMajor()
    
}


function aplicarCol(){
    matriz.colMajor()
}

function graficarMatrizHTML() {
    var div = document.getElementById("tablaMatriz");
    div.innerHTML = ""
    
    var tabla = document.createElement("table");
    tabla.setAttribute("class", "table")
    tabla.setAttribute("border", "2");
    var tblBody = document.createElement("tbody");

    for (let i = 0; i < matriz.fila; i++) {
        var matrizFilas = document.createElement("tr");
        for (let j = 0; j < matriz.columna; j++) {
            var celda = document.createElement("td");
            var valorCelda;
            valorCelda = document.createTextNode(array[i][j].toString())
            celda.appendChild(valorCelda);
            celda.setAttribute("style", "border: black 1px solid; text-align: center;");
            matrizFilas.appendChild(celda);
            matrizFilas.setAttribute("style", "border: black 1px solid;");
        }
        tblBody.appendChild(matrizFilas);
    }
    tabla.appendChild(tblBody);
    div.appendChild(tabla);
    tabla.setAttribute("border", "2");
}

function read(){
    var fileInput = document.querySelector('input[type="file"]');
    
    var file = fileInput.files.item(0);
    var reader = new FileReader();

    reader.readAsText(file);
    
    reader.onload = function() {
        var obj = JSON.parse(reader.result)
        slider.value = obj.animacion
        let val = obj.valores
         //crear objeto matriz y ta;anio
        let tamanio = obj.m
        slider.value = obj.animacion
        filas = tamanio[0]
        columna = tamanio[1]
        
        // creando matriz
        if(matriz == null){
            matriz = new Matriz(filas, columna)
            graficarMatrizHTML()
        }

        // insertando elementos en la matriz
        let contenido = ""
        let conteo=1
        for (let i=0; i<val.length; i++){
            setTimeout(function (params) {
                let posicionX = val[i].indices[0]
                let posicionY = val[i].indices[1]
                let valor = val[i].valor
                // array[posicionX][posicionY] = valor
                matriz.agregar(posicionX, posicionY, valor)
                graficarMatrizHTML()
            },(500)*(11- slider.value)*conteo)
            conteo++
        }        
    }   
}


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
}