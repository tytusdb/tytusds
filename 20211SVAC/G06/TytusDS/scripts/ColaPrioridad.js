class Nodo {
	constructor(_valor){
		this.valor = _valor;
		this.siguiente = null;
	}
}

class ColaPrioridad {
	constructor(){
		this.primero = null;
		this.ultimo = null;
		this.len = 0;
	}

	add(id, dato, nivel){
		let cont = 0
		const valor = {
			id: id,
			value: dato,
			prioridad: nivel
		}
		let nuevo = new Nodo(valor)
		if(this.primero == null){
			this.primero = nuevo;
			this.ultimo = nuevo;
			this.len++;
			return cont
		} else {
			let tmp = this.primero
			if(tmp.valor.prioridad > nivel){
				nuevo.siguiente = tmp
				this.primero = nuevo
				this.len++;
				return cont
			}
			while(tmp != null){
				if(tmp.siguiente != null){
					if(tmp.siguiente.valor.prioridad > nivel){
						nuevo.siguiente = tmp.siguiente
						tmp.siguiente = nuevo
						this.len++
						return cont + 1
					}
				} else {
					tmp.siguiente = nuevo
					this.ultimo = tmp.siguiente
					this.len++
					return cont + 1
				}
				cont++
				tmp = tmp.siguiente
			}
		}
		return -1
	}

	delete(valor){
		let eliminado = null
		if(this.len != 0){
			if (this.primero == this.ultimo && valor == this.primero.valor.value){
				eliminado = this.primero
				this.primero = null
				this.ultimo = null
				this.len--
			} else if (valor == this.primero.valor.value){
				eliminado = this.primero
				this.primero = this.primero.siguiente
				this.len--
			} else {
				let ant =  this.primero
				let tmp = this.primero.siguiente
				while(tmp != null && valor != tmp.valor.value){
					//Para recorrer la lista
					ant = ant.siguiente
					tmp = tmp.siguiente
				}
				if (tmp != null){
					eliminado = tmp
					ant.siguiente = tmp.siguiente
					if(tmp == this.ultimo){
						this.ultimo = ant
					}
					this.len--
				}
			}
		}
		return eliminado
	}

	remove(){
		let tmp = this.primero
		if(this.primero != null){
			if(this.primero.siguiente != null){
				this.primero = this.primero.siguiente
				this.len--
			} else {
				this.primero = null
				this.ultimo = null
				this.len--
			}
		}
		return tmp
	}

	update(valor, nuevoValor){
		let tmp = this.primero
		while(tmp != null){
			if(valor == tmp.valor.value){
				tmp.valor.value = nuevoValor
				return tmp
			}
			tmp = tmp.siguiente
		}
		return null
	}

	search(valor){
		let tmp = this.primero
		while(tmp != null){
			if(valor == tmp.valor.value){
				return tmp
			}
			tmp = tmp.siguiente
		}
		return null
	}

	toArray(){
		let array = []
		let tmp = this.primero
		while(tmp != null){
			array.push(tmp.valor)
			tmp = tmp.siguiente
		}
		return array
	}

	print(){
		let tmp = this.primero;
		let cadena = "";
		let cont = 0;
		while(tmp != null){
			if (cont == 0){
				cadena += tmp.valor.value;
			} else {
				cadena += "-->" + tmp.valor.value;
			}
			cont++;
			tmp = tmp.siguiente;
		}
		return cadena;
	}
}