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
        salida.lista = rapido(nuevo, nuevo[0], nuevo[nuevo.length - 1])        
    }
})

rapido = (lista, primero, ultimo) => {
    let central = parseInt((primero + ultimo) / 2)
    let pivote = lista[central]
    let aux
    let i = primero, j = ultimo
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