class Rapido{
    constructor(){
        this.vector = []
    }

    cargar(vec){
        for(var i in vec){
            this.vector.push(vec[i])
        }
        
    }

    guardar(){
        const json = {
            categoria: "Rapido",
            valores: []
        }
        json.valores = this.vector
        const txt = JSON.stringify(json, null, '   ');
        return {nombre: "Rapido.json", text: txt}
    }

    ordenar(){
        this.ordenar_(0, this.vector.length-1)
    }

    ordenar_(min, max){
        if(min < max){
            var aux = this._ordenar(min, max)
            this.ordenar(min, aux-1)
            this.ordenar(aux+1, max)
        }
    }

    _ordenar(min, max){
        var aux = this.vector[max];  
        var i = (min - 1) 
        for (var j = min; j <= max- 1; j++){
            if (ascii(this.vector[j]) < ascii(aux)){
                i++;
                var temp = this.vector[i]
                this.vector[i] = this.vector[j]
                this.vector[j] = temp
            }
        }
        var pivote = this.vector[i + 1]
        this.vector[i + 1] = this.vector[max]
        this.vector[max] = pivote
        return (i + 1)
    }
}

function ascii(txt){
    var sum = 0
    if(/^[+-]?\d+$/.test(txt)) sum = parseInt(txt, 10)
    else {
        for(var i in txt){
            sum += txt[i].charCodeAt(0)
        }
    }
    return sum
}

export default Rapido