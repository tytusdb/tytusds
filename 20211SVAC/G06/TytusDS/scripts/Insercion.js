function Insercion(array){
	for(let i = 1; i < array.length; i++){
		let key = array[i]
		let j = i-1
		while(j>=0 && array[j] > key){
			array[j+1] = array[j]
			j = j-1
		}
		array[j+1] = key
	}
}

function main(){
	console.log("AHORA POR INSERCION")
	let a = [23,12,34,3,1,98,23,5,23]
	console.log(a)
	Insercion(a)
	console.log(a)
}

main()
