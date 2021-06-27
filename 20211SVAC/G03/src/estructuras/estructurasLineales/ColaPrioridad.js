var fs = require('fs')
class Nodo {
    constructor(dato, prioridad){
        this.dato = dato
        this.prioridad = prioridad
        this.siguiente = null
    }
}

class ColaPrioridad {
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

    Agregar(dato,prioridad){
        let nuevoNodo = new Nodo(dato,prioridad)

        if(this.estaVacia()){
            this.primero = nuevoNodo
            this.ultimo = nuevoNodo
        }else{

            nuevoNodo.siguiente = this.primero
            this.primero = nuevoNodo
            // Ordenando cola segun la prioridad
            let temp,nodoActual,temp1
            nodoActual = this.primero
            let siguiente = nodoActual.siguiente
            while(nodoActual.siguiente != null){
            
                if(nodoActual.prioridad > siguiente.prioridad){
                    temp = nodoActual.dato
                    temp1 = nodoActual.prioridad
                    nodoActual.dato = siguiente.dato
                    nodoActual.prioridad = siguiente.prioridad
                    siguiente.dato = temp
                    siguiente.prioridad = temp1
        
                    nodoActual = nodoActual.siguiente
                    siguiente = siguiente.siguiente
                }else{
                    nodoActual = nodoActual.siguiente
                    siguiente = siguiente.siguiente
                }
            }
        }

        this.longitud++
    }
	
	 Pop(){
        let eliminado = this.ultimo
        if (this.primero == this.ultimo){
            this.primero = null
            this.ultimo = null
        }else{
            let nodoActual = this.primero
            while (nodoActual.siguiente != eliminado){
                nodoActual = nodoActual.siguiente
            }

            this.ultimo = nodoActual
            this.ultimo.siguiente = null
        }
        this.longitud--
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

        console.log(text)
    }

    actualizar(datoAnterior, datoNuevo){
        let nodoActual = this.primero

        while(nodoActual != null){
            if(nodoActual.dato == datoAnterior){
                nodoActual.dato = datoNuevo
            }

            nodoActual = nodoActual.siguiente
        }
    }

    buscar (dato){
        let datoEncontrado = null
        let nodoActual = this.primero

        while(nodoActual != null){
            if(nodoActual.dato == dato){
                datoEncontrado = "El dato se encontró: "+ nodoActual.dato
                return datoEncontrado
            }

            nodoActual = nodoActual.siguiente
        }
        datoEncontrado = "no se encontro el dato"
        return  datoEncontrado
    }
	
	eliminar(dato){
       let nodoActual = this.primero
        let nodoanterior = null

        if(nodoActual != null && nodoActual.dato == dato){
            this.primero = nodoActual.siguiente
            return
        }

        while(nodoActual != null && nodoActual.dato != dato){
            nodoanterior = nodoActual
            nodoActual = nodoActual.siguiente
        }

        if (nodoActual == null){
            return
        }

        nodoanterior.siguiente = nodoActual.siguiente;
    }
    
    cargar(arr){
        arr.map(e => {
            this.Agregar(e.valor,e.prioridad)
        })
    }

    guardar(){
        let arreglo = []
        let nodoActual = this.primero

        while (nodoActual != null){
            let colaP = {valor: nodoActual.dato, prioridad: nodoActual.prioridad}
            arreglo.push(colaP)
            if(nodoActual.siguiente != null){
                nodoActual = nodoActual.siguiente
            }else{
                nodoActual = null
            }
            
        }

        return arreglo
    }

	Recorrido(datoBuscar){
        let arreglo = []
        let nodoActual = this.primero
        let contador = 0

        while (nodoActual != null){
            let dato = {id: contador, label: nodoActual.dato.toString(),}
            arreglo[contador] = dato

            if(nodoActual.dato == datoBuscar){
                let dato = {id: contador, label: nodoActual.dato.toString(),  color: "lime"}
                arreglo[contador] = dato
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
}


export default ColaPrioridad;