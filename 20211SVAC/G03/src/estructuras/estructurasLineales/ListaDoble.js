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





}