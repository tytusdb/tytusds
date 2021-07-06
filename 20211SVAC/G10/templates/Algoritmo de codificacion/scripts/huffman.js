class Node {
    constructor(caracter, frecuencia){
        this.caracter = caracter
        this.frecuencia = frecuencia
        this.izquierda = null
        this.derecha = null
        this.camino = null
    }
}

class lista{
    constructor() {
        this.lista = []
        this.raiz = null
        this.binario = []
        this.caracteres = []
    }

    agregar(caracter, frecuencia) {
        let nuevo = new Node(caracter, frecuencia)
        this.lista.push(nuevo)
    }

    buscar(caracter) {
        for(let i = 0; i < this.lista.length; i++) {
            if (caracter == this.lista[i].caracter) {
                return i
            }
        }
        return false
    }

    repetido(indice, frecuencia) {
        for(let i = 0; i < this.lista.length; i++) {
            if (indice == i) {
                this.lista[indice].frecuencia = this.lista[indice].frecuencia + frecuencia
            }
        }
    }

    ordenar() {
        let temporal = this.lista
        let aux
        for (let i = 0; i < temporal.length; i++) {
            for(let j = i + 1; j < temporal.length; j++) {
                if(temporal[i].frecuencia > temporal[j].frecuencia) {
                    aux = temporal[i]
                    temporal[i] = temporal[j]
                    temporal[j] = aux
                }
            }
        }
        return temporal
    }
}

class huffman {
    constructor() {
        this.raiz = null
        this.size = 0
    }

    vacio() {
        return this.root === null
    }

    insert(lista) {

        while(lista.length > 1) {
            let izquierda = lista.shift()
            let derecha = lista.shift()

            let raiz_frecuencia = izquierda.frecuencia + derecha.frecuencia
            let nuevo = new Node('null', raiz_frecuencia)

            nuevo.izquierda = izquierda
            nuevo.izquierda.camino = '0'
            nuevo.derecha = derecha
            nuevo.derecha.camino = '1'

            lista.push(nuevo)
            this.raiz = nuevo
        }
    }

    buscarDerecha(dato, actual, camino) {
        /*
        while (actual != null) {
            //console.log(`${actual.caracter} ${actual.frecuencia}`)
            camino += '1'
            if(actual.caracter == dato) {
                return true
            } else {
                //console.log(this.buscarDerecha(dato, actual.izquierda))
                let left = this.buscarIzquierda(dato, actual.izquierda, camino)
                let right = this.buscarDerecha(dato, actual.derecha, camino)
                if(left == false && right == false) {
                    return false
                } else {
                    console.log(camino)
                    return true
                }
            }
        }   
        */    
    }

    buscarIzquierda(dato, actual, camino) {

        /*
        while (actual != null) {
            camino += '0'
            if(actual.caracter == dato) {
                return true
            } else {
                //console.log(this.buscarDerecha(dato, actual.izquierda))
                let left = this.buscarIzquierda(dato, actual.izquierda, camino)
                let right = this.buscarDerecha(dato, actual.derecha, camino)
                if(left == false && right == false) {
                    return false
                } else {
                    console.log(camino)
                    return true
                }
            }
        }   
        */
    }

    buscar(dato, actual) {
        console.log(actual)
        if (dato == actual.caracter) {
            return true
        } else {
            return false
        }
    }

    binario(lista, actual = this.raiz) {
        
        while(actual != null) {
            if(!this.buscar('a', actual)){
                console.log(this.buscar('a', actual))
                actual = actual.derecha
            } else {
                console.log('nel prro') 
            }
        }
        /* 
        console.log('binario()')
        let actual = this.raiz
        let ruta = ''
        /*for (let i = 0; i < lista.length; i++) {
            console.log(lista[i])
        }

        //this.buscarDerecha('L', actual, ruta)
        while(actual != null) {
            console.log(this.buscarDerecha('L', actual, ruta))
            actual = actual.derecha
        }
        //this.buscarIzquierda('L', actual)
        */
    }
}

let entrada
let archivo = document.getElementById('file')

archivo.addEventListener('change', () => {
    let leer = new FileReader()
    leer.readAsText(archivo.files[0])
    leer.onload = function() {
    entrada = leer.result
    }
    document.getElementById('mensaje').innerText = 'Se cargo el archivo con exito'
})

let codificar = new lista()
let metodo = new huffman()

cargar.addEventListener("click", () => {

    let caracteres = []

    for(let i = 0; i < entrada.length; i++) {
        let frecuencia = 1
        if(!codificar.buscar(entrada[i])) {
            codificar.agregar(entrada[i], frecuencia)
            
            caracteres.push(entrada[i])
        } else {
            let indice = codificar.buscar(entrada[i])
            
            codificar.repetido(indice, frecuencia)
        }
    }
    

    let listaOrdenada = codificar.ordenar()

    metodo.insert(listaOrdenada)
    metodo.binario(caracteres)
    
    //let arbol = codificar.arbol(lista[0], lista[1])
    //codificar.lista_cadacter(arbol, caracteres)

    document.getElementById('mensaje').innerText = ''
    
})