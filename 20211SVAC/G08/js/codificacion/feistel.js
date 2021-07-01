
// E  V  E  N  T  O  S
/*
// ----- OBTENER LLAVE -----
var btn_Key = document.getElementById("addLlave");
btn_Key.addEventListener("click", saveKey);

// ----- OBTENER NUM DE RONDAS -----
var btn_Rondas = document.getElementById("addRonda");
btn_Rondas.addEventListener("click", rondaInfo);
*/
// ----- VELOCIDAD -----
var btn_Velocidad = document.getElementById("velocidad");
btn_Velocidad.addEventListener("click", getVelocidad)

// ----- CODIFICAR -----
var btn_Code = document.getElementById("code");
btn_Code.addEventListener("click", codificar);

// ----- GUARDAR ARCHIVO -----
var btn_Save = document.getElementById("guardar");
btn_Save.addEventListener("click", guardar);

// ----- LIMPIAR PANTALLA ----- 
var btn_Clear = document.getElementById("limpiar");
btn_Clear.addEventListener("click", limpiar)

// ----- TEXTAREA -----
var spc_Text = document.getElementById("espacioTxt");

// ----- CUADROS PARA ANIMACION -----
var izqui = document.getElementById("left");
var dere = document.getElementById("right");
var func = document.getElementById("func");
var llavero = document.getElementById("llavero");
var resultado = document.getElementById("respuesta");

// V  A  R  I  A  B  L  E  S  -  G  L  O  B  A  L  E  S
var contenido;
var rondas;
var velocidad;


// F  U  N  C  I  O  N  E  S  -  E  V  E  N  T  O  S
// ****** LLAVE *****
function saveKey(){
    key = document.getElementById("llave").value;

}
// ****** NUMERO DE RONDAS *****
function rondaInfo(){
    rondas = document.getElementById("rondas").value;
    console.log("Numero de rondas: "+rondas);

}
// ***** CODIFICAR TEXTO *****
function codificar(){
    let leftSide = [];
    let rightSide = [];
    console.log("Codificando");
    
    // obteniendo contenido del textarea por si se modifica algo
    var texto = document.getElementById("espacioTxt").value;
    var key = document.getElementById("llave").value;
    rondas = parseInt(document.getElementById("rondas").value);
    
    console.log(texto.length)
    // LA LLAVE SERA POR EL MOMENTO IGUAL A 1 - PENDIENTE DE CAMBIOS
    var llave = llaveBin(convertSB(key).split(""));
    var charBin = convertSB(texto); // lista de caracteres en binario
    console.log(charBin+" - "+llave);
    console.log("rondas: "+parseInt(rondas))
    
    // partir la cadena en dos 
    let pivote = Math.floor(charBin.length / 2);
    for (let i = 0; i < charBin.length; i++){
        if(i < pivote){
            leftSide.push(parseInt(charBin[i]));
        } else {
            rightSide.push(parseInt(charBin[i]));
        }
    }
    if(leftSide.length > llave.length){

        llave = addZero(llave, leftSide.length);

    }
    console.log(leftSide);
    console.log(rightSide);
    console.log(llave);
    console.log("Aplicando Feistel")
    feistel(leftSide, rightSide, llave);
    
    izqui.textContent =leftSide.join("");
    dere.textContent =rightSide.join("");
    llavero.textContent = llave.join("");
    /*
    await new Promise((resolve) =>
                setTimeout(() =>{
                    resolve();
                }, (velocidad*200)) //delay
            );
    */
}

// ***** CIFRADO FEISTEL *****
async function feistel(L, R, key){
    let contador = 0;
    let der = [];
    let temp = [];
    velocidad = 10;
    while(contador < parseInt(rondas)){
        console.log("ITERACION W"+contador)
        
        dere.textContent = R.join("");
        llavero.textContent = key.join("");
        dere.style.backgroundColor = "#FF4949";
        llavero.style.backgroundColor = "#FF4949";

        await new Promise((resolve) =>
        setTimeout(() =>{
            resolve();
        }, (velocidad*200)) //delay
        );

        for(let i = 0; i < R.length; i++){
            temp.push(R[i] ^ key[i])
        } //01110111 //01010110
        
        func.style.backgroundColor = "#29C1F5";
        func.textContent = temp.join("");
        await new Promise((resolve) =>
        setTimeout(() =>{
            resolve();
        }, (velocidad*200)) //delay
        );
        dere.style.backgroundColor = "#FFFFFF";
        llavero.style.backgroundColor = "#FFFFFF";
        func.style.backgroundColor = "#FF4949";
        izqui.style.backgroundColor = "#FF4949";
        await new Promise((resolve) =>
        setTimeout(() =>{
            resolve();
        }, (velocidad*200)) //delay
        );
        console.log(temp);
        for(let j = 0; j < L.length; j++){
            der.push(L[j] ^ temp[j])
        } //00110100
        dere.style.backgroundColor = "#29C1F5";
        dere.textContent = der.join("");
        await new Promise((resolve) =>
        setTimeout(() =>{
            resolve();
        }, (velocidad*200)) //delay
        );
        func.style.backgroundColor = "#FFFFFF";
        izqui.style.backgroundColor = "#FFFFFF";
        dere.style.backgroundColor = "#FFFFFF";
        console.log(der);
        L = R; //01000110
        console.log(L);
        R = der; //00110100
        console.log(R);
        temp = [];
        der = [];

        let ultimo = key.shift();
        key.push(ultimo);
        
        console.log(key);
        izqui.style.backgroundColor = "#E2F240";
        izqui.textContent = L.join("");
        llavero.style.backgroundColor = "#E2F240";
        llavero.textContent = key.join("");
        await new Promise((resolve) =>
        setTimeout(() =>{
            resolve();
        }, (velocidad*200)) //delay
        );
        izqui.style.backgroundColor = "#FFFFFF";
        llavero.style.backgroundColor = "#FFFFFF";

      
        contador++;
    }
    console.log(L.join("")+"  |  "+R.join(""))
    console.log("RESULTADO FINAL")
    console.log(R);
    let allBin = L.join("") + R.join("");
    var codeF = convertBS(allBin);
    console.log(convertBS(allBin));
    resultado.textContent = codeF;

}

// ***** CONVERTIR EL CONTENIDO A BINARIO *****
function convertSB(text) {
    var length = text.length, output = [];
    for (var i = 0;i < length; i++) {
      var bin = text[i].charCodeAt().toString(2);
      output.push(Array(8-bin.length+1).join("0") + bin);
    } 
    return output.join("");
}

function convertBS(str) {
    // Removes the spaces from the binary string
    str = str.replace(/\s+/g, '');
    // Pretty (correct) print binary (add a space every 8 characters)
    str = str.match(/.{1,8}/g).join(" ");

    return str.split(" ").map(function (elem) {
        return String.fromCharCode(parseInt(elem, 2));
    }).join("");
}

// ***** CAMBIAR LLAVE *****
function llaveBin(content){
    let newList = [];
    for(let i = 0; i < content.length; i++){
        newList.push(parseInt(content[i]))
    }
    return newList;
}

// ***** EMPAREJAR LLAVE *****
function addZero(lKey, size){
    while(lKey.length < size){
        lKey.unshift(0);
    }
    return lKey;
}
// ***** LIMPIAR PANTALLA *****
function limpiar(){
    console.log("Limpiando");
    window.location.reload();
}

// ***** CAMBIAR VELOCIDAD *****
function getVelocidad(){
    console.log("Acelerando");
    velocidad = document.getElementById("numVelocidad").value;
   

}

// ***** GUARDAR ARCHIVO *****
function guardar(){
    console.log("Guardando JSON");

}
// ***** LEYENDO ARCHIVO *****
function readFile(evento){ // lectura del archivo .json
    let archivo = evento.target.files[0];
    if (archivo){
        let reader = new FileReader();
        reader.onload = function(e){
            contenido = e.target.result;
            // console.log(contenido)
            console.log("-----------")
            console.log(contenido);
            spc_Text.textContent = contenido;

        };
        reader.readAsText(archivo); 

    } else {
        alert("No se ha seleccionado ningun archivo");
    }
}

window.addEventListener('load', ()=>{ // cada vez que cambie 
    document.getElementById('file').addEventListener('change',readFile)
});