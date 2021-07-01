class Nodo {
    constructor(valor){
        this.valor = valor
        this.siguiente = null
        this.tmp = 2
    }
}

class Simple {
    constructor(ingreso, repeticion){
        this.primero = null
        this.ultimo = null
        this.ingreso = ingreso
        this.repeticion = repeticion
    }

    agregar(valor){
        const nodo = new Nodo(valor)
        if(this.primero === null){
            this.primero = this.ultimo = nodo
        }
        else{
            if(this.repeticion || !(this.buscar(valor))){
                if(this.ingreso === "Final" || this.ingreso === "Fin"){
                    this.agregar_F(nodo)
                }
                else if(this.ingreso === "Inicio"){
                    this.agregar_I(nodo)
                }
                else if(this.ingreso === "Orden" || this.ingreso === "Ordenado"){
                    this.agregar_O(nodo)
                }
            }
            else{
                alert("No se puede ingresar el valor")
            }
        }
    }

    eliminar(valor){
        var nodo = this.primero
        var aux = null
        while(nodo != null){
            if(nodo.valor === valor){
                if(nodo === this.primero){
                    if(this.primero === this.ultimo){
                        this.primero = this.ultimo = null
                    }
                    else{
                        this.primero = nodo.siguiente
                    }                    
                }
                else if(nodo === this.ultimo){
                    this.ultimo = aux
                    this.ultimo.siguiente = null
                }
                else{
                    aux.siguiente = nodo.siguiente
                }
                break
            }
            aux = nodo
            nodo = nodo.siguiente
        }
    }

    actualizar(valor, nuevo){
        if(this.repeticion || !(this.buscar(nuevo))){
            var aux = this.primero
            while(aux != null){
                if(aux.valor === valor){
                    aux.valor = nuevo
                }
                aux = aux.siguiente
            }
        }
        else alert("El Nuevo Valor ya existe")
    }

    buscar(valor){
        if(this.primero !== null){
            var aux = this.primero
            while(aux != null){
                if(aux.valor === valor){
                    //Se encontro valor
                    return true
                }
                aux = aux.siguiente
            }
        }
        //No se encontro valor
        return false
    }

    cargar(vec){
        for(var i in vec){
            this.agregar(vec[i])
        }
    }

    guardar(){
        const json = {
            categoria: "Enlazada Simple",
            posicion: this.ingreso,
            repeticion: this.repeticion,
            valores: []
        }
        var nodo = this.primero
        while(nodo !== null){
            json.valores.push(nodo.valor)
            nodo = nodo.siguiente
        }
        const txt = JSON.stringify(json, null, '   ')
        return {nombre: "Enlazada Simple.json", text: txt}
    }
    //Metodos sin unos fuera
    agregar_F(nodo){
        var aux = this.ultimo
        aux.siguiente = this.ultimo = nodo
    }
    
    agregar_I(nodo){
        var aux = this.primero
        this.primero = nodo
        nodo.siguiente = aux
    }
    
    agregar_O(nodo){
        var aux = this.primero
        var pivote = null
        while (aux !== null) {
            if(ascii(nodo.valor) <= ascii(aux.valor)){
                if(aux === this.primero){
                    nodo.siguiente = aux
                    this.primero = nodo
                }
                else{
                    pivote.siguiente = nodo
                    nodo.siguiente = aux
                }
                break
            }
            else if(aux === this.ultimo){
                aux.siguiente = this.ultimo = nodo
                break
            }
            pivote = aux
            aux = aux.siguiente
        }
    }
    // Lineales
    dotG(){
        var nodos = [
            {id:0, label: "PRIMERO"},
            {id:1, label: "ULTIMO"}
        ]
        var indice = nodos.length
        nodos = this.llenarN(nodos,indice)
        var relaciones = [ ]
        var rel = relaciones.length+2
        relaciones = this.llenarR(relaciones,rel)
        if(this.primero!==null){
            relaciones.push({from: 0, to: 2})
            relaciones.push({from: 1, to: nodos.length-1})
        }
        return { nodes: nodos, edges: relaciones }
    }
    llenarN(nodos,indice){
        var nodo = this.primero
        while(nodo !== null){
            nodos.push({id: indice, label: (nodo.valor).toString()})
            nodo = nodo.siguiente
            indice++
        }
        return nodos
    }
    llenarR(relaciones,rel){
        var nodo = this.primero
        if(nodo !== null){
            do{
                relaciones.push({from: rel, to: rel+1})
                nodo = nodo.siguiente
                rel ++
            }while(nodo !== null)
        }
        return relaciones
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

export default Simple