$(document).ready(main);

class Pila {
    elementos = [];
    
    push = (elemento) => {
      return this.elementos.push(elemento);
    }
    pop = () => {
      return this.elementos.pop();
    }

    isempty = () => {
      return this.elementos.length === 0;
    }

    empty = () => {
      this.elementos.length = 0;
    }

    size = () => {
      return this.elementos.length;;
    }    
}
//----------------------------------------------------------------
let  json;
let pila = new Pila();
axm = [];
//--------------- Datos JSON ---------------------
let categoria = "Estructura Lineal";
let nombre = "Pila";
let repetir = true;
let animacion = 0;
//-------------------------------------------------
  function main () {
    
    
	$('.btn-Ingrese').click(function(){
        var porId = document.getElementById("valor");
        pila.push(porId.value)
        
        // Limpiar input
        porId.value ="";
        porId.focus();
        //pila.print();
        imprimir()
        //console.log(pila.print());
	});

    $('.btn-Elimina').click(function(){
        alert("Se elimino el elemento: " + pila.pop())
        imprimir()
	});

  $('.btn-Actualizar').click(function(){
    //alert("Actualizar")
    let datoactualizado= prompt('Por cual numero desea cambiar',0);
    alert("Se a actualizado");
    var porId = document.getElementById("valor").value;
    Actualizar(porId,datoactualizado);
    imprimir();
  });

  $('.btn-Buscar').click(function(){
    alert("Buscar") 
  });

  $('.btn-Guardar').click(function(){
    p_datos()
  });
   
	// Mostramos y ocultamos submenus
	$('.submenu').click(function(){
		$(this).children('.children').slideToggle();
	});
}

//---------------------------------------------------------------------
function imprimir(){
    console.log('------------ imprimir ------------');

    // ----------------- DOM JS ---------------------
    let capa = document.getElementById("capa");        
    let capa2 = document.getElementById("capa1");
    capa2.remove();
    var c1 = document.createElement("div");
    c1.setAttribute("id","capa1");
    capa.appendChild(c1);
    // ----------------- DOM JS ---------------------    
    
    for(a = 0; a < pila.elementos.length;a++){
        //console.log(pila.elementos[a]);
        var capa5 = document.getElementById("capa1");
        var h1 = document.createElement("button");
        h1.className = "sad";
        h1.setAttribute("name","mails[]");
        h1.innerHTML = pila.elementos[a];
        capa5.appendChild(h1);
    }
}

function Actualizar(dato,nuevo){
    for(a = 0; a < pila.elementos.length;a++){
        if (pila.elementos[a]== dato){
            pila.elementos[a] = nuevo;
            return;
        }        
    }
}
//-------------------------------------

// --------------------- Cargar Datos --------------------- 
function validarExt(){
  var input = document.getElementById('btn_Cargar');
  //------------------------------------------------------
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
        pila.push(json.valores[index]);
        imprimir();
      }
  }else if (json.repeticion == false){
      console.log("-------------------falso---------------------");
      for(index = 0; index<json.valores.length;index++){
          if(pila.elementos.includes(json.valores[index])== false){
              pila.push(json.valores[index]);
              imprimir();
          }
          else{
              console.log(json.valores[index]);
          }
      }
  }
};
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
function Datos_json(c,n,r,a,v){

  objeto = {
    "categoria": c,
    "nombre": n,
    "repeticion": r,
    "animacion": a,
    "valores": v
  }
  console.log(objeto);
  escritura(objeto,'Pila');
}
// ------------------------------------------------------
//--------------------------------Datos JSON -------------------
function p_datos(){
    //----------------------------------------------------
    if (pila.elementos.length == 0){
        alert("No se ha ingresado valores");
    }else{
        console.log('------------ Valores ------------');
        imprimir();        
        Datos_json(categoria,nombre,repetir,animacion,pila.elementos);
    }            
}