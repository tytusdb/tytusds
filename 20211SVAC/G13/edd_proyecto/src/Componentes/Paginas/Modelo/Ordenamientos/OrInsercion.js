class OrInsercion{

	constructor(){
		this.array = []
	}

	insertar = (dato) => {
		this.array.push(dato)
	}


	// ordenamiento_insercion = () =>{

	// 	var size = this.array.length, temp, aux;
   
	// 	for ( var i = 0; i < this.array.length; i++ ) { // outer loop     
	// 	aux = this.array[i];
	// 		for ( temp = i - 1; temp >= 0 && this.array[temp] > aux; temp-- ){ // inner loop
	// 			this.array[ temp + 1 ] = this.array[temp];
	// 		}
	// 	this.array[ temp + 1 ] = aux;
	// 	}
	// }
	ordenamiento_insercion = () =>{

		for(var i = 1; i < this.array.length; i++){
			var aux = this.array[i];
			var temp = i - 1  ;
			while(aux < this.array[temp] && temp >= 1){
				this.array[temp+1] = this.array[temp];
				temp = temp - 1;

			}

			if (this.array[temp] <= aux){
					this.array[temp+1] = aux;
			}else{
				this.array[temp+1] = this.array[temp]
				this.array[temp] = aux

			}

		}
	}

	
    setNodesDataSet = () => { // Esto Genera los nodos de Vis.

        var dot = [];
        for (var i = 0; i<this.array.length;i++){
            console.log(this.array[i])
            dot.push({id:i, label: this.array[i]});
        }
       
        return dot;

    } 

    setEdgesDataSet = () => {

        var dot = [];
        for (var i = 0; i<this.array.length;i++){

            if (this.array[i+1] != null){
                
                let nodoUno = parseInt(i)
                let nodoDos = parseInt(nodoUno) + parseInt(1)
                dot.push({from:nodoUno, to:nodoDos, arrows: "to"});
            }
        }

        return dot;


    }
}

module.exports = OrInsercion;