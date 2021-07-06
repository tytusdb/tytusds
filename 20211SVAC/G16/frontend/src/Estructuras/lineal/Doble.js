class Nodo{
    constructor(valor){
        this.valor = valor;
        this.siguiente = null;
        this.anterior = null;
    }
}
class Doble{
    constructor(ingreso, repetidos){
        this.primero=null;
        this.ultimo=null;
        this.repetidos = repetidos;
        this.ingreso = ingreso
    }
    //agregar al principio
    agregar(valor){
        const nodo = new Nodo(valor);
        if(this.primero == null){
            this.primero = nodo
            this.ultimo = nodo
        }
        else{
            if(this.repeticion || !(this.buscar(valor))){
                if(this.ingreso === "Final" || this.ingreso === "Fin"){
                    this.nuevoUltimo(nodo)
                }
                else if(this.ingreso === "Inicio"){
                    this.nuevoPrimero(nodo)
                }
                else if(this.ingreso === "Orden" || this.ingreso === "Ordenado"){
                    this.nuevoOrdenado(nodo)
                }
            }
            else{
                alert("No se puede ingresar el valor")
            }
        }
    }
    //agregar al inicio
    nuevoPrimero(nodo){
        var aux = this.primero
        this.primero = nodo
        aux.anterior = nodo
        nodo.siguiente = aux
    }
    //agregar al final
    nuevoUltimo(nodo){
        var aux = this.ultimo
        this.ultimo = aux.siguiente = nodo
        nodo.anterior = aux
    }
    //agregar ordenado
    nuevoOrdenado(nodo){
        var aux = this.primero
        var temp = null
        while(aux !== null){
            if(ascii(nodo.valor) <= ascii(aux.valor)){
               if(aux === this.primero){
                   this.nuevoPrimero(nodo)
               }
               else{
                    temp.siguiente = aux.anterior = nodo
                    nodo.siguiente = aux
                    nodo.anterior = temp
               }
               break
            }
            else if(aux === this.ultimo){
                this.nuevoUltimo(nodo)
                break
            }
            temp = aux
            aux = aux.siguiente
        }
    }
    // eliminar
    eliminar(valor){
        var nodo = this.primero
        var aux = null
        while(nodo !== null){
            if(nodo.valor === valor){
                if(nodo === this.primero){
                    if(this.primero === this.ultimo){
                        this.primero = this.ultimo = null
                    }
                    else{
                        this.primero = nodo.siguiente
                        this.primero.anterior = null
                    }                    
                }
                else if(nodo === this.ultimo){
                    this.ultimo = aux
                    this.ultimo.siguiente = null
                }
                else{
                    aux.siguiente = nodo.siguiente
                    nodo.siguiente.anterior = aux
                }
                break
            }
            aux = nodo
            nodo = nodo.siguiente
        }
    }
    //Actualizar
    actualizar(valor,nuevo){
        if(this.repeticion || !(this.buscar(valor))){
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
    // Buscar
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
    // Cargar JSON
    cargar(vec){
        for(var i in vec){
            this.agregar(vec[i].toString())
        }
    }
    // Exportar JSON
    guardar(){
        const json = {
            categoria: "Enlazada Doble",
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
        return {nombre: "Enlazada Doble.json", text: txt}
    }
    // Lineales
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
                relaciones.push({from: contador+"l"+indice, to: (contador+1)+"l"+indice, arrows: "to, from"})
                contador++
                nodo = nodo.siguiente
            }while(nodo !== null)
        }
        relaciones.push({from: (contador+1)+"l"+indice, to: (contador)+"l"+indice, arrows: "to, from"})
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

export default Doble