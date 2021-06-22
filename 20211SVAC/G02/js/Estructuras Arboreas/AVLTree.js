var valor = 0
var arrayNodes = []
var edges = []
var contador = 1
var seReordena = false
var clickedNode
var clickedNodoValue
var network = null
var switchToggle = document.getElementById("flexSwitchCheckDefault")
var slider = document.getElementById("customRange2")
class Nodo{
    constructor(dato, id){
        this.id = id
        this.dato = dato;
        this.altura = 0;
        this.izq = this.der = null;
    }

}

class arbolAVL{
    constructor(){
        this.raiz = null;
        this.repetidos = false;
    }

    //Devuelve el valor mayor entre dos numeros
    maximo(num1, num2){
        if(num1 > num2){
            return num1
        }
        return num2
    }
    
    //Devuelve la altura del nodo para el factor de Balance
    altura(temporal){
        if(temporal != null){
            return temporal.altura
        }
        return -1
    }

    //Método de sobrecarga para agregar valores al arbol
    agregar(dato){
        contador++
        this.raiz = this._agregar(dato, this.raiz)
    }

    //Método recursivo para agregar valores al arbol
    _agregar(dato, temp){
        if(temp == null){
            return temp = new Nodo(dato,contador)
        }
        if(dato < temp.dato){
            temp.izq = this._agregar(dato, temp.izq)
            if (this.altura(temp.izq) - this.altura(temp.der) == 2){
                if (dato < temp.izq.dato){
                    temp = this.rotacionDerecha(temp)
                }else{
                    temp = this.rotacionDobleDerecha(temp)
                }
            }
        }else{
            temp.der = this._agregar(dato, temp.der)
            if(this.altura(temp.der)-this.altura(temp.izq) == 2){
                if (dato > temp.der.dato){
                    temp = this.rotacionIzquierda(temp)
                }else{
                    temp = this.rotacionDobleIzquierda(temp)
                }
            }
        }
        temp.altura = this.maximo(this.altura(temp.izq), this.altura(temp.der))+1
        return temp
    }

    //Los siguientes 4 metodos de rotación sirven para mantener el arbol balanceado
    //Rotacion simple a la izquierda
    rotacionIzquierda(temp){
        let temp2 = temp.der
        temp.der = temp2.izq
        temp2.izq = temp
        temp.altura = this.maximo(this.altura(temp.der), this.altura(temp.izq))+1
        temp2.altura = this.maximo(this.altura(temp2.der) , temp.altura)+1
        return temp2
    }

    //Rotación simple a la derecha
    rotacionDerecha(temp){
        let temp2 = temp.izq
        temp.izq = temp2.der
        temp2.der = temp
        temp.altura = this.maximo(this.altura(temp.der), this.altura(temp.izq))+1
        temp2.altura = this.maximo(this.altura(temp2.izq) , temp.altura)+1
        return temp2
    }

    //Rotación doble a la izquierda
    rotacionDobleIzquierda(temp){
        temp.der = this.rotacionDerecha(temp.der)
        return this.rotacionIzquierda(temp)
    }

    //Rotación doble a la derecha
    rotacionDobleDerecha(temp){
        temp.izq = this.rotacionIzquierda(temp.izq)
        return this.rotacionDerecha(temp)
    }

    buscarNodo(valueNodo, temp){
        if(temp != null){
            if(valueNodo == temp.dato){
                return temp.id
            }else if(valueNodo < temp.dato){
                return this.buscarNodo(valueNodo, temp.izq)
            }else{
                return this.buscarNodo(valueNodo, temp.der)
            }
        }
    }

    //Método de busqueda de valores dentro del arbol
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

    //Método de sobrecarga para la eliminación
    eliminar(id ,dato){
        if(this.buscar(dato, this.raiz)){
            this.raiz = this._eliminar(id, dato, this.raiz)
        }else{
            alert("El dato no existe dentro del arbol")
        }
        
    }

    //Método de recursivo para la eliminación
    _eliminar(id,dato, temp){
        if(temp != null){
            if(dato == temp.dato && id == temp.id){
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
                console.log("Entro" + dato)
                temp.izq = this._eliminar(id,dato, temp.izq)
                console.log(this.altura(temp.izq) - this.altura(temp.der))
                if (this.altura(temp.izq) - this.altura(temp.der) == -2){
                    temp = this.rotacionIzquierda(temp)
                }
            }else{
                temp.der = this._eliminar(id,dato, temp.der)
                if(this.altura(temp.der)-this.altura(temp.izq) == -2){
                    temp = this.rotacionDerecha(temp)  
                }
            }
            temp.altura = this.maximo(this.altura(temp.izq), this.altura(temp.der))+1
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
        if(this.altura(temp.izq)-this.altura(temp.der) == 2){
            temp = this.rotacionDerecha(temp)
        }
        temp.altura = this.maximo(this.altura(temp.izq), this.altura(temp.der))+1
        return temp
    }

    //Este método buscar el valor mas a la izquierda del nodo derecho, se utiliza para el método eliminar
    buscarDerecha(temp){
        if(temp.izq == null){
            valor = temp.dato
            return temp.der
        }
        temp.izq = this.buscarDerecha(temp.izq)
        if (this.altura(temp.der) - this.altura(temp.izq) == 2){
            temp = this.rotacionIzquierda(temp)
        }
        temp.altura = this.maximo(this.altura(temp.izq), this.altura(temp.der))+1
        return temp
    }

    //Método de sobrecarga para la actualización
    actualizar(id,dato, datoNuevo){
        if(this.buscar(dato, this.raiz)){
            if(this.buscar(datoNuevo) && !this.repetidos){
                alert("No se aceptan valores repetidos")
                return
            }
            this.raiz = this._actualizar(id,dato, datoNuevo, this.raiz)
            if(seReordena){
                this.eliminar(id, dato)
                this.agregar(datoNuevo)
                seReordena = false
            }
        }else{
            alert("El dato a actualizar no existe dentro del arbol")
        }
    }

    //Método recursivo para la actualización
    _actualizar(id ,dato, datoNuevo, temp){
        if(temp != null){
            if(dato == temp.dato && id == temp.id){
                var izquierda =this.buscarIzquierdaActualizar(temp.izq)
                var derecha
                if(this.buscarDerechaActualizar(temp.der) == -1){
                    derecha = datoNuevo+1
                }else{
                    derecha = this.buscarDerechaActualizar(temp.der)
                }
                if(datoNuevo > izquierda && datoNuevo <= derecha){
                    temp.dato = datoNuevo
                }else{
                    seReordena = true
                }
            }else if(dato< temp.dato){
                if(datoNuevo < temp.dato){
                    temp.izq = this._actualizar(id ,dato, datoNuevo, temp.izq)
                }else{
                    seReordena = true
                }
            }else{
                if(datoNuevo >= temp.dato){
                    temp.der = this._actualizar(id, dato, datoNuevo, temp.der)
                }else{
                    seReordena = true
                }
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

    //Método para impresión de valores en pre orden
    preOrden(temp){
        if(temp != null){
            console.log(temp.dato)
            this.preOrden(temp.izq)
            this.preOrden(temp.der)
        }
    }

    //Método para impresión de valores en orden
    enOrden(temp){
        if(temp != null){
            this.enOrden(temp.izq)
            console.log(temp.dato)
            this.enOrden(temp.der)
        }
    }
    
    //Método para impresión de valores en post orden
    postOrden(temp){
        if(temp != null){
            this.postOrden(temp.izq)
            this.postOrden(temp.der)
            console.log(temp.dato)
        }
    }

    //Agrega nodos y ramas para la grafica
    recorrerGraficar(temp){
        if(temp != null){
            this.recorrerGraficar(temp.izq)
            arrayNodes.push({id: temp.id, label: temp.dato.toString(), shape: "circle"})
            if(temp.izq != null){
                edges.push({from: temp.id, to: temp.izq.id, arrows: "to"})
            }
            if(temp.der != null){
                edges.push({from: temp.id, to: temp.der.id, arrows: "to"})
            }
            this.recorrerGraficar(temp.der)
        }
    }
}


let arbolbb = new arbolAVL()
function actualizarTablero(){
    arbolbb.recorrerGraficar(arbolbb.raiz);
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
                sortMethod : 'directed',
                shakeTowards: 'roots'
              }
        } 
    };
    network = new vis.Network(container, data, options);
    network.on('click', function (properties) {
        var nodeID = properties.nodes[0];
        if (nodeID) {
            clickedNode = this.body.nodes[nodeID];
            clickedNode = clickedNode.options.id
            console.log('clicked node:', clickedNode);
            clickedNodoValue =  this.body.nodes[nodeID]
            clickedNodoValue = clickedNodoValue.options.label
            document.getElementById("valueNodo").value = clickedNodoValue;
        }
    });
    arrayNodes = []
    edges = []  
}

function insertarNodo(){
    var valor
    if(document.getElementById("valueNodo").value.charCodeAt(0)>=48 && document.getElementById("valueNodo").value.charCodeAt(0)<=57){
        valor = parseInt(document.getElementById("valueNodo").value, 10)
    }else{
        valor = document.getElementById("valueNodo").value
    }
    if(arbolbb.buscar(valor, arbolbb.raiz) && switchToggle.checked == false){
        alert("No se aceptan valores repetidos")
    }else{
        arbolbb.agregar(valor)
    }
    actualizarTablero()
    document.getElementById("valueNodo").value = ""
}

function eliminarNodo(){
    if(clickedNodoValue != undefined){
        arbolbb.eliminar(clickedNode, clickedNodoValue)
        actualizarTablero()
    }else{
        alert("Seleccione un nodo")
    }
    document.getElementById("valueNodo").value = ""
}

function actualizarNodo(){
    var valor = document.getElementById("valueNodo").value
    document.getElementById("valueNodo").value = ""
    if(clickedNodoValue != undefined){
        if(valor.charCodeAt(0)>=48 && valor.charCodeAt(0)<=57){
            arbolbb.actualizar(clickedNode, clickedNodoValue, parseInt(valor))
        }else{
            arbolbb.actualizar(clickedNode, clickedNodoValue, valor)
        }
    }else{
        alert("Seleccione un nodo")
    }
    actualizarTablero()
}

function searchNode(){
    var valor
    if(document.getElementById("valueNodo").value.charCodeAt(0)>=48 && document.getElementById("valueNodo").value.charCodeAt(0)<=57){
        valor = parseInt(document.getElementById("valueNodo").value, 10);
    }else{
        valor = document.getElementById("valueNodo").value
    }
    if(arbolbb.buscar(valor, arbolbb.raiz)){
        focus()
        setTimeout(zoomExtended, 2000)
    }else{
        alert("El dato no se encuentra dentro del arbol")
    }
    document.getElementById("valueNodo").value = ""
}


function focus() {
    let nodeId
    var valueNodo
    if(document.getElementById("valueNodo").value.charCodeAt(0)>=48 && document.getElementById("valueNodo").value.charCodeAt(0)<=57){
        valueNodo = parseInt(document.getElementById("valueNodo").value, 10);
    }else{
        valueNodo = document.getElementById("valueNodo").value
    }
    nodeId = arbolbb.buscarNodo(valueNodo, arbolbb.raiz)
    document.getElementById("valueNodo").value = ""
    var options = {
        scale: 3.0,
        offset: {x:0,y:0},
        animation: {
            duration: (1000)*(slider.value),
            easingFunction: "easeOutQuint"
        }
    }
    network.focus(nodeId, options);
}

function zoomExtended(){
    var options = {
        scale: 1.0,
        duration: 4500,
        offset: {x:0,y:0},
        easingFunction: "easeOutCubic"
    }

    network.moveTo(options);
}

function read(){
    var fileInput = document.querySelector('input[type="file"]');

    var file = fileInput.files.item(0);
    var reader = new FileReader();

    reader.readAsText(file);
    
    reader.onload = function() {
        var obj = JSON.parse(reader.result)
        let val = obj.valores
        arbolbb.repetidos = obj.repeticion
        slider.value = obj.animacion
        
        let contador =0
        switch(arbolbb.repetidos){
            case true:
                switchToggle.checked = true
                for(let i=0; i<val.length; i++){
                    contador = contador + 0.5
                    setTimeout(function (params) {
                        arbolbb.agregar(val[i])
                        actualizarTablero()
                    },(1000)*Math.round(parseInt(slider.value)/2)*contador) 
                }
                break;
            case false:
                switchToggle.checked = false
                for(let i=0; i<val.length; i++){
                    contador = contador + 0.5
                    if (arbolbb.buscar(val[i], arbolbb.raiz)){
                        console.log("no se aceptan valores repetidos")
                    }else{                    
                        contador = contador + 0.5
                        setTimeout(function (params) {
                            arbolbb.agregar(val[i])
                            actualizarTablero()
                        },(1000)*Math.round(parseInt(slider.value)/2)*contador)
                    }
                    
                }
                break;
        }
    }
}