
// E  V  E  N  T  O  S

// ----- VELOCIDAD -----
var btn_Valor = document.getElementById("addValor");
btn_Valor.addEventListener("click", insertarV)

// ----- CONSTRUIR TABLA -----
var btn_Tabla = document.getElementById("construir");
btn_Tabla.addEventListener("click", infoTabla);

// ----- ELIMINAR ELEMENTO -----
var btn_Eliminar = document.getElementById("eliminar");
btn_Eliminar.addEventListener("click", eliminar);

// ----- BUSCAR ELEMENTO -----
var btn_Buscar = document.getElementById("buscar");
btn_Buscar.addEventListener("click", buscar);

// ----- ACTUALIZAR ELEMENTO -----
var btn_Actualizar = document.getElementById("actualizar");
btn_Actualizar.addEventListener("click", actualizar);

// ----- VELOCIDAD -----
var btn_Velocidad = document.getElementById("velocidad");
btn_Velocidad.addEventListener("click", getVelocidad);

// ----- GUARDAR ARCHIVO -----
var btn_Save = document.getElementById("guardar");
btn_Save.addEventListener("click", guardar);

// ----- LIMPIAR PANTALLA ----- 
var btn_Clear = document.getElementById("limpiar");
btn_Clear.addEventListener("click", limpiar)

// ----- LIMPIAR PANTALLA ----- 
var btn_RowMaj = document.getElementById("rowMaj");
btn_RowMaj.addEventListener("click", rowMaj)


// V  A  R  I  A  B  L  E  S  -  G  L  O  B  A  L  E  S
var fil;
var col; 
var velocidad;
var conTabla = [];


// F  U  N  C  I  O  N  E  S  -  E  V  E  N  T  O  S
// ***** INSERTAR VALOR EN TABLA *****
function insertarV(){
    var value = document.getElementById("valor").value;
    var x = parseInt(document.getElementById("fila").value);
    var y = parseInt(document.getElementById("colum").value);
    console.log("Insertando: "+value+" en fila: "+x+" columna: "+y);
    conTabla[x][y] = value;
    buildTabla();



   
}

// ***** INFO TABLA *****
function infoTabla(){
    fil = parseInt(document.getElementById("fila").value);
    col = parseInt(document.getElementById("colum").value);
    console.log("fila: "+fil+" columna: "+col);
   
    conTabla = new Array(fil)
    for(let i = 0; i < fil; i++){
        conTabla[i] = new Array(col)
    }

    // ahora que tengo los datos tengo que construir la tabla
    buildTabla();


}
// ***** CONSTRUIR TABLA *****
function buildTabla(){
    velocidad = 10;
    var cuadroTabla = document.getElementById("espacio");
    var control = false;
    cuadroTabla.innerHTML = "";
    var tab = "<table class=\"tablero\">";
    for (let i = 0; i < fil; i++){
        tab += "<tr>"
        for (let j = 0; j < col; j++){

            if(conTabla[i][j] != null){
                console.log("entre")
                tab += "<td>"+conTabla[i][j]+"</td>";
            } else {
                tab += "<td>"+" "+"</td>";
            }  
        }
        
        tab += "</tr>"
    }
    tab += "</table>";
    cuadroTabla.innerHTML = tab;
}

/*
// ***** COL-MAJOR *****
function rowMaj(){
    console.log("Realizando Row-Major");
    // preparar contenido de cada cuadro 
    var cuadroRM = [];
    for (let i = 0; i < col; i++){
        for (let j = 0; j < fil; j++){
            cuadroRM.push({posicion : "("+i+", "+j+")", contenido : conTabla[j][i]})
            
        }
    }
    console.log("-----------------------------")
    console.log(cuadroRM);
    buildCuadros(cuadroRM);
    cuadroRM =  [];
   
}
*/
 
// ***** ROW-MAJOR *****
function rowMaj(){
    console.log("Realizando Row-Major");
    // preparar contenido de cada cuadro 
    var cuadroRM = [];
    for (let i = 0; i < fil; i++){
        for (let j = 0; j < col; j++){
            cuadroRM.push({posicion : "("+i+", "+j+")", contenido : conTabla[i][j]})
        }
    }
    console.log("-----------------------------")
    console.log(cuadroRM);
    buildCuadros(cuadroRM);
    cuadroRM =  [];
   
}

// ***** CONSTRUIR CUADROS *****
async function buildCuadros(bloques){
    velocidad = 10;
    var container = document.getElementById("espacioMaj");

    for (let i = 0; i < bloques.length; i++){
        const div = document.createElement("div");
        div.classList.add('cuadrito');
        if (bloques[i].contenido != undefined){
            div.textContent = bloques[i].posicion+"  ||  "+bloques[i].contenido;

        } else {
            div.textContent = bloques[i].posicion+"  ||  ";
        }
        
        container.appendChild(div);
        await new Promise((resolve) =>
        setTimeout(() =>{
        resolve();
        }, (velocidad*200)) //delay
    );

    }

    
}

// ***** ELIMINAR ELEMENTO *****
function eliminar(){
    console.log("Eliminando");
    var value = document.getElementById("valor").value;
    var x = parseInt(document.getElementById("fila").value);
    var y = parseInt(document.getElementById("colum").value);
    console.log("Insertando: "+value+" en fila: "+x+" columna: "+y);
    conTabla[x][y] = null;
    buildTabla();

   
}

// ***** BUSCAR ELEMENTO *****
function buscar(){
    console.log("Buscando");
    var buscado = document.getElementById("valor").value;
    var x = parseInt(document.getElementById("fila").value);
    var y = parseInt(document.getElementById("colum").value);
    findTabla(buscado);
   
}
// ***** CONSTRUIR TABLA  AL BUSCAR*****
function findTabla(buscado){
    velocidad = 10;
    var cuadroTabla = document.getElementById("espacio");
    var control = false;
    cuadroTabla.innerHTML = "";
    var tab = "<table class=\"tablero\">";
    for (let i = 0; i < fil; i++){
        tab += "<tr>"
        for (let j = 0; j < col; j++){

            if(conTabla[i][j] != null){
                if(conTabla[i][j] == buscado){
                    tab += "<td class =\"buscado\">"+conTabla[i][j]+"</td>";

                } else {
                    tab += "<td>"+conTabla[i][j]+"</td>";
                }
            } else {
                tab += "<td>"+" "+"</td>";
            }    
        } 
        tab += "</tr>"
    }
    tab += "</table>";
    cuadroTabla.innerHTML = tab;
}

// ***** ACTUALIZAR ELEMENTO *****
function actualizar(){
    console.log("Actualizando");
    var value = document.getElementById("valor").value;
    var x = parseInt(document.getElementById("fila").value);
    var y = parseInt(document.getElementById("colum").value);
    console.log("Actualizando: "+value+" en fila: "+x+" columna: "+y);
    conTabla[x][y] = value;
    buildTabla();
   
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
async function guardar(){
    console.log("Guardando JSON");

    // Creando lista con las dimensiones
    var dimens = [];
    dimens.push(fil);
    dimens.push(col);

    // creando lista con los valores de la tabla
    await new Promise((resolve) =>
                setTimeout(() =>{
                    resolve();
                }, (1000)) //delay
            );

    var fileVal = pathTable();
    console.log(".-.-.-.-.-.-.-.-.-.")
    console.log(dimens)
    console.log(fileVal);

    

    var fileJ = {
        "categoria": "Extructura Compuesta",
        "nombre": "Row/Column Major",
        "animacion" : 10,
        "m": dimens,
        "valores": fileVal
    }

    let saveArchivo = new Blob([JSON.stringify(fileJ)],{type:"application/json"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(saveArchivo);
    a.download = "rowMajor.json";
    a.click();
    

}
// ***** RECORRIENDO TABLA *****
function pathTable(){
    var valores = []
    for (let i = 0; i < fil; i++){
        for (let j = 0; j < col; j++){
            if (conTabla[i][j] != null){
                var indices = [];
                indices.push(i);
                indices.push(j);
                valores.push({"indices" : indices, "valor" : conTabla[i][j]});

                indices = [];

            }
        }
    }
    return valores;
}
// ***** LEYENDO ARCHIVO *****
function readFile(evento){ // lectura del archivo .json
    velocidad = 10;
    let archivo = evento.target.files[0];
    if (archivo){
        let reader = new FileReader();
        reader.onload = function(e){
            contenido = e.target.result;
            // console.log(contenido)
            console.log("-----------")
            console.log(contenido);
            convert = JSON.parse(contenido);
            console.log(convert.m)
            // construyendo tabla con las dimensiones del archivo
            fil = convert.m[0]; // FILAS
            col = convert.m[1]; // COLUMNAS
            

            //obteniendo datos y enviando uno por uno a la tabla
            var valCelda = convert.valores;
            console.log(valCelda.length); 
            /*

         
            for (let i = 0; i < valCelda.length; i++){
                conTabla.push({x:valCelda[i].indices[0], y : valCelda[i].indices[1], valor : valCelda[i].valor  })
               
            }
            console.log("Lista -----")
            console.log(conTabla)
            console.log(conTabla[0])
            */

            conTabla = new Array(fil)
            for(let i = 0; i < fil; i++){
                conTabla[i] = new Array(col)
            }
            //Ahora metemos los valores dentro de la matriz
            for(let i = 0; i < valCelda.length; i++){
                let x = valCelda[i].indices[0]
                let y = valCelda[i].indices[1]
                let valor = valCelda[i].valor
                conTabla[x][y] = valor
            }
            console.log(conTabla)
            
            //repeat();
            buildTabla();
            
            

        };
        reader.readAsText(archivo); 

    } else {
        alert("No se ha seleccionado ningun archivo");
    }
}

window.addEventListener('load', ()=>{ // cada vez que cambie 
    document.getElementById('file').addEventListener('change',readFile)
});

// ***** REPETIDOS *****
function repeat(){
    var inds = []
    for (let i= 0; i < conTabla.length; i++) {
        for (let j = 0; j < conTabla.length; j++) {
            if ((conTabla[i].x == conTabla[j].x) && (conTabla[i].y == conTabla[j].y) && (conTabla[i].valor != conTabla[j].valor)){
                inds.push(i);
                
                console.log("Encontre un repetido i: "+i+" j:"+j+" Valor i:"+conTabla[i].valor+" Valor j: "+conTabla[j].valor )
                conTabla.replace(conTabla[i],conTabla[j]);
                conTabla.splice(j,1);
            }    
        }
    }
    
    console.log(conTabla)
}