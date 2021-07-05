class NodoHuffman{
    valor:string
    peso:number
    izquierdo:any
    derecho:any

    constructor(valor:string, peso:number){
        this.valor = valor
        this.peso = peso
        this.izquierdo = null
        this.derecho = null
    }

    actualizarPeso(){
        this.peso = this.pesoNodo(this.izquierdo)+this.pesoNodo(this.derecho)
        this.valor = this.izquierdo.valor + this.derecho.valor
    }

    private pesoNodo(nodo:NodoHuffman):number{
        if(nodo == null){
            return 0
        }else{
            return nodo.peso
        }
    }
}

class ParejaHuffman{
    peso:number
    valor:string
    binario:string

    constructor(valor:string, binario:string, peso:number){
        this.valor = valor
        this.binario = binario
        this.peso = peso
    }
}


class Huffman{
    private pesos:NodoHuffman[]
    private raiz:any
    codificacion:ParejaHuffman[]
    

    constructor(){
        this.pesos = []
        this.raiz = null
        this.codificacion = []
    }

    private crearArbol(cadena:string){
        this.contarCaracteres(cadena)
        while(this.pesos.length>1){
            let nuevo = new NodoHuffman('', 0)
            nuevo.izquierdo = this.pesos.shift()
            nuevo.derecho = this.pesos.shift()
            nuevo.actualizarPeso()
            this.pesos.push(nuevo)
            this.pesos = this.ordenar(this.pesos)
        }
        this.raiz = this.pesos[0]
    }

    codificar(cadena:string){
        this.crearArbol(cadena)
        this.buscar('', this.raiz, cadena)
        this.codificacion = this.ordenar(this.codificacion)
    }

    private buscar(binaria:string, raiz:NodoHuffman, cadena:string){
        if(raiz != null){
            this.buscar(binaria+'0', raiz.izquierdo, cadena)
            if(raiz.valor.length == 1){
                this.codificacion.push(new ParejaHuffman(raiz.valor + ' - ' + raiz.peso+'/'+cadena.length, binaria, raiz.peso))
            }
            this.buscar(binaria+'1', raiz.derecho, cadena)
        }
    }

    private contarCaracteres(cadena:string){
        for (let i = 0; i < cadena.length; i++) {
            this.contarCaracter(cadena.charAt(i))
        }
        this.pesos = this.ordenar(this.pesos)
    }

    //CONTEO --------------------------------------------------------------->
    private contarCaracter(char:string){
        let pos = this.buscarCaracter(char)
        if(pos == -1){
            this.pesos.push(new NodoHuffman(char,1))
        }else{
            this.pesos[pos].peso++
        }
    }

    private buscarCaracter(caracter:string){
        for (let i = 0; i < this.pesos.length; i++) {
            if(this.pesos[i].valor == caracter){
                return i
            }        
        }
        return -1
    }

    //ORDENAR --------------------------------------------------------------->
    private ordenar(arreglo:any[]){
        for (let i = 1; i < arreglo.length; i++) {
            for (let j = 0; j < arreglo.length-i; j++) {
                if(arreglo[j].peso > arreglo[j+1].peso){
                    let aux = arreglo[j]
                    arreglo[j] = arreglo[j+1]
                    arreglo[j+1] = aux
                }
            }
        }
        return arreglo
    }

    print(){
        for (let i = 0; i < this.codificacion.length; i++) {
            console.log('Valor: '+this.codificacion[i].valor + ' - Codigo: '+this.codificacion[i].binario)
            
        }
    }

}

