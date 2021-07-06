import Simple from '../lineal/Simple'
import Doble from '../lineal/Doble'

class Nodo {
    constructor(valor, lista){
        this.valor = valor
        this.siguiente = null
        this.anterior = null
        this.lista = lista
    }
}

class CompuestaDoble {
    constructor(ingreso, repeticion, subtipo){
        this.primero = null
        this.ultimo = null
        this.ingreso = ingreso
        this.repeticion = repeticion
        this.subtipo = subtipo
    }

    agregar(primario, secundario){
        const nodo = new Nodo(primario, this.setLista())
        if(secundario !== "") nodo.lista.agregar(secundario)
        if(this.primero === null){
            this.primero = this.ultimo = nodo
        }
        else{
            if(this.buscarPrimario(primario)){
                var aux = this.getPrimario(primario)
                aux.lista.agregar(secundario)
            }
            else{
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
        }
    }

    buscar(primario, secundario){
        if(secundario === ""){
            return this.buscarPrimario(primario)
        }
        else{
            return this.buscarSecundario(primario, secundario)
        }
    }

    buscarPrimario(primario){
        if(this.primero !== null){
            var aux = this.primero
            while(aux !== null){
                if(aux.valor === primario){
                    return true
                }
                aux = aux.siguiente
            }
        }
        return false
    }

    buscarSecundario(primario, secundario){
        var aux = this.getPrimario(primario)
        return aux.lista.buscar(secundario)
    }

    eliminar(primario, secundario){
        if(secundario === "") this.eliminarPrimario(primario)

        else this.eliminarSecudario(primario, secundario)
    }

    eliminarPrimario(valor){
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

    eliminarSecudario(primario, secundario){
        var aux = this.getPrimario(primario)
        aux.lista.eliminar(secundario)
    }

    actualizar(primario, secundario, nuevo){
        if(secundario === "") this.actualizarPrimario(primario, nuevo)

        else this.actualizarSecudario(primario, secundario, nuevo)
    }

    actualizarPrimario(valor, nuevo){
        var aux = this.primero
            while(aux != null){
                if(aux.valor === valor){
                    aux.valor = nuevo
                }
                aux = aux.siguiente
            }
    }

    actualizarSecudario(primario, secundario, nuevo){
        var aux = this.getPrimario(primario)
        aux.lista.actualizar(secundario, nuevo)
    }

    getPrimario(valor){
        var aux = this.primero
        while(aux !== null){
            if(aux.valor === valor){
                return aux
            }
            aux = aux.siguiente
        }
    }

    agregar_F(nodo){
        var aux = this.ultimo
        this.ultimo = aux.siguiente = nodo
        nodo.anterior = aux
    }
    
    agregar_I(nodo){
        var aux = this.primero
        this.primero = nodo
        aux.anterior = nodo
        nodo.siguiente = aux
    }
    
    agregar_O(nodo){
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

    setLista(){
        if(this.subtipo === "Simple") return new Simple(this.ingreso, this.repeticion)

        else if(this.subtipo === "Doble") return new Doble(this.ingreso, this.repeticion)
    }

    dotG(){
        var nodos = [ {id:0, label: "PRIMERO", level: 0} ]
        var relaciones = []
        nodos = this.llenarN(nodos, 1, relaciones)
        relaciones = this.llenarR(relaciones, 0)
        return { nodes: nodos, edges: relaciones }
    }

    llenarN(nodos, contador, relaciones){
        var nodo = this.primero
        while(nodo !== null){
            nodos.push({id: contador, label: (nodo.valor).toString(), level: contador})
            var aux = nodo.lista.dotG(contador)
            nodos = this.llenar(nodos, aux.nodes)
            relaciones.push({from: contador, to: 0+"l"+contador, arrows: "to, from"})
            relaciones = this.llenar(relaciones, aux.edges)
            contador++
            nodo = nodo.siguiente
        }
        nodos.push({id: contador, label: "ULTIMO", level: contador})
        return nodos
    }

    llenarR(relaciones, contador){
        var nodo = this.primero
        if(nodo !== null){
            do{
                relaciones.push({from: contador, to: contador+1, arrows: "to, from"})
                contador++
                nodo = nodo.siguiente
            }while(nodo !== null)
        }
        relaciones.push({from: contador+1, to: contador, arrows: "to, from"})
        return relaciones
    }

    llenar(aux, temp){
        for(var i in temp){
            aux.push(temp[i])
        }
        return aux
    }

    cargar(lista){
        for(var i in lista){
            this.agregar(lista[i].principal.toString(), lista[i].secundario.toString())
        }
    }

    guardar(){
        const json = {
            categoria: "Compuesta",
            posicion: this.ingreso,
            valores: []
        }
        var nodo = this.primero
        while(nodo !== null){
            var aux = JSON.parse(nodo.lista.guardar().text)
            json.valores.push({principal: nodo.valor, lista: aux})
            nodo = nodo.siguiente
        }
        const txt = JSON.stringify(json, null, '   ')
        return {nombre: "Compuesta.json", text: txt}
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

export default CompuestaDoble