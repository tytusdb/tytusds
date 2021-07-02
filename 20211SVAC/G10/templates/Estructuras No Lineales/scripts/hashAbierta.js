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
        this.minimo = null
        this.maximo = null
        this.lista = []
        this.funcion = 'Division'
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
        crear_cuadrado(dato, this.lista[indice].elemento, indice)
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

        let contador = 0
        while (actual != null) {
            if (actual.dato == dato) {
                console.log(contador)
                return actual.dato
            }
            contador ++
            actual = actual.siguiente
        }
        return false
    }
    //table.eliminar(table.division(dato.value), dato.value)
    eliminar(dato){
        let codigo = this.set_key(dato)
        
        if (this.buscar(dato) != false) {
            let indice = this.funcionHash(codigo, this.funcion)
            let actual = this.lista[indice]

            let posiciones = []

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
                } else {
                    posiciones.push(actual.dato)
                }
                actual = actual.siguiente
            }
            this.lista[indice].elemento -= 1

            context.clearRect(60, 20+(indice*60), canvas.width, 60)
            for (let i = 0; i < posiciones.length; i++) {
                crear_cuadrado(posiciones[i], i, indice)
                //crear_cuadrado(dato, this.lista[indice].elemento, indice)
            }
        }        
    }

    actualizar(dato, nuevo) {
        let codigo = this.set_key(dato)
        let nuevo_codigo = this.set_key(nuevo)

        let indice = this.funcionHash(codigo, this.funcion)
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
        if (funcion == 'Simple') {
            return this.simple()
        } else if (funcion == 'Multiplicacion') {
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

    set_rango(min, max) {
        this.minimo = min
        this.maximo = max
    }

    configurar(m, min, max, funcion) {
        this.m = m
        this.minimo = min
        this.maximo = max
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
const funcion = document.getElementById('funcion')
const min = document.getElementById('minimo')
const max = document.getElementById('maximo')

let table = new Hash()

document.getElementById('agregar').addEventListener('click', () => {
    table.set_funcion(funcion.value)
    table.agregar(dato.value)
})

document.getElementById('crear').addEventListener('click', () =>{
    table.crear(size.value)
    console.log(`${min.value} ${max.value}`)
    table.set_rango(min.value, max.value)

    for(let i = 0; i < size.value; i++) {
        crear_lista(i)
    }
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

    let minimo = entrada['minimo']
    let maximo = entrada['maximo']
    let funcion = entrada['funcion']
    let prueba = entrada['prueba']
    let valores = entrada["valores"]

    table.configurar(m, minimo, maximo, funcion)

    for(let i = 0; i < m; i++) {
        crear_lista(i)
    }
    
    for (let i = 0; i < valores.length; i++) {
        table.agregar(valores[i])
    }
    document.getElementById('mensaje').innerText = ''
    archivo.setAttribute('disabled', '')
})

var canvas = document.getElementById('lienzo')
var context = canvas.getContext("2d")

let y = 20
let yo = 20
let yf = 80
let ty = 55

function crear_lista(indice) {
    context.beginPath()
    context.lineWidth = 2
    context.strokeStyle = "rgb(48, 71, 94)"//rgb(48, 71, 94)
    context.rect(20, y, 30, 60)
    context.moveTo(20, yo)
    context.lineTo(50, yf)

    context.textAlign="center";
    context.font = "bold 12pt sans-serif"
    context.fillStyle = "rgb(48, 71, 94)" //"rgb(240, 84, 84)";
    context.fillText(indice, 10, ty/*55*/)
    context.stroke()

    y = y + 60
    yo = y
    yf = yf + 60
    ty = ty + 60
}

function crear_cuadrado(contenido, x, y) {
    let origenx = 70 + (x*80)
    let origeny = 30 + (y*60)

    let xo = 50 + (x*80)
    let yo = 50 + (y*60)
    let xf = 70 + (x*80)
    let yf = 50 + (y*60)

    let tx = 100 + (x*80)
    let ty = 55 + (y*60)

    context.beginPath()
    context.lineWidth = 2
    context.strokeStyle = "rgb(48, 71, 94)"//rgb(48, 71, 94)
    context.rect(origenx, origeny, 60,40)
    context.moveTo(xo, yo)
    context.lineTo(xf, yf)

    context.textAlign="center";
    context.font = "bold 12pt sans-serif"
    context.fillStyle = "rgb(48, 71, 94)" //"rgb(240, 84, 84)";
    context.fillText(contenido, tx, ty, 60)
    context.stroke()
}


