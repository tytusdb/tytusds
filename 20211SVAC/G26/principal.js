let archivoCargado;
let valores,categoria,nombre,animacion,repeticion;
let nodoInicio= null;

let nodoSimple=class{
	constructor(valor,siguiente){
		this.siguiente=siguiente;
		this.valor=valor;
	}
}
let nodoDoble=class{
	constructor(valor,siguiente,anterior){
		this.siguiente=siguiente;
		this.valor=valor;
		this.anterior=anterior;
	}
}
let nodoDoblePrioridad=class{
	constructor(valor,prioridad,siguiente,anterior){
		this.siguiente=siguiente;
		this.valor=valor;
		this.anterior=anterior;
		this.prioridad=prioridad;
	}
}
let nodoArbolBinario=class{
	constructor(valor,derecha,izquierda){
		this.derecha=derecha;
		this.izquierda=izquierda;
		this.valor=valor;
	}
}
function ingresoListaSimple(dato){
	if (nodoInicio==null){
		nodoInicio= new nodoSimple(dato,null);
	}else{
		let aux=nodoInicio;
		while(true){
			if (aux.siguiente == null){
				aux.siguiente=new nodoSimple(dato,null);
				break
			}else{
				aux=aux.siguiente;
			}
		}
	}
}
function buscarListaSimple(dato){
	let aux=nodoInicio;
	while(true){
		if(aux.dato==dato){
			return aux;
		}else if(aux.siguiente==null){
			break;
		}else{
			aux=aux.siguiente;
		}
	return null;
	}
}
function eliminarListaSimpleDato(dato){
	aux=buscarListaSimple(dato);
	let auxBusqueda=nodoInicio;
	if (aux==null){
		while(true){
			if(auxBusqueda.siguiente==null){
				nodoInicio=null;
				break;
			}else if(auxBusqueda.siguiente.siguiente==null){
				auxBusqueda.siguiente=null
				break;
			}else{
				auxBusqueda=auxBusqueda.siguiente;
			}
		}
	}else{
		while(true){
			if(auxBusqueda.siguiente==aux){
				auxBusqueda.siguiente=aux.siguiente;
				break;
			}else{
				auxBusqueda=auxBusqueda.siguiente;
			}
		}
	}
}
function actualizarSimple(id,dato){
	let buscador=0;
	let aux=nodoInicio;
	while(id>buscador){
		if(aux.siguiente==null){
			return "Id incorrecto"
		}
		aux=aux.siguiente;
		buscador++;
	}
	aux.dato=dato;
	return "Completado"
}
function actualizarCircular(id,dato){
	let buscador=0;
	let aux=nodoInicio;
	while(id>buscador){
		if(aux.siguiente==nodoInicio){
			return "Id incorrecto"
		}
		aux=aux.siguiente;
		buscador++;
	}
	aux.dato=dato;
	return "Completado"
}
function buscarCircular(dato){
	let aux = nodoInicio;
	while(true){
		if(aux.dato==dato){
			return aux;
		}else if(aux.siguiente==nodoInicio){
			break;
		}else{
			aux=aux.siguiente;
		}
	return null;
	}
}
function eliminarListaDobleDato(dato){
	aux=buscarCircular(dato);
	let auxBusqueda=nodoInicio;
	if (aux==null){
		while(true){
			if(auxBusqueda.siguiente==nodoInicio){
				nodoInicio=null;
				break;
			}else if(auxBusqueda.siguiente.siguiente==nodoInicio){
				auxBusqueda.siguiente=nodoInicio;
				break;
			}else{
				auxBusqueda=auxBusqueda.siguiente;
			}
		}
	}else{
		while(true){
			if(auxBusqueda.siguiente==aux){
				auxBusqueda.siguiente=aux.siguiente;
				break;
			}else{
				auxBusqueda=auxBusqueda.siguiente;
			}
		}
	}
}
function ingresoListaDoble(dato){
	if (nodoInicio==null){
		nodoInicio= new nodoDoble(dato,null,null);
	}else{
		let aux=nodoInicio;
		while(true){
			if (aux.siguiente == null){
				aux.siguiente=new nodoDoble(dato,null,aux);
				break
			}else{
				aux=aux.siguiente;
			}
		}
	}
}
function ingresoListaSimpleCircular(dato){
	if (nodoInicio==null){
		nodoInicio= new nodoSimple(dato,null);
		nodoInicio.siguiente=nodoInicio
	}else{
		let aux=nodoInicio;
		while(true){
			if (aux.siguiente == nodoInicio){
				aux.siguiente=new nodoSimple(dato,nodoInicio);
				break
			}else{
				aux=aux.siguiente;
			}
		}
	}
}
function ingresoListaDobleCircular(dato){
	if (nodoInicio==null){
		nodoInicio= new nodoDoble(dato,null,null);
		nodoInicio.siguiente=nodoInicio;
		nodoInicio.anterior=nodoInicio;
	}else{
		let aux=nodoInicio.anterior;
		aux.siguiente=new nodoDoble(dato,nodoInicio,aux);
	}
}
function ingresoPila(dato){
	if(nodoInicio==null){
		nodoInicio=new nodoSimple(dato,null);
	}else{
		nodoInicio = new nodoSimple(dato,nodoInicio)
	}
}
function ingresoCola(dato){
	if (nodoInicio==null){
		nodoInicio= new nodoDoble(dato,null,null);
		nodoInicio.siguiente=nodoInicio;
		nodoInicio.anterior=nodoInicio;
	}else{
		let aux=nodoInicio.anterior;
		aux.siguiente=new nodoDoble(dato,nodoInicio,aux);
	}
}
function ingresoColaPrioridad(dato,prioridad){
	if(nodoInicio==null){
		nodoInicio=new nodoDoblePrioridad(dato,prioridad,null,null);
		nodoInicio.siguiente=nodoInicio;
		nodoInicio.anterior=nodoInicio;
	}else{
		let aux=nodoInicio;
		while(true){
			if(prioridad<aux.prioridad){
				if(aux==nodoInicio){
					nodoInicio=new nodoDoblePrioridad(dato,prioridad,nodoInicio,nodoInicio.anterior);
					break;
				}else{
					let auxAtras=aux.anterior;
					let nuevo= new nodoDoblePrioridad(dato,prioridad,aux,auxAtras);
					aux.anterior=nuevo;
					auxAtras.siguiente=nuevo;
					break;
				}
			}else if (aux.siguiente == nodoInicio ){
				aux.siguiente=new nodoDoblePrioridad(dato,prioridad,nodoInicio,aux);
				break;
			}else{
				aux=aux.siguiente;
			}
		}
	}
}
function ordenamientoBurbuja(){
	arreglo=valores;
	let imprecion=null;
	for (let nBusqueda1 = 0; nBusqueda1 < arreglo.length-1; nBusqueda1++) {
		for (let nBusqueda2 = 0; nBusqueda2 < arreglo.length- nBusqueda1-1 ; nBusqueda2++) {
			if (arreglo[nBusqueda2]>arreglo[nBusqueda2+1]){
				let aux=arreglo[nBusqueda2];
				arreglo[nBusqueda2]=arreglo[nBusqueda2+1];
				arreglo[nBusqueda2+1]=aux;
			}
		}
		if (imprecion==null){
			imprecion=arreglo.toString()+"\n"
		}else{
			imprecion+=arreglo.toString()+"\n"
		}
	}
	mostrarContenido(imprecion)
	return arreglo;
}
function ordenamientoSeleccion(){
	arreglo=valores;
	let imprecion=null;
	for (let nBusqueda1=0;nBusqueda1<arreglo.length;nBusqueda1++){
		let menor=nBusqueda1;
		for(let nBusqueda2=nBusqueda1+1;nBusqueda2<arreglo.length;nBusqueda2++){
			if(arreglo[menor]>arreglo[nBusqueda2]){
				menor=nBusqueda2;
			}
		}
		let aux=arreglo[nBusqueda1];
		arreglo[nBusqueda1]=arreglo[menor];
		arreglo[menor]=aux;
		if (imprecion==null){
			imprecion=arreglo.toString()+"\n"
		}else{
			imprecion+=arreglo.toString()+"\n"
		}
	}
	mostrarContenido(imprecion)
	return arreglo;
}
function ordenamientoInsercion(){
	arreglo=valores;
	let imprecion;
	for(let nBusqueda1=0;nBusqueda1<arreglo.length-1;nBusqueda1++){
		if (arreglo[nBusqueda1]>arreglo[nBusqueda1+1]){
			for (let nBusqueda2Inversa = nBusqueda1+1;nBusqueda2Inversa>-1;nBusqueda2Inversa--){
				if (arreglo[nBusqueda2Inversa]<arreglo[nBusqueda2Inversa-1]){
					let aux=arreglo[nBusqueda2Inversa];
					arreglo[nBusqueda2Inversa]=arreglo[nBusqueda2Inversa-1];
					arreglo[nBusqueda2Inversa-1]=aux;
				}else{
					break;
				}
			}
		}
		if (imprecion==null){
			imprecion=arreglo.toString()+"\n"
		}else{
			imprecion+=arreglo.toString()+"\n"
		}
	}
	mostrarContenido(imprecion)
	return arreglo;
}
function ordenamientoRapido(){
	arreglo=valores;
	let anterior=[];
	let siguiente=[];
	for(let nBusqueda=1;nBusqueda<arreglo.length;nBusqueda++){
		if (arreglo[0]>arreglo[nBusqueda]){
			anterior.push(arreglo[nBusqueda]);
		}else{
			siguiente.push(arreglo[nBusqueda]);
		}
	}
	if(anterior.length==1 && siguiente.length==1){
		return [anterior[0],arreglo[0],siguiente[0]];
	}else if (anterior.length==1 && siguiente.length==0){
		return [anterior[0],arreglo[0]];
	}else if (siguiente.length==1 && anterior.length==0){
		return [arreglo[0],siguiente[0]];
	}else if( anterior.length==1){
		return [anterior[0],arreglo[0]].concat(ordenamientoRapido(siguiente));
	}else if( siguiente.length==1){
		return ordenamientoRapido(anterior).concat([arreglo[0],siguiente[0]]);
	}else if( anterior.length==0){
		return [arreglo[0]].concat(ordenamientoRapido(siguiente));
	} else if( siguiente.length==0){
		return ordenamientoRapido(anterior).concat([arreglo[0]]);
	}
	return ordenamientoRapido(anterior).concat([arreglo[0]].concat(ordenamientoRapido(siguiente)));
}

function leerArchivo(e) {
  let archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  let lector = new FileReader();
  lector.onload = function(e) {
    let contenido = e.target.result;
    archivoCargado=JSON.parse(contenido)
    obtenerDatos()
  };
  lector.readAsText(archivo);
}

document.getElementById('file-input').addEventListener('change', leerArchivo, false);

function mostrarContenido(contenido) {
  var elemento = document.getElementById('despliegue');
  elemento.innerHTML = contenido;
}
function obtenerDatos(){
	valores=archivoCargado["valores"];
	categoria=archivoCargado["categoria"];
	nombre=archivoCargado["nombre"];
	animacion=archivoCargado["animacion"];
	repeticion=archivoCargado["repeticion"];
}
/*function ingresarABB(dato){
	if(nodoInicio==null){
		nodoinicio = new nodoArbolBinario(dato,null,null);
	}else{
		let aux=nodoInicio;
		while(true){
			if(aux.dato>dato){
				if (dato.derecha ==null){
					aux.derecha= new nodoArbolBinario(dato,null,null);
					break;
				}else{
					aux=aux.derecha;
				}
			}else if(aux.dato<dato){
				if (dato.izquierda ==null){
					aux.izquierda= new nodoArbolBinario(dato,null,null);
					break;
				}else{
					aux=aux.izquierda;
				}
			}
		}
	}

}
function VerificacionAVL(){
	let aux = nodoInicio;

}
function ingresarAVL(dato){
	ingresarABB(dato)
	VerificacionAVL()
}*/
