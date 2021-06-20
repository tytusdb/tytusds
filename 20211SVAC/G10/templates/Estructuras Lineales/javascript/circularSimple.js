class Nodo {
    constructor(dato) {
        this.valor = dato;
        this.siguiente = null;
    }
}

class circularSimple {
    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }

    longitud() {
        return this.size;
    }

    agregar(dato) {
        let nodo = new Nodo(dato);        
        if (this.primero == null) {
 
            this.primero = this.ultimo = nodo;
            this.ultimo.siguiente = this.primero;

        } else {
            this.ultimo.siguiente = nodo;
            nodo.siguiente = this.primero;
            this.ultimo = nodo;
        }
        this.size += 1;
    }

    buscar(dato) {
        let actual = this.primero;

        for (let i=0; i < this.size; i++) {
            if (actual.valor == dato) {
                return actual.valor
            } 
            actual = actual.siguiente;
        }
        return false;
    }

    eliminar(dato) {
        let actual = this.primero;
        let anterior = null;

        if (this.buscar(dato)) {
            while (actual.valor != dato) {
                anterior = actual;               
                actual = actual.siguiente
            }

            if(actual == this.primero) {
                this.primero = actual.siguiente
                this.primero.siguiente = actual.siguiente.siguiente
                actual.siguiente = null
                this.ultimo.siguiente = this.primero

            } else if(actual == this.ultimo) {
                this.ultimo = anterior
                actual.siguiente = null
                this.ultimo.siguiente = this.primero

            } else {
                anterior.siguiente = actual.siguiente
                actual.siguiente = null
            }
            this.size -= 1;

            if (this.size == 0 ){
                this.primero = null;
                this.ultimo = null;
            }
        }else {
            console.log(`${dato} no existe en la lista`);
        }
    }

    actualizar(dato, nuevo) {
        let actual = this.primero;
        if (this.buscar(dato)) {
            while (actual.valor != dato) {             
                actual = actual.siguiente
            }
            console.log(`Se remplazo ${actual.valor} por ${nuevo}`);
            actual.valor = nuevo
        }else {
            console.log(`${dato} no existe en la lista`);
        }
    }

    index(dato) {
        if (this.buscar(dato)) {
            let actual = this.primero;
            let indice = 0;
            while (actual != null) {
                if (actual.valor == dato) {
                    return indice;
                } 
                actual = actual.siguiente;
                indice += 1;
            }
        } else {
            console.log(`${dato} no existe en la lista`)
            return -1;
        }        
    }

    mostrar() {
        let actual = this.primero;
        let string = ''
        if (this.primero != null) {
            for (let i=0; i<= this.size; i++) {
                if (i == this.size) {
                    string += actual.valor
                }else {
                    string += `${actual.valor} -> `
                }
                actual = actual.siguiente;
            }
            console.log(string);
        }
    }
}

const lista = new circularSimple()

const dato = document.getElementById('dato')

const agregar = document.getElementById('agregar')
const eliminar = document.getElementById('eliminar')
const actualizar = document.getElementById('actualizar')
const cambiar = document.getElementById('cambiar')
const buscar = document.getElementById('buscar')
const ver = document.getElementById('mostrar')


const salida ={
    operasion: 'Lista circular simple',
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