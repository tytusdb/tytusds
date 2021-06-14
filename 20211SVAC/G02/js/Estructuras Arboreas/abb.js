//Variables auxiliares globales
var valor = 0
var contador = 0
var seReordena = false
var arrayNodes = []
var edges = []
//Clase nodo del arbol binario de busqueda
class Nodo{
    constructor(dato, id){
        this.dato = dato
        this.id = id
        this.izq = null
        this.der = null
    }
}

//Clase Arbol binario de busqueda
class ArbolBB{
    constructor(){
        this.repetidos = false
        this.raiz = null
    }
    //Método de sobrecarga para ingresar valores al arbol
    agregar(dato){
        if(!this.repetidos && this.buscar(dato,  this.raiz)){
            alert("Este dato ya existe, por favor habilite los datos repetidos")
        }else{
            this.raiz = this._agregar(dato, this.raiz)
            this.graficar()
            contador++;
        }
    }

    //Método recursivo para agregar valores al arbol 
    _agregar(dato, temp){
        if(temp == null){
            return temp = new Nodo(dato, contador)
        }
        if(dato < temp.dato){
            temp.izq = this._agregar(dato, temp.izq) 
        }else{
            temp.der = this._agregar(dato, temp.der)
        }
        return temp
    }

    //Metodo de busqueda dentro del arbol, devuelve un valor booleano
    buscar(dato, temp){
        if(temp != null){
            if(dato == temp.dato){
                return true
            }else if(dato < temp.dato){
                return this.buscar(dato, temp.izq)
            }else{
                return this.buscar(dato, temp.der)
            }
        }
        return false
    }

    //Método de sobrecarga para eliminar
    eliminar(dato){
        this.raiz = this._eliminar(dato, this.raiz)
        this.graficar()
    }

    //Método recursivo para eliminar
    _eliminar(dato, temp){
        if(temp != null){
            if(dato == temp.dato){
                if(temp.izq == null && temp.der == null){
                    return temp = null
                }else if(temp.izq != null){
                    temp.izq = this.buscarIzquierda(temp.izq)
                    temp.dato = valor
                }else{
                    temp.der = this.buscarDerecha(temp.der)
                    temp.dato = valor
                }
            }else if(dato < temp.dato){
                temp.izq = this._eliminar(dato, temp.izq)
            }else{
                temp.der = this._eliminar(dato, temp.der)
            }
            return temp
        }
    }

    //Este método buscar el valor mas a la derecha del nodo izquierdo, se utiliza para el método eliminar
    buscarIzquierda(temp){
        if(temp.der == null){
            valor = temp.dato
            return temp.izq
        }
        temp.der = this.buscarIzquierda(temp.der)
        return temp
    }

    //Este método buscar el valor mas a la izquierda del nodo derecho, se utiliza para el método eliminar
    buscarDerecha(temp){
        if(temp.izq == null){
            valor = temp.dato
            return temp.der
        }
        temp.izq = this.buscarDerecha(temp.izq)
        return temp
    }

    //Método de sobrecarga para la actualización
    actualizar(dato, datoNuevo){
        if(this.buscar(dato, this.raiz)){
            if(this.buscar(datoNuevo) && !this.repetidos){
                alert("No se aceptan valores repetidos")
                return
            }
            this.raiz = this._actualizar(dato, datoNuevo, this.raiz)
            if(seReordena){
                this.eliminar(dato)
                this.agregar(datoNuevo)
                seReordena = false
            }else{
                this.graficar()
            }
        }else{
            alert("El dato a actualizar no existe dentro del arbol")
        }
    }

    //Método recursivo para la actualización
    _actualizar(dato, datoNuevo, temp){
        if(temp != null){
            if(dato == temp.dato){
                var izquierda =this.buscarIzquierdaActualizar(temp.izq)
                var derecha
                if(this.buscarDerechaActualizar(temp.der) == -1){
                    derecha = temp.dato
                }else{
                    derecha = this.buscarDerechaActualizar(temp.der)
                }
                if(datoNuevo > izquierda && datoNuevo <= derecha){
                    temp.dato = datoNuevo
                }else{
                    seReordena = true
                }
            }else if(dato< temp.dato){
                temp.izq = this._actualizar(dato, datoNuevo, temp.izq)
            }else{
                temp.der = this._actualizar(dato, datoNuevo, temp.der)
            }
            return temp
        }
    }

    //Método para validar el numero a actualizar
    buscarIzquierdaActualizar(temp){
        if(temp == null){
            return -1
        }else if(temp.der == null){
            return temp.dato
        }
        return this.buscarIzquierdaActualizar(temp.der)
    }

    //Método para validar el numero a actualizar
    buscarDerechaActualizar(temp){
        if(temp == null){
            return -1
        }else if(temp.izq == null){
            return temp.dato
        }
        return this.buscarDerechaActualizar(temp.izq)
    }

    //Imprime los valores en pre orden
    enPreOrden(temp){
        if(temp != null){
            console.log(temp.dato)
            this.enOrden(temp.izq)
            this.enOrden(temp.der)
        }
    }

    //Imprime los valores en orden
    enOrden(temp){
        if(temp != null){
            this.enOrden(temp.izq)
            console.log(temp.dato)
            this.enOrden(temp.der)
        }
    }

    //Imprime los valores en post orden
    enPostOrden(temp){
        if(temp != null){
            this.enOrden(temp.izq)
            this.enOrden(temp.der)
            console.log(temp.dato)
        }
    }

    recorrerGraficar(temp){
        if(temp != null){
            this.recorrerGraficar(temp.izq)
            arrayNodes.push({id: temp.id, label: temp.dato.toString(), shape: "circle"})
            if(temp.izq != null){
                edges.push({from: temp.id, to: temp.izq.id})
            }
            if(temp.der != null){
                edges.push({from: temp.id, to: temp.der.id})
            }
            this.recorrerGraficar(temp.der)
        }
    }

    graficar(){
        this.recorrerGraficar(this.raiz)
        var nodes = new vis.DataSet(arrayNodes);
        var container = document.getElementById("mynetwork");
        var data = {
            nodes: nodes,
            edges: edges,
        };
        var options = { 
            physics: false,
            layout: {
                hierarchical: {
                    direction: 'UD',
                    nodeSpacing: 150,
                    sortMethod : 'directed' //hubsize, directed.
                  }
            } 
        };
        var network = new vis.Network(container, data, options);
        arrayNodes = []
        edges = []  
    }
}

let arbolbb = new ArbolBB()

function insertarNodo(){
    var valor = parseInt(document.getElementById("valorNodo").value, 10); 
    document.getElementById("valorNodo").value = ""
    document.getElementById("valorActualizar").value = ""
    arbolbb.agregar(valor)
}

function eliminarNodo(){
    var valor = parseInt(document.getElementById("valorNodo").value, 10); 
    document.getElementById("valorNodo").value = ""
    document.getElementById("valorActualizar").value = ""
    arbolbb.eliminar(valor)
}

function buscarNodo(){
    var valor = parseInt(document.getElementById("valorNodo").value, 10); 
    document.getElementById("valorNodo").value = ""
    document.getElementById("valorActualizar").value = ""
    if(arbolbb.buscar(valor, arbolbb.raiz)){
        alert("Se encontro el valor")
    }else{
        alert("No se encontro el valor")
    }
}

function actualizarNodo(){
    var valor = parseInt(document.getElementById("valorNodo").value, 10); 
    var valor2 = parseInt(document.getElementById("valorActualizar").value , 10);
    document.getElementById("valorNodo").value = ""
    document.getElementById("valorActualizar").value = ""
    arbolbb.actualizar(valor2, valor)
}

function setRepetidos(){
    
}