const dato = document.getElementById('dato')

const agregar = document.getElementById('agregar')
const ordenar = document.getElementById('ordenar')

const guardar = document.getElementById('guardar')
const cargar = document.getElementById('cargar')

const velocidad = document.getElementById("velocidad")

let nuevo = []
let original = []

let tiempo = 700;

var options = {
    legend: { display: false },
    scales: {
      yAxes: [{
        afterBuildTicks: (x) => {
          console.log(x)
        },
        ticks: {
          callback: (value) => {
            console.log(value)
            return value
          },
          beginAtZero: true
        },
      }]
    }
};
var ctx = document.getElementById("lienzo").getContext('2d')
var grafica = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['1', '2', '3'],
        datasets: [{
            data: [1, 2, 3],
            backgroundColor: 'rgb(240, 84, 84)',
        }]
    },
    options: options,
});

  
velocidad.oninput = () => {
    document.getElementById('numero').innerHTML = velocidad.value
    if(velocidad.value == 1) tiempo = 1000
    if(velocidad.value == 2) tiempo = 800
    if(velocidad.value == 3) tiempo = 700
    if(velocidad.value == 4) tiempo = 600
    if(velocidad.value == 5) tiempo = 500
}

const salida ={
    operasion: 'Ordenamiento burbuja',
    lista: []
}

agregar.addEventListener("click", (e) => {
    e.preventDefault()
    let color = []

    if(dato.value != ''){ 
        nuevo = dato.value.split(', ')
        original = nuevo
    }
    for(let i = 0; i < original.length; i ++) {
        color.push('rgb(240, 84, 84)')
    }
    grafica.data.labels = original
    grafica.data.datasets[0].data = original
    grafica.data.datasets[0].backgroundColor = color
    grafica.update()
})

ordenar.addEventListener("click", (e) => {
    e.preventDefault()
    if(dato.value != '' || nuevo.length > 0){  
        salida.lista = burbuja(nuevo, nuevo.length)   
    }
})

async function burbuja (lista, size){
    let aux;
    for (let i = 0; i<size-1; i ++) {
        grafica.data.datasets[0].backgroundColor[i] = 'rgb(48, 71, 94)'
        grafica.update()
        await new Promise(resolve => setTimeout(resolve, tiempo))

        for (let j = i+1; j < size; j++) {
            if(parseInt(lista[i]) > parseInt(lista[j])) {
                aux = lista[i];
                lista[i] = lista[j];
                lista[j] = aux;
            }
            grafica.data.labels = lista
            grafica.data.datasets[0].data = lista
            grafica.data.datasets[0].backgroundColor[j] = 'rgb(48, 71, 94)'
            grafica.update()
            await new Promise(resolve => setTimeout(resolve, tiempo))
            grafica.data.datasets[0].backgroundColor[j] = 'rgb(240, 84, 84)'
        }
        grafica.data.datasets[0].backgroundColor[i] = 'rgb(240, 84, 84)'
    }
    grafica.update()
    return lista
}


let archivo = document.getElementById('file')
let entrada;

archivo.addEventListener('change', () => {
    let leer = new FileReader()
    leer.readAsText(archivo.files[0])
    leer.onload = function() {
        entrada = JSON.parse(leer.result)
    }
    document.getElementById('mensaje').innerText = 'Se cargo el archivo con exito'
})

cargar.addEventListener("click", (e) => {
    e.preventDefault()

    let labels = []
    let color = []

    let lista_ingresada = []
    let valores = entrada["valores"]

    for (let i = 0; i < valores.length; i++) {
        lista_ingresada.push(valores[i])
        labels.push(valores[i])
        color.push('rgb(240, 84, 84)')
    }

    nuevo = lista_ingresada

    document.getElementById('mensaje').innerText = ''
    archivo.setAttribute('disabled', '')

    grafica.data.labels = labels
    grafica.data.datasets[0].data = labels
    grafica.data.datasets[0].backgroundColor = color
    grafica.update()
})

guardar.addEventListener("click", (e) => {
    e.preventDefault()
    let texto = JSON.stringify(salida)
    download('Burbuja.json', texto)
})

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}