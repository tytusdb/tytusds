// E  V  E  N  T  O  S
// C  O  D  I  G  O  
// C  L  A  S  E  S 
class Hamming{
    constructor(){
        this.matriz = [];
        this.convertResult = "";
    }
    cifrar(contenido){
        var nlimit = this.paridad(contenido);
        for (let i = 0; i < (contenido.length + nlimit + 1); i++){
            this.matriz[i] = new Array(nlimit + 4);
        }
        this.fillM(this.matriz, nlimit);
        this.agregarW(this.matriz, contenido);
        var conte = 1;
        while(conte <= nlimit){
            this.paridadC(this.matriz, conte);
            conte++;
        }
        this.convertResult = this.paridadW(this.matriz, nlimit);
        console.log("Resultado: "+this.convertResult);
        return this.convertResult;

    }
    fillM(listW, limite){
        listW[0][1] = "Bits";
        listW[0][2] = "Entrada";
        var noPar = [];
        for (let i = 0; i <= limite; i++){
            noPar.push(Math.pow(2,i));
        }
        var contP = 1;
        var contI = 1;
        for (let i = 1; i < listW.length; i++){
            listW[i][1] = i.toString(2);
            if (noPar.includes(i)){
                listW[i][0] = "p" + contP;
                contP++;
            } else {
                listW[i][0] = "d" + contI;
                contI++;
            }
        }
        contP = 1;
        for (let j = 3; j < listW[0].length - 1; j++){
            listW[0][j] = "p"+contP;
            contP++;
        }
        listW[0][listW[0].length - 1] = "Salida"

    }
    paridad(contenido){
        for (let i = 0; i < contenido.length; i++){
            if (2**i >= contenido.length + i + 1){
                return i;
            }
        }
    }
    agregarW(listW, charac){
        var ind = 0;
        for (let i = 3; i < listW.length; i++){
            if (listW[i][0].includes("d")){
                listW[i][2] = charac[ind];
                ind++;            
            }
        }

    }
    paridadW(listW, limite){
        var charac = "";
        for (let i  = 1; i < listW.length; i++){
            let conteo = 2 + limite;
            while(listW[i][conteo] == null){
                conteo--;
            }
            listW[i][3 + limite] = listW[i][conteo];
            charac += listW[i][3 + limite];
        }
        return charac;
        
    }
    paridadC(listW, f){
        var cont = 0;
        for (let i = 3; i < listW.length; i++){
            if(listW[i][0].includes("d")){
                try{
                    if ((listW[i][1])[listW[i][1].length - f] == "1"){
                        listW[i][2 + f] = listW[i][2];
                        if (listW[i][2 + f] == "1"){
                            cont++;
                        }
                    }
                } catch (error) {}
            }
        }
        if (cont%2 == 0){
            listW[Math.pow(2, f - 1)][2 + f] = "0";
        } else {
            listW[Math.pow(2, f - 1)][2 + f] = "1";
        }
    }
    aniMatriz(){
        return this.matriz;
    }
}
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

// V  A  R  I  A  B  L  E  S  -  G  L  O  B  A  L  E  S
var contenido;
var resulFile;

// I  N  S  T  A  N  C  I  A  -  H  A  M  M  I  N  G
var hamon = new Hamming();

// F  U  N  C  I  O  N  E  S  -  E  V  E  N  T  O  S
// ***** CODIFICAR *****
async function codificar(){
    console.log("Codificando");
    var entrada = document.getElementById("espacioTxt").value;
    var salida = document.getElementById("respuesta");
    var cuadroTabla = document.getElementById("spcTabla");
    var respu = hamon.cifrar(entrada);
    resulFile = respu;

    efectoMatrix();
    await new Promise((resolve) =>
        setTimeout(() =>{
            resolve();
        }, (5000)) //delay
    );  
    

    cuadroTabla.textContent = "";
    await new Promise((resolve) =>
        setTimeout(() =>{
            resolve();
        }, (100)) //delay
    ); 
    buildTabla();
    salida.textContent = respu;

}
function buildTabla(){
    var cuadroTabla = document.getElementById("spcTabla");
    var conTabla = hamon.aniMatriz();
    cuadroTabla.innerHTML = "";
    var tab = "<table class=\"tablero\">";
    // cambie la implementacion y orden para que la tabla fuera vertical
    for (let i = 0; i < conTabla[0].length; i++){
        tab += "<tr>"
        for (let j = 0; j < conTabla.length; j++){
            if (conTabla[j][i] != undefined){
                tab += "<td>"+conTabla[j][i]+"</td>";
  
            } else {
                tab += "<td>"+"  "+"</td>";
            }
     
        }
        tab += "</tr>"
    }
    tab += "</table>";
    cuadroTabla.innerHTML = tab;

}
function efectoMatrix(){
    
    //var img = "<img class=\"efectoM\" src=\"../../img/matrix1.gif\">"
    var img = "<img class=\"efectoM\" src=\"https://media.giphy.com/media/AOSwwqVjNZlDO/giphy.gif\">"
    var cuadroTabla = document.getElementById("spcTabla");
    cuadroTabla.innerHTML = img;
}

// ***** LIMPIAR PANTALLA *****
function limpiar(){
    console.log("Limpiando");
    window.location.reload();
}

// ***** CAMBIAR VELOCIDAD *****
function getVelocidad(){
    console.log("Acelerando");
    var spc_Text = document.getElementById("espacioTxt").value;
    console.log(spc_Text)

}

// ***** GUARDAR ARCHIVO *****
function guardar(){
    console.log("Guardando .txt"); 
    let saveArchivo = new Blob([resulFile],{type:"application/txt"});
    let a = document.createElement("a");
    a.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(resulFile));
    a.href = URL.createObjectURL(saveArchivo);
    a.download = "hamming.txt";
    a.click();
    
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