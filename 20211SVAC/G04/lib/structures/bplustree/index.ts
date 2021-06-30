class NodoBplus{
    public valores:any
    public padre:any
    public siguiente:any
    public hijos:any
    public grado:number
    public esHoja:boolean

    constructor(grado:number, esHoja:boolean){
        this.grado = grado
        this.valores = []
        this.hijos = []
        this.padre = null
        this.siguiente = null
        this.esHoja = esHoja
    }

    //Ingresa un valor en la posicion indicada
    agregarValor(valor:any){
        if(this.valores.length==0){
            this.valores.splice(0,0,valor)
        }else{
            if(valor < this.valores[0]){
                this.valores.splice(0,0,valor) 
            }else{
                let i = this.buscarPos(valor)
                this.valores.splice(i,0,valor)
            }
        }
    }

    //Ingresa un hijo al vector de hijos
    agregarHijo(hijo:any, valor:any){
        if(this.hijos.length==0){
            this.hijos.splice(0,0,hijo)
        }else{
            if(valor < this.valores[0]){
                this.hijos.splice(0,0,valor) 
            }else{
                let i = this.buscarPos(valor)
                this.hijos.splice(i,0,hijo)
            }
        }
    }

    //Busca el indice que indica la posicion del hijo en el vector
    buscarHijo(valor:any){
        if(this.hijos.length != 0){
            if(valor < this.valores[0]){
                return 0
            }else{
                let i = this.buscarPos(valor)
                return i
            }
        }
        return -1
    }

    
    //ELIMINAR ---------------------------------------------------------------------------------->
    private eliminarElemento(arreglo:any, valor:any){
        return arreglo.filter( function( e:any ) {
            return e !== valor;
        } );
    }

    eliminarHijo(valor:any){
        this.hijos = this.eliminarElemento(this.hijos, valor)
    }

    eliminarValor(valor:any){
        this.valores = this.eliminarElemento(this.valores, valor)
    }

    //VERIFICACIONES ----------------------------------------------------------------------------->
    estaLleno(){
        if(this.valores.length >= this.grado)
            return true
        return false
    }


    contiene(valor:any){
        for(let n of this.valores){
            if(valor == n){
                return true
            }
        }
        return false
    }
    

    buscarPos(valor:any){
        let i = 0
        while(valor >= this.valores[i]){
            if(i > this.valores.length)
                break
            i++
        }
        return i
    }

    minValores(){
        if(this.valores.length >= Math.round(this.grado-1)/2){
            return true
        }
        return false
    }

}

class ArbolBplus{

    public raiz:any
    private grado:number

    constructor(grado:number){
        this.raiz = null
        this.grado = grado
    }

    actualizar(valor:any, nuevo:any){
        this.eliminar(valor)
        this.insertar(nuevo)
    }

    //INSERCIÓN ----------------------------------------------------------------------------------->

    insertar(valor:any){
        this.raiz= this.insertarNodo(valor, this.raiz)
    }

    obtener(valor: any) {
		let searchNode = null
		if (this.raiz !== null) {
			const stack = [this.raiz]
			while (stack.length > 0) {
				const node = stack.shift()
				if (node.valores.map((value:any) => value.toString()).includes(valor)) {
					searchNode = node
				} else {
					node.hijos.forEach((hijo:any) => stack.push(hijo))
				}
			}
		}

		return searchNode
	}


    toArray() {
		if (this.raiz !== null) {
			let stack = [this.raiz]
			let stackCopy = [...this.raiz.valores]

			while (stack.length > 0) {
				const node = stack.shift()
				if(node.valores)  stackCopy = [...stackCopy, ...node.valores]
                if(node.hijos) stack = [...stack, ...node.hijos]
			}

			return stackCopy
		} else return []
	}

    private insertarNodo(valor:any, raiz:any){
        if(raiz == null){
            raiz = new NodoBplus(this.grado, true)
            raiz.agregarValor(valor)
        }else{
            if(raiz.esHoja){
                raiz.agregarValor(valor)
            }else{
                let i = raiz.buscarHijo(valor)
                raiz.hijos[i] = this.insertarNodo(valor, raiz.hijos[i])
            }

            if(raiz.estaLleno()){
                raiz = this.separar(raiz)
            }
        }
        return raiz
    }

    separar(raiz:any){
        //Crear un nuevo nodo
        let nodo = new NodoBplus(this.grado, false)
        if(raiz.esHoja){
            nodo.esHoja = true
        }

        //Valor que va al padre
        let m = raiz.valores.slice(raiz.valores.length/2, raiz.valores.length/2+1)

        //Nodo de la Derecha
        if(raiz.esHoja){
            nodo.valores = raiz.valores.slice(raiz.valores.length/2, raiz.valores.length)
        }else{
            nodo.valores = raiz.valores.slice(raiz.valores.length/2+1, raiz.valores.length)
            nodo.hijos = raiz.hijos.slice(raiz.hijos.length/2+1, raiz.hijos.length)
        }
    
        //Actualizar el padre si el nodo derecho obtiene hijos
        for(let n in nodo.hijos){
            nodo.hijos[n].padre = nodo
        }

        //Nodo de la izquierda
        raiz.valores = raiz.valores.slice(0, raiz.valores.length/2)
        raiz.hijos = raiz.hijos.slice(0, raiz.hijos.length/2+1)

        if(raiz.padre == null){
            //Si la raiz no tiene padre entonces se crea
            let padre = new NodoBplus(this.grado, false)
            //Ingresar valor al padre y luego los hijos
            padre.agregarValor(m[0])
            padre.agregarHijo(raiz, raiz.valores[raiz.valores.length-1])
            padre.agregarHijo(nodo, nodo.valores[nodo.valores.length-1])

            raiz.padre = nodo.padre = padre
            if(raiz.esHoja)
                raiz.siguiente = nodo
            //retorna el padre como la raiz
            return padre

        }else{
            //Si tiene padre entonces se actualiza
            raiz.padre.agregarValor(m[0])
            nodo.padre = raiz.padre
            raiz.padre.agregarHijo(nodo, nodo.valores[nodo.valores.length-1])
            if(raiz.esHoja)
                raiz.siguiente = nodo
        }

        return raiz
    }


    actualizarSig(raiz:any){
        for(let i in raiz.padre.hijos){
            raiz.padre.hijos[i].siguiente = raiz.padre.hijos[i+1]
        }
        return raiz
    }

    //ELIMINACIÓN ---------------------------------------------------------------------------------->

    eliminar(valor:any){
        if(this.raiz != null){
            this.raiz = this.delete(valor, this.raiz, -1, false)
        }

        if(this.raiz.valores.length == 0){
            this.raiz.padre = null
            this.raiz = this.raiz.hijos[0]
        }
    }

    delete(valor:any, raiz:NodoBplus, pos:number, repetido:boolean){
        if(raiz != null){
            if(raiz.esHoja){
                if(raiz.contiene(valor)){
                    raiz = this.deleteEnHoja(valor, raiz, pos, repetido)
                }
            }else{
                let i = raiz.buscarHijo(valor)
                if(raiz.contiene(valor)){
                    repetido = true
                }
                raiz.hijos[i] = this.delete(valor, raiz.hijos[i], i, repetido)
            }
        }

        if(!raiz.minValores() && pos != -1){
            raiz = this.merge(raiz, pos)
        }
        
        return raiz
    }

    deleteEnHoja(valor:any, raiz:NodoBplus, pos:number, repetido:boolean){
        raiz.eliminarValor(valor)
        if(repetido){
            raiz.padre = this.deleteRepetido(valor, raiz.valores[0], raiz.padre)
        }

        if(!raiz.minValores()&& pos != -1){
            raiz = this.prestarHoja(raiz, pos)
        }


        return raiz
    }

    //Borra el valor si esta en la Rama
    deleteRepetido(valor:any, nuevo:any, raiz:NodoBplus){
        if(raiz.contiene(valor)){
            raiz.eliminarValor(valor)
            raiz.agregarValor(nuevo)
            return raiz
        }else{
            raiz.padre = this.deleteRepetido(valor,nuevo, raiz.padre)
        }
        return raiz
    }

    prestarHoja(raiz:NodoBplus, pos:number){
        if(pos != -1){
            let lado = this.getLadoPrestamo(raiz, pos-1, pos+1)

            if(lado != -1){

                if(lado < pos){
                    
                    raiz = this.prestarIzquierdo(raiz, lado)
                }else{
                    raiz = this.prestarDerecho(raiz, lado)
                }

            }else{
                raiz = this.merge(raiz, pos)
            }
        }
        return raiz
    }

    prestarIzquierdo(raiz:any ,izq:number){
        raiz.padre.agregarValor(raiz.padre.hijos[izq].valores[raiz.padre.hijos[izq].valores.length-1])
        raiz.padre.eliminarValor(raiz.valores[0])
        raiz.agregarValor(raiz.padre.hijos[izq].valores.pop())
        return raiz
    }

    private prestarDerecho(raiz:any, der:number){
        raiz.agregarValor(raiz.padre.hijos[der].valores[0])
        raiz.padre.eliminarValor(raiz.padre.hijos[der].valores.shift()) 
        raiz.padre.agregarValor(raiz.padre.hijos[der].valores[0])  
        return raiz
    }


    getLadoPrestamo(raiz:NodoBplus, izq:number, der:number){
        if(izq > -1){
            if(raiz.padre.hijos[izq].valores.length > (this.grado-1)/2){
                return izq
            }
        }
        

        if(der < raiz.padre.hijos.length){
            if(raiz.padre.hijos[der].valores.length > (this.grado-1)/2){
                return der
            }
        }

        return -1
    }

    private merge(raiz:any, pos:number){
        if(pos == 0){
            raiz = this.mergeDerecho(raiz, pos)
        }else{
            raiz = this.mergeIzquierdo(raiz, pos)
        }
        return raiz
    }

    private mergeIzquierdo(raiz:any, pos:number){
        //Obtener valores para juntar
        let valores = raiz.padre.hijos[pos-1].valores
        if(!raiz.esHoja)
            valores = valores.concat(raiz.padre.valores[pos-1])
        //Obtener hijos del izquierdo
        let hijos = raiz.padre.hijos[pos-1].hijos
        //Eliminar hermano izquierdo
        raiz.padre.eliminarHijo(raiz.padre.hijos[pos-1])
        raiz.padre.eliminarValor(raiz.padre.valores[pos-1])
        //Agregar Valores
        for(let n of valores){
            raiz.agregarValor(n)
        }
        //Agregar los hijos al nodo
        for(let n of hijos){
            n.padre = raiz
            raiz.agregarHijo(n, n.valores[n.valores.length-1])
        }
        this.actualizarSig(raiz)
        return raiz
    }

    private mergeDerecho(raiz:any, pos:number){
        //Obtener valores para juntar
        let valores = raiz.padre.hijos[pos+1].valores
        if(!raiz.esHoja)
            valores = valores.concat(raiz.padre.valores[pos+1])
        //Obtener hijos del derecho
        let hijos = raiz.padre.hijos[pos+1].hijos
        //Eliminar el hermano derecho
        raiz.padre.eliminarHijo(raiz.padre.hijos[pos+1])
        raiz.padre.eliminarValor(raiz.padre.valores[pos])
        //Agregar valores al actual
        for(let n of valores){
            raiz.agregarValor(n)
        }
        //Agreagr los hijos al nodo
        for(let n of hijos){
            n.padre = raiz
            raiz.agregarHijo(n, n.valores[n.valores.length-1])
        }
        this.actualizarSig(raiz)
        return raiz
    }

    //METODOS DE PRUEBA ---------------------------------------------------------------------------->
    print(){
        if(this.raiz!=null){
            this.printNodo(this.raiz, 0)
        }
    }

    printNodo(raiz:any, valor:number){
        if(raiz != null){
            console.log()
            if(raiz.padre != null){
                console.log('Padre: '+ raiz.padre.valores)
            }
            console.log(raiz.valores)
            if(raiz.siguiente != null){
                console.log('Siguiente: '+raiz.siguiente.valores)
            }else{
                console.log('Siguiente: '+'null')
            }

            for (let i in raiz.hijos){
                this.printNodo(raiz.hijos[i], valor+1)
            }
        }
    }


}
