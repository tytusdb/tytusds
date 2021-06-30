class Nodo {
    constructor(valor){
        this.valor = valor
        this.hash = null

    }
}

class TablaHashCerrada {
    constructor(tamaño, minimo, maximo,forma){
        
        
        this.tabla = null
        this.tamaño = tamaño
        this.minimo = minimo
        this.maximo = maximo
        this.funcion = forma
        this.datosAgregados = 0
        this.iniciar();
    }

    iniciar(){
        
        this.datosAgregados = 0
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
            posicion = this.colisiones(dato, i, "Lineal", this.funcion_Hash(dato, this.funcion))
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

    imprimir(){
        for (let index = 0; index < this.tabla.length; index++) {
            console.log(index, this.tabla[index])
        
        
        }
    }

    rehashing(){
        if(((this.datosAgregados*100)/this.tamaño) >= this.maximo){
            let copyarray = this.tabla

            let tamañoAnterior = this.tamaño

            this.tamaño = (this.datosAgregados*100/this.minimo);

            this.iniciar()

            for (let index = 0; index < tamañoAnterior; index++) {
                if(copyarray[index] != -1){
                        this.agregar(copyarray[index])
                }
                
            }
        }

    }

    actualizar(datoAnterior, datoNuevo){
        this.eliminar(datoAnterior)
        this.agregar(datoNuevo)
    }

    eliminar(dato){
        let contador = 0;
        for (let index = 0; index < this.tabla.length; index++) {
            if(this.tabla[index] == dato){
                this.tabla[index] = -1
                contador++;
            }

            if(contador == 1){
                break;
            }
        }
    }

    cargar(arr){
        arr.map(e => {
            this.agregar(e)
        })
    }

    graficar(valorBuscar){
        let recorrido = []
        for (let index = 0; index < this.tabla.length; index++) {
            let nodoArreglo = {
                id: index,
                type: 'special',
                targetPosition: 'left',
                sourcePosition: 'right',
                data: { nodo: this.tabla[index] !== -1 ? this.tabla[index]: "-----", text:  index  },
                position: {  x: 100, y: 25 + index*75  },
                connectable: false, 
            }
            recorrido.push(nodoArreglo)
        }

        for (let index = 0; index < this.tamaño-1; index++) {
            let varnew = {
                id: index+'-'+(index+1), source: index, target: index+1
            }
            recorrido.push(varnew)
        }

        return recorrido
    }
}

export default TablaHashCerrada;