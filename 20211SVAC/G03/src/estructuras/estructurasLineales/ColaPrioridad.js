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
}


export default ColaPrioridad;