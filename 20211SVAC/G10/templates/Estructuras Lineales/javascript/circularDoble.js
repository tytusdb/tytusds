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
        let actual = this.primero
        let contador = 0
        while (this.buscar(dato)) {
            if (actual.valor == dato) {
                return contador
            }
            contador += 1
            actual = actual.siguiente
        }
    }

    obtener(numero) {
        let actual = this.primero
        for (let i = 0; i < this.size; i ++) {
            if (numero == i) {return actual.valor}
            actual = actual.siguiente
        }
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
let time = 5

velocidad.oninput = () => {
    document.getElementById('numero').innerHTML = velocidad.value
    if (velocidad.value == 3 ) time = 2.5
    else time = parseInt(velocidad.value)
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
        graficar()
    }
})

eliminar.addEventListener("click", (e) => {
    e.preventDefault()

    context.clearRect(0, 0, canvas.width, canvas.height)
    x_figura = 20
    x_texto = 50

    if(dato.value != ''){
        lista.eliminar(dato.value)
        for(let i = 0; i< lista.size; i++) {
            cargar_grafica(lista.obtener(i))
        }
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
    context.clearRect(0, 0, canvas.width, canvas.height)
    x_figura = 20
    x_texto = 50

    if(dato.value != '' && nuevo.value != ''){
        lista.actualizar(dato.value, nuevo.value)

        for(let i = 0; i< lista.size; i++) {
            cargar_grafica(lista.obtener(i))
        }

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
        cargar_grafica(valores[i])
    }
    document.getElementById('mensaje').innerText = ''
    archivo.setAttribute('disabled', '')
})

guardar.addEventListener("click", (e) => {
    e.preventDefault()
    let texto = JSON.stringify(salida)
    download('CircularDoble.json', texto)
})

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

// ---------Animaciones------------------------------------------------------------------------------------
var canvas = document.getElementById('lienzo')
var context = canvas.getContext("2d")

let x_start
let y_start

let x_start_text
let y_start_text

let x_figura = 20
let x_texto = 50

let ultima_linea

function graficar() {
    x_start = 20
    y_start = 20

    x_start_text = 50
    y_start_text = 60

    context.beginPath()
    context.fillStyle = "rgb(48, 71, 94)"
    context.fillRect(x_start, 20, 60, 60)

    context.textAlign="center";
    context.font = "bold 22pt sans-serif"
    context.fillStyle="rgb(221, 221, 221)";
    context.fillText(dato.value, x_start_text, 60, 60)
    animar()
}

function flecha(x) {
    
    context.beginPath()
    let r0 = x + 120 //x+110
    let r1 = x + 100 //x +70
    let r2 = 230 //220
    let r3 = r2 + 15 //p2 + 30
    let r4 = r2 + 35 //p2 + 60

    context.moveTo(r0, r3)
    context.lineTo(r1, r2)
    context.lineTo(r1, r4)
    context.fillStyle="rgb(34, 40, 49)";
    context.fill()

    context.beginPath()
    let l0 = x + 60 //x+110
    let l1 = x + 80 //x +70
    let l2 = 245 //220
    let l3 = l2 + 15 //p2 + 30
    let l4 = l2 + 35 //p2 + 60

    context.moveTo(l0, l3)
    context.lineTo(l1, l2)
    context.lineTo(l1, l4)
    context.fillStyle = "rgb(34, 40, 49)"
    context.fill()

    context.beginPath()
    context.lineWidth = 3
    context.strokeStyle = "rgb(34, 40, 49)"
    context.moveTo(l1, (l2+l4)/2)
    context.lineTo(r1, (r2+r4)/2)
    context.stroke()

    if(lista.size == 1) {
        context.beginPath()
        context.lineWidth= 3
        
        context.moveTo(50, 310)
        context.lineTo(50, 340)
        context.stroke()

        context.beginPath()
        context.lineWidth= 3
        context.moveTo(50, 340)
        context.lineTo(x_figura + 130, 340)
        context.lineTo(x_figura + 130, 245)
        context.lineTo(x_figura + 110, 245)
        context.stroke()
        
    } else {
        context.clearRect(80, 280, canvas.width, 220)
        context.beginPath()
        context.textAlign="center";
        context.font = "bold 20pt sans-serif"
        context.fillStyle="rgb(48, 71, 94)";
        context.fillText('Ultimo', x_texto, 300, 60)

        context.beginPath()
        context.lineWidth= 3
        context.moveTo(50, 340)
        context.lineTo(x_figura + 130, 340)
        context.lineTo(x_figura + 130, 245)
        context.lineTo(x_figura + 110, 245)
        context.stroke()
    }
}

function cargar_grafica(relleno) {

    context.beginPath()
    context.textAlign="center";
    context.font = "bold 20pt sans-serif"
    context.fillStyle="rgb(48, 71, 94)";
    context.fillText('Primero', 50, 300, 60)

    //Cuadrado
    context.beginPath()
    context.fillStyle = "rgb(48, 71, 94)"
    context.fillRect(x_figura, 220, 60, 60)

    //Texto
    context.textAlign="center";
    context.font = "bold 22pt sans-serif"
    context.fillStyle="rgb(221, 221, 221)";
    context.fillText(relleno, x_texto, 260, 60)

    // Flecha
    flecha(x_figura)

    x_figura = x_figura+(60*2)
    x_texto = x_figura + 30
}

function crear_cuadrado() {

    context.beginPath()
    context.textAlign="center";
    context.font = "bold 20pt sans-serif"
    context.fillStyle="rgb(48, 71, 94)";
    context.fillText('Primero', 50, 300, 60)

    //Cuadrado
    context.beginPath()
    context.fillStyle = "rgb(48, 71, 94)"
    context.fillRect(x_figura, 220, 60, 60)

    //Texto
    context.textAlign="center";
    context.font = "bold 22pt sans-serif"
    context.fillStyle="rgb(221, 221, 221)";
    context.fillText(dato.value, x_texto, 260, 60)

    // Flecha
    
    flecha(x_figura)

    x_figura = x_figura + 120
    x_texto = x_figura + 30
}

function animar() {

    window.requestAnimationFrame(function loop() {

        if (x_start != x_figura) {
            x_start += time 
            x_start_text += time

            context.clearRect(0, 0, canvas.width, 220)
            context.beginPath()
            context.fillStyle = "rgb(48, 71, 94)"
            context.fillRect(x_start, y_start, 60, 60)

            context.textAlign="center";
            context.font = "bold 22pt sans-serif"
            context.fillStyle="rgb(221, 221, 221)";
            context.fillText(dato.value, x_start_text, 60, 60)

            if (x_start == x_figura) {
                y_start += time
                y_start_text += time

                context.clearRect(0, 0, canvas.width, 220)
                context.beginPath()
                context.fillStyle = "rgb(48, 71, 94)"
                context.fillRect(x_start, y_start, 60, 60)

                context.textAlign="center";
                context.font = "bold 22pt sans-serif"
                context.fillStyle="rgb(221, 221, 221)";
                context.fillText(dato.value, x_start_text, y_start_text, 60)

                if (y_start == 220) {
                    crear_cuadrado()
                    window.webkitCancelAnimationFrame()
                }
            }
            window.requestAnimationFrame(loop)
        } else {
            y_start += time
            y_start_text += time

            context.clearRect(0, 0, canvas.width, 220)
            context.beginPath()
            context.fillStyle = "rgb(48, 71, 94)"
            context.fillRect(x_start, y_start, 60, 60)

            context.textAlign="center";
            context.font = "bold 22pt sans-serif"
            context.fillStyle="rgb(221, 221, 221)";
            context.fillText(dato.value, x_start_text, y_start_text, 60)

            if (y_start == 220) {
                crear_cuadrado()
                window.webkitCancelAnimationFrame()
            }
            window.requestAnimationFrame(loop)
        }
    })
}

function animacion_buscar() { 
    if (lista.buscar(dato.value) != false) {

        let recorrer = 20
        let tope = 20

        let posicion = lista.index(dato.value)

        for (let i = 0; i < posicion ; i ++) {
            tope = tope + 120
        }

        var intervalo = setInterval(contorno, 1000)

        function contorno() {
            context.beginPath()
            context.lineWidth = 5
            context.strokeStyle = "rgb(240, 84, 84)"
            context.rect(recorrer, 220, 60, 60)
            context.stroke()

            var temporizador = setInterval(animacion, 1000)

            if (recorrer == tope){
                clearInterval(intervalo)
                
            }else {
                recorrer = recorrer + 120
                clearInterval(temporizador)
            }
        }

        function animacion() {
            window.requestAnimationFrame(function loop() {
                context.clearRect(0, 0, tope-10, canvas.height)
                x_aux = 20
                x_texto_aux = 50
                let posicion = lista.index(dato.value)
    
                for(let i = 0; i <= posicion; i++) {
                    recuperar_grafica(salida.lista[i])
                }
                recorrer = 20
                tope = 20
            })
        }
        
    } else {
        console.log('Dato no existe en la lista')
    } 
}

function recuperar_grafica(relleno) {

    context.beginPath()
    context.textAlign="center";
    context.font = "bold 20pt sans-serif"
    context.fillStyle="rgb(48, 71, 94)";
    context.fillText('Primero', 50, 300, 60)

    //Cuadrado
    context.beginPath()
    context.fillStyle = "rgb(48, 71, 94)"
    context.fillRect(x_aux, 220, 60, 60)

    //Texto
    context.textAlign="center";
    context.font = "bold 22pt sans-serif"
    context.fillStyle="rgb(221, 221, 221)";
    context.fillText(relleno, x_texto_aux, 260, 60)

    // Flecha
    flecha(x_aux)

    x_aux = x_aux+(60*2)
    x_texto_aux = x_aux + 30
}