function Seleccion(array){
	for(let i = 0; i < array.length; i++){
		for(let j = i+1; j < array.length; j++){
			if(array[i] > array[j]){
				let tmp = array[j]
				array[j] = array[i]
				array[i] = tmp
			}
		}
	}
	return array
}

function main(){
	console.log("AHORA POR SELECCION")
	let a = [23,12,34,3,1,98,23,5,23]
	console.log(a)
	Seleccion(a)
	console.log(a)
}

main()
