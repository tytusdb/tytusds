import ListaSimple from '../../Lineales/ListaSimple/ListaSimple'; 
import ListaDoble from '../../Lineales/ListaDoble/ListaDoble';
import ListaCircular from '../../Lineales/ListaCircular/ListaCircular';
import ListaCircularDoble from '../../Lineales/ListaCircularDoble/ListaCDE';
import Pila from '../../Lineales/Pila/Stack';
import Cola from '../../Lineales/Cola/EstructuraCola';
import Nodo from './Nodo.js';


class Compuesta{
	constructor(){
		this.estructuraPrimaria = null;
		this.estructuraSecundaria = null;
		this.primaria = null;
		this.secundaria = null;
		this.lista = [];
	}


	insertar = (primaria, secundaria, dato1, dato2) => {
		if (this.getPrimaria() == null && this.getSecundaria() == null){ // Aca crea una instancia de la estructura
			this.setPrimaria(primaria);
			this.setSecundaria(secundaria);
			this.creatorPrimaria();
			this.creatorSecundaria();
		}
		if(this.getPrimaria()!=null && this.getPrimaria()!= primaria){
			this.setPrimaria(primaria);
			this.creatorPrimaria();
			this.getLista().forEach(element => {
				if (element.getPrincipal()!=null){
					element.setPrincipal(null);
				}
			});
		}
		if(this.getSecundaria()!=null && this.getSecundaria()!= secundaria){
			this.setSecundaria(secundaria);
			this.creatorSecundaria();
			this.getLista().forEach(element => {
				if (element.getSecundaria()!=null){
					element.setSecundaria(null);
				}
			});

		}
		let nodo_principal = this.getEstructuraPrimaria().search(dato1); // Busca el dato1
		let nodo_secundario = this.getEstructuraPrimaria().search(dato2); // Buscael dato2

		let nodo_nuevo = new Nodo(); // Se crea un nuevo Nodo.

		if(nodo_principal != false){ // Si es diferente de null es por que existe un dato
			nodo_nuevo.setPrincipal(dato1);
			this.getLista().forEach(element => { //Busca en la lista si existe el dato.
				if(dato1 == element.getPrincipal()){
					if(nodo_secundario != false){
					nodo_nuevo.setSecundaria(dato2);
					this.getEstructuraSecundaria().insertar(dato2);
					this.lista.push(nodo_nuevo)
					console.log("Dato 1: "+dato1+" - Ya Existe.\nDato 2: "+dato2+" - No Existe")
					}else{
						console.log('Datos ya agregados')
					}
				}
			}) 
		}else{

			if(nodo_secundario != false){
				this.getLista().forEach(element => {
				nodo_nuevo.setSecundaria(dato2);
				if(dato2 == element.getSecundaria()){
					if(nodo_secundario != false){
					nodo_nuevo.setPrincipal(dato1);
					this.getEstructuraPrimaria().insertar(dato1);
					this.lista.push(nodo_nuevo)
					console.log("Dato 1: "+dato1+" - No Existe.\nDato 2: "+dato2+" - Ya Existe")
					}else{
						console.log("Datos ya agregados")
					}
				}
			}); 
			}else{

			this.getEstructuraPrimaria().insertar(dato1);
			this.getEstructuraSecundaria().insertar(dato2);

			nodo_nuevo.setPrincipal(dato1);
			nodo_nuevo.setSecundaria(dato2);
			this.lista.push(nodo_nuevo);

			}
		}
	}

	eliminar = (primaria, secundaria, dato1, dato2) => {

		if (this.getPrimaria() == null && this.getSecundaria() == null){
			alert("INGRESA AMBAS ESTRUCTURAS");
			return null
		}

		if(this.getPrimaria() == "Pila"){
		this.getEstructuraPrimaria().pop();
		}else if(this.getPrimaria() == "Cola"){
		this.getEstructuraPrimaria().Desencolar();
		}else{
		this.getEstructuraPrimaria().eliminar(dato1);
		}

		if(this.getSecundaria() == "Pila"){
			this.getEstructuraSecundaria().pop();
		}else if(this.getSecundaria() == "Cola"){
			this.getEstructuraSecundaria().Desencolar();
		}else{
		this.getEstructuraSecundaria().eliminar(dato2);
		}


	}

	search = (primaria, secundaria, dato1, dato2) => {

		if (this.getPrimaria() == null && this.getSecundaria() == null){
			alert("INGRESA AMBAS ESTRUCTURAS");
			return null
		}

		let valor1 = this.getEstructuraPrimaria().search(dato1)
		let valor2 = this.getEstructuraSecundaria().search(dato2)

		console.log('search')
		console.log(String(valor1)+"-"+String(valor2))
		return {
			nodo1: valor1,
			nodo2: valor2
		}

	}

	update = (primaria, secundaria, dato1, dato2, update1, update2) =>{


		if (this.getPrimaria() == null && this.getSecundaria() == null){
			alert("INGRESA AMBAS ESTRUCTURAS");
			return null
		}
		let valor1 = this.getEstructuraPrimaria().search(dato1);
		let valor2 = this.getEstructuraSecundaria().search(dato2);

		if (valor1!=null){ this.getEstructuraPrimaria().update(dato1, update1); }

		if(valor2!=null){ this.getEstructuraSecundaria().update(dato2, update2); }

	}

	insertar_inicio = (primaria, secundaria, dato1, dato2) => {
		if (this.getPrimaria() == null && this.getSecundaria() == null){
			alert("INGRESA AMBAS ESTRUCTURAS");
			return null
		}

		
		
		if (this.getPrimaria() != "Pila" && this.getPrimaria() != "Cola"){
			let valor1 = this.getEstructuraPrimaria().search(dato1);
			if (valor1==false){
				this.getEstructuraPrimaria().insertar_inicio(dato1)
			}
		}

		if (this.getSecundaria() != "Pila" && this.getSecundaria() != "Cola"){
			let valor2 = this.getEstructuraSecundaria().search(dato2);
			if (valor2==false){
				this.getEstructuraSecundaria().insertar_inicio(dato2)
			}
		}
	}


	insertar_ultimo = (primaria, secundaria, dato1, dato2) => {

		if (this.getPrimaria() == null && this.getSecundaria() == null){
			alert("INGRESA AMBAS ESTRUCTURAS");
			return null
		}


		if (this.getPrimaria() != "Pila" && this.getPrimaria() != "Cola"){
		let valor1 = this.getEstructuraPrimaria().search(dato1);
			if (valor1==false){
				this.getEstructuraPrimaria().insertar_ultimo(dato1)
			}
		}

		if (this.getSecundaria() != "Pila" && this.getSecundaria() != "Cola"){
		let valor2 = this.getEstructuraSecundaria().search(dato2);
			if (valor2==false){
				this.getEstructuraSecundaria().insertar_ultimo(dato2)
			}
		}

	}

	creatorPrimaria = () => {
		if(this.primaria == "Lista Simple"){ 
			this.estructuraPrimaria = new ListaSimple(); 
		}else if(this.primaria == "Lista Doble"){ 
				this.estructuraPrimaria = new ListaDoble(); 
		}else if(this.primaria == "Lista Circular"){ 
				this.estructuraPrimaria = new ListaCircular(); 
		}else if(this.primaria == "Lista Circular Doble"){ 
				this.estructuraPrimaria = new ListaCircularDoble(); 
		}else if(this.primaria == "Pila"){ 
				this.estructuraPrimaria = new Pila(); 
		}else if(this.primaria == "Cola"){ 
				this.estructuraPrimaria = new Cola(); 
		}
	}
	creatorSecundaria = () =>{
		if(this.secundaria == "Lista Simple"){ 
			this.estructuraSecundaria = new ListaSimple(); 
		}else if(this.secundaria == "Lista Doble"){ 
			this.estructuraSecundaria = new ListaDoble(); 
		}else if(this.secundaria == "Lista Circular"){ 
			this.estructuraSecundaria = new ListaCircular(); 
		}else if(this.secundaria == "Lista Circular Doble"){ 
			this.estructuraSecundaria = new ListaCircularDoble(); 
		}else if(this.secundaria == "Pila"){ 
			this.estructuraSecundaria = new Pila(); 
		}else if(this.secundaria == "Cola"){ 
			this.estructuraSecundaria = new Cola(); 
		}

	}
	


	getEstructuraPrimaria = () => { return this.estructuraPrimaria; }
	setEstructuraPrimaria = (primaria) => { this.estructuraPrimaria = primaria; }
	
	getEstructuraSecundaria = () => { return this.estructuraSecundaria; }
	setEstructuraSecundaria = (secundaria) => { this.estructuraSecundaria = secundaria }

	getLista = () => { return this.lista; }

	getPrimaria = () => { return this.primaria; }
	setPrimaria = (primaria) => { this.primaria = primaria}  
	getSecundaria = () => { return this.secundaria; }
	setSecundaria = (secundaria) => { this.secundaria = secundaria; }
}


export default Compuesta;
// module.exports = Compuesta;