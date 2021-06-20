import Nodo from './Nodo';

class EstructuraCola{
	primero=null;
	ultimo=null;

	Encolar = (valor) => {
		const nodo = new Nodo(valor);
		if(this.primero==null){
			this.primero = nodo;
			this.ultimo = nodo;
			return;
		}else{
			this.ultimo.siguiente = nodo;
			this.ultimo= nodo;
		}
	}
	Desencolar = () => {
		let nodo = this.primero;
		let seguir = true;
		while(seguir==true){
			if(nodo.siguiente==this.ultimo){
				this.ultimo = nodo;
				nodo.siguiente = null;
				seguir=false;
			}else{
				nodo = nodo.siguiente;
			}
		}
	}

	Imprimir = () => {
		let nodo = this.primero;
		do{
			console.log(nodo.valor);
			nodo=nodo.siguiente;
		}while(nodo!=null)

	}
	GenerarNodosDOT = () => {
		let nodo = this.primero;
		var dot = [];
		if(nodo!=null){
			if (nodo.siguiente!=null) {
				while(nodo!=this.ultimo){
					var label1 = "" + nodo.valor
					dot.push({id:nodo.valor, label: label1});
					nodo = nodo.siguiente;
				}
			}else{
				var label2 = "" + nodo.valor;
				dot.push({id:nodo.valor, label: label2});
			}
		}else{
			dot.push({id:0, Label: "Null"});
		}
		return dot;
	}
	GenerarEdgesDOT = () => {
		let nodo = this.primero;
		var dot = [];
		if(nodo!=null){
		if (nodo.siguiente!=null) {
				while(nodo!=this.ultimo){
					dot.push({from:nodo.valor, to:nodo.siguiente.valor, arrows: "to"});
					nodo = nodo.siguiente;
				}
			}else{
				dot.push({from:nodo.valor, to:nodo.valor, arrows: "to"});
			}
		}
		return dot;
	}
}

export default EstructuraCola;