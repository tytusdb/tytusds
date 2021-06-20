class Nodo {
    constructor(dato) {
        this.valor = dato
        this.siguiente = null
        this.anterior = null
    }
}

class circularDoble {
    constructor() {
        this.primero = null
        this.ultimo = null
        this.size = 0
    }

    agregar(dato) {
        let nodo = new Nodo(dato)
        if (this.primero == null) {
            this.primero = this.ultimo = nodo
            this.ultimo.siguiente = this.primero
            this.primero.anterior = this.ultimo
        } else {
            this.ultimo.siguiente = nodo
            nodo.anterior = this.ultimo
            nodo.siguiente = this.primero
            this.primero.anterior = nodo
            this.ultimo = nodo
        }
        this.size += 1
    }

    buscar(dato) {
        if (this.localizado(dato)) {
            let actual = this.primero
            let indice = 0
            while (actual.valor != dato){
                actual = actual.siguiente
                indice += 1
            }
            console.log(`${actual.valor} en posicion ${indice}`)
            return actual.valor
        }
        return false
    }

    eliminar(dato) {
        let actual = this.primero
        if (this.localizado(dato)) {
            while (actual.valor != dato) {               
                actual = actual.siguiente
            }
            if(actual == this.primero) {
                this.primero = actual.siguiente
                this.primero.siguiente = actual.siguiente.siguiente
                actual.siguiente = null
                actual.anterior = null
                this.ultimo.siguiente = this.primero
                this.primero.anterior = this.ultimo

            } else if(actual == this.ultimo) {
                this.ultimo = actual.anterior
                actual.siguiente = null
                actual.anterior = null
                this.ultimo.siguiente = this.primero
                this.primero.anterior = this.ultimo

            } else {
                actual.anterior.siguiente = actual.siguiente
                actual.siguiente.anterior = actual.anterior
                actual.siguiente = null
                actual.anterior = null
            }
            this.size -= 1;

            if (this.size == 0 ){
                this.primero = null;
                this.ultimo = null;
            }

        } else {
            console.log(`${dato} no existe en la lista`);
        }
    }

    actualizar(dato, nuevo) {
        let actual = this.primero;
        if (this.localizado(dato)) {
            while (actual.valor != dato) {             
                actual = actual.siguiente
            }
            console.log(`Se remplazo ${actual.valor} por ${nuevo}`);
            actual.valor = nuevo
        }else {
            console.log(`${dato} no existe en la lista`);
        }
    }

    localizado(dato) {
        let actual = this.primero;
        for (let i=0; i < this.size; i++) {
            if (actual.valor == dato) {
                return true;
            } 
            actual = actual.siguiente;
        }
        return false;
    }

    mostrar() {
        let actual = this.primero;
        let string = '\n'
        if (this.primero != null) {
            for (let i=0; i<= this.size; i++) {
                if (i == this.size) {
                    string += actual.valor
                }else {
                    string += `${actual.valor} <=> `
                }
                actual = actual.siguiente;
            }
            console.log(string);
        }
    }
}

const lista = new circularDoble()

const dato = document.getElementById('dato')

const agregar = document.getElementById('agregar')
const eliminar = document.getElementById('eliminar')
const actualizar = document.getElementById('actualizar')
const cambiar = document.getElementById('cambiar')
const buscar = document.getElementById('buscar')
const ver = document.getElementById('mostrar')

const guardar = document.getElementById('guardar')
const cargar = document.getElementById('cargar')

const velocidad = document.getElementById("velocidad")
let num_velocidad;

velocidad.oninput = () => {
    document.getElementById('numero').innerHTML = velocidad.value
    num_velocidad = velocidad.value
}

const salida ={
    operasion: 'Lista circular doble',
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
    let valores = entrada["valores"]
    salida.lista = valores
    console.log(valores)
    for (let i = 0; i < valores.length; i++) {
        lista.agregar(valores[i])
    }
    document.getElementById('mensaje').innerText = ''
    archivo.setAttribute('disabled', '')
})

guardar.addEventListener("click", (e) => {
    e.preventDefault()
})
