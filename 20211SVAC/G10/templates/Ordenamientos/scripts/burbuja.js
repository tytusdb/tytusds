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
        salida.lista = burbuja(nuevo, nuevo.length)        
    }
})

burbuja = (lista, size) => {
    let aux;
    for (let i = 0; i<size-1; i ++) {
        for (let j = i+1; j < size; j++) {
            if(lista[i] > lista[j]) {
                aux = lista[i];
                lista[i] = lista[j];
                lista[j] = aux;
            }
        }
        this.interacion += 1
    }
    return lista
}