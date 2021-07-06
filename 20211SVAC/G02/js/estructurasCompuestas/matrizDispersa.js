// NODO MATRIZ DISPERSA
var contador = 1
var clickedNode
var clickedNodoValue
var network = null
var arrayNodes = []
var edges = []
var slider = document.getElementById("customRange2")
class Nodo{
    constructor(fila, columna, valor, id){
        this.id = id
        this.fila = fila
        this.columna = columna
        this.valor = valor
        this.derecha = null
        this.izquierda = null
        this.arriba = null
        this.abajo = null
    }
}

// NODO DE LISTADOBLEMENTE ENLAZADA
class nodoEncabezado{
    constructor(id, id2){
        this.id2 = id2
        this.id = id
        this.siguiente = null
        this.anterior = null
        this.accessoNodo = null
    }
}

// LISTA DOBLEMENTE ENLAZADA
class ListaEncabezado{
    constructor(primero = null){
        this.primero = primero
    }
    
    // AGREGA  NODO ORDENADO
    setEncabezado(nuevo){
        if (this.primero == null){
            this.primero = nuevo
        // el valor del nuevo nodo es menor al primero, se ingresa antes
        } else if (nuevo.id < this.primero.id){ 
            nuevo.siguiente = this.primero
            this.primero.anterior = nuevo
            this.primero = nuevo
        } else {
            let actual = this.primero
            
            while (actual.siguiente != null){
                if (nuevo.id < actual.siguiente.id){
                    nuevo.siguiente = actual.siguiente
                    actual.siguiente.anterior = nuevo
                    nuevo.anterior = actual
                    actual.siguiente = nuevo
                    break
                }
                actual = actual.siguiente
            }
            
            // al entrar aqui el valor es mayor al actual y se agregaria de ultimo
            if (actual.siguiente == null){
                actual.siguiente = nuevo
                nuevo.anterior = actual
            }
        }
    }
    
    // busqueda de nodo, recorriendo la lista.
    buscarEncabezado(id){
        let actual = this.primero
        
        while (actual != null){
            if (actual.id == id){
                return actual
            }
            actual = actual.siguiente
        }
        return null
    }
}

class MatrizDispersa{

    constructor(){
        this.efilas = new ListaEncabezado()
        this.ecolumnas = new ListaEncabezado()
    }
    
    agregar(fila, columna, valor){
        let nuevo = new Nodo(fila, columna, valor, contador++)
        let efila = this.efilas.buscarEncabezado(fila)
        
        if (efila == null){
            efila = new nodoEncabezado(fila, contador++)
            //accesoNodo va ser el nuevo nodo que queremos insertar en la matriz
            efila.accesoNodo = nuevo
            // el nodo ya se inserta en el encabezado de fila
            this.efilas.setEncabezado(efila)
        } else{
            // si el valor nuevo es menor al nodo siguiente para insertar en orden
            if (nuevo.columna < efila.accesoNodo.columna){
                // accesoNodo es el que esta insertado antes
                nuevo.derecha = efila.accesoNodo
                // accesoNodo.izquierda es el nuevo
                efila.accesoNodo.izquierda = nuevo
                efila.accesoNodo = nuevo
            }else{
                let actual = efila.accesoNodo
                while (actual.derecha != null){
                    if(nuevo.columna < actual.derecha.columna){
                        nuevo.derecha = actual.derecha
                        // validacion para ingresar en medio de dos nodos ya creados
                        actual.derecha.izquierda = nuevo
                        nuevo.izquierda = actual
                        actual.derecha = nuevo
                        break
                    }
                    actual = actual.derecha
                }
                
                if (actual.derecha = null){
                    actual.derecha = nuevo
                    nuevo.izquierda = actual
                }
           
            }
            
            
        }
        
        let eColumna = this.ecolumnas.buscarEncabezado(columna)
        if (eColumna == null){
            eColumna = new nodoEncabezado(columna, contador++)
            eColumna.accesoNodo = nuevo
            this.ecolumnas.setEncabezado(eColumna)
        }else{
            if(nuevo.fila < eColumna.accesoNodo.fila){
                try{
                    nuevo.abajo = eColumna.accesoNodo
                    eColumna.accessoNodo.arriba = nuevo
                    eColumna.accesoNodo = nuevo
                }catch{}
            } else {
                let actual = eColumna.accesoNodo
                while(actual.abajo != null){
                    if (nuevo.fila < actual.abajo.fila){
                        nuevo.abajo = actual.abajo
                        actual.abajo.arriba = nuevo
                        nuevo.arriba = actual
                        actual.abajo = nuevo
                        break
                    }
                    actual = actual.abajo
                }
                if (actual.abajo == null){
                    actual.abajo = nuevo
                    nuevo.arriba = actual
                }
            }
        }
    }
    
    recorrerFilas(){
        let efila = this.efilas.primero
        console.log("recorrido de filas")
        while (efila != null){
            let actual = efila.accesoNodo
            console.log("\nFila " + actual.fila)
            console.log("Columna    valor")
            while (actual != null){
                console.log(actual.columna + "            " + actual.valor)
                actual = actual.derecha
            
            }
            efila = efila.siguiente
        }
        console.log("****************************")
    }
    
    recorrerGraficar(){
        let ecolumna = this.ecolumnas.primero
        //console.log("recorrido por columnas")
        while (ecolumna != null){
            let actual = ecolumna.accesoNodo
            //console.log("\nColumna " + actual.columna)
            arrayNodes.push({id: ecolumna.id2, label: ecolumna.id2.toString(), shape: "box"})
            if(actual!= null){
                edges.push({from: ecolumna.id2, to: actual.id, shape: "box", arrows: "to"})
            }
            //console.log("Fila   valor")
            while (actual != null){
                arrayNodes.push({id: actual.id, label: actual.valor, shape: "box"})
                //console.log(actual.fila+ "       " + actual.valor)
                if(actual.abajo != null){
                    edges.push({from: actual.id, to: actual.abajo.id, shape: "box", arrows: "to"})
                    edges.push({from: actual.abajo.id, to: actual.id, shape: "box", arrows: "to"})
                }
                actual = actual.abajo
            }
            if(ecolumna.siguiente!= null){
                edges.push({from: ecolumna.id2, to: ecolumna.siguiente.id2, shape: "box", arrows: "to"})
            }
            ecolumna = ecolumna.siguiente
        }
        //console.log("************************")
    }

    recorrerColumnas(){
        let ecolumna = this.ecolumnas.primero
        console.log("recorrido por columnas")
        while (ecolumna != null){
            let actual = ecolumna.accesoNodo
            console.log("\nColumna " + actual.columna)
            console.log("Fila   valor")
            while (actual != null){
                console.log(actual.fila+ "       " + actual.valor)
                actual = actual.abajo
            }
            ecolumna = ecolumna.siguiente
        }
        console.log("************************")
    }


    graficar(){
        let ecolumna = this.ecolumnas.primero
        console.log("recorrido por columnas")
        arrayNodes.push({id: "centrar", label: "Central", level: 0, shape: "box"})
        let idFila=0
        let idColumna=0
        while (ecolumna != null){
            let actual = ecolumna.accesoNodo
            console.log("\nColumna " + actual.columna)
            arrayNodes.push({id: "C"+idColumna, label: actual.columna.toString(), level: 0, shape: "box"})
            edges.push({from: "centrar", to: "C"+idColumna, shape: "box", arrows: "to"})
            console.log("Fila   valor")
            while (actual != null){
                arrayNodes.push({id: "F"+idFila, label: actual.fila.toString(), level: idFila, shape: "box"})
                arrayNodes.push({id: idFila + "," + idColumna, label: actual.valor.toString(), level: idFila, shape: "box"})
                edges.push({from: "F"+idFila, to: idFila + "," + idColumna, shape: "box", arrows: "to"})
                edges.push({from: "C"+idColumna, to: idFila + "," + idColumna, shape: "box", arrows: "to"})
                console.log(actual.fila+ "       " + actual.valor)
                actual = actual.abajo
                idFila++
                if(idFila >1){
                    edges.push({from: "F"+idFila, to: "F"+idFila-1, shape: "box", arrows: "to"})
                }
            }
            idColumna++
            ecolumna = ecolumna.siguiente
        }
        console.log("************************")
    }

    
    devolverValor(fila, columna){
        let ecolumna = this.ecolumnas.primero
        let encontrado = false
        while (ecolumna != null){
            let actual = ecolumna.accesoNodo
            if(actual.columna == columna){
                while(actual != null){
                    if(actual.fila == fila){
                        encontrado = true
                        return actual.valor 
                    }
                    actual = actual.abajo
                }
            }
            ecolumna = ecolumna.siguiente
        }
        if(encontrado == false){
            return null
        }
    }
    
}

m = new MatrizDispersa()

function actualizarTablero(){
    m.graficar();
    var nodes = new vis.DataSet(arrayNodes);
    var container = document.getElementById("mynetwork");
    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = { 
        physics: {
            solver: "barnesHut"
            ,barnesHut: {
                avoidOverlap: 1
            }
        },
        layout: {
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
            clickedNodoValue =  this.body.nodes[nodeID]
            clickedNodoValue = clickedNodoValue.options.label
            document.getElementById("valueNodo").value = clickedNodoValue;
        }
    });
    arrayNodes = []
    edges = []  
}

function add(){
    valor = document.getElementById("valor").value
    x = document.getElementById("columna").value
    y = document.getElementById("fila").value
    m.agregar( x, y, valor)
    document.getElementById("valor").value = ""
    document.getElementById("columna").value = ""
    document.getElementById("fila").value = ""
    actualizarTablero()
}


function read(){
    var fileInput = document.querySelector('input[type="file"]');

    var file = fileInput.files.item(0);
    var reader = new FileReader();

    reader.readAsText(file);
    
    reader.onload = function() {
        var obj = JSON.parse(reader.result)
        let val = obj.valores
        slider.value = obj.animacion
        
        let contador =0

        for(let i=0; i<val.length; i++){
            contador = contador + 0.5
            setTimeout(function (params) {
                console.log(val[i].valor)
                m.agregar(val[i].indices[0], val[i].indices[1], val[i].valor)
                actualizarTablero()
            },(1000)*Math.round(11-parseInt(slider.value))*contador) 
        }
    }
    m.recorrerColumnas()
}

/*function descargar(){
    arbolbb.enPreOrden(arbolbb.raiz)
    let array = {
        categoria: "Estructura Arboreas",
        nombre: "ABB/AVL",
        repeticion: switchToggle.checked,
        animacion: parseInt(slider.value),
        valores: arregloaux
    }
    arregloaux = []
    var json = JSON.stringify(array, null, "\t");
    json = [json];
    var blob1 = new Blob(json, { type: "text/json;charset=utf-8" });
    var isIE = false || !!document.documentMode;
    if (isIE) {
        window.navigator.msSaveBlob(blob1, "data.json");
    } else {
        var url = window.URL || window.webkitURL;
        link = url.createObjectURL(blob1);
        var a = document.createElement("a");
        a.download = "dataArbolBinarioDeBusqueda.json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}*/
