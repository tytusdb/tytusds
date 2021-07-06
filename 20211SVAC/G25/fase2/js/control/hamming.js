document.getElementById('archcargado').addEventListener('change',cargdoc,false);

function primero() {
  var titulo= "Algoritmo Hamming";
  document.getElementById('titulo').innerText=titulo;
  document.getElementById('titulo2').innerText=titulo;
}

function codificar(){
var input = document.getElementById('codificar').value;
var retorno = hammingEncode(input);
document.getElementById('decodificar').value=retorno;
}
function decodificar(){
  var input = document.getElementById('codificar').value;
  var retorno = hammingDecode(input);
  document.getElementById('decodificar').value=retorno;
}
function check() {
  var input = document.getElementById('codificar').value;
  var retorno = hammingCheck(input);
    document.getElementById('decodificar').value=retorno;
}

function guardar(){
var texto = document.getElementById('decodificar').value;
document.getElementById('link').onclick = function(code) {
      this.href = 'data:text/plain;charset=utf-8,'
        + encodeURIComponent(texto);
    };
}

function cargdoc(e){
  //console.log(e);
  var archivo = e.target.files[0];
  if (!archivo) {
    console.log("No hay archivo");
    return;
  }

  var lector = new FileReader();
lector.onload = function(e){
  var output = document.getElementById('codificar');
  output.textContent = e.target.result;
};
lector.readAsText(archivo);

}
