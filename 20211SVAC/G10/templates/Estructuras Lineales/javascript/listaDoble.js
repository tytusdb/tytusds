class Nodo {
    constructor(dato) {
        this.valor = dato;
        this.siguiente = null;
        this.anterior = null;
    }
}

class listaDoble {
    constructor() {
        this.primero = null;
        this.size = 0
    }

    agregar(dato) {
        let nodo = new Nodo(dato)
        if (this.primero == null) {
            this.primero = nodo;
        }else {
            let actual = this.primero;
            while (actual.siguiente != null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nodo;
            nodo.anterior = actual;
        }
        this.size += 1;
    }

    eliminar(dato) {
        let actual = this.primero;

        while (actual != null) {
            if (actual.valor == dato) {
                if (actual.anterior == null) {

                    this.primero = actual.siguiente;
                    actual.siguiente.anterior = null;
                } else {
                    actual.anterior.siguiente = actual.siguiente;
                    actual.siguiente.anterior = actual.anterior;
                }
                this.size -= 1;
            }
            actual = actual.siguiente;
        }
        return false;
    }

    buscar(dato) {
        let actual = this.primero;

        while (actual != null) {
            if (actual.valor == dato) {
                return actual.valor
            } 
            actual = actual.siguiente;
        }
        return false;
    }

    actualizar(dato, nuevo) {
        let actual = this.primero;

        if (this.buscar(dato)) {
            while (actual != null) {
                if (actual.valor == dato) {
                    console.log(`Se remplazo ${actual.valor} por ${nuevo}`);
                    actual.valor = nuevo;
                }
                actual = actual.siguiente;
            }
        } else {
            console.log(`El dato: ${dato} no existe en la lista.`);
        }
    }

    mostrar() {
        let actual = this.primero;
        let string = ''
        for (let i = 0; i < this.size; i++) {
            string += actual.valor
            string += ' <=> '
            actual = actual.siguiente;
        }
        console.log(string)
    }
}

const lista = new listaDoble()

const dato = document.getElementById('dato')

const agregar = document.getElementById('agregar')
const eliminar = document.getElementById('eliminar')
const actualizar = document.getElementById('actualizar')
const cambiar = document.getElementById('cambiar')
const buscar = document.getElementById('buscar')
const ver = document.getElementById('mostrar')


const salida ={
    operasion: 'Lista enlazada doble',
    lista: []
}

agregar.addEventListener("click", (e) => {
    e.preventDefault()
    if(dato.value != ''){
        lista.agregar(dato.value)
        salida.lista.push(dato.value)
    }
})

eliminar.addEventListener("click", (e) => {
    e.preventDefault()
    if(dato.value != ''){
        lista.eliminar(dato.value)
        const indice = salida.lista.indexOf(dato.value)
        salida.lista.splice(indice, 1)
    }
})

actualizar.addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById('oculto').style.display = 'block'
    
})

buscar.addEventListener("click", (e) => {
    e.preventDefault()
    if(dato.value != ''){
        console.log(lista.buscar(dato.value))
    }
})

cambiar.addEventListener("click", (e) => {
    const nuevo = document.getElementById('dato2')
    if(dato.value != '' && nuevo.value != ''){
        lista.actualizar(dato.value, nuevo.value)
        const indice = salida.lista.indexOf(dato.value)
        salida.lista[indice] = nuevo.value
    }
    document.getElementById('oculto').style.display = 'none'
})


ver.addEventListener("click", (e) => {
    e.preventDefault()
    lista.mostrar()
    console.log(salida)
})