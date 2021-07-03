$(document).ready(main);


function Queue(){
  
  this.dataStore = Array.prototype.slice.call(arguments, 0);
  this.enqueue = enqueue; 
  this.dequeue = dequeue;
  this.isEmpty = isEmpty;
  this.print = print;
  
  function enqueue (element) {
    this.dataStore.push(element);
  }
  
  function dequeue(){
    var priority = this.dataStore[0].priority;
    var priorizedItem = 0;
    this.dataStore.forEach(function (item, index ){
      if(item.priority < priority) {
        priority = item.priority;
        priorizedItem = index;
      }
    });

    return this.dataStore.splice(priorizedItem, 1)[0];
  }
  
  function isEmpty(){
    return this.dataStore.length == 0;  
  }
  
  function print(element){
    
    this.dataStore.map(function(patient){
      element.appendChild(patient.node);      
    });
  }
}

function Patient(name, priority){
  this.name = name; 
  this.priority = priority;
  this.time = Math.random()*10 + 3;
  var div = document.createElement("div");
  div.setAttribute("id", "patient-"+this.name);
  div.appendChild(document.createTextNode(this.name + "\n("+ this.priority+")"));
  //-----------------------------------------------------
  let am = {"valor": name,"prioridad": this.priority};
  axm.push(am);
  console.log(axm);
  //-----------------------------------------------------
  this.node =  div;
}

function printPatients(queue){
  var divQueue = document.getElementById("patients-queue");
  divQueue.innerHTML = "";
  queue.print(divQueue);
}

function addPatient(queue){
  var nameInput = document.getElementById("patient-name");
  var priorityInput = document.getElementById("patient-priority");
  if(nameInput.value.length!=0) queue.enqueue(new Patient(nameInput.value, priorityInput.value));
  nameInput.value = "";   
  priorityInput.value = "";
  printPatients(queue);
}

function nextPatient(queue){
  var current = document.getElementById("current-patient");
  current.innerHTML="";
  if(!queue.isEmpty()){
      var erased = queue.dequeue();
      current.appendChild(erased.node);
      printPatients(queue);
      setTimeout(attendPatient,  erased.time*1000);
  }
}

function attendPatient(queue){
    var current = document.getElementById("current-patient");
    current.innerHTML="";
}

//----------------------------------------------------------------
let  json;
let t = new Queue();
axm = [];
//--------------- Datos JSON ---------------------
let categoria = "Estructura Lineal";
let nombre = "Cola_Prioridad";
let repetir = true;
let animacion = 0;
let pos = "INICIO/FIN/ORDENADO";
//-------------------------------------------------

function main () {
    
	$('#add-patient').click(function(){
        addPatient(t);
	});
    $('#attend-patient').click(function(){
        nextPatient(t);
	});
    $('.btn-Guardar').click(function(){
    //alert('Guardar')
    console.log("Guardar");
  });
	// Mostramos y ocultamos submenus
	$('.submenu').click(function(){
		$(this).children('.children').slideToggle();
	});
}
//------------------------------------------------------------
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
  //--------------- Insertar Datos Masivos --------------------------
  console.log(json.repeticion);
  //console.log(json.valores);
  
  for(index = 0; index < json.valores.length;index++){
    console.log("Valor: "+json.valores[index].valor);  
    console.log("Prioridad: " +json.valores[index].prioridad);
    t.enqueue(new Patient(json.valores[index].valor, Number(json.valores[index].prioridad)));
  }
  printPatients(t);
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
  escritura(objeto,'Cola_Prioridad');
}
// ------------------------------------------------------
//--------------------------------Datos JSON -------------------
function p_datos(){
    //----------------------------------------------------
    if (queue.elementos.length == 0){
        alert("No se ha ingresado valores");
    }else{
        console.log('------------ Valores ------------');
        Datos_json(categoria,nombre,repetir,animacion,queue.elementos);
    }            
}