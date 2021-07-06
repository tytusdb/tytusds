let lista_valores = [];
let lista_valores_nuevos = [];
let listafila = [];
let listaoficial = [];
let contador = 0;
var tabla = "";
var tabla_valor = "";
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

    console.log("Input: ", input);
    console.log("Hamming: ", hamming);

    for(var i = 0; i<lista_valores.length; i++){
        tabla += "<td>" + lista_valores[i] + "</td>";
    }
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