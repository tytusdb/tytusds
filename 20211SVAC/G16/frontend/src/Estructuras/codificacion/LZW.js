class LZW{
    constructor(){
        this.diccionario = []
        this.salida = ""
    }

    calcular(frase){
        this.diccionario = []
        for(var i in frase){
            if(!(this.diccionario.includes(frase[i]))){
                this.diccionario.push(frase[i])
            }
        }
        this.llenar(frase)
        this.mostrar()
        return this.salida
    }

    llenar(frase){
        var w = ""
        for(var i in frase){
            var k = frase[i]
            if(this.diccionario.includes(w+k)){
                w = w+k
            }
            else{
                this.diccionario.push(w+k)
                w = k
            }
        }
    }

    mostrar(){
        var aux = "Diccionario\n\n"
        for(var i in this.diccionario){
            var cont = 5 - Math.ceil((6 - this.diccionario[i].length)/3)
            if(this.diccionario[i].includes(" ") && this.diccionario[i].length === 3) cont--
            
            else if(this.diccionario[i].length === 3) cont -= 2
            
            aux += this.diccionario[i] + "\t".repeat(cont) + i + "\n"
        }
        this.salida = aux
    }

    guardar(){
        return {nombre: "LZW.txt", text: this.salida}
    }
}

export default LZW