var texto = "",llave = ""
function codFeistel(rondas){
    if(llave.length < (texto.length/2)){
        var str = ""
        var num = (texto.length/2)- llave.length
        for(var i = 0; i < num; i++){
            str+="0"
        }
        str+=llave
        llave = str
        console.log(llave)
    }else if(llave.length < (texto.length/2)){
        alert("La clave debe ser de la mitad del tamaño del texto")
    }
    for(var i = 0; i< rondas; i++){
        _codFeistel()
    }
}

function _codFeistel(){
    var izq, der, res, aux
    izq = texto.substr(0, (texto.length/2))
    der = texto.substr((texto.length/2),texto.length-1)
    res = xor(der, llave)
    res = xor(res, izq)
    izq = der
    der = res
    aux = llave.charAt(0)
    llave = llave.substr(1, llave.length-1)
    llave+= aux
    texto = izq
    texto+= der
}

function xor(txt, code){
    var str = ""
    for(i = 0; i< txt.length; i++){
        if(txt.charAt(i) == "0" && code.charAt(i) == "0"){
            str+="0"
        }else if(txt.charAt(i) == "1" && code.charAt(i) == "1"){
            str+="0"
        }else{
            str+="1"
        }
    }
    return str
}

function Cif(){
    texto = document.getElementById("codificar").value
    llave = document.getElementById("clave").value
    var cantidad = document.getElementById("cantidad").value
    codFeistel(cantidad)
    document.getElementById("codificado").value = texto
    texto = ""
    llave = ""
}