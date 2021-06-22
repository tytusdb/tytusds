// C  O  D  I  G  O
// C  L  A  S  E  S
// Programando la Cola de Prioridad

class Prioridad {
    constructor(){
        this.front = null; 
        this.back = null;
        this.longitud = 0;
    }
    agregar(elemento, prioridad){ // importante pasar ambos datos
        let nuevoN = new Nodo(elemento, prioridad); 
        
        if(this.empty()){ 
            // si la cola de prioridad esta vacia lleno con la informacion
            this.front = nuevoN;
            this.back = nuevoN;
        } else {  // si ya tiene datos hago esto
            // guardo la informacion para la comparacion necesaria
            nuevoN.siguiente = this.front;
            this.front = nuevoN;
            // guardo para que no se pierdan los datos en el intercambios
            let presente = this.front;
            let futuro = presente.siguiente;
            while(presente.siguiente != null){ // hasta que la cola no este vacia
                if(presente.prioridad > futuro.prioridad){ // aplico metodo burbuja para ordenar
                    // guardo info para intercambiar
                    let auxe = presente.elemento; // dato 
                    let auxp = presente.prioridad; // prioridad
                    presente.elemento = futuro.elemento;
                    presente.prioridad = futuro.prioridad;
                    futuro.elemento = auxe;
                    futuro.prioridad = auxp;
                    // para ir evaluando con los siguientes elementos
                    presente = presente.siguiente;
                    futuro = futuro.siguiente;
                } else {
                    presente = presente.siguiente;
                    futuro = futuro.siguiente;
                }

            }

        }
        this.longitud++;
    }
    mostrar(){
        let cadena = "";
        let nodoActual = this.front;
        while(nodoActual != null){
            cadena += nodoActual.elemento +",";
            if(nodoActual.siguiente != null){
                nodoActual = nodoActual.siguiente;

            } else {
                nodoActual = null;
            }
        }
        
        console.log(cadena);
    }
    imprimir(){
        let cadena = "";
        let nodoActual = this.front;
        while(nodoActual != null){
            cadena += nodoActual.elemento +",";
            if(nodoActual.siguiente != null){
                nodoActual = nodoActual.siguiente;

            } else {
                nodoActual = null;
            }
        }
        
        return cadena;
    }
    imprimirNivel(){
        let cadena = "";
        let nodoActual = this.front;
        while(nodoActual != null){
            cadena += nodoActual.prioridad +",";
            if(nodoActual.siguiente != null){
                nodoActual = nodoActual.siguiente;

            } else {
                nodoActual = null;
            }
        }
        
        return cadena;
    }
    empty(){
        if(this.front == null){
            return true;
        }
        return false;
    }
    verificar(elemento){
        let aux = this.front;
        while(aux != null){
            if(aux.elemento == elemento){
                return true;
            }
            aux = aux.siguiente;
        }
        return false;
    }
    len(){
        return this.longitud;
    }
    indiceVerificar(elemento){
        let aux = this.front;
        let contador = 0;
        while(aux != null){
            if (aux.elemento == elemento){
                return contador;
            }
            aux = aux.siguiente;
            contador++;
        }
        return null;
    }
    eliminar(){
        const actual = this.front;
        this.front = this.front.siguiente; // mueve el enlace front al siguientenodo
        this.longitud--;

        return actual.elemento;

    }
    actualizar(viejo, nuevo){
        let aux = this.front;
        while(aux != null){
            if(aux.elemento == viejo){
                aux.elemento = nuevo;
                break;
            }
            aux = aux.siguiente;
        }
    }
}

class Nodo {
    constructor(elemento, prioridad){
        this.elemento = elemento;
        this.prioridad = prioridad; 
        this.siguiente = null
    }
}
var prioridad = new Prioridad();

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
var ordenDato = [];
var ordenPrior = [];

// F  U  N  C  I  O  N  E  S  -  E  V  E  N  T  O  S

function agregar(){
    // Elemento ingresado en el textbox
    var spc_elemento = document.getElementById('elemento');
    var val_prioridad = document.getElementById('prioridad');

    // Verificacion de repeticion de valores
    var repe = prioridad.verificar(spc_elemento.value);
    console.log("Valor repetido: "+repe);
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
    // Insertando elemento en la cola de prioridad
    prioridad.agregar(dato, prior);

    ordenDato.push(dato);
    ordenPrior.push(prior);
    // Creando los cuadros y agregandole el elemento ingresado
    const div = document.createElement("div");
    const div2 = document.createElement("div");

    div.classList.add('cuadrito');
    div.textContent = dato+"  ||  "+prior;
    /*
    div2.classList.add('cuadrito2');
    div2.textContent = prior;*/
    
    container.appendChild(div);
    //container.appendChild(div2);

    ordenarCuadros(div);

    console.log(prioridad.mostrar())
    box.value ="";
    box.focus();
    box2.value ="";
    
}

function ordenarCuadros(div_){
    var contenido = prioridad.imprimir().split(",");
    var contenidoP = prioridad.imprimirNivel().split(",");
    var bloques = document.querySelectorAll(".cuadrito");

    for(let i = 0; i < bloques.length; i++){
        bloques[i].textContent = contenido[i] + " || "+contenidoP[i];

    }
}

// ***** ELIMINAR ELEMENTO *****
async function eliminar(){
    var bloques = document.querySelectorAll(".cuadrito");
    //var bloques2 = document.querySelectorAll(".cuadrito2");
    console.log("Eliminando");

    // Longitud de la lista 
    let iDelete = prioridad.len();

    // Eliminando de la cola de prioridad
    prioridad.eliminar();
    prioridad.mostrar();

    // Pintando el cuadro a eliminar 
    bloques[0].style.backgroundColor = "#DC143C";
    
    //bloques2[0].style.backgroundColor = "#DC143C";
    await new Promise((resolve) =>
        setTimeout(() =>{
        resolve();
        }, (10*100)) //delay
    );

    // Animacion de eliminado
    bloques[0].classList.add('eliminado');
    await new Promise((resolve) =>
        setTimeout(() =>{
        resolve();
        }, (1500)) //delay
    );
    // Eliminando de la pantalla
    container.removeChild(bloques[0]);
    //container.removeChild(bloques2[0]);
}

// ***** BUSCAR ELEMENTO *****
function buscar(){
    var elementoF = document.getElementById('elemento');
    var busqueda = prioridad.verificar(elementoF.value); 
    console.log("--> "+busqueda);
    if(busqueda == true){
        var posicion = prioridad.indiceVerificar(elementoF.value);
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
            bloques[i].classList.add("busqueda");
            await new Promise((resolve) =>
            setTimeout(() =>{
            resolve();
            }, (2000)) //delay
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

    var posElemento = prioridad.indiceVerificar(oldElemento);
    

    var busqueda = prioridad.verificar(oldElemento); 
   
    if(busqueda == true){
        // cambio el contenido por el nuevo elemento
        pathActualizar(posElemento, newElemento);
        // actualizo la cola
        prioridad.actualizar(oldElemento, newElemento);

    } else {
        pathBloques2();

    }
}
async function pathActualizar(posi, nuevo){
    var bloques = document.querySelectorAll(".cuadrito");
    velocidad = 10;
    var numPriori = prioridad.imprimirNivel().split(",");
    
    for (let i = 0; i < bloques.length; i++){
        if( i == posi){
            bloques[i].style.backgroundColor = "#617EEC";
            bloques[i].classList.add("actualizar");
            await new Promise((resolve) =>
            setTimeout(() =>{
            resolve();
            }, (2000)) //delay
            );
            bloques[posi].textContent = nuevo + " || "+numPriori[posi];
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
            //tipoDato = typeof(listaValores[0]);
            console.log(listaValores);
            agregarFile(listaValores);
            tipoDato = typeof(listaValores.valor[0]);
            

                      
           
        };
        reader.readAsText(archivo); 

    } else {
        alert("No se ha seleccionado ningun archivo");
    }
}

window.addEventListener('load', ()=>{ // cada vez que cambie 
    document.getElementById('file').addEventListener('change',readFile)
});

// ***** AGREGAR - FILE *****
async function agregarFile(listaDatos){
    velocidad = 10;
    var chek_Repe = btn_Repetir.checked;
    
    for(let i = 0; i < listaDatos.length; i++){
        let verLista = prioridad.verificar(listaDatos[i]);
        
        if(chek_Repe == true && verLista == true){
            console.log("Repetido") 
        } else {
            // Insertando elemento en la cola
            prioridad.agregar(listaDatos[i].valor, listaDatos[i].prioridad);
            // Creando los cuadros y agregandole el elemento ingresado
            const div = document.createElement("div");
            div.classList.add('cuadrito');
            div.textContent = listaDatos[i].valor +" || "+listaDatos[i].prioridad;
            container.appendChild(div);
            await new Promise((resolve) =>
                setTimeout(() =>{
                resolve();
                }, (velocidad*200)) //delay
            ); 
            ordenarCuadros2(div);
            

        } 
    }
}

function ordenarCuadros2(square){
    var contenido = prioridad.imprimir().split(",");
    var contenidoP = prioridad.imprimirNivel().split(",");
    var bloques = document.querySelectorAll(".cuadrito");

    for(let i = 0; i < bloques.length; i++){
        bloques[i].textContent = contenido[i] + " || "+contenidoP[i];

    }


}
// Creando objeto 
function crearOb(ele, pri){
    let info = [];
    function Archivo(valor, prioridad){
        this.valor = valor;
        this.prioridad = prioridad;
    }

    for(let i = 0; i < ele.length-1; i++){
        var nuevoDato = new Archivo(ele[i],parseInt(pri[i]));
        info.push(nuevoDato);

    }
    return info;


}


// ***** GUARDAR JSON *****
function guardar(){
    var repetic = btn_Repetir.checked;
    var velocidad = 10;

    var conD = prioridad.imprimir().split(",");
    var conP = prioridad.imprimirNivel().split(",");

    let final = crearOb(conD, conP);
    console.log(final)


    
    var fileJ = {
        "categoria": "Estructura Lineal",
        "nombre": "Cola Prioridad",
        "repeticion": repetic,
        "animacion": velocidad,
        "valores": final
    }

    let saveArchivo = new Blob([JSON.stringify(fileJ)],{type:"application/json"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(saveArchivo);
    a.download = "colaPrioridad.json";
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
















