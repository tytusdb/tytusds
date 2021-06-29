class HashCerrada{
	constructor(m){
		this.array = new Array(m)
		this.size = 0
		//this.prime = this.getPrime()
		this.prime = 7
		this.tmp = []
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

	setLinearHash(item){
		this.tmp = []
		let key = this.getKey(item) % this.array.length
		for(let i = key; i < this.array.length; i++){
			this.tmp.push(i)
			if(this.array[i] == null){
				this.array[i] = item
				this.size++
				return {recorrido: this.tmp, actualizar: i}
			}
		}
		for(let i = 0; i < key; i++){
			this.tmp.push(i)
			if(this.array[i] == null){
				this.array[i] = item
				this.size++
				return {recorrido: this.tmp, actualizar: i}
			}
		}
		return {recorrido: this.tmp, actualizar: null}
	}

	searchLinearHash(item){
		this.tmp = []
		let key = this.getKey(item) % this.array.length
		for(let i = key; i < this.array.length; i++){
			this.tmp.push(i)
			if(this.array[i] == null){
				return {recorrido: this.tmp, encontrado: false}
			}
			if(this.array[i] == item){
				return {recorrido: this.tmp, encontrado: true}
			}
		}
		for(let i = 0; i < key; i++){
			this.tmp.push(i)
			if(this.array[i] == null){
				return {recorrido: this.tmp, encontrado: false}
			}
			if(this.array[i] == item){
				return {recorrido: this.tmp, encontrado: true}
			}
		}
		return {recorrido: this.tmp, encontrado: false}
	}

	deleteLinearHash(item){
		this.tmp = []
		let key = this.getKey(item) % this.array.length
		for(let i = key; i < this.array.length; i++){
			this.tmp.push(i)
			if(this.array[i] == null){
				return {recorrido: this.tmp, actualizar: null}
			}
			if(this.array[i] == item){
				this.array[i] = null
				this.size--
				return {recorrido: this.tmp, actualizar: i}
			}
		}
		for(let i = 0; i < key; i++){
			this.tmp.push(i)
			if(this.array[i] == null){
				return {recorrido: this.tmp, actualizar: null}
			}
			if(this.array[i] == item){
				this.array[i] = null
				this.size--
				return {recorrido: this.tmp, actualizar: i}
			}
		}
		return {recorrido: this.tmp, actualizar: null}
	}

	updateLinearHash(item, newItem){
		let eliminado = this.deleteLinearHash(item)
		if(eliminado.actualizar != null){
			let actualizado = this.setLinearHash(newItem)
			if(actualizado.actualizar != null){
				return {
					recorrido: eliminado.recorrido, 
					eliminado: eliminado.actualizar, 
					actualizar: actualizado.actualizar
				}
			}
		}
		return {recorrido: eliminado.recorrido, eliminado: null, actualizar: null}
	}

	setQuadraticHash(item){
		this.tmp = []
		let key = this.getKey(item) % this.array.length
		let i = key
		let h = 0
		do{
			this.tmp.push(i)
			if(this.array[i] == null){
				this.array[i] = item
				this.size++
				return {recorrido: this.tmp, actualizar: i}
			}
			h++
			i = (i+((h + h)-1)) % this.array.length
		}while(i != key)
		return {recorrido: this.tmp, actualizar: null}
	}

	searchQuadraticHash(item){
		this.tmp = []
		let key = this.getKey(item) % this.array.length
		let i = key
		let h = 0
		do{
			this.tmp.push(i)
			if(this.array[i] != null){
				if (this.array[i] == item){
					return {recorrido: this.tmp, encontrado: true}
				}
			} else {
				return {recorrido: this.tmp, encontrado: false}
			}
			h++
			i = (i+((h + h)-1)) % this.array.length
		}while(i != key)
		return {recorrido: this.tmp, encontrado: false}
	}

	deleteQuadraticHash(item){
		this.tmp = []
		let key = this.getKey(item) % this.array.length
		let i = key
		let h = 0
		do{
			this.tmp.push(i)
			if(this.array[i] != null){
				if (this.array[i] == item){
					this.array[i] = null
					this.size--
					return {recorrido: this.tmp, actualizar: i}
				}
			} else {
				return {recorrido: this.tmp, actualizar: null}
			}
			h++
			i = (i+((h + h)-1)) % this.array.length
		}while(i != key)
		return {recorrido: this.tmp, actualizar: null}
	}

	updateQuadraticHash(item, newItem){
		let eliminado = this.deleteQuadraticHash(item)
		if(eliminado.actualizar != null){
			let actualizado = this.setQuadraticHash(newItem)
			if(actualizado.actualizar != null){
				return {
					recorrido: eliminado.recorrido, 
					eliminado: eliminado.actualizar, 
					actualizar: actualizado.actualizar
				}
			}
		}
		return {recorrido: eliminado.recorrido, eliminado: null, actualizar: null}
	}

	setDoubleHash(item){
		this.tmp = []
		if(this.size == this.array.length){
			return {recorrido: this.tmp, actualizar: null}
		}
		let hashing1 = this.hash1(this.getKey(item))
		let hashing2 = this.hash2(this.getKey(item))
		while(this.array[hashing1] != null){
			this.tmp.push(hashing1)
			hashing1 += hashing2
			hashing1 %= this.array.length
		}
		this.tmp.push(hashing1)
		this.array[hashing1] = item
		this.size++
		return {recorrido: this.tmp, actualizar: hashing1}
	}

	searchDoubleHash(item){
		this.tmp = []
		let key = this.hash1(this.getKey(item))
		let hashing1 = this.hash1(this.getKey(item))
		let hashing2 = this.hash2(this.getKey(item))
		do {
			this.tmp.push(hashing1)
			if(this.array[hashing1] == item){
				return {recorrido: this.tmp, encontrado: true}
			}
			hashing1 += hashing2
			hashing1 %= this.array.length
		}while(this.array[hashing1] != null && hashing1 != key);
		return {recorrido: this.tmp, encontrado: false}
	}

	deleteDoubleHash(item){
		this.tmp = []
		let key = this.hash1(this.getKey(item))
		let hashing1 = this.hash1(this.getKey(item))
		let hashing2 = this.hash2(this.getKey(item))
		do {
			this.tmp.push(hashing1)
			if(this.array[hashing1] == item){
				this.array[hashing1] = null
				this.size--
				return {recorrido: this.tmp, actualizar: hashing1}
			}
			hashing1 += hashing2
			hashing1 %= this.array.length
		} while(this.array[hashing1] != null && hashing1 != key);
		return {recorrido: this.tmp, actualizar: null}
	}

	updateDoubleHash(item, newItem){
		let eliminado = this.deleteDoubleHash(item)
		if(eliminado.actualizar != null){
			let actualizado = this.setDoubleHash(newItem)
			if(actualizado.actualizar != null){
				return {
					recorrido: eliminado.recorrido, 
					eliminado: eliminado.actualizar, 
					actualizar: actualizado.actualizar
				}
			}
		}
		return {recorrido: eliminado.recorrido, eliminado: null, actualizar: null}
	}

	getPrime(){
		for(let i = this.array.length-1; i >= 1; i--){
			let cont = 0
			for(let j = 2; j*j <= i; j++){
				if(i % j == 0){
					cont++
				}
			}
			if(cont == 0){
				return i
			}
		}
		return 3
	}

	hash1(key){
		return (key % this.array.length)
	}

	hash2(key){
		let key2 = key % this.array.length
		return (this.prime - (key2 % this.prime))
	}

	rehashing(max, min, modo){
		if((this.size*100/this.array.length) >= max){
			let tmp = [...this.array];
			let mprev = tmp.length
			let m = this.size*100/min
			this.array = new Array(m)
			for(let i = 0; i < mprev; i++){
				if(tmp[i] != undefined){
					if(modo == "linear"){
						this.setLinearHash(tmp[i])
					}
					else if(modo == "quadratic"){
						this.setQuadraticHash(tmp[i])
					}
					else {
						this.setDoubleHash(tmp[i])
					}
				}
			}
			return this.array
		} else {
			return null
		}
	}

	getArray(){
		return this.array
	}

	print(){
		console.log(this.array)
	}
}

/*function prueba(){
	let tablita = new HashCerrada(29)
	tablita.setDoubleHash(34)
	tablita.setDoubleHash(5)
	tablita.setDoubleHash(15)
	tablita.setDoubleHash(1000)
	tablita.setDoubleHash(231)
	tablita.setDoubleHash(55)
	tablita.setDoubleHash(125)
	console.log(tablita.updateDoubleHash(4848484, 6))
	tablita.print()
	/*tablita.setQuadraticHash(10)
	tablita.setQuadraticHash(0)
	tablita.setQuadraticHash(5)
	tablita.setQuadraticHash(77)
	tablita.setQuadraticHash(1000)
	tablita.setQuadraticHash(67)
	tablita.setQuadraticHash(22)
	tablita.setQuadraticHash(1234)
	tablita.print()
	console.log(tablita.updateQuadraticHash(10000, 23))
	/*tablita.setLinearHash(10)
	tablita.setLinearHash(0)
	tablita.setLinearHash(0)
	tablita.setLinearHash(28)
	tablita.setLinearHash(28)
	tablita.setLinearHash(100)
	tablita.setLinearHash(29)
	tablita.setLinearHash(4545)
	tablita.print()
	tablita.deleteLinearHash(10)
	tablita.print()
	tablita.updateLinearHash(10, 9)
	tablita.print()
	console.log(tablita.searchLinearHash(10))
}

prueba()*/