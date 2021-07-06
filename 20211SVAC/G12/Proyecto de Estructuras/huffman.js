var Lista = [];
var tabla = "";

function busqueda(texto){
	var array = [];
  
	for(var i=0; i<texto.length; i++){
		var pertenece = letra_incluida(texto[i], array);
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
    console.log(array)
	return array;
}

function letra_incluida (letra, array) {
	var incluida = false;
	for (var i=0; i<array.length; i++){
		if (letra.toLowerCase()==array[i][0].toLowerCase() || letra.toLowerCase()==array[i][0] || letra==array[i][0].toLowerCase() || letra == array[i][0] || letra.toUpperCase()==array[i][0].toUpperCase() || letra.toUpperCase()==array[i][0] || letra==array[i][0].toUpperCase()){
			incluida = true;
			i=array.length;
		}
	}
    console.log(incluida)
	return incluida;
}

function Nodo (carac, peso, izq, der) {
	this.carac = carac;
	this.peso = peso;
	this.izq = izq;
	this.der = der;
}

function crear_nodos(lista_nodos){
  var nodos = [];
  for(var i=0;i<lista_nodos.length;i++)
    nodos.push(new Nodo(lista_nodos[i][0], lista_nodos[i][1])); //Dejamos vacio izquierda y derecha
  return nodos;
}

function crear_hoja(Izq, Der) {//Esta funcion sera llamada por crear_arbol(){}
        return (new Nodo(Der.carac + Izq.carac, Der.peso + Izq.peso, Der, Izq) );
}

function crear_arbol(nodos) {
    while (nodos.length >1){
        nodos.push(crear_hoja(nodos.pop(), nodos.pop() ) );
		nodos.sort(function ( a, b){
			return b.peso-a.peso;
		});
    }
    return nodos;
}

function codificar(arbol, texto){
	var binario = '';
	var list = [];
	console.log(texto);
	var tamaño = new Set([...texto]).size;
	var nuevo = new Set([...texto]);
	console.log(nuevo);
	console.log(tamaño)
	nuevo.forEach((value) =>{
		console.log(value)
		list.push(value);
	})
	console.log(list[0])
	for(var i = 0; i<tamaño; i++){
		binario += buscar_letra(arbol, list[i]);
	}
    console.log(binario)
	return binario;
}

function total_bits(arbol, texto){
	var binario = '';
	for (var i in texto){
		binario = binario.concat(buscar_letra(arbol, texto[i]));
	}
	return binario.length;
}

function buscar_letra(arbol, letra){
	arbol = arbol[0];
	var binario='';
	while(arbol.izq && arbol.der){
		if((arbol.der.carac).indexOf(letra) !=-1){
	    	binario= binario+"1";
	    	arbol = arbol.der;
	    }

		else if((arbol.izq.carac).indexOf(letra) !=-1){
    		binario=binario+"0";
    		arbol = arbol.izq;
    	}
	}
    console.log(binario)
	return binario;
}

function imprimirPesos(pesos, pesototal){
    var result= '';
    for (var i=0; i<pesos.length; i++){
        if (pesos[i][0] == ' '){
            result= result+"' ' - "+ (pesos[i][1]/pesototal).toFixed(3);
			console.log("->",result)
			Lista.push("' ' -> "+ pesos[i][1] + "/" + pesototal + " = " + (pesos[i][1]/pesototal).toFixed(3))
        }else{
            result= result+pesos[i][0]+" - "+ (pesos[i][1]/pesototal).toFixed(3);
			console.log("<-",result)
			Lista.push(pesos[i][0]+" -> "+ pesos[i][1] + "/" + pesototal + " = " + (pesos[i][1]/pesototal).toFixed(3))
        }
    }
	console.log(pesos)
    return result; 
}

function abrirArchivo(evento){
    let archivo = evento.target.files[0];

    if(archivo){
        let reader = new FileReader();
        reader.onload = function(e){
            let contenido = e.target.result;
            var mydata = contenido;
			document.getElementById('caja').innerHTML = mydata;
        };
        reader.readAsText(archivo);
    }else{
        alert("No se selecciono ningun archivo");
    }
}

window.addEventListener('load', ()=>{
    document.getElementById('Archivo').addEventListener('change', abrirArchivo);
});

function crear(){
	Lista = [];
	document.getElementById('caja2').innerHTML = "";
	tabla += "<table><tbody><tr>";

	var texto = document.getElementById('caja').value;
	console.log(texto);
	console.log(texto.toUpperCase());
	var parrafoM = texto.toUpperCase();
	console.log(parrafoM)
	var buscado = busqueda(parrafoM);
	//console.log(buscado)
	var nodos_creados = crear_nodos(buscado);
	//console.log(nodos_creados)
	var arbol = crear_arbol(nodos_creados);
	//console.log(arbol)
	var codificado = codificar(arbol, parrafoM);
	//console.log(codificado)
	var bits = total_bits(arbol, parrafoM)
	//console.log(bits)
	var pesototal = arbol[0].peso;
	//console.log(pesototal)
	var peso= imprimirPesos(buscado, pesototal);
	//console.log(peso)
	console.log(Lista.length);

	document.getElementById('caja2').innerHTML = "Cadena comprimida con el Algoritmo de huffman" + "\n" + "\n";
	tabla += "<thead><tr><th>" + "Cadena comprimida con el Algoritmo de huffman" + "</th></tr></thead>";
	for(var i = 0; i < Lista.length; i++){
		document.getElementById('caja2').innerHTML += Lista[i] + "\n";
		tabla += "<tr><td>" + Lista[i] + "</td></tr>";
	}
	document.getElementById('caja2').innerHTML += "\n" + "\n" + "Recorrido en Binario" + "\n" + "\n";
	tabla += "<thead><tr><th>" + "Recorrido en Binario" + "</th></tr><thead>"
	document.getElementById('caja2').innerHTML += codificado;
	tabla += "<tr><td>" + codificado + "</td></tr>"
	document.getElementById('caja2').innerHTML += "\n" + "\n" + "El espacio requerido para mandar este mensaje es de:" + "\n" + "\n";
	tabla += "<thead><tr><th>" + "El espacio requerido para mandar este mensaje es de" + "</th></tr></thead>"
	document.getElementById('caja2').innerHTML += bits+ " bits";
	tabla += "<tr><td>" + bits + "bits" + "</td></tr>"
	tabla += "</tbody></table>"
	document.getElementById('tabla').innerHTML = tabla;
}

function descargar_v(){
	var contenido = document.getElementById('caja').value;

    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato = "Codificacion_n"+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

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

function descargar_n(){
	var contenido = document.getElementById('caja2').value;

    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato = "AlgoritmoHuffman"+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

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

