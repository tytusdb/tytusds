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

    recorrerCodigos(){
        let temporal = this.primero;
        let arreglo = []
        while(temporal != null){
            let dato = []
            dato.push(temporal.valor)
            dato.push(temporal.codigo)
            arreglo.push(dato)
            temporal = temporal.siguiente;
        }

        return arreglo
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
        
        this.dato = null;
        this.ecriptado = null;
    }

    cargar(texto){
        let info = texto
        this.texto = texto;
        this.dato = texto;
        this.lista = new Lista();
        this.listaOrdenada = new Lista();// la raiz 
        this.listaCodigos = new Lista();
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


    generaCodificado(){
        let textoCodi = "";
        let info = this.texto;
        for(let i = 0; i< info.length; i++){
            let codigo = this.listaCodigos.buscarValor(info.charAt(i));
            textoCodi += codigo
        }
        this.textoCodificado = textoCodi;
        this.ecriptado = this.textoCodificado;
    }

    reasignarValores(){
        this.ordenar();
        this.crearArbol();
        this.listaOrdenada.imprimir();
        this.crearCodigos()       
    }

    ordenar() {
            // Crea una nueva lista Ordenando las frecuencias de menor a mayor
            let temporal = this.lista.primero;
            while(temporal != null){ 
                let nodo = new Nodo()
                nodo.valor = temporal.valor;
                nodo.frecuencia = temporal.frecuencia;
                this.listaOrdenada.agregarOrdenadoFrecuencia(nodo)
                temporal = temporal.siguiente;
            }        
        }

    crearArbol(){
        // fusionar nodos hasta que la lista sea un solo arbol
        let temporal = this.listaOrdenada.primero
        while(this.listaOrdenada.primero.siguiente != null){
            let nodoiz = this.listaOrdenada.eliminarInicio();
            let nododer = this.listaOrdenada.eliminarInicio();
            // El nodo padre es el nodo a reinsertar en la lista con sus hojas izq y der
            let nodoPadre = new Nodo();
            nodoPadre.frecuencia = (nodoiz.frecuencia + nododer.frecuencia)

            let hijoIzq = new Nodo();
            hijoIzq.valor = nodoiz.valor;
            hijoIzq.frecuencia = nodoiz.frecuencia;
            hijoIzq.derecha = nodoiz.derecha;
            hijoIzq.izquierda = nodoiz.izquierda;

            let hijoDer = new Nodo();
            hijoDer.valor = nododer.valor;
            hijoDer.frecuencia = nododer.frecuencia;
            hijoDer.derecha = nododer.derecha;
            hijoDer.izquierda = nododer.izquierda; 

            nodoPadre.derecha = hijoDer;
            nodoPadre.izquierda = hijoIzq;

            this.listaOrdenada.agregarOrdenadoFrecuencia(nodoPadre);
        }
    }    

    crearCodigos(){
        let codigo = ""
        this.RecorrerYCrear(this.listaOrdenada.primero, codigo)
        this.listaCodigos.imprimirCodigos();

    }
    RecorrerYCrear(rama, codigo){
        
        if(rama.valor != null){
            let nodo = new Nodo();
            nodo.valor = rama.valor
            nodo.codigo = codigo;
            this.listaCodigos.agregarFinalValor(nodo);
        }
        if(rama.izquierda != null){
            this.RecorrerYCrear(rama.izquierda, codigo + "0");
        }
        if(rama.derecha != null){
            this.RecorrerYCrear(rama.derecha,codigo + "1");

        }
        
    }
 

    graficarencabezados(){
        let arregloencabeazados = []
        arregloencabeazados.push("Letra")
        arregloencabeazados.push("Codigo")
        return arregloencabeazados
    }

    graficardatos(){
        let arregloDatos = this.listaCodigos.recorrerCodigos()
        return arregloDatos
    }

    guardar(){
        return this.ecriptado;
    }


} 

export default AlgoritmoHuffman;