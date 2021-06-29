// Direccionamiento abierto - HASH ABIERTO
var arrayNodes = []
var edges = []
var network = null
var dataDownload = []
var arrayAB = ['A','a','B','b','C','c','D','d',
                        'E','e','F','f','G','g','H','g','I','j','J',
                        'K','k','L','l','M','N','OP','Q','R','s','t',
                        'u','S','T','U','V','v','W','w','X','x','Y',
                        'z','Z','AA','BB','CC','DD','EE']

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
        for(let i=0 ; i<size; i++){
            this.vector.push(null) 
        }
    }
    
    functionSimple() {
        let constante = Math.random()
        let posicion = Math.floor(constante * this.size-1) 
        if (posicion > this.size){
            return posicion - this.size
        }else{
            return posicion
        }
    }

    functionMultiplicacion(){

    }

    functionDivision(id){
        // indica la posicion en donde estara posicionado en el array
        let posicion = id % (this.size - 1)
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
                    break
                case "division":
                    posicion = this.functionDivision(this.toAscii(id))
                    break
                case "multiplicacion":
                    break
            }
            // si es diferente a null, ya hay valores en esa posicion y toca aplicar prueba
            if (this.vector[posicion] != null){
                //genera una nueva llave
                let nuevo = new Key(id, id)
                //insertar en la lista secundaria con la posicion en la lista principal 
                this.vector[posicion].lista.push(nuevo)
                // console.log("posicion usada: " + posicion)
            }else{
                let nodo = new Nodo(posicion)
                // console.log("nueva posicion: " + posicion)
                nodo.lista.push(new Key(id, id))
                this.vector[posicion] = nodo
                this.elementos++
                this.factorCarga = this.elementos / this.size
                // console.log("El factor de carga es: " + this.factorCarga)
            }
            if(this.factorCarga > this.maximo){
                this.rehashing()
            }
        }else {
            let posicion = this.functionDivision(id)
            if (this.vector[posicion] != null){
                let nuevo = new Key(id, id)
                this.vector[posicion].lista.push(nuevo)
            }else{
                let nodo = new Nodo(posicion)
                nodo.lista.push(new Key(id, id))
                this.vector[posicion] = nodo
                this.elementos++
                this.factorCarga = this.elementos / this.size
            }
            if(this.factorCarga > this.maximo){
                this.rehashing()
            }
        }
    }

    // se ejecuta cuando el porcentaje de utilizacion supera nuestro porcentaje aceptado
    rehashing(){
        let siguiente = this.size
        //factor que se obtiene al evaluar nuestros elementos con el siguiente tamanio
        let factor = 0.0
        while(factor <= this.minimo){
            siguiente++
            factor = this.elementos / siguiente
        }

        // crea nuevamente la nueva tabla reacomodando los valores
        let vectorTemp = []
        this.elementos = 0 
        for(let i=0; i<siguiente; i++){
            vectorTemp.push(null)
        }

        let vectorAux = this.vector
        this.vector = vectorTemp
        this.size = siguiente
        
        console.log("Nuevo tamano", siguiente, "Tamano:", vectorTemp.length)
        vectorAux.forEach(nodo =>{
            if(nodo != null){
                nodo.lista.forEach(key=>{
                    this.insertar(this.toAscii(key.clave), key.clave, key.valor)
                })

            }
        })
         

    }
    // this.vector[p].lista[p].clave
    
    buscar(clave1){
        if (typeof clave1 === "string"){
            let posicion = 0;
            let pr;
            let encontrado = false
            posicion = this.functionDivision(this.toAscii(clave1))
            pr = this.vector[posicion]
            // console.log(pr.)
            if(pr != null){
                let valor = pr.lista.find(key => key.clave === clave1)
                if(valor == undefined){
                    return null
                }else{
                    return valor.clave
                }
            }else {
                return null
            }
        } else {
            let posicion = 0;
            let pr;
            let encontrado = false
            posicion = this.functionDivision(clave1)
            pr = this.vector[posicion]
            // console.log(pr.)
            if(pr != null){
                let valor = pr.lista.find(key => key.clave === clave1)
                if(valor == undefined){
                    return null
                }else{
                    return valor.clave
                }
            }else {
                return null
            }
        }
    }
    
    eliminar(clave1){
        if (typeof clave1 === "string"){
            let posicion = 0;
            let pr;
            let encontrado = false
            posicion = this.functionDivision(this.toAscii(clave1))
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
            console.log("demoxd")
        }
    }
    
    modificar(claveVieja, claveNueva){
        if (typeof claveVieja === "string"){
            let posicion = 0;
            let pr;
            let encontrado = false
            posicion = this.functionDivision(this.toAscii(claveVieja))
            pr = this.vector[posicion]
            // console.log(pr.)
            if(pr != null){
                    // tenes que eliminar y luego volver a agregar con el nuevo valor.
            }else {
                return null
            }
        } else {
            console.log("demoxd")
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
        let valor = ""
        let id = 0
        this.vector.forEach(nodo =>{
            if(nodo != null){
                valor = ""
                arrayNodes.push({id: id, label: id.toString(), level: id, shape: "box"})
                let id1 = 0
                nodo.lista.forEach(key =>{
                    valor += "|*" + key.clave + "," + key.valor
                    arrayNodes.push({id: id + arrayAB[id1], label: key.clave + "," + key.valor, level: id, shape: "box"})
                    edges.push({from: id, to: id + arrayAB[id1], level: id, shape: "box", arrows: "to"})
                    id1++
                });
                console.log("indice: " + nodo.indice, "valores: " +valor)  
            }else{
                console.log("indice:" + "/")
                arrayNodes.push({id: id, label: "/", level: id, shape: "box"})    
            }
            id++
            edges.push({from: id-1, to: id, shape: "box", arrows: "to"})
        })
    }

}


// let tabla = new TablaHash(6, 1, 5)
// // tabla.insertar(1,1,"ocupado")
// // tabla.insertar(2,2,"colision")
// // tabla.insertar(2,2,"colision")
// // tabla.insertar(3,3,"colision")
// // tabla.insertar(4,4,"no hay colision")
// // tabla.insertar(10,10,"1")
// tabla.insertar("Carlos")
// tabla.insertar("Kevin")
// tabla.insertar("Andres")
// tabla.insertar("Prueba")
// tabla.insertar("Casa")
// tabla.print()
// console.log("")
// // El buscar ya sirve
// console.log("La clave es: " + tabla.buscar("Prueba"))

// // Eliminar 
// console.log("")
// tabla.eliminar("Andres")
// tabla.print()

// Modificar
// console.log("")
// tabla.modificar("Kevin","1000")
// tabla.print()

// tabla.insertar(tabla.toAscii("CASA"), "CASA", "inicial")
// tabla.insertar(tabla.toAscii("SACA"), "SACA", "Repetido")


var tablaHash = null

function crearTabla(){
    var tamanio = document.getElementById('tamanio').value
    // poner valores de maximo y minimo
    if (tablaHash == null){
        tablaHash = new TablaHash(tamanio)
        // tablaHash.insertar("Carlos", "division")
        // tablaHash.insertar("Kevin", "division")
        // tablaHash.insertar("Andres", "division")
        // tablaHash.insertar("Prueba", "division")
        // tablaHash.insertar("Casa", "division")
        actualizarTablero()
        
    }else{
        alert("La tabla ya existe")
    }
    document.getElementById("tamanio").value = ""  
}

function insertarNodo(){
    var valueNodo = document.getElementById('valueNodo').value
    var select = document.getElementById('funcHash');
    var selected = select.options[select.selectedIndex].value;
    console.log(selected)
    tablaHash.insertar(valueNodo, selected)
    document.getElementById('valueNodo').value = ""
    actualizarTablero()
}


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

