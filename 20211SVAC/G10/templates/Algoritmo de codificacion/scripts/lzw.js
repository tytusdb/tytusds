let entrada
let archivo = document.getElementById('file')

const velocidad = document.getElementById("velocidad")
let tiempo = 1

velocidad.oninput = () => {
    document.getElementById('numero').innerHTML = velocidad.value
    tiempo = velocidad.value
}

archivo.addEventListener('change', () => {
    let leer = new FileReader()
    leer.readAsText(archivo.files[0])
    leer.onload = function() {
    entrada = leer.result
    }
    document.getElementById('mensaje').innerText = 'Se cargo el archivo con exito'
})

const panel = document.getElementById('panel')
let tabla = document.createElement('table')
let tblBody = document.createElement('tbody')
let salida = []
let dic = {}

const jsonSalida = {
    operasion: 'Algoritmo LZW',
    mensaje: '',
    codificacion: ''
}

guardar.addEventListener("click", (e) => {
    e.preventDefault()
    let texto = JSON.stringify(jsonSalida)
    download('AlgoritmoLZW.json', texto)
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

cargar.addEventListener("click", () => {

    lzw(entrada)

    let bits_codificacion = salida.length
    let bits_mensaje = entrada.split("").length
    let size_dic = 0
    for(let key in dic) {
        size_dic ++
    }
    
    size_dic = size_dic-1

    jsonSalida['mensaje'] = String(bits_mensaje*8) + ' bits'
    jsonSalida['codificacion'] = String( bits_codificacion * Math.round(Math.log2(size_dic))) + ' bits'

    panel.appendChild(tabla)
    
    document.getElementById('mensaje').innerText = ''
    
})

async function lzw(cadena) {

    let titulo = ['W', 'K', 'WK', 'Agregar', 'Salida']

    let tr = document.createElement('tr')
    for (let i = 0; i < titulo.length; i++) {
        let th = document.createElement('th')
        let th_text= document.createTextNode(titulo[i])
        th.appendChild(th_text)
        tr.appendChild(th)
    }
    
    tblBody.appendChild(tr)
    

    let dato = cadena.split('')
    

    let actual = dato[0]

    let k
    let w = []
    w[0] = '-'

    let wk = []
    wk[0] = actual

    let agregar = []
    agregar[0] = '_'

    let salida_tabla = []
    salida_tabla[0] = '_'

    let codigo = 0
    
    for(let i = 0; i<dato.length; i++) {
        if(dic[dato[i]] == null) {
            dic[dato[i]] = codigo
            codigo ++
        }
    }

    for(let i = 1; i <= dato.length; i++) {
        k = dato[i]
        w.push(actual)
                
        if(dic[actual + k] != null) {
            
            actual += k
            wk.push(actual)
            agregar.push('_')
            salida_tabla.push('_')
            
        } else {
            if((actual+k) != 'Oundefined') {
                agregar.push(actual + k + ' = ' + String(codigo))
                wk.push(actual + k)
                
            } else {
                agregar.push('_')
                wk.push('_')

            }
            salida_tabla.push(dic[actual])
            salida.push(dic[actual])

            dic[actual + k] = codigo
            codigo ++
            actual = k
        }
        
    }

    for (let i = 0; i <= cadena.length; i ++){
        let fila = []
        if (cadena[i] != undefined) {
            fila.push(w[i])
            fila.push(cadena[i])
            fila.push(wk[i])
            fila.push(agregar[i])
            fila.push(salida_tabla[i])
        } else {
            fila.push(w[i])
            fila.push('_')
            fila.push(wk[i])
            fila.push(agregar[i])
            fila.push(salida_tabla[i])
        }
         
        let hilera = document.createElement('tr')
        for (j = 0; j < fila.length; j++) {

            let celda = document.createElement('td')
            let celda_text= document.createTextNode(String(fila[j]))
            celda.appendChild(celda_text)
            hilera.appendChild(celda)
            
        }
        tblBody.appendChild(hilera)
        tabla.appendChild(tblBody)
        await new Promise(resolve => setTimeout(resolve, 1000 / tiempo))
    }
    
    return salida
}