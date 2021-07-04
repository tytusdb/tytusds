class Nodo{
    constructor(indice){
        this.Lista = [];
        this.indice = indice;
    }
}

class Llave{
    constructor(clave, valor){
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
        if(posicion > this.size){
            return posicion - this.size;
        }
        return posicion;
    }

    funcionHash_multipli(id){
        let posicion = 0;
        posicion = Math.floor((this.size) * (id * this.cte % 1));
        console.log(posicion);
        if (posicion > this.size-1){
            return posicion - (this.size-1);
        }else{
            return posicion;
        }
    }

    funcionHash_simple(id){
        while ((id > 1) || (id == 0)){
            id = id/10
        }
        let posicion = Math.floor(id * this.size-1)
        if (posicion > this.size){
            return posicion - this.size
            
        }else{
            return posicion
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

        if(this.vector[posicion] != null){
            this.vector[posicion].Lista.push(new Llave(clave, valor));
        }else{
            let nodo = new Nodo(posicion);

            nodo.Lista.push(new Llave(clave, valor));
            this.vector[posicion] = nodo;
            this.elementos++;
            this.porcentaje = (this.elementos / this.size)*100;
        }

        if(this.porcentaje > this.max){
            this.reHashing();
        }
    }

    reHashing(){
        let siguiente = this.size;
        let factor = 0;

        while(factor <= this.minimo){
            siguiente++;
            factor = (this.elementos/siguiente)*100;
        }

        let vectorTemporal = [];
        this.elementos = 0;

        for(let i = 0; i<siguiente; i++){
            vectorTemporal.push(null);
        }

        let vectorAux = this.vector;

        this.vector = vectorTemporal;
        this.size = siguiente;

        vectorAux.forEach(nodo => {
            if(nodo != null){
                nodo.Lista.forEach(Llave =>{
                    this.insertar(this.valorASCII(Llave.clave), Llave.clave, Llave.valor);
                })
            }
            
        })
    }

    buscar(elemento){
        let valores = "";
        this.vector.forEach(nodo => {
            valores ="";
            nodo.Lista.forEach(Llave => {
                valores = Llave.clave

            })
            
        })
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
                valores ="";
                nodo.Lista.forEach(Llave => {
                    valores += "|"+Llave.clave + ", " +Llave.valor
                })
                console.log("Indice: ",nodo.indice, "valores:",valores)
            }else{
                console.log("Indice:", null);
            }
        })
    }
}
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
var THashA = new Hash();
let maxi;
let mini;
let func;
let val_fun;
let tabla = new Hash(tamano, mini, maxi);

//-----------MOSTRAR TABLA HASH-----------
function tam_tabla(valor){
    let arreglo = valor;
    for (let i = 0; i < arreglo; i++){
        // Creando los cuadros y agregandole el elemento ingresado
        const div = document.createElement("div");
        div.classList.add('cuadrito');
        div.textContent = i;
        container.appendChild(div);

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

}

//-----------BUSCAR ELEMENTO-----------
function buscar(){
    let elemento = document.getElementById("elemento").value;

    
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
            //let tabla = new Hash(tamano, mini, maxi);
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
        "direccionamiento": "Abierto",
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
    a.download = "hashAbierto.json";
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
