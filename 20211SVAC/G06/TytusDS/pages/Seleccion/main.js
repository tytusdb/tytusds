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

async function cargarJson(){
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
    for(let i = 0; i < objeto.valores.length; i++){
      labels.push(i.toString()) 
      backgroundColor.push("rgba(47, 3, 124 , 0.6)")
    }
    MyChart.data = {
      labels: labels,
      datasets:[{
        label: "Ordenamiento",
        backgroundColor: backgroundColor,
        data:objeto.valores
      }]
    }
    MyChart.update()
  }
}

async function Seleccion(){
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
      }
      MyChart.data.datasets[0].backgroundColor[j] = '#030106'
      MyChart.update()
      await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
      MyChart.data.datasets[0].backgroundColor[j] = 'rgba(47, 3, 124 , 0.6)'
    }
    MyChart.data.datasets[0].backgroundColor[i] = 'rgba(47, 3, 124 , 0.6)'
  }
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