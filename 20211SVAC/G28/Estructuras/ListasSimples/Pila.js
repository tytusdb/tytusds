
const datos = require("./datos");
class Pila {
    constructor(){
        this.primero = null;
    }

    agregar(datos, repetidos){ //push
        //agrega al final de la lista
        //pero el primero es el que se mueve
        //y ese se retorna despues
        if(this.buscar(datos.dato1)==true && repetidos==false){
            console.log("YA EXISTE EL ELEMENTO EN LA LISTA")
            //SINO SE PERMITEN REPETIDOS, AQUI HAY QUE MOSTRAR ERROR
        }else{
        const auxiliar = new Nodo(datos);
        if (this.primero == null){
            this.primero = auxiliar;
        } else {
            auxiliar.siguiente = this.primero;
            this.primero = auxiliar;
        }
    }
    }

    eliminar(){ //pop
        //retorna y elimina el ultimo de la lista
        //aunque sea el primero segun el puntero
        if (this.primero == null){
            console.log("PILA VACIA")
            return null;
        } else {
            var retorno = this.primero;
            this.primero = this.primero.siguiente;
            return retorno.datos;
        }
    }

    buscar(dato){
        if(this.primero != null){
            var verificador = this.primero;
            while(verificador != null){
                if (verificador.datos.dato1 == dato){
                    return true;
                }
                verificador = verificador.siguiente
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
            while(true){
                if (actual.datos.dato1 == antiguo){

                    var nuevos = new datos(nuevo,null);
                    actual.datos = nuevos;

                    actual.datos.dato1 = nuevo;
                    break;
                    //actualizar solo el primero que coincida
                }
                actual = actual.siguiente;
            }
        }
        }else{
            console.log("No se encontro ese valor en la lista");
            //elemento no encontrado para actualizarse
        }
    }

    imprimir(){
        if(this.primero != null){
            var info = "";
            for(let verificador = this.primero; verificador != null; verificador = verificador.siguiente){
                info = verificador.datos.dato1;
                console.log(info);
            }
        }else{
            console.log("LISTA VACIA");
        }
    }
}

module.exports = Pila;