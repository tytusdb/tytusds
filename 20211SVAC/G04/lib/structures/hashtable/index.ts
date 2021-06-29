class Tupla{
    clave:number
    valor:any

    constructor(clave:number, valor:any){
        this.clave = clave
        this.valor = valor
    }

}

class FuncionHash{
    tipo:number//0:simple, 1:Division, 2:multiplicacion

    constructor(tipo:number){
        this.tipo = tipo
    }

    funcionHash(valor:any, tamaño:number){
        let clave = this.stringToAscii(valor)
        switch (this.tipo) {
            //Funcion Hash Simple
            case 0:
                return this.simple(clave, tamaño)
            //Funcion Hash por Division
            case 1:
                return this.division(clave, tamaño)
            //Funcion Hash por Multiplicacion
            case 2:
                return this.multiplicacion(clave, tamaño)
        }
        return -1
    }

    private simple(clave:number, tamaño:number){
        while(clave > 1){
            clave = clave / 10
        }
        return Math.round(clave*tamaño)
    }

    private division(clave:number, tamaño:number){
        return clave % tamaño
    }

    private multiplicacion(clave:number, tamaño:number){
        let A = (Math.sqrt(5)-1)/2
        return Math.round(tamaño * ((clave*A) % 1))
    }

    stringToAscii(valor:any): number{
        valor = valor.toString()
        let suma = 0
        for (let i = 0; i < valor.length; i++) {
            suma += valor.charCodeAt(i)  
        }
        return suma
    }

}

class NodoHashAbierto{
    clave:number
    valores:Tupla[]

    constructor(clave:number){
        this.clave = clave
        this.valores = []
    }

    eliminarTupla(valor:any){
        let tupla = this.buscarTupla(valor)
        if(tupla != null){
            this.valores = this.deleteFromArray(this.valores, tupla)
            return true
        }
        return false
    }

    private buscarTupla(valor:any){
        for(let i of this.valores){
            if(i.valor  == valor){
                return i
            }
        }
        return null
    }

    private deleteFromArray(arreglo:any, valor:any){
        return arreglo.filter( function( e:any ) {
            return e !== valor;
        } );
    }

}

class TablaHashAbierta{
    tamaño:number
    funcion:FuncionHash
    tabla:NodoHashAbierto[]

    constructor(tamaño:number, tipoFuncion:number){
        this.tamaño = tamaño
        this.funcion = new FuncionHash(tipoFuncion)
        this.tabla = []
        this.crearTabla()
    }

    crearTabla(){
        for (let i = 0; i < this.tamaño; i++) {
            this.tabla.push(new NodoHashAbierto(i))
        }
    }

    insertar(valor:any){
        //Obtiene la posicion del arreglo
        let clave = this.funcion.funcionHash(valor, this.tamaño)
        //Le da al arreglo un valor
        if(this.tabla[clave].clave == -1)
            this.tabla[clave].clave = clave
        //Ingresa el valor al arreglo
        this.tabla[clave].valores.unshift(new Tupla(this.funcion.stringToAscii(valor), valor))
    }

    eliminar(valor:any){
        let clave = this.funcion.funcionHash(valor, this.tamaño)
        this.tabla[clave].eliminarTupla(valor)
    }

    actualizar(valor:any){
        let clave = this.funcion.funcionHash(valor, this.tamaño)
        if(this.tabla[clave].eliminarTupla(valor)){
            this.insertar(valor)
        }
    }

    print(){
        for (let i = 0; i < this.tabla.length; i++) {
            console.log('Posicion: '+i + ' - Clave: '+this.tabla[i].clave)
            console.log(this.tabla[i].valores)
        }
    }


}
