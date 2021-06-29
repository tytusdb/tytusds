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
        this.max = null
        this.min = null
        this.funcion = 'division'
        this.constante_a = 0.1625277911 
    }

    crear(size){
        this.vector.splice(0, this.vector.length)
        this.size = size
        for(let i = 0; i < this.size; i++){
            this.vector.push(null)
        }
        console.log(this.vector)
    }

    agregar(dato) {
        let codigo = this.set_key(dato)
        let indice = this.funcionHash(codigo, this.funcion)

        let nuevo = new Node(codigo, dato)
        //console.log(indice)
        //console.log(this.vector[indice])


        if(this.vector[indice] == null) {
            this.vector[indice] = nuevo
            console.log(this.vector)
            
        } else {
            while(this.vector[indice] != null) {
                indice += 1

            }
            indice = this.funcionHash(indice, this.funcion)
            this.vector[indice] = nuevo
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