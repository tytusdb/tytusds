//No funcional, array es el objeto obtenido el que tiene las dimensiones como caracteristicas
// arreglo es la matriz con los datos ya guardados
tamano = number;
var lista = [tamano];


function rowMajor(array){
    for (let i = 0; i < len(array.x); i++) {
		  for (let j = 0; j < len(array.y); j++) {
        lista.push(arreglo[i][j])
		}
	}
}

function colMajor(array){
    for (let i = 0; i < len(array.y); i++) {
		  for (let j = 0; j < len(array.x); j++) {
        lista.push(arreglo[j][i]);
		}
	}
}
