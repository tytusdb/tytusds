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

    agregar(dato){
        let posicion =this.funcion_Hash(dato, this.funcion)
        let i = 1;
        while(this.tabla[posicion] !== -1 && posicion < this.tamaño){
            posicion = this.colisiones(dato, i, "DobleHash", this.funcion_Hash(dato, this.funcion))
            i++;
            
        }
        this.tabla[posicion] = dato;
        this.datosAgregados++;
        this.rehashing();
    }

     colisiones(dato, i, colision, h1){
        let retorno;
        switch(colision){
            case "Lineal":
                retorno = this.colisionLineal(dato, i)
                break;
            case "Cuadratica":
                retorno = this.colisionCuadratica(dato, i)
                break;
            case "DobleHash":
                retorno= this.colisionDobleHash(h1,dato, i)
                break;
            default:
                break;
        }
        return retorno
    }

    colisionLineal(dato,i){
        let prueba = ((dato+i) % this.tamaño)
        return prueba
    }

    colisionCuadratica(dato, i){
        let prueba = (dato +(i*i)) % this.tamaño
        return prueba
    }

    colisionDobleHash(h1,dato,i){
        let  h2 = 1 + (dato %(this.tamaño-1))
        let prueba = ((h1 + (i*h2)) % this.tamaño)

        return prueba
    }
}
