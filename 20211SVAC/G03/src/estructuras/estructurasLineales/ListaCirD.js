//Insertcion no ordenada
//Busqueda unica
//Eliminacion unica

class Nodo{ //Clase Nodo
    
    //Constructor
    constructor(dato){
        this.siguiente = null;
        this.anterior = null;
        this.dato = dato;
    }

    //Setters & Getters
    getDato(){
        return dato;
    }

    setDato(dato){
        this.dato = dato;
    }
}

class ListaCD{  //Clase Lista Circular doble

    //Constructor
    constructor(){
        this.cabeza = null;
        this.cola = null;
        this.size = 0;
    }

    //Metodo Insertar
    insert(dato){
        let nodo = new Nodo(dato);
        //Insertcion de primer nodo 
        if(this.cabeza == null){
            this.cabeza = nodo;
            this.cola = nodo;
            this.size++;
        }else if(this.cabeza != null){
            //Insercion de Nodos no primeros
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

    //Metodo Imprimir
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

    //Metodo Buscar
    buscar(dato){
        let aux = this.cabeza;
        let contador = 1;
        while(aux.dato != dato && contador != this.size){
            aux= aux.siguiente;
            contador++;
        }
        if(aux.dato == dato){
            //Dato encontrado
            console.log(aux.dato + " fue encontrado exitosamente");
        }
        if (contador == this.size){
            //Dato no encontrado
            console.log("No se encontro el dato buscado");
        }
    }
}