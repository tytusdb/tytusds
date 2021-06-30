class Node {
    constructor(codigo, dato) {
        this.codigo = codigo
        this.dato = dato
    }
}

class Hash {
    constructor() {
        this.vector = []
        this.elementos = 0
        this.size = null
        this.factor = 0.0
        this.max = 80
        this.min = 20
        this.funcion = 'division'
        this.prueba = 'lineal'
        this.constante_a = 0.1625277911 
    }

    crear(size){
        this.elementos = 0
        this.vector.splice(0, this.vector.length)
        this.size = size
        for(let i = 0; i < this.size; i++){
            this.vector[i] = null
        }
    }

    agregar(dato) {
        let codigo = this.set_key(dato)
        let indice = this.funcionHash(codigo)

        let nuevo = new Node(codigo, dato)

        while(this.vector[indice] != null) {
            //indice = this.lineal(indice)
            indice = this.pruebaHash(indice)
        }
        this.vector[indice] = nuevo
        this.elementos ++
        this.rehashing()
    }

    rehashing() {
        if ((this.elementos*100/this.size) >= this.max) {
            let temporal = this.vector
            this.mostrar()
            let aux_size = this.size
            this.size =  this.elementos * 100/this.min
            this.crear(this.size)
            for (let i = 0; i < aux_size; i++) {
                if (temporal[i] != null) {
                    this.agregar(temporal[i])
                }
            }
        } else {
            this.mostrar()
        }
    }

    buscar(dato) {
        for(let i = 0; i < this.size; i++) {
            if(this.vector[i].dato == dato) {
                return this.vector[i].dato 
            }
        }
        return false
    }

    eliminar(dato) {
        if (this.buscar(dato)) {
            let indice
            for(let i = 0; i < this.size; i++) {
                if(this.vector[i].dato == dato) {
                    indice = i
                }
            }
            this.vector[indice] = null
            this.elementos --
        }
    }

    actualizar(dato, nuevo) {
        console.log('Actualizar()')
        if (this.buscar(dato)) {
            this.eliminar(dato)
            this.agregar(nuevo)
            console.log(`Se actualizo el dato ${dato} por ${nuevo}`)
        }
    }

    pruebaHash(numero) {
        if (this.prueba == 'lineal') {
            return this.lineal(numero)
        } else if (this.prueba == ' cuadratica') {
            console.log('cuadratica')
            return this.lineal(numero)
        } else {
            return this.lineal(numero)
        }
    }

    lineal(numero){
        return (Math.abs(numero) + 1) % this.size
    }

    funcionHash(numero) {
        if (this.funcion == 'simple') {
            return this.simple()
        } else if (this.funcion == 'multiplicacion') {
            return this.multiplicacion(numero)
        } else {
            return this.division(numero)
        }
    }

    set_prueba(prueba) {
        this.prueba = prueba
    }

    simple() {
        return Math.round(Math.random() * this.size)
    }

    division(numero) {
        return Math.abs(numero) % this.size
    }

    multiplicacion(numero) {
        return Math.round(this.size * (Math.abs(numero) * this.constante_a % 1))
    }

    set_constante(numero) {
        this.constante_a = numero
    }

    set_funcion(funcion) {
        this.funcion = funcion
    }

    atAscii(cadena) {
        let resultado = 0
        for(let i = 0; i < cadena.length; i++) {
            resultado += cadena.charCodeAt(i)
        }
        return resultado
    }

    set_key(dato) {
        let codigo = dato
        if (isNaN(dato)) {
            codigo = this.atAscii(dato)
        }
        return codigo
    }

    mostrar() {
        let string = '['
        for (let i = 0; i < this.size; i++) {
            if (this.vector[i] != null) {
                string += ` ${this.vector[i].dato}`
            } else {
                string += ` -1`
            }
            
        }
        string += `] ${(this.elementos*100/this.size)}%`
        console.log(string)
    }
}

const dato = document.getElementById('dato')
const size = document.getElementById('size')
const nuevo = document.getElementById('dato2')

let table = new Hash()

document.getElementById('crear').addEventListener('click', () =>{
    table.crear(size.value)
})

document.getElementById('agregar').addEventListener('click', () => {
    table.agregar(dato.value)
})

document.getElementById('buscar').addEventListener('click', () => {
    console.log(`el dato ${table.buscar(dato.value)} si esta`)
})

document.getElementById('eliminar').addEventListener('click', () => {
    table.eliminar(dato.value)
})

document.getElementById('actualizar').addEventListener('click', () => {
    document.getElementById('oculto').style.display = 'block'
})

document.getElementById('cambiar').addEventListener('click', () => {
    table.actualizar(dato.value, nuevo.value)
    document.getElementById('oculto').style.display = 'none'
})