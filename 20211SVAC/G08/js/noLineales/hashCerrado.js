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
        this.porcentaje = 0.0;
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
        this.porcentaje = this.elementos/this.size;

        if(this.porcentaje > this.max){
            this.reHashing(fun);
        }
    }

    reHashing(fun){
        let siguiente = this.size;
        let factor = 0;

        while(factor < this.minimo){
            factor = this.elementos/siguiente;
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
                
                this.print("nueva posicion:", posicion);
                nodo.indice = posicion;
                vectorTemporal[posicion] = nodo;
            }
            
        })

        this.vector = vectorTemporal;
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
let tabla = new Hash(tamano, mini, maxi);

//-----------MOSTRAR TABLA HASH-----------
async function tam_tabla(valor){
    let arreglo = valor;
    for (let i = 0; i < arreglo; i++){
        // Creando los cuadros y agregandole el elemento ingresado
        const div = document.createElement("div");
        div.classList.add('cuadrito');
        div.textContent =(i+"||");
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
    let elemento2 = tabla.valorASCII(elemento);
    let posicion;
    var cod = document.getElementById("funcion").value;
    
    if(cod === "division"){
        posicion = tabla.funcionHash_division(elemento2);
    }else if (cod === "multiplicacion"){
        posicion = tabla.funcionHash_division(elemento2);
    }else{
        posicion = tabla.funcionHash_simple(elemento2);
    }
    let busqueda = tabla.buscar(elemento, posicion);
    if (busqueda == true){
        console.log("---------->" + elemento + " en el indice " + posicion);
    }
    else{
        console.log("---------->" + elemento + " no encontrado");
    }
    
}

//-----------ELIMINAR ELEMENTO-----------
function eliminar(){
    let elemento = document.getElementById("elemento").value;
    let elemento2 = tabla.valorASCII(elemento);
    let posicion;
    var cod = document.getElementById("funcion").value;
    
    if(cod === "division"){
        posicion = tabla.funcionHash_division(elemento2);
    }else if (cod === "multiplicacion"){
        posicion = tabla.funcionHash_division(elemento2);
    }else{
        posicion = tabla.funcionHash_simple(elemento2);
    }
    let busqueda = tabla.eliminar(elemento, posicion);
    if (busqueda == true){
        console.log("---------->" + elemento + " eliminado");
    }
    else{
        console.log("---------->" + elemento + " no encontrado");
    }

    tabla.print();
    
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
            tam_tabla(tamano);
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
            tabla.print();
            console.log(tabla.porcentaje);
            agregarFile();
        };
        reader.readAsText(archivo); 

    } else {
        alert("No se ha seleccionado ningun archivo");
    }
}

window.addEventListener('load', ()=>{ // cada vez que cambie 
    document.getElementById('file').addEventListener('change',readFile)
});

//-----------AGREGAR ELEMENTOS - JSON-----------
async function agregarFile(){
    velocidad = 10;
    
    for(let i = 0; i < tamano.length; i++){
        // Creando los cuadros y agregandole el elemento ingresado
        const div = document.createElement("div");
        div.classList.add('cuadrito');
        div.textContent = Llave.clave;
        container.appendChild(div);
        await new Promise((resolve) =>
            setTimeout(() =>{
            resolve();
            }, (velocidad*200)) //delay
        ); 
        
    }
}

function listaNums(numso){
    let hola = [];
    for (let i = 0; i < numso.length; i++){
        hola.push(parseInt(numso[i]));

    }
    return hola;
}
//-----------GUARDAR JSON-----------
function guardar(){
    velocidad = 10;
    var content = cola.imprimir().split(",");
    if (tipoDato == 'number'){
        content = listaNums(content);
    } 
    
    var fileJ = {
        "categoria": "Estructura No Lineal",
        "nombre": "Tabla Hash",
        "direccionamiento": "Cerrado",
        "metodo": "Multiplicacion",
        "resolucion": "Lineal",
        "size": tamano,
        "constante":0.1625277911,
        "minimo": 45,
        "maximo":85,
        "animacion":5,
        "tipo": "String/Integer",
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
