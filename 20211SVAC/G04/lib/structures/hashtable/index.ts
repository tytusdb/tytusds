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

