class Nodo {
	constructor(_valor){
		this.valor = _valor;
		this.siguiente = null;
	}
}

class ListaSimple {
	constructor(){
		this.primero = null;
		this.ultimo = null;
		this.len = 0;
	}

	add(dato){
		let nuevo = new Nodo(dato)
		if(this.primero == null){
			this.primero = nuevo;
			this.ultimo = nuevo;
			this.len++;
		} else {
			this.ultimo.siguiente = nuevo;
			this.ultimo = nuevo;
			this.len++;
		}
		return dato
	}

	delete(valor){
		if(this.len != 0){
			if (this.primero == this.ultimo && valor == this.primero.valor){
				this.primero = null
				this.ultimo = null
				this.len--
			} else if (valor == this.primero.valor){
				this.primero = this.primero.siguiente
				this.len--
			} else {
				let ant =  this.primero
				let tmp = this.primero.siguiente
				while(tmp != null && valor != tmp.valor){
					//Para recorrer la lista
					ant = ant.siguiente
					tmp = tmp.siguiente
				}
				if (tmp != null){
					ant.siguiente = tmp.siguiente
					if(tmp == this.ultimo){
						this.ultimo = ant
					}
					this.len--
				}
			}
		}
	}

	update(valor, nuevoValor){
		let tmp = this.primero
		while(tmp != null){
			if(valor == tmp.valor){
				tmp.valor = nuevoValor
				return
			}
			tmp = tmp.siguiente
		}
	}

	search(valor){
		let tmp = this.primero
		while(tmp != null){
			if(valor == tmp.valor){
				return tmp.valor
			}
			tmp = tmp.siguiente
		}
		return null
	}

	print(){
		let tmp = this.primero;
		let cadena = "";
		let cont = 0;
		while(tmp != null){
			if (cont == 0){
				cadena += tmp.valor;
			} else {
				cadena += "->" + tmp.valor;
			}
			cont++;
			tmp = tmp.siguiente;
		}
		return cadena;
	}
}

/*function main(){
	let listita = new ListaSimple()
	listita.add(12)
	listita.add(10)
	listita.add(11)
	listita.add(13)
	console.log(listita.print())
}

main();*/