// C  O  D  I  G  O
// C  L  A  S  E  S
// Programando la cola
class Cola{
    constructor(){
        this.front = null;
        this.back = null;
        this.longitud = 0;
    }

    agregar(elemento, prioridad){
        const nodo = new Nodo(elemento, prioridad);

        if(this.front){ // primer nodo
            this.back.siguiente = nodo;
            this.back = nodo;
        } else { // si todavia no hay nodos en la cola
            nodo.siguiente = this.front;
            this.front = nodo;

            let actual = this.front;
            let next = nodo.siguiente;
            while(actual.siguiente != null){
                if(nodo.prioridad > next.prioridad){
                    let auxe = actual.value;
                    let auxp = actual.prioridad;
                    actual.value = siguiente.value;
                    actual.prioridad = siguiente.prioridad;
                    siguiente.value = auxe;
                    siguiente.prioridad = auxp;
                    actual = actual.siguiente;
                    siguiente = siguiente.siguiente;

                } else {
                    actual = actual.siguiente;
                    siguiente = siguiente.siguiente;
                }
            } 

            this.front = nodo;
            this.back = nodo;
        }
        this.longitud++;
    }
    eliminar(){
        const actual = this.front;
        this.front = this.front.siguiente; // mueve el enlace front al siguientenodo
        this.longitud--;

        return actual.value;

    }
    mostrar(){
        let actual = this.front;

        while(actual){
            console.log(actual.value);
            actual = actual.siguiente; // mueve el enlace al siguiente nodo
            
        }
    }
    len(){
        return this.longitud;
    }
    verificar(elemento){
        let aux = this.front;
        while(aux != null){
            if(aux.value == elemento){
                return true;
            }
            aux = aux.siguiente;
        }
        return false;
    }
    indiceVerificar(elemento){
        let aux = this.front;
        let contador = 0;
        while(aux != null){
            if (aux.value == elemento){
                return contador;
            }
            aux = aux.siguiente;
            contador++;
        }
        return null;
    }
    actualizar(viejo, nuevo){
        let aux = this.front;
        while(aux != null){
            if(aux.value == viejo){
                aux.value = nuevo;
                break;
            }
            aux = aux.siguiente;
        }
    }

}

class Nodo{
    constructor(elemento, prioridad){
        this.value = elemento;
        this.prioridad = prioridad;
        this.siguiente = null;

    }
}

var cola = new Cola();

/*
cola.agregar(2);
cola.agregar(4);
cola.agregar(54);
cola.agregar(2);
cola.agregar(123);
cola.agregar(8);

cola.mostrar();
*/

// E  V  E  N  T  O  S
// ----- AGREGAR -----
const btn_Agregar = document.getElementById('agregar');
btn_Agregar.addEventListener('click', agregar);

// ----- LIMPIAR -----
const btn_Limpiar = document.getElementById('limpiar');
btn_Limpiar.addEventListener('click', limpiar);

// ----- ESPACIO -----
var container = document.getElementById("espacio");

// ----- REPETIR -----
const btn_Repetir = document.getElementById('repeticion');
btn_Repetir.addEventListener('click', repetir);

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


// F  U  N  C  I  O  N  E  S  -  E  V  E  N  T  O  S

function agregar(){
    // Elemento ingresado en el textbox
    var spc_elemento = document.getElementById('elemento');
    var val_prioridad = document.getElementById('prioridad');

    // Verificacion de repeticion de valores
    var repe = cola.verificar(spc_elemento.value);
    var chek_Repe = btn_Repetir.checked;

    if (repe == true && chek_Repe == true){
        
        alert("No se pueden repetir valores");
        spc_elemento.value ="";
        spc_elemento.focus();
        
    } else {
        agregar2(spc_elemento,spc_elemento.value, val_prioridad, val_prioridad.value);
    }
}

function agregar2(box, dato, box2, prior){
    // Insertando elemento en la pila
    cola.agregar(dato)
    // Creando los cuadros y agregandole el elemento ingresado
    const div = document.createElement("div");
    const div2 = document.createElement("div");

    div.classList.add('cuadrito');
    div.textContent = dato;
    div2.classList.add('cuadrito2');
    div2.textContent = prior;
    
    container.appendChild(div);
    container.appendChild(div2);

    console.log(cola.mostrar())
    box.value ="";
    box.focus();
    box2.value ="";
    
}

// ***** ELIMINAR ELEMENTO *****
async function eliminar(){
    var bloques = document.querySelectorAll(".cuadrito");
    var bloques2 = document.querySelectorAll(".cuadrito2");
    console.log("Eliminando");

    // Longitud de la lista 
    let iDelete = cola.len();

    // Eliminando de la lista 
    cola.eliminar();

    // Pintando el cuadro a eliminar 
    bloques[0].style.backgroundColor = "#DC143C";
    bloques2[0].style.backgroundColor = "#DC143C";
    await new Promise((resolve) =>
        setTimeout(() =>{
        resolve();
        }, (10*100)) //delay
    );
    // Eliminando de la pantalla
    container.removeChild(bloques[0]);
    container.removeChild(bloques2[0]);
}

// ***** BUSCAR ELEMENTO *****
function buscar(){
    var elementoF = document.getElementById('elemento');
    var busqueda = cola.verificar(elementoF.value); 
    console.log("--> "+busqueda);
    if(busqueda == true){
        var posicion = cola.indiceVerificar(elementoF.value);
        console.log(" Posicion: "+posicion);
        pathBloques(posicion);
    } else {
        pathBloques2();
    }
}

async function pathBloques(pos){
    var bloques = document.querySelectorAll(".cuadrito");
    velocidad = 10;
    for (let i = 0; i < bloques.length; i++){
        if( i == pos){
            bloques[i].style.backgroundColor = "#13CE66";
            await new Promise((resolve) =>
            setTimeout(() =>{
            resolve();
            }, (4000)) //delay
            );
            bloques[i].style.backgroundColor = 	"#FFFFFF";
            break;
        } else {
            bloques[i].style.backgroundColor = "#FF4949";
            await new Promise((resolve) =>
            setTimeout(() =>{
            resolve();
            }, (velocidad*200)) //delay
            );                 
        }
        bloques[i].style.backgroundColor = 	"#FFFFFF";   
    }
}

async function pathBloques2(){
    var bloques = document.querySelectorAll(".cuadrito");
    velocidad = 10;
    for (let i = 0; i < bloques.length; i++){
        bloques[i].style.backgroundColor = "#FF4949";
            await new Promise((resolve) =>
            setTimeout(() =>{
            resolve();
            }, (velocidad*200)) //delay
            );  
        bloques[i].style.backgroundColor = 	"#FFFFFF";   
    }
    alert("No se encuentra el elemento")
}

function actualizar(){
    var bloques = document.querySelectorAll(".cuadrito");
    var oldElemento = document.getElementById('elemento').value;
    var newElemento = document.getElementById('nuevoElemento').value;

    var posElemento = cola.indiceVerificar(oldElemento);
    

    var busqueda = cola.verificar(oldElemento); 
   
    if(busqueda == true){
        // cambio el contenido por el nuevo elemento
        pathActualizar(posElemento, newElemento);
        // actualizo la cola
        cola.actualizar(oldElemento, newElemento);

    } else {
        pathBloques2();

    }
}
async function pathActualizar(posi, nuevo){
    var bloques = document.querySelectorAll(".cuadrito");
    velocidad = 10;
    
    for (let i = 0; i < bloques.length; i++){
        if( i == posi){
            bloques[i].style.backgroundColor = "#617EEC";
            await new Promise((resolve) =>
            setTimeout(() =>{
            resolve();
            }, (2000)) //delay
            );
            bloques[posi].textContent = nuevo;
            bloques[i].style.backgroundColor = 	"#FFFFFF";
            break;
        } else {
            bloques[i].style.backgroundColor = "#FF4949";
            await new Promise((resolve) =>
            setTimeout(() =>{
            resolve();
            }, (velocidad*200)) //delay
            );                 
        }
        bloques[i].style.backgroundColor = 	"#FFFFFF";   
    }
}

// ***** LEER ARCHIVO JSON *****
// L E C T U R A - A R C H I V O
function readFile(evento){ // lectura del archivo .json
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
            console.log(convert.valores);

                      
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

// ***** GUARDAR JSON *****
function guardar(){
    console.log("Guardando JSON");
}

// ***** LIMPIAR PANTALLA *****
function limpiar(){
    window.location.reload();
}

// ***** OBTENER VELOCIDAD *****
function getVelocidad(){
    velocidad = document.getElementById("numVelocidad").value;
    
}

// ***** REPETIR ELEMENTOS *****
function repetir(){
    if(btn_Repetir.value == 'on'){
        console.log("Repeticion encendida");
    } else {
        console.log("Repeticion apagada")
    }
}
















