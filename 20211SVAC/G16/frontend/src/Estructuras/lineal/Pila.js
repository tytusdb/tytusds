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
            this.agregar(vec[i].toString())
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
    dotG(indice){
        console.log("PASA")
        var nodos = [{id:0+"l"+indice, label: "PRIMERO", level: indice}]
        var relaciones = []
        nodos = this.llenarN(nodos, indice, 1)
        relaciones = this.llenarR(relaciones, indice, 0)
        return { nodes: nodos, edges: relaciones }
    }

    llenarN(nodos, indice, contador){
        var nodo = this.primero
        while(nodo !== null){
            nodos.push({id: contador+"l"+indice, label: (nodo.valor).toString(), level: indice})
            nodo = nodo.siguiente
            contador++
        }
        nodos.push({id: contador+"l"+indice, label: "ULTIMO", level: indice})
        return nodos

    }
    llenarR(relaciones, indice, contador){
        var nodo = this.primero
        if(nodo !== null){
            do{
                relaciones.push({from: contador+"l"+indice, to: (contador+1)+"l"+indice, arrows: "to"})
                contador++
                nodo = nodo.siguiente
            }while(nodo !== null)
        }
        relaciones.push({from: (contador+1)+"l"+indice, to: (contador)+"l"+indice, arrows: "to"})
        return relaciones
    }
}

export default Pila