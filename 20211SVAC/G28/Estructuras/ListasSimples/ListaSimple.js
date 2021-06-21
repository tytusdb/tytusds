const Nodo = require("./Nodo");
const datos = require("./datos");

class ListaSimple {
    constructor(){
        this.primero = null;
    }

    agregar_final(datos, repetidos){
        //se envia un vector: {valor, prioridad = null}
        if(this.buscar(datos.dato1)==true && repetidos==false){
            console.log("YA EXISTE EL ELEMENTO EN LA LISTA")
            //SINO SE PERMITEN REPETIDOS, AQUI HAY QUE MOSTRAR ERROR
        }else{
            //SI ESTA PERMITIDO REPETIDOS O NO ENCUENTRA UN NODO
            //CON LAS DATOS QUE SE QUIEREN INGRESAR, PASA AAGREGAR
            // UN NODO CON EL NUEVO VALOR.
        const auxiliar = new Nodo(datos);
        if (this.primero == null){
            this.primero = auxiliar;
        } else {
            var actual = this.primero;
            while(actual.siguiente != null){
                actual = actual.siguiente;
            }
            actual.siguiente = auxiliar;
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
        } else {
            auxiliar.siguiente = this.primero;
            this.primero = auxiliar;
        }
      }
    }

    eliminar(dato){
        if(this.buscar(dato)){
            //si se encontro el valor en la lisa, se elimina
            if(this.primero.datos.dato1 == dato){
                this.primero = this.primero.siguiente;
            }else{
                var actual = this.primero;
                while(actual.siguiente != null){
                    if(actual.siguiente.datos.dato1 == dato){
                        actual.siguiente = actual.siguiente.siguiente;
                        break;
                    }
                    actual = actual.siguiente;
                }
            }
        }else{
            console.log("No se encontro ese valor en la lista");
            //elemento no encontrado para eliminarlo
        }
    }

    buscar(dato){
        if(this.primero != null){
            var verificador = this.primero;
            while(verificador != null){
                if (verificador.datos.dato1 == dato){
                    return true;
                }
                verificador = verificador.siguiente;
            }
        }
        return false;
    }

    actualizar(antiguo, nuevo, repetidos){
        if(this.buscar(antiguo)){
            //falta poner la condicion de analizar si
            //el nuevo valor ya esta, para ver si
            //se permite el ingreso de repetidos
            if(this.buscar(nuevo)==true && repetidos == false){
                console.log("No se permiten datos repetidos");
                console.log("el nuevo valor ya existe en la lista");
            }else{
            var actual = this.primero;
            while(actual != null){
                if (actual.datos.dato1 == antiguo){
                    var nuevos = new datos(nuevo,null);
                    actual.datos = nuevos;
                    console.log("AQUI DEBO SALIRME PORQUE YA LO CAMBIE");
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

module.exports = ListaSimple;