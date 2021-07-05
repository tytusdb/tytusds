let resultado = ""

/*EVENTOS*/
$('#codificar').on('click', () => Codificar(document.getElementById("cadenita").value))
$('#cargar').on('click', () => cargarJson())
$('#guardar').on('click', () => guardarJson())

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function guardarJson(){
  download("LZW.txt",resultado);
}

async function cargarJson(){
  type = "number"
  //Obtenemos el archivo 
  let upload = document.getElementById('formFileSm');
  let fr = new FileReader()
  fr.readAsText(upload.files[0])
  fr.onload = async function(){
    let cadenita = fr.result
    console.log()
    Codificar(cadenita)
  }
}

function Codificar(inputValue){
  // Obtiene una referencia a la tabla
  var tableRef = document.getElementById("contenido");
  tableRef.innerHTML = "";
  let tablita = LZW(inputValue.toString())
  console.log(tablita)
  for(let i = 0; i < tablita.W.length; i++){
    let row = document.createElement("tr");
    //ingresamos la iteracion
    let iteracion = document.createElement("th");
    let iteracionText = document.createTextNode((i+1).toString());
    iteracion.appendChild(iteracionText)
    row.appendChild(iteracion)
    //ingresamos W
    let W = document.createElement("td");
    let WText = document.createTextNode(tablita.W[i]);
    W.appendChild(WText)
    row.appendChild(W)
    //ingresamos la K
    let K = document.createElement("td");
    let KText = document.createTextNode(tablita.K[i]);
    K.appendChild(KText)
    row.appendChild(K)
    //ingresamos la wK
    let WK = document.createElement("td");
    let WKText = document.createTextNode(tablita.WK[i]);
    WK.appendChild(WKText)
    row.appendChild(WK)
    //ingresamos el diccionario
    let Diccionario = document.createElement("td");
    var DiccionarioText
    if(tablita.Diccionario[i] == null){
      DiccionarioText = document.createTextNode("");
    } else {
      DiccionarioText = document.createTextNode(tablita.Diccionario[i].simbolo + " | " + tablita.Diccionario[i].index);
    }
    Diccionario.appendChild(DiccionarioText)
    row.appendChild(Diccionario)
    //ingresamos la wK
    let Salida = document.createElement("td");
    let SalidaText = document.createTextNode(tablita.Salida[i] == null? "" : tablita.Salida[i]);
    resultado = tablita.Salida[i] != null? resultado + " " + tablita.Salida[i].toString(2) : resultado
    Salida.appendChild(SalidaText)
    row.appendChild(Salida)
    //Ya metemos todo
    tableRef.appendChild(row)
  }
  console.log(resultado)
  document.getElementById("resultado").innerHTML = "<strong>Codificado: </strong>" + resultado;
}