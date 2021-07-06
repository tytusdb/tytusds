class NodoB{
    public valores:any
    public padre:any
    public hijos:any
    public grado:number
    public esHoja:boolean

    constructor(grado:number, esHoja:boolean){
        this.grado = grado
        this.valores = []
        this.hijos = []
        this.padre = null
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
                this.hijos.splice(0,0,hijo) 
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

    //ELIMINACIÓN ----------------------------------------------------------------------->
    eliminarValor(valor:any){
        this.valores = this.eliminarElemento(this.valores, valor)
    }

    private eliminarElemento(arreglo:any, valor:any){
        return arreglo.filter( function( e:any ) {
            return e !== valor;
        } );
    }

    eliminarHijo(valor:any){
        this.hijos = this.eliminarElemento(this.hijos, valor)
    }

    //Si el nodo contiene un valor
    contiene(valor:any){
        for(let n of this.valores){
            if(valor == n){
                return true
            }
        }
        return false
    }

    //Si el nodo superó el límite de valores permitidos
    estaLleno(){
        if(this.valores.length >= this.grado)
            return true
        return false
    }

    //Si el nodo contiene el minimo de valores permitidos
    minValores(){
        if(this.valores.length >= Math.round(this.grado-1)/2){
            return true
        }
        return false
    }

    //Busca lo posicion
    buscarPos(valor:any){
        let i = 0
        while(valor > this.valores[i]){
            if(i > this.valores.length)
                break
            i++
        }
        return i
    }

}


class ArbolB{

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
            raiz = new NodoB(this.grado, true)
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

    //REAJUSTE DE ARBOL --------------------------------------------------------------------------->
    private separar(raiz:any){
        //Crear Hermano
        let nodo = new NodoB(this.grado, false)
        if(raiz.esHoja){
            nodo.esHoja = true
        }

        //Valor que va al padre
        let m = raiz.valores.slice(raiz.valores.length/2, raiz.valores.length/2+1)

        //Nodo de la Derecha
        nodo.valores = raiz.valores.slice(raiz.valores.length/2+1, raiz.valores.length)
        nodo.hijos = raiz.hijos.slice(raiz.hijos.length/2, raiz.hijos.length)

        //Actualizar el padre si el nodo derecho obtiene hijos
        for(let n in nodo.hijos){
            nodo.hijos[n].padre = nodo
        }

        //Nodo de la izquierda
        raiz.valores = raiz.valores.slice(0, raiz.valores.length/2)
        raiz.hijos = raiz.hijos.slice(0, raiz.hijos.length/2)

        if(raiz.padre == null){
            //Si la raiz no tiene padre entonces se crea
            let padre = new NodoB(this.grado, false)
            //Ingresar valor al padre y luego los hijos
            padre.agregarValor(m[0])
            padre.agregarHijo(raiz, raiz.valores[raiz.valores.length-1])
            padre.agregarHijo(nodo, nodo.valores[nodo.valores.length-1])

            raiz.padre = nodo.padre = padre
            //retorna el padre como la raiz
            return padre

        }else{
            //Si tiene padre entonces se actualiza
            raiz.padre.agregarValor(m[0])
            nodo.padre = raiz.padre
            raiz.padre.agregarHijo(nodo, nodo.valores[nodo.valores.length-1])
        }

        return raiz
    }

    //ELIMINACIÓN --------------------------------------------------------------------------------->

    eliminar(valor:any){
        if(this.raiz != null){
            this.raiz = this.delete(valor, this.raiz, -1)
        }
        if(this.raiz.valores.length == 0){
            this.raiz.padre = null
            this.raiz = this.raiz.hijos[0]
        }
    }

    private delete(valor:any, raiz:any, pos:number){
        if(raiz.contiene(valor)){
            if(raiz.esHoja){
                raiz = this.deleteEnHoja(valor, raiz, pos)
            }else if(!raiz.esHoja){
                raiz = this.deleteEnRama(valor, raiz)
            }
        }else{
            if(!raiz.esHoja){
                let i = raiz.buscarHijo(valor)
                raiz.hijos[i] = this.delete(valor, raiz.hijos[i], i)
            }
        }
        

        if(!raiz.minValores() && pos != -1){
            raiz = this.merge(raiz, pos)
        }

        return raiz
    }

    private deleteEnRama(valor:any, raiz:any){
        //Elimina el valor en la rama
        raiz.eliminarValor(valor)
        //Obtiene el valor del mayor valor del lado izquierdo
        let val = this.prestarRama(raiz.hijos[0])
        raiz.agregarValor(val)
        //Borrar el valor que el hijo presto del mismo hijo
        raiz.hijos[0] = this.delete(val, raiz.hijos[0], 0)
        return raiz
    }

    private prestarRama(raiz:any): any{
        if(raiz.esHoja){
            return raiz.valores[raiz.valores.length-1]
        }
        return this.prestarRama(raiz.hijos[raiz.valores.length])
    }

    private deleteEnHoja(valor:any, raiz:any, pos:number){
        raiz.eliminarValor(valor)
        if(!raiz.minValores() && pos != -1){
            raiz = this.prestarHoja(raiz, pos)
        }
        return raiz
    }

    private prestarHoja(raiz:any, pos:number){
        if(pos != -1){
            let lado = this.getLadoPrestamo(raiz, pos-1,pos+1)
            if(lado != -1){
                if(lado < pos){
                    raiz = this.prestarIzquierdo(raiz, lado)
                }else{
                    raiz = this.prestarDerecho(raiz, pos, lado)
                }
            }else{
                raiz = this.merge(raiz, pos)
            }
        }
        return raiz
    }

    //Presta un valor al hermano izquierdo
    private prestarIzquierdo(raiz:any, izq:number){
        raiz.agregarValor(raiz.padre.valores[izq])
        raiz.padre.eliminarValor(raiz.padre.valores[izq])
        raiz.padre.agregarValor(raiz.padre.hijos[izq].valores.pop())
        return raiz
    }

    //Presta un valor al hermano derecho
    private prestarDerecho(raiz:any, pos:number, der:number){
        raiz.agregarValor(raiz.padre.valores[pos]) 
        raiz.padre.eliminarValor(raiz.padre.valores[pos]) 
        raiz.padre.agregarValor(raiz.padre.hijos[der].valores.shift()) 
        return raiz
    }

    //Obtiene el hermano que puede prestar
    private getLadoPrestamo(raiz:any, izq:number, der:number){
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
        return raiz
    }  

    private mergeDerecho(raiz:any, pos:number){
        //Obtener valores para juntar
        let valores = raiz.padre.hijos[pos+1].valores
        valores = valores.concat(raiz.padre.valores[pos])
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
        return raiz
    }

    //METODOS DE PRUEBA ---------------------------------------------------------------------------->
    print(){
        if(this.raiz!=null){
            this.printNodo(this.raiz)
        }
    }

    printNodo(raiz:any){
        if(raiz != null){
            console.log()
            if(raiz.padre != null){
                console.log('Padre: '+ raiz.padre.valores)
            }
            console.log(raiz.valores)

            for (let i in raiz.hijos){
                this.printNodo(raiz.hijos[i])
            }
        }
    }

}
