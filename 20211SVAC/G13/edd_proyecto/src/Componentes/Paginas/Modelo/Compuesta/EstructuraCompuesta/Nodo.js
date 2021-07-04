class Nodo{

	constructor(){
		this.principal = null; // Hace Referencia a la primero Estructura.
		this.secundaria = null; // Hace Referencia a la segunda Estructura.
	}

	getPrincipal = () => { return this.principal; }
	setPrincipal = (principal) => { this.principal = principal; }
	getSecundaria = () => { return this.secundaria; }
	setSecundaria = (secundaria) => { this.secundaria = secundaria}
}
export default Nodo;
// module.exports = Nodo;