class Graph{
	constructor(){
		this.successors = []
	}

	getData(){
		return this.successors
	}

	getKey(item){
		let hash = 0
		if(typeof item === 'string'){
			for(let i = 0; i < item.length; i++){
				hash += item.charCodeAt(i)
			}
		} else {
			hash = item
		}
		return hash
	}

	insercion(array){
		for(let i = 1; i < array.length; i++){
			let keyCompare = array[i].value
			let key = array[i]
			let j = i-1
			while(j>=0 && this.getKey(array[j].value) > this.getKey(keyCompare)){
				array[j+1] = array[j]
				j = j-1
			}
			array[j+1] = key
		}
	}

	insercionDistance(array){
		for(let i = 1; i < array.length; i++){
			let keyCompare = array[i].distance
			let key = array[i]
			let j = i-1
			while(j>=0 && this.getKey(array[j].distance) > this.getKey(keyCompare)){
				array[j+1] = array[j]
				j = j-1
			}
			array[j+1] = key
		}
	}

	addNode(item, id){
		let nodo = {
			value: item,
			id: id,
			edges: []
		}
		this.successors.push(nodo)
	}

	deleteNode(item){
		var eliminado
		for(let i = 0; i < this.successors.length; i++){
			if(this.successors[i].value == item){
				eliminado = this.successors[i].id
				this.successors.splice(i, 1);
				break
			}
		}
		for(let i = 0; i < this.successors.length; i++){
			for(let j = 0; j < this.successors[i].edges.length; j++){
				if(this.successors[i].edges[j].value == item){
					this.successors[i].edges.splice(j, 1);
					break
				}
			}
		}
		return eliminado
	}

	updateNode(item, newItem){
		var actualizado
		for(let i = 0; i < this.successors.length; i++){
			if(this.successors[i].value == item){
				actualizado = this.successors[i].id
				this.successors[i].value = newItem;
				break
			}
		}
		for(let i = 0; i < this.successors.length; i++){
			for(let j = 0; j < this.successors[i].edges.length; j++){
				if(this.successors[i].edges[j].value == item){
					this.successors[i].edges[j].value = newItem;
					this.insercion(this.successors[i].edges)
					break
				}
			}
		}
		return actualizado
	}

	addEdge(from, to, distance){
		//Obtenemos el nodo from
		let arista = {
			value: to,
			distance: distance
		}
		for(let i = 0; i < this.successors.length; i++){
			if(this.successors[i].value == from){
				this.successors[i].edges.push(arista)
				this.insercion(this.successors[i].edges)
			}
		}
	}

	getSuccessors(item){
		for(let i = 0; i < this.successors.length; i++){
			if(item == this.successors[i].value){
				return this.successors[i].edges
			}
		}
		return []
	}

	searchPrim(start, end){
		let recorrido = []
		let recorridoIds = []
		console.log("PROFUNDIDAD:")
		let realStart = {
			value: start,
			distance: 0
		}
		var list = [realStart];
		while (list.length > 0){
			var current = list.shift();
			if(recorrido.includes(current.value)) continue
			recorrido.push(current.value)
			recorridoIds.push(this.getId(current.value))
			console.log("Nodo: " + current.value + ", Distancia: " + current.distance)
			if (current.value == end) {
				console.log("Lo encontramos");
				return {recorrido: recorridoIds, encontrado: true}
			}
			var temp = this.getSuccessors(current.value);
			list = list.concat(temp);
			this.insercionDistance(list)
		}
		console.log(recorridoIds)
		return {recorrido: recorridoIds, encontrado: false}
	}

	recorrerPrim(start){
		let recorrido = []
		let recorridoIds = []
		console.log("PROFUNDIDAD:")
		let realStart = {
			value: start,
			distance: 0
		}
		var list = [realStart];
		while (list.length > 0){
			var current = list.shift();
			if(recorrido.includes(current.value)) continue
			recorrido.push(current.value)
			recorridoIds.push(this.getId(current.value))
			console.log("Nodo: " + current.value + ", Distancia: " + current.distance)
			var temp = this.getSuccessors(current.value);
			list = list.concat(temp);
			this.insercionDistance(list)
		}
		return {recorrido: recorridoIds, encontrado: false}
	}

	existNode(item){
		for(let i = 0; i < this.successors.length; i++){
			if(this.successors[i].value == item){
				return true
			}
		}
		return false
	}

	existEdge(from, to){
		for(let i = 0; i < this.successors.length; i++){
			if(this.successors[i].value == from){
				for(let j = 0; j < this.successors[i].edges.length; j++){
					if(this.successors[i].edges[j].value == to){
						return true
					}
				}
			}
		}
		return false
	}

	getId(item){
		for(let i = 0; i < this.successors.length; i++){
			if(this.successors[i].value == item){
				return this.successors[i].id
			}
		}
		return null
	}

	print(){
		console.log(this.successors)
	}
}