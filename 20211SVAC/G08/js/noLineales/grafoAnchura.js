//  C  O  D  I  G  O

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


let grafo = new Grafo();
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




// V  A  R  I  A  B  L  E  S  -  G  L  O  B  A  L  E  S

var nodes = [];
var edges = [];


// F  U  N  C  I  O  N  E  S  -  E  V  E  N  T  O  S
// ***** AGREGAR VERTICE *****
function agregarVertice(){
    console.log("Agregando vertice");
    var nodo = document.getElementById('vertice').value;
    grafo.agregarV(nodo);
    nodes.push({id: nodo, label: nodo.toString()});
    buildGrafo();
   



}

// ***** AGREGAR ELEMENTO *****
function agregarArista(){
    console.log("Agregando arista");
    var inicio = document.getElementById('inicio').value;
    var final  = document.getElementById('final').value;
    var distancia = document.getElementById('distancia').value;
    grafo.agregarA(inicio, final, distancia);
    edges.push({from: inicio, to: final, label: distancia, arrows:"to"});
    buildGrafo();
    

}

// ***** ELIMINAR ELEMENTO *****
function eliminar(){
    console.log("Eliminando");
    var eliminado = document.getElementById('vertice').value;
    grafo.eliminarV(eliminado);
    buildGrafo();

}

// ***** BUSCAR ELEMENTO *****
function buscar(){
    console.log("Buscando");
    var buscado = document.getElementById('inicio').value;

}

// ***** RECORRER GRAFO *****
function recorrer(){
    console.log("Recorriendo");

}

// ***** ACTUALIZAR ELEMENTO *****
function actualizar(){
    console.log("Actualizando");
    var oldElemento = document.getElementById('inicio').value;
    var newElemento = document.getElementById('nuevoElemento').value;
    
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



// ***** GRAFICAR GRAFO *****
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