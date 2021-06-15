const dato = document.getElementById('dato')
let nuevo = []

const agregar = document.getElementById('agregar')
const ordenar = document.getElementById('ordenar')

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
    if(dato.value != ''){
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