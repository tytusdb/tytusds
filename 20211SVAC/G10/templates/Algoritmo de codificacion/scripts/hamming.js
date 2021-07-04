function string_binario(cadena) {
    cadena = unescape(encodeURIComponent(cadena))
    let salida = '', chr

    for (let i = 0; i < cadena.length; i++) {
        chr = cadena.charCodeAt(i).toString(2)

        //console.log(`[${i}] ${cadena.charCodeAt(i)} ${cadena.charCodeAt(i).toString(2)}`)
        //console.log(chr.length % 8 )
        while( chr.length % 8 != 0 ){ 
            chr = '0' + chr
        }
        salida += chr;
    }
    return salida
}

function binario_string(codigo) {
    let chr, salida = ''
    for(let i = 0 ; i < codigo.length; i += 8 ){
        chr = parseInt( codigo.substr( i, 8 ), 2 ).toString( 16 );
        salida += '%' + ( ( chr.length % 2 == 0 ) ? chr : '0' + chr );
    }
    return decodeURIComponent( salida )
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

cargar.addEventListener("click", (e) => {
    e.preventDefault()
    //console.log(binario('Hola'))
    let mensaje_binario = string_binario(entrada)
    let mensaje_codificado = binario_string(mensaje_binario)
    console.log(mensaje_binario)
    console.log(mensaje_codificado)
    document.getElementById('mensaje').innerText = ''
})