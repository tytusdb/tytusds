class Nodo{
    constructor(dato){
        this.siguiente = null;
        this.anterior = null;
        this.dato = dato;
    }

    getDato(){
        return dato;
    }

    setDato(dato){
        this.dato = dato;
    }
}

class ListaCS{
    constructor(){
        this.cabeza = null;
        this.cola = null;
        this.size = 0;
    }

    insert(dato){
        let nodo = new Nodo(dato);
        if(this.cabeza == null){
            this.cabeza = nodo;
            this.cola = nodo;
            this.size++;
        }else if(this.cabeza != null){
            let aux = this.cabeza;
            while(aux != this.cola){
                aux = aux.siguiente;
            }
            aux.siguiente = nodo;
            nodo.anterior = aux;
            nodo.siguiente = this.cabeza;
            this.cabeza.anterior = nodo;
            this.cola = nodo;
            this.size++;
        }
    }

    print(){
        let aux = this.cabeza;
        console.log("Entro a print")
        while (aux != this.cola){
            console.log(aux.dato);
            aux = aux.siguiente
        }
        if(aux == this.cola){
            console.log(aux.dato);
        }
    }
}