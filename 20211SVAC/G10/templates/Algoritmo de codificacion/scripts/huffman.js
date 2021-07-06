class Node {
    constructor(caracter, frecuencia){
        this.caracter = caracter
        this.frecuencia = frecuencia
        this.siguiente = null  
    }
}

class lista {
    constructor() {
        this.inicio = null
        this.size = 0
    }
    
    agregar(dato, frecuencia) {
        let nuevo = new Node(dato, frecuencia)
        if (this.inicio == null) {
            this.inicio = nuevo;
        }else {
            let actual = this.inicio;
            while (actual.siguiente != null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevo;
        }
        this.size ++
    }

    buscar(dato) {
        let actual = this.inicio

        while (actual != null) {
            if (actual.caracter == dato) {
                return actual.caracter
            } 
            actual = actual.siguiente;
        }
        return false;
    }

    ordenar() {
        let actual = this.inicio
        let lista = []
        let aux
        for(let i = 0; i < this.size; i++) {
            lista.push(actual)
            actual = actual.siguiente
        }
        for (let i = 0; i < lista.length; i++) {
            for(let j = i + 1; j < lista.length; j++) {
                if(lista[i].frecuencia > lista[j].frecuencia) {
                    aux = lista[i]
                    lista[i] = lista[j]
                    lista[j] = aux
                }
            }
        }
        return lista
    }

    repetido(dato, frecuencia) {
        let actual = this.inicio
        while (actual != null) {
            if (actual.caracter == dato) {
                actual.frecuencia = actual.frecuencia + frecuencia
            } 
            actual = actual.siguiente;
        }
    }

    mostrar() {
        let actual = this.inicio;
        let string = ''
        for (let i = 0; i < this.size; i++) {
            string += actual.caracter + '|' + actual.frecuencia
            string += ' -> '
            actual = actual.siguiente;
        }
        console.log(string)
    }
}

class NodeArbol {
    constructor(dato, frecuencia) {
        this.dato = dato
        this.frecuencia = frecuencia
        this.left = null
        this.right = null
    }
}

class huffman{
    constructor() {
        this.root = null
    }

    agregar(caracter, frecuencia, izq, der) {
        let nuevo = new NodeArbol(caracter, frecuencia)
        this.root = nuevo
        this.root.left = izq
        this.root.right = der
        console.log(this.root)
    }
}

let entrada
let archivo = document.getElementById('file')

let list = new lista()
let arbol = new huffman()

archivo.addEventListener('change', () => {
    let leer = new FileReader()
    leer.readAsText(archivo.files[0])
    leer.onload = function() {
    entrada = leer.result
    }
    document.getElementById('mensaje').innerText = 'Se cargo el archivo con exito'
})

cargar.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(entrada)

    for(let i = 0; i < entrada.length; i++) {
        let frecuencia = 0
        frecuencia ++
        if(!list.buscar(entrada[i])) {
            list.agregar(entrada[i], frecuencia)
        } else {
            list.repetido(entrada[i], frecuencia)
        }     
    }
    let lista = list.ordenar()

    for (let i = 0; i < lista.length; i++){
        console.log(lista.slice(0, 2))
        for(let j = 0; j < lista.slice(0, 2).length; j++) {
            lista.shift()
        }
    }

    let nueva_lista = lista.slice(0, 2)
    let frecuencia_raiz = 0

    for (let i = 0; i < nueva_lista.length; i++){
        frecuencia_raiz = frecuencia_raiz + nueva_lista[i].frecuencia
        lista.shift()
    }

    arbol.agregar(null, frecuencia_raiz, nueva_lista[0], nueva_lista[1])

    console.log(lista)

    document.getElementById('mensaje').innerText = ''
})