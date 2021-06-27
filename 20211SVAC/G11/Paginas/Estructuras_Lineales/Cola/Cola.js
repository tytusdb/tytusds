$(document).ready(main);

class Cola {
    constructor(){
        this.elementos = [];
    }    
    
    encolar(elemento){
      this.elementos.push(elemento);
      return this.elementos;
    }

    desencolar(){
      return this.elementos.shift();
    }

    peek(){
        return this.elementos[0];
    }

    size(){
        return this.elementos.length;;
    }

    isEmpty = () => {
      return this.elementos.length === 0;
    }

    print(){
        return this.elementos;
    }    
  }
//----------------------------------------------------------------
let  json;
let queue = new Cola();
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
        let porId = document.getElementById("valor");
        queue.encolar(porId.value);
        imprimir();
        // Limpiar input
        porId.value ="";
        porId.focus();
	});

  $('.btn-Elimina').click(function(){
        queue.desencolar()
        imprimir()
	});

  $('.btn-Actualizar').click(function(){
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
//-----------------------------------------------------------

function Actualizar(dato,nuevo){
  for(a = 0; a < queue.elementos.length;a++){
      if (queue.elementos[a]== dato){
          queue.elementos[a] = nuevo;
          return;
      }        
  }
}
//---------------------------------------------------------------------
function imprimir(){
  //console.log('------------ imprimir ------------');
  // ----------------- DOM JS ---------------------
  let capa = document.getElementById("capa");        
  let capa2 = document.getElementById("capa1");
  capa2.remove();
  var c1 = document.createElement("div");
  c1.setAttribute("id","capa1");
  capa.appendChild(c1);
  // ----------------- DOM JS ---------------------    
  
  for(a = 0; a < queue.elementos.length;a++){
      //console.log(queue.elementos[a]);
      var capa5 = document.getElementById("capa1");
      var h1 = document.createElement("button");
      var h2 = document.createElement('button');
      h1.className = "sad";
      h2.className = "ord";
      h1.setAttribute("name","mails[]");
      h1.innerHTML = queue.elementos[a];
      h2.innerHTML = "-";      
      capa5.appendChild(h1);
      capa5.appendChild(h2);
  }
}

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
        queue.encolar(json.valores[index]);
        imprimir();
      }
  }else if (json.repeticion == false){
      console.log("-------------------falso---------------------");
      for(index = 0; index<json.valores.length;index++){
          if(queue.elementos.includes(json.valores[index])== false){
              queue.encolar(json.valores[index]);
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
//------------------------------------------
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
  escritura(objeto,'Cola');
}
// ------------------------------------------------------
//--------------------------------Datos JSON -------------------
function p_datos(){
    //----------------------------------------------------
    if (queue.elementos.length == 0){
        alert("No se ha ingresado valores");
    }else{
        console.log('------------ Valores ------------');
        imprimir();        
        Datos_json(categoria,nombre,repetir,animacion,queue.elementos);
    }            
}