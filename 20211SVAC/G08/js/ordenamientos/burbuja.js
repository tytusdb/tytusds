var contenido;
var convert;
var velocidad;
var tipoDato;
var btn_Orden = document.getElementById("ordenar");
var listaValores = []
btn_Orden.addEventListener("click", infoFile,true);

// GUARDAR ARCHIVO 
var btn_Save = document.getElementById("guardar");
btn_Save.addEventListener("click", saveFile,true);

// LIMPIAR PANTALLA 
var btn_clear = document.getElementById("limpiar");
btn_clear.addEventListener("click", limpiar);

// VELOCIDAD

var btn_velocidad = document.getElementById("velocidad");
btn_velocidad.addEventListener("click", datoVelocidad);

// V  A  R  I  A  B  L  E  S  -  G  L  O  B  A  L  E  S 
var listaValores = [];
var listaWords = [];

// ***** LIMPIAR PANTALLA *****
function limpiar(){
    window.location.reload();
}

function saveFile(){
    console.log("Save")
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
    a.download = "burbuja.json";
    a.click();

}

function datoVelocidad(){
    velocidad = document.getElementById("numVelocidad").value;  
}

// L E C T U R A - A R C H I V O
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

function longitudWord(palabra){
    var suma = 0; 
    for (var q = 0; q < palabra.length; q++){
        suma = suma + palabra.charCodeAt(q);  
    }
    return suma;
}

// V I S U A L I Z A D O R
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



// funcion para intercambiar posicion de bloques
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

// ordenamiento burbuja
async function burbuja(delay = 100){
    var bloques = document.querySelectorAll(".block");
    velocidad = 10;

    // algoritmo del ordenamiento
    for(var v = 0; v < listaValores.length; v+=1){
        for (var c = 0; c < listaValores.length - v - 1; c +=1){
        
            // color de bloques seleccionados
            bloques[c].style.backgroundColor = "#FF4949";
            bloques[c + 1].style.backgroundColor = "#FF4949";

            // delay de 0.1 segundo para que se entienda
            await new Promise((resolve) =>
                setTimeout(() =>{
                    resolve();
                }, (velocidad*200)) //delay
            );

            // comparar los valores para ordenarlos 
            if (listaValores[c] > listaValores[c+1]){
                await cambiar(bloques[c], bloques[c + 1]);
                bloques = document.querySelectorAll(".block");

                var auxa = listaValores[c];
                listaValores[c] = listaValores[c+1];
                listaValores[c+1] = auxa;

                if (tipoDato != 'number'){
                    var auxo = listaWords[c];
                    listaWords[c] = listaWords[c+1];
                    listaWords[c+1] = auxo;
                }
            }
            bloques[c].style.backgroundColor = "#6b5b95";
            bloques[c + 1].style.backgroundColor = "#6b5b95";
        }
        // cambiando el color del elemento mayor
        bloques[bloques.length - v - 1].style.backgroundColor ="#13CE66";
    }
    

}

// ORDENAMIENTO CON STRING
function lonWord(){ // esta funcion obtiene la suma ascii de cada palabra
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
       burbuja();
    } else {
        listaValores = lonWord();
        burbuja();
    }
}


