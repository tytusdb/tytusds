var listVertices=[];
var listAristas=[];
var agrVertice=false;
var agrArista=false;
var vertice1=null;
var vertice2=null;

var ctx = document.getElementById("visor").getContext("2d");

function primero() {
  var titulo= "Árbol de recubrimiento mínimo";
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
prim(listVertices,listAristas);
}
function cargar() {

}
function guardar() {

}
function buscar() {
  var valorArista = document.getElementById('valorArista').value;
for (var i = 0; i < listAristas.length; i++) {
if (listAristas[i].valor==valorArista) {
  console.log(listAristas[i]);
  var vertice1=listAristas[i].vertice1;
  var vertice2=listAristas[i].vertice2;
  console.log(vertice1+" "+vertice2)
  console.log(listVertices[vertice1].posX+" "+ listVertices[vertice1].posY);
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

listVertices.push({"posX":x,"posY":y,"visitado":false});
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
var valorArista = document.getElementById('valorArista').value;
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
