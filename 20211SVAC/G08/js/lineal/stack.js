// C  O  D  I  G  O
 
// Programando la pila 

class Pila{
    constructor(){
        this.top = null;
        this.longitud = 0;
    }

    agregar(elemento){ // agregar datos a la pila
        let nodo = new Nodo(elemento, this.top);
        this.top = nodo;
    }   
    len(){
        let aux = this.top;
        let conteo = 0;
        while (aux != null){
            conteo++;
            aux = aux.anterior;
        }
        return conteo;
        
    }
    eliminar(){
        let elemento = this.top;
        this.top = this.top.anterior;
        return elemento;
    }   
    peek(){
        return this.top; 
    }
    pilaVacia(){
        return this.top === null;
    }
    mostrar(){
        let aux = this.top;
        while(aux !== null){
            console.log(aux.dato);
            
            aux = aux.anterior;   
        }
    }
    verificar(elemento){
        let aux = this.top;
        while(aux != null){
            if (aux.dato == elemento){
                return true;
            }
            aux = aux.anterior;
        }
        return false;

    }
    indiceVerificar(elemento){
        let aux = this.top;
        let contador = 0;
        while(aux != null){
            if (aux.dato == elemento){
                return contador;
            }
            aux = aux.anterior;
            contador++;
        }
        return null;
    }
    actualizar(viejo, nuevo){
        let aux = this.top;
        while(aux != null){
            if (aux.dato == viejo){
                aux.dato = nuevo;
                break;
            }
            aux = aux.anterior;
        }
    }
    imprimir(){
        let aux = this.top;
        let cadena = "";
        let flag = false;
        while(aux !== null){
            if (flag == false){
                cadena = aux.dato;
                flag = true;

            } else {
                cadena = cadena +","+aux.dato;
            }
            
            aux = aux.anterior;   
        }
        return cadena;   
    }
}

class Nodo{
    constructor(elemento, anterior){
        this.dato = elemento;
        this.anterior = anterior;
    }
}

var stack = new Pila();



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

// ----- ELIMINAR -----
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
var contenido;
var convert;
var tipoDato;
var listaValores = []

// F  U  N  C  I  O  N  E  S  -  E  V  E  N  T  O  S
// ***** AGREGAR ELEMENTO *****
function agregar(){
    // Elemento ingresado en el textbox
    var spc_elemento = document.getElementById('elemento');

    //tipoDato = typeof(spc_elemento.value);
   
    // Verificacion de repeticion de valores
    var repe = stack.verificar(spc_elemento.value);
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
    
    // Insertando elemento en la pila
    stack.agregar(dato)
    // Creando los cuadros y agregandole el elemento ingresado
    const div = document.createElement("div");
    div.classList.add('cuadrito');
    div.textContent = dato;
    container.appendChild(div);
    console.log(stack.mostrar())
    box.value ="";
    box.focus();
 

}

// ***** ELIMINAR ELEMENTO *****
async function eliminar(){
    var bloques = document.querySelectorAll(".cuadrito");
    
    console.log("Eliminando")
    
    
    let iDelete = stack.len();
    // Eliminando de la lista
    stack.eliminar();
    bloques[iDelete - 1].style.backgroundColor = "#DC143C";
    await new Promise((resolve) =>
        setTimeout(() =>{
        resolve();
        }, (10*100)) //delay
    );
    bloques[iDelete - 1].classList.add("eliminado");
    
    await new Promise((resolve) =>
        setTimeout(() =>{
        resolve();
        }, (1500)) //delay
    );

    // Eliminando de la pantalla
    container.removeChild(bloques[iDelete-1]);



}

// ***** BUSCAR ELEMENTO *****
function buscar(){
    var elementoF = document.getElementById('elemento');
    var busqueda = stack.verificar(elementoF.value); 
    console.log("--> "+busqueda);


    if(busqueda == true){
        
        var posicion = stack.indiceVerificar(elementoF.value);
        console.log(" Posicion: "+posicion);
        pathBloques(posicion);

    } else {
        pathBloques2();
    }

    
    // posicion para ir buscando y pintando los bloques
    


}
async function pathBloques(pos){
    var bloques = document.querySelectorAll(".cuadrito");
    var stoPos = bloques.length - pos - 1; //  5 - 3  = 2 
    
    console.log("Entre")
    velocidad = 10;
    let i = bloques.length - 1;
    while(i >= 0){       
        
        if( i == stoPos){
            bloques[i].style.backgroundColor = "#13CE66";
            bloques[i].classList.add("busqueda");
            await new Promise((resolve) =>
                setTimeout(() =>{
                resolve();
                }, (1800)) //delay
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
        i--;
        
    }
}
async function pathBloques2(){
    var bloques = document.querySelectorAll(".cuadrito");
   
    velocidad = 10;
    let i = bloques.length - 1;
    while(i >= 0){
        
        bloques[i].style.backgroundColor = "#FF4949";
            await new Promise((resolve) =>
            setTimeout(() =>{
            resolve();
            }, (velocidad*200)) //delay
            );  
        bloques[i].style.backgroundColor = 	"#FFFFFF";
        i--;   
    }
    alert("No se encuentra el elemento")
    
}


function actualizar(){
    var bloques = document.querySelectorAll(".cuadrito");
    var oldElemento = document.getElementById('elemento').value;
    var newElemento = document.getElementById('nuevoElemento').value;

    var posElemento = stack.indiceVerificar(oldElemento);
    var posActualizar = stack.len() - posElemento - 1;

    var busqueda = stack.verificar(oldElemento); 
   
    if(busqueda == true){
        // cambio el contenido por el nuevo elemento
        pathActualizar(posActualizar, newElemento);
        // actualizo la lista 
        stack.actualizar(oldElemento, newElemento);

    } else {
        pathBloques2();

    }
    


    console.log("Cambiar: "+oldElemento+" por: "+newElemento+ " posicion: "+posActualizar)
    console.log(stack.mostrar());

}
async function pathActualizar(posi, nuevo){
    var bloques = document.querySelectorAll(".cuadrito");
    velocidad = 10;
    let i = bloques.length - 1;
    while(i >= 0){  
        if( i == posi){
            bloques[i].style.backgroundColor = "#617EEC";
            bloques[i].classList.add("actualizar");
            await new Promise((resolve) =>
                setTimeout(() =>{
                resolve();
                }, (1500)) //delay
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
        i--;
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

// ***** AGREGAR ELEMENTOS - JSON *****
async function agregarFile(){
    velocidad = 10;
    var chek_Repe = btn_Repetir.checked;
    
    for(let i = 0; i < listaValores.length; i++){
        let verLista = stack.verificar(listaValores[i]);
        
        if(chek_Repe == true && verLista == true){
            console.log("Repetido") 
        } else {
            // Insertando elemento en la cola
            stack.agregar(listaValores[i]);
            // Creando los cuadros y agregandole el elemento ingresado
            const div = document.createElement("div");
            div.classList.add('cuadrito');
            div.textContent = listaValores[i];
            container.appendChild(div);
            await new Promise((resolve) =>
                setTimeout(() =>{
                resolve();
                }, (velocidad*200)) //delay
            ); 
        } 
    }
}

function listaNums(numso){
    let hola = [];
    for (let i = 0; i < numso.length; i++){
        hola.push(parseInt(numso[i]));

    }
    return hola;
}
// ***** GUARDAR JSON *****
function guardar(){
    var repetic = btn_Repetir.checked;
    var velocidad = 10;
    var content = stack.imprimir().split(",");
    
    if (tipoDato == 'number'){
        content = listaNums(content);
    } 
    
    var fileJ = {
        "categoria": "Estructura Lineal",
        "nombre": "Pila",
        "repeticion": repetic,
        "animacion": velocidad,
        "valores": content
    }

    let saveArchivo = new Blob([JSON.stringify(fileJ)],{type:"application/json"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(saveArchivo);
    a.download = "pila.json";
    a.click();
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

































/*
stack.agregar(12);
stack.agregar(15);
stack.agregar(1);
stack.agregar(2);
stack.agregar(8);
stack.eliminar();
stack.eliminar();
stack.eliminar();
stack.mostrar();

stack.len();
stack.verificar(1);*/


