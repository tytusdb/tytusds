class Nodo{

	constructor(valor){
		this.siguiente = null;
		this.valor = valor;
		this.prioridad = 0;
	}
	
	get_siguiente(){ return this.siguiente;}
	set_siguiente(nuevonodo){ this.siguiente=nuevonodo;}
	get_valor(){ return this.valor;}
	set_valor(valor){ this.valor=valor;}
	get_prioridad(){return this.prioridad;}
	set_prioridad(valor){this.prioridad=valor;}
}

export default Nodo;
// module.exports = Nodo;