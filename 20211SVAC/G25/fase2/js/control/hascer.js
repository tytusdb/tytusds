  var hash = new Hash();

function primero() {
  var titulo= "Tabla Hash Cerrada";
  document.getElementById('titulo').innerText=titulo;
  document.getElementById('titulo2').innerText=titulo;
}

function agregar(){
var valor=document.getElementById('valor').value;

console.log(valor);
hash.insert(valor,valor);
hash.show();
}

function eliminar(){

}

function actualizar(){
hash.show();
}
function buscar(){
  var valor=document.getElementById('valor').value;
  hash.showGet(valor);
  /*var valor=document.getElementById('valor').value;
//console.log(hash.get(valor));

*/}
function cargar(){

}
function guardar(){}
