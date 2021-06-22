class Insercion{
	Ordenar = (arreglo) =>{
		let tamanio = arreglo.length;
  		let j, aux;
  		for ( let i = 1; i < tamanio; i++ ) {
  		  j = i;
  		  aux = arreglo[i];
  		  while (j>0 && arreglo[j-1]>aux) {
  		    arreglo[j] = arreglo[j-1];
  		    j--;
  		  }
  		  arreglo[j] = aux;
  		}
  		return arreglo;
	}
}