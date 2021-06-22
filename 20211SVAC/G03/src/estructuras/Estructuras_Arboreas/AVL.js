class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.derecha = null;
        this.izquierda = null;
        this.altura = 0;
    }

}

class ArbolAVL {
    constructor() {
        this.raiz = null;

    }

    MAX(valor1, valor2) {
        if (valor1 > valor2) {
            return valor1;
        } else {
            return valor2;
        }
    }

    altura(nodo) {
        if (nodo == null) {
            return -1;
        }
        else {
            return nodo.altura;
        }

    }


    agregar(valor) {
        //inserta la raiz como un nodo temporan inicial
        this.raiz = this._agregar(valor, this.raiz)

    }

    _agregar(valor, temporal) {
        if (temporal == null) {
            return new Nodo(valor);
        }
        else {
            /*cuando el valor sea menor al valor del nodo temporal, recursivamente
 hasta que sea nulo se desplaza hacia la izquierda, en caso contrario,
 si es mayor, se desplaza hacia la derecha*/
            if (valor < temporal.valor) {
                temporal.izquierda = this._agregar(valor, temporal.izquierda);
                if ((this.altura(temporal.derecha) - this.altura(temporal.izquierda)) == -2) {
                    if (valor < temporal.izquierda.valor) {
                        temporal = this.r_izquierda(temporal);
                    } else {
                        temporal = this.r_dobleizquierda(temporal);
                    }
                }
            } else if (valor > temporal.valor) {
                temporal.derecha = this._agregar(valor, temporal.derecha);
                if ((this.altura(temporal.derecha) - this.altura(temporal.izquierda)) == 2) {
                    if (valor > temporal.derecha.valor) {                        
                        temporal = this.r_derecha(temporal);
                    }else{
                        temporal = this.r_doblederecha(temporal);

                    }

                }
            }else{
                //si el valor a agregar ya existe
                temporal.valor = valor;
            }
        }
//altura del nodo a insertar
        let al_der = this.altura(temporal.derecha);
        let al_izq = this.altura(temporal.izquierda);
        temporal.altura = this.MAX(al_der,al_izq)+1
        return temporal;
 
    }


    r_izquierda(nodo) {
        let aux; 
        aux = nodo.izquierda;
        nodo.izquierda = aux.derecha;
        aux.derecha = nodo;
        nodo.altura = this.MAX(this.altura(nodo.derecha), this.altura(nodo.izquierda)) +1;
        aux.altura = this.MAX(this.altura(nodo.izquierda),nodo.altura) + 1;
        return aux;

    }


    r_derecha(nodo) {
        let aux;
        aux = nodo.derecha;
        nodo.derecha = aux.izquierda;
        aux.izquierda = nodo;
        nodo.altura = this.MAX(this.altura(nodo.derecha), this.altura(nodo.izquierda))+ 1;
        aux.altura = this.MAX(this.altura(nodo.derecha), nodo.altura) + 1;
        return aux;

    }


    r_dobleizquierda(nodo) {
        nodo.izquierda =  this.r_derecha(nodo.izquierda);
        return this.r_izquierda(nodo)

    }


    r_doblederecha(nodo) {
        nodo.derecha = this.r_izquierda(nodo.derecha);
        return this.r_derecha(nodo)
    }
    

    cargar(arreglo) {
        
        arreglo.map(e => {
            this.agregar(e)
        })
    }


    eliminar(valor) {
        this._eliminar(valor, this.raiz, null);
        this.balancear(this.raiz)


    }

    _eliminar(valor, temporal, anterior) {
        if (valor == temporal.valor) {
            if ((temporal.derecha == null) && (temporal.izquierda == null)) {
                if(anterior.derecha == temporal){
                    anterior.derecha = null;
                }else if(anterior.izquierda == temporal){
                    anterior.izquierda = null;
                }
                

            } else if (temporal.izquierda != null) {
                this._encontrarReemplazo(temporal, temporal.izquierda, anterior);

            } else if ((temporal.izquierda == null) && temporal.derecha != null) {
                if (anterior.derecha = temporal) {
                    anterior.derecha = temporal.derecha
                    temporal = null;
                } else if (anterior.izquierda = temporal) {
                    anterior.izquierda = temporal.derecha;
                    temporal = null;
                }
            }
        }

        if(temporal != null){
            if (temporal.izquierda != null) {
                if (valor <= temporal.izquierda.valor) {
                    this._eliminar(valor, temporal.izquierda, temporal)
                }
                if (temporal.derecha != null) {
                    if (valor >= temporal.derecha.valor) {
                        this._eliminar(valor, temporal.derecha, temporal)
                    }
                }
            }
        
    }
    }


    _encontrarReemplazo(tempEliminar, temporal, anteriorValor) {

        let aux = temporal;
        let anteriorAux = null;
        let encicla = false;

        while (aux.derecha != null) {
            encicla = true;
            anteriorAux = aux;
            aux = aux.derecha;
        }
        if (aux.izquierda != null) {
            anteriorAux.derecha = aux.izquierda;
        } else if (encicla == true) {
            anteriorAux.derecha = null;
        } else if (encicla == false) {
            if (tempEliminar.izquierda == temporal) {
                tempEliminar.izquierda = temporal.izquierda;
            }
        }

        if (anteriorValor.derecha == tempEliminar) {
            anteriorValor.derecha.valor = aux.valor;
        } else if (anteriorValor.izquierda == tempEliminar) {
            anteriorValor.izquierda.valor = aux.valor;
        }
        aux = null;
    }


    balancear() {
        this.balancearAlturas(this.raiz)
        this.raiz = this._balancear(this.raiz)

    }

    _balancear(temporal) {
        if (temporal.izquierda == null) {
            return temporal;
        }else if(temporal.derecha == null){
            return temporal;
        }
        else {

            temporal.izquierda = this._balancear(temporal.izquierda);
            if ((this.altura(temporal.izquierda) - this.altura(temporal.derecha)) == 2) {
                if (temporal.izquierda.derecha == null) {
                    temporal = this.r_izquierda(temporal);
                } else {
                    temporal = this.r_dobleizquierda(temporal);
                }
            }
            temporal.derecha = this._balancear(temporal.derecha);
            if ((this.altura(temporal.derecha) - this.altura(temporal.izquierda)) == 2) {
                if (temporal.derecha.izquierda == null) {
                    temporal = this.r_derecha(temporal);
                } else {
                    temporal = this.r_doblederecha(temporal);
                }
            }
        }
        /* */
        let al_der = this.altura(temporal.derecha);
        let al_izq = this.altura(temporal.izquierda);
        temporal.altura = this.MAX(al_der, al_izq) + 1
        return temporal;
    }

    balancearAlturas(temporal) {
        if (temporal.izquierda != null) {
            this.balancearAlturas(temporal.izquierda);
        } else if (temporal.derecha != null) {
            this.balancearAlturas(temporal.derecha);
        }
        temporal.altura = this.MAX(this.altura(temporal.derecha), this.altura(temporal.izquierda)) + 1

    }


    actualizar(valor, valorNuevo) {
        this.eliminar(valor);
        this.agregar(valorNuevo)
    }

    buscar(valor) {
       let variable = this._buscar(valor,this.raiz);
       console.log("-------")
       console.log(variable.valor)
       console.log("-------")

    }

    _buscar(valor, temporal){
        if(temporal.valor < valor){
            temporal = this._buscar(valor, temporal.izquierda)
        }else if(temporal.valor > valor){
            temporal = this.buscar(valor, temporal.derecha)
        }else if(temporal.valor == valor){
            return temporal;

        }

    }

    guardar(){
        let vector = []
        return this.preOrden(this.raiz, vector);
    }

    preOrden(nodo,vector){
        if(nodo != null){
        vector.push(nodo.valor)
        this.preOrden(nodo.izquierda,vector)
        this.preOrden(nodo.derecha,vector)
        }
        return vector
    }

    recorridoPre(nodo){
        if(nodo != null){
        console.log(nodo.valor)
        this.recorridoPre(nodo.izquierda)
        this.recorridoPre(nodo.derecha)
        }
    }

    graficarNodos(nodo,vector,datoBuscar){

        if(nodo.izquierda == null && nodo.derecha == null){
            let dato
            if(datoBuscar == nodo.valor){
                dato = {id: nodo.valor, label: nodo.valor.toString(), color: "lime"}
            }else{
                dato = {id: nodo.valor, label: nodo.valor.toString(),}
            }
            
            vector.push(dato)
        }else{
            let dato
            if(datoBuscar == nodo.valor){
                dato = {id: nodo.valor, label: nodo.valor.toString(), color: "lime"}
            }else{
                dato = {id: nodo.valor, label: nodo.valor.toString(),}
            }
            
            vector.push(dato)
        }
        
        if(nodo.izquierda != null){
            this.graficarNodos(nodo.izquierda,vector,datoBuscar)
        }

        if (nodo.derecha != null){
            this.graficarNodos(nodo.derecha,vector,datoBuscar)
        }

        return vector
    }

    obtenerNodos(datoBuscar){
        let vector = []

        return this.graficarNodos(this.raiz,vector,datoBuscar)
    }

    graficarApuntadores(nodo,vector){

        if(nodo.izquierda != null){
            this.graficarApuntadores(nodo.izquierda,vector)
            let edge = {from:nodo.valor, to:nodo.izquierda.valor}
            vector.push(edge)
        }

        if (nodo.derecha != null){
            this.graficarApuntadores(nodo.derecha,vector)
            let edge = {from:nodo.valor, to:nodo.derecha.valor}
            vector.push(edge)
        }

        return vector
    }

    obtenerAputadores(){
        let vector = []

        return this.graficarApuntadores(this.raiz,vector)
    }




    
}
export default ArbolAVL;


