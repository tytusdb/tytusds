class Node {
    constructor(dato) {
        this.dato = dato
        this.siguiente = null
        this.anterior = null
    }
}

class Hash {
    constructor() {
        this.m = null
        this.n = 0
        this.primero = null
        this.lista = []
    }

    crear(size){
        this.lista.splice(0, this.lista.length)
        this.m = size
        for(let i = 0; i < this.m; i++){
            this.lista.push(null)
        }
    }

    agregar(dato) {
        let nodo = new Node(dato)
        let indice = this.division(dato)
        if(this.lista[indice] == null) {
            //this.primero = nodo
            this.lista[indice] = nodo
        } else {
            let actual = this.lista[indice]
            while (actual.siguiente != null) {
                actual = actual.siguiente
            }
            actual.siguiente = nodo
            nodo.anterior = actual
        }
        console.log(this.lista)
    }

    buscar(dato) {
        let indice = this.division(dato)
        let actual = this.lista[indice]
        while (actual != null) {
            if (actual.dato == dato) {
                return actual.dato
            }
            actual = actual.siguiente
        }
        return false
    }

    //table.eliminar(table.division(dato.value), dato.value)
    eliminar(dato){
        console.log('Eliminar()')
        if (this.buscar(dato) != false) {
            let indice = this.division(dato)
            let actual = this.lista[indice]

            while (actual != null) {
                if(actual.dato == dato) {
                    if (actual.anterior == null) {
                        this.lista[indice] = actual.siguiente
                        actual.siguiente.anterior = null
                        
                    } else {
                        actual.anterior.siguiente = actual.siguiente
                        actual.siguiente.anterior = actual.anterior
                    }
                } 
                actual = actual.siguiente
            }
        }
    }

    actualizar(dato, nuevo) {
        let indice = this.division(dato)
        let nuevo_indice = this.division(nuevo)
        if (indice == nuevo_indice) {
            if (this.buscar(dato) != false) {
                let actual = this.lista[indice]
                while (actual != null) {
                    if(actual.dato == dato) {
                        console.log(`Se remplazo ${actual.dato} por ${nuevo}`)
                        actual.dato = nuevo
                    } 
                    actual = actual.siguiente
                }
            }
        }
    }

    division(numero){
        return Math.abs(numero) % this.m
    }

    mostrar(){
        let string = ''
        for(let i = 0; i < this.lista.length; i++) {
            let actual = this.lista[i]
            string += `${i}. `
            if(actual == -1) {
                string += ``
            }
            while (actual != null) {
                string += actual.dato
                string += '-> '
                actual = actual.siguiente
            }
            string += '\n'
        }
        console.log(string)
    }
}

const dato = document.getElementById('dato')
const size = document.getElementById('size')

let table = new Hash()

document.getElementById('agregar').addEventListener('click', () => {
    table.agregar(dato.value)
})

document.getElementById('crear').addEventListener('click', () =>{
    table.crear(size.value)
})

document.getElementById('buscar').addEventListener('click', () => {
    console.log(`el dato ${table.buscar(dato.value)} si esta`)
})

document.getElementById('eliminar').addEventListener('click', () => {
    table.mostrar()
    table.eliminar(dato.value)
    console.log('----------------------------------------')
    table.mostrar()
})



//Para convertir una cadena a codigo ascii
function atAscii(cadena) {
    resultado = 0
    for(let i = 0; i < cadena.length; i++) {
        resultado += cadena.charCodeAt(i)
    }
    return resultado
}