class Nodo {
    constructor(valor){
        this.valor = valor
        this.hash = null

    }
}

class TablaHashCerrada {
    constructor(tamaño, minimo, maximo,forma){
        
        
        this.tabla = null,
        this.tamaño = tamaño,
        this.minimo = minimo,
        this.maximo = maximo,
        this.funcion = forma
        this.datosAgregados = 0
        this.iniciar();
    }

    iniciar(){
        let newTable = new Array(this.tamaño)

        for (let index = 0; index < this.tamaño; index++) {
            newTable[index] = -1
            
        }

        this.tabla = newTable
    }

    funcion_Hash(dato, forma){
        let valorretorno;
        switch(forma){
            
            case "Hash Simple":
                valorretorno = this.hashSimple(dato)
                break;
            case "Metodo Division":
                valorretorno =  this.division(dato)
                break;
            case "Metodo Multiplicación":
                valorretorno =  this.multiplicacion(dato)
                break;
            default:
                break;

        }

        return valorretorno
    }

    hashSimple(valor){
        let hash = valor * this.tabla.length
    }

    division(valor){
        let hash = valor % this.tabla.length

        return hash
    }

    multiplicacion(valor){
        let hash = (this.tabla.length(valor*0.2520 % 1))

        return hash
    }
}
