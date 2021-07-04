class Feistel{
    constructor(){
        this.key = null
        this.llave = null
        this.izquierda = null
        this.derecha = null
        this.fraseT = null
        this.hexT = null
        this.fraseC = null
        this.hexC = null
        this.resultado = null
    }

    calcular(frase, key, iteraciones){
        if((frase.length)/2 === key.length){
            this.fraseT = frase
            var size = frase.length
            var half = Math.round(size/2)
            this.izquierda =  binario(0, half, frase)
            this.derecha = binario(half, size, frase) 
            this.llave = binario(0, key.length, key)
            this.llenarKey(key)
            for(var i = 0; i < iteraciones; i++){
                this._calcular()
            }
            this.salida()
            return this.resultado 
        }
        else{
            return "La Llave no comple con los requisitos"
        }
    }

    salida(){
        this.hexT = hexa(this.fraseT)
        this.fraseC = texto(this.izquierda) + texto(this.derecha)
        this.hexC = hexa(this.fraseC)
        this.resultado = "Criptograma\n\nSimbolo: " + this.fraseC + "\nHex: " + this.hexC
    }

    _calcular(){
        var aux = this.izquierda
        var temp = copiar(this.derecha)
        this.izquierda = temp
        this.derecha = XOR(this.derecha, this.llave)
        this.derecha = XOR(aux, this.derecha)
        this.llave = this.rotacion()
    }

    llenarKey(llave){
        this.key = []
        for(var i in llave){
            this.key.push(llave[i].charCodeAt(0))
        }        
    }

    rotacion(){
        var aux = ""
        for(var i in this.key){
            this.key[i] = this.key[i] << 1
            aux += this.key[i].toString(2) + " "
        }
        return llenar(aux)
    }

    guardar(){
        return {nombre: "Feistel.txt", text: this.resultado}
    }
}

function XOR(a, b){
    for(var i in a){
        var aux = []
        var temp = ""
        for(var j in a[i]){
            aux.push(a[i][j])
        }
        for(var j in b[i]){
            temp += aux[j] ^ b[i][j]
        }
        a[i] = temp
    }
    return a
}

function copiar(vector){
    var aux = []
    for(var i in vector){
        var temp = ""
        for(var j in vector[i]){
            temp += vector[i][j]
        }
        aux.push(temp)
    }
    return aux
}

function texto(vector){
    var aux = ""
    for(var i in vector){
        var temp = parseInt(vector[i], 2)
        aux += String.fromCharCode(temp)
    }
    return aux
}

function hexa(frase){
    var aux = ""
    for(var i in frase){
        aux += frase[i].charCodeAt(0).toString(16)
    }
    return aux
}

function binario(inicio, final, frase){
    var aux = ""
    for(var i = inicio; i < final; i++){
        aux += frase[i].charCodeAt(0).toString(2) + " "
    }
    return llenar(aux)
}

function llenar(temp){
    var aux = temp.split(" ")
    aux = aux.slice(0, aux.length-1)
    return completar(aux)
}

function completar(vector){
    for(var i in vector){
        if(vector[i].length < 8){
            vector[i] = "0".repeat(8-vector[i].length) + vector[i]
        }
        else if(vector[i].length > 8){
            vector[i] = vector[i].slice(1, 8) + vector[i].slice(0, 1)
        }
    }
    return vector
}

export default Feistel