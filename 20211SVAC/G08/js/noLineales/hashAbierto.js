//lista principal
class Nodo{
    constructor(indice){
        this.Lista = [];
        this.indice = indice;
    }
}

//lista de elementos
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
        posicion = Math.floor((this.size) * (id * this.constante % 1));
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
        //colocar(posicion, clave);

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

    buscar(elemento, pos){
        let nodo = this.vector[pos];
        let valor = "";
        let ret = false;

        
        for(let i = 0; i< nodo.Lista.length; i++){
            while(ret != true){
                valor = nodo.Lista[i];
                if(valor.clave == elemento){
                    ret = true;
                }else{
                    ret = false;
                }
            }
        }
        
        console.log(nodo.Lista.length);
        return true;
    }

    eliminar(elemento, pos){
        let nodo = this.vector[pos];
        let valor = "";
        let ret = false;

        
        for(let i = 0; i< nodo.Lista.length; i++){
            valor = nodo.Lista[i];
            if(valor.clave == elemento){
                nodo.Lista.splice(i,1);
            }else{
                ret = false;
            }
            
        }
        
        console.log(nodo.Lista.length);
        return true;
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

//-----------GUARDAR JSON-----------
const btn_Guardar = document.getElementById('guardar');
btn_Guardar.addEventListener('click', guardar);

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
let prueb;
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
    }
    
}

//-----------COLOCAR LOS CUADRITOS-----------
async function colocar(posi, letras){
    let div1 = document.getElementById("espacio");
    let div = div1.childNodes(posi);
    
    div.classList.add('cuadrito');
    div.textContent = letras;
    container.appendChild(div);
    await new Promise((resolve) =>
        setTimeout(() =>{
        resolve();
        }, (velocidad*200)) //delay
    ); 
    
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
        alert(elemento + " en el indice " + posicion);
    }
    else{
        console.log("---------->" + elemento + " no encontrado");
        alert(elemento + " no encontrado");
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
        alert(elemento + " eliminado");
    }
    else{
        console.log("---------->" + elemento + " no encontrado");
        alert(elemento + " no encontrado");
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
            prueb = convert.prueba;
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

function listaNums(){

    let valores = [];
    tabla.vector.forEach(nodo => {
        if(nodo != null){
            nodo.Lista.forEach(Llave => {
                valores.push(Llave.clave);
            })
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
