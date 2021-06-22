import Nodo from './Nodo.js'
// const Nodo = require('./Nodo.js');

class ColaPrioridad{
	primero=null;

	Constructor(){
		this.primero= null;
		this.ultimo=null;
	}
	get_primero = () => {return this.primero;}
	set_primero = (primero) => {this.primero = primero;}
	get_ultimo = () => {return this.ultimo;}
	set_ultimo = (ultimo) => {this.ultimo = ultimo;}
	get_vacia = () => {
		if(this.get_primero()==null){
			return true;
		}else{
			return false;
		}
	}
	Encolar = (valor, prioridad) => {
		let nuevonodo = new Nodo(valor);
		if(prioridad!=null && prioridad!=""){
			console.log("Enrtp");
			nuevonodo.set_prioridad(prioridad);
		}
		let nodo = this.get_primero();
		let salir= false;
		if(this.get_vacia()==true){
			this.set_primero(nuevonodo);
			this.set_ultimo(nuevonodo);
		}else{
			console.log(nodo.get_prioridad());
			console.log(prioridad);
			if(prioridad!=null && prioridad!=""){
				do{
					console.log("Entro al while");
					if(nodo.get_siguiente()==null){
						this.get_ultimo().set_siguiente(nuevonodo);
						this.set_ultimo(nuevonodo);
						salir=true;
					}else{
						console.log(nodo.get_prioridad());
						console.log(prioridad);
						if( prioridad <= nodo.get_prioridad()){
							console.log("Entro al if");
							nuevonodo.set_siguiente(nodo.get_siguiente());
							nodo.set_siguiente(nuevonodo);
							salir=true;
						}else if(prioridad>nodo.get_prioridad()){
							console.log("Entro al segundo")
							if(nodo.get_siguiente().get_prioridad()==0){
								nuevonodo.set_siguiente(nodo.get_siguiente());
								nodo.set_siguiente(nuevonodo);
								this.get_ultimo().set_siguiente(nuevonodo);
								this.set_ultimo(nuevonodo);
								salir=true;
							}else if(prioridad<=nodo.get_siguiente().get_prioridad()){
								nuevonodo.set_siguiente(nodo.get_siguiente());
								nodo.set_siguiente(nuevonodo);
								this.get_ultimo().set_siguiente(nuevonodo);
								this.set_ultimo(nuevonodo);
								salir=true;
							}
						}
					}
					nodo = nodo.get_siguiente();
				}while(nodo != null || salir==true);
			}else{
				this.get_ultimo().set_siguiente(nuevonodo);
				this.set_ultimo(nuevonodo);
			}
		}
	}
	Desencolar = () => {
		let nodo = this.primero;
		let seguir = true;
		this.set_primero(this.get_primero().get_siguiente());
	}
	Buscar = (dato) =>{
		let nodo = this.get_primero();
		let i=0;
		if(this.get_vacia() == false){
			do{
				if(nodo.get_valor() == dato){
					return i;
				}
				i++;
				nodo = nodo.get_siguiente();
			}while(nodo != null);
		}else{
			return false;
		}
		return false;
	}

	Imprimir = () => {
		let nodo = this.get_primero();
		do{
			console.log(nodo.get_valor());
			nodo=nodo.get_siguiente();
		}while(nodo!=null)
	}
	GenerarNodosDOT = () => {
		let nodo = this.get_primero();
		var dot = [];
		if(this.get_vacia()==false){
			let id = 0;
			do{
				dot.push({id: id, label: nodo.get_valor()});
				nodo=nodo.get_siguiente();
				id++;
			}while(nodo != null);
		}
		return dot;
	}
	GenerarEdgesDOT = () => {
		let nodo = this.get_primero();
		var dot = [];
		if(this.get_vacia()==false){
			let i = 0;
			do{
				if ( nodo.get_siguiente() != null) {
					let nodoactual=parseInt(i)
					let nodosiguiente = parseInt(nodoactual) + parseInt(1)
					if(i==0){
						dot.push({from:0, to:1, arrows: "to"});
					}
					if(nodoactual != false && nodosiguiente != false){
						dot.push({from:parseInt(nodoactual), to:parseInt(nodosiguiente), arrows: "to"});
					}
				}
				nodo = nodo.get_siguiente();
				i++;
			}while(nodo != null);
		}
		return dot;
	}
}

export default ColaPrioridad;
//module.exports = ColaPrioridad;