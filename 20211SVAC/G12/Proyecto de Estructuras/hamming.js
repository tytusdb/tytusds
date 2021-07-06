let lista_valores = [];
let lista_valores_nuevos = [];
let listafila = [];
let listaoficial = [];
let contador = 0;
var tabla = "";
var tabla_valor = "";
var descarga = "";
const verificacion = n => n == 1 || Math.log2(n) % 1 == 0;
const paridad = input => {

    tabla += "<table><tbody><tr>";

    let hamming = '';

    let preHamming = '';
    let uso = 0;
    const tamañofinal = input.length + Math.log2(input.length) + 1;
    for(let i = 0; i < tamañofinal; i++){
        preHamming += verificacion(i + 1) ? 0 : input[uso++];
    }

    for(var i = 0; i<preHamming.length; i++){
        lista_valores_nuevos.push(" ");
    }

    let dato = 0;

    for(let i = 0; i<preHamming.length; i++){
        const posicion = i + 1;
        if(!verificacion(posicion)){
            hamming += preHamming[i];
            dato++;
            lista_valores.push("d"+dato);
            tabla_valor += "<td>" + preHamming[i] + "</td>";
            lista_valores_nuevos.splice(posicion-1,1,preHamming[i]);
            continue;
        }

        let count = 0;
        for(let j = i; j<preHamming.length; j += 2 * posicion){
            const slice = preHamming.slice(j, j + posicion);
            for(let k = 0; k<slice.length; k++){
                count += Number(slice[k]);
                lista_valores_nuevos.splice(dato,1,slice[k]);
            }
        }
        contador++;
        lista_valores_nuevos.splice(posicion-1,1,count % 2);
        tabla_valor += "<td>" + count % 2 + "</td>";
        hamming += `${count % 2}`
        lista_valores.push("p"+posicion)
    }

    descarga = hamming;
    console.log("Input: ", input);
    console.log("Hamming: ", hamming);

    tabla += "<thead>";
    for(var i = 0; i<lista_valores.length; i++){
        tabla += "<th>" + lista_valores[i] + "</th>";
    }
    tabla += "</thead>";
    tabla += "<tr>";
    tabla += tabla_valor;
    tabla += "</tr></tbody></table>"
    document.getElementById('tabla').innerHTML = tabla;
}

function crear(){
    var dato = document.getElementById('codigo').value;
    document.getElementById("tabla").innerHTML="";
    tabla = "";
    tabla_valor = "";
    lista_valores = [];
    lista_valores_nuevos = [];
    paridad(dato);
}

function abrirArchivo(evento){
    let archivo = evento.target.files[0];

    if(archivo){
        let reader = new FileReader();
        reader.onload = function(e){
            let contenido = e.target.result;
            var mydata = contenido;
            document.getElementById("tabla").innerHTML="";
            tabla = "";
            tabla_valor = "";
            lista_valores = [];
            lista_valores_nuevos = [];
            paridad(mydata);
        };
        reader.readAsText(archivo);
    }else{
        alert("No se selecciono ningun archivo");
    }
}

window.addEventListener('load', ()=>{
    document.getElementById('Archivo').addEventListener('change', abrirArchivo);
});

function descargar(){
	var contenido = descarga;

    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato = "hamming"+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

    var nombre= formato+".txt";//nombre del archivo
    var file=new Blob([contenido], {type: 'text/plain'});

    if(window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(file, nombre);
    }else{
        var a=document.createElement("a"),url=URL.createObjectURL(file);
        a.href=url;
        a.download=nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        },0); 
    }
}