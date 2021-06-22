//FRAME PADRE
var Parentdraw = SVG().addTo('#split-0').size('10000', '100%')

// create a set and add the elements
var list = [];

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
                    console.log("VALOR ACTUALIZADO CON ÉXITO");
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
            list.push(info);
            

        }
    }else{
        console.log("LISTA VACIA");
    }
    }
}

var lista = new ListaSimple();
console.log("Lista vacia creada");
var counter = 100;

function UpdateGraph(){

    lista.imprimir();
    for(i in list){
        console.log(list[i]);
        console.log("ITERACION");
        anmC = Parentdraw.circle(50).fill("#61c2ff")
        var runner = new SVG.Runner(1000)
        runner.move(counter+=300, 500)
        runner.element(anmC)
        runner.step(200)
        var timeline = new SVG.Timeline()
        
    }
    list = [];
    counter=100;
}

function addNewNode(){
    var new_node = document.getElementById("inode").value;
    var data = new datos(new_node,null);
    var inserta = document.getElementById("startORend").value;
    var repitencia = document.getElementById("admitR").checked;
    
    if (inserta == "inicio"){
        lista.agregar_inicio(data,repitencia);
        
        UpdateGraph();
    }
    else if(inserta == "final"){
        lista.agregar_final(data,repitencia);
        UpdateGraph();
    }
    document.getElementById("inode").value=""; 
}



function searchNode(){
    var toFind = document.getElementById("inodeSearch").value;
    console.log("el valor que se desea buscar es");
    console.log(toFind);
    console.log("")
    lista.buscar(toFind);
    document.getElementById("inodeSearch").value=""; 
}

function deleteNode(){
    var toDel = document.getElementById("inodeDel").value;  
    lista.eliminar(toDel);
    UpdateGraph();
    document.getElementById("inodeDel").value=""; 
}

function updateNode(){
    var antiguo=document.getElementById("updateA").value;
    var nuevo = document.getElementById("updateN").value;
    var repitencia = document.getElementById("admitR").checked;
    
    lista.actualizar(antiguo,nuevo,repitencia);
    document.getElementById("updateA").value="";
    document.getElementById("updateN").value="";
}
