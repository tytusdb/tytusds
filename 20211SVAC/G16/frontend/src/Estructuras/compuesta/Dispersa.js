class Nodo{
    constructor(valor,x,y){
        this.valor = valor
        this.x = x
        this.y = y
        this.siguiente = null;
        this.anterior = null;
        this.arriba = null
        this.abajo = null
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
            let tmp = parseInt(aux.valor)
            let tmp2 = Number.isInteger(tmp)
            
            if(tmp2 !== false){
                console.log("number:",tmp)
                if(tmp < parseInt(nodo.valor)){
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
                        return;
                    }
                }
            }
            else{
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
                        return;
                    }
                }
            }
        }
        this.ultimo.siguiente = nodo
        nodo.anterior = this.ultimo
        this.ultimo = nodo
    }
    //Agrega nodo a la lista
    insertar(valor){
        let nodo = new Nodo(valor,null,null)
        if(this.primero === null){
            this.primero = this.ultimo = nodo
            return;
        }
        this.ordenar(nodo)
    }
    //Buscar nodo en la lista
    busqueda(valor){
        let temp = this.primero;
        while(temp !== null){
            if(temp.valor === valor) return temp
            temp = temp.siguiente
        }
        return null
    }
}

class MatrizD{
    constructor(){
        this.lista_horizontal = new Lista()
        this.lista_vertical = new Lista()
    }

    insertar(valor, x, y){
        let nodo_x = this.lista_horizontal.busqueda(x)
        let nodo_y = this.lista_vertical.busqueda(y)

        if (nodo_x === null && nodo_y === null){
            this.caso1(valor,x,y)
        } else if(nodo_x === null && nodo_y != null){
            this.caso2(valor, x, y)
        }else if(nodo_x != null && nodo_y === null){
            this.caso3(valor,x,y)
        }else{
            this.caso4(valor,x,y)
        }
    }

    caso1(valor,x,y){
        this.lista_horizontal.insertar(x)
        this.lista_vertical.insertar(y)

        let nodo_x = this.lista_horizontal.busqueda(x)
        let nodo_y = this.lista_vertical.busqueda(y)

        let nuevo = new Nodo(valor,x,y)
        nodo_x.abajo = nuevo
        nuevo.arriba = nodo_x

        nodo_y.derecha = nuevo
        nuevo.izquierda = nodo_y
    }

    caso2(valor,x,y){
        this.lista_horizontal.insertar(x)

        let nodo_x = this.lista_horizontal.busqueda(x)
        let nodo_y = this.lista_vertical.busqueda(y)

        let agregado = false

        let nuevo = new Nodo(valor,x,y)
        let aux = nodo_y.derecha
        let cabecera = 0

        while(aux != null){
            cabecera = aux.x
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

        nodo_x.abajo = nuevo
        nuevo.arriba = nodo_x
    }

    caso3(valor,x,y){
        this.lista_vertical.insertar(y)

        let nodo_x = this.lista_horizontal.busqueda(x)
        let nodo_y = this.lista_vertical.busqueda(y)

        let agregado = false

        let nuevo = new Nodo(valor,x,y)
        let aux = nodo_x.abajo
        let cabecera = 0

        while(aux != null && !agregado){
            cabecera = aux.y
            if(cabecera < y){
                aux = aux.abajo
            } else{
                nuevo.abajo = aux
                nuevo.arriba = aux.arriba
                aux.arriba.abajo = nuevo
                aux.arriba = nuevo
                agregado = true
            }
        }

        if(!agregado){
            aux = nodo_x.abajo
            while(aux.abajo != null){
                aux = aux.abajo
            }
            aux.abajo = nuevo
            nuevo.arriba = aux
        }

        nodo_y.derecha = nuevo
        nuevo.izquierda = nodo_y
    }

    caso4(valor,x,y){
        let nodo_x = this.lista_horizontal.busqueda(x)
        let nodo_y = this.lista_vertical.busqueda(y)

        let agregado = false
        let nuevo = new Nodo(valor,x,y)
        let aux = nodo_y.derecha
        let cabecera = 0
        while(aux != null){
            cabecera = aux.x
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
        agregado = false
        aux = nodo_x.abajo
        cabecera = 0

        while(aux !== null && !agregado){
            cabecera = aux.y
            if(cabecera < y){
                aux = aux.abajo
            } else{
                nuevo.abajo = aux
                nuevo.arriba = aux.arriba
                aux.arriba.abajo = nuevo
                aux.arriba = nuevo
                agregado = true
            }
        }
        if(!agregado){
            aux = nodo_x.abajo
            while(aux.abajo != null){
                aux = aux.abajo
            }
            aux.abajo = nuevo
            nuevo.arriba = aux
        }
    }

    //Buscar nodo
    buscar(valor){
        let cabecera = this.lista_vertical.primero
        let aux
        while(cabecera !== null){
            aux = cabecera.derecha
            while(aux !== null){
                if(valor === aux.valor){
                    return aux.valor
                }
                aux = aux.derecha
            }
            cabecera = cabecera.siguiente
        }
    }
    //Actualizar
    actualizar(valor,nuevo){
        let cabecera = this.lista_vertical.primero
        let aux
        while(cabecera !== null){
            aux = cabecera.derecha
            while(aux !== null){
                if(valor === aux.valor){
                    aux.valor = nuevo
                    return
                }
                aux = aux.derecha
            }
            cabecera = cabecera.siguiente
        }
    }
    //Eliminar
    eliminar(valor){
        let nodo_y = this.lista_vertical.primero
        let aux = null
        while(nodo_y !== null){
            aux = nodo_y.derecha
            let temp
            while(aux !== null){
                temp = aux
                if(aux.valor === valor){
                    if(aux.izquierda === nodo_y){ //Elimina primer ij
                        nodo_y.derecha = aux.derecha
                        aux.derecha.izquierda = nodo_y
                        
                    }
                    else if(aux.derecha !== null){//Intermedios
                        aux.izquierda.derecha = aux.derecha
                        aux.derecha.izquierda = aux.izquierda
                    }else if(aux.derecha === null){ //Elimina el último
                        aux.izquierda.derecha = null
                    }
                    break
                }
                aux = aux.derecha
            }
            nodo_y = nodo_y.siguiente
        }
    }
    // Imprime Con cabecera
    dotGC(){
        let piv = []
        let nodos = []
        let direccion = []
        let cabeceraV = this.lista_vertical.primero
        let cabeceraH = this.lista_horizontal.primero
        //Vertical
        let cont = 0
        while(cabeceraV !== null){
            nodos.push({id:"v"+cabeceraV.valor, label:cabeceraV.valor.toString(),x:-150, y: cont*150})
            piv.push({id:"v"+cabeceraV.valor, label:cabeceraV.valor.toString(),tipo:"vertical",y: cont*150})
            if(cabeceraV.siguiente !== null){
                direccion.push({to:"v"+cabeceraV.valor,from:"v"+(cabeceraV.siguiente.valor)})
            }
            cabeceraV = cabeceraV.siguiente
            cont++
        }
        //Horizontal
        let conteo = 0
        while(cabeceraH !== null){
            nodos.push({id:"h"+cabeceraH.valor,label:cabeceraH.valor.toString(),x:conteo*150,y:-150})
            piv.push({id:"h"+cabeceraH.valor,label:cabeceraH.valor.toString(),tipo:"horizontal",x:conteo*150})
            if(cabeceraH.siguiente !== null){
                direccion.push({to:"h"+cabeceraH.valor, from:"h"+cabeceraH.siguiente.valor})
            }
            cabeceraH = cabeceraH.siguiente
            conteo++
        }
        //Internos
        let cabecera = this.lista_vertical.primero
        let cabH = this.lista_horizontal.primero
        let aux
        let aux2
        //Horizontales
        while(cabecera !== null){
            aux = cabecera.derecha
            let pivX = 0
            let pivY = 0
            while(aux !== null){
                //nodos.push({id:"I"+aux.valor+aux.x+aux.y,label:aux.valor,x:aux.x*150,y:aux.y*100})
                if(aux.izquierda === cabecera){
                    direccion.push({to:"v"+aux.izquierda.valor,from:"I"+aux.valor+aux.x+aux.y})
                }
                else if(aux === aux.izquierda.derecha){
                    direccion.push({to:"I"+aux.izquierda.valor+aux.izquierda.x+aux.izquierda.y,from:"I"+aux.valor+aux.x+aux.y})
                }
                //Busca posiciones
                for(let i in piv){
                    if(piv[i].id === ("v"+aux.y) && piv[i].tipo === "vertical"){
                        pivY = piv[i].y
                    }
                    if(piv[i].id === ("h"+aux.x) && piv[i].tipo === "horizontal"){
                        pivX = piv[i].x
                        //break
                    }
                }
                nodos.push({id:"I"+aux.valor+aux.x+aux.y,label:aux.valor,x:pivX,y:pivY})
                aux = aux.derecha
            }
            cabecera = cabecera.siguiente
        }
        //Verticales
        while(cabH !== null){
            aux2 = cabH.abajo
            while(aux2 !== null){
        
                if(aux2 === cabH.abajo){
                    direccion.push({to:"h"+aux2.arriba.valor,from:"I"+aux2.valor+aux2.x+aux2.y})
                }
                else{
                    direccion.push({to:"I"+aux2.arriba.valor+aux2.arriba.x+aux2.arriba.y,from:"I"+aux2.valor+aux2.x+aux2.y})
                }
                aux2= aux2.abajo
            }
            cabH = cabH.siguiente
        }
        return {nodes: nodos, edges: direccion}
    }
    //DOT sin cabecera
    dotGS(){
        let nodos = []
        let direccion = []
        let piv = []
        let cabeceraH = this.lista_horizontal.primero
        let cabeceraV = this.lista_vertical.primero
        let aux
        let aux2
        let cont = 0
        let conteo = 0
        //Ingresa los nodos verticales
        while(cabeceraV !== null){
            //nodos.push({id:"v"+cabeceraV.valor, label:cabeceraV.valor.toString(),x:-150, y: cont*150})
            piv.push({id:"v"+cabeceraV.valor, label:cabeceraV.valor.toString(),tipo:"vertical",y: cont*150})
            cont ++
            aux2 = cabeceraV.derecha
            while(aux2 !== null){
                if(aux2.derecha !== null){
                    direccion.push({to:"h"+aux2.valor+aux2.x+aux2.y,from:"h"+aux2.derecha.valor+aux2.derecha.x+aux2.derecha.y })
                }
                aux2 = aux2.derecha
            }
            cabeceraV = cabeceraV.siguiente
        }
        //Ingresa los nodos horizontales
        while(cabeceraH !== null){
            //nodos.push({id:"h"+cabeceraH.valor,label:cabeceraH.valor.toString(),x:conteo*150,y:-150})
            piv.push({id:"h"+cabeceraH.valor,label:cabeceraH.valor.toString(),tipo:"horizontal",x:conteo*150})
            conteo ++
            let pivX = 0
            let pivY = 0
            aux = cabeceraH.abajo
            while(aux !== null){
                // Busca posiciones
                for(let i in piv){
                    if(piv[i].id === ("v"+aux.y) && piv[i].tipo === "vertical"){
                        pivY = piv[i].y
                    }
                    if(piv[i].id === ("h"+aux.x) && piv[i].tipo === "horizontal"){
                        pivX = piv[i].x
                        //break
                    }
                }
                //nodos.push({id:"h"+aux.valor+aux.x+aux.y,label:aux.valor,x:aux.x*150,y:aux.y*100})
                nodos.push({id:"h"+aux.valor+aux.x+aux.y,label:aux.valor,x:pivX,y:pivY})
                //piv.push({id:"h"+cabeceraV.valor, label:cabeceraV.valor.toString(),tipo:"vertical",y: cont*150})
                if(aux.abajo !== null){
                    direccion.push({to:"h"+aux.valor+aux.x+aux.y,from:"h"+aux.abajo.valor+aux.abajo.x+aux.abajo.y})
                }
                aux = aux.abajo
            }
            cabeceraH = cabeceraH.siguiente
        }
        return {nodes:nodos,edges:direccion}
    }
    dotG(tipo){
        if(tipo === "Activado"){
            return this.dotGC()
        }else if(tipo === "Desactivado"){
            return this.dotGS()
        }
    }
    cargar(ingresa){
        for(var i in ingresa){
            var aux = ingresa[i]
            var x = aux.indices[0]
            var y = aux.indices[1]
            this.insertar(aux.valor.toString(),x.toString(),y.toString())
        }
    }
    guardar(tipo){
        let aux = []
        let cabecera = this.lista_vertical.primero
        let aux2
        while(cabecera !== null){
            aux2 = cabecera.derecha
            while( aux2 !== null){
                let index = []
                index.push(aux2.x)
                index.push(aux2.y)
                aux.push({indices:index,valor:aux2.valor})
                aux2 = aux2.derecha
            }
            cabecera = cabecera.siguiente
        }
        const json = {
            categoria: "Estructura Compuesta",
            nombre: "Matriz Dispersa",
            animacion: 10,
            tipo: tipo,
            valores: aux
        }
        const txt = JSON.stringify(json, null, '   ')
        return {nombre: "Matriz Dispersa.json", text: txt}
    }
}
export default MatrizD