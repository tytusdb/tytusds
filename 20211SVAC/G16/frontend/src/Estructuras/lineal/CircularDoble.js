class Nodo {
    constructor(valor){
        this.valor = valor
        this.siguiente = null
        this.anterior = null
    }
}

class CircularDoble {
    constructor(ingreso, repeticion){
        this.raiz = null
        this.ingreso = ingreso
        this.repeticion = repeticion
    }

    agregar(valor){
        const nodo = new Nodo(valor)
        if(this.raiz === null){
            this.raiz = nodo.siguiente = nodo.anterior = nodo
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
        var nodo = this.raiz
        var aux = null
        do{
            if(nodo.valor === valor){
                if(nodo === this.raiz){
                    if(this.raiz.siguiente === this.raiz){
                        this.raiz = null
                    }
                    else{
                        aux = this.raiz.anterior
                        this.raiz = nodo.siguiente
                        nodo.anterior = aux
                    }
                }
                else{
                    aux = nodo.anterior
                    aux.siguiente = nodo.siguiente
                    nodo.siguiente.anterior = aux
                }
                break
            }
            nodo = nodo.siguiente
        }while(nodo !== this.raiz)
    }

    actualizar(valor, nuevo){
        if(this.repeticion || !(this.buscar(nuevo))){
            var nodo = this.raiz
            do{
                if(nodo.valor === valor){
                    nodo.valor = nuevo
                    break
                }
                nodo = nodo.siguiente
            }while(nodo !== this.raiz)
        }
        else alert("El Nuevo Valor ya existe")
    }

    buscar(valor){
        if(this.raiz !== null){
            var nodo = this.raiz
            do{
                if(nodo.valor === valor){
                    return true
                }
            }while(nodo !== this.raiz)
        }
        return false
    }

    cargar(vec){
        for(var i in vec){
            this.agregar(vec[i].toString())
        }
    }

    guardar(){
        const json = {
            categoria: "Circular Doble",
            posicion: this.ingreso,
            repeticion: this.repeticion,
            valores: []
        }
        var nodo = this.raiz
        do{
            json.valores.push(nodo.valor)
            nodo = nodo.siguiente
        }while(nodo !== this.raiz)
        const txt = JSON.stringify(json, null, '   ');
        return {nombre: "Circular Doble.json", text: txt}
    }
    //Metodos sin uso fuera
    agregar_F(nodo) {
        var aux = this.raiz.anterior
        aux.siguiente = this.raiz.anterior = nodo
        nodo.anterior = aux
        nodo.siguiente = this.raiz    
    }

    agregar_I(nodo){
        var aux = this.raiz
        var temp = this.raiz.anterior
        this.raiz = nodo
        nodo.siguiente = aux
        nodo.anterior = temp
        aux.anterior = temp.siguiente = nodo
    }

    agregar_O(nodo){//ERORR
        var aux = this.raiz
        var pivote
        do{
            if(ascii(nodo.valor) <= ascii(aux.valor)){
                if(aux === this.raiz){
                    this.agregar_I(nodo)
                }
                else{
                    pivote = aux.anterior
                    pivote.siguiente = aux.anterior = nodo
                    nodo.siguiente = aux
                    nodo.anterior = pivote
                }
                break
            }
            else if(aux.siguiente === this.raiz){
                this.raiz.anterior = aux.siguiente = nodo
                nodo.siguiente = this.raiz
                nodo.anterior = aux
                break
            }
            aux = aux.siguiente
        }while(aux !== this.raiz)
    }
    // Circular
    dotG(indice){
        var nodos = [ {id:0+"l"+indice, label: "RAIZ"} ]
        var relaciones = []
        nodos = this.llenarN(nodos, 1, indice)
        relaciones = this.llenarR(relaciones, 0, indice)
        return { nodes: nodos, edges: relaciones} 
    }

    llenarN(nodos, contador, indice){
        var nodo = this.raiz
        if(nodo!==null){
            do{
                nodos.push({id: contador+"l"+indice, label: (nodo.valor).toString()})
                contador++
                nodo = nodo.siguiente
            }
            while(nodo !== this.raiz)
        }
        return nodos
    }

    llenarR(relaciones, contador, indice){
        var nodo = this.raiz
        if(nodo !== null){
            do{
                relaciones.push({from: contador+"l"+indice, to: (contador+1)+"l"+indice, arrows: "to, from"})
                contador++
                nodo = nodo.siguiente
            }while(nodo.siguiente !== this.raiz)
            relaciones.push({from: contador+"l"+indice, to: (contador+1)+"l"+indice, arrows: "to, from"})
            relaciones.push({from: (contador+1)+"l"+indice, to: 1+"l"+indice, arrows: "to, from"})
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

export default CircularDoble