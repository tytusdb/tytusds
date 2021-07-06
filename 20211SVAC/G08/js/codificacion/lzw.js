// C  O  D  I  G  O
class LZW{
    constructor(){
        this.matriz = [];
        this.diccionario = [];
        // Columnas de cada parte de la tabla
        for (let i = 0; i < 5; i++){
            this.matriz[i] = new Array();
        }
    }

    cifrar(contenido){

        // preparando matriz para ingresar cada elemento
        this.matriz[0][0] = "w*";
        this.matriz[1][0] = "K*";
        this.matriz[2][0] = "wK*";
        this.matriz[3][0] = "Diccionario*";
        this.matriz[4][0] = "Salida*";

        // Agregando letras al diccionario
        this.agregarDic(contenido);

        // Variables para cada columna
        var w = "";
        var resultado = "";
        var aux = "";
        var k;
        var cont = 0;
        var wk = "";

        // empezando construccion de tabla virtual
        while (cont < contenido.length){
            k = contenido[cont];
            wk = w + k;

            this.matriz[0][cont + 1] = w;
            this.matriz[1][cont + 1] = k;
            this.matriz[2][cont + 1] = wk;

            aux = this.write(w);
            if (this.findL(wk)){
                w = wk;
            } else {
                resultado += aux;
                this.diccionario.push({letra: wk, valor: this.diccionario.length});
                this.matriz[3][cont + 1] = wk;
                this.matriz[4][cont + 1] = aux;
                w = k;
            }
            cont++;
            



        }
        console.log("Resultado: "+resultado);
        
        this.tabla();
        return resultado;

    }
    tabla(){
        for (let i = 0; i < this.matriz.length; i++){
            for (let j = 0; j < this.matriz[i].length; j++){
                console.log(this.matriz[i][j]);
            }
        }

    }
    agregarDic(contenido){
        var cont = 1;
        var char = "";
        this.diccionario.push({letra: contenido[0], valor: this.diccionario.length});
        while (cont < contenido.length){
            if (contenido[0] != contenido[cont]){
                char += contenido[cont];
            } cont++;
        }
        if (char.length > 0){
            this.agregarDic(char);
        }
    }
    write(col1){
        var cont = 0;
        while (cont < this.diccionario.length){
            if (col1 == this.diccionario[cont].letra){
                return this.diccionario[cont].valor;
            }
            cont++;
        }
        return null;
    }
    findL(chara){
        var cont = 0;
        while (cont < this.diccionario.length){
            if (chara == this.diccionario[cont].letra){
                return true;
            }
            cont ++;
        }
        return false;
    }
    // NUEVO
    aniMatriz(){

        return this.matriz;

    }



}

// E  V  E  N  T  O  S
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

// I  N  S  T  A  N  C  I  A
var lzw = new LZW();

// F  U  N  C  I  O  N  E  S  -  E  V  E  N  T  O  S
// ***** CODIFICAR *****
async function codificar(){
    console.log("Codificando")
    var entrada = document.getElementById("espacioTxt").value;
    var salida = document.getElementById("respuesta");
    var cuadroTabla = document.getElementById("tablaCod");
    salida.textContent = "";
    cuadroTabla.textContent = "";

    var respu = lzw.cifrar(entrada);
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
    animTabla();
    salida.textContent = respu;

}

// ***** CONSTRUYENDO TABLA *****
function animTabla(){
    // espacio donde se colocara la tabla
    var cuadroTabla = document.getElementById("tablaCod");
    // contenido de la matriz 
    var conTabla = lzw.aniMatriz();
    console.log(conTabla.length)
    cuadroTabla.innerHTML = "";
    var tab = "<table class=\"tablero\">";
    // cambie la implementacion y orden para que la tabla fuera vertical
    for (let i = 0; i < conTabla[0].length; i++){
        tab += "<tr>"
        for (let j = 0; j < conTabla.length; j++){

            if (conTabla[j][i] != undefined){
                if (i == 0 && (j == 0 || j == 1 || j == 2 || j == 3 || j == 4)){
                    tab += "<td class =\"encabezado\">"+conTabla[j][i]+"</td>";

                } else {
                    tab += "<td>"+conTabla[j][i]+"</td>";

                }
                
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
    var cuadroTabla = document.getElementById("tablaCod");
    
    //var img = "<img class=\"efectoM\" src=\"../../img/matrix1.gif\">"
    var img = "<img class=\"efectoM\" src=\"https://media.giphy.com/media/AOSwwqVjNZlDO/giphy.gif\">"
    
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
    a.download = "lzw.txt";
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