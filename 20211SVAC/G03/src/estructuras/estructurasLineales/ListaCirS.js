//Forma de insercion: Desordenada
//Eliminacion Unica de primer dato encontrado
//Busqueda de primer metodo encontrado
var fs = require('fs');
const { ListaSimple } = require('./ListaSimple');
class Nodo{ //Clase Nodo
    //Constructor
    constructor(dato){
        this.siguiente = null;
        this.dato = dato;
    }

}

class ListaCS{ //Clase Lista Circular Simple
    constructor(){
        this.cabeza = null;
        this.cola = null;
        this.size = 0;
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


    agregarInicio(dato){
        let nodo = new Nodo(dato);
        if(this.cabeza == null){
            this.cabeza = nodo;
            this.cola = nodo;
            this.size++
            return
        }else if(this.cabeza != null  && this.cola != null){
            this.cabeza.anterior = nodo;
            nodo.siguiente = this.cabeza
            nodo.anterior = this.cola
            this.cola.siguiente = nodo
            this.cabeza = nodo
            this.size++
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
                    tmp.anterior = nodo
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

    //Metodo Insertar
    agregarFinal(dato){
        let nodo = new Nodo(dato);
        //Insercion de primer nodo
        if(this.cabeza == null){
            this.cabeza = nodo;
            this.cola = nodo;
            this.size++;
        }else if(this.cabeza != null){ // Insercion de nodo No Cabeza
            let aux = this.cabeza;
            while(aux != this.cola){
                aux = aux.siguiente;
            }
            aux.siguiente = nodo;
            nodo.siguiente = this.cabeza;
            this.cola = nodo;
            this.size++;
        }
    }

    //Metodo Imprimir
    print(){
        let aux = this.cabeza;
        while (aux != this.cola){
            console.log(aux.dato);
            aux = aux.siguiente
        }
        if(aux == this.cola){
            console.log(aux.dato);
        }
    }

    //Metodo buscar
    buscar(dato){
        let aux = this.cabeza;
        let contador = 1;
        let tmp = aux.siguiente
        while(tmp.dato != dato && contador != this.size){
            aux= aux.siguiente;
            tmp= tmp.siguiente;
            contador++;
        }
        if(tmp.dato == dato){
            //Dato encontrado
            console.log(tmp.dato + " fue hayado con exito");
        }
        if (contador == this.size){
            //Dato no encontrado
            console.log("No se encontro el dato buscado");
        }
    }

    //Metodo Eliminar
    eliminar(dato){
        let aux = this.cabeza;
        let contador = 1;
        let tmp = aux.siguiente
        while(tmp.dato != dato && contador != this.size){
            aux= aux.siguiente;
            tmp= tmp.siguiente;
            contador++;
        }
        if(tmp.dato == dato){
            //Dato Eliminado
            aux.siguiente = tmp.siguiente;
            tmp.siguiente = null;
            console.log(tmp.dato + " fue eliminado con exito");
        }
        if (contador == this.size){
            //Dato no encontrado
            console.log("No se encontro el dato a eliminar");
        }
    }

    //Metodo Actualizar
    actualizar(datoelim, datoinse){
        let aux = this.cabeza;
        let contador = 1;
        let tmp = aux.siguiente
        while(tmp.dato != datoelim && contador != this.size){
            aux= aux.siguiente;
            tmp= tmp.siguiente;
            contador++;
        }
        if(tmp.dato == datoelim){
            //Dato encontrado
            console.log(tmp.dato + " fue hayado con exito");
            tmp.dato = datoinse
            console.log(datoelim + " fue editado con exito a " + tmp.dato);
        }
        if (contador == this.size){
            //Dato no encontrado
            console.log("No se encontro el dato buscado");
        }
    }

    //Metodo Cargar
    cargar(arreglo,accion) {
        arreglo.map(elemento => {
            this.agregar(elemento,accion)
        })
    }

    //Metodo Guardar
    guardar() {
        let archivojs = [];
        let temporal = this.cabeza;
        archivojs.push(temporal.dato)
        temporal = temporal.siguiente
        while (temporal != this.cabeza && temporal != null){
            archivojs.push(temporal.dato)
            temporal = temporal.siguiente
        }
        
        return archivojs
    }

   

    Recorrido(datoBuscar){
        let aux = this.cabeza;
        let contador = 0;

        let arreglo = []
        let contadoraux = 0;

        while(contador != this.size){

            let dato = {id: contadoraux, label: aux.dato.toString(),}
            arreglo[contadoraux] = dato
            
            if(aux.dato == datoBuscar){
                let dato = {id: contadoraux, label: aux.dato.toString(),  color: "lime"}
                arreglo[contadoraux] = dato
            }


            aux= aux.siguiente;
            contador++;
            contadoraux++;
        }

        return arreglo
    }
}


//module.exports.ListaCS = ListaCS;
export default ListaCS;