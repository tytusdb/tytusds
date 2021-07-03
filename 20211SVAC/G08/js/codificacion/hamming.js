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

// F  U  N  C  I  O  N  E  S  -  E  V  E  N  T  O  S
// ***** CODIFICAR *****
function codificar(){
    console.log("Codificando")
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