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
        salida.lista = insercion(nuevo, nuevo.length)        
    }
})

insercion = (lista, size) => {
    let aux, j
    for(let i = 0; i < size; i++) {
        j = i
        aux = lista[i]
        while (j > 0 && lista[j-1] > aux) {
            lista[j] = lista[j - 1]
            j--
        }
        lista[j] = aux
        this.interacion += 1
    }
    return lista
}