  var hash = null;
function primero() {
  var titulo= "Tabla Hash Abierta";
  document.getElementById('titulo').innerText=titulo;
  document.getElementById('titulo2').innerText=titulo;



}

function agregar(){
  if (hash==null) {
    var tamano=document.getElementById('tamano').value;
    hash=new Hash(tamano);
    console.log("Creando nuevo:"+tamano);
  }
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
//console.log(hash.get(valor));
hash.showGet(valor);
}
function cargar(){

}
function guardar(){}
