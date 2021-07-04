class ColMayor{
    constructor(row, col){
        this.vector = null
        this.salida = null
        this.row = row
        this.col = col
    }

    cargar(vector){
        this.vector = new Array(this.row * this.col)
        for(var k in vector){
            var aux = vector[k]
            var i = aux.indices[0]
            var j = aux.indices[1]
            var valor = aux.valor
            this.vector[i+j*this.col] = valor
        }
        this.generarSalida()
        return this.salida
    }

    generarSalida(){
        this.salida = "Resultado\n\n"
        for(var i = 0; i < this.vector.length; i++){
            if(this.vector[i] === undefined){
                this.salida += "["+ i +"] \n"
            }
            else{
                this.salida += "["+ i +"]  " + this.vector[i] + "\n"
            }
        }
    }

    guardar(){
        var aux = []
        for(var i = 0; i < this.vector.length; i++){
            if(this.vector[i] === undefined) aux.push({indice: i, valor: ""})

            else aux.push({indice: i, valor: this.vector[i]})
        }
        const json ={
            nombre: "Col-Mayor",
            valores: aux
        }
        const txt = JSON.stringify(json, null, '   ')
        return {nombre: "Col-Mayor.json", text: txt}
    }
}

export default ColMayor