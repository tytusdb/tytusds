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
        let nuevo = new Nodo(dato)
        if (this.primero == null) {
            this.primero = nuevo;
            this.ultimo = this.primero;
            this.size++;
        } else {
            this.ultimo.siguiente = nuevo;
            this.ultimo = nuevo;
            this.size++;
        }

    }
    find_nodo(node){
        let aux = this.primero
        while (aux != null) {
           if (aux.siguiente != null) {
               if (aux.siguiente == node) {
                   return aux;
               }
           }
            aux = aux.siguiente;
        }
        return null
    }
    remove(dato) {
        let aux = this.primero;
       
        while(aux != null){
            if(aux.dato == dato){
                if (aux == this.primero) {
                    if (this.primero.siguiente != null) {
                        this.primero = this.primero.siguiente;
                    }else{
                        this.primero = null;
                    }
                }else{
                    let nuevo = this
                    if (aux.siguiente == null) {
                       let temp =nuevo.find_nodo(aux);
                        temp.siguiente = null;
                    }else{
                        let temp = nuevo.find_nodo(aux);
                        temp.siguiente = aux.siguiente; 
                    }
                }
                return;
            }
            aux = aux.siguiente;
        }
        

    }

    print() {
        var valores = []
        let aux = this.primero;
        let capa = document.getElementById("capa");        
        let capa2 = document.getElementById("capa1");
        capa2.remove();
        var c1 = document.createElement("div");
        c1.setAttribute("id","capa1");
        capa.appendChild(c1);
        
        
        while (aux != null) {
            valores.push(aux.dato);
            var capa5 = document.getElementById("capa1");
            var h1 = document.createElement("button");
            h1.className = "sad";
            h1.setAttribute("name","mails[]");
            //h1.style.width = '100px';
            //h1.setAttribute("height","100px");
            h1.innerHTML = aux.dato;
            capa5.appendChild(h1);
            aux = aux.siguiente;
        }

        return valores;
    }

    update(dato,nuevodato) {
        var valores = []
        let aux = this.primero;
        
        while (aux != null) {
            if (aux.dato == dato) {
                aux.dato = nuevodato;
                return;
            }
            aux = aux.siguiente;
        }

        return valores;
    }
    search(dato) {
        var valores = []
        let aux = this.primero;
        
        while (aux != null) {
            if (aux.dato == dato) {
                return aux.dato;
            }
            aux = aux.siguiente;
        }

        return " ";
    }

    //--------------------------------------------------------------------------------
    p_datos() {
        var valores = [];
        let aux = this.primero;
        //-----------------------------------------------------
        while (aux != null) {
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
    //--------------------------------------------------------------------------------
}
//----------------------------------------------------------------
let  json;
let nuevo = new Lista();
axm = [];
//--------------- Datos JSON ---------------------
let categoria = "Estructura Lineal";
let nombre = "Lista Simplemente/doblemente/circular_simplemente/circular doblemente Enlazada";
let repetir = true;
let animacion = 0;
let pos = "INICIO/FIN/ORDENADO";
//-------------------------------------------------

function main () {
    
	$('.btn-Ingrese').click(function(){
        var porId = document.getElementById("valor");
        nuevo.add(porId.value);
        axm.push(porId.value);
        nuevo.print();
        // Limpiar input
        porId.value ="";
        porId.focus();
	});
    
    $('.btn-Elimina').click(function(){
        var porId = document.getElementById("valor").value;       
        //axm.remove(porId);
        nuevo.remove(porId);
        nuevo.print();
        
	});
    
    $('.btn-Actualizar').click(function(){
        let datoactualizado= prompt('Por cual numero desea cambiar',0);
        alert("Se a actualizado");
        var porId = document.getElementById("valor").value;
        nuevo.update(porId,datoactualizado);
        nuevo.print();
	});
   
    $('.btn-Buscar').click(function(){
        var porId=document.getElementById("valor").value;
        var data = nuevo.search(porId);
        if (data == " ") {
            alert("Elemento no encontrado");
        }else{
            alert("El Elemento " + data + " Si existe en esta lista")
        }
        
	});

    $('.btn-Guardar').click(function(){
        nuevo.p_datos();
	});
   
	// Mostramos y ocultamos submenus
	$('.submenu').click(function(){
		$(this).children('.children').slideToggle();
	});
}

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
        
        //for(index = 0; index<json.valores.length;index++){
        //    axm.push(json.valores[index]);
        //}

        if (json.repeticion == true){
            console.log('Verdader');
            for(index = 0; index<json.valores.length;index++){
                nuevo.add(json.valores[index]);
                nuevo.print();
            }
            //Datos_json(json.categoria,json.nombre,json.repeticion,json.animacion,json.posicion,json.valores);
        }else if (json.repeticion == false){
            console.log("-------------------falso---------------------");
            for(index = 0; index<json.valores.length;index++){
                if(axm.includes(json.valores[index])== false){
                    axm.push(json.valores[index]);
                    nuevo.add(json.valores[index]);
                    nuevo.print();
                }
                else{
                    console.log(json.valores[index])
                }
            }
            //for(let xm = 0; xm < axm.length;xm++){

            //}
            //Datos_json();
        }
      };
      console.log(nuevo);
      reader.readAsText(file);
}
// --------------------- Guardar Datos ---------------------
// escritura(json,'ordenamiento');
function escritura(data, filename){
    let file = new Blob([JSON.stringify(data)],{type:'application/json'});
    let a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = `${filename}.json`;
    a.click()
    //console.log(a)
}
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
    escritura(objeto,'Lista_Simplemente_Enlazada');
}