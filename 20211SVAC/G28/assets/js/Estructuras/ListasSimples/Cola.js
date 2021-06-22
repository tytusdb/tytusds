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

class Cola {
    constructor(){
        this.primero = null;
    }

    agregar(datos, repetidos){ //encolar
        //agregar al final de la lista
        if(this.buscar(datos.dato1)==true && repetidos==false){
            console.log("YA EXISTE EL ELEMENTO EN LA LISTA")
            //SINO SE PERMITEN REPETIDOS, AQUI HAY QUE MOSTRAR ERROR
        }else{
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

    eliminar(){ //desencolar
        var retorno = this.primero;
        if (this.primero == null){
            console.log("Cola vacía");
            return null;
        }else{
        if (this.primero.siguiente != null){
                this.primero = retorno.siguiente;
            }else{
                this.primero = null;
            }
            return retorno.datos.dato1;
        }
    }

    buscar(dato){
        if(this.primero != null){
            for(let verificador = this.primero; verificador != null; verificador = verificador.siguiente){
                if (verificador.datos.dato1 == dato){
                    return true;
                }
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
            while(actual != null){
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

var JCOLA = new Cola();
console.log("COLA VACIA CREADA");

function COLAadd(){
    var aux = document.getElementById("COLAagregar").value;
    var cond = document.getElementById("COLArepetidos").checked;
    var temp = new datos(aux, null);
    JCOLA.agregar(temp, cond);
    document.getElementById("COLAagregar").value="";
    JCOLA.imprimir();
    console.log("##########------###########");
}

function COLAdelete(){
    console.log("elemento eliminado: "+JCOLA.eliminar());
    JCOLA.imprimir();
    console.log("##########------###########");
}

function COLAsearch(){
    var aux = document.getElementById("COLAbuscar").value;
    console.log("ENCONTRADO: "+JCOLA.buscar(aux));
    document.getElementById("COLAbuscar").value="";
}

function COLAactualizar(){
    var previo = document.getElementById("COLAantiguo").value;
    var now = document.getElementById("COLAnuevo").value;
    var cond = document.getElementById("COLArepetidos").checked
    JCOLA.actualizar(previo, now, cond);
    document.getElementById("COLAantiguo").value="";
    document.getElementById("COLAnuevo").value="";
    JCOLA.imprimir();
    console.log("##########------###########");
}
