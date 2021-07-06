// C  O  D  I  G  O
// C  L  A  S  E  S 
class Node {
	constructor(value) {
		this.value 	= value
		this.left 	= null
		this.right 	= null
	}
}

class BST {
	constructor() {
		this.root = null
        this.dot = ''
	}

	add(value) {
        if (this.root != null) this._add(value, this.root)
        else this.root = new Node(value)
    }

    _add(value, tmp) {
        if (value < tmp.value) {
            if (tmp.left != null) this._add(value,tmp.left)
            else tmp.left = new Node(value)
        } else {
            if (tmp.right != null) this._add(value,tmp.right)
            else tmp.right = new Node(value)
        }
    }

    preorder(tmp) {
        if (tmp != null) {
            document.getElementById("log").innerHTML+=tmp.value+' '
            this.preorder(tmp.left)
            this.preorder(tmp.right)
        }
    }

    inorder(tmp) {
        if (tmp != null) {
            this.inorder(tmp.left)
            document.getElementById("log").innerHTML+=tmp.value+' '
            this.inorder(tmp.right)
        }

    }

    postorder(tmp) {
        if (tmp != null) {
            this.postorder(tmp.left)
            this.postorder(tmp.right)
            document.getElementById("log").innerHTML+=tmp.value+' '
        }
    }

    dotgen(tmp) {
        if (tmp != null) {
            if (tmp.left != null) this.dot += tmp.value+'--'+tmp.left.value+';'
            if (tmp.right != null) this.dot += tmp.value+'--'+tmp.right.value+';'
            this.dotgen(tmp.left)
            this.dotgen(tmp.right)
        }
    }
}


// E  V  E  N  T  O  S
// ----- AGREGAR -----
const btn_Agregar1 = document.getElementById('agregarL');
btn_Agregar1.addEventListener('click', agregarLista);

// ----- AGREGAR -----
const btn_Agregar2 = document.getElementById('agregar');
btn_Agregar2.addEventListener('click', agregarArbol);

// ----- ELIMINAR -----
const btn_Eliminar = document.getElementById('eliminar');
btn_Eliminar.addEventListener('click', eliminar);

// ----- LIMPIAR -----
const btn_Limpiar = document.getElementById('limpiar');
btn_Limpiar.addEventListener('click', limpiar);


const btn_Buscar = document.getElementById('buscar');
btn_Buscar.addEventListener('click', buscar);



// I  N  S  T  A  N  C  I  A
var bst = new BST();
var bst1 = new BST();
var bst2 = new BST();

var cambio = 0;

var allNodos = [];
var allEdges = [];

var fromValor = [];
var toValor = [];
var fromValor2 = [];



// V  A  R  I  A  B  L  E  S  -  G  L  O  B  A  L  E  S

// ***** AGREGAR ELEMENTO A LA LISTA *****
function agregarLista(){
    const elementoL = document.getElementById('elementoLista').value;
    console.log("Nuevo elemento")
    cambio++;



}
// ***** AGREGAR ELEMENTOS AL ARBOL *****
function agregarArbol(){
    const elementoT = document.getElementById('elemento').value;
    const espacio = document.getElementById('espacioDraw');
    console.log("Elemento arbol: "+elementoT)
    if (cambio == 0){
        bst.add(parseInt(elementoT))
        fromValor.push(parseInt(elementoT));
    } else if (cambio == 1){
        
        bst1.add(parseInt(elementoT))
        toValor.push(parseInt(elementoT));

    } else if (cambio == 2){
        bst2.add(parseInt(elementoT))
        fromValor2.push(parseInt(elementoT));

    } else {
        console.log("nada")
    }
    
    

}

// ***** LIMPIAR PANTALLA *****
function limpiar(){
    console.log("Limpiando");
    window.location.reload();
}
function buscar(){
    buildTre();
}
function infoTree(){
    bst.dot = '{'
    bst.dotgen(bst.root)
    bst.dot += '}'
    return bst.dot
}
function infoTre2(){
    bst1.dot = '{'
    bst1.dotgen(bst1.root)
    bst1.dot += '}'
    return bst1.dot
}
function infoTre3(){
    bst2.dot = '{'
    bst2.dotgen(bst2.root)
    bst2.dot += '}'
    return bst2.dot;
}

var entre1 = false;
var entre2 = false; 
function buildTre(){
    var container = document.getElementById("espacioDraw");
    var DOTstring1
    var DOTstring2;
    if (cambio == 0){
        DOTstring1 = infoTree()
        var DOTstring = DOTstring1;


    } else if (cambio == 1){
        DOTstring2 = infoTre2()
        var DOTstring = DOTstring1 + DOTstring2;
    } else if (cambio == 2){
        var DOTstring3 = infoTre3()
        var DOTstring = DOTstring1 + DOTstring2 + DOTstring3;

    } else {
        console.log("nada")
    }
    
	var parsedData = vis.parseDOTNetwork(DOTstring);
    console.log("------------------")
    console.log(parsedData.nodes);
    for (let i = 0; i < parsedData.nodes.length; i++){
        allNodos.push(parsedData.nodes[i]);
    }
    console.log(parsedData.edges)
    for (let i = 0; i < parsedData.edges.length; i++){
        allEdges.push(parsedData.edges[i]);
    }
    if (cambio == 1){
        allEdges.push({from: fromValor[0], to: toValor[0], arrows: "to"})
    } else if (cambio == 2){
        allEdges.push({from: toValor[0], to: fromValor2[0], arrows: "to"})

    } else {
        console.log("nada")
    }

    var nodoCuadro = parsedData.nodes[0];
    var infoNodo = {id: nodoCuadro.id, label: nodoCuadro.label, shape: "square"};
    parsedData.nodes[0] = infoNodo;
	var data = {
	    nodes: allNodos,
	    edges: allEdges
	}
    var options = {
        nodes: {
            widthConstraint: 20, // hace mas anchos los circulos
        },        
        layout: {
            hierarchical: {
                levelSeparation: 100, // distancia entre niveles (vertical)
                nodeSpacing: 100, // distancia entre nodos (horizontal)
                parentCentralization: true, // centrado cada padre
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'directed',  // hubsize, directed
                shakeTowards: 'roots'  // roots, leaves                        
		    },
        },                        
    };
    var network = new vis.Network(container, data, options);
}