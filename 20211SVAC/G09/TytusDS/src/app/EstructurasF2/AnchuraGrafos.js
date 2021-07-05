class AnchuraGrafos{
	constructor(){
		this.DatoNodo = []
	}

	ObtenerDato(){
		return this.DatoNodo
	}

	getKey(DatoActual){
		let hash = 0
		if(typeof DatoActual === 'string'){
			for(let i = 0; i < DatoActual.length; i++){
				hash += DatoActual.charCodeAt(i)
			}
		} else {
			hash = DatoActual
		}
		return hash
	}

	Insertar(array){
		for(let i = 1; i < array.length; i++){
			let key = array[i]
			let j = i-1
			while(j>=0 && this.getKey(array[j]) > this.getKey(key)){
				array[j+1] = array[j]
				j = j-1
			}
			array[j+1] = key
		}
	}

	AgregarNodo(DatoActual, id){
		let nodo = {
			value: DatoActual,
			id: id,
			edges: []
		}
		this.DatoNodo.push(nodo)
	}

	EliminarNodo(DatoActual){
		var nodoEliminado;
		for(let i = 0; i < this.DatoNodo.length; i++){
			if(this.DatoNodo[i].value == DatoActual){
				nodoEliminado = this.DatoNodo[i].id;
				this.DatoNodo.splice(i, 1);
				break
			}
		}
		for(let i = 0; i < this.DatoNodo.length; i++){
			for(let j = 0; j < this.DatoNodo[i].edges.length; j++){
				if(this.DatoNodo[i].edges[j] == DatoActual){
					this.DatoNodo[i].edges.splice(j, 1);
					break
				}
			}
		}
		return nodoEliminado;
	}

	ActualizarNodo(DatoActual, NuevoDato){
		var actualizado
		for(let i = 0; i < this.DatoNodo.length; i++){
			if(this.DatoNodo[i].value == DatoActual){
				actualizado = this.DatoNodo[i].id
				this.DatoNodo[i].value = NuevoDato;
				break
			}
		}
		for(let i = 0; i < this.DatoNodo.length; i++){
			for(let j = 0; j < this.DatoNodo[i].edges.length; j++){
				if(this.DatoNodo[i].edges[j] == DatoActual){
					this.DatoNodo[i].edges[j] = NuevoDato;
					this.Insertar(this.DatoNodo[i].edges)
					break
				}
			}
		}
		return actualizado
	}

	AgregarVertice(from, to){
		for(let i = 0; i < this.DatoNodo.length; i++){
			if(this.DatoNodo[i].value == from){
				this.DatoNodo[i].edges.push(to)
				this.Insertar(this.DatoNodo[i].edges)
			}
		}
	}

	ObtenerDatoNodo(DatoActual){
		for(let i = 0; i < this.DatoNodo.length; i++){
			if(DatoActual == this.DatoNodo[i].value){
				return this.DatoNodo[i].edges
			}
		}
		return []
	}

	RecorrerAnchura(NodoInicial, NodoFinal){
		let NodoRecorrido = []
		console.log("Recorrido Anchura:")
		var ListaNodo = [NodoInicial];
		while (ListaNodo.length > 0){
			var current = ListaNodo.shift();
			NodoRecorrido.push(this.ObtenerArista(current))
			console.log(current)
			if (current == NodoFinal) {
				console.log("Lo encontramos");
				return {NodoRecorrido: NodoRecorrido, encontrado: true}
			}
			var auxiliar = this.ObtenerDatoNodo(current);
			ListaNodo = ListaNodo.concat(auxiliar);
		}
		console.log("No se ha encontrado una ruta")	
		return {NodoRecorrido: NodoRecorrido, encontrado: false}
	}

	RecorrerAnchura1(NodoInicial){
		let NodoRecorrido = []
		let NodoRecorridoIds = []
		console.log("Recorrido Anchura:")
		var ListaNodo = [NodoInicial];
		while (ListaNodo.length > 0){
			var current = ListaNodo.shift();
			if(NodoRecorrido.includes(current)) continue
			NodoRecorrido.push(current)
			NodoRecorridoIds.push(this.ObtenerArista(current))
			console.log(current)
			var auxiliar = this.ObtenerDatoNodo(current);
			ListaNodo = ListaNodo.concat(auxiliar);
		}
		return {NodoRecorrido: NodoRecorridoIds, encontrado: false}
	}

	VerificarExisteNodo(DatoActual){
		for(let i = 0; i < this.DatoNodo.length; i++){
			if(this.DatoNodo[i].value == DatoActual){
				return true
			}
		}
		return false
	}

	VerificarExisteVertice(from, to){
		for(let i = 0; i < this.DatoNodo.length; i++){
			if(this.DatoNodo[i].value == from){
				for(let j = 0; j < this.DatoNodo[i].edges.length; j++){
					if(this.DatoNodo[i].edges[j] == to){
						return true
					}
				}
			}
		}
		return false
	}

	ObtenerArista(DatoActual){
		for(let i = 0; i < this.DatoNodo.length; i++){
			if(this.DatoNodo[i].value == DatoActual){
				return this.DatoNodo[i].id
			}
		}
		return null
	}

	MostrarGrafo(){
		console.log(this.DatoNodo)
	}
}
module.exports = AnchuraGrafos

function Prueba(){
	let grafo = new AnchuraGrafos()
	//Agregamos los nodos
	grafo.AgregarNodo(1)
	grafo.AgregarNodo(2)
	grafo.AgregarNodo(3)
	grafo.AgregarNodo(4)
	grafo.AgregarNodo(5)
	grafo.AgregarNodo(6)
	grafo.AgregarNodo(7)
	grafo.AgregarNodo(8)
	grafo.AgregarNodo(9)

	grafo.AgregarVertice(1,2)
	grafo.AgregarVertice(1,4)
	grafo.AgregarVertice(1,5)
	
	grafo.AgregarVertice(2,1)
	grafo.AgregarVertice(2,3)
	grafo.AgregarVertice(2,4)
	grafo.AgregarVertice(2,5)
	grafo.AgregarVertice(2,6)
	
	grafo.AgregarVertice(3,2)
	grafo.AgregarVertice(3,5)
	grafo.AgregarVertice(3,6)
	
	grafo.AgregarVertice(4,1)
	grafo.AgregarVertice(4,2)
	grafo.AgregarVertice(4,5)
	grafo.AgregarVertice(4,7)
	grafo.AgregarVertice(4,8)
	
	grafo.AgregarVertice(5,1)
	grafo.AgregarVertice(5,2)
	grafo.AgregarVertice(5,3)
	grafo.AgregarVertice(5,4)
	grafo.AgregarVertice(5,9)
	grafo.AgregarVertice(5,6)
	grafo.AgregarVertice(5,7)
	grafo.AgregarVertice(5,8)

	grafo.AgregarVertice(6,2)
	grafo.AgregarVertice(6,3)
	grafo.AgregarVertice(6,5)
	grafo.AgregarVertice(6,8)
	grafo.AgregarVertice(6,9)
	
	grafo.AgregarVertice(7,4)
	grafo.AgregarVertice(7,5)
	grafo.AgregarVertice(7,8)
	
	grafo.AgregarVertice(8,4)
	grafo.AgregarVertice(8,5)
	grafo.AgregarVertice(8,6)
	grafo.AgregarVertice(8,7)
	grafo.AgregarVertice(8,9)
	
	grafo.AgregarVertice(9,5)
	grafo.AgregarVertice(9,6)
	grafo.AgregarVertice(9,8)
    grafo.EliminarNodo(1);
    grafo.ActualizarNodo(2,10);
    
    grafo.MostrarGrafo();

    grafo.RecorrerAnchura(3,5);
}
//Prueba()