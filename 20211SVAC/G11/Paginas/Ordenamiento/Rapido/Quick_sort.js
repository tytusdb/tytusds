//------------------------------------------------------------
//--------------------------------------------------------------------
$(document).ready(main);

let array = [];
let  json;
//--------------- Datos JSON ---------------------
let categoria = "Estructura Lineal";
let nombre = "Ordenamiento";
let repetir = true;
let animacion = 0;
//-------------------------------------------------
function main () {
	$('#btnAgregar').click(function(){
        const porId = document.getElementById("numeros");
        const listaAgregar = document.getElementById('listaAgregar');
        array.push(Number(porId.value));
        console.log(array);
        //alert("Cola: " + array);
        const html = document.createElement('li');
        html.className = "list-group-item";
        html.textContent = Number(porId.value);
        listaAgregar.appendChild(html);

        // Limpiar input
        porId.value ="";
        porId.focus();
	});

  $('#btnOrdenar').click(function (){
    let listaOrdenar = document.getElementById('listaOrdenar');
    
    //---------------------------------------------------------------------
    
    console.log(quick(array));
    //---------------------------------------------------------------------    
  });

  $('#btnLimpiar').click(function(){
    while(listaAgregar.firstChild) {
        listaAgregar.removeChild(listaAgregar.firstChild);
    }

    while(listaOrdenar.firstChild){        
        listaOrdenar.removeChild(listaOrdenar.firstChild);
    }
    array=[];
  });

  $('#btn-Guardar').click(function(){
    //alert("Guardar")
    p_datos();
  });
   
	// Mostramos y ocultamos submenus
	$('.submenu').click(function(){
		$(this).children('.children').slideToggle();
	});
}

function dibujar(elem){
    const listaOrdenar = document.getElementById('listaOrdenar');  
    const html = document.createElement('span');
    html.className="text-danger fw-bold fs-6";
    html.textContent = `Valor Minimo:  ${elem}`;
    html.textContent = `Valor Minimo:  ${elem}`;
    listaOrdenar.appendChild(html);
}

function imprimir(Pivot){
    const listaOrdenar = document.getElementById('listaOrdenar'); 
    var fragment = new DocumentFragment();
    const ul =document.createElement('ul');
    ul.className = "list-group list-group-horizontal mt-2";
    ul.textContent = `Pivot ${Pivot}`;
    
    array.forEach((numero)=>{
        const li = document.createElement('li');
        li.className= "list-group-item";
        li.textContent = numero;
        fragment.appendChild(li);
    });
    ul.appendChild(fragment);
    listaOrdenar.appendChild(ul);
}

function quick(array){
    if (array.length == 0){
        return []
    }

    let mediumIndex = Math.floor(array.length / 2);
    let pivot = array[mediumIndex];
    
    let leftArray = [];
    let R_Array = [];

    for(let index = 0;index < array.length;index++){
        if(index != mediumIndex){
            if(array[index]>pivot){
                R_Array.push(array[index])
            }
            else{
                leftArray.push(array[index])
            }
        }        
    }
    leftArray = quick(leftArray);
    R_Array = quick(R_Array);
    imprimir(pivot)
    return leftArray.concat(pivot).concat(R_Array);        
}
//-------------------------------------------------------------------
function validarExt(){
    const listaAgregar = document.getElementById('listaAgregar');        
    var input = document.getElementById('btn_Cargar');
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
   // var json;
   // Aquí guardamos en una variable el resultado de parsear el JSON
    json = JSON.parse(e.target.result);
    // --------------------------------------------------------------
    categoria = json.categoria;
    nombre = json.nombre;
    repetir = json.repeticion;
    animacion = json.animacion;
    //------------------------------------------------------------------
    if (json.repeticion == true){
      for(i=0;i<json.valores.length;i++){
        array.push(json.valores[i]);
        //--------------------------------------
        const html = document.createElement('li');
        html.className = "list-group-item";
        html.textContent = json.valores[i];
        listaAgregar.appendChild(html);
        //-----------------------------------------
      }
    }
    else if(json.repeticion == false){
      for(index = 0; index<json.valores.length;index++){
        if(array.includes(json.valores[index])==false){
          //_-------------------------------
          array.push(json.valores[index]);
        //--------------------------------------
        
        const html = document.createElement('li');
        html.className = "list-group-item";
        html.textContent = json.valores[index];
        listaAgregar.appendChild(html);
        }
      }
      
    }
    console.log('---------------------------------------------');
    console.log(array);
    //----------------------------------------------------------------
     };
      reader.readAsText(file);
  }
  
//-----------------------------------------------------------------------
// --------------------- Guardar Datos ---------------------
  function escritura(data, filename){
    let file = new Blob([JSON.stringify(data)],{type:'application/json'});
    let a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = `${filename}.json`;
    a.click()
  }
//-------------------------------------------------
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
    escritura(objeto,'Ordenamiento_Rapido');
  }
//--------------------------------Datos JSON -------------------
  function p_datos(){
      if (array.length == 0){
          alert("No se ha ingresado valores");
      }else{
          console.log('------------ Valores ------------');
          Datos_json(categoria,nombre,repetir,animacion,array);
      }            
  }