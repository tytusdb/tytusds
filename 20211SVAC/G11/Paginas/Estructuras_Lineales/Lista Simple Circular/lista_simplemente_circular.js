$(document).ready(main);

var contador = 1;


class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;       
    }
}

class Lista {

    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }

    add(dato) {
        let nuevo = new Nodo(dato);

        if (this.primero == null) {
            
        this.primero = nuevo;
        this.primero.siguiente = nuevo;
       
           
        }else if(this.primero.siguiente == this.primero){
            this.primero.siguiente = nuevo;
            nuevo.siguiente = this.primero;
        }
        else{
            
            let aux = this.primero.siguiente;
            while (aux != this.primero) {
                if (aux.siguiente == this.primero) {
                    nuevo.siguiente = this.primero;
                    aux.siguiente = nuevo;
                    return;
                    
                }
                aux = aux.siguiente;
            }
        }
    }

    find_dato(nodo){
        if (this.primero != null) {
            let aux = this.primero;
            if (this.primero.siguiente == nodo) {
                return this.primero;
            }
            aux = aux.siguiente;
            while (aux != this.primero) {
                if (aux.siguiente == nodo) {
                    return aux;
                }
                aux = aux.siguiente;
            }
    
            return valores;
        }
    }

    remove(dato) {
        if (this.primero != null) {
            
       
        let aux = this.primero
        if (this.primero.dato == dato) {
            if (this.primero.siguiente == this.primero) {
                this.primero = null;
            }else{
                let temp = this.find_dato(this.primero);
                this.primero = this.primero.siguiente;
                temp.siguiente = this.primero;
                
            }
            return;
        }
        aux = aux.siguiente;
        while(aux != this.primero){
            if(aux.dato == dato){
                let temp = this.find_dato(aux);
                temp.siguiente = aux.siguiente;
                return;
            }
            aux = aux.siguiente;
        }
        
    }
    return;
    }

    print() {
        //if (this.primero != null) {
        var valores = []
        let aux = this.primero;
        //------------------------------
        valores.push(aux.dato);
        console.log("Dato:", aux.dato);
        aux = aux.siguiente;
        // ----------------- DOM JS ---------------------
        let capa = document.getElementById("capa");        
        let capa2 = document.getElementById("capa1");
        capa2.remove();
        var c1 = document.createElement("div");
        c1.setAttribute("id","capa1");
        capa.appendChild(c1);
        // ----------------- DOM JS ---------------------
        while (aux != this.primero) {
            valores.push(aux.dato);
            // ----------------- DOM JS ---------------------
            var capa5 = document.getElementById("capa1");
            var h1 = document.createElement("button");
            h1.className = "sad";
            h1.setAttribute("name","mails[]");
            h1.innerHTML = aux.dato;
            capa5.appendChild(h1);
            // ----------------- DOM JS ---------------------            
            aux = aux.siguiente;
        }

        return valores;
        //}
    }
    //--------------------------------Datos JSON -------------------
    p_datos() {
        var valores = [];
        let aux = this.primero;
        aux = aux.siguiente;
        //-----------------------------------------------------
        while (aux != this.primero) {
            valores.push(aux.dato);
            aux = aux.siguiente;
        }
        //----------------------------------------------------
        
        if (valores.length == 0){
            alert("No se ha ingresado valores");
        }else{
            console.log('------------ Valores ------------');
            console.log(valores);
            this.print();        
            Datos_json(categoria,nombre,repetir,animacion,pos,valores);
        }            
        
        return valores;
    }
    //----------------------------------------------------------------------
}
//----------------------------------------------------------------------------------------------
// ------------------------- Variables Globales ----------------------
let nuevo = new Lista();
let  json;
axm = [];
//---------------------------- Datos JSON -----------------------------------------------------
let categoria = "Estructura Lineal";
let nombre = "Lista Simplemente/doblemente/circular_simplemente/circular doblemente Enlazada";
let repetir = true;
let animacion = 0;
let pos = "INICIO/FIN/ORDENADO";
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
function main () {
	$('.btn-Ingrese').click(function(){
        var porId=document.getElementById("valor").value;
        nuevo.add(porId)
        nuevo.print()
        porId.value ="";
        
        
	});
    $('.btn-Elimina').click(function(){
        var porId=document.getElementById("valor").value;
        nuevo.remove(porId)
        nuevo.print()
        nuevo.print()
	});

    $('.btn-Actualizar').click(function(){
        var porId = document.getElementById("valor").value;
        var existe = nuevo.search(porId)
        if (porId == "") {
            alert("Por favor ingrese un dato")
        }else if (existe == "") {
            alert("El Dato que desea actualizar no existe")
        }else{
            let datoactualizado= prompt('Por cual numero desea cambiar',0);
                nuevo.update(porId,datoactualizado)
                alert("Se a actualizado");
            
            
        }
        nuevo.print();
        
	});
   
    $('.btn-Buscar').click(function(){
        var porId = document.getElementById("valor").value;
        var existe = nuevo.search(porId)
        if (existe == "") {
            alert("El Elemento es Inexistente");
        }else{
            alert("El Elemento "+existe + " Si Existe")
        }
        
	});

    $('.btn-Guardar').click(function(){
        alert("Guardar");
        nuevo.p_datos();
	});
    
	// Mostramos y ocultamos submenus
	$('.submenu').click(function(){
		$(this).children('.children').slideToggle();
	});
}
//--------------------------------- Carga De Archivos 

// --------------------- Cargar Datos --------------------- 
function validarExt(){
    var input = document.getElementById('btn_Cargar');
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
    // Aquí guardamos en una variable el resultado de parsear el JSON
    json = JSON.parse(e.target.result);
    // --------------------------------------------------------------
    categoria = json.categoria;
    nombre = json.nombre;
    repetir = json.repeticion;
    animacion = json.animacion;
    pos = json.posicion;
    //--------------- Insertar Datos Masivos --------------------------
    console.log(json.repeticion);

    if (json.repeticion == true){
        console.log('Verdadero');
        for(index = 0; index<json.valores.length;index++){
            nuevo.add(json.valores[index]);
            //axm.push(json.valores[index]);            
        }
        console.log();
        nuevo.print();
        //Datos_json(json.categoria,json.nombre,json.repeticion,json.animacion,json.posicion,json.valores);
    }else if (json.repeticion == false){
        console.log("------falso-----");
        for(index = 0; index<json.valores.length;index++){
            if(axm.includes(json.valores[index])== false){
                axm.push(json.valores[index]);
                nuevo.add(json.valores[index]);
            }
            else{
                console.log(json.valores[index])
            }
        }
        nuevo.print();
    }
  };
  console.log(nuevo);
  reader.readAsText(file);
}
// --------------------- Guardar Datos ---------------------
function escritura(data, filename){
    let file = new Blob([JSON.stringify(data)],{type:'application/json'});
    let a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = `${filename}.json`;
    a.click()
}
//_-------------------------------------------------
let objeto;
// --------------------- Datos ---------------------
function Datos_json(c,n,r,a,p,v){

    objeto = {
        "categoria": c,
        "nombre": n,
        "repeticion": r,
        "animacion": a,
        "posicion": p,
        "valores": v
    }
    console.log(objeto);
    escritura(objeto,'Lista_Circular_Simplemente_Enlazada');
}