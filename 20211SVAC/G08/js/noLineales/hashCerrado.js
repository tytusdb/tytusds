class Nodo{
    constructor(indice, clave, valor){
        this.indice = indice;
        this.clave = clave;
        this.valor = valor;
    }
}

class Hash{
    constructor(size, min, max){
        this.vector = [];
        this.elementos = 0;
        this.size = size;
        this.porcentaje = 0;
        this.max = max;
        this.min = min;
        this.constante = 0.1625277911;

        for (let i = 0; i < size; i++){
            this.vector.push(null);
        }
    }

    funcionHash_division(id){
        let posicion = id % (this.size - 1)

        while(this.vector[posicion]!= null){
            posicion++;
            if(posicion > this.size){
                return posicion - this.size;
            }
        }
        
        return posicion;
    }

    funcionHash_multipli(id){
        let posicion = 0;
        posicion = Math.floor((this.size) * (id * this.constante % 1));
        console.log(posicion);
        while(this.vector[posicion] != null){
            posicion++;
            if (posicion > this.size-1){
            return posicion - (this.size-1);
            }else{
                return posicion;
            }
        }
    }

    funcionHash_simple(id){
        while ((id > 1) || (id == 0)){
            id = id/10
        }
        let posicion = Math.floor(id * this.size-1)
        while(this.vector[posicion] != null){
            posicion++;
            if (posicion > this.size){
            return posicion - this.size
            
            }else{
                return posicion
            }
        }
        
    }

    insertar(id, clave, valor, fun){
        let posicion;

        if(fun===1){
            posicion = this.funcionHash_division(id);
        }
        else if(fun === 2){
            posicion = this.funcionHash_multipli(id);
        }
        else{
            posicion = this.funcionHash_simple(id);
        }


        let nuevo = new Nodo(posicion, clave, valor);

        this.vector[posicion] = nuevo;
        this.elementos++;
        this.porcentaje = (this.elementos/this.size)*100;

        if(this.porcentaje > this.max){
            this.reHashing(fun);
        }
    }

    reHashing(fun){
        let siguiente = this.size;
        let factor = 0;
        let posicion;

        while(factor < this.min){
            factor = (this.elementos/siguiente)*100;
            siguiente++;
        }

        let vectorTemporal = [];

        for(let i = 0; i<siguiente; i++){
            vectorTemporal.push(null);
        }

        let vectorAux = this.vector;

        this.vector = vectorTemporal;
        this.size = siguiente;

        console.log("nuevo tamaño", siguiente, "tamaño", vectorTemporal.length);

        vectorAux.forEach(nodo => {
            if(nodo != null){
                if(fun === 1){
                    posicion = this.funcionHash_division(this.valorASCII(nodo.clave));
                }else if(fun === 2){
                    posicion = this.funcionHash_multipli(this.valorASCII(nodo.clave));
                }
                
                //this.print("nueva posicion:", posicion);
                nodo.indice = posicion;
                vectorTemporal[posicion] = nodo;
            }
            
        })

        this.vector = vectorTemporal;
    }

    buscar(elemento){
        let valor = false;
        let ret = false;
        let busq;
        let num = -1;

        while(valor !== true){
            for(let i = 0; i< this.size; i++){
                busq = this.vector[i];
                if(busq != null){
                    if(busq.clave == elemento){
                        ret = true;
                        valor = true;
                        num = i;
                    }else{
                        valor = false;
                    }
                }else{
                }
            }
            valor = true;
        }

        return num;
    }

    eliminar(elemento){

        let valor = false;
        let ret = false;
        let busq;
        let num = -1;

        while(valor !== true){
            for(let i = 0; i< this.size; i++){
                busq = this.vector[i];
                if(busq != null){
                    if(busq.clave == elemento){
                        this.vector.splice(i, 1);
                        ret = true;
                        valor = true;
                        num = i;
                    }else{
                        valor = false;
                    }
                }else{
                }
            }
            valor = true;
        }

        return num;
    }

    valorASCII(cadena){
        let resultado = 0;
        for(let i = 0; i < cadena.length; i++){
            resultado += cadena.charCodeAt(i);
        }
        return resultado;
    }

    print(){
        let valores = "";
        this.vector.forEach(nodo => {
            if(nodo != null){
                valores = "";
                valores += "|"+ nodo.clave + ", " +nodo.valor
                console.log("Indice: ",nodo.indice, "valores:",valores)
            }else{
                console.log("Indice:", null);
            }
        })
    }
}
/*
let tabla = new Hash(3,30,85);

tabla.insertar(tabla.valorASCII("primero"),"primero","ocupado",1);
tabla.insertar(tabla.valorASCII("casa"),"casa","colision1",1);
tabla.insertar(tabla.valorASCII("saca"),"saca","colision2",1);
tabla.insertar(tabla.valorASCII("saca1"),"saca1","colision3",1);
tabla.insertar(tabla.valorASCII("saca2"),"saca2","colision4",1);
tabla.insertar(tabla.valorASCII("saca3"),"saca3","colision5",1);
tabla.insertar(tabla.valorASCII("asca"),"asca","colision5",1);
tabla.print();
*/

//"Simple/Division/Multiplicacion"

//-----------BOTON VELOCIDAD-----------
const btn_Velocidad = document.getElementById('velocidad');
btn_Velocidad.addEventListener('click', getVelocidad);

//-----------AGREGAR-----------
const btn_Agregar = document.getElementById('agregar');
btn_Agregar.addEventListener('click', agregar);

//-----------LIMPIAR-----------
const btn_Limpiar = document.getElementById('limpiar');
btn_Limpiar.addEventListener('click', limpiar);

//-----------ELIMINAR-----------
const btn_Eliminar = document.getElementById('eliminar');
btn_Eliminar.addEventListener('click', eliminar);

//-----------BUSCAR-----------
const btn_Buscar= document.getElementById('buscar');
btn_Buscar.addEventListener('click', buscar);

//-----------TAMAÑO-----------
const btn_tamano= document.getElementById('tamano');
btn_tamano.addEventListener('click', getTam);

//-----------GUARDAR JSON-----------
const btn_Guardar = document.getElementById('guardar');
btn_Guardar.addEventListener('click', guardar);

//-----------VARIABLES GLOBALES-----------
var tamano;
var values = [];
var funcion_tipo = document.getElementById("funcion").value;
var tipo_prueba = document.getElementById("prueba").value;
var container = document.getElementById("espacio");
let maxi;
let mini;
let func;
let val_fun;
let prueb;
let tabla = new Hash(tamano, mini, maxi);

//-----------MOSTRAR TABLA HASH-----------
async function tam_tabla(valor){
    velocidad = 10;
    let arreglo = valor;
    for (let i = 0; i < arreglo; i++){
        // Creando los cuadros y agregandole el elemento ingresado
        const div = document.createElement("div");
        div.classList.add('cuadrito');

        if (tabla.vector[i] == null){
            div.textContent =(i+" || ");
        }else{
            div.textContent =(i+" || "+tabla.vector[i].clave);
        }
        
        container.appendChild(div);
        await new Promise((resolve) =>
            setTimeout(() =>{
            resolve();
            }, (velocidad*200)) //delay
        ); 

        //contenido_tabla(i);
    }
    
}

//-----------AGREGAR ELEMENTO-----------
function agregar(){
    let nuevo = document.getElementById("elemento").value;
    var cod = document.getElementById("funcion").value;

    if(cod === "division"){
        val_fun = 1;
    }else if (cod === "multiplicacion"){
        val_fun = 2;
    }else{
        val_fun = 3;
    }
    
    tabla.insertar(tabla.valorASCII(nuevo), nuevo, 1, val_fun);
    tabla.print();
    console.log(tabla.porcentaje);

}

//-----------BUSCAR ELEMENTO-----------
function buscar(){
    let elemento = document.getElementById("elemento").value;

    let busqueda = tabla.buscar(elemento);
    if (busqueda >= 0){
        console.log("---------->" + elemento + " en el indice ");
        pathBloques(busqueda);
    }
    else{
        console.log("---------->" + elemento + " no encontrado");
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


//-----------ELIMINAR ELEMENTO-----------
async function eliminar(){
    let elemento = document.getElementById("elemento").value;
    var bloques = document.querySelectorAll(".cuadrito");

    let busqueda = tabla.eliminar(elemento);
    if (busqueda >= 0){
        console.log("---------->" + elemento + " eliminado");
        bloques[busqueda].style.backgroundColor = "#DC143C";
        await new Promise((resolve) =>
            setTimeout(() =>{
            resolve();
            }, (10*100)) //delay
        );
        bloques[busqueda].classList.add("eliminado");
        
        await new Promise((resolve) =>
            setTimeout(() =>{
            resolve();
            }, (1500)) //delay
        );
        // Eliminando de la pantalla
        bloques[busqueda].textContent = (busqueda+"||");
        bloques[busqueda].style.backgroundColor = "white";
    }
    else{
        console.log("---------->" + elemento + " no encontrado");
    }

    tabla.print();

    
    console.log("Eliminando");

    // Pintando el cuadro a eliminar 
    
    
    
}

//-----------LECTURA ARCHIVO JSON-----------
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
            tamano = convert.m;
            maxi = convert.maximo;
            mini = convert.minimo;
            values = convert.valores;
            func = convert.funcion;
            prueb = convert.prueba;
            tabla.size = tamano;
            tabla.min = mini;
            tabla.max = maxi;
            if(func === "Division"){
                val_fun = 1;
            }else if (func === "Multiplicacion"){
                val_fun = 2;
            }else{
                val_fun = 3;
            }

            for(let i =0; i < values.length; i++){
                tabla.insertar(tabla.valorASCII(values[i]), values[i], i, val_fun);
                
            }
            //tabla.print();
            console.log(tabla.porcentaje);
            //agregarFile();
            tam_tabla(tabla.size);
            //
        };
        reader.readAsText(archivo); 

    } else {
        alert("No se ha seleccionado ningun archivo");
    }
}

window.addEventListener('load', ()=>{ // cada vez que cambie 
    document.getElementById('file').addEventListener('change',readFile)
});

function listaNums(){
    let valores = [];

    tabla.vector.forEach(nodo => {
        if(nodo != null){
            
            valores.push(nodo.clave);
            
            console.log("Indice: ",nodo.indice, "valores:",valores)
        }else{
            console.log("Indice:", null);
        }
    })

    return valores;
}
//-----------GUARDAR JSON-----------
function guardar(){
    velocidad = 10;

    let listaValores = listaNums();  
    
    var fileJ = {
        "categoria": "Estructura No Lineal",
        "nombre": "Tabla Hash Abierta",
        "m": tamano,
        "minimo": mini,
        "maximo": maxi,
        "funcion": func,
        "prueba": prueb,
        "animacion": 10,
        "valores":listaValores
    }

    let saveArchivo = new Blob([JSON.stringify(fileJ)],{type:"application/json"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(saveArchivo);
    a.download = "hashCerrado.json";
    a.click();
}

//-----------LIMPIAR PANTALLA-----------
function limpiar(){
    window.location.reload();
}

//-----------OBTENER VELOCIDAD-----------
function getVelocidad(){
    velocidad = document.getElementById("numVelocidad").value;
}

//-----------OBTENER TAMAÑO-----------
function getTam(){
    tamano = document.getElementById("numtamano");
    tam_tabla(tamano);
}
