class Nodo{
    constructor(valor){
        this.valor = valor
        this.izquierdo = null
        this.derecho = null
    }
}

class Huffman{
    constructor(){
        this.raiz = null
        this.letras = null
        this.temp = null
        this.salida = ""
    }

    calcular(cadena){
        var aux = []
        var contador = []
        for(var i in cadena){
            if(aux.includes(cadena[i])){
                contador[aux.indexOf(cadena[i])]++
            }
            else{
                aux.push(cadena[i])
                contador.push(1)
            }
        }
        this._calcular(aux, contador)
    }

    _calcular(aux, contador){
        this.letras = []
        for(var i in aux){
            this.letras.push([contador[i], aux[i]])
        }
        this.letras = burbujaP(this.letras)
        this.construir()
        this.temp = this.ordenar(this.letras)
        this.raiz = this.generarArbol(this.temp, new Nodo("0"))
    }

    construir(){
        while(this.letras.length > 1){
            var primeros = this.letras.slice(0,2)
            var frecuencia = primeros[0][0] + primeros[1][0]
            this.letras = this.letras.slice(2, this.letras.length)
            this.letras.push([frecuencia, primeros])
            this.letras = burbujaP(this.letras)
        }
        this.letras = this.letras[0]
    }

    ordenar(vector){
        var aux = vector[1]
        if (typeof(aux) === 'string'){
            return aux
        }
        else{
            return [this.ordenar(aux[0]), this.ordenar(aux[1])]
        }
    }
    
    generarArbol(vector, nodo){
        if(typeof(vector) == 'string'){
            this.agregar(nodo, vector)
            return nodo
        }
        else{
            this.generarArbol(vector[0], this.agregar(nodo, "0"))
            this.generarArbol(vector[1], this.agregar(nodo, "1"))
        }
        return nodo
    }

    agregar(nodo, valor){
        if(valor === "0"){
            nodo.izquierdo = new Nodo(valor)
            return nodo.izquierdo
        }
        else if(valor === "1"){
            nodo.derecho = new Nodo(valor)
            return nodo.derecho
        }
        else{
            nodo.izquierdo = new Nodo(valor)
            return nodo.izquierdo
        }
    }

    guardar(){
        this.salida = "Codigo:\n\n"
        this.generarText(this.temp, "")
        return {nombre: "Huffman.txt", text: this.salida}
    }

    generarText(vector, text){
        if(typeof(vector) == 'string'){
            this.salida += vector + ":\t" + text + "\n"
        }
        else{
            this.generarText(vector[0], text+"0")
            this.generarText(vector[1], text+"1")
        }
    }

    dotG(){
        var nodos = [
            {id:0, label: "0"}
        ]
        var relaciones = [ ]
        if(this.raiz !== null){
            var nodo = this.raiz
            var aux = []
            aux = this.llenarN(aux, nodo, "Raiz", 1)
            nodos = aux
            relaciones = this.llenarR(relaciones, nodo, "Raiz")
        }
        return { nodes: nodos, edges: relaciones }
    }

    llenarN(vector, nodo, indice,nivel){
        if(nodo === null){
            return
        }
        vector.push({id: indice, level: nivel, label: (nodo.valor).toString()})
        this.llenarN(vector, nodo.izquierdo, indice+"I", nivel+1)
        this.llenarN(vector, nodo.derecho, indice+"D", nivel+1)
        return vector
    }
    llenarR(vector, nodo, indice){
     if(nodo === null){
             return
         }
         vector.push({from: indice, to: indice+"I"})
         vector.push({from: indice, to: indice+"D"})
         this.llenarR(vector, nodo.izquierdo, indice+"I")
         this.llenarR(vector, nodo.derecho, indice+"D")
         return vector
     }
}

function burbujaP(vector){
    var aux
    for(var i in vector){
        for(var j = 0; j < vector.length - 1; j++){
            if(vector[j][0] > vector[j+1][0]){
                aux = vector[j]
                vector[j] = vector[j+1]
                vector[j+1] = aux
            }
            else if(vector[j][0] === vector[j+1][0]){
                if(tamaño(vector[j]).length < tamaño(vector[j+1]).length){
                    aux = vector[j]
                    vector[j] = vector[j+1]
                    vector[j+1] = aux
                }
            }
        }
    }
    return vector
}

function tamaño(vector) {
    return vector.reduce((acc, val) => Array.isArray(val) ? acc.concat(tamaño(val)) : acc.concat(val), [])
}

export default Huffman