class PalabraLZW{
    clave:number
    valor:string
    constructor(clave:number, valor:string){
        this.clave = clave
        this.valor = valor
    }
}


class LZW{
    private diccionario:string[]
    W:string[]
    K:string[]
    WK:string[]
    Salida:string[]
    Agregar:string[]

    constructor(){
        this.diccionario = []
        this.W = []
        this.K = []
        this.WK = []
        this.Salida = []
        this.Agregar = []
    }

    comprimir(cadena:string){
        let w = ''
        let k = ''
        for (let i = 0; i < cadena.length; i++) {
            k = cadena.charAt(i)
            this.W.push(w)
            this.K.push(k)
            this.WK.push(w+k)
            if(this.enDiccionario(w+k) != -1){
                w = w+k
                this.Agregar.push('')
                this.Salida.push(' ')
            }else{
                this.diccionario.push(w+k)
                let s = this.enDiccionario(w)
                this.Agregar.push(w+k+' '+s)
                this.Salida.push(s.toString())
                w = k
            }
        }
        this.W.push(w)
        this.K.push('')
        this.WK.push('')
        this.Agregar.push('')
        this.Salida.push(this.enDiccionario(w).toString())
    }

    ingresarCaracteres(cadena:string){
        for (let i = 0; i < cadena.length; i++) {
            if(this.enDiccionario(cadena.charAt(i)) == -1)
                this.diccionario.push(cadena.charAt(i))
        }
    }

    enDiccionario(char:string){
        for (let i = 0; i < this.diccionario.length; i++) {
            if(char == this.diccionario[i]){
                return i
            }
        }
        return -1
    }

    print(){
        console.log('COMPRESIÓN LZW')
        console.log('------------------------------------------------')
        console.log('W\tK\tWK\tAgregar\t\tSalida')
        console.log('------------------------------------------------')
        for (let i = 0; i < this.W.length; i++) {
            console.log(this.W[i]+'\t'+this.K[i]+'\t'+this.WK[i]+'\t'+this.Agregar[i]+'\t\t'+this.Salida[i])
        }
    }

}
