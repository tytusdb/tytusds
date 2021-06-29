class Nodo {
    constructor(valor){
        this.valor = valor
        this.siguiente = null
    }
}

class Pila {
    constructor(repeticion){
        this.primero = null
        this.ultimo = null
        this.repeticion = repeticion
    }

    agregar(valor){
        const nodo = new Nodo(valor)
        if(this.primero === null){
            this.primero = this.ultimo = nodo
        }
        else{
            if(this.repeticion || !(this.buscar(valor))){
                var aux = this.primero
                this.primero = nodo
                nodo.siguiente = aux
            }
            else{
                alert("No se puede ingresar el valor")
            }
        }
    }

    eliminar(){
        if(this.ultimo != null){
            if(this.primero === this.ultimo){
                this.primero = this.ultimo = null
            }
            else{
                var nodo = this.primero.siguiente
                this.primero = nodo
            }
        }
    }
    
    actualizar(valor, nuevo){
        if(this.repeticion || !(this.buscar(valor))){
            var nodo = this.primero
            while(nodo != null){
                if(nodo.valor === valor){
                    nodo.valor = nuevo
                }
                nodo = nodo.siguiente
            }
        }
        else alert("El Valor Nuevo ya existe")
    }

    buscar(valor){
        if(this.primero !== null){
            var aux = this.primero
            while(aux != null){
                if(aux.valor === valor){
                    //Se encotro valor
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
            categoria: "Pila",
            repeticion: this.repeticion,
            valores: []
        }
        var nodo = this.primero
        while(nodo !== null){
            json.valores.push(nodo.valor)
            nodo = nodo.siguiente
        }
        const txt = JSON.stringify(json, null, '   ')
        return {nombre: "Pila.json", text: txt}
    }
    // Pila
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
        if(nodo!=null){
            do{
                nodos.push({id: indice, label: (nodo.valor).toString()})
                nodo = nodo.siguiente
                indice++
            }
            while(nodo !== null)
        }
        return nodos
    }
    llenarR(relaciones,rel){
        var nodo = this.primero
        if(nodo != null){
            do{
                relaciones.push({from: rel, to: rel+1})
                nodo = nodo.siguiente
                rel ++
            }while(nodo !== null)
        }
        return relaciones
    }
}

export default Pila