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
			let key = array[i]
			let j = i-1
			while(j>=0 && this.getKey(array[j]) > this.getKey(key)){
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
				if(this.successors[i].edges[j] == item){
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
				if(this.successors[i].edges[j] == item){
					this.successors[i].edges[j] = newItem;
					this.insercion(this.successors[i].edges)
					break
				}
			}
		}
		return actualizado
	}

	addEdge(from, to){
		//Obtenemos el nodo from
		for(let i = 0; i < this.successors.length; i++){
			if(this.successors[i].value == from){
				this.successors[i].edges.push(to)
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

	breadth(start, end){
		let recorrido = []
		console.log("PROFUNDIDAD:")
		var list = [start];
		while (list.length > 0){
			var current = list.shift();
			recorrido.push(this.getId(current))
			console.log(current)
			if (current == end) {
				console.log("Lo encontramos");
				return {recorrido: recorrido, encontrado: true}
			}
			var temp = this.getSuccessors(current);
			//console.log(temp)
			list = list.concat(temp);
			//console.log(list)
		}
		console.log("No se ha encontrado una ruta")
		return {recorrido: recorrido, encontrado: false}
	}

	recorrer(start){
		let recorrido = []
		let recorridoIds = []
		console.log("PROFUNDIDAD:")
		var list = [start];
		while (list.length > 0){
			var current = list.shift();
			if(recorrido.includes(current)) continue
			recorrido.push(current)
			recorridoIds.push(this.getId(current))
			console.log(current)
			var temp = this.getSuccessors(current);
			//console.log(temp)
			list = list.concat(temp);
			//console.log(list)
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
					if(this.successors[i].edges[j] == to){
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
