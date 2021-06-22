class Nodo {
    constructor(datos = null){
        this.datos = datos;
        this.siguiente = null;
   }
}

class datos {
    constructor(dato1, prioridad){
        this.dato1 = dato1; //dato
        this.prioridad = prioridad; //prioridad para cola de prioridad
    }
}

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
            return retorno.datos.dato1;
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

var JPILA = new Pila();
console.log("PILA VACIA CREADA");

function PILAadd(){
    var aux = document.getElementById("PILAagregar").value;
    var cond = document.getElementById("PILArepetidos").checked;
    var temp = new datos(aux, null);
    JPILA.agregar(temp, cond);
    document.getElementById("PILAagregar").value="";
    JPILA.imprimir();
    console.log("##########------###########");
}

function PILAdelete(){
    console.log("elemento eliminado: "+JPILA.eliminar());
}

function PILAsearch(){
    var aux = document.getElementById("PILAbuscar").value;
    console.log("ENCONTRADO: "+JPILA.buscar(aux));
    document.getElementById("PILAbuscar").value="";
}

function PILAactualizar(){
    var previo = document.getElementById("PILAantiguo").value;
    var now = document.getElementById("PILAnuevo").value;
    var cond = document.getElementById("PILArepetidos").checked
    JPILA.actualizar(previo, now, cond);
    document.getElementById("PILAantiguo").value="";
    document.getElementById("PILAnuevo").value="";
}


