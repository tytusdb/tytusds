class Nodo{
    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
    }
}

class Lista_Circular_Simple{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }

    insertar(dato){
        let nuevo = new Nodo(dato);
        if(this.primero == null){
            this.primero = nuevo;
            this.primero.siguiente = this.primero;
            this.ultimo = this.primero;
        }else{
            this.ultimo.siguiente = nuevo;
            nuevo.siguiente = this.primero;
            this.ultimo = nuevo;
        }
        this.size++;
    }

    print(){
        let actual = this.primero;
        if(actual != null){
            do{
                console.log("Dato: ", actual.dato);
                actual = actual.siguiente;
            }while(actual != this.primero);
        }
        console.log("El tamaño de la Lista circular simple es: ", this.size)
    }

    buscar(dato){
        let actual = this.primero;
        let encontrado = false;

        if(actual != null){
            do{
                if(actual.dato == dato){
                    console.log("Si se encontro el dato: ", dato);
                    encontrado = true;
                }
                actual = actual.siguiente;
            }while(actual != this.primero && encontrado != true);
            if(!encontrado){
                console.log("No se encontro el Dato");
            }
        }
    }

    actualizar(dato_viejo, dato_nuevo){
        let actual = this.primero;
        let encontrado = false;

        if(actual != null){
            do{
                if(actual.dato == dato_viejo){
                    console.log("Si se encontro el dato: ", dato_viejo);
                    encontrado = true;
                    actual.dato = dato_nuevo;
                    console.log("Se actualizo el dato con exito");
                }
                actual = actual.siguiente;
            }while(actual != this.primero && encontrado != true);
            if(!encontrado){
                console.log("No se encontro el Dato");
            }
        }
    }

    eliminar(dato){
        let actual = this.primero;
        let anterior = null;
        let encontrado = false;

        if(actual != null){
            do{
                if(actual.dato == dato){
                    if(actual == this.primero){
                        this.primero = this.primero.siguiente;
                        this.ultimo.siguiente = this.primero;
                        this.size--;
                    }else if(actual == this.ultimo){
                        anterior.siguiente = this.primero;
                        this.ultimo = anterior;
                        this.size--;
                    }else{
                        anterior.siguiente = actual.siguiente;
                        this.size--;
                    }
                    console.log("Nodo eliminado con exito");
                    encontrado = true;
                }
                anterior = actual;
                actual = actual.siguiente;
            }while(actual != this.primero && encontrado != true);
            if(!encontrado){
                console.log("No se encontro el Dato");
            }
        }        
    }
}

module.exports = Lista_Circular_Simple;