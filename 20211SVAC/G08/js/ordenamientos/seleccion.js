var contenido; // contenido del json sin convert
var convert; // contenido del json convertido
var velocidad; // velocidad de animacion
var tipoDato; // para saber si es string o int 
var listaValores = [] // lista donde se guardaran los numeros o strings a ordenar

// E  V  E  N  T  O  S
// ----- ORDENAR -----
var btn_Orden = document.getElementById("ordenar");
btn_Orden.addEventListener("click", infoFile,true);

// ----- GUARDAR ARCHIVO -----
var btn_Save = document.getElementById("guardar");
btn_Save.addEventListener("click", saveFile,true);

// ----- LIMPIAR PANTALLA ----- 
var btn_clear = document.getElementById("limpiar");
btn_clear.addEventListener("click", limpiar)

// ----- VELOCIDAD -----
var btn_velocidad = document.getElementById("velocidad");
btn_velocidad.addEventListener("click", datoVelocidad)

// V  A  R  I  A  B  L  E  S  -  G  L  O  B  A  L  E  S
var listaValores = [];
var listaWords = [];
var tipoDato;


// F  U  N  C  I  O  N  E  S  -  E  V  E  N  T  O  S

// ***** LIMPIAR PANTALLA *****
function limpiar(){
    window.location.reload();
}

// ***** MANIPULACION DE DATOS PARA GUARDAR ARCHIVO JSON*****
function saveFile(){
    console.log("Save");
    if (tipoDato == 'number'){
        var listaFile = listaValores;
    } else {
        var listaFile = listaWords;
    }
    

    var fileJ = {
        "categoria": `${convert.categoria}`,
        "nombre": `${convert.nombre}`,
        "valores": listaFile
    }

    let saveArchivo = new Blob([JSON.stringify(fileJ)],{type:"application/json"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(saveArchivo);
    a.download = "seleccion.json";
    a.click();

}

// ***** GUARDAR VELOCIDAD *****
function datoVelocidad(){
    velocidad = document.getElementById("numVelocidad").value;

}

// ***** GUARDAR Y CONVERTIR CONTENIDO DE ARCHIVO ***** 
function readFile(evento){ // lectura del archivo .json
    let archivo = evento.target.files[0];
    if (archivo){
        let reader = new FileReader();
        reader.onload = function(e){
            contenido = e.target.result;
            // console.log(contenido)
            console.log("-----------")
            convert = JSON.parse(contenido);
            console.log("Valores sin ordenar")
            listaValores = convert.valores;
            listaWords = convert.valores;
            tipoDato = typeof(listaValores[0]);                      
            generateElements(listaValores, tipoDato);

        };
        reader.readAsText(archivo); 

    } else {
        alert("No se ha seleccionado ningun archivo");
    }
}

window.addEventListener('load', ()=>{ // cada vez que cambie 
    document.getElementById('file').addEventListener('change',readFile)
});


// F  U  N  C  I  O  N  E  S -  A  U  X  I  L  I  A  R  E  S


// LONGITUD DE PALABRA 
function longitudWord(palabra){
    var suma = 0; 
    for (var q = 0; q < palabra.length; q++){
        suma = suma + palabra.charCodeAt(q);
    }
    return suma;
}

// VISUALIZADOR DE ORDENAMIENTO BURBUJA
// GENERADOR DE BARRAS
var container = document.getElementById("array");
function generateElements(datos, typeD){
    for (var t = 0; t < datos.length;t++){
        // creando div para cada dato de la lista
        var elemento = document.createElement("div");
        elemento.classList.add("block");
        // añadiendo el estilo a los bloques 
        // ** CAMBIOS DE LONGITUD PENDIENTES **
        if (typeD === 'number'){      // depende del tipo de dato asi sera su height  
            if (datos[t]<=100 ){ // para que se vea mejor depende de su centena
                elemento.style.height = `${datos[t]*4}px`;

            } else if (datos>100 && datos < 1000){

                elemento.style.height = `${datos[t]*0.02}px`;
            } else {
                elemento.style.height = `${datos[t]*0.04}px`;
            } 
        } else{
            var tamWord = longitudWord(datos[t]);
            elemento.style.height = `${tamWord*0.5}px`;
        }
        //elemento.style.height = `${datos[t]*0.05}px`;
        elemento.style.transform=`translate(${t*35}px)`
        // mostrar el valor 
        var elemento_label = document.createElement("label");
        elemento_label.classList.add("block_id");
        elemento_label.innerText = datos[t];
        // colocando los elementos en su espacio determinado
        elemento.appendChild(elemento_label);
        container.appendChild(elemento);
    }
}

// INTERCAMBIO DE POSICION DE BLOQUES
function cambiar(bloque1, bloque2){
    return new Promise((resolve) =>{
        

        // cambiar el estilo de los bloques
        var bloque_tmp = bloque1.style.transform;
        bloque1.style.transform = bloque2.style.transform;
        bloque2.style.transform = bloque_tmp;
        
        window.requestAnimationFrame(function(){
            setTimeout(() =>{
                container.insertBefore(bloque2, bloque1);
                resolve();
            }, 250); // velocidad de animacion
        });
    });
}




// ORDENAMIENTO SELECCION
async function seleccion(delay = 100){
    var bloques = document.querySelectorAll(".block");
    velocidad = 10;
    
    for (var r = 0; r < listaValores.length ; r++){ 
        var valMin = r;
        // minimo de cada ronda
        bloques[r].style.backgroundColor = "darkblue";
        
        for (var g = r + 1 ; g < listaValores.length; g++){
            bloques[g].style.backgroundColor ="#FF4949";
            await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, velocidad*200)
            );
            if (listaValores[valMin] > listaValores[g]){
                if (valMin !== r){
                    bloques[valMin].style.backgroundColor="#6b5b95";
                }
                
                valMin = g;
                //bloques[valMin].style.backgroundColor = "#FF4949";
            } else {
                bloques[g].style.backgroundColor="#6b5b95";
            }
             
        }


        // cambiar los bloques de posicion
        var temp1 = bloques[valMin].style.height;
        var temp2 = bloques[valMin].childNodes[0].innerText;
        bloques[valMin].style.height = bloques[r].style.height;
        bloques[r].style.height = temp1;
        bloques[valMin].childNodes[0].innerText = bloques[r].childNodes[0].innerText;
        bloques[r].childNodes[0].innerText = temp2;
        
        // para hacer el cambio con pequeñas pausas
        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, velocidad*200)
        );

        var tempo = listaValores[r];
        listaValores[r] = listaValores[valMin];
        listaValores[valMin] = tempo;
  
        bloques[valMin].style.backgroundColor="#6b5b95";
        bloques[r].style.backgroundColor="#13CE66";

        if (tipoDato != 'number'){
            var tempo2 = listaWords[r];
            listaWords[r] = listaWords[valMin];
            listaWords[valMin] = tempo2;
        }
    }  
    
}

// ORDENAMIENTO CON STRING
function lonWord(){
    var newLista = [];
    var sumaPalabra = 0;
    for(let i = 0; i < listaValores.length; i++){
        for(let j = 0; j < listaValores[i].length; j++){
            
            sumaPalabra = sumaPalabra + listaValores[i].charCodeAt(j);
        }
        newLista[i] = sumaPalabra;
        sumaPalabra = 0;
    }
    return newLista;
    
    
}


// L E C T U R A - J S O N
function infoFile(){ // metodo que convierte la cadena obtenida del archivo en json y permite leerlo
    if(tipoDato == 'number'){
        seleccion();

    } else {
        //listaWords = listaValores; // haciendo copia de la lista original
        listaValores = lonWord();
        seleccion();
        
    }
       
}


