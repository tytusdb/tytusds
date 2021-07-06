// C  O  D  I  G  O
// C  L  A  S  E  S
class Huffman{
    constructor(){
        this.raiz = null;
        this.diccio = [];
        this.convert = "";
    }
    buildTabla(texto){
        var charac = [];
        this.noLet(charac, texto);
        this.ordenLet(charac);
        var secondL = [];
        var nodo = new Nodo((charac[0].letra + charac[1].letra), (charac[0].numero + charac[1].numero));
        nodo.left = charac[0];
        nodo.right = charac[1];
        secondL.push(nodo);
        for (let i = 2; i < charac.length; i++){
            secondL.push(charac[i]);
        }
        this.ordenLet(secondL);
        this.raiz = this.ab(secondL);

        var ite = 0;
        while (ite < charac.length){
            this.pathA(this.raiz, charac[ite].numero, charac[ite].letra, "");
            ite ++;
        }
        var respuesta = "";
        ite = 0;
        while (ite < texto.length){
            for (let i = 0; i < this.diccio.length; i++){
                if (this.diccio[i].letra == texto[ite]){
                    respuesta += this.diccio[i].code ;
                    break;
                }
            }
            ite++;
        }
        this.convert = respuesta;
        return this.convert;
    }

    noLet(listChar, cadena){
        var i = 1;
        var cadena2 = "";
        listChar.push(new Nodo(cadena[0], 1));
        while (i < cadena.length){
            if (cadena[0] == cadena[i]){
                listChar[listChar.length - 1].numero = listChar[listChar.length - 1].numero + 1;

            } else {
                cadena2 += cadena[i];
            }
            i++
        }
        if (cadena2.length > 0){
            this.noLet(listChar, cadena2);
        }
    }
    ordenLet(listChar){
        for (let i = (listChar.length - 1); i > 0; i--){
            for (let j = 0; j < i; j++){
                if (listChar[j].numero > listChar[j + 1].numero){
                    var aux = listChar[j];
                    listChar[j] = listChar[j + 1];
                    listChar[j + 1] = aux;
                }
            }
        }
    }
    ab(listChar){
        var aux = [];
        var nodo = new Nodo((listChar[0].letra + listChar[1].letra), (listChar[0].numero + listChar[1].numero))
        nodo.left = listChar[0];
        nodo.right = listChar[1];
        aux.push(nodo);
        for (let i = 2; i < listChar.length; i++){
            aux.push(listChar[i]);
        }
        this.ordenLet(aux);
        return aux.length > 1 ? this.ab(aux) : aux[0];
    }
    pathA(nodo, value, charac, cadena){
        if (nodo == null){
            return false;
        }
        if (nodo.numero == value){
            if (nodo.letra == charac){
                this.diccio.push({letra: charac, code: cadena});
                return true;
            }
            return false;
        }
        let cadena2 = cadena + "1";
        if (this.pathA(nodo.right, value, charac, cadena2)){
            return true;
        }
        cadena2 = cadena + "0";
        if (this.pathA(nodo.left, value, charac, cadena2)){
            return true;
        }

    }
    animHuf(){
        return this.diccio;
    }

}



class Nodo{
    constructor(letra, numero){
        this.letra = letra;
        this.numero = numero;
        this.left = null;
        this.right = null;
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
var huf = new Huffman();

// F  U  N  C  I  O  N  E  S  -  E  V  E  N  T  O  S
// ***** CODIFICAR *****
async function codificar(){
    console.log("Codificando")
    velocidad = 10;
    var entrada = document.getElementById("espacioTxt").value;
    var salida = document.getElementById("respuesta");
    var cuadroTabla = document.getElementById("cuadroTabla");
    salida.textContent = "";
    cuadroTabla.textContent = "";
 
    var respu = huf.buildTabla(entrada);
    // guardando respuesta para el saveFile
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

// ***** CONSTRUIR TABLA *****
function animTabla(){
    console.log("construyendo tabla")
    // espacio donde ira la tabla
    var cuadroTabla = document.getElementById("cuadroTabla");

    var conTabla = huf.animHuf();
   
    console.log(conTabla[0].code)
    console.log(conTabla[0].letra)
    
    cuadroTabla.innerHTML = "";
    var tab = "<table class=\"tablero\">";
    // cambie la implementacion y orden para que la tabla fuera vertical
    for (let i = 0; i < conTabla.length + 1; i++){
        tab += "<tr>"
        for (let j = 0; j < 2; j++){
           
            if (j == 0){
                if(i == 0){
                    tab += "<td class =\"encabezado\">"+"LETRA"+"</td>";

                } else {
                    tab += "<td>"+conTabla[i-1].letra+"</td>";

                }
                
            } else if (j == 1){
                if (i == 0){
                    tab += "<td class =\"encabezado\">"+"CODIGO"+"</td>";

                } else {
                    tab += "<td>"+conTabla[i-1].code+"</td>";

                }
                
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
    var cuadroTabla = document.getElementById("cuadroTabla");
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
    a.download = "huffman.txt";
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