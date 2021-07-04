// TABLA HASH CERRADO - DIRECCIONAMIENTO ABIERTO.

var arrayNodes = []
var edges = []
var network = null
var clickedNode
var clickedNodoValue
var dataDownload = []


var selected = null
var selectedPrueba = null

class Nodo{
    constructor(indice, valor){
        this.indice = indice
        this.valor = valor
    }
}

class TablaCerrada{
    constructor(tamanio, minimo, maximo){
        this.tamanio = tamanio
        this.minimo = minimo
        this.maximo = maximo
        this.elementos =0
        this.cte = 0.1625277911
        this.funcHash = ""
        this.pruebaHash = ""
        this.factorCarga = 0
        this.tabla = []
        this.tabla = this.crearTabla()
    }

    crearTabla(){
        let tabla = []
        for (let i=0; i< this.tamanio; i++){
            tabla.push(-1)
        }
        return tabla
    }

    elegirFuncionString(k, params) {
        let posicion1
        switch(params){
            case "simple":
                posicion1 = this.functionSimple(this.toAscii(k))
                break
            case "division":
                posicion1 = this.division(this.toAscii(k))
                console.log(posicion1)
                break
            case "multiplicacion":
                posicion1 = this.functionMultiplicacion(this.toAscii(k))
                break
        }
        return posicion1
    }

    insertar(valor){
        if(typeof valor == "string"){
            let posicion1 = this.elegirFuncionString(valor, this.funcHash)
            console.log("Posicion: " + posicion1)
            if(this.tabla[posicion1] == -1){
                this.tabla[posicion1] = new Nodo(posicion1, valor)
            }else{
                let posicion = 0
                switch(this.pruebaHash){
                    case "lineal":
                        posicion = this.pruebalineal(this.toAscii(valor))
                        break
                    case "cuadratica":
                        posicion = this.cuadratica(this.toAscii(valor), 1)
                        break   
                    case "doublehash":
                        posicion = this.dobleHash(this.toAscii(valor))
                        break

                }
                this.tabla[posicion] = new Nodo(posicion, valor)
            }
            this.elementos++
            this.factorCarga = Math.round((this.elementos/this.tamanio)*100)
            if(this.factorCarga >= this.maximo){
                this.rehashing()
            }

        }else{
            //cuando son numeros
        }
    }


    rehashing(){
        console.log("entro al rehashing")
        
        while(this.factorCarga>this.minimo){
            this.tamanio++
            this.factorCarga = Math.round((this.elementos/this.tamanio)*100)
            
        }
        console.log("tamanio final: " + this.tamanio)
        
        let vectorTemp = []
        this.elementos =0
        for(let i=0; i<this.tamanio; i++){
            vectorTemp.push(-1)
        }

        let auxVector = this.tabla
        this.tabla = vectorTemp
        
        console.log(auxVector)
        console.log("nuevo tama;o: " + this.tabla.length)
        for(let i=0; i<auxVector.length; i++){
            if(auxVector[i] != -1){
                vectorTemp[i] = auxVector[i]
            }
        }
        this.tabla = vectorTemp
        for(let i=0; i<this.tabla.length;i++){
            if(this.tabla[i] != -1){
                this.elementos++
            }
        }
        console.log(this.tabla)
        
        actualizarTablero()
    }

  

    //PRUEBAS HASH
    pruebalineal(k){
        let item = ((k)%this.tamanio)
        console.log("la posicion linear: " + item)
        
        if(this.tabla[item] ==  -1){
            if (item > this.tamanio){
                console.log("la posicion final: " + item  - this.tamanio)
                return item - this.tamanio
            }else{
                console.log("la posicion final: " + item)
                return item
            }
        }else{
            this.pruebalineal(item+1)
        }
    }

    cuadratica(k, i){
        let item = ((k + i*i) % this.tamanio)
        if(this.tabla[item] == -1){
            if (item > this.tamanio){
                console.log("la posicion final: " + item  - this.tamanio)
                return item - this.tamanio
            }else{
                console.log("la posicion final: " + item)
                return item
            }
        }else{
            this.cuadratica(k, i+1)
        }
    }

    hash1(key){
        return (key % this.tamanio)
    }

    hash2(key){
        return ((1+key) % (this.tamanio-2))
    }


    dobleHash(k){
        let item = ((this.hash2(k) + this.hash1(k)) % this.tamanio)
        if(this.tabla[item] == -1){
            if (item > this.tamanio){
                console.log("la posicion con dobleHash: " + item  - this.tamanio)
                return item - this.tamanio
            }else{
                console.log("la posicion con dobleHash " + item)
                return item
            }
        }else{
            this.dobleHash(k)
        }
        
    }
   

    //FUNCIONES HASH
    division(k){
        let nuevaPosicion = (k%(this.tamanio))
        return nuevaPosicion
    }

    functionSimple(id) {
        while (id > 1){
            id = id/10
        }
        let posicion = Math.floor(id * this.tamanio-1)
        console.log("la posicion simple: " +posicion)
        if (posicion > this.tamanio){
            return posicion - this.tamanio
            
        }else{
            return posicion
        }
    }

    functionMultiplicacion(id){
        let posicion = 0
        posicion = Math.floor((this.tamanio) * (id * this.cte % 1))
        console.log(posicion)
        if (posicion > this.tamanio-1){
            return posicion - this.tamanio-1
        }else{
            return posicion
        }
    }

    toAscii(cadena){
        let result = 0
        for(let i=0; i<cadena.length; i++){
            result += cadena.charCodeAt(i)
        }
        return result
    }

    eliminar(valor){
        for(let i=0; i<this.tabla.length; i++){
            if(this.tabla[i] != -1){
                if(this.tabla[i].valor == valor){
                    console.log("si entro!")
                    this.tabla[i] = -1
                    this.elementos--
                }
            }
        }
    }

    modificar(valorViejo, valorNuevo){
        for(let i=0; i<this.tabla.length; i++){
            if(this.tabla[i] != -1){
                if(this.tabla[i].valor == valorViejo){
                    console.log("si entro!")
                    this.tabla[i] = -1
                    this.elementos--
                }
            }
        }
        this.insertar(valorNuevo)
    }


    buscar(valor){
        let encontrado = false
        for(let i=0; i<this.tabla.length; i++){
            if(this.tabla[i] != -1){
                if(this.tabla[i].valor == valor){
                    encontrado = true
                    alert("Encontrado!! el valor es: " + valor + " en el indice: " +  this.tabla[i].indice)
                }
            }
        }

        if(encontrado == false){
            alert("El valor no se encuentra en la tabla hash.")
        }
    }


    print1(){
        let contante = 10000
        dataDownload = []
        for (let i=0; i<this.tabla.length; i++){
            if(this.tabla[i] != -1){
                arrayNodes.push({id: i, label: i.toString(), level: i, shape: "box"})
                arrayNodes.push({id: i+contante, label: this.tabla[i].valor.toString(), level: i, shape: "box"})
                edges.push({from: i, to: i+contante, shape: "box", arrows: "to"})
                console.log("indice: "  + i  +  ", valor: " + this.tabla[i].valor.toString())
                dataDownload.push({
                    "indice": this.tabla[i].indice.toString(),
                    "valores": this.tabla[i].valor.toString()
                })  
            }else{
                arrayNodes.push({id: i, label: "/", level: i, shape: "box"})
                console.log("indice: "  + "/"  +  ", valor: " + "-1")
                dataDownload.push({
                    "indice": "vacio",
                })
            }
    
            if(i >= 1){
                edges.push({from: i-1, to: i, shape: "box", arrows: "to"})
            }
        }
        console.log("porcentaje: " + ((this.elementos*100)/this.tamanio) + "%")
    }

} 

let tableclose = null

function initTabla(){
    var tamanio = document.getElementById('tamanio').value
    var minimo = document.getElementById('minimo').value
    var maximo = document.getElementById('maximo').value

    tableclose = new TablaCerrada(tamanio, minimo, maximo)
    actualizarTablero()
    document.getElementById('tamanio').value = ""
    document.getElementById('minimo').value = ""
    document.getElementById('maximo').value = ""
}

function insertarNodo(){
    var select = document.getElementById('funcHash');
    selected = select.value


    var select1 = document.getElementById('pruebaHash');
    selectedPrueba = select1.value

    var valueNodo = document.getElementById('valueNodo').value
    tableclose.funcHash = selected
    tableclose.pruebaHash = selectedPrueba
    tableclose.insertar(valueNodo)
    actualizarTablero()
    document.getElementById('valueNodo').value = ""
}

function eliminarNodo(){
    tableclose.eliminar(clickedNodoValue)
    actualizarTablero()
}

function searchNode(){
    var valueNodo = document.getElementById('valueNodo').value
    tableclose.buscar(valueNodo)
    document.getElementById('valueNodo').value = ""
}

function modificarNodo() {
    var valueNodo = document.getElementById('valueNodo').value
    tableclose.modificar(clickedNodoValue, valueNodo)
    document.getElementById('valueNodo').value = ""
    actualizarTablero()
}

function descargar(){
    let arrayDescargado ={
        categoria: "Estructura No lineal",
        nombre: "Tabla Hash Cerrado",
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
        a.download = "dataTablaHashCerrado.json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

function actualizarTablero(){
    tableclose.print1()
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










class hash {
    hash(m, min,max) {
     // / m, seria el tamaño de la tabla 
      this.m = m;
      this.min = min;
      this.max = max;
      this.arreglo = []
      this.cte = 0.1625277911
      this.n = 0
      this.init()
    }

    init(){
        this.areglo = [this.m] 
        for(var i=0; i<this.m; i++){
            this.areglo[i] = -1;
        }
    }

    insertar(k, opcionFuncion, opcionPrueba){
        if(typeof k === "string"){
            console.log(opcionFuncion)
            console.log(opcionPrueba)
            let i = this.elegirFuncionString(k, opcionFuncion);
            let iter =0
            while(this.areglo[i] != -1){
                if (opcionPrueba == "lineal"){
                    i = this.linear(i)
                }else if (opcionPrueba == "cuadratica"){
                    i = this.cuadratica(i, iter)
                    iter++
                    if (iter > this.m){
                        break
                    }
                }else if(opcionPrueba == "doublehash"){
                    i = this.dobleHash(i)
                }else {
                    break
                }
            }
            this.areglo[i] = k
            // -> numero de elementos ingresados en la tabla actual
            this.n++;
            this.rehashing()
        }else{
            let i = this.elegirFuncionEnteros(k, opcionFuncion);
            let iter =0
            while(this.areglo[i] != -1){
                if (opcionPrueba == "lineal"){
                    i = this.linear(i)
                }else if (opcionPrueba == "cuadratica"){
                    i = this.cuadratica(i, iter)
                    iter++
                    if (iter > this.m){
                        break
                    }
                }else if(opcionPrueba == "doublehash"){
                    i = this.dobleHash(i)
                }else {
                    break
                }
            }
            this.areglo[i] = k
            this.n++;
            this.rehashing()
        }
        
        
    }
    rehashing(){
        console.log(this.areglo)
        // n es el numero de elementos ingresados en la tabla actual
        // m es el tamaño de la lista
        if((this.n*100/this.m)>=this.max){
            var temp = this.areglo
            var mprev = this.m
            this.m = Math.ceil(this.n*100/this.min)
            this.init()
            this.n = 0
            // console.log(this.n)
            // console.log(this.areglo)
            for(var i=0; i<mprev; i++){
                if(temp[i]!=-1){
                    this.insertar(temp[i])
                }
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
        console.log("[")
        for(let i=0; i<this.m; i++){
            console.log(" " + this.areglo[i])
        }
        console.log("]" + (this.n*100)/this.m) + "%"
    }


    eliminar(valor){
        for(let i=0; i<this.areglo.length; i++){
            if(this.areglo[i] != -1){
                if(this.areglo[i] == valor){
                    this.areglo[i] == valor
                    this.n--
                }
            }
        }
        
    }

    modificar(valor, valornuevo){
        for(let i=0; i<this.areglo.length; i++){
            if(this.areglo[i] != -1){
                if(this.areglo[i] == valor){
                    this.areglo.splice(i, -1)
                }
            }
        }
        this.insertar(valornuevo)
    }

    print1(){
        let contante = 10000
        dataDownload = []
        for (let i=0; i<this.areglo.length; i++){
            if(this.areglo[i] != -1){
                arrayNodes.push({id: i, label: i.toString(), level: i, shape: "box"})
                arrayNodes.push({id: i+contante, label: this.areglo[i].toString(), level: i, shape: "box"})
                edges.push({from: i, to: i+contante, shape: "box", arrows: "to"})
                console.log("indice: "  + i  +  ", valor: " + this.areglo[i])
            }else{
                arrayNodes.push({id: i, label: "/", level: i, shape: "box"})
                console.log("indice: "  + "/"  +  ", valor: " + "-1")
            }
    
            if(i >= 1){
                edges.push({from: i-1, to: i, shape: "box", arrows: "to"})
            }
        }
        console.log("porcentaje: " + ((this.n*100)/this.m) + "%")
    }


    division(k){
        return (k%(this.m))
    }

    functionSimple(id) {
        while ((id > 1) || (id == 0)){
            id = id/10
        }
        let posicion = Math.floor(id * this.m-1)
        if (posicion > this.m){
            return posicion - this.m
            
        }else{
            return posicion
        }
    }

    functionMultiplicacion(id){
        let posicion = 0
        posicion = Math.floor((this.m) * (id * this.cte % 1))
        console.log(posicion)
        if (posicion > this.m-1){
            return posicion - this.m-1
        }else{
            return posicion
        }
    }

    linear(k){
        let item = ((k+1)%this.m)
        console.log("la posicion linear: " + item)
        return item
    }

    cuadratica(k,i){
        let item = ((k + i*i) % this.m)
        console.log("la posicion cuadratica: " + item)
        return item
    }

    hash1(key){
        return (key % this.m)
    }

    hash2(key){
        return ((1+key) % (this.m-2))
    }


    dobleHash(k){
        let item = ((this.hash2(k) + this.hash1(k)) % this.m)
        console.log("la posicion con doble hash: " + item)
        return item
    }

    elegirFuncionString(k, params) {
        let posicion = 0
        switch(params){
            case "simple":
                posicion = this.functionSimple(this.toAscii(k))
                break
            case "division":
                posicion = this.division(this.toAscii(k))
                break
            case "multiplicacion":
                posicion = this.functionMultiplicacion(this.toAscii(k))
                break
        }
    
        return posicion
    }
    
    elegirFuncionEnteros(k,params){
        let posicion = 0
        switch(params){
            case "simple":
                posicion = this.functionSimple(k)
                break
            case "division":
                posicion = this.division(k)
                break
            case "multiplicacion":
                posicion = this.functionMultiplicacion(k)
                break
        }
    
        return posicion
    }

}

