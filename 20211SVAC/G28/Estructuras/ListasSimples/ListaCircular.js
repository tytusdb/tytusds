const Nodo = require("./Nodo");
const datos = require("./datos");

class ListaCircular {
    constructor(){
        this.primero = null;
    }

    agregar_final(datos, repetidos){
        if(this.buscar(datos.dato1)==true && repetidos==false){
            console.log("YA EXISTE EL ELEMENTO EN LA LISTA")
            //SINO SE PERMITEN REPETIDOS, AQUI HAY QUE MOSTRAR ERROR
        }else{
        const auxiliar = new Nodo(datos);
        if (this.primero == null){
            this.primero = auxiliar;
            this.primero.siguiente = this.primero;
        } else {
            var actual = this.primero;
            while(actual.siguiente != this.primero){
                actual = actual.siguiente;
            }
            actual.siguiente = auxiliar;
            auxiliar.siguiente = this.primero;
        }
    }
    }

    agregar_inicio(datos, repetidos){
        if(this.buscar(datos.dato1)==true && repetidos==false){
            console.log("YA EXISTE EL ELEMENTO EN LA LISTA")
            //SINO SE PERMITEN REPETIDOS, AQUI HAY QUE MOSTRAR ERROR
        }else{
        const auxiliar = new Nodo(datos);
        if (this.primero == null){
            this.primero = auxiliar;
            this.primero.siguiente = this.primero;
        } else {
            var actual = this.primero;
            while(actual.siguiente != this.primero){
                actual = actual.siguiente;
            }
            actual.siguiente = auxiliar;
            auxiliar.siguiente = this.primero;
            this.primero = auxiliar;
            //al agregar al inicio, la cabeza es el nuevo nodo
            // y la anterior cabeza es el 2do elemento
        }
    }
    }

    eliminar(dato){
        if(this.buscar(dato)){ //si el dato a buscar esta en la lista
            var continuar = true;
            if(this.primero.datos.dato1 == dato){
                continuar = false;
                if(this.primero.siguiente == this.primero){
                this.primero.siguiente = null;
                this.primero = null;
                }else{
                    var verificador = this.primero;
                    while(verificador.siguiente != this.primero){
                        verificador = verificador.siguiente;
                    }
                    verificador.siguiente = this.primero.siguiente;
                    this.primero = verificador.siguiente;
                }
            }   
            var actual = this.primero;
            while(actual.siguiente != this.primero && continuar == true){
                if(actual.siguiente.datos.dato1 == dato){
                    actual.siguiente = actual.siguiente.siguiente;
                    continuar = false;
                    break;
                }
                actual = actual.siguiente;
            }
        }else{
            console.log("No se encontro ese valor en la lista");
            //elemento no encontrado para eliminarlo
        }
    }

    buscar(dato){
        if(this.primero != null){
            var verificador = this.primero;
            while(verificador.siguiente != this.primero){
                if (verificador.datos.dato1 == dato){
                    return true;
                }
                verificador = verificador.siguiente;
            }
            if (verificador.datos.dato1 == dato){
                return true;
            }
        }
        return false;
    }

    actualizar(antiguo, nuevo, repetidos){
        if(this.buscar(antiguo)){
            if(this.buscar(nuevo)==true && repetidos == false){
                console.log("No se permiten datos repetidos");
                console.log("el nuevo valor ya existe en la lista");
            }else{
            var actual = this.primero;
            var continuar = true;
            while(continuar==true){
                if (actual.datos.dato1 == antiguo){
                    var nuevos = new datos(nuevo,null);
                    actual.datos = nuevos;
                    continuar = false;
                    break;
                    //actualizar solo el primero que coincida
                }
                actual = actual.siguiente;
            }
        }
        }else{
            console.log("No se encontro ese valor en la lista");
            //elemento no encontrado para eliminarlo
        }
    }

    imprimir(){
        console.log("LISTA CIRCULAR SIMPLEMENTE ENLAZADA: ")
        if(this.primero == null){
            console.log("lista vacia");
        }else{
            var actual = this.primero;
            var info = "";
            while(actual.siguiente != this.primero){
                info = actual.datos.dato1;
                console.log(info);
                actual = actual.siguiente;
            }
            info = actual.datos.dato1;
            console.log(info);
        }
    }
}

module.exports = ListaCircular;