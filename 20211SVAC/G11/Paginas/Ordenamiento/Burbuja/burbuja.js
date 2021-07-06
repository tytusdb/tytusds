$(document).ready(main);

//----------------------------------------------------------------
let  json;
let array = [];
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
    const html = document.createElement('div');
    html.className = "est";
    html.textContent = Number(porId.value);
    listaAgregar.appendChild(html);

    // Limpiar input
    porId.value ="";
    porId.focus();
	});

  $('#btnOrdenar').click(function(){
    let aux;
    let listaOrdenar = document.getElementById('listaOrdenar');
    // Ordena los Elementos del Array  

    for(let i= 0; i< array.length;i++){
        for(let j = i + 1;j<array.length;j++){
            if(array[j]<array[i]){
                aux = array[j];
                array[j]= array[i];
                array[i] = aux;
                dibujar(array[j],array[i]);
                imprimir(i);                 
            }                        
        }      
    }
    console.log(array);
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
    p_datos();
  });
  
	// Mostramos y ocultamos submenus
	$('.submenu').click(function(){
		$(this).children('.children').slideToggle();
	});
}
//-----------------------------------------------------------

function dibujar(elem,elem2){
  const listaOrdenar = document.getElementById('listaOrdenar');
  const html = document.createElement('span');
  html.className = "text-danger fw-bold fs-6";
  html.textContent = `${elem} - ${elem2}`;
  listaOrdenar.appendChild(html);
}

function imprimir(i){
  const listaOrdenar = document.getElementById('listaOrdenar'); 
  var fragment = new DocumentFragment();
  const ul = document.createElement('ul');
  ul.textContent = `Iteracion ${i} `;

  array.forEach((numero)=>{
      const li = document.createElement('div');
      li.className = "ord";
      li.textContent = numero;
      fragment.appendChild(li);
  });
  ul.appendChild(fragment);
  listaOrdenar.appendChild(ul);
}

//--------------------------------------------------
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
      //console.log(json.valores[i]);
      const html = document.createElement('div');
      html.className = "est";
      html.textContent = json.valores[i];
      listaAgregar.appendChild(html);
      array.push(json.valores[i]);
    }
  }
  else if(json.repeticion == false){
    for(index = 0; index<json.valores.length;index++){
      if(array.includes(json.valores[index])==false){
        array.push(json.valores[index]);
        const html = document.createElement('div');
        html.className = "est";
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
  escritura(objeto,'Ordenamiento_Burbuja');
}
// ------------------------------------------------------
//--------------------------------Datos JSON -------------------
function p_datos(){
    //----------------------------------------------------
    if (array.length == 0){
        alert("No se ha ingresado valores");
    }else{
        console.log('------------ Valores ------------');
        Datos_json(categoria,nombre,repetir,animacion,array);
    }            
}