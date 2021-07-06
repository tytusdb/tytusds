class AnchuraGrafos{
	constructor(){
		this.DatoNodo = [];
        this.id = 1;
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

	AgregarNodo(DatoActual){
		let nodo = {
			Vertices: DatoActual,
			id: this.id++,
			Aristas: []
		}
		this.DatoNodo.push(nodo)
	}

	EliminarNodo(DatoActual){
		var nodoEliminado;
		for(let i = 0; i < this.DatoNodo.length; i++){
			if(this.DatoNodo[i].Vertices == DatoActual){
				nodoEliminado = this.DatoNodo[i].id;
				this.DatoNodo.splice(i, 1);
				break
			}
		}
		for(let i = 0; i < this.DatoNodo.length; i++){
			for(let j = 0; j < this.DatoNodo[i].Aristas.length; j++){
				if(this.DatoNodo[i].Aristas[j] == DatoActual){
					this.DatoNodo[i].Aristas.splice(j, 1);
					break
				}
			}
		}
		return nodoEliminado;
	}

	ActualizarNodo(DatoActual, NuevoDato){
		var actualizado
		for(let i = 0; i < this.DatoNodo.length; i++){
			if(this.DatoNodo[i].Vertices == DatoActual){
				actualizado = this.DatoNodo[i].id
				this.DatoNodo[i].Vertices = NuevoDato;
				break
			}
		}
		for(let i = 0; i < this.DatoNodo.length; i++){
			for(let j = 0; j < this.DatoNodo[i].Aristas.length; j++){
				if(this.DatoNodo[i].Aristas[j] == DatoActual){
					this.DatoNodo[i].Aristas[j] = NuevoDato;
					this.Insertar(this.DatoNodo[i].Aristas)
					break
				}
			}
		}
		return actualizado
	}

	AgregarVertice(from, to){
		for(let i = 0; i < this.DatoNodo.length; i++){
			if(this.DatoNodo[i].Vertices == from){
				this.DatoNodo[i].Aristas.push(to)
				this.Insertar(this.DatoNodo[i].Aristas)
			}
		}
	}

	ObtenerDatoNodo(DatoActual){
		for(let i = 0; i < this.DatoNodo.length; i++){
			if(DatoActual == this.DatoNodo[i].Vertices){
				return this.DatoNodo[i].Aristas
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
			NodoRecorrido.push(this.ObtenerId(current))
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
			NodoRecorridoIds.push(this.ObtenerId(current))
			console.log(current)
			var auxiliar = this.ObtenerDatoNodo(current);
			ListaNodo = ListaNodo.concat(auxiliar);
		}
		return {NodoRecorrido: NodoRecorridoIds, encontrado: false}
	}

	VerificarExisteNodo(DatoActual){
		for(let i = 0; i < this.DatoNodo.length; i++){
			if(this.DatoNodo[i].Vertices == DatoActual){
				return true
			}
		}
		return false
	}

	VerificarExisteVertice(from, to){
		for(let i = 0; i < this.DatoNodo.length; i++){
			if(this.DatoNodo[i].Vertices == from){
				for(let j = 0; j < this.DatoNodo[i].Aristas.length; j++){
					if(this.DatoNodo[i].Aristas[j] == to){
						return true
					}
				}
			}
		}
		return false
	}

	ObtenerId(DatoActual){
		for(let i = 0; i < this.DatoNodo.length; i++){
			if(this.DatoNodo[i].Vertices == DatoActual){
				return this.DatoNodo[i].id
			}
		}
		return null
	}

	MostrarGrafo(){
		console.log(this.DatoNodo)
	}
	returnValores(){
		return this.DatoNodo
	}
	graficarGrafo(){
		const Animaciones= require('./Animaciones')
        let ani=new Animaciones()
		ani.graficarGrafo(this.convertNodo(this.DatoNodo),{autoResize: true,
			height: '100%',
			width: '100%'})
	}
	convertNodo(array){
		//let Nodos=[]
		let nodes = []
		let edges = []
		debugger
		for (let i = 0; i < array.length; i++) {
			nodes.push({id: array[i].Vertices, label: array[i].Vertices.toString()})
			try {
				for (let j = 0; j < array[i].Aristas.length; j++) {
					edges.push({from: array[i].Vertices, to: array[i].Aristas[j], length: 50})
				}
			} catch (error) {console.log(error)}
		}
		return {nodes: nodes, edges:edges}
	}
}
module.exports = AnchuraGrafos
