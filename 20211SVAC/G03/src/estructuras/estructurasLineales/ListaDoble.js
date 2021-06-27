class Nodo {
    constructor(valor) {        
        this.valor = valor;
        this.siguiente = null;
        this.anterior = null;
    }
}


class ListaDoble {
    constructor() {
        //inicializar atributos
        this.primero = null;
        this.ultimo = null;

    }

    agregar(elemento, accion){        
        switch(accion){
            case "Ordenado":
                this.agregarOrdenado(elemento);
                break;
            case "Final":
                this.agregarFinal(elemento);
                break;
            case "Inicio":
                this.agregarInicio(elemento);
                break;   
        }
    }


    agregarInicio(elemento){
        let nodo = new Nodo(elemento);
        let temporal = this.primero;
        if(this.primero == null){
            this.primero = nodo;
        }else{
            nodo.siguiente =this.primero;
            this.primero.anterior = nodo;
            this.primero = nodo;
        }

    }

    agregarOrdenado(elemento){
        let nodo = new Nodo(elemento)
        if(this.primero == null){
            this.primero = nodo;
        }else{
            let temporal = this.primero;

            while(temporal.siguiente != null ){
                if(temporal.valor <= elemento && temporal.siguiente.valor >= elemento){
                    nodo.siguiente = temporal.siguiente;
                    temporal.siguiente.anterior = nodo;
                    nodo.anterior = temporal;
                    temporal.siguiente = nodo;   
                    break;                 
                }else if(temporal == this.primero && temporal.valor >= elemento){
                    nodo.siguiente = this.primero;
                    this.primero.anterior = nodo;
                    this.primero = nodo;
                    break;
                }                                
                temporal = temporal.siguiente;

            }if(temporal.siguiente == null && temporal.valor <= elemento){
                temporal.siguiente = nodo;
                nodo.anterior = temporal; 
            }
        }

    }
    agregarFinal(elemento){        
        var temporal = this.primero;
        let nodo = new Nodo(elemento);
        if(this.primero == null){            
            this.primero = nodo;
        }else {
            
            while(temporal.siguiente != null) {
                temporal = temporal.siguiente;                
            }            
            temporal.siguiente = nodo;
            nodo.anterior = temporal;
        }
    }


    eliminar(elemento){
        if (this.primero == null) {
            console.log("No hay nada en las lista")
        }
        else {
            let temporal = this.primero;
            while (temporal != null) {
                if (temporal.valor == elemento) {
                    temporal = temporal.siguiente;
                }
                else {
                    if (temporal.siguiente != null) {
                        if (temporal.siguiente.valor == elemento) {
                            let siguienteT = temporal.siguiente;
                            temporal.siguiente = siguienteT.siguiente;
                            temporal.siguiente.anterior = temporal;
                            siguienteT.siguiente = null;
                            return;

                        }
                    }
                }
                temporal = temporal.siguiente;
            }
        }
    }

    actualizar(reemplazo,valor){
        if (this.primero == null) {
            console.log("No hay nada en las lista")
        }
        else {
            let temporal = this.primero;
            while (temporal != null) {
                if (temporal.valor == valor) {
                    temporal.valor = reemplazo;
                }
                temporal = temporal.siguiente;
            }
        }
    }


    buscar(valor){
        if (this.primero == null  ) {
            console.log("no hay elementos en la lista");          
        }
        else {
            let temporal = this.primero;
            while(temporal != null){ 
                if(temporal.valor == valor){
                    return temporal;  
                }
                temporal = temporal.siguiente;
            }
        }
    }

    cargar(arreglo) {
        
        arreglo.map(elemento => {
            this.agregar(elemento);
        });
    }

    guardar() {
        let archivojs= [];
        let temporal = this.primero;
        while (temporal != null){
            archivojs.push(temporal.valor);
            temporal = temporal.siguiente;
            
        }
        return archivojs;
        
    }

    imprimir(){
        let temporal = this.primero;
        while(temporal != null){
            console.log(temporal.valor + "Aqui")
            temporal = temporal.siguiente;
        }
    }

    Recorrido(datoBuscar){
        let temporal = this.primero;
        let arreglo = [];
        let contador = 0;
        while(temporal != null){ 
            let dato = {id: contador, label: temporal.valor.toString(),}
            arreglo[contador] = dato
            
            if(temporal.valor == datoBuscar){
                let dato = {id: contador, label: temporal.valor.toString(),  color: "lime"}
                arreglo[contador] = dato
            }
            temporal = temporal.siguiente;
            contador++;
        }

        return arreglo

    }


}
//module.exports.ListaDoble = ListaDoble;
export default ListaDoble;
