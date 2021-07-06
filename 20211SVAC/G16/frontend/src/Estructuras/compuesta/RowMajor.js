class RowMayor{
    constructor(row, col){
        this.vector = null
        this.salida = null
        this.row = row
        this.col = col
    }

    agregar(valor, i, j){
        if(this.vector[(i*this.col)+j] === undefined){
            this.vector[(i*this.col)+j] = valor
        }
        this.generarSalida()
        return this.salida
    }

    eliminar(i, j){
        this.vector[(i*this.col)+j] = undefined
        this.generarSalida()
        return this.salida
    }

    actualizar(nuevo, i, j){
        if(this.vector[(i*this.col)+j] !== undefined){
            this.vector[(i*this.col)+j] = nuevo
        }
        this.generarSalida()
        return this.salida
    }

    buscar(valor){
        for(var i in this.vector){
            if(this.vector[i] === valor){
                return true
            }
        }
        return false
    }

    cargar(vector){
        this.vector = new Array(this.row * this.col)
        for(var k in vector){
            var aux = vector[k]
            var i = aux.indices[0]
            var j = aux.indices[1]
            var valor = aux.valor
            this.vector[(i*this.col)+j] = valor
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
            nombre: "Row-Mayor",
            valores: aux
        }
        const txt = JSON.stringify(json, null, '   ')
        return {nombre: "Row-Mayor.json", text: txt}
    }
}

export default RowMayor