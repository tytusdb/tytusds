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
            this.agregar(vec[i].valor.toString(), vec[i].prioridad)
        }
    }
    // Cola Prioridad
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
            nodos.push({id: contador+"l"+indice, label:(nodo.valor+" [ "+nodo.prioridad+" ]"), level: indice})
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

export default ColaPrioridad
