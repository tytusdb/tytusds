var ma, pal = ""
var slider = document.getElementById("customRange2")

function llenarPalabra(palabra, longitud, red){
    var str = "", contadorparidad = 0, contadorpalabra = 0 
    for(var i = 0; i < longitud; i++){
        if(Math.pow(2, contadorparidad) == i+1){
            str += "-"
            contadorparidad++
        }else{
            str += palabra.charAt(contadorpalabra++)
        }
    }
    pal = str
    var str = paridad(str, red)
    return str
}

function paridad(palabra, red){
    var mat = [], str = ""
    var pow = 0, contadoraux = 0, ingresando = false
    for(var i = 0; i<red; i++){
        mat.push([])
    }
    for(var i = 0; i< red; i++){
        pow = Math.pow(2, i) -1
        ingresando = true
        for(var j = pow; j < palabra.length; j++){
            if(ingresando){
                contadoraux++
                mat[i][j] = palabra.charAt(j)
                if(contadoraux == pow+1){
                    ingresando = false
                    contadoraux = 0
                }
            }else{
                mat[i][j] = "-"
                contadoraux++
                if(contadoraux == pow+1){
                    ingresando = true
                    contadoraux = 0
                }
            }
        }
        contadoraux = 0
        ingresando = false
    }
    for(var i = 0; i<red; i++){
        pow = Math.pow(2, i) -1
        for(var j = pow; j < palabra.length; j++){
            if(mat[i][j] == "1"){
                contadoraux++
            }
        }
        if(espar(contadoraux)){
            mat[i][pow] = "0"
        }else{
            mat[i][pow] = "1"
        }
        contadoraux = 0
    }
    contadoraux = 0
    for(var i = 0; i < palabra.length; i++){
        if(i == (Math.pow(2, contadoraux)-1)){
            str += mat[contadoraux][Math.pow(2, contadoraux)-1]
            contadoraux++
        }else{
            str += palabra.charAt(i)
        }
    }
    ma = mat
    return str
}

function espar(valor){
    if (valor%2==0) {
        return true;
    }
    return false;
}

function Hamming(cadena){
    var longitud = cadena.length
    var red = 1
    while(Math.pow(2, red) < (longitud+red+1)){
        red++
    }
    return cadena = llenarPalabra(cadena, longitud+red+1, red)
}

function graficar(){

    let myTable= "<tr>";
    myTable+= "<td>Palabra</td>";
    for(var i = 0; i< pal.length; i++){
        if(pal.charAt(i)== "1" || pal.charAt(i)== "0"){
            myTable+= "<td>"+pal.charAt(i)+"</td>"
        }else{
            myTable+= "<td>-</td>"
        }
    }
    myTable+="</tr>";
    var count = 1
    var contador =1
    for(var i = 0; i< ma.length; i++){
        myTable+="<tr><td>p"+count.toString()+"</td>";
        count++
        for(var j = 0; j < ma[i].length; j++){
            if(ma[i][j] == "0" || ma[i][j] == "1"){
                myTable+= "<td>"+ma[i][j]+"</td>"
            }else{
                myTable+= "<td>-</td>"
            }
        }
        myTable+="</tr>";
        tablePrint.innerHTML = myTable
        contador++

    }
      document.getElementById('tablePrint').innerHTML = myTable;
}

function Cif(){
    var valor = document.getElementById("codificar").value
    document.getElementById("codificado").value = Hamming(valor)
}

function read(){
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files.item(0);
    var reader = new FileReader();

    reader.readAsText(file);
    
    reader.onload = function() {
        let cadena = reader.result
        document.getElementById("codificar").value = cadena
        Cif()
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
        a.download = "CodigoHamming.txt";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}