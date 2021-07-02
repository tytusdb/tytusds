class Nodo{
    constructor(){
        this.valor = null;
        this.codigo = null;
        this.frecuencia = 0;
        this.izquierda = null;
        this.derecha = null;
        this.siguiente = null;

    }
}

class Lista{
    constructor(){
        this.primero = null;   
        this.contador = 0;    
    }  


    agregarFinalValor(nodo) {
        //crear un nodo para agregar a la lista
        nodo.frecuencia ++;        
        if (this.primero == null) {
            this.primero = nodo;
        }
        else {
            // Busca el final del arreglo e ingresa el nodo ahi
            let temporal = this.primero;
            let repetido = false;
            while (temporal.siguiente != null) {
                if(temporal.valor == nodo.valor){
                    temporal.frecuencia ++;
                    repetido = true;
                    break;
                }
                temporal = temporal.siguiente;
            }  
            if(repetido == false && temporal.valor == nodo.valor){
                temporal.frecuencia ++;                
            }else if(repetido == false){
                temporal.siguiente = nodo;
            }          
            
        }
    }

    agregarOrdenadoFrecuencia(nodo){
        
        if(this.primero == null){
            this.primero = nodo;
        }else{
            let temporal = this.primero;
            
            while(temporal.siguiente != null ){
                if(temporal.frecuencia <= nodo.frecuencia && temporal.siguiente.frecuencia >= nodo.frecuencia){
                    nodo.siguiente = temporal.siguiente;
                    temporal.siguiente = nodo;   
                    break;                 
                }    
                if(temporal == this.primero && temporal.frecuencia >= nodo.frecuencia){
                    nodo.siguiente = this.primero;
                    this.primero = nodo;
                    break;
                    
                }                           
                temporal = temporal.siguiente;

            }if(temporal.siguiente == null && temporal.frecuencia <= nodo.frecuencia){
                temporal.siguiente = nodo; 
            
            }else if(temporal.siguiente == null && temporal.frecuencia >= nodo.frecuencia && temporal == this.primero){
                nodo.siguiente = this.primero;
                this.primero = nodo;
            }  
        }
    }


} 