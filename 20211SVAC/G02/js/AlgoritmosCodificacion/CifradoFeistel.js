var texto = "",llave = "", myTable = ""
var slider = document.getElementById("customRange2")

function codFeistel(rondas){
    if(llave.length < (texto.length/2)){
        var str = ""
        var num = (texto.length/2)- llave.length
        for(var i = 0; i < num; i++){
            str+="0"
        }
        str+=llave
        llave = str
    }else if(llave.length < (texto.length/2)){
        alert("La clave debe ser de la mitad del tamaño del texto")
    }
    for(var i = 0; i< rondas; i++){
            _codFeistel()
    }
    document.getElementById('tablePrint').innerHTML = myTable;
    myTable = ""
}

function _codFeistel(){
    var izq, der, res, aux
    izq = texto.substr(0, (texto.length/2))
    der = texto.substr((texto.length/2),texto.length-1)
    myTable += "<tr><td>"+izq+"</td>"+"<td>"+der+"</td></tr>"
    myTable += "<tr><td> </td>"+"<td>"+llave+"</td></tr>"
    res = xor(der, llave)
    myTable += "<tr><td> </td>"+"<td>"+res+"</td></tr>"
    res = xor(res, izq)
    myTable += "<tr><td> </td>"+"<td>"+res+"</td></tr>"
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

function read(){
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files.item(0);
    var reader = new FileReader();

    reader.readAsText(file);
    
    reader.onload = function() {
        let cadena = reader.result
        document.getElementById("codificar").value = cadena
    }
}

function descargar() {
    var valor = document.getElementById("codificado").value
    var blob1 = new Blob(Array.from(valor), { type: "text/plain;charset=utf-8" });
    var isIE = false || !!document.documentMode;
    if (isIE) {
        window.navigator.msSaveBlob(blob1, "data.txt");
    } else {
        var url = window.URL || window.webkitURL;
        link = url.createObjectURL(blob1);
        var a = document.createElement("a");
        a.download = "CifradoFeistel.txt";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}