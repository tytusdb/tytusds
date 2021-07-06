function primero(valor) {

  var titulo;
  if (valor=="row") {
  titulo= "Row-Major 2D a 1D";
}else if (valor=="col") {
  titulo= "Column-Major 2D a 1D";
}

  document.getElementById('titulo').innerText=titulo;
  document.getElementById('titulo2').innerText=titulo;
}


function crear() {
var filas= document.getElementById('filas').value;
var columnas= document.getElementById('columnas').value;

if ((filas<2)||(columnas<2)) {
  alert("La matriz debe ser mayor a 2 x 2");
  return;
}

var tabla = document.getElementById('tabla_inicio');

var crt = "<h4>Tabla Inicio</h4><table><tbody>";

var i,j;
for ( i = 0; i < filas; i++) {
crt = crt+"<tr>";
for (j = 0; j < columnas; j++) {
crt = crt + "<td><input id=\"t_"+i+"_"+j+"\" type=\"number\"></td>";
}
crt = crt+"</tr>";
}
crt = crt + "</tbody></table>";

tabla.innerHTML=crt;
  }
function columnMajor() {
  var tabla = document.getElementById('tabla_fin');
  var filas= document.getElementById('filas').value;
  var columnas= document.getElementById('columnas').value;
  var crt = "<h4>Tabla Resultado</h4><table class=\"table table-bordered\"><tbody><tr>";
var temp;
  var i,j;
  for (j = 0; j < columnas; j++) {
  for ( i = 0; i < filas; i++) {

    temp=document.getElementById("t_"+i+"_"+j).value;
  crt = crt + "<td><h5 class=\"text-white\">"+temp+"</h5></td>";
  }
  }
  crt = crt + "</tr></tbody></table>";

  tabla.innerHTML=crt;
}

function rowMajor() {
  var tabla = document.getElementById('tabla_fin');
  var filas= document.getElementById('filas').value;
  var columnas= document.getElementById('columnas').value;
  var crt = "<h4>Tabla Resultado</h4><table class=\"table table-bordered\"><tbody><tr>";
var temp;
  var i,j;
  for ( i = 0; i < filas; i++) {
  for (j = 0; j < columnas; j++) {
    temp=document.getElementById("t_"+i+"_"+j).value;
  crt = crt + "<td><h5 class=\"text-white\">"+temp+"</h5></td>";
  }
  }
  crt = crt + "</tr></tbody></table>";

  tabla.innerHTML=crt;
}
