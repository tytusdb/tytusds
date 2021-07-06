// Direccionamiento abierto - HASH ABIERTO
var arrayNodes = []
var edges = []
var network = null
var dataDownload = []
var arrayAB = ['A','a','B','b','C','c','D','d',
                'E','e','F','f','G','g','H','g','I','j','J',
                'K','k','L','l','M','N','OP','Q','R','s','t',
                'u','S','T','U','V','v','W','w','X','x','Y',
                "A1", "A2","A3", "A4","A5","A6","A7","A8","A9",
                'z','Z','AA','BB','CC','DD','EE', "FF", "GG", "HH","op","o",[]]
var selected = null
var slider = document.getElementById("customRange2")

// la clase es la que vamos a guardar en el array principal
class Nodo{
    constructor(indice){
        this.indice = indice
        this.lista = [] // lista de llaves
    }
}

// esta clase va a ser el tipo que guarde la lista secundaria
class Key{
    constructor(clave, valor){
        this.clave = clave
        this.valor = valor
    }
}

class TablaHash{
    constructor(size){
        this.vector = [] //este es el array principal
        this.elementos = 0 //numero de elementos insertados en la tabla
        this.size = size // tamaño de la tabla m
        //llenado de tabla con valores nulos.
        this.cte = 0.1625277911
        this.minimo = 50
        this.maximo = 60
        this.funcion = ""
        for(let i=0 ; i<size; i++){
            this.vector.push(null) 
        }
    }
    
    functionSimple(id) {
        while ((id > 1) || (id == 0)){
            id = id/10
        }
        let posicion = Math.floor(id * this.size-1)
        if (posicion > this.size){
            return posicion - this.size
            
        }else{
            return posicion
        }
    }

    functionMultiplicacion(id){
        let posicion = 0
        posicion = Math.floor((this.size) * (id * this.cte % 1))
        console.log(posicion)
        if (posicion > this.size-1){
            return posicion - this.size-1
        }else{
            return posicion
        }
    }

    functionDivision(id){
        // indica la posicion en donde estara posicionado en el array
        let posicion = id % (this.size - 1)
        console.log(posicion)
        if (posicion > this.size){
            return posicion - this.size
        }else{
            return posicion
        }
        
    }

    insertar(id, funcHash){
        if (typeof id === "string"){
            let posicion = 0
            switch(funcHash){
                case "simple":
                    posicion = this.functionSimple(this.toAscii(id))
                    break
                case "division":
                    posicion = this.functionDivision(this.toAscii(id))
                    break
                case "multiplicacion":
                    posicion = this.functionMultiplicacion(this.toAscii(id))
                    break
            }
            // si es diferente a null, ya hay valores en esa posicion y toca aplicar prueba
            if (this.vector[posicion] != null){
                //genera una nueva llave
                let nuevo = new Key(id, id)
                //insertar en la lista secundaria con la posicion en la lista principal 
                this.vector[posicion].lista.push(nuevo)
                // console.log("posicion usada: " + posicion)
                console.log("El factor de carga es: " + this.factorCarga)
                console.log("El maximo es: " + this.maximo)
            }else{
                let nodo = new Nodo(posicion)
                // console.log("nueva posicion: " + posicion)
                nodo.lista.push(new Key(id, id))
                this.vector[posicion] = nodo
                this.elementos++
                this.factorCarga = (this.elementos / this.size)*100
                console.log("El factor de carga es: " + this.factorCarga)
                console.log("El maximo es: " + this.maximo)
            }
            if(this.factorCarga > this.maximo){
                this.rehashing()
            }
        }else {
            let posicion = 0

            switch(funcHash){
                case "simple":
                    posicion = this.functionSimple(id)
                    break
                case "division":
                    posicion = this.functionDivision(id)
                    break
                case "multiplicacion":
                    posicion = this.functionMultiplicacion(id)
                    break
            }

            if (this.vector[posicion] != null){
                let nuevo = new Key(id, id)
                this.vector[posicion].lista.push(nuevo)
            }else{
                let nodo = new Nodo(posicion)
                nodo.lista.push(new Key(id, id))
                this.vector[posicion] = nodo
                this.elementos++
                this.factorCarga = (this.elementos / this.size)*100
                console.log("El factor de carga es: " + this.factorCarga)
                console.log("El maximo es: " + this.maximo)
            }
            if(this.factorCarga > this.maximo){
                this.rehashing()
            }
        }
    }

    // se ejecuta cuando el porcentaje de utilizacion supera nuestro porcentaje aceptado
    rehashing(){
        let siguiente = this.size
        let factor= 0
        while(factor <= this.minimo){
            siguiente++
            factor = (this.elementos / siguiente)*100
            console.log("factor: " + factor)
        }
        
        let vectorTemp = []
        this.elementos =0
        for(let i=0; i<siguiente; i++){
            vectorTemp.push(null)
        }

        let auxVector = this.vector
        this.vector = vectorTemp
        this.size = siguiente

        auxVector.forEach(nodo =>{
            if(nodo != null){
                for(let i=0; i<nodo.lista.length; i++){
                    this.insertar(nodo.lista[i].clave, "division")
                }
            }
        })
        actualizarTablero()

    }
    // this.vector[p].lista[p].clave
    
    buscar(clave1, funcHash){
        if (typeof clave1 === "string"){
            let posicion = 0;
            let pr;
            let encontrado = false
           

            switch(funcHash){
                case "simple":
                    posicion = this.functionSimple(this.toAscii(clave1))
                    break
                case "division":
                    posicion = this.functionDivision(this.toAscii(clave1))
                    break
                case "multiplicacion":
                    posicion = this.functionMultiplicacion(this.toAscii(clave1))
                    break
            }
            pr = this.vector[posicion]
            // console.log(pr.)
            if(pr != null){
                let valor = pr.lista.find(key => key.clave === clave1)
                if(valor == undefined){
                    return null
                }else{
                    alert("Encontrado!! La clave es: " + valor.clave + " en el indice: " +  pr.indice)
                }
            }else {
                return null
            }
        } else {
            let posicion = 0;
            let pr;
            let encontrado = false
            switch(funcHash){
                case "simple":
                    posicion = this.functionSimple((clave1))
                    break
                case "division":
                    posicion = this.functionDivision((clave1))
                    break
                case "multiplicacion":
                    posicion = this.functionMultiplicacion((clave1))
                    break
            }
            pr = this.vector[posicion]
            // console.log(pr.)
            if(pr != null){
                let valor = pr.lista.find(key => key.clave === clave1)
                if(valor == undefined){
                    return null
                }else{
                    alert("Encontrado!! La clave es: " + valor.clave + " en el indice: " +  pr.indice)
                }
            }else {
                return null
            }
        }
    }
    
    eliminar(clave1, funcHash){
        if (typeof clave1 === "string"){
            let posicion = 0;
            let pr;
            let encontrado = false
            switch(funcHash){
                case "simple":
                    posicion = this.functionSimple(this.toAscii(clave1))
                    break
                case "division":
                    posicion = this.functionDivision(this.toAscii(clave1))
                    break
                case "multiplicacion":
                    posicion = this.functionMultiplicacion(this.toAscii(clave1))
                    break
            }
            // posicion = this.functionDivision(this.toAscii(clave1))
            pr = this.vector[posicion]
            // console.log(pr.)
            if(pr != null){
                pr.lista = pr.lista.filter(function(key) {
                    return key.clave !== clave1; 
                });
            }else {
                return null
            }
        } else {
            let posicion = 0;
            let pr;
            switch(funcHash){
                case "simple":
                    posicion = this.functionSimple(clave1)
                    break
                case "division":
                    posicion = this.functionDivision(clave1)
                    break
                case "multiplicacion":
                    posicion = this.functionMultiplicacion(clave1)
                    break
            }
            pr = this.vector[posicion]
            if(pr != null){
                pr.lista = pr.lista.filter(function(key) {
                    return key.clave !== clave1; 
                });
            }else {
                return null
            }
        }
    }
    
    modificar(claveVieja, claveNueva, funcHash){
        if (typeof claveVieja === "string"){
            let posicion = 0;
            let pr;
            let encontrado = false
            let tipo = funcHash
            switch(funcHash){
                case "simple":
                    posicion = this.functionSimple(this.toAscii(claveVieja))
                    break
                case "division":
                    posicion = this.functionDivision(this.toAscii(claveVieja))
                    break
                case "multiplicacion":
                    posicion = this.functionMultiplicacion(this.toAscii(claveVieja))
                    break
            }
            pr = this.vector[posicion]
            if(pr != null){
                pr.lista = pr.lista.filter(function(key) {
                    return key.clave !== claveVieja; 
                });
                this.insertar(claveNueva, tipo)
            }else {
                return null
            }
        } else {
            let posicion = 0;
            let pr;
            let encontrado = false
            let tipo = funcHash
            switch(funcHash){
                case "simple":
                    posicion = this.functionSimple(claveVieja)
                    break
                case "division":
                    posicion = this.functionDivision(claveVieja)
                    break
                case "multiplicacion":
                    posicion = this.functionMultiplicacion(claveVieja)
                    break
            }
            pr = this.vector[posicion]
            if(pr != null){
                pr.lista = pr.lista.filter(function(key) {
                    return key.clave !== claveVieja; 
                });
                this.insertar(claveNueva, tipo)
            }else {
                return null
            }
        }
    }
    

    toAscii(cadena){
        let result = 0
        for(let i=0; i<cadena.length; i++){
            result += cadena.charCodeAt(i)
        }
        return result
    }

    print(){
        dataDownload = []
        let valor = ""
        let id = 0
        let id1 = 10000
        this.vector.forEach(nodo =>{
            if(nodo != null){
                valor = ""
                arrayNodes.push({id: id, label: id.toString(), level: id, shape: "box"})
                
                nodo.lista.forEach(key =>{
                    valor += "|*" + key.clave + "," + key.valor
                    arrayNodes.push({id: id + id1, label: key.clave.toString() + "," + key.valor.toString(), level: id, shape: "box"})
                    edges.push({from: id, to: id + id1, level: id, shape: "box", arrows: "to"})
                    id1++
                });
                console.log("indice: " + nodo.indice, "valores: " +valor)
                dataDownload.push({
                    "indice": nodo.indice,
                    "valores": valor
                })  
            }else{
                console.log("indice:" + "/")
                arrayNodes.push({id: id, label: "/", level: id, shape: "box"})
                dataDownload.push({
                    "indice": "vacio",
                })     
            }
            id++
            edges.push({from: id-1, to: id, shape: "box", arrows: "to"})
        })
    }

}



var tablaHash = null

function actualizarTablero(){
    
    tablaHash.print()
    var nodes = new vis.DataSet(arrayNodes);
    var container = document.getElementById("mynetwork");
    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = { 
        physics: false,
        layout:{
            hierarchical: {
                direction: "UD",
                sortMethod: "directed",
                nodeSpacing: 200,
                treeSpacing: 400
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
            console.log(clickedNodoValue)
            document.getElementById("valueNodo").value = clickedNodoValue;
        }
    });
    arrayNodes = []
    edges = []  
}

function descargar(){
    let arrayDescargado ={
        categoria: "Estructura No lineal",
        nombre: "Tabla Hash Abierta",
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
        a.download = "dataTablaHashAbierta.json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}


function crearTabla(){
    var tamanio = document.getElementById('tamanio').value
    if (tablaHash == null){
        tablaHash = new TablaHash(tamanio)
        actualizarTablero()
    }else{
        alert("La tabla ya existe")
    }
    document.getElementById("tamanio").value = ""  
}



function read(){
    var fileInput = document.querySelector('input[type="file"]');

    var file = fileInput.files.item(0);
    var reader = new FileReader();

    reader.readAsText(file);
    
    reader.onload = function() {
        var obj = JSON.parse(reader.result)
        
        if (tablaHash == null){
            tablaHash = new TablaHash(obj.m)
        }
        tablaHash.minimo = obj.minimo
        tablaHash.maximo = obj.maximo
        slider.value = obj.animacion
        let selected1 = obj.funcion
        tablaHash.funcion = selected1
        let val = obj.valores
        let contador = 0
        for(let i=0; i<val.length; i++){
            setTimeout(function(){
                tablaHash.insertar(val[i], selected1)
                actualizarTablero()
            }, (500)*(11- slider.value)*contador)
        }  
    
        
        
    }
}


var select = document.getElementById('funcHash');

function insertarNodo(){
    var valueNodo = document.getElementById('valueNodo').value
    selected = select.options[select.selectedIndex].value;
    console.log(selected)
    tablaHash.insertar(valueNodo, selected)
    document.getElementById('valueNodo').value = ""
    actualizarTablero()
}

function eliminarNodo() {
    let aux = clickedNodoValue.split(',')
    let clave = aux[0]
    selected = select.options[select.selectedIndex].value;
    if (tablaHash.funcion == ""){
        tablaHash.eliminar(clave, selected)
    }else{
        tablaHash.eliminar(clave, tablaHash.funcion)
    }
    
    document.getElementById('valueNodo').value = ""
    actualizarTablero()
}

function modificarNodo(){
    let aux = clickedNodoValue.split(',')
    var valueNodo = document.getElementById('valueNodo').value
    let clave = aux[0]
    selected = select.options[select.selectedIndex].value;
    console.log(clave)

    if(tablaHash.funcion == ""){
        tablaHash.modificar(clave, valueNodo, selected)
    }else{
        tablaHash.modificar(clave, valueNodo, tablaHash.funcion)
    }
   
    document.getElementById('valueNodo').value = ""
    actualizarTablero()
   
}

function searchNode(){
    var valueNodo = document.getElementById('valueNodo').value
    selected = select.options[select.selectedIndex].value;
    if(tablaHash.funcion == ""){
        tablaHash.buscar(valueNodo, selected)
    }else{
        tablaHash.buscar(valueNodo, tablaHash.funcion)
    }

}


