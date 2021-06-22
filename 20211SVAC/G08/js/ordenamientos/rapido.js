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


// F  U  N  C  I  O  N  E  S  -  E  V  E  N  T  O  S
var datOrden = [];

// ***** LIMPIAR PANTALLA *****
function limpiar(){
    window.location.reload();
}

// ***** MANIPULACION DE DATOS PARA GUARDAR ARCHIVO JSON*****
function saveFile(){  

    var fileJ = {
        "categoria": `${convert.categoria}`,
        "nombre": `${convert.nombre}`,
        "valores": datOrden
    }

    let saveArchivo = new Blob([JSON.stringify(fileJ)],{type:"application/json"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(saveArchivo);
    a.download = "rapido.json";
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
            tipoDato = typeof(listaValores[0]);    

            //generateElements(listaValores, tipoDato);
            generateSpace(listaValores, tipoDato);

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


var container = document.getElementById("addElement");
function generateSpace(datosFile, typeDa){
    for (let i = 0; i <datosFile.length; i++){
        const td = document.createElement('td');
        td.className = "columnaDatos"
        td.textContent = datosFile[i];
        container.appendChild(td);
        

    }
} 


// ORDENAMIENTO RAPIDO
function rapido(listaV){
    
   
    velocidad =10;
    if (listaV.length ==0){
        return []
    }

    let iPiv = Math.floor(listaV.length / 2);
    let pivote = listaV[iPiv];
    let leftSide = [];
    let rightSide = [];
    
   
     

    for (let i = 0; i < listaV.length; i++){
        if (i != iPiv){
            if (listaV[i] > pivote){
                rightSide.push(listaV[i]);
                
            } else {
                leftSide.push(listaV[i]);
               
            }
        }

    }
    console.log(leftSide+" <- |"+pivote+" | -> "+rightSide)
    
    leftSide = rapido(leftSide);
    
    rightSide = rapido(rightSide);
    console.log("---------------------")
    var listaComplete = leftSide.concat(pivote).concat(rightSide);
    //imprimir(listaComplete, tipoDato)
    return leftSide.concat(pivote).concat(rightSide);
    

}
function imprimir(datosFile, typeDa){
    var fragment = new DocumentFragment();
    const tr = document.createElement('tr');
    tr.textContent = "-";

    for (let i = 0; i <datosFile.length; i++){
        const td = document.createElement('td');
        td.className = "columnaDatos"
        td.textContent = datosFile[i];
        container.appendChild(td);
    }
    tr.appendChild(fragment);

} 
// L E C T U R A - J S O N
function infoFile(){ // metodo que convierte la cadena obtenida del archivo en json y permite leerlo
   

    datOrden = rapido(listaValores);
    console.log("PRUEBAS----------");


    // Mostrar todo ordenado
    console.log(datOrden);
    finalResult(datOrden);

    

}


async function finalResult(values){
    for(let i = 0; i < values.length; i++){
        
            // Creando los cuadros y agregandole el elemento ingresado
            const div = document.createElement("div");
            div.classList.add('cuadrito');
            div.textContent = values[i];
            container.appendChild(div);
            await new Promise((resolve) =>
                setTimeout(() =>{
                resolve();
                }, (velocidad*200)) //delay
            ); 
        
    }

}



