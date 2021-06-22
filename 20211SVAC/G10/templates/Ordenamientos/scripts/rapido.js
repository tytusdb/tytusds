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
    console.log(nuevo)
})

ordenar.addEventListener("click", (e) => {
    e.preventDefault()
    if(dato.value != '' || nuevo.length > 0){
        salida.lista = rapido(nuevo, 0, nuevo.length - 1)       
    }
})

rapido = (lista, primero, ultimo) => {
    let central = parseInt((primero + ultimo) / 2)
    let pivote = lista[central]
    let aux
    let i = primero, j = ultimo

    console.log(`central ${central}`)
    console.log(`pivote ${pivote}`)
    console.log(`i ${i}`)
    console.log(`j ${j}`)   
    do {
        while (lista[i] < pivote) i++
        while (lista[j] > pivote) j--
        if (i <= j) {
            aux = lista[i]
            lista[i] = lista[j]
            lista[j] = aux
            i++
            j--
            this.interacion += 1
        }
    } while (i <= j) {
        if (primero < j) {
            this.rapido(lista, primero, j)
        }
        if (i < ultimo) {
            this.rapido(lista, i, ultimo)
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