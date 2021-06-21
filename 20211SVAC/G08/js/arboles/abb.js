// C  O  D  I  G  O
// C  L  A  S  E  S
// Programando el BSTree

class Nodo {
    constructor(dato){
        this.dato = dato;
        this.left = null;
        this.right = null;

    }
}

class BSTree{
    constructor(){
        this.root = null;
    }
    agregar(dato){
        let nodo = new Nodo(dato);
        if(this.root == null){
            this.root = nodo;

        } else {
            this.insertNode(this.root, nodo);

        }
    }
    insertNode(node, nuevoNodo){
        if(nuevoNodo.dato < node.dato){
            if(node.left == null){
                node.left = nuevoNodo;
            } else {
                this.insertNode(node.left, nuevoNodo);
            }
        } else {
            if (node.right == null){
                node.right = nuevoNodo;
            } else {
                this.insertNode(node.right, nuevoNodo);
            }
        }
    }
    inOrder(nodo){
        if(nodo != null){
            this.inOrder(nodo.left);
            console.log(nodo.dato);
            this.inOrder(nodo.right);
        }
    }
    preOrder(nodo){
        if(nodo != null){
            console.log(nodo.dato);
            this.preOrder(nodo.left);
            this.preOrder(nodo.right);
        }
    }
    postOrder(nodo){
        if(nodo != null){
            this.postOrder(nodo.left);
            this.postOrder(nodo.right);
            console.log(nodo.dato);
        }
    }
    
    getRoot(){
        return this.root;
    }
    buscar(nodo, datoF){
        if(nodo === null){
            return null;
        } else if(datoF < nodo.dato){
            return this.buscar(nodo.left, datoF);

        } else if(datoF > nodo.dato){
            return this.buscar(nodo.right, datoF);
        } else {
            return nodo;
        }
    }



}

const arbol = new BSTree();
/*
arbol.insertar(15);
arbol.insertar(25);
arbol.insertar(10);
arbol.insertar(7);
arbol.insertar(22);
arbol.insertar(17);
arbol.insertar(13);
arbol.insertar(5);
arbol.insertar(9);
arbol.insertar(27);
const root = arbol.getRoot();
arbol.inOrder(root);
console.log("-------------");
arbol.preOrder(root);
console.log("-------------");

arbol.postOrder(root);
console.log("-------------");
console.log(arbol.buscar(root, 25));
*/

// E  V  E  N  T  O  S
// ----- AGREGAR -----
const btn_Agregar = document.getElementById('agregar');
btn_Agregar.addEventListener('click', agregar);

// ----- LIMPIAR -----
const btn_Limpiar = document.getElementById('limpiar');
btn_Limpiar.addEventListener('click', limpiar);

// ----- ESPACIO -----
var container = document.getElementById("espacioDraw");

// ----- REPETIR -----
const btn_Repetir = document.getElementById('repeticion');
//btn_Repetir.addEventListener('click', repetir);

// ----- ELIMINAR -----
const btn_Eliminar = document.getElementById('eliminar');
btn_Eliminar.addEventListener('click', eliminar);

// ----- BUSCAR -----
const btn_Buscar= document.getElementById('buscar');
btn_Buscar.addEventListener('click', buscar);

// ----- VELOCIDAD -----
const btn_Velocidad = document.getElementById('velocidad');
btn_Velocidad.addEventListener('click', getVelocidad);

// ----- ACTUALIZAR -----
const btn_Actualizar = document.getElementById('actualizar');
btn_Actualizar.addEventListener('click', actualizar);

// ----- GUARDAR JSON -----
const btn_Guardar = document.getElementById('guardar');
btn_Guardar.addEventListener('click', guardar);

// V  A  R  I  A  B  L  E  S  -  G  L  O  B  A  L  E  S
var velocidad;
var tipoDato;


// F  U  N  C  I  O  N  E  S  -  E  V  E  N  T  O  S
function agregar(){
    // Elemento ingresado en el textbox
    var elemento = document.getElementById('elemento');
    // Verificacion de repeticion de valores
    var repe = cola.verificar(spc_elemento.value);
    var chek_Repe = btn_Repetir.checked;
    if (repe == true && chek_Repe == true){
        
        alert("No se pueden repetir valores");
        spc_elemento.value ="";
        spc_elemento.focus();
        
    } else {
        agregar2(spc_elemento,spc_elemento.value);
    }
}

function agregar2(box, dato){
    // Insertando elemento en el arbol
    arbol.agregar(elemento);
    // Creacion del arbol

    box.value = "";
    box.focus();
}

// ***** ELIMINAR ELEMENTO *****
function eliminar(){
    console.log("Eliminando");
}

// ***** BUSCAR ELEMENTO ***** 
function buscar(){
    console.log("Buscando");
}

// ***** ACTUALIZAR ELEMENTO ***** 
function actualizar(){
    console.log("Actualizando");
}

// ***** GUARDAR JSON *****
function guardar(){
    console.log("Guardando");
}


// ***** LEER ARCHIVO JSON *****
function readFile(evento){ 
    
    let archivo = evento.target.files[0];
    if (archivo){
        let reader = new FileReader();
        reader.onload = function(e){
            contenido = e.target.result;
            // console.log(contenido)
            console.log("-----------")
            convert = JSON.parse(contenido);
            console.log("VALORES")
            listaValores = convert.valores;
            tipoDato = typeof(listaValores[0]);
            agregarFile();

                      
            //generateElements(listaValores, tipoDato);

        };
        reader.readAsText(archivo); 

    } else {
        alert("No se ha seleccionado ningun archivo");
    }
}
window.addEventListener('load', ()=>{ // cada vez que cambie 
    document.getElementById('file').addEventListener('change',readFile)
});

// ***** LIMPIAR *****
function limpiar(){
    window.location.reload();
}

// ***** OBTENER VELOCIDAD *****
function getVelocidad(){
    velocidad = document.getElementById("numVelocidad").value;
    
}