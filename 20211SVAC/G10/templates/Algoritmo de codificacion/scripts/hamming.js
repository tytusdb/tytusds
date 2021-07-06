const panel = document.getElementById('panel')

const tabla = document.createElement('table')
const tblBody = document.createElement('tbody')

const archivoSalida = {
    operasion: 'Algoritmo Hamming',
    mensaje: '',
    codificacion: ''
}

guardar.addEventListener("click", (e) => {
    e.preventDefault()
    let mensaje_codigo = ''
    for(let i = 0; i < lista_salida.length; i++) {
        mensaje_codigo += lista_salida[i]
        mensaje_codigo += ' '
    }

    archivoSalida['codificacion'] = mensaje_codigo

    let texto = JSON.stringify(archivoSalida)
    download('AlgoritmoHamming.json', texto)
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

let salida = []
let lista_salida = []

cargar.addEventListener("click", (e) => {
    e.preventDefault()

    let l_mensaje = entrada.split(' ')

    

    let mensaje = binary_encode(l_mensaje[0])
    hamming(mensaje)

    for(let i = 0; i < l_mensaje.length; i++) {
        back(binary_encode(l_mensaje[i]))
    }

    panel.appendChild(tabla)
    
    archivoSalida['mensaje'] = entrada

    document.getElementById('mensaje').innerText = ''
})

function binary_encode( cadena ){
    var chr, out = '';
    for(let i = 0; i < cadena.length; i ++ ){
        chr = cadena.charCodeAt( i ).toString( 2 );
        while( chr.length % 8 != 0 ){ chr = '0' + chr; }
        out += chr;
    }
    return out;
}

async function hamming(cadena) {

    let cadenita = cadena.split('')
    let encabezado = []
    let punto_paridad = []

    encabezado.push('Palabra')

    for(let i = 0; i < cadena.length; i++) {
        let paridad = Math.pow(2, i)
        if (paridad <= cadena.length + i ) {
            punto_paridad.push(paridad)
        }
    }

    let size = punto_paridad.length + cadenita.length
    let dato = ['Dato']
    let d = 0
    let p = 0

    for (let i = 1; i <= size; i++) {
        if(i == punto_paridad[p]){
            dato.push('p' + String(punto_paridad[p]))
            encabezado.push(' ')
            p ++
        } else {
            dato.push('d' + String(d+1))
            encabezado.push(cadenita[d])
            d++
        }
    }

    crearTabla(encabezado)
    crearTabla(dato)

    encabezado.shift()
    
    salida = new Array(encabezado.length)

    let size_Tabla = encabezado.length

    for(let i = 0; i < punto_paridad.length; i++) {
        
        let unos = 0
        let punto = new Array(size_Tabla)

        for(let j = 0; j < punto.length; j++){
            punto[j] = ' '
        } 
        
        let posicion = 0
        for(let k= 0 ; k < punto_paridad.length; k++) {
            posicion = Math.pow(2, i)-1
        }

        for(let j = punto_paridad[i] - 1; j < size_Tabla; j++) {
            let salto = 0  
            
            while(salto < punto_paridad[i]) {
                punto[posicion + salto] = '0'
                if(encabezado[posicion + salto] != ' ') {
                    punto[posicion + salto] = encabezado[posicion + salto]
                }
                salto += 1
            }

            if (posicion < size_Tabla) {
                posicion = posicion + (2 * punto_paridad[i])
            }
            punto.length = punto.length - (punto.length - encabezado.length)

            if(punto[j] == '1'){
                unos ++
            }
        }
        
        if(par(unos)) {
            punto[punto_paridad[i] - 1] = '0'
        } else {
            punto[punto_paridad[i] - 1] = '1'
        }

        for (let j = 0; j < salida.length; j++) {

            if(punto[j] != ' '){
                salida[j] = punto[j]
            }
        }

        let datoP = 'p'+ String(punto_paridad[i])
        let pdato = [datoP]
        let fila = pdato.concat(punto)

        await new Promise(resolve => setTimeout(resolve, 1000))
        crearTabla(fila)
    }
    let f = ['codigo']
    let ultima = f.concat(salida)

    await new Promise(resolve => setTimeout(resolve, 1000))
    crearTabla(ultima)
}

function back(cadena) {

    let cadenita = cadena.split('')

    let encabezado = []
    let punto_paridad = []

    encabezado.push('Palabra')

    for(let i = 0; i < cadena.length; i++) {
        let paridad = Math.pow(2, i)
        if (paridad <= cadena.length + i ) {
            punto_paridad.push(paridad)
        }
    }

    let size = punto_paridad.length + cadenita.length
    let dato = ['Dato']

    let d = 0
    let p = 0

    for (let i = 1; i <= size; i++) {
        if(i == punto_paridad[p]){
            dato.push('p' + String(punto_paridad[p]))
            encabezado.push(' ')
            p ++
        } else {
            dato.push('d' + String(d+1))
            encabezado.push(cadenita[d])
            d++
        }
    }

    encabezado.shift()
    
    salida = new Array(encabezado.length)

    let size_Tabla = encabezado.length

    for(let i = 0; i < punto_paridad.length; i++) {
        
        let unos = 0
        let punto = new Array(size_Tabla)

        for(let j = 0; j < punto.length; j++){
            punto[j] = ' '
        } 
        
        let posicion = 0
        for(let k= 0 ; k < punto_paridad.length; k++) {
            posicion = Math.pow(2, i)-1
        }

        for(let j = punto_paridad[i] - 1; j < size_Tabla; j++) {
            let salto = 0  
            
            while(salto < punto_paridad[i]) {
                punto[posicion + salto] = '0'
                if(encabezado[posicion + salto] != ' ') {
                    punto[posicion + salto] = encabezado[posicion + salto]
                }
                salto += 1
            }

            if (posicion < size_Tabla) {
                posicion = posicion + (2 * punto_paridad[i])
            }
            punto.length = punto.length - (punto.length - encabezado.length)

            if(punto[j] == '1'){
                unos ++
            }
        }
        
        if(par(unos)) {
            punto[punto_paridad[i] - 1] = '0'
        } else {
            punto[punto_paridad[i] - 1] = '1'
        }

        for (let j = 0; j < salida.length; j++) {

            if(punto[j] != ' '){
                salida[j] = punto[j]
            }
        }
    }
    lista_salida.push(to_String(salida))
}

function crearTabla(lista) {
    let tr = document.createElement('tr')
    for(let i = 0; i < lista.length; i++) {
        td = document.createElement('td')
        td_text= document.createTextNode(lista[i])
        td.appendChild(td_text)
        tr.appendChild(td)
    }
    tblBody.appendChild(tr)
    tabla.appendChild(tblBody)
}

function to_String(lista) {
    let codificado = ''

    for(let i = 0; i < lista.length; i++) {
        codificado += lista[i]
    }

    return codificado
}

function par(numero) {
    if(numero%2 == 0) {
        return true
    }
    return false
}