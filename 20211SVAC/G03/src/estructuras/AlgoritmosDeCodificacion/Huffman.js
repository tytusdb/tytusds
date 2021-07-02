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

    imprimir(){
        
        let temporal = this.primero;
        while(temporal != null){
            console.log(temporal.valor +temporal.frecuencia)
            temporal = temporal.siguiente;
        }
    }

    imprimirCodigos(){
        
        let temporal = this.primero;
        while(temporal != null){
            console.log(temporal.valor + "Codigo" + temporal.codigo)
            temporal = temporal.siguiente;
        }
    }



    
    
    buscarValor(valor) {
        if (this.primero == null  ) {
            console.log("no hay elementos en la lista");           

        }
        else {
            let temporal = this.primero;
            while(temporal != null){ 
                if(temporal.valor == valor){
                    return temporal.codigo;  
                }
                temporal = temporal.siguiente;
            }
        }
    }

    eliminarFrecuencia(frecuencia) {
        if (this.primero == null) {
            console.log("No hay nada en las lista")
        }
        else {
            let temporal = this.primero;
            while (temporal != null) {
                if (temporal.frecuencia == frecuencia) {
                    temporal = temporal.siguiente;
                }
                else {
                    if (temporal.siguiente != null) {
                        if (temporal.siguiente.frecuencia == frecuencia ) {
                            let siguienteT = temporal.siguiente;
                            temporal.siguiente = siguienteT.siguiente;
                            siguienteT.siguiente = null;
                            return;
                        }
                    }
                }
                temporal = temporal.siguiente;
            }
        }
    }
    
    eliminarInicio(){
        let inicio = this.primero;
        this.primero = this.primero.siguiente
        return inicio;
    }

}




class AlgoritmoHuffman{
    constructor(){
        this.texto = null;
        this.lista = new Lista();
        this.listaOrdenada = new Lista();// la raiz 
        this.listaCodigos = new Lista();
        this.textoCodificado = null;
    }

    cargar(texto){
        let info = texto
        this.texto = texto;
        for(let i = 0; i < info.length; i++){
            let nodo = new Nodo()
            nodo.valor = info.charAt(i)
            this.lista.agregarFinalValor(nodo)            
        }
        //this.lista.imprimir();    
        this.reasignarValores();  
        this.generaCodificado();
        console.log(this.textoCodificado)
    }




} 