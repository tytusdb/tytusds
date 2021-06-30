class Graph{
	constructor(){
		this.successors = []
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
			let key = this.getKey(array[i])
			let j = i-1
			while(j>=0 && this.getKey(array[j]) > key){
				array[j+1] = array[j]
				j = j-1
			}
			array[j+1] = key
		}
	}

	addNode(item){
		let nodo = {
			value: item,
			edges: []
		}
		this.successors.push(nodo)
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
		console.log("PROFUNDIDAD:")
		var list = [start];
		while (list.length > 0){
			var current = list.shift();
			console.log(current)
			if (current == end) {
				console.log("Lo encontramos");
				return;
			}
			var temp = this.getSuccessors(current);
			//console.log(temp)
			list = list.concat(temp);
			//console.log(list)
		}
		console.log("No se ha encontrado una ruta")	
	}
}

function Exec(){
	let grafito = new Graph()

	//Agregamos los nodos
	grafito.addNode(1)
	grafito.addNode(2)
	grafito.addNode(3)
	grafito.addNode(4)
	grafito.addNode(5)
	grafito.addNode(6)
	grafito.addNode(7)
	grafito.addNode(8)
	grafito.addNode(9)

	//Agregamos los edges
	//1
	grafito.addEdge(1,2)
	grafito.addEdge(1,4)
	grafito.addEdge(1,5)
	//2
	grafito.addEdge(2,1)
	grafito.addEdge(2,3)
	grafito.addEdge(2,4)
	grafito.addEdge(2,5)
	grafito.addEdge(2,6)
	//3
	grafito.addEdge(3,2)
	grafito.addEdge(3,5)
	grafito.addEdge(3,6)
	//4
	grafito.addEdge(4,1)
	grafito.addEdge(4,2)
	grafito.addEdge(4,5)
	grafito.addEdge(4,7)
	grafito.addEdge(4,8)
	//5
	grafito.addEdge(5,1)
	grafito.addEdge(5,2)
	grafito.addEdge(5,3)
	grafito.addEdge(5,4)
	grafito.addEdge(5,9)
	grafito.addEdge(5,6)
	grafito.addEdge(5,7)
	grafito.addEdge(5,8)
	//6
	grafito.addEdge(6,2)
	grafito.addEdge(6,3)
	grafito.addEdge(6,5)
	grafito.addEdge(6,8)
	grafito.addEdge(6,9)
	//7
	grafito.addEdge(7,4)
	grafito.addEdge(7,5)
	grafito.addEdge(7,8)
	//8
	grafito.addEdge(8,4)
	grafito.addEdge(8,5)
	grafito.addEdge(8,6)
	grafito.addEdge(8,7)
	grafito.addEdge(8,9)
	//9
	grafito.addEdge(9,5)
	grafito.addEdge(9,6)
	grafito.addEdge(9,8)

	//breadth(Inicio:1, Fin:9)
	grafito.breadth(1,5)
}

Exec()