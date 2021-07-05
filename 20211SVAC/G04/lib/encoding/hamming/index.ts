class FilaHamming{
    valores:any

    constructor(longitud:number){
        this.valores = []
        for (let i = 0; i < longitud; i++) {
            this.valores.push(' ') 
        }
    }

}


class Hamming{
    numBits:number
    numParidad:number
    tabla:any

    constructor(){
        this.numParidad = this.numBits = 0
        this.tabla = []
    }

    codificar(cadena:string){
        if(this.esBinario(cadena)){
            this.construirTabla(cadena)
            return this.tabla
        }
        return null
    }

    private construirTabla(cadena:string){
        //Obtener la cantidad total de bits
        this.numBits = this.cantidadBits(cadena)
        this.numParidad = this.cantidadParidad(this.numBits, cadena.length)
        //Ingresar las filas de la tabla
        for (let i = 0; i < this.numParidad+1; i++) {
            this.tabla.push(new FilaHamming(this.numBits))
        }
        //Verificar las poisicones de paridad
        for (let i = 0; i < this.numParidad; i++) {
            this.tabla[0].valores[this.potencia(2,i)-1] = 'p'
        }
        //Ingresar la cadena en primera fila
        let nbit = 0
        for(let i = 0; i < this.numBits; i++){
            if(this.tabla[0].valores[i] != 'p'){
                this.tabla[0].valores[i] = cadena.charAt(nbit)
                nbit++
            }else{
                this.tabla[0].valores[i] = ' '
            }
        }
        //Construye los bits de paridad
        for (let i = 0; i < this.numParidad; i++) {
            this.construirParidad(i)
        }
    }

    private construirParidad(numParidad:number){
        let n = this.potencia(2, numParidad)
        let contador = 0

        for(let i = n; i < this.numBits+1; i+=n*2){
            for (let j = 0; j < n; j++) {
                if(i+j-1 > this.numBits-1)
                    break;

                if(this.tabla[0].valores[i+j-1] == '1'){
                    contador++
                }

                this.tabla[numParidad+1].valores[i+j-1] = this.tabla[0].valores[i+j-1]
            }
        }
        this.tabla[numParidad+1].valores[n-1] = (contador%2).toString()
    }


    //CONTAR BITS ------------------------------------------------------------------------------>
    private cantidadBits(cadena:string){
        let cantidad = cadena.length 
        let numParidad = 1
        while(numParidad<=cantidad){
            cantidad++
            numParidad = numParidad*2
        }
        return cantidad
    }

    private cantidadParidad(total:number, cantidad:number){
        return total - cantidad
    }

    //VERIFICACIONES ---------------------------------------------------------------------------------->
    private potencia(base:number, exponente:number):any{
        if(exponente==0){
            return 1
        }
        return base * this.potencia(base, exponente-1)
    }

    private esBinario(cadena:string){
        for (let i = 0; i < cadena.length; i++) {
            if(!(cadena.charAt(i)=='1' || cadena.charAt(i)=='0')){
                return false
            }
        }
        return true
    }


}

