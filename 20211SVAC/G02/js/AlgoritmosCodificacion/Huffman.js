let productos = [];
let productos2 = [];
let productos3 = [];
let binarioMayor = [];


class Nodo {
    constructor(carac, peso, izq, der){
        this.carac = carac;
        this.peso = peso;
        this.izq = izq;
        this.der = der;
    }
}

class Huffman {
    constructor() {
        this.listaDatos = [];
        this.arbol = [];
        this.size = 0;
    }


    letra_incluida (letra, array) {
        var incluida = false;
        for (var i=0; i<array.length; i++){
            if (letra.toLowerCase()==array[i][0].toLowerCase() || letra.toLowerCase()==array[i][0] || letra==array[i][0].toLowerCase() || letra == array[i][0]){
                incluida = true;
                i=array.length;
            }
        }
        return incluida;
    }

    busqueda(texto){
        var array = [];

        for(var i=0; i<texto.length; i++){
            var pertenece = this.letra_incluida(texto[i], array);
            if (pertenece === false){
                var long = array.length;
                array[long]=new Array(2);
                array[long][0]= texto[i];
                array[long][1]= 1;
            }
            else{
                for (var j=0; j<array.length; j++){
                    if (texto[i].toLowerCase()==array[j][0].toLowerCase() || texto[i].toLowerCase()==array[j][0] || texto[i]==array[j][0].toLowerCase() || texto[i] == array[j][0]){
                        array[j][1]+=1;
                        j=array.length;
                    }
                }
            }
        }
        return array;
    }

    crear_nodos(lista_frecs){
        var nodos = [];
        for(var i=0;i<lista_frecs.length;i++) {
            nodos.push(new Nodo(lista_frecs[i][0], lista_frecs[i][1])); //Dejamos vacio izquierda y derecha
        }
        return nodos;
    }

    recorridoNodos(lista_frecs){
        var nodos = [];
        var tamanio = [];
        for(var i=0;i<lista_frecs.length;i++) {
            nodos.push(lista_frecs[i][0], lista_frecs[i][1])
            this.size = this.size + parseInt(lista_frecs[i][1])
        }
        return nodos;
    }

    crear_hoja(nodIzq, nodDer) {//Esta funcion sera llamada por crear_arbol(){}
        return (new Nodo(nodDer.carac + nodIzq.carac, nodDer.peso + nodIzq.peso, nodDer, nodIzq) );
    }

    crear_arbol(nodos) {
        while (nodos.length >1){
            nodos.push(this.crear_hoja(nodos.pop(), nodos.pop() ) );
            nodos.sort(function ( a, b){
                return b.peso-a.peso;
            });
        }
        return nodos;
    }

    codificar(arbol, texto){
        var binario = '';
        for (var i in texto){
            binario = binario.concat(this.buscar_letra(arbol, texto[i]));
        }
        return binario;
    }

    binarios(arbol, texto){
        let binarioInd = '';
        let binario = [];
        for (var i in texto){
            binarioInd = this.buscar_letra(arbol, texto[i])
            binario.push(binarioInd, texto[i])
        }
        return binario;
    }

    codigoBinario(listaBinario, nodos){
        let binarioNorepetidos = [];
        let contador = 0;
        for (let i = 0; i < nodos.length; i++) {
            if (contador === 1)
            {
                let letra = nodos[i-1].toString();
                for (let j = 0; j < listaBinario.length; j++) {
                    if (listaBinario[j] === letra)
                    {
                        binarioNorepetidos.push(listaBinario[j - 1])
                        break
                    }
                }
                contador = 0;
            }else{
                contador++;
            }
        }
        return binarioNorepetidos;
    }

    buscar_letra(arbol, letra){
        arbol = arbol[0];
        var binario='';
        while(arbol.izq && arbol.der){
            if((arbol.der.carac).indexOf(letra)!=-1){
                binario= binario+"1";
                arbol = arbol.der;
            }

            else if((arbol.izq.carac).indexOf(letra)!=-1){
                binario=binario+"0";
                arbol = arbol.izq;
            }
        }
        return binario;
    }

    sizeNodos(){
        return this.size;
    }
}

let H = new Huffman();

function cargaDatos() {
    //limpia tablas
    var Table = document.getElementById("tbody");
    Table.innerHTML = "";

    var Table = document.getElementById("tbody2");
    Table.innerHTML = "";

    var Table = document.getElementById("tbody3");
    Table.innerHTML = "";

    document.getElementById("codificado").value='';

    let valueNodo = document.getElementById('valueNodo').value;
    valueNodo = valueNodo.toLowerCase()
    let contencionDatos = H.busqueda(valueNodo)
    let nodos = H.crear_nodos(contencionDatos)
    let rNodos = H.recorridoNodos(contencionDatos)
    let arbolito = H.crear_arbol(nodos);
    let numerosBinarios = H.binarios(arbolito, valueNodo);
    let binariosEsplicitos = H.codigoBinario(numerosBinarios, rNodos);
    let binariol = H.codificar(arbolito, valueNodo);
    binarioMayor.push(binariol)

    document.getElementById("valueNodo").value="";

    let tabla1 = []
    let contador = 0;
    let anda = 0;
    for (let i = 0; i < rNodos.length; i++) {
        if (contador === 1)
        {
            tabla1.push(rNodos[i-1], rNodos[i], binariosEsplicitos[anda]);

            contador = 0;
            anda ++;
        }else{
            contador++;
        }
    }

    generar_tabla(tabla1);

    let size = H.sizeNodos();
    contador = 0;
    let tabla2 = []
    let andador = 0;
    for (let i = 0; i < rNodos.length; i++) {
        if (contador === 1)
        {
            tabla2.push(rNodos[i-1] + ' ' + rNodos[i] + '/' + size, binariosEsplicitos[andador])
            contador = 0;
            andador++;
        }else{
            contador++;
        }
    }

    generar_tabla2(tabla2);

    //tabla #3
    let tabla3 = [];
    contador = 0;
    let resultado = 0;
    let cantidad = 0;
    let promedio = 0;

    for (let i = 0; i < tabla1.length; i++) {
        if (contador === 2)
        {
            peso = tabla1[i-1];
            binario = tabla1[i]
            sizeB = binario.length

            resultado = resultado + (parseInt(peso) * parseInt(sizeB));
            cantidad = cantidad + peso;

            contador = 0;
        }else{
            contador++;
        }
    }
    promedio = parseFloat(resultado/cantidad)
    tabla3.push(resultado, cantidad, promedio.toFixed(3))

    generar_tabla3(tabla3)

    document.getElementById("codificado").value=binariol;
}

function cargarTabla1(tabla){
    productos = [];
    let contador = 0;
    for (let i = 0; i < tabla.length; i++) {
        if (contador === 2)
        {
            caracter = tabla[i-2];
            peso = tabla[i-1];
            binario = tabla[i]

            productos.push({car: caracter, pes: peso, bin: binario})
            contador = 0;
        }else{
            contador++;
        }
    }
    return productos;
}

function generar_tabla(tabla){
    productos = cargarTabla1(tabla);

    let tableBody = document.getElementById('tbody');
    let contador=1

    for (let i = 0; i < productos.length; i++) {
        setTimeout(function (params) {
        let Caracter = `<td>${productos[i].car}</td>`
        let Frecuencia = `<td>${productos[i].pes}</td>`
        let Codigo = `<td>${productos[i].bin}</td>`

        tableBody.innerHTML += `<tr>${Caracter + Frecuencia + Codigo }</tr>`;
        },(500)*contador)
        contador ++;
    }
}

function cargarTabla2(tabla){
    productos2 = [];
    let contador = 0;
    for (let i = 0; i < tabla.length; i++) {
        if (contador === 1)
        {
            simbolo = tabla[i-1];
            binario = tabla[i]

            productos2.push({sim: simbolo, bin: binario})
            contador = 0;
        }else{
            contador++;
        }
    }
    return productos2;
}

function generar_tabla2(tabla){
    productos2 = cargarTabla2(tabla);

    let tableBody = document.getElementById('tbody2');
    let contador=1

    for (let i = 0; i < productos2.length; i++) {
        setTimeout(function (params) {
            let Simbolo = `<td>${productos2[i].sim}</td>`
            let Codigo = `<td>${productos2[i].bin}</td>`

            tableBody.innerHTML += `<tr>${Simbolo + Codigo }</tr>`;
        },(500)*contador)
        contador ++;
    }
}

function cargarTabla3(tabla){
    productos3 = [];
    let contador = 0;
    for (let i = 0; i < tabla.length; i++) {
        if (contador === 2)
        {
            resultado = tabla[i-2];
            cantidad = tabla[i-1];
            promedio = tabla[i];

            productos3.push({result: resultado, cant: cantidad, prom: promedio})
            contador = 0;
        }else{
            contador++;
        }
    }
    return productos3;
}

function generar_tabla3(tabla){
    productos3 = cargarTabla3(tabla);

    let tableBody = document.getElementById('tbody3');
    let contador = 1

    for (let i = 0; i < productos3.length; i++) {
        setTimeout(function (params) {
            let resultado = `<td>${productos3[i].result}</td>`
            let cantidad = `<td>${productos3[i].cant}</td>`
            let promedio = `<td>${productos3[i].prom}</td>`

            tableBody.innerHTML += `<tr>${resultado + cantidad + promedio }</tr>`;
        },(500)*contador)
        contador ++;
    }
}

function read(callback){
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files.item(0);
    var reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function() {
        let cadena = reader.result
        document.getElementById("valueNodo").value = cadena
    }
}

function descargar() {
    var blob1 = new Blob(binarioMayor, {type: "text/plain;charset=utf-8"});
    //Check the Browser.
    var isIE = false || !!document.documentMode;
    if (isIE) {
        window.navigator.msSaveBlob(blob1, "data.txt");
    } else {
        var url = window.URL || window.webkitURL;
        link = url.createObjectURL(blob1);
        var a = document.createElement("a");
        a.download = "Huffman.txt";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}