class Insercion{
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
            categoria: "Insercion",
            vector: []
        }
        json.vector = this.vector
        const txt = JSON.stringify(json, null, '   ');
        return {nombre: "Insercion.json", text: txt}
    }

    ordenar(){
        let aux
        let pos
        for(let i=0;i<this.vector.length;i++){
            pos = i
            aux = this.vector[i]
            while((pos>0)&&(ascii(this.vector[pos-1]) > ascii(aux))){
                this.vector[pos] = this.vector[pos-1]
                pos--
            }
            this.vector[pos] = aux;
        }
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

export default Insercion