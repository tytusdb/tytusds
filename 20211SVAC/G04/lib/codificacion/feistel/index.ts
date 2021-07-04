class FilaFeistel{
    private bits:string[]
    private longitud:number

    constructor(bits:any[], longitud:number){
        this.bits = []
        this.bits = bits
        this.longitud = longitud
        
    }

    toString(){
        let string = ''
        for (let i = 0; i < this.bits.length; i++) {
            string = string + this.bits[i]
        }
        return string
    }

    stringFila(){
        let string = ''
        for (let i = this.bits.length; i < this.longitud; i++) {
            string = string+'\t'
        }
        for (let i = 0; i < this.bits.length; i++) {
            string = string + this.bits[i]+'\t'
        }
        return string
    }
}

class Feistel{
    private key:string[]
    tabla:any[]
    private iteraciones:number

    constructor(key:string, iteraciones:number){
        this.iteraciones = iteraciones
        this.key = key.split('')
        this.tabla = []
    }

    codificacionFeistel(cadena:string){
        if(this.esBinario(cadena)){
            this.mitad(cadena)
        }
    }

    private codificar(L:any[], R:any[], iteracion:number){
        let l = L.length + R.length
        this.tabla.push( new FilaFeistel(L.concat(R),l) )
        if(iteracion < this.iteraciones){
            let Fn = []
            let Rn = []
            for (let i = 0; i < R.length; i++) {
                Fn.push( this.xor(R[i], this.key[i]) )
            }

            for (let i = 0; i < L.length; i++) {
                Rn.push( this.xor(L[i], Fn[i]) )
            }

            this.tabla.push( new FilaFeistel(this.key, l) )
            this.tabla.push( new FilaFeistel(Fn, l) )
            this.tabla.push( new FilaFeistel(L, l) )
            this.moverAIzq()
            this.codificar(R, Rn, iteracion+1)
        }

    }


    private mitad (cadena:string){
        let L = []
        let R = []

        for (let i = 0; i < cadena.length; i++) {
            if(i<cadena.length/2){
                L.push(cadena.charAt(i))
            }else{
                R.push(cadena.charAt(i))
            }
        }
        if(L.length>R.length){
            L.unshift('0')
            R.unshift(L.pop())
        }
        while(this.key.length<R.length){
            this.key.unshift('0')
        }
        this.codificar(L,R,0)
    }
    
    private moverAIzq(){
        this.key.push(this.key[0].toString())
        this.key.shift()
    }



    private xor(a:string, b:string){
        if(a==b)
            return '0'
        return '1'
    }

    private esBinario(cadena:string){
        for (let i = 0; i < cadena.length; i++) {
            if(!(cadena.charAt(i)=='1' || cadena.charAt(i)=='0')){
                return false
            }
        }
        return true
    }

    getResultado(){
        let i = this.tabla.length - 1
        return this.tabla[i].toString()
    }

    print(){
        for(let n of this.tabla){
            console.log(n.stringFila())
        }
        console.log()
        console.log('Resultado: '+this.getResultado())
    }

}

