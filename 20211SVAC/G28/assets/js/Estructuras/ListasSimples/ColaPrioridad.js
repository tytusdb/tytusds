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

class ColaPrioridad {
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
            if(this.primero.siguiente == null){
                //si solo hay 1 elemento
                if(this.primero.datos.prioridad > datos.prioridad){
                    this.primero.siguiente = auxiliar;
                }else{
                    auxiliar.siguiente = this.primero;
                    this.primero = auxiliar;
                }
            }else{
                if (this.primero.datos.prioridad < auxiliar.datos.prioridad ){
                    auxiliar.siguiente = this.primero;
                    this.primero = auxiliar;
                }else{
                    var actual = this.primero;
                    while(actual.siguiente.datos.prioridad >= auxiliar.datos.prioridad){
                        actual = actual.siguiente;
                        if (actual.siguiente == null){
                            break;
                        }
                    }
                    //aquí el siguiente es una prioridad menor al auxiliar
                    auxiliar.siguiente = actual.siguiente;
                    actual.siguiente = auxiliar;
                }
            }
        }
      }
    }

    eliminar(){ //desencolar
        var retorno = this.primero;
        if (this.primero == null){
            console.log("ColaPrioridad vacía");
            return null;
        }else{
        if (this.primero.siguiente != null){
                this.primero = retorno.siguiente;
            }else{
                this.primero = null;
            }
            const info = retorno.datos.dato1+","+retorno.datos.prioridad;
            return info;
            //regrese el vector = {dato, prioridad}
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
            while(true){
                if (actual.datos.dato1 == antiguo){
                    var nuevos = new datos(nuevo, actual.datos.prioridad);
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
                info = verificador.datos;
                console.log(info);
            }
        }else{
            console.log("LISTA VACIA");
        }
    }
}


var PCOLA = new ColaPrioridad();
console.log("COLA PRIORIDAD VACIA CREADA");

function PCOLAadd(){
    var aux = document.getElementById("PCOLAagregar").value;
    var priori = document.getElementById("PCOLAaprioridad").value;
    var cond = document.getElementById("PCOLArepetidos").checked;
    var temp = new datos(aux, priori);
    PCOLA.agregar(temp, cond);
    document.getElementById("PCOLAagregar").value="";
    document.getElementById("PCOLAaprioridad").value="";
    PCOLA.imprimir();
    console.log("##########------###########");
}

function PCOLAdelete(){
    console.log("elemento eliminado: "+PCOLA.eliminar());
    PCOLA.imprimir();
    console.log("##########------###########");
}

function PCOLAsearch(){
    var aux = document.getElementById("PCOLAbuscar").value;
    console.log("ENCONTRADO: "+PCOLA.buscar(aux));
    document.getElementById("PCOLAbuscar").value="";
}

function PCOLAactualizar(){
    var previo = document.getElementById("PCOLAantiguo").value;
    var now = document.getElementById("PCOLAnuevo").value;
    var cond = document.getElementById("PCOLArepetidos").checked
    PCOLA.actualizar(previo, now, cond);
    document.getElementById("PCOLAantiguo").value="";
    document.getElementById("PCOLAnuevo").value="";
    PCOLA.imprimir();
    console.log("##########------###########");
}