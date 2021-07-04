 import { v4 as uuidv4 } from 'uuid';

class Nodo {
    constructor (dato){
        this.hash = null
        this.dato = dato
        this.siguiente = null
        this.id = uuidv4()
    }
} 

class TablaHashAbierta {
    constructor (tamaño,minimo,maximo,forma) {
        this.tabla = null
        this.tamaño = tamaño
        this.minimo = minimo
        this.maximo = maximo
        this.funcion = forma
        this.datosAgregados = 0
        this.iniciar()
    
    }

    iniciar(){
        
        this.datosAgregados = 0;
        let newTable = [this.tamaño]

        for (let index = 0; index < this.tamaño; index++) {
            newTable[index] = -1
            
        }

        this.tabla = newTable
    }

    funcion_Hash(dato, forma){
        let valorretorno;
        if(dato.charCodeAt){
            dato = this.getCharCodes(dato)
        }
        switch(forma){
            
            case "Simple":
                valorretorno = this.hashSimple(dato)
                break;
            case "Division":
                valorretorno =  this.division(dato)
                break;
            case "Multiplicacion":
                valorretorno =  this.multiplicacion(dato)
                break;
            default:
                break;

        }

        return valorretorno
    }

    hashSimple(valor){
        while(valor > 1){
            valor = valor/10
        }
        let hash = valor * this.tabla.length
        return Math.floor(hash)
    }

    division(valor){
        let hash = valor % this.tabla.length

        return hash
    }

    multiplicacion(valor){
        let hash = (this.tabla.length*(valor*0.2520 % 1))

        return Math.floor(hash)
    }

    getCharCodes(s){
        let charCodeArr = 0;
        
        for(let i = 0; i < s.length; i++){
            let code = s.charCodeAt(i);
            charCodeArr += code
        }
        
        return charCodeArr;
      }


    agregar(dato){
        dato = parseInt(dato)== NaN ? dato: parseInt(dato)
        let posicionTabla = this.tabla[this.funcion_Hash(dato, this.funcion)]
        let posicion = this.funcion_Hash(dato, this.funcion)
        console.log(posicion)
        if(posicionTabla === -1){
            this.tabla[this.funcion_Hash(dato, this.funcion)] =  new Cola()
            this.tabla[this.funcion_Hash(dato, this.funcion)].Agregar(dato)
            
            this.datosAgregados++;
        }else{
            this.tabla[this.funcion_Hash(dato, this.funcion)].Agregar(dato)
        }


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
                        let temp = copyarray[index].primero
                        while(temp != null){
                            this.agregar(temp.dato)
                            temp = temp.siguiente
                        }
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
        this.eliminar(datoanterior)
        this.agregar(datonuevo,this.funcion)
    }

    eliminar(dato){
        for (let index = 0; index < this.tabla.length; index++) {
            if(this.tabla[index] !== -1){
                if(this.tabla[index].eliminar(dato)){
                    if (this.tabla[index].primero == null){
                        this.tabla[index] = -1
                        console.log("es null -1")
                    }
                    break;
                }
            }
            
        }
    }

    cargar(arr){
        arr.map(e => {
            this.agregar(e)
        })
    }

    guardar(){
        let recorrido = []
        for (let index = 0; index < this.tabla.length; index++) {
            if(this.tabla[index] !== -1){
                recorrido = recorrido.concat(
                    this.tabla[index].guardar())
            }
        }

        return recorrido
    }

    graficar(valorBuscar){
        let recorrido = []
        for (let index = 0; index < this.tabla.length; index++) {
            let nodoArreglo = {
                id:index,
                type: 'input', // input node
                data: { label: index },
                position: { x: 100, y: 25 + index*75 },
                connectable: false, 
            }
            recorrido.push(nodoArreglo)
            if(this.tabla[index] !== -1){
                recorrido = recorrido.concat(
                    this.tabla[index].Recorrido(index,valorBuscar))
                
                let nodoege = {
                id: index+'-'+this.tabla[index].primero.id, source: index, target: this.tabla[index].primero.id
                }

                recorrido.push(nodoege)
            }
            
            
        
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


class Cola {
    constructor(){
        this.primero = null
        this.ultimo = null
        this.longitud = 0 
    }
	
	estaVacia() {
        if (this.primero == null){
            return true
        }

        return false
    }

    Agregar(dato){
        let nuevoNodo = new Nodo(dato)

        if(this.estaVacia()){
            this.primero = nuevoNodo
            this.ultimo = nuevoNodo
        }else{
            nuevoNodo.siguiente = this.primero
            this.primero = nuevoNodo
        }

        this.longitud++
    }
	
	Imprimir(){
        let text = ""
        let nodoActual = this.primero

        while (nodoActual != null){
            text += nodoActual.dato + "->"
            if(nodoActual.siguiente != null){
                nodoActual = nodoActual.siguiente
            }else{
                nodoActual = null
            }
            
        }
        text += "null"

        return text
    }

	eliminar(dato){
       let nodoActual = this.primero
        let nodoanterior = null
        let valor = false;

        if(nodoActual != null && nodoActual.dato == dato){
            this.primero = nodoActual.siguiente
            return true
        }

        while(nodoActual != null && nodoActual.dato != dato){
            nodoanterior = nodoActual
            nodoActual = nodoActual.siguiente
            valor = true
        }

        if (nodoActual == null){
            return false
        }
        nodoanterior.siguiente = nodoActual.siguiente;
        if(valor){
            return true
        }
        return false
    }
	
	
    guardar(){
        let arreglo = []
        let nodoActual = this.primero

        while (nodoActual != null){
            arreglo.push(nodoActual.dato)
            if(nodoActual.siguiente != null){
                nodoActual = nodoActual.siguiente
            }else{
                nodoActual = null
            }
            
        }

        return arreglo
    }
	
	Recorrido(cordenada,datoBuscar){
        let arreglo = []
        let nodoActual = this.primero
        let contador = 0

        while (nodoActual != null){
            let nodoArreglo = {
                id: nodoActual.id,
                type: 'default',
                targetPosition: 'left',
                sourcePosition: 'right',
                data: { label: nodoActual.dato },
                position: { x: 100 + (contador+1)*200, y: 25 +cordenada *75 },
                connectable: false, 
            }

            if(nodoActual.dato == datoBuscar){
                nodoArreglo = {
                    id: nodoActual.id,
                    type: 'special',
                    targetPosition: 'left',
                    sourcePosition: 'right',
                    data: { text: "----------"+nodoActual.dato+ "--------" },
                    position: { x: 100 + (contador+1)*200, y: 25 +cordenada *75 },
                    connectable: false, 
                }
            }

            arreglo.push(nodoArreglo)

            if(nodoActual.siguiente != null){
                let nodoArreglo = {
                    id: nodoActual.id+'-'+nodoActual.siguiente.id, source: nodoActual.id, target: nodoActual.siguiente.id  }
                    arreglo.push(nodoArreglo)
            }
            
            

            if(nodoActual.siguiente != null){
                nodoActual = nodoActual.siguiente
            }else{
                nodoActual = null
            }
            contador++
        }

        return arreglo
    }

    /* guardar(){
        let arreglo = []
        let nodoActual = this.primero
        let contador = 0

        while (nodoActual != null){
            arreglo.push(nodoActual.dato)          
            if(nodoActual.siguiente != null){
                nodoActual = nodoActual.siguiente
            }else{
                nodoActual = null
            }
            contador++
        }

        return arreglo
    } */
}
export default  TablaHashAbierta;