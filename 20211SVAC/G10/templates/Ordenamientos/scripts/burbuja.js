const dato = document.getElementById('dato')

const agregar = document.getElementById('agregar')
const ordenar = document.getElementById('ordenar')

const guardar = document.getElementById('guardar')
const cargar = document.getElementById('cargar')

const velocidad = document.getElementById("velocidad")

let nuevo = []
let original = []
let color = []

let num_velocidad;

velocidad.oninput = () => {
    document.getElementById('numero').innerHTML = velocidad.value
    num_velocidad = velocidad.value
}

const salida ={
    operasion: 'Ordenamiento burbuja',
    lista: []
}

agregar.addEventListener("click", (e) => {
    e.preventDefault()
    if(dato.value != ''){ 
        nuevo = dato.value.split(', ')
        original = nuevo
    }

    for(let i = 0; i < original.length; i ++) {
        color.push('rgb(240, 84, 84)')
    }
    animacion(original)
})

ordenar.addEventListener("click", (e) => {
    e.preventDefault()
    if(dato.value != '' || nuevo.length > 0){  
        salida.lista = burbuja(nuevo, nuevo.length)   
    }
    animacion(nuevo)
})

function burbuja (lista, size){
    let aux;
    for (let i = 0; i<size-1; i ++) {
        for (let j = i+1; j < size; j++) {

            if(lista[i] > lista[j]) {
                aux = lista[i];
                lista[i] = lista[j];
                lista[j] = aux;
            }
        }
    }
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
    let lista_ingresada = []
    let valores = entrada["valores"]

    for (let i = 0; i < valores.length; i++) {
        lista_ingresada.push(valores[i])
    }
    animacion(lista_ingresada)
    nuevo = lista_ingresada

    document.getElementById('mensaje').innerText = ''
    archivo.setAttribute('disabled', '')
})

guardar.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(salida)
})

//nuevo

//rgb(48, 71, 94)

function animacion(lista) {
    new Chart(document.getElementById("lienzo"), {
        type: 'bar',
        data: {
            labels: lista,
            datasets: [{
                backgroundColor: color,
                data: lista
            }]
        },
        options: {
            legend: {display: false},
            title: {
              display: true
            }
        }
    })
}