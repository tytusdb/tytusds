class Node {
    constructor(codigo, dato) {
        this.codigo = codigo
        this.dato = dato
        this.siguiente = null
        this.anterior = null
        this.elemento = 0
    }
}

class Hash {
    constructor() {
        this.m = null
        this.n = 0
        this.constante_a = 0.1625277911
        this.primero = null
        this.lista = []
        this.funcion = 'division'
    }

    crear(size){
        this.lista.splice(0, this.lista.length)
        this.m = size
        for(let i = 0; i < this.m; i++){
            this.lista.push(null)
        }
    }

    atAscii(cadena) {
        let resultado = 0
        for(let i = 0; i < cadena.length; i++) {
            resultado += cadena.charCodeAt(i)
        }
        return resultado
    }

    agregar(dato) {
        let codigo = this.set_key(dato)
        let nodo = new Node(codigo, dato)
        let indice = this.funcionHash(codigo, this.funcion)
        if(this.lista[indice] == null) {
            this.lista[indice] = nodo
        } else {
            let actual = this.lista[indice]
            while (actual.siguiente != null) {
                actual = actual.siguiente
            }
            actual.siguiente = nodo
            nodo.anterior = actual
        }
        this.lista[indice].elemento += 1
    }

    set_key(dato) {
        let codigo = dato
        if (isNaN(dato)) {
            codigo = this.atAscii(dato)
        }
        return codigo
    }

    buscar(dato) {
        let codigo = this.set_key(dato)
        let indice = this.funcionHash(codigo, this.funcion)
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
        let codigo = this.set_key(dato)
        
        if (this.buscar(dato) != false) {
            let indice = this.funcionHash(codigo, this.funcion)
            let actual = this.lista[indice]
            while (actual != null) {
                if(actual.dato == dato) {
                    if (actual.anterior == null) {
                        this.lista[indice] = actual.siguiente
                        actual.siguiente.anterior = null

                    } else if (actual.siguiente == null) {
                        actual.anterior.siguiente = null
                        actual.anterior = null
                    } else {
                        actual.anterior.siguiente = actual.siguiente
                        actual.siguiente.anterior = actual.anterior
                    }
                } 
                actual = actual.siguiente
            }
            this.lista[indice].elemento -= 1
        }        
    }

    actualizar(dato, nuevo) {
        let codigo = this.set_key(dato)
        let nuevo_codigo = this.set_key(nuevo)

        let indice = this.funcionHash(codigo, this.funcion)
        let nuevo_indice = this.funcionHash(nuevo_codigo, this.funcion)

        if (this.buscar(dato) != false) {
            let actual = this.lista[indice]
            while (actual != null) {
                if(actual.dato == dato) {
                    this.eliminar(dato)
                    this.agregar(nuevo)
                    console.log(`Se actualiza el dato |${actual.codigo}: ${actual.dato}| por |${nuevo_codigo}: ${nuevo}|`)
                }
                actual = actual.siguiente
            }
        }
    }

    funcionHash(numero, funcion) {
        if (funcion == 'simple') {
            return this.simple()
        } else if (funcion == 'multiplicacion') {
            return this.multiplicacion(numero)
        } else {
            return this.division(numero)
        }
    }

    simple() {
        return Math.round(Math.random() * this.size)
    }

    division(numero) {
        return Math.abs(numero) % this.m
    }

    multiplicacion(numero) {
        return Math.round(this.m * (Math.abs(numero) * this.constante_a % 1))
    }

    set_constante(numero) {
        this.constante_a = numero
    }

    set_funcion(funcion) {
        this.funcion = funcion
    }

    mostrar(){
        let string = ''
        let cantidad
        for(let i = 0; i < this.lista.length; i++) {
            let actual = this.lista[i]
            string += `[${i}] `
            if(actual == null) {
                string += `-1`
                cantidad = 0
            }
            while (actual != null) {
                string += `|${actual.codigo}: ${actual.dato}|`
                string += '-> '
                actual = actual.siguiente
                cantidad = this.lista[i].elemento
            }
            string += ` (${cantidad} elementos)\n`
        }
        console.log(string)
    }
}

const dato = document.getElementById('dato')
const size = document.getElementById('size')
const nuevo = document.getElementById('dato2')

let table = new Hash()

document.getElementById('agregar').addEventListener('click', () => {
    table.agregar(dato.value)
    table.mostrar()
})

document.getElementById('crear').addEventListener('click', () =>{
    table.crear(size.value)
})

document.getElementById('buscar').addEventListener('click', () => {
    console.log(`el dato ${table.buscar(dato.value)} si esta`)
})

document.getElementById('eliminar').addEventListener('click', () => {
    table.eliminar(dato.value)
    table.mostrar()
})

document.getElementById('actualizar').addEventListener('click', () => {
    document.getElementById('oculto').style.display = 'block'
})

document.getElementById('cambiar').addEventListener('click', () => {
    table.actualizar(dato.value, nuevo.value)
    table.mostrar()
    document.getElementById('oculto').style.display = 'none'
})


//Para convertir una cadena a codigo ascii
/*function atAscii(cadena) {
    resultado = 0
    for(let i = 0; i < cadena.length; i++) {
        resultado += cadena.charCodeAt(i)
    }
    return resultado
}*/