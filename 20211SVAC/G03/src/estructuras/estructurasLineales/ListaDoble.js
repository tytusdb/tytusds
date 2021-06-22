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

    //Metodo Insertar
    agregarInicio(dato){
        let nodo = new Nodo(dato);
        //Insertcion de primer nodo 
        if(this.cabeza == null){
            this.cabeza = nodo;
            this.cola = nodo;
            this.size++;
            return
        }else if(this.cabeza != null && this.cola != null){
            //Insercion de Nodos no primeros
            this.cabeza.anterior = nodo;
            nodo.siguiente = this.cabeza;
            nodo.anterior = this.cola;
            this.cola.siguiente = nodo
            this.cabeza = nodo;
            this.size++;
            return
        }
    }

    //Metodo Insertar
    agregarOrdenado(dato){
        let nodo = new Nodo(dato)
        let aux = this.cabeza
        if(this.cabeza == null){
            this.cabeza = nodo;
            this.cola = nodo;
            this.size++;
            return
        }
        if(dato < this.cabeza.dato){
            //Insercion de Nodos no primeros
            this.cabeza.anterior = nodo;
            nodo.siguiente = this.cabeza;
            nodo.anterior = this.cola;
            this.cola.siguiente = nodo
            this.cabeza = nodo;
            this.size++;
            return
        }else if(dato >= this.cabeza.dato && dato <= this.cola.dato){
            while(aux != this.cola){
                if(dato >= aux.dato && dato <= aux.siguiente.dato){
                    let tmp = aux.siguiente
                    tmp.anterior = aux
                    aux.siguiente = nodo
                    nodo.siguiente = tmp
                    nodo.anterior = aux
                    this.size++;
                    return
                }
                aux = aux.siguiente
            }
        }else if(dato > this.cola.dato){
            //Insercion de Nodos no primeros
            let aux = this.cola;
            aux.siguiente = nodo;
            nodo.anterior = aux;
            nodo.siguiente = this.cabeza;
            this.cabeza.anterior = nodo;
            this.cola = nodo;
            this.size++;
            return
        }
        
    }

    agregarFinal(dato){        
        let nodo = new Nodo(dato);
        //Insertcion de primer nodo 
        if(this.cabeza == null){
            this.cabeza = nodo;
            this.cola = nodo;
            this.size++;
            return
        }else if(this.cabeza != null && this.cola != null){
            //Insercion de Nodos no primeros
            let aux = this.cola;
            aux.siguiente = nodo;
            nodo.anterior = aux;
            nodo.siguiente = this.cabeza;
            this.cabeza.anterior = nodo;
            this.cola = nodo;
            this.size++;
            return
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

    cargar(arreglo,acccion) {
        
        arreglo.map(elemento => {
            this.agregar(elemento,acccion);
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
