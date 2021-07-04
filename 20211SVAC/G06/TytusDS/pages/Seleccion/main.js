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
$('#ordenar').on('click', () => Seleccion())
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
  download("Seleccion.json",JsonString);
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

async function Seleccion(){
  if(type == "number"){
    SeleccionNumbers()
  } else {
    SeleccionLabels()
  }
}

async function SeleccionLabels(){
  var speed = document.getElementById("formControlRange").value;
  speed = convertir(speed)
  for(let i = 0; i < MyChart.data.datasets[0].data.length; i++){
    MyChart.data.datasets[0].backgroundColor[i] = '#030106'
    MyChart.update()
    await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
    for(let j = i+1; j < MyChart.data.datasets[0].data.length; j++){
      if(MyChart.data.labels[i] > MyChart.data.labels[j]){
        let tmp = MyChart.data.datasets[0].data[j]
        MyChart.data.datasets[0].data[j] = MyChart.data.datasets[0].data[i]
        MyChart.data.datasets[0].data[i] = tmp
        //ahora lo mismo pero con string
        let tmp2 = MyChart.data.labels[j]
        MyChart.data.labels[j] = MyChart.data.labels[i]
        MyChart.data.labels[i] = tmp2
      }
      MyChart.data.datasets[0].backgroundColor[j] = '#030106'
      MyChart.update()
      await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
      MyChart.data.datasets[0].backgroundColor[j] = 'rgba(47, 3, 124 , 0.6)'
    }
    MyChart.data.datasets[0].backgroundColor[i] = 'rgba(47, 3, 124 , 0.6)'
  }
  MyChart.update()
}

async function SeleccionNumbers(){
  var speed = document.getElementById("formControlRange").value;
  speed = convertir(speed)
  for(let i = 0; i < MyChart.data.datasets[0].data.length; i++){
    MyChart.data.datasets[0].backgroundColor[i] = '#030106'
    MyChart.update()
    await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
    for(let j = i+1; j < MyChart.data.datasets[0].data.length; j++){
      if(MyChart.data.datasets[0].data[i] > MyChart.data.datasets[0].data[j]){
        let tmp = MyChart.data.datasets[0].data[j]
        MyChart.data.datasets[0].data[j] = MyChart.data.datasets[0].data[i]
        MyChart.data.datasets[0].data[i] = tmp
        //ahora lo mismo pero con string
        let tmp2 = MyChart.data.labels[j]
        MyChart.data.labels[j] = MyChart.data.labels[i]
        MyChart.data.labels[i] = tmp2
      }
      MyChart.data.datasets[0].backgroundColor[j] = '#030106'
      MyChart.update()
      await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
      MyChart.data.datasets[0].backgroundColor[j] = 'rgba(47, 3, 124 , 0.6)'
    }
    MyChart.data.datasets[0].backgroundColor[i] = 'rgba(47, 3, 124 , 0.6)'
  }
  MyChart.update()
}

function OrdenamientoLimpio(array){
  for(let i = 0; i < array.length; i++){
    for(let j = i+1; j < array.length; j++){
      if(array[i] > array[j]){
        let tmp = array[j]
        array[j] = array[i]
        array[i] = tmp
      }
    }
  }
  return array
}

function convertir(porcentaje){
  let result = (100 - porcentaje)*10
  if (result == 0){
    result = 50
  }
  return result
}