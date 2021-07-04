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


//para deencriptar


function DencriptarFeistel(cifrado,permutacion,k){
	alfabeto ='0123456789 ';
	vueltas=2;
	tamano_bloque = permutacion.length;
	tamano_total =  cifrado.length
	//desarma el texto original
	var aux=desarmar(cifrado,tamano_bloque,tamano_total);
	//muestra resultados
	for(var i = vueltas;i > 0;i-- ){
		aux=permutarInv(aux,permutacion);
		aux=sustitucionInv(aux,alfabeto,k)

		if(i!=1){
			aux = Girar(aux);
		}
	}

	return armar(aux)
}

//esta funcion intercabia el bloque izquierdo por el derecho
function Girar(Vec){
	var Vec2 = new Array();
	for(j=0 ;j< Vec.length ; j=j+2){
		Vec2[j+1]=Vec[j];
		Vec2[j]=Vec[j+1];
	}
	return Vec2
}


function sustitucion(Vec,alfabeto,k){

	var Vec2 = new Array();
	var Vec2=new Array();


	for(var i =0; i < Vec.length; i ++){


		if(i%2==1){

			Vec2[i]=Vec[i];
		}
		else{
			Vec2[i]=SustituirCadena(Vec[i],alfabeto,k);
		}

	}
	return Vec2;

}


function SustituirCadena(cadena,alfabeto,k){

	var aux='';
	for(var j=0 ; j < cadena.length; j ++){
		ind_aux=(parseInt(alfabeto.indexOf(cadena.charAt(j))) + parseInt(k))% alfabeto.length;
		aux= aux + alfabeto.charAt( ind_aux    );

	}

	return aux;

}



function sustitucionInv(Vec,alfabeto,k){

	var Vec2 = new Array();
	
	for(var i =0; i < Vec.length; i ++){
		if(i%2==1){
			Vec2[i]=Vec[i];
		}
		else{
			Vec2[i]=SustituirCadenaInv(Vec[i],alfabeto,k);
		}
	}
	return Vec2;
}


function SustituirCadenaInv(cadena,alfabeto,k){

	var aux='';
	for(var j=0 ; j < cadena.length; j ++){
		ind_aux=(parseInt(alfabeto.indexOf(cadena.charAt(j))) - parseInt(k))
		if(ind_aux<0){
			ind_aux =ind_aux+alfabeto.length;
		}
		ind_aux= ind_aux % alfabeto.length;
		aux= aux + alfabeto.charAt( ind_aux);
	}
	return aux;
}



function permutar(Vec,per){
	var Vec2=new Array();
	for(var i =0; i < Vec.length; i ++){
		if(i%2==1){
			Vec2[i]=Vec[i];
		}
		else{
			Vec2[i]=PermutacionCadena(Vec[i],per);
		}
	}
	return Vec2;
}


function PermutacionCadena(cadena,per){
	var aux = '';
	for(var j = 0; j<=per.length; j++){
		aux=aux+cadena.charAt(per.charAt(j)-1);
	}

	return aux;
}

function permutarInv(Vec,per){

	var Vec2=new Array();

	for(var i =0; i < Vec.length; i ++){

		if(i%2==1){

			Vec2[i]=Vec[i];
		}
		else{
			Vec2[i]=PermutacionCadenaInv(Vec[i],per);
		}

	}
	return Vec2;

}


function PermutacionCadenaInv(cadena,per){
	var vec_aux=new Array();
	var aux = '';
	for(var j = 0; j<per.length; j++){
		vec_aux[per.charAt(j)-1]=cadena.charAt(j);
	}

	for(var j = 0; j<per.length; j++){
		aux=aux+vec_aux[j];
	}

	return aux;
}


//descomponente en un numero de bolques par para iniciar el cifrado

function desarmar(org,tb,tt){

	var Vec = new Array()
	var i = Math.floor(tt / tb); //cantidad de bloques
	var llave=0;
	var sw=false;

	if(tt-(i*tb) > 0){
		i=i+1;
		llave=(i*tb)-tt
	}

	if(i %2 == 1){
		i=i+1;
		sw=true
	}

	var n_aux1=0;
	var n_aux2=tb

	for(var j=0; j < i; j++){

		Vec[j]=org.substr(n_aux1,n_aux2);
		n_aux1=n_aux1+tb;
		n_aux2=n_aux2+tb;

		if(j== i-1 && !sw){
			for(var l=0; l <  llave ;l++){
				Vec[j]=Vec[j]+' ';
			}
		}

		if(j== i-2&&sw){
			for(var l=0; l <  llave ;l++){
				Vec[j]=Vec[j]+' '
			}
		}

		if(j== i-1&&sw){

			for(var l=0; l <  tb ;l++){
				Vec[j]=Vec[j]+' ';
			}
		}
	}

	return Vec
}




function armar(Vec){
	var text=new String()
	for(var i = 0; i <Vec.length;i++)
	text = text + Vec[i];
	return text;
}