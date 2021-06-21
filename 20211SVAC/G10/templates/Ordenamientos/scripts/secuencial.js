const dato = document.getElementById('dato')
let nuevo = []

const agregar = document.getElementById('agregar')
const ordenar = document.getElementById('ordenar')

const guardar = document.getElementById('guardar')
const cargar = document.getElementById('cargar')

const velocidad = document.getElementById("velocidad")
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
    }
})

ordenar.addEventListener("click", (e) => {
    e.preventDefault()
    if(dato.value != '' || nuevo.length > 0){
        salida.lista = secuencial(nuevo, nuevo.length)         
    }
})

secuencial = (lista, size) => {
    let aux, menor;
    for (let i = 0; i < size - 1; i++) {
        menor = i
        for (let j = i + 1; j < size; j++) {
            if(lista[menor] > lista[j]) {
                menor = j
            }
        }
        aux = lista[i]
        lista[i] = lista[menor]
        lista[menor] = aux
        this.interacion += 1
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
    nuevo = lista_ingresada

    document.getElementById('mensaje').innerText = ''
    archivo.setAttribute('disabled', '')
})

guardar.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(salida)
})

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