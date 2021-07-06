var listVertices=[];
var listAristas=[];
var agrVertice=false;
var agrArista=false;
var vertice1=null;
var vertice2=null;
var letras=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var arbol = new Arbol();


var ctx = document.getElementById("visor").getContext("2d");

function primero() {
  var titulo= "Busqueda en Anchura";
  document.getElementById('titulo').innerText=titulo;
  document.getElementById('titulo2').innerText=titulo;
}

$("#visor").click(function(e){

    getPosition(e);

});

function verVertices(){
  for (var i = 0; i < listVertices.length; i++) {
    console.log(listVertices[i].posX+"--"+listVertices[i].posY);
  }
}

function resolver(){
var arreglo=arbol.anchura();
var completo="Respuesta: ";
for (var i = 0; i < arreglo.length; i++) {
  completo = completo+arreglo[i]+" - ";
}
document.getElementById('respuesta').innerText=completo;
}
function cargar() {

}
function guardar() {

}
function buscar() {
var valorArista = document.getElementById('valorArista').value;
arbol.buscaranchura(valorArista);
}

function getPosition(event){
  var rect  = visor.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
if (agrVertice) {
var indice = letras[listVertices.length];
var temp = arbol.crearNodo(indice);

listVertices.push({"posX":x,"posY":y,"nodo":temp});
ctx.fillStyle = "red";
ctx.fillText(indice,x-15,y-15);
  drawCoordinates(x,y,"black");
}else if (agrArista) {
  obtCoordinates(x,y);
}
}

function obtCoordinates(x,y) {
  for (var i = 0; i < listVertices.length; i++) {
if ((x>listVertices[i].posX-15)&&(x<listVertices[i].posX+15)&&(y>listVertices[i].posY-15)&&(y<listVertices[i].posY+15)) {
if (vertice1==null) {
vertice1 = i;
drawCoordinates(listVertices[i].posX,listVertices[i].posY,"red");
break;
}else if (vertice2==null){
vertice2=i;
  comprobarArista(valorArista);
  break;
}
}
  }
}
function comprobarArista(valorArista){

var padre = listVertices[vertice1];
var hijo = listVertices[vertice2];
var existe=arbol.agregarHijo(padre,hijo);
  if (existe!=null) {

          ctx.lineWidth = 3;
  				ctx.strokeStyle = "black";
  				ctx.beginPath();
  				ctx.moveTo(listVertices[vertice1].posX, listVertices[vertice1].posY);
  				ctx.lineTo(listVertices[vertice2].posX, listVertices[vertice2].posY);
  				ctx.stroke();

  }else {
    alert("El nodo ya tiene 2 hijos");
  }
  drawCoordinates(listVertices[vertice1].posX, listVertices[vertice1].posY,"black");
  drawCoordinates(listVertices[vertice2].posX, listVertices[vertice2].posY,"black");
  vertice1=null;
  vertice2=null;
}

function drawCoordinates(x,y,color){
    var pointSize = 10; // Cambia el tamaño del punto

    ctx.fillStyle = color; // Color rojo
    ctx.beginPath(); // Iniciar trazo
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Dibujar un punto usando la funcion arc
    ctx.fill(); // Terminar trazo
}

function acVertice(){
  agrVertice=true;
  agrArista=false;
}
function acArista(){
  agrVertice=false;
  agrArista=true;
}
