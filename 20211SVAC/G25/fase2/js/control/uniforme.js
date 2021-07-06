var listVertices=[];
var listAristas=[];
var agrVertice=false;
var agrArista=false;
var vertice1=null;
var vertice2=null;

var letras=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

var ctx = document.getElementById("visor").getContext("2d");
//document.getElementById('vertice_input').addEventListener('change', cargarVertice, false);

function primero() {
  var titulo= "Costo Uniforme";
  document.getElementById('titulo').innerText=titulo;
  document.getElementById('titulo2').innerText=titulo;
}

$("#visor").click(function(e){
    getPosition(e);

});

function verVertices(){
  for (var i = 0; i < listVertices.length; i++) {
    console.log("Vertice: "+letras[i]+" Etiqueta: "+letras[listVertices[i].padre]+" Peso: "+listVertices[i].peso);

  }
}
function reset() {
  for (var i = 0; i < listAristas.length; i++) {
    listAristas[i].tomado=false;
    pintarRecorrido(listAristas[i].vertice1,listAristas[i].vertice2,"black");
  }
}

function resolver(){
var inicio = document.getElementById('vertInicio').value;
var fin = document.getElementById('vertFin').value;
var indInicio=-1;
var indFin=-1;
for (var i = 0; i < listVertices.length; i++) {
listVertices[i].peso=0;
listVertices[i].padre="";

  if (letras[i]==inicio) {
    indInicio=i;
  }
  if (letras[i]==fin) {
    indFin=i;
  }
  if ((indFin>=0)&&(indInicio>=0)) {
    break;
  }
}
if ((indFin==-1)||(indInicio==-1)) {
  alert("No se encontro un vertice");
  return;
}
dijkstra(indInicio,indFin);

}
function cargar() {

}
function cargarVertice(e) {
var archivo = e.target.files[0];
if (!archivo) {
  console.log("No hay archivo");
  return;
}

var lector = new FileReader();
lector.onload= function(e) {
  var contenido = e.target.result;
  listAristas=JSON.parse(contenido);
  console.log(listAristas);
  repintVertices();
}
lector.readAsText(archivo);
}

function repintVertices() {
  console.log(listVertices.length);
  for (var i = 0; i < listVertices.length; i++) {
    drawCoordinates(listVertices[i].posX,listVertices[i].posY,"black");
  }
}

function guardarAristas() {
  var texto = JSON.stringify(listAristas);
  document.getElementById('link_aristas').onclick = function(code) {
        this.href = 'data:text/plain;charset=utf-8,'
          + encodeURIComponent(texto);
      };
}
function guardarVertices() {
  var texto = JSON.stringify(listVertices);
  document.getElementById('link_vertices').onclick = function(code) {
        this.href = 'data:text/plain;charset=utf-8,'
          + encodeURIComponent(texto);
      };
      //guardarVertices()
}
function guardar(){
guardarVertices();
//guardarAristas();
}
function buscar() {
  var valorArista = document.getElementById('valorArista').value;
for (var i = 0; i < listAristas.length; i++) {
if (listAristas[i].valor==valorArista) {
  //console.log(listAristas[i]);
  var vertice1=listAristas[i].vertice1;
  var vertice2=listAristas[i].vertice2;
  //console.log(vertice1+" "+vertice2)
  //console.log(listVertices[vertice1].posX+" "+ listVertices[vertice1].posY);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "yellow";
  ctx.beginPath();
  ctx.moveTo(listVertices[vertice1].posX, listVertices[vertice1].posY);
  ctx.lineTo(listVertices[vertice2].posX, listVertices[vertice2].posY);
  ctx.stroke();
}

}
}

function getPosition(event){
  var rect  = visor.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  if (agrVertice) {
var indice = letras[listVertices.length];
//var etiqueta = new Array();
listVertices.push({"posX":x,"posY":y,"nodo":indice,"peso":0,"padre":""});
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
var valorArista = 0
valorArista = document.getElementById('valorArista').value;
if (valorArista<=0) {
  alert("Debe ingresar un valor a la Arista");
  return;
}

if (vertice1==i) {
  return;
}else if (vertice1>i) {
  vertice2=vertice1;
  vertice1=i;
}else {
  vertice2=i;
}
  comprobarArista(valorArista);
  break;
}
}
  }
}
function comprobarArista(valorArista){
var existe = false;
for (var i = 0; i < listAristas.length; i++) {
  if ((vertice1==listAristas[i].vertice1)&&(vertice2==listAristas[i].vertice2)) {
existe = true;
break;
  }
}

  if (!existe) {
listAristas.push({"vertice1":vertice1,"vertice2":vertice2,"valor":valorArista,"tomado":false});

    drawCoordinates(listVertices[vertice1].posX, listVertices[vertice1].posY,"black");
    drawCoordinates(listVertices[vertice2].posX, listVertices[vertice2].posY,"black");
var mediox = (listVertices[vertice2].posX-listVertices[vertice1].posX)/2+listVertices[vertice1].posX;
var medioy = (listVertices[vertice2].posY-listVertices[vertice1].posY)/2+listVertices[vertice1].posY;
          ctx.lineWidth = 3;

  				ctx.strokeStyle = "black";
  				ctx.beginPath();
  				ctx.moveTo(listVertices[vertice1].posX, listVertices[vertice1].posY);
  				ctx.lineTo(listVertices[vertice2].posX, listVertices[vertice2].posY);

  				ctx.stroke();
          ctx.fillStyle = "red";
          ctx.fillText(valorArista,mediox+2,medioy+2);
          vertice1=null;
          vertice2=null;
  }
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
