//  C  O  D  I  G  O

//  C  L  A  S  E  S

class Grafo{
    constructor(dirigido, ponderado){
        this.dirigido = dirigido;
        this.ponderado = ponderado;
        this.vertices = [];
        this.matrizAdy = [];
    }
    agregarV(vertex){
        if (!this.verificar(vertex)){
            this.vertices.push(new Vertice(vertex, this.vertices.length))
            for (let i = 0; i < this.vertices.length; i++){
                if(this.matrizAdy[i] == undefined){
                    this.matrizAdy[i] = [];
                }
                for (let j = 0; j < this.vertices.length; j++){
                    if(this.matrizAdy[i][j] == undefined){
                        this.matrizAdy[i][j] = 0;
                    }
                }

            }

        } else { // pendiente de mostar algo
            console.log("El nodo ya existe")
        }
    }
    agregarA(inicio, final, distancia){
        var vertex1 = this.indiceV(inicio);
        var vertex2 = this.indiceV(final);
        if (vertex1 != -1 && vertex2 != -1 ){
            if (this.matrizAdy[vertex1][vertex2] == 0){
                if (distancia == undefined || distancia == 0){
                    this.matrizAdy[vertex1][vertex2] = 1; // *
                } else {
                    this.matrizAdy[vertex1][vertex2] = distancia;
                }
                
            }
        } else { // si no existen los vertices se crearan
            if (vertex1 == -1 && vertex2 == -1){
                this.agregarV(inicio);
                this.agregarV(final);
            } else if (vertex1 == -1 && vertex2 != -1){
                this.agregarV(inicio);
            } else {
                this.agregarV(final);
            }
            this.agregarA(inicio, final, distancia);
        }
    }
    eliminarV(vertex){
        var inDelete = this.indiceV(vertex);
        var temp = [];
        var tempa = [];
        if (inDelete != -1){
            for (let i = 0; i < this.vertices.length; i++){
                if (i != inDelete){
                    this.vertices[i].indiceV = temp.length;
                    temp.push(this.vertices[i]);
                }
            }

            for (let j = 0; j < this.vertices.length; j++){
                if (j != inDelete){
                    if (tempa[j] == undefined){
                        tempa[j] = [];
                    }
                    for (let k = 0; k < this.vertices.length; k++){
                        if (k != inDelete){
                            if (k < inDelete){
                                tempa[j][k] = this.matrizAdy[j][k];
                            } else {
                                tempa[j][k - 1] = this.matrizAdy[j][k];
                            }
                        }
                    }
                }

            }
            this.vertices = temp;
            this.matrizAdy = tempa;
        }
    }
    actualizarV(oldElemento, newElemento){
        var indActualizar = this.indiceV(oldElemento);
        if (indActualizar != -1){
            // en vez de oldElemento -> id PENDIENTE
            this.vertices[indActualizar].id = newElemento;
        }
    }
    graficar(){
        for (let k = 0; k < this.vertices.length; k++){
            nodes.push({
                id: this.vertices[k].noVer,
                label: this.vertices[k].id.toString(),
                shape: "circle"
            });
        }
        for (let i = 0; i < this.vertices.length; i++){
            for (let j = 0; j < this.vertices.length; j++){
                if (this.matrizAdy[i][j] > 0){
                    if (grafoPonderado.checked){
                        if (grafoDirigido.checked){
                            edges.push({from: i, to: j, arrows: "to", label: this.matrizAdy[i][j].toString()});
                        } else {
                            edges.push({from: i,to: j, label: this.matrizAdy[i][j].toString()});
                        }
                    } else {
                        if (grafoDirigido.checked){
                            edges.push({from: i, to: j, arrows: "to"});
                        } else {
                            edges.push({from: i,to: j});
                            
                        }
                    }
                }
            }
        }
    }

    verificar(nameV){
        for (let i = 0; i < this.vertices.length; i++){
            if (this.vertices[i].id == nameV){
                return true;
            }
        }
        return false;
    }
    indiceV(nameV){
        for (let i = 0; i < this.vertices.length; i++){
            if (this.vertices[i].id == nameV){
                return this.vertices[i].noVer;
            }
        }
        return -1;
    }


}


class Vertice{
    constructor(id, noVer){
        this.id = id;
        this.noVer = noVer;
    }
}

// UTILIZANDO CODIGO DE COLA 
class Cola{
    constructor(){
        this.front = null;
        this.cantidad = 0;
    }
    agregar(dato){
        if (this.cantidad == 0){
            this.front = new Nodo(dato);
        } else {
            this.front = this.agregar2(dato, this.front);
        }
        this.cantidad++;
    }
    insertarF(dato){
        var newNodo = new Nodo(dato);
        newNodo.siguiente = this.front;
        this.front = newNodo;
        this.cantidad++;
    }
    buscar(name, aux){
        if (aux != null){
            if (aux.dato.name == name){
                return true;
            } else {
                return this.buscar(name, aux.siguiente);
            }
        }
        return false;
    }
    agregar2(dato, aux){
        if (aux != null){
            if (aux.siguiente == null){
                aux.siguiente = new Nodo(dato);
            } else {
                aux.siguiente = this.agregar2(dato, aux.siguiente)
            }
        }
        return aux;

    }
    eliminar(){
        if(this.cantidad == 0){
            return null;
        } else {
            let del = this.front;
            this.front = this.front.siguiente;
            this.cantidad--;
            return del;
        }
    }
    empty(){
        if (this.cantidad == 0){
            return true;
        }
        return false; 
    }

}

class Nodo{
    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
    }
}
































/*
class Grafo{
    constructor(){
        this.nodos = new Map();
        //this.nodosAd = new Map(); pendiente de utilizar

    }
    agregarV(nodo){
        this.nodos.set(nodo,[]);
        

    }

    agregarA(inicio, final, distancia){
        this.nodos.get(inicio).push(final);
        this.nodos.get(inicio).push(distancia);

        
       
        //this.nodos.get(final).push(inicio);
        // solo el vertice guarda la conexion
    }

    eliminarV(nodo){
        let cerca = this.nodos.get(nodo);
        for(let i of cerca){
            let listCerca = this.nodos.get(i);
            this.indiceEliminar(nodo, listCerca);
        }
        this.nodos.delete(nodo);

    }

    eliminarA(inicio, final){
        let listInicio = this.nodos.get(inicio);
        let listFinal = this.nodes.get(final);

        this.indiceEliminar(inicio, listFinal);
        //this.indiceEliminar(final, listInicio);
    }
    indiceEliminar(elemento, listado){
        const indice = listado.indexOf(elemento);
        listado.splice(indice, 1);
    }
    
    mostrar(){
        for (let [nodo, listaAd] of this.nodos){
            console.log(`${nodo}: ${listaAd} `)
        }
    
    }
    verificar(nodoF){
        for (let [nodo, listaAd] of this.nodos){
            if(nodoF == nodo){
                return true;
            }
            
        }
        return false;


    }
    getVertices(){
        let listadoV = [];
        for(let [nodo, listaAd] of this.nodos){
            listadoV.push({id: nodo, label: nodo.toString()})
        }
        return listadoV;
    }
    getAristas(){
        let listadoA = [];
        for(let [nodo, listaAd] of this.nodos){

            for (let i = 0; i < listaAd.length; i = i + 2){
                listadoA.push({from: nodo, to: listaAd[i], label:listaAd[i+1],arrows:"to"});

            }
            
            
        }
        return listadoA;

    }
    

}



/*
class Grafo{
    constructor(){
        this.vertices = [];
        this.aristas = [];
        this.cantidad = 0;
    }

    agregarV(vertice){
        this.vertices.push(vertice);
        this.aristas[vertice] = [];
    }
    eliminarV(vertice){
        const index = this.vertices.indexOf(vertice);
        if(index >= 0){
            this.vertices.splice(index, 1);
        }
        while(this.aristas[vertice].length){
            const adVertice = this.aristas[vertice].pop();
            this.eliminarA(adVertice, vertice);
        }
    }
    agregarA(inicio, final){
        this.aristas[inicio].push(final);
        //this.aristas[final].push(inicio); // para que tengan una sola direccion, si lo quito es bidireccional
        this.cantidad++;
    }
    eliminarA(inicio, final){
        const ind1 = this.aristas[inicio] ? this.aristas[inicio].indexOf(final): -1;
        const ind2 = this.aristas[final] ? this.aristas[final].indexOf(inicio): -1;

        if(ind1 >= 0){
            this.aristas[inicio].splice(ind1, 1);
            this.cantidad--;
        }
        
        if(ind2 >= 0){
            this.aristas[final].splice(ind2, 1);

        }

    }
    len(){
        return this.vertices.length;
    }
    mostrar(){
        console.log(this.vertices.map(vertice => {
            //console.log(`${nodo}: ${listaAd}`)
            return `${vertice} => ${this.aristas[vertice].join(', ').trim()}` }, this).join(' | '));
    }
}*/

/*
console.log("Agregando vertices");
grafo.agregarV("A");
grafo.agregarV("B");
grafo.agregarV("C");
grafo.agregarV("D");

grafo.agregarA("A", "B");
grafo.agregarA("A", "D");
grafo.agregarA("B", "C");
grafo.agregarA("B", "D");
grafo.agregarA("D", "C");
grafo.agregarA("C", "A");
console.log("--------------------");
console.log("Agregando aristas");
grafo.agregarA("A", "B", 3);
grafo.agregarA("A", "D", 4);
grafo.agregarA("B", "C", 6);
grafo.agregarA("B", "D", 8);
grafo.agregarA("D", "C", 9);
grafo.agregarA("C", "A", 1);

console.log("--------------------");
grafo.mostrar();
*/

// E  V  E  N  T  O  S
// ----- AGREGAR -----
const btn_Agregar1 = document.getElementById('agregarVertice');
btn_Agregar1.addEventListener('click', agregarVertice);

// ----- AGREGAR -----
const btn_Agregar = document.getElementById('agregar');
btn_Agregar.addEventListener('click', agregarArista);

// ----- ELIMINAR -----
const btn_Eliminar = document.getElementById('eliminar');
btn_Eliminar.addEventListener('click', eliminar);

// ----- BUSCAR -----
const btn_Buscar= document.getElementById('buscar');
btn_Buscar.addEventListener('click', buscar);

// ----- RECORRER -----
const btn_Recorrer = document.getElementById('recorrer');
btn_Recorrer.addEventListener('click', recorrer);

// ----- ACTUALIZAR -----
const btn_Actualizar = document.getElementById('actualizar');
btn_Actualizar.addEventListener('click', actualizar);

// ----- LIMPIAR -----
const btn_Limpiar = document.getElementById('limpiar');
btn_Limpiar.addEventListener('click', limpiar);

// ----- VELOCIDAD -----
const btn_Velocidad = document.getElementById('velocidad');
btn_Velocidad.addEventListener('click', getVelocidad);

// ----- GUARDAR JSON -----
const btn_Guardar = document.getElementById('guardar');
btn_Guardar.addEventListener('click', guardar);

// ----- ALMACENAR -----
const btn_Almacenar = document.getElementById('almacena');
btn_Almacenar.addEventListener('click', almacenar);

// ----- ESPACIO -----
const espacio = document.getElementById('espacio');

//  G  R  A  F  O  -  F  E  A  T  U  R  E  S
var grafoDirigido = document.getElementById("dirigido");
var grafoPonderado = document.getElementById("ponderado");


//  I  N  S  T  A  N  C  I  A
let grafo = new Grafo(grafoDirigido, grafoPonderado);

// V  A  R  I  A  B  L  E  S  -  G  L  O  B  A  L  E  S

var nodes = [];
var edges = [];


// F  U  N  C  I  O  N  E  S  -  E  V  E  N  T  O  S
// ***** AGREGAR VERTICE *****
function agregarVertice(){
    console.log(grafoPonderado.checked)
    console.log(grafoDirigido.checked)
    console.log("Agregando vertice");
    var nodo = document.getElementById('vertice').value;
    grafo.agregarV(nodo);
    drawGrafo();
    
    /*
    grafo.agregarV(nodo);
    nodes.push({id: nodo, label: nodo.toString()});
    buildGrafo();
    */
   
}

// ***** AGREGAR ARISTA *****
function agregarArista(){
    console.log(grafoPonderado.checked)
    console.log(grafoDirigido.checked)
    console.log("Agregando arista");
    var inicio = document.getElementById('inicio').value;
    var final  = document.getElementById('final').value;
    var distancia = document.getElementById('distancia').value;
    
    grafo.agregarA(inicio, final,distancia);
    drawGrafo();
    /*
    grafo.agregarA(inicio, final, distancia);
    edges.push({from: inicio, to: final, label: distancia, arrows:"to"});
    buildGrafo();
    */
    

}

// ***** ELIMINAR ELEMENTO *****
function eliminar(){
    console.log("Eliminando");
    var eliminado = document.getElementById('vertice').value;
    grafo.eliminarV(eliminado);
    drawGrafo();

}

// ***** BUSCAR ELEMENTO *****
function buscar(){
    console.log("Buscando");
    var Binicio = document.getElementById('inicio').value;
    var Bfinal = document.getElementById('final').value;
    var result = document.getElementById('resBR');

    var find = Banchura(grafo, Binicio, Bfinal);

    console.log(find);
    result.textContent = find;
    //drawGrafo();

}

// ***** REALIZANDO BUSQUEDA POR ANCHURA *****
function Banchura(graph, start, end){
    var ind = graph.indiceV(start);
    var listOne = [];
    var tempo;
    if (ind != -1){
        var cola = new Cola();
        cola.agregar(graph.vertices[ind]);
        while(!cola.empty()){
            var vertex = cola.eliminar().dato;
            listOne.push(vertex);
            if (vertex.id == end){ // id - start
                break;
            }
            tempo = vertex.noVer;
            for (let i = 0; i < graph.vertices.length; i++){
                if (graph.matrizAdy[tempo][i] > 0 && !search(listOne, graph.vertices[i].id) && !cola.buscar(graph.vertices[i].id, cola.front)){
                    cola.agregar(graph.vertices[i])
                }
            }

        }
    }
    var cadena = "";
    for (var j = 0; j < listOne.length; j++){
        if (j == listOne.length - 1){
            cadena += listOne[j].id; // id - start
        } else {
            cadena += listOne[j].id + " -> "; // id - start
        }
    }
    return cadena;

}

function search(arr, code){
    for(let i = 0; i < arr.length; i++){
        if (arr[i].code == code){
            return true;
        }
    }
    return false;
}

// ***** RECORRER GRAFO *****
function recorrer(){
    console.log("Recorriendo");
    var first = document.getElementById('inicio').value;
    var result = document.getElementById('resBR');

    var path = Ranchura(grafo, first);
    console.log(path)
    result.textContent = path;
    //drawGrafo();
    
}
function Ranchura(graph, inicio){
    var ind = graph.indiceV(inicio);
    var listOne = [];
    var tempo;
    if (ind != -1){
        var cola = new Cola(); 
        cola.agregar(graph.vertices[ind]);
        while(!cola.empty()){
            var vertex = cola.eliminar().dato;
            listOne.push(vertex);
            tempo = vertex.noVer;
            for (let i = 0; i < graph.vertices.length; i++){
                if (graph.matrizAdy[tempo][i] > 0 && !search(listOne, graph.vertices[i].id) && !cola.buscar(graph.vertices[i].id, cola.front)){
                    cola.agregar(graph.vertices[i])
                }
            }
        }
    }
    var cadena = "";
    for (let j = 0; j < listOne.length; j++){
        if (j == listOne.length - 1){
            cadena += listOne[j].id;
        } else {
            cadena += listOne[j].id + " -> ";
        }
    }
    return cadena;


}

// ***** ACTUALIZAR ELEMENTO *****
function actualizar(){
    console.log("Actualizando");
    var oldElemento = document.getElementById('vertice').value;
    var newElemento = document.getElementById('nuevoElemento').value;
    
    console.log(oldElemento);
    console.log(newElemento)
    grafo.actualizarV(oldElemento, newElemento);
    drawGrafo();
}

// ***** LIMPIAR PANTALLA *****
function limpiar(){
    console.log("Limpiando");
    window.location.reload();
}

// ***** CAMBIAR VELOCIDAD *****
function getVelocidad(){
    console.log("Acelerando");

}

// ***** GUARDAR ARCHIVO *****
function guardar(){
    console.log("Guardando JSON");

}

// ***** ALMACENAMIENTO *****
function almacenar(){
    //console.log("Almacenando");
    
    var nodesV = grafo.getVertices();
    var edgesA = grafo.getAristas();
    console.log("---------------");
    console.log(nodesV);
    console.log("--------------");
    console.log(edgesA);
    
   
    var opc_Save = document.getElementById('opcs').value;
    if(opc_Save == "matrizAd"){
        console.log("Mostrando matriz de adyacencia");
    } else if (opc_Save == "listaAd"){
        console.log("Mostrando lista de adyacencia");
    } else {
        console.log("nada")
    }
    


}

function matriz(){
    var nodesV = grafo.getVertices();
    var edgesA = grafo.getAristas();

    for (let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            console.log("[]");
        }
        console.log("-")
    }

}



// ***** DIBUJAR GRAFO *****
function drawGrafo(){
    grafo.graficar();
    var allVertices = new vis.DataSet(nodes);
    var espacio = document.getElementById("espacio");
    var data = {
        nodes: allVertices,
        edges: edges,
    };
    var options = { 
        nodes: {
            
            size: 30,
            color:{
                background: '#2CBE15',
                border: 'black'
                
            },
            font: {
                size: 20,
                color: 'black'
            },
            borderWidth: 2
        },
        edges: {
            width: 2
        },
    };
    network = new vis.Network(espacio, data, options);
    /*
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
    */
    
    nodes = [];
    edges = []; 
}



/* PENDIENTE DE UTILIZAR ESTAS FEATURES
function buildGrafo(){

   
    var nodesV = grafo.getVertices();
    var edgesA = grafo.getAristas();
 
    

    var data = {
        nodes: nodesV,
        edges: edgesA
    };
    var options = {
        nodes: {
            
            size: 30,
            color:{
                background: '#2CBE15',
                border: 'black'
                
            },
            font: {
                size: 20,
                color: 'black'
            },
            borderWidth: 2
        },
        edges: {
            width: 2
        },       
    };
    var dibujo = new vis.Network(espacio, data, options);

}
*/