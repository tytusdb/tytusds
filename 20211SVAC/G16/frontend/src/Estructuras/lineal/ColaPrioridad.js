class Nodo{
    constructor(valor, prioridad){
        this.valor = valor;
        this.prioridad = prioridad;
        this.siguiente = null
    }
}

class ColaPrioridad{
    constructor(repeticion){
        this.primero = null
        this.ultimo = null
        this.repeticion = repeticion
    }
    // Agregar item
    agregar(valor, prioridad){
        if(parseInt(prioridad) < 5 || parseInt(prioridad) > 1){
            const nodo = new Nodo(valor, prioridad)
            if(this.primero === null){
                this.primero = this.ultimo = nodo
            }
            else{
                if(this.repeticion || !(this.buscar(valor))){
                       var aux = this.ultimo
                    this.ultimo = nodo
                    aux.siguiente = nodo
                }
                else{
                    alert("No se puede ingresar el valor")
                }
            }
        }

        else alert("La Prioridad esta fuera de rango")
    }
    //Eliminar item
    eliminar(){
    	var temp = false
        for(let i = 1; i < 6; i++){
        	var nodo = this.primero
        	var aux = null
        	while(nodo !== null){
        		if(parseInt(nodo.prioridad) === i){
        			if(nodo === this.primero){
        				this.primero = nodo.siguiente
        			}
        			else if(nodo === this.ultimo){
        				this.ultimo = aux
                        this.ultimo.siguiente = null
        			}
        			else{
        				aux.siguiente = nodo.siguiente
        			}
        			temp = true
        			break
        		}
        		aux = nodo
        		nodo = nodo.siguiente
        	}
        	if(temp){
        		break
        	}
        }
    }
    //Busca primer aparición
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
    //Actualiza valor
    actualizar(valor,nuevo){
        if(this.repeticion || !(this.buscar(nuevo))){
		    var nodo = this.primero
		    while(nodo != null){
		        if(nodo.valor === valor){
		            nodo.valor = nuevo
		        }
		        nodo = nodo.siguiente
		    }
		}
		else alert("El Nuevo Valor ingresado ya existe")
    }
    //Guardar JSON
    guardar(){
        const json = {
            categoria: "Cola Prioridad",
            repeticion: this.repeticion,
            valores: []
        }
        var nodo = this.primero
        while(nodo !== null){
            console.log(json.valores)
            json.valores.push({valor: nodo.valor, prioridad: nodo.prioridad})
            nodo = nodo.siguiente
        }
        const txt = JSON.stringify(json, null, '   ')
        return {nombre: "Cola Prioridad.json", text: txt}
    }
    //Cargar JSON
    cargar(vec){
        for(var i in vec){
            this.agregar(vec[i].valor, vec[i].prioridad)
        }
    }
    // Cola Prioridad
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
            nodos.push({id: indice, label:(nodo.valor+" [ "+nodo.prioridad+" ]").toString()})
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

export default ColaPrioridad