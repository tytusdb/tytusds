class Hamming{
    constructor(){
        this.valor = null
        this.tamaño = null
        this.p = null
        this.vector = null
        this.salida = null
    }

    calcular(valor){
        this.valor = valor
        this.tamaño = valor.length
        this.p = 1
        while(Math.pow(2,this.p) < (this.tamaño + this.p + 1)){
            this.p++
        }
        this.generar()
        this.llenar()
        this.resultado()
        return this.salida
    }

    generar(){
        this.vector = new Array(this.tamaño + this.p + 1)
        var j = 0;
        for (var i = 1; i < this.vector.length; i++) {
            if ((Math.ceil(Math.log(i) / Math.log(2)) - Math.floor(Math.log(i) / Math.log(2))) === 0) {
                this.vector[i] = 0;
            }
            else {
                this.vector[i] = parseInt((this.valor.charAt(j) - '0'))
                j++;
            }
        }
    }

    llenar(){
        for (var i = 0; i < this.p; i++) {
            var x = parseInt(Math.pow(2, i))
            for (var j = 1; j < this.vector.length; j++) {
                if (((j >> i) & 1) === 1) {
                    if (x !== j)
                        this.vector[x] = this.vector[x] ^ this.vector[j];
                }
            }
        }
    }

    resultado(){
        this.salida = ""
        for(var i = 1; i < this.vector.length; i++){
            this.salida += this.vector[i]
        }
    }
    
    guardar(){
        var txt = "Codigo:\n\n" + this.salida
        return {nombre: "Hamming.txt", text: txt}
    }
}

export default Hamming