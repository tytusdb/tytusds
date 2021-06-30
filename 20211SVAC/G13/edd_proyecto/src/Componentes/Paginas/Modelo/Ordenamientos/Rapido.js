class Rapido{
	Cambio = (arreglo, pos_izq, pos_der) =>{
		let aux = arreglo[pos_izq];
		arreglo[pos_izq]=arreglo[pos_der];
		arreglo[pos_der]=aux;
	}

	Division = (arreglo, izq, der) =>{
		aproximacion = Math.floor((der+izq)/2); //Calcular el valor de la mitad
		let pivote = arreglo[aproximacion];
		aux_izq=izq;
		aux_der=der;
		while(aux_izq <= aux_der){
			while(arreglo[aux_izq]<pivote){
				aux_izq++;//va hacia adelante
			}
			while(arreglo[aux_der]>pivote){
				aux_der--; //se disminuye debido que va hacia atras
			}
			if(aux_izq <= aux_der){
				this.Cambio(arreglo, aux_izq, aux_der);//Cambio
				aux_izq++;
				aux_der--;
			}
		}
		return aux_izq;
	}

	Ordenamiento=(arreglo,izq, der)=>{
		let pos;
		if(arreglo.length>1){
			pos=this.Division(arreglo,izq, der);
			if(izq<pos-1){
				this.Ordenamiento(arreglo, izq, pos-1);//Recursividad
			}
			if(pos<der){
				this.Ordenamiento(arreglo, pos, der);//Recursividad
			}
		}
		return arreglo;
	}
}
export default Rapido;