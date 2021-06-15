class Nodo{
    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
        this.atras = null;
    }
}

class Lista_Circular_Doble{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }

    insertar(dato){
        let nuevo = new Nodo(dato);
        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
            this.primero.siguiente = this.primero;
            this.primero.atras = this.ultimo;
            this.size++;
        }else{
            this.ultimo.siguiente = nuevo;
            nuevo.atras = this.ultimo;
            nuevo.siguiente = this.primero;
            this.ultimo = nuevo;
            this.primero.atras = this.ultimo;
            this.size++;
        }
    }

    print(){
        let actual = this.primero;
        if(actual != null){
            do{
                console.log("Dato: ", actual.dato);
                actual = actual.siguiente;
            }while(actual != this.primero);
        }
        console.log("El tamaño de la Lista circular Doble es: ", this.size);
    }

    print_alreves(){
        let actual = this.ultimo;
        if(actual != null){
            do{
                console.log("Dato: ", actual.dato);
                actual = actual.atras;
            }while(actual != this.ultimo);
        }
        console.log("El tamaño de la Lista circular Doble es: ", this.size);
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
                console.log("No se encontro el dato");
            }
        }
        else{
            console.log("La lista esta vacia");
        }
    }

    actualizar(dato_viejo, dato_nuevo){
        let actual = this.primero;
        let encontrado = false;
        if(actual != null){
            do{
                if(actual.dato == dato_viejo){
                    console.log("Si se encontro el dato: ", dato_viejo);
                    actual.dato = dato_nuevo;
                    encontrado = true;
                    console.log("Se actualizo el dato con exito");
                }
                actual = actual.siguiente;
            }while(actual != this.primero && encontrado != true);
            if(!encontrado){
                console.log("No se encontro el dato");
            }
        }
        else{
            console.log("La lista esta vacia");
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
                        this.primero.atras = this.ultimo;
                        this.ultimo.siguiente = this.primero;
                    }else if(actual == this.ultimo){
                        this.ultimo = anterior;
                        this.ultimo.siguiente = this.primero;
                        this.primero.atras = this.ultimo;
                    }else{
                        anterior.siguiente = actual.siguiente;
                        actual.siguiente.atras = anterior;
                    }
                    console.log("Nodo Eliminado con exito");
                    this.size--;
                    encontrado = true;
                }
                anterior = actual;
                actual = actual.siguiente;
            }while(actual != this.primero && encontrado != true);
            if(!encontrado){
                console.log("No se encontro el dato");
            }
        }
        else{
            console.log("La lista esta vacia");
        }
    }
}

module.exports = Lista_Circular_Doble;