
var vertices;
var aristas;
  var ctx = document.getElementById("visor").getContext("2d");

function prim(vertice,arista) {
  vertices=vertice;
  aristas=arista;
recorrerVertices();
}
function recorrerVertices() {
  for (var i = 0; i < vertices.length; i++) {
    if (!vertices[i].visitado) {
      console.log("entrando a vertice: "+i);
buscarMenorP1(i);
    }else {
      console.log("vertice ya visitado: "+i);
    }
  }
}

function buscarMenorP1(x) {
vertices[x].visitado=true;
var a = buscarMenorP2(x,false);
var b;
if (a==-1) {
  return;
}


if (aristas[a].vertice1==x) {
  b=buscarMenorP2(aristas[a].vertice2,true);
}else {
  b=buscarMenorP2(aristas[a].vertice1,true);
}

if (aristas[a].valor<aristas[b].valor) {
  aristas[a].tomado=true;
  pintarArista(aristas[a].vertice1,aristas[a].vertice2,"red");

if (aristas[a].vertice1==x) {
  vertices[aristas[a].vertice2].visitado=true;
  buscarMenorP1(aristas[a].vertice2);
}else {
  vertices[aristas[a].vertice1].visitado=true;
  buscarMenorP1(aristas[a].vertice1);
}


}else{
  aristas[b].tomado=true;
  pintarArista(aristas[b].vertice1,aristas[b].vertice2,"red");

  if (aristas[b].vertice1==x) {
    vertices[aristas[b].vertice2].visitado=true;
    buscarMenorP1(aristas[b].vertice2);
  }else {
    vertices[aristas[b].vertice1].visitado=true;
    buscarMenorP1(aristas[b].vertice1);
  }
}


}

function buscarMenorP2(x,estado) {
  //x = vertice
  //estado visitado/no visitado
  var menor = -1;
  var i;
  for (i = 0; i < aristas.length; i++) {
    if(aristas[i].vertice1==x){
      if (vertices[aristas[i].vertice2].visitado==estado) {
        if (!aristas[i].tomado) {
          if (menor==-1){
            menor=i;
          }else if (aristas[i].valor<aristas[menor].valor) {
            menor=i;
          }
        }
      }
    }else if (aristas[i].vertice2==x) {
      if (vertices[aristas[i].vertice1].visitado==estado) {
        if (!aristas[i].tomado) {
          if (menor==-1){
            menor=i;
          }else if (aristas[i].valor<aristas[menor].valor) {
            menor=i;
          }
        }
      }
    }
  }
return menor;
}



function pintarArista(vertice1,vertice2,color) {

  ctx.strokeStyle =color;
  ctx.beginPath();
  ctx.moveTo(vertices[vertice1].posX, vertices[vertice1].posY);
  ctx.lineTo(vertices[vertice2].posX, vertices[vertice2].posY);
  ctx.stroke();

}
