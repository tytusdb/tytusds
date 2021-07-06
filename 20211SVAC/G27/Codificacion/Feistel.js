

function EncriptarFeistel(original,permutacion,k){
	alfabeto ='0123456789 ';
	vueltas=2;
	//creamos el modelo de columnas
	tamano_bloque = permutacion.length;
	tamano_total =original.length
	//desarma el texto original
	var aux=desarmar(original,tamano_bloque,tamano_total);
	//muestra resultados
	for(var i = 0;i < vueltas;i++ ){
		aux=sustitucion(aux,alfabeto,k)
		aux=permutar(aux,permutacion);
		if(i!=vueltas -1){
			aux = Girar(aux);
		}

	}
	
	return armar(aux)
	
}
