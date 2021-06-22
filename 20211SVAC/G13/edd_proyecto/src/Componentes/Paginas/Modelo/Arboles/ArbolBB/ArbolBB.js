const Nodo = require('./Nodo.js');

class ArbolBB{
	constructor(){
		this.raiz=null;
	}
	get_raiz=()=>{return this.raiz;}
	Insertar=(dato)=>{
		let nodo = new Nodo(dato);
		if(this.raiz==null){
			this.raiz=nodo;
		}else{
			this.AgregarNodo(this.raiz,nodo);
		}
	}
	AgregarNodo=(nodo, nuevonodo)=>{
		if(nuevonodo.get_valor()<nodo.get_valor()){
			if(nodo.get_izquierda()==null){
				nodo.set_izquierda(nuevonodo);
			}else{
				this.AgregarNodo(nodo.get_izquierda(),nuevonodo);
			}
		}else{
			if(nodo.get_derecha()==null){
				nodo.set_derecha(nuevonodo);
			}else{
				this.AgregarNodo(nodo.get_derecha(),nuevonodo);
			}
		}
	}
	BuscarNodoMin(nodo){
		if(nodo.get_izquierda()==null){
			return nodo;
		}else{
			return this.BuscarNodoMin(nodo.get_izquierda());
		}
	}
	RemoverNodo=(nodo,dato)=>{
		if(nodo==null){
			return null;
		}else if(dato<nodo.get_valor()){
			nodo.set_izquierda(this.RemoverNodo(nodo.get_izquierda(),dato));
			return nodo;
		}else if(dato>nodo.get_derecha()){
			nodo.set_derecha(this.RemoverNodo(nodo.get_derecha(),dato));
			return nodo;
		}else{
			//Nodo sin hijos
			if(nodo.get_izquierda()==null && nodo.get_derecha()==null){
				nodo=null;
				return nodo;
			}
			//Nodos Con 1 hijo
			if(nodo.get_izquierda()==null){
				nodo=nodo.get_derecha();
				return nodo;
			}else if(nodo.get_derecha()==null){
				nodo=nodo.get_izquierda();
				return nodo;
			}
			let temp = this.BuscarNodoMin(nodo.get_derecha());
			nodo.set_valor(temp.get_valor());
			nodo.set_derecha(this.RemoverNodo(nodo.get_derecha(),temp.get_dato()));
			return nodo;
		}
	}
	EliminarNodo=(dato)=>{ this.raiz=this.RemoverNodo(this.raiz,dato); }

	setNodesDataSet=(nodo,id,dot)=>{
		if(nodo != null){
			dot.push({id:id, label: nodo.get_valor()});	
			[dot,id] = this.setNodesDataSet(nodo.get_izquierda(),id+1,dot);
			[dot,id] = this.setNodesDataSet(nodo.get_derecha(),id+1,dot);
		}
		return [dot,id];
	}
	setEdgesDataSet = (nodo,id,dot) => {
		if(nodo != null){
			dot.push({from:id, to:id+2, arrows: "to"});
			[dot,id] = this.setEdgesDataSet(nodo.get_izquierda(),id+1,dot);
			[dot,id] = this.setEdgesDataSet(nodo.get_derecha(),id+1,dot);
		}
		return [dot,id];
	}
}
module.exports = ArbolBB;