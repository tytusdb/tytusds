var type = "number"

var data = {
  /*labels: ["0", "1", "2", "3", "4", "5", "6"],
  datasets: [{
    label: "Mi arreglo",
    backgroundColor: [
      'rgba(47, 3, 124 , 0.6)',
      'rgba(47, 3, 124 , 0.6)',
      'rgba(47, 3, 124 , 0.6)',
      'rgba(47, 3, 124 , 0.6)',
      'rgba(47, 3, 124 , 0.6)',
      'rgba(47, 3, 124 , 0.6)',
      'rgba(47, 3, 124 , 0.6)'
    ],
    data: [65, 23, 80, 91, 70, 55, 40]
  }]*/
};

var options = {
  scales: {
    yAxes: [{
      afterBuildTicks: (x) => {
        console.log(x);
      },
      ticks: {
        callback: (value) => {
          console.log(value);
          return value;
        }
      },
    }]
  }
};

var ctx = document.getElementById("myChart");
var MyChart = new Chart(ctx, {
  type: 'bar',
  data: data,
  options: options
});

/*EVENTOS*/
$('#ordenar').on('click', () => Insercion())
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
  var categoria = "Estructura Lineal"
  var nombre = "Ordenamiento"
  var repetir = true;
  var speed = document.getElementById("formControlRange").value;
  //verificamos si son numeros o string
  var objeto
  if(type == "number"){
    objeto = {
      categoria: categoria,
      nombre: nombre,
      repeticion: repetir,
      animacion: speed/10,
      valores: MyChart.data.datasets[0].data
    }
  } else {
    objeto = {
      categoria: categoria,
      nombre: nombre,
      repeticion: repetir,
      animacion: speed/10,
      valores: MyChart.data.labels
    }
  }
  var JsonString = JSON.stringify(objeto);
  console.log(JsonString)
  download("Insercion.json",JsonString);
}

async function cargarJson(){
  type = "number"
  var objeto = null
  //Obtenemos el archivo 
  let upload = document.getElementById('formFileSm');
  let fr = new FileReader()
  fr.readAsText(upload.files[0])
  fr.onload = async function(){
    objeto = JSON.parse(fr.result)
    //SETEAMOS LA ANIMACION
    document.getElementById("formControlRange").value = (objeto.animacion*10).toString();
    //SETEAMOS LA GRAFICA
    let labels = []
    let backgroundColor = []
    let numeros = []
    for(let i = 0; i < objeto.valores.length; i++){
      labels.push(objeto.valores[i].toString()) 
      backgroundColor.push("rgba(47, 3, 124 , 0.6)")
      if(typeof objeto.valores[i] == 'number'){
        numeros.push(objeto.valores[i])
      } else {
        type = "string"
        numeros.push(10);
      }
    }
    MyChart.data = {
      labels: labels,
      datasets:[{
        label: "Ordenamiento",
        backgroundColor: backgroundColor,
        data:numeros
      }]
    }
    MyChart.update()
  }
}

async function Insercion(){
  if(type == "number"){
    InsercionNumbers()
  } else {
    InsercionLabels()
  }
}

async function InsercionLabels(){
  var speed = document.getElementById("formControlRange").value;
  speed = convertir(speed)
  for(let i = 1; i < MyChart.data.datasets[0].data.length; i++){
    /*Animacion*/
    MyChart.data.datasets[0].backgroundColor[i] = '#030106'
    MyChart.update()
    await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
    /*Animacion*/
    let key = MyChart.data.datasets[0].data[i]
    let keyLabel = MyChart.data.labels[i]
    let j = i-1
    while(j>=0 && MyChart.data.labels[j] > keyLabel){
      MyChart.data.datasets[0].data[j+1] = MyChart.data.datasets[0].data[j]
      MyChart.data.labels[j+1] = MyChart.data.labels[j]
      j = j-1
      /*Animacion*/
      MyChart.data.datasets[0].backgroundColor[j] = '#030106'
      MyChart.update()
      await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
      MyChart.data.datasets[0].backgroundColor[j] = 'rgba(47, 3, 124 , 0.6)'
      /*Animacion*/
    }
    MyChart.data.datasets[0].data[j+1] = key
    MyChart.data.labels[j+1] = keyLabel
    MyChart.data.datasets[0].backgroundColor[i] = 'rgba(47, 3, 124 , 0.6)'
  }
  MyChart.update()
}

async function InsercionNumbers(){
  var speed = document.getElementById("formControlRange").value;
  speed = convertir(speed)
  for(let i = 1; i < MyChart.data.datasets[0].data.length; i++){
    /*Animacion*/
    MyChart.data.datasets[0].backgroundColor[i] = '#030106'
    MyChart.update()
    await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
    /*Animacion*/
    let key = MyChart.data.datasets[0].data[i]
    let keyLabel = MyChart.data.labels[i]
    let j = i-1
    while(j>=0 && MyChart.data.datasets[0].data[j] > key){
      MyChart.data.datasets[0].data[j+1] = MyChart.data.datasets[0].data[j]
      MyChart.data.labels[j+1] = MyChart.data.labels[j]
      j = j-1
      /*Animacion*/
      MyChart.data.datasets[0].backgroundColor[j] = '#030106'
      MyChart.update()
      await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
      MyChart.data.datasets[0].backgroundColor[j] = 'rgba(47, 3, 124 , 0.6)'
      /*Animacion*/
    }
    MyChart.data.datasets[0].data[j+1] = key
    MyChart.data.labels[j+1] = keyLabel
    MyChart.data.datasets[0].backgroundColor[i] = 'rgba(47, 3, 124 , 0.6)'
  }
  MyChart.update()
}

function OrdenamientoLimpio(array){
  for(let i = 1; i < array.length; i++){
    let key = array[i]
    let j = i-1
    while(j>=0 && array[j] > key){
      array[j+1] = array[j]
      j = j-1
    }
    array[j+1] = key
  }
}

function convertir(porcentaje){
  let result = (100 - porcentaje)*10
  if (result == 0){
    result = 50
  }
  return result
}

function khe(){
 console.log("angel" < "antonio")
 console.log(parseInt("angel"))
}

khe()