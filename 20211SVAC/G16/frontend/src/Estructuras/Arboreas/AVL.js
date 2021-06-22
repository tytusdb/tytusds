class Nodo {
    constructor(valor){
        this.izquierdo = null
        this.derecho = null
        this.valor = valor
        this.altura = 0
    }
}

class AVL {
    constructor(repeticion){
        this.raiz = null
        this.repeticion = repeticion
    }

    agregar(valor){
        if(this.repeticion || !this.buscar(valor)){
            this.raiz = _agregar(valor, this.raiz)
        }
    }

    eliminar(valor){
        this.raiz = _eliminar(valor, this.raiz)
    }

    actualizar(valor, nuevo){
        if(this.repeticion || !this.buscar(nuevo)){
            this.eliminar(valor)
            this.raiz = _agregar(nuevo, this.raiz)
        }
        else alert("El Valor Nuevo ya existe")
    }

    buscar(valor){
        return _buscar(valor, this.raiz)
    }

    guardar(tipo){
        const json = {
            categoria: "AVL",
            repeticion: this.repeticion,
            tipo: tipo,
            valores: []
        }
        if(tipo === "PreOrden") json.valores = preorden(this.raiz, json.valores)
        else if(tipo === "InOrden") json.valores = inorden(this.raiz, json.valores)
        else if(tipo === "PostOrden") json.valores = postorden(this.raiz, json.valores)
        const txt = JSON.stringify(json, null, '   ')
        return {nombre: "AVL.json", text: txt}
    }

    cargar(vec){
        for(var i in vec){
            this.agregar(vec[i])
        }
    }

    // AVL
    dotG(){
        var nodos = [
           {id:0, label: "ÁRBOL AVL"}
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
           vector.push({id: indice, level: nivel, label: "< >"})
           return vector
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

function _agregar(valor, nodo){
    if(nodo === null){
        return new Nodo(valor)
    }
    else if(ascii(valor) < ascii(nodo.valor)){
        nodo.izquierdo = _agregar(valor, nodo.izquierdo)
    }
    else if(ascii(valor) >= ascii(nodo.valor)){
        nodo.derecho = _agregar(valor, nodo.derecho)
    }
    nodo = balancear(nodo, valor)
    nodo.altura = Math.max(altura(nodo.derecho), altura(nodo.derecho)) + 1
    return nodo
}

function _eliminar(valor, nodo){
    if(nodo === null){
        return nodo
    }
    if(valor === nodo.valor){
        if(nodo.izquierdo !== null && nodo.derecho !== null){
            var aux = maximo(nodo.izquierdo)
            nodo.valor = aux.valor
            nodo.izquierdo = _eliminar(nodo.valor, nodo.izquierdo) 
            //nodo.dato = delete_min()
        }
        else if(nodo.izquierdo === null && nodo.derecho === null){
            return null
        }
        else if(nodo.izquierdo === null){
            nodo = nodo.derecho
        }
        else if(nodo.derecho === null){
            nodo = nodo.izquierdo
        }
    }
    else if(ascii(valor) < ascii(nodo.valor)){
        nodo.izquierdo = _eliminar(valor, nodo.izquierdo)
    }
    else if(ascii(valor) > ascii(nodo.valor)){
        nodo.derecho = _eliminar(valor, nodo.derecho)
    }
    nodo = balancear(nodo, valor)
    nodo.altura = Math.max(altura(nodo.derecho), altura(nodo.izquierdo)) + 1
    return nodo
}

function _buscar(valor, nodo){
    if(nodo === null){
        return false
    }
    if(valor === nodo.valor){
        return true
    }
    else if(ascii(valor) < ascii(nodo.valor)){
        return _buscar(valor, nodo.izquierdo)
    }
    else if(ascii(valor) > ascii(nodo.valor)){
        return _buscar(valor, nodo.derecho)
    }
}

function balancear(nodo, valor){
    if((altura(nodo.izquierdo)-altura(nodo.derecho)) === 2){
        if(ascii(valor) < ascii(nodo.izquierdo.valor)){
            nodo = rotacionSI(nodo)
        }
        else{
            nodo = rotacionDI(nodo)
        }
    }
    if((altura(nodo.derecho)-altura(nodo.izquierdo)) === 2){
        if(ascii(valor) >= ascii(nodo.derecho.valor)){
            nodo = rotacionSD(nodo)
        }
        else{
            nodo = rotacionDD(nodo)
        }
    }
    return nodo
}

function rotacionSI(nodo) {
    var aux = nodo.izquierdo
    nodo.izquierdo = aux.derecho
    aux.derecho = nodo
    nodo.altura = Math.max(altura(nodo.izquierdo), altura(nodo.derecho)) + 1 
    aux.altura = Math.max(altura(aux.izquierdo), altura(nodo)) + 1
    return aux
}

function rotacionDI(nodo) {
    nodo.izquierdo = rotacionSD(nodo.izquierdo)		
    return rotacionSI(nodo)
}

function rotacionSD(nodo) {
    var aux = nodo.derecho
    nodo.derecho = aux.izquierdo
    aux.izquierdo = nodo		
    nodo.altura = Math.max(altura(nodo.izquierdo), altura(nodo.derecho)) + 1
    aux.altura = Math.max(altura(aux.derecho), nodo.altura) + 1
    return aux
}

function rotacionDD(nodo) {
    nodo.derecho = rotacionSI(nodo.derecho)
    return rotacionSD(nodo)
}

function altura(nodo){
    if(nodo === null){
        return -1
    }
    return nodo.altura
}

function maximo(nodo){
    if(nodo.derecho === null){
        return nodo
    }
    else{
        return maximo(nodo.derecho)
    }
}

function preorden(nodo, vector){
    if(nodo === null){
        return
    }
    vector.push(nodo.valor)
    preorden(nodo.izquierdo, vector)
    preorden(nodo.derecho, vector)
    return vector
}

function inorden(nodo, vector){
    if(nodo === null){
        return
    }
    inorden(nodo.izquierdo, vector)
    vector.push(nodo.valor)
    inorden(nodo.derecho, vector)
    return vector
}

function postorden(nodo, vector){
    if(nodo === null){
        return
    }
    postorden(nodo.izquierdo, vector)
    postorden(nodo.derecho, vector)
    vector.push(nodo.valor)
    return vector
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

export default AVL
