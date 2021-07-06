function dijkstra(inicio,fin) {
  console.log(listVertices.length);
busArist(inicio);
obtenerRecorrido(inicio,fin);
}
var visitados=[];
function busArist(x) {
  var peso=0;
  for (i = 0; i < listAristas.length; i++) {
    if (!listAristas[i].tomado) {
    if(listAristas[i].vertice1==x){

      peso=parseInt(listVertices[listAristas[i].vertice1].peso)+parseInt(listAristas[i].valor);
      console.log("--------------------");
      console.log(listVertices[listAristas[i].vertice1].peso);
      console.log(listAristas[i].valor);
      console.log(peso);
if (listVertices[listAristas[i].vertice2].peso==0) {
  listVertices[listAristas[i].vertice2].peso=peso;
  listVertices[listAristas[i].vertice2].padre=x;
}else if (listVertices[listAristas[i].vertice2].peso>peso) {
  listVertices[listAristas[i].vertice2].peso=peso;
  listVertices[listAristas[i].vertice2].padre=x;
}

listAristas[i].tomado=true;
visitados.push(listAristas[i].vertice2);

    }else if (listAristas[i].vertice2==x) {

      peso=parseInt(listVertices[listAristas[i].vertice2].peso)+parseInt(listAristas[i].valor);
if (listVertices[listAristas[i].vertice1].peso==0) {
  listVertices[listAristas[i].vertice1].peso=peso;
  listVertices[listAristas[i].vertice1].padre=x;
}else if (listVertices[listAristas[i].vertice1].peso>peso) {
  listVertices[listAristas[i].vertice1].peso=peso;
  listVertices[listAristas[i].vertice1].padre=x;
}

listAristas[i].tomado=true;
visitados.push(listAristas[i].vertice1);

}
}
  }
obtenerMenor();
}

function obtenerMenor(){
  var menor=-1;
  for (var i = 0; i < visitados.length; i++) {

if (menor=-1) {
      menor=i;
}else if(listVertices[visitados[i]].etiqueta.peso<listVertices[visitados[menor]].etiqueta.peso) {
      menor=i;
}
  }
  if (menor==-1) {
    return;
  }
  var temporal=visitados[menor];
  console.log(listVertices[visitados[menor]]);
  visitados.splice(menor, 1);
  busArist(temporal);
}

function obtenerRecorrido(inicio,fin){
var origen=true;
var padre;
var v1=fin;
while (origen) {
padre=listVertices[v1].padre;
pintarRecorrido(listVertices[v1],listVertices[padre],"red");
if (padre==inicio) {
  origen=false;
  break;
}
v1=padre;
console.log("en while");
}
}

function pintarRecorrido(vertice1,vertice2,color){
  ctx.lineWidth = 3;

  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(vertice1.posX, vertice1.posY);
  ctx.lineTo(vertice2.posX, vertice2.posY);

  ctx.stroke();
}
/*function agregarEtiqueta(arista){

var v1 = arista.vertice1;
var v2 = arista.vertice2;

for (var i = 0; i < listVertices[v2].etiqueta.length; i++) {
  listVertices[v2].etiqueta[i].padre;
}

  listVertices[arista.vertice2].etiqueta.push({"peso":arista.peso,"padre":arista.verti1});
}*/
