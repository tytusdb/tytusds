arrayW = []
arrayK = []
arrayWK = []
diccionario =  []
arrayAgregar = []
salida = []


//Simbolo, mostrado en diccionario
class Simbolo{
    constructor(caracter, id){
        this.caracter = caracter
        this.id = id
    }
}

//Arreglo, para descargar el mensaje encriptado
class Arreglo{
    constructor(){
        this.arraysalida = []
    }
}

function read(){
    var fileInput = document.querySelector('input[type="file"]');
    
    var file = fileInput.files.item(0);
    var reader = new FileReader();

    reader.readAsText(file);
    
    reader.onload = function() {
        let cadena = reader.result
        document.getElementById("exampleFormControlTextarea1").value = cadena
    }
}
function aplicar() {
    let text =  document.getElementById("exampleFormControlTextarea1").value
    algoritmo(text)
}

let resultado = null
function algoritmo(cadena){
    
    let w = ""
    let k = ""
    let wk = ""
    let id=0
    resultado = new Arreglo()
    // ingresar caracteres al diccionario.
    for(let i=0; i<cadena.length; i++){
        if(buscarDiccionario(diccionario, cadena.charAt(i)) == false){
            diccionario.push(new Simbolo(cadena.charAt(i), id))
            id++
        }else{
            continue
        }
    }
    //evaluar la cadena 
    for(let i=0; i<cadena.length; i++){
        k = cadena.charAt(i)
        wk = w+k
        arrayW.push(w)
        arrayK.push(k)
        arrayWK.push(wk)
        if(buscarDiccionario(diccionario, wk) == true){
            w = wk
            // no ingresa nada en el diccionario y por lo tanto la salida es nula tambien.
            diccionario.push("")
            salida.push("")
        } else{
            diccionario.push(new Simbolo(wk, id))
            salida.push(buscarId(diccionario, w))
            id++
            w = k
        }
    }

    arrayW.push(w)
    arrayK.push("")
    arrayWK.push("")
    diccionario.push("")
    salida.push(buscarId(diccionario, w))
    let result = ""
    for(let i=0; i<salida.length;i++){
        result = result + salida[i]
    }

    document.getElementById('codificado').value = result

    resultado.arraysalida = salida
    let tableBody = document.getElementById('tbody');
    let dic1 = ""
    let contador=1
    for (let i = 0; i < arrayW.length; i++) {
        setTimeout(function (params) {
            let W = `<td>${arrayW[i]}</td>`;
            let K = `<td>${arrayK[i]}</td>`;
            let WK = `<td>${arrayWK[i]}</td>`;
            let salida1 = `<td>${salida[i]}</td>`;
            if (diccionario[i].caracter == undefined){
                dic1 = `<td>  </td>`;
            }else{
                dic1 = `<td>${diccionario[i].caracter}, ${diccionario[i].id}</td>`;
            }
            tableBody.innerHTML += `<tr>${W + K + WK + dic1 + salida1}</tr>`;
        },(500)*contador)
        contador++
    }  
}

function descargar() {
    var blob1 = new Blob(resultado.arraysalida, { type: "text/plain;charset=utf-8" });
    //Check the Browser.
    var isIE = false || !!document.documentMode;
    if (isIE) {
        window.navigator.msSaveBlob(blob1, "data.txt");
    } else {
        var url = window.URL || window.webkitURL;
        link = url.createObjectURL(blob1);
        var a = document.createElement("a");
        a.download = "encriptarlwz.txt";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}


// buscar en el diccionario y retorna un true o false
function buscarDiccionario(diccionario, caracter){
    for (let i=0; i<diccionario.length; i++){
        if(diccionario[i].caracter == caracter){
            return true
        }
    }
    return false
}

// busca en el diccionario y retorna el id
function buscarId(diccionario, caracter){
    for (let i=0; i<diccionario.length; i++){
        if(diccionario[i].caracter == caracter){
            return diccionario[i].id
        }
    }
    return false
}