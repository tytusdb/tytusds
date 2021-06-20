var fs = require('fs')
class Nodo {
    constructor(valor) {
        this.id = null;
        this.valor = valor;
        this.siguiente = null;
        this.anterior = null;
    }
}


class ListaDoble {
    constructor() {
        //inicializar atributos
        this.contador = 0;
        this.contadorListas = 0;
        this.primero = null;
        this.ultimo = null;

    }
    
    agregar(elemento){
        this.contador ++;
        var temporal = this.primero;
        let nodo = new Nodo(elemento);
        if(this.primero == null){
            nodo.id = this.contador;
            this.primero = nodo;
        }else {
            
            while(temporal.siguiente != null) {
                temporal = temporal.siguiente;
                console.log(temporal)
            }
            nodo.id = this.contador;
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

    actualizar(id,valor){
        if (this.primero == null) {
            console.log("No hay nada en las lista")
        }
        else {
            let temporal = this.primero;
            while (temporal != null) {
                if (temporal.id == id) {
                    temporal.valor = valor;
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
        
        arreglo.array.forEach(elemento => {
            this.agregar(elemento);
        });
    }

    guardar(){
        let contadorListas
        contadorListas ++;
        let archivojs;
        let temporal = this.primero;
        while (temporal != null){
            archivojs[temporal.id] = temporal.valor;
            temporal = temporal.siguiente;
            
        }
        let json = JSON.stringify(archivojs)
        let nombre = "ListaSimple" + contadorListas;
        fs.writeFile(nombre, json)

    }


}

export default ListaDoble;
