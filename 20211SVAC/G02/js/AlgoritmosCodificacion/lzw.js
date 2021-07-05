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

function read(){
    var fileInput = document.querySelector('input[type="file"]');
    let textarea = document.getElementById("exampleFormControlTextarea1").value
    var file = fileInput.files.item(0);
    var reader = new FileReader();

    reader.readAsText(file);
    
    reader.onload = function() {
        let cadena = reader.result
        document.getElementById("exampleFormControlTextarea1").value = document.getElementById("exampleFormControlTextarea1").value + cadena
        algoritmo(cadena)
    }
}

function algoritmo(cadena){

    let w = ""
    let k = ""
    let wk = ""
    let id=0

    // ingresar caracteres al diccionario.
    for(let i=0; i<cadena.length; i++){
        if(buscarDiccionario(diccionario, cadena.charAt(i)) == false){
            diccionario.push(new Simbolo(cadena.charAt(i), id))
            id++
        }else{
            continue
        }
    }

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


    let myTable= "<table><tr><td style='width: 100px; color: red; text-align: center;'>W</td>";
    myTable+= "<td style='width: 100px; color: red; text-align: center;'>K</td>";
    myTable+="<td style='width: 100px; color: red; text-align: center;'>WK</td>";
    myTable+="<td style='width: 100px; color: red; text-align: center;'>Diccionario</td>";
    myTable+="<td style='width: 100px; color: red; text-align: center;'>Salida</td></tr>";
    myTable+="<tr><td style='width: 100px; text-align: right;'>---------------</td>";
    myTable+="<td style='width: 100px; text-align: right;'>---------------</td>";
    myTable+="<td style='width: 100px; text-align: right;'>---------------</td>";
    myTable+="<td style='width: 100px; text-align: right;'>---------------</td>";
    myTable+="<td style='width: 100px; text-align: right;'>---------------</td></tr>";    

    for (let i = 0; i < arrayW.length; i++) {
  
        myTable+="<tr><td style='width: 100px;text-align: right;'>" + arrayW[i] + "</td>";        
        myTable+="<td style='width: 100px;text-align: right;'>" + arrayK[i] + "</td>";    
        myTable+="<td style='width: 100px;text-align: right;'>" + arrayWK[i] + "</td>";
        if (diccionario[i].caracter == undefined){
            myTable+="<td style='width: 100px;text-align: right;'>" + "" +" " + "" + "</td>";
        }else{
            myTable+="<td style='width: 100px;text-align: right;'>" + diccionario[i].caracter +", " + diccionario[i].id + "</td>";
        } 
        myTable+="<td style='width: 100px;text-align: right;'>" + salida[i] + "</td>";
        myTable+="</tr>";
    }

    myTable+="</table>";
      document.getElementById('tablePrint').innerHTML = myTable;
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