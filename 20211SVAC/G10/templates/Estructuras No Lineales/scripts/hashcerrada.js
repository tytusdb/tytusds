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
        this.maximo = null
        this.minimo = null
        this.funcion = 'division'
        this.prueba = 'lineal'
        this.constante_a = 0.1625277911
    }

    crear(size){
        this.elementos = 0
        this.size = size
        this.vector = new Array(size)
        for(let i = 0; i < this.vector.length; i++){
            this.vector[i] = null
        }
    }

    agregar(dato) {
        let codigo = this.set_key(dato)
        let indice = this.funcionHash(codigo)

        let nuevo = new Node(codigo, dato)

        let i = 1
        let k = indice
        while(this.vector[indice] != null) {
            indice = this.pruebaHash(k, i)
            i ++
        }
        this.vector[indice] = nuevo
        
        this.elementos ++
        this.rehashing()
    }

    rehashing() {
        if ((this.elementos*100/this.size) >= this.maximo) {
            let temporal = this.vector
            this.mostrar()
            let aux_size = this.size
            this.size = this.elementos * 100 / this.minimo
            this.crear(this.size)
            for(let i = 0; i<aux_size; i++) {
                if(temporal[i] != null) {
                    this.agregar(temporal[i].dato)
                }
            }
        }
        else {
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

    pruebaHash(numero, i) {
        if (this.prueba == 'Doble') {
            return this.doble(numero, i)
        } else if (this.prueba == ' Cuadratica') {
            console.log('cuadratica')
            return this.cuadratica(numero, i)
        } else {
            return this.lineal(numero, i)
        }
    }

    lineal(numero, i){
        return (Math.abs(numero) + i) % this.size
    }

    cuadratica(numero, i) {
        return (Math.abs(numero) + i * i) % this.size
    }

    h1(numero) {
        return Math.abs(numero) % this.size
    }

    h2(numero) {
        return 2 - (Math.abs(numero) % 2)
    }

    doble(numero, i) {
        try {
            let h1 = this.h1(numero)
            let h2 = this.lineal(numero, i)
            return (h1 + i * h2) % this.size
        } catch (error) {
            return this.lineal(numero, i)
        }
    }

    funcionHash(numero) {
        if (this.funcion == 'Simple') {
            return this.simple()
        } else if (this.funcion == 'Multiplicacion') {
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

    set_rango(min, max) {
        this.minimo = min
        this.maximo = max
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

    configurar(m, min, max, funcion, prueba) {
        this.size = m
        this.minimo = min
        this.maximo = max
        this.funcion = funcion
        this.prueba = prueba
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
        string += `] ${(this.elementos*100/this.size).toFixed(0)}%`
        console.log(string)
    }
}

const dato = document.getElementById('dato')
const size = document.getElementById('size')
const nuevo = document.getElementById('dato2')
const funcion = document.getElementById('funcion')
const prueba = document.getElementById('prueba')
const min = document.getElementById('minimo')
const max = document.getElementById('maximo')

let table = new Hash()

document.getElementById('crear').addEventListener('click', () =>{
    table.crear(size.value)
    table.set_rango(min.value, max.value)
})

document.getElementById('agregar').addEventListener('click', () => {
    table.set_funcion(funcion.value)
    table.set_prueba(prueba.value)
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

    let m = entrada['m']
    table.crear(m)

    let minimo = entrada['minimo']
    let maximo = entrada['maximo']
    let funcion = entrada['funcion']
    let prueba = entrada['prueba']
    let valores = entrada["valores"]

    table.configurar(m, minimo, maximo, funcion, prueba)
    
    for (let i = 0; i < valores.length; i++) {
        table.agregar(valores[i])
    }
    document.getElementById('mensaje').innerText = ''
    archivo.setAttribute('disabled', '')
    table.mostrar()
})