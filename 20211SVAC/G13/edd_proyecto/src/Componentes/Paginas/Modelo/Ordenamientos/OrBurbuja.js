class OrBurbuja{

    constructor(){
        this.array = [];
    }

    insertar = (dato) =>{
        this.array.push(dato)
        // console.log(this.array)
    }
    ordenamiento_burbuja = () => {

        for (var i = (this.array.length - 1); i >= 0; i--) {
            for (var j = 0; j < i; j++) {
                if(this.array[j]> this.array[j+1]){
                    var temp = this.array[j];
                    this.array[j] = this.array[j+1]
                    this.array[j+1] = temp;
                }
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

export default OrBurbuja;
//module.exports = OrBurbuja;