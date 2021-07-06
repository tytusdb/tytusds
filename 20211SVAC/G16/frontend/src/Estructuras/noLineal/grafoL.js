//Estructura Lista de adyacencia
class Nodo{
    constructor(valor,peso){
        this.valor = valor
        this.peso = peso
        this.siguiente = null
        this.anterior = null
        this.izquierda = null
        this.derecha = null
    }
}
class Lista{
    constructor(){
        this.primero = null
        this.ultimo = null
    }
    //Agrega en orden a la lista
    ordenar(nodo){
        let aux = this.primero
        while(aux != null){
            if(aux.valor < nodo.valor){
                aux = aux.siguiente
            } else {
                if(aux === this.primero){
                    nodo.siguiente = aux
                    aux.anterior = nodo
                    this.primero = nodo
                    return;
                } else{
                    nodo.anterior = aux.anterior
                    aux.anterior.siguiente = nodo
                    nodo.siguiente = aux
                    aux.anterior = nodo
                    return
                }
            }
        }
        this.ultimo.siguiente = nodo
        nodo.anterior = this.ultimo
        this.ultimo = nodo
    }
    //Agregar nodo a la lista
    insertar(valor){
        let nodo = new Nodo(valor,null)
        if(this.primero === null){
            this.primero = this.ultimo = nodo
            return;
        }
        this.ordenar(nodo)
    }
    //Buscar nodo en la lista
    busqueda(valor){
        let temp = this.primero
        while(temp !== null){
            if(temp.valor === valor) return temp
            temp = temp.siguiente
        }
        return null
    }
}
// LISTA DE ADYACENCIAS
class ListaD{
    constructor(){
        this.lista_vertical = new Lista()
        this.nodoI = ""
        this.nodoF = ""
        this.distancia = ""
    }
    insertar(valor, x,peso){
        let nodo_y = this.lista_vertical.busqueda(valor)
        if(nodo_y === null){
            this.caso1(valor,x,peso)
        }else{
            this.caso2(valor,x,peso)
        }
    }
    caso1(valor,x,peso){
        this.lista_vertical.insertar(valor)
        let nodo_y = this.lista_vertical.busqueda(valor)
        let nuevo = new Nodo(x,peso)
        nodo_y.derecha = nuevo
        nuevo.izquierda = nodo_y
    }
    caso2(valor,x,peso){
        let nodo_y = this.lista_vertical.busqueda(valor)
        let agregado = false
        let nuevo = new Nodo(x,peso)
        let aux = nodo_y.derecha
        while(aux !== null){
            let cabecera = aux.valor
            if(cabecera < x){
                aux = aux.derecha
            } else{
                nuevo.derecha = aux
                nuevo.izquierda = aux.izquierda
                aux.izquierda.derecha = nuevo
                aux.izquierda = nuevo
                agregado = true
                break;
            }
        }
        if(agregado === false){
            aux = nodo_y.derecha
            while(aux.derecha != null){
                aux = aux.derecha
            }
            nuevo.izquierda = aux
            aux.derecha = nuevo
        }
    }
    //Imprime lista vertical
    imprimir_vertical(){
        let cabecera = this.lista_vertical.primero
        let aux
        let resultado = ""
        while(cabecera != null){
            let result = ''
            aux = cabecera.derecha
            while(aux != null){
                result += " -> " + aux.valor
                aux = aux.derecha
            }
            console.log("|",cabecera.valor,"|",result)
            resultado += "\n| "+cabecera.valor+" |"+result
            cabecera = cabecera.siguiente
        }
        
        return resultado
    }
    //Imprimir matriz
    imprimir_matriz(){
        let cabecera = this.lista_vertical.primero
        let contorno = []
        let interno = []
        let matriz = []
        let aux
        let resultado = ""
        while(cabecera != null){
            aux = cabecera.derecha
            contorno.push(cabecera.valor)
            while(aux != null){
                if(aux.valor !== ""){
                    interno.push({to:aux.valor,from:cabecera.valor})
                }
                aux = aux.derecha
            } 
            cabecera = cabecera.siguiente
        }
        // Nodos
        for(var i in contorno){
            let temp = []
            // Apunta
            for( var j in contorno){
                temp.push("0")
            }
            matriz.push(temp)
        }

        for(i in matriz){
            resultado += "\n"+matriz[i]
        }
        console.log(resultado)
        return resultado
    }
    almacenamiento(tipo){
        if(tipo === "Lista"){
            let list = this.imprimir_vertical()
            return list
        }else if(tipo === "Matriz"){
            let matrix = this.imprimir_matriz()
            return matrix
        }
    }
    //Elimina nodo de la lista [solo el nodo]
    eliminar(valor){
        let cabecera = this.lista_vertical.primero
        let aux
        while(cabecera != null){
            if(cabecera.valor === valor){
                if(cabecera === this.lista_vertical.primero){
                    if(this.lista_vertical.primero === this.lista_vertical.ultimo){
                        this.lista_vertical.primero = this.lista_vertical.ultimo = null
                    }
                    this.lista_vertical.primero = cabecera.siguiente
                }
                cabecera.anterior.siguiente = cabecera.siguiente
            }
            aux = cabecera.derecha
            while(aux !== null){
                if(aux.valor === valor){
                    aux.izquierda.derecha = aux.derecha
                }
                aux = aux.derecha
            }
            cabecera = cabecera.siguiente
        }
    }
    //Actualiza el valor de la lista [solo el nodo]
    actualizar(valor, nuevo){
        let cabecera = this.lista_vertical.primero
        while(cabecera != null){
            if(cabecera.valor === valor){
                cabecera.valor = nuevo
                return
            }
            cabecera = cabecera.siguiente
        }
    }
    //Recorrido por anchura
    recorridoAnchura(){
        let cabecera = this.lista_vertical.primero
        let recorrido = [cabecera.valor]
        let camino = []
        var cont = 0
        while(recorrido.length >0){
            var temp = recorrido.shift()
            if(temp !== ""){
                camino.push(temp)
            }
            if(cabecera != null){
                let aux = cabecera.derecha
                while(aux !== null){
                    recorrido.push(aux.valor)
                    if(aux.peso !== ""){
                        cont += parseInt(aux.peso)
                    }
                    aux = aux.derecha
                }
                cabecera = cabecera.siguiente
            }    
        }
        let result = camino[0]
        for(let i = 1; i < camino.length; i++){
            result += " -> " + camino[i]
        }
        this.nodoI = camino[0]
        this.nodoF = camino[camino.length-1]
        this.distancia = cont
        return result
    }
    //Busqueda por anchura
    busquedaAnchura(inicio,valor){
        let recorrido = [inicio]
        let camino = []
        let sucesores = []
        var cont = 0
        while(recorrido.length>0){
            var temp = recorrido.shift()
            if(temp!== '') {
                camino.push(temp)
            }
            let cabecera = this.lista_vertical.busqueda(temp)
            if(temp === valor){
                let result = camino[0]
                for(let i = 1; i<camino.length;i++){
                    result += " -> "+camino[i]
                }
                this.nodoI = camino[0]
                this.nodoF = camino[camino.length-1]
                this.distancia = cont
                return result
            }
            if(cabecera != null){
                let aux = cabecera.derecha
                while(aux !== null){
                    if(aux.valor !== "") {
                        recorrido.push(aux.valor)
                        if(aux.peso !== ""){
                            cont = parseInt(aux.peso)
                        }
                    }
                    sucesores.push(aux.valor)
                    aux = aux.derecha
                }
            }
        }
    }
    //Recorrido por profundidad [hacer pruebas numéricas]
    recorridoProf(){
        let one = this.lista_vertical.primero
        let recorrido = [one.valor]
        let camino = []
        let cont = 0
        while(recorrido.length > 0){
            let temp = recorrido.shift()
            let cabecera = this.lista_vertical.busqueda(temp)
            if(temp !== ""){
                camino.push(temp)
            }
            if(cabecera !== null){
                let aux = cabecera.derecha
                let sus = []
                while(aux !== null){
                    if(aux.valor !== "") sus.push(aux.valor)
                    if(aux.peso !== ""){
                        cont += parseInt(aux.peso)
                    }
                    aux = aux.derecha
                }
                recorrido = sus.concat(recorrido)
                cabecera = cabecera.siguiente
            }
        }
        let result = camino[0]
        for(let i = 1; i < camino.length; i++){
            result += " -> " + camino[i]
        }
        this.nodoI = camino[0]
        this.nodoF = camino[camino.length-1]
        this.distancia = cont
        return result
    }
    //Busqueda por profundidad [hacer pruebas numéricas]
    busquedaProf(inicio,valor){
        let recorrido = [inicio]
        let camino = []
        var cont = 0
        while(recorrido.length>0){
            var temp = recorrido.shift()
            camino.push(temp)
            let cabecera = this.lista_vertical.busqueda(temp)
            if(temp === valor){
                let result = camino[0]
                for(let i = 1; i < camino.length;i++){
                    result += " -> "+camino[i]
                }
                this.nodoI = camino[0]
                this.nodoF = camino[camino.length-1]
                this.distancia = cont
                return result
            }
            if(cabecera !== null){
                let aux = cabecera.derecha
                let sus = []
                while(aux !== null){
                    if(aux.valor !== "") sus.push(aux.valor)
                    if(aux.peso !== ""){
                        cont += parseInt(aux.peso)
                    }
                    aux = aux.derecha
                }
                //sus.reverse()
                recorrido = sus.concat(recorrido)
            }

        }
    }
    //Costo uniforme
    costoU(inicio,valor){
        let recorrido = [{valor:inicio,peso:0}]
        let camino = []
        let sucesores = []
        while(recorrido.length>0){
    
            recorrido.sort(function(a,b){
                return a.peso - b.peso
            });
            let temp = recorrido.shift()
            if(temp.valor!== '') {
                camino.push(temp)
            }
            let cabecera = this.lista_vertical.busqueda(temp.valor)
            if(temp.valor === valor){
                var cont = 0
                let result = camino[0].valor + ": " + camino[0].peso
                for(let i = 1; i<camino.length;i++){
                    result += " -> "+camino[i].valor + ": " + camino[i].peso
                    if(camino[i].valor === valor) {
                        cont = camino[i].peso
                    }
                }
                this.nodoI = camino[0].valor
                this.nodoF = camino[camino.length-1].valor
                this.distancia = cont
                return result+ " ---  Distancia: " +cont
            }
            if(cabecera != null){
                let aux = cabecera.derecha
                while(aux !== null){
                    if(aux.valor !== "") {
                        var repetido
                        var acumulado = parseInt(aux.peso) + parseInt(temp.peso)
                        for(var i in camino){
                            if(aux.valor === camino[i].valor && temp.valor !== inicio){
                                repetido = true
                                break
                            }else repetido = false
                        }
                        if(repetido === false){
                            recorrido.push({valor:aux.valor,peso:acumulado})
                        }
                    }
                    sucesores.push(aux.valor)
                    aux = aux.derecha
                }
            }
        }  
    }
    //Recubrimiento minimo
    recMin(inicio){
        let recorrido = [{valor:inicio,peso:0}]
        let nodos = []
        let camino = []
        let sucesores = [] 
        let nodosC = this.lista_vertical.primero
        while(nodosC !== null){
            nodos.push(nodosC)
            nodosC = nodosC.siguiente
        }
        while( recorrido.length > 0){
            recorrido.sort(function(a,b){
                return a.peso - b.peso
            });
            let temp = recorrido.shift()
            if(temp.valor!== '') {
                let bandera
                for(var j = 0; j < camino.length;j++){
                    if(camino.length === 0) {
                        bandera = false 
                        break
                    } else if(temp.valor === camino[j].valor){
                        bandera = true
                        break
                    } else bandera = false
                }
                if(camino.length === 0) {
                    bandera = false 
                }
                if(bandera === false) camino.push(temp)
            }
            let cabecera = this.lista_vertical.busqueda(inicio)
            if(nodos.length === camino.length){
                var cont = 0
                let result = camino[0].valor + ": " + camino[0].peso
                for(let i = 1; i<camino.length;i++){
                    result += " -> "+camino[i].valor + ": " + camino[i].peso
                    cont += camino[i].peso
                    
                }
                this.nodoI = camino[0].valor
                this.nodoF = camino[camino.length-1].valor
                this.distancia = cont
                return result+ " ---  Distancia: " +cont
            }
            if(cabecera != null){
                let aux = cabecera.derecha
                while(aux !== null){
                    if(aux.valor !== "") {
                        var repetido
                        var acumulado = parseInt(aux.peso) + parseInt(temp.peso)
                        for(var i in camino){
                            if(aux.valor === camino[i].valor && temp.valor !== inicio){
                                repetido = true
                                break
                            }else repetido = false
                        }
                        if(repetido === false){
                            recorrido.push({valor:aux.valor,peso:acumulado})
                        }
                    }
                    sucesores.push(aux.valor)
                    aux = aux.derecha
                }
            }
        }
        var cont = 0
        let result = camino[0].valor + ": " + camino[0].peso
        for(let i = 1; i<camino.length;i++){
            result += " -> "+camino[i].valor + ": " + camino[i].peso
            cont += camino[i].peso
            
        }
        this.nodoI = camino[0].valor
        this.nodoF = camino[camino.length-1].valor
        this.distancia = cont
        return result+ " ---  Distancia: " +cont

    }
    // Genera DOT
    dotG(){
        var nodos = []
        var relaciones = []

        let cabecera = this.lista_vertical.primero
        let aux
        while(cabecera != null){
            nodos.push({id: cabecera.valor, label:cabecera.valor})
            aux = cabecera.derecha
            while(aux != null){
                relaciones.push({from:cabecera.valor, to:aux.valor, label: aux.peso})
                aux = aux.derecha
            }
            cabecera = cabecera.siguiente
        }
        return { nodes: nodos, edges: relaciones}
    }
    guardar(tipo){
        let aux = []
        let det = []
        let cabecera = this.lista_vertical.primero
        let aux2 
        while(cabecera !== null){
            aux2 = cabecera.derecha
            let index = []
            while(aux2 !== null){
                index.push({arista:aux2.valor,distancia:aux2.peso})
                aux2 = aux2.derecha
            }
            aux.push({vertice:cabecera.valor,aristas:index})
            cabecera = cabecera.siguiente
        }

        det.push({inicio: this.nodoI, fin: this.nodoF, distancia: this.distancia})

        const json = {
            categoria: "Estructura No Lineal",
            nombre: "Grafo Dirigido/No Dirigido",
            almacenamiento: tipo,
            animacion: 10,
            valores: aux,
            detalles: det
        }

        const txt = JSON.stringify(json, null, '   ')
        return {nombre: "Grafos.json", text: txt}
    }

    cargar(ingresa){
        //console.log(ingresa[0].vertice)
        for(var i in ingresa){
            var aux = ingresa[i]
            if(aux.aristas.length === 0){
                this.insertar(aux.vertice.toString(),"","")
            }
            for(var j in aux.aristas){
                var temp = aux.aristas[j]
                this.insertar(aux.vertice.toString(), temp.arista.toString(), temp.distancia.toString() )
            }
        }
    }
}
export default ListaD