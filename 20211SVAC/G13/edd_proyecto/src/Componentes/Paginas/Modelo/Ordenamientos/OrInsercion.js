class OrInsercion{

	constructor(){
		this.array = []
	}

	insertar = (dato) => {
		this.array.push(dato)
	}


	ordenamiento_insercion = () =>{

		var size = this.array.length, temp, aux;
   
		for ( var i = 0; i < this.array.length; i++ ) { // outer loop     
		aux = this.array[i];
			for ( temp = i - 1; temp >= 0 && this.array[temp] > aux; temp-- ){ // inner loop
				this.array[ temp + 1 ] = this.array[temp];
			}
		this.array[ temp + 1 ] = aux;
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

export default OrInsercion;
//module.exports = OrInsercion;