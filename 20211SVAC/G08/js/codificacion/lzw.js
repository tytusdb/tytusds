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

// I  N  S  T  A  N  C  I  A
var lzw = new LZW();

// F  U  N  C  I  O  N  E  S  -  E  V  E  N  T  O  S
// ***** CODIFICAR *****
function codificar(){
    console.log("Codificando")
    var entrada = document.getElementById("espacioTxt").value;
    var salida = document.getElementById("respuesta");
    var respu = lzw.cifrar(entrada);
    salida.textContent = respu;

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