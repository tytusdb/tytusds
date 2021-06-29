/* import { v4 as uuidv4 } from 'uuid';
import { Cola } from '../EstructurasLineales/Cola'; */

class Nodo {
    constructor (dato){
        this.hash = null,
        this.dato = dato,
        this.siguiente = null
        //this.id = uuidv4();
    }
} 

class TablaHashAbierta {
    constructor (tamaño) {
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
        let posicionTabla = this.tabla[this.funcion_Hash(dato, this.funcion)]
        if(posicionTabla === -1){
            this.tabla[posicionTabla] =  new Cola()
            this.tabla[posicionTabla].Agregar(dato)
        }else{
            
            this.tabla[posicionTabla].Agregar(dato)
        }

        this.datosAgregados++;

        this.rehashing();
        
    }

    rehashing(){
        if((this.datosAgregados*100/this.tamaño) >= this.maximo){
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
    

    imprimir(){
        for (let index = 0; index < this.tabla.length; index++) {
            console.log(index)
            if(this.tabla[index] !== -1){
                console.log(this.tabla[index].Imprimir())
            }        
        
        
        }
    }

    actualizar(datoanterior, datonuevo){
        for (let index = 0; index < this.tabla.length; index++) {
            if(this.tabla[index] !== -1){
                console.log(this.tabla[index].eliminar(datoanterior))
            }
            
        }
        this.agregar(datonuevo,this.funcion)
    }

    eliminar(dato){
        for (let index = 0; index < this.tabla.length; index++) {
            if(this.tabla[index] !== -1){
                console.log(this.tabla[index].eliminar(dato))
            }
            
        }
    }

    cargar(arr, funcion){
        arr.map(e => {
            this.Agregar(e, funcion)
        })
    }
}