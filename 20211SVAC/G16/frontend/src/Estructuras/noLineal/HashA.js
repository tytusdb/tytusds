class HashAbierto{
    constructor(tamaño, metodo, tipo){
        this.tamaño = tamaño
        this.metodo = metodo
        this.tipo = tipo
        this.vector = llenar(this.tamaño)
    }

    agregar(valor){
        var i = this._metodo(ascii(valor))
        this.vector[i].unshift(valor)
    }

    eliminar(valor){
        var i = this._metodo(ascii(valor))
        for(var j in this.vector[i]){
            if(this.vector[i][j] === valor){
                (this.vector[i]).splice(j,1)
                break
            }
        }
    }

    buscar(valor){
        var i = this._metodo(ascii(valor))
        for(var j in this.vector[i]){
            if(this.vector[i][j] === valor){
                return true
            }
        }
        return false
    }

    actualizar(valor, nuevo){
        if(this.buscar(valor)){
            this.eliminar(valor)
            this.agregar(nuevo)
        }
    }

    carga(lista){
        for(var i in lista){
            this.agregar(lista[i].toString())
        }
    }

    guardar(){
        var aux = []
        for(var i in this.vector){
            var temp = []
            for(var j in this.vector[i]){
                temp.push({posicion: j, valor: this.vector[i][j]})
            }
            aux.push({indice: i, valores: temp})
        }
        const json = {
            categoria: "Hash Abierto",
            tamaño: this.tamaño,
            funcion: this.metodo,
            tipo: this.tipo,
            valores: aux
        }
        const txt = JSON.stringify(json, null, '   ')
        return {nombre: "Hash Abierto.json", text: txt}
    }

    dotG(){
        var nodos = []
        var relaciones = []
        nodos = llenarNodos(nodos, this.vector)
        relaciones = llenarRelaciones(relaciones, this.vector)
        
        return { nodes: nodos, edges: relaciones }
    }

    _metodo(valor){
        if(this.metodo === "Simple") return simple(valor, this.tamaño)
        else if(this.metodo === "Division") return division(valor, this.tamaño)
        else if(this.metodo === "Multiplicacion") return multiplicacion(valor, this.tamaño)
    }
}
//Metodos
function simple(valor, tamaño){ return Math.trunc(0.1625277911 * tamaño) }
function division(valor, tamaño){ return (valor % tamaño) }
function multiplicacion(valor, tamaño){ return Math.trunc(tamaño * ((valor * 0.1625277911) % 1)) }

function llenar(m){
    var temp = []
    for(var i = 0; i < m; i++){
        temp[i] = []
    }
    return temp
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

function llenarNodos(nodos, vector){
    for(var i in vector){
        nodos.push({id: i, label: i.toString(), level:0})
    }
    for(var k in vector){
        for(var j in vector[k]){
            var a = vector[k][j] + k.toString() + j.toString()
            nodos.push({id: a, label: vector[k][j], level: parseInt(j)+1})
        }
    }
    return nodos
}

function llenarRelaciones(relaciones, vector){
    for(var i = 0; i < vector.length-1; i++){
        relaciones.push({from: i, to: parseInt(i)+1})
    }
    for(var j in vector){
        var a = vector[j][0] + j.toString() + "0"
        relaciones.push({from: j, to: a})
    }
    for(var k in vector){
        for(var x = 0; x < vector[k].length-1; x++){
            var b = vector[k][x] + k.toString() + x.toString()
            var c = vector[k][parseInt(x)+1] + k.toString() + (x+1).toString()
            relaciones.push({from: b, to: c})
        }
    }
    return relaciones
}
export default HashAbierto