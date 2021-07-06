document.getElementById('archcargado').addEventListener('change',cargdoc,false);
var llavepublica = document.getElementById('publica');
  var llaveprivada = document.getElementById('privada');


function primero() {
  var titulo= "Algoritmo RSA";
  document.getElementById('titulo').innerText=titulo;
  document.getElementById('titulo2').innerText=titulo;
}
function generateKeys() {
  var boton1 =document.getElementById('btncodificar');
  var boton2 =document.getElementById('btndecodificar');
  boton1.disabled = true;
    boton2.disabled = true;


  var sKeySize = 1000;
  var keySize = parseInt(sKeySize);
  var crypt = new JSEncrypt({ default_key_size: keySize });
  var async = true;
  var dt = new Date();
  var time = -(dt.getTime());

  if (async) {
      //$('#time-report').text('.');
      var load = setInterval(function () {
          //var text = $('#time-report').text();
          //$('#time-report').text(text + '.');
      }, 500);
      crypt.getKey(function () {
          clearInterval(load);
          dt = new Date();
          time += (dt.getTime());
          //$('#time-report').text('Generated in ' + time + ' ms');
          var privatekey = crypt.getPrivateKey();
          var publickey =crypt.getPublicKey();
          llavepublica.value= publickey;
          llaveprivada.value=privatekey;
          //console.log("Generadas 1- Privada: "+privatekey + " Publica: "+publickey);
          boton1.disabled = false;
          boton2.disabled = false;

      });
      return;
  }
  crypt.getKey();
  dt = new Date();
  time += (dt.getTime());
  //$('#time-report').text('Generated in ' + time + ' ms');
  var privatekey = crypt.getPrivateKey();
  var publickey =crypt.getPublicKey();

  llavepublica.value= publickey;
  llaveprivada.value=privatekey;
  boton1.disabled = false;
  boton2.disabled = false;

}










function codificar(){
var input = document.getElementById('codificar').value;

const encrypt = new JSEncrypt();
encrypt.setPublicKey(llavepublica.value);
const result = encrypt.encrypt(input);
document.getElementById('decodificar').value=result;
}

function decodificar(){
  var input = document.getElementById('codificar').value;

  const decrypt = new JSEncrypt();
  decrypt.setPrivateKey(llaveprivada.value);
  const text = decrypt.decrypt(input);
  document.getElementById('decodificar').value=text;
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
  console.log(e.target.result);
  output.textContent = e.target.result;
};
lector.readAsText(archivo);

}
