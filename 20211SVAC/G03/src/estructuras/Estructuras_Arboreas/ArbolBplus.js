class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.anterior = null;
        this.siguiente = null;
        this.rama_Izq = null;
        this.rama_Der = null;
    }
}

class Rama {
    constructor() {
        this.hoja = true;
        this.indice = null;
        this.ramaContinua = null;
        this.contador = 0;
        this.ramaPadre = null;
    }

    agregarNodo(nodo) {
        if (this.indice == null) {
            this.indice = nodo;
            this.contador++;
        } else {
            let temporal = this.indice;
            do {
                if (nodo.valor <= temporal.valor) {
                    this.contador++;
                    if (temporal == this.indice) {
                        temporal.anterior = nodo;
                        nodo.siguiente = temporal;
                        temporal.rama_Izq = nodo.rama_Der;
                        this.indice = nodo;
                        break;
                    } else {//en caso de que no sea el indice se inserta en medio de los valores respectivos
                        nodo.anterior = temporal.anterior;
                        nodo.siguiente = temporal;
                        temporal.anterior.siguiente = nodo;
                        temporal.anterior = nodo;

                        temporal.anterior.rama_Der = nodo.rama_Izq;
                        temporal.rama_Izq = nodo.rama_Der;
                        break;

                    }
                }// insertar al final
                else if (temporal.siguiente == null) {
                    this.contador++;
                    temporal.siguiente = nodo;
                    temporal.rama_Der = nodo.rama_Izq;
                    nodo.anterior = temporal;
                    break;
                }
                temporal = temporal.siguiente;
            } while (temporal != null);
        }
    }
}

class ArbolBplus {
    constructor(orden) {
        this.orden = orden;
        this.NodoAux = null;
        this.raiz = null;

    }
/*-----------------------------------------------
-------------Inicio bloque Agregar --------------
-----------------------------------------------*/
    agregar(valor) {
        let nodo = new Nodo(valor);
        this._agregar(nodo, this.raiz)

    }


    _agregar(nodo, ramaAux) {
        if (this.raiz == null) {
            this.raiz = new Rama();
            this.raiz.agregarNodo(nodo);

        } else if (ramaAux.hoja) {
            ramaAux.agregarNodo(nodo);
            if (ramaAux.contador == this.orden) {
                this.dividirRama(ramaAux);
            }
        } else if (ramaAux.hoja == false) {
            this.buscarInsercion(nodo, ramaAux);
        }
    }

    buscarInsercion(nodo, rama) {
        let temp = rama.indice;
        for (let i = 1; i <= rama.contador; i++, temp = temp.siguiente) {
            if (nodo.valor < temp.valor) {
                this._agregar(nodo, temp.rama_Izq);
                break;
            } else if (temp.siguiente == null) {
                this._agregar(nodo, temp.rama_Der);
                break;
            }
        }
    }



    dividirRama(ramaAux) {
        let valorMedio = parseInt(this.orden / 2) + 1
        let rama_derAux = new Rama();
        let rama_izAux = new Rama();        
        let medio = null;
        let temp = ramaAux.indice;
        let hoja = false;
        let nuevaRaiz = null;

        if (ramaAux.ramaPadre == null) {
            nuevaRaiz = new Rama()
        }    
        if(temp.rama_Der != null || temp.rama_Izq != null){
            ramaAux.hoja = false
        }
        if (ramaAux.hoja) {
            hoja = true;          
        }

        if(ramaAux.ramaPadre != null){
            if(ramaAux.ramaPadre.indice.rama_Izq.hoja == true){
                let tempContinua = ramaAux.ramaPadre.indice;
                while(tempContinua != null){
                    if(tempContinua.siguiente == null){
                        tempContinua.rama_Izq.ramaContinua = rama_izAux;
                        }
                        tempContinua = tempContinua.siguiente;
                    }           
        }
        }

        for (let i = 1; i <= this.orden; i++, temp = temp.siguiente) {
            let nodo = new Nodo(temp.valor);
            nodo.rama_Izq = temp.rama_Izq;
            nodo.rama_Der = temp.rama_Der;            
/* Si el nodo tiene hijos, aparte de ingresar los datos, 
reacomodo sus hijos en los espacios de las divisiones*/
            if (i < valorMedio) {
                if(nodo.rama_Izq != null){
                    nodo.rama_Izq.ramaPadre = rama_izAux;
                }
                if(nodo.rama_Der != null){
                    nodo.rama_Der.ramaPadre = rama_izAux;
                }
                rama_izAux.agregarNodo(nodo);               

            } else if (i > valorMedio) {
                if(nodo.rama_Izq != null){
                    nodo.rama_Izq.ramaPadre = rama_derAux;
                }
                if(nodo.rama_Der != null){
                    nodo.rama_Der.ramaPadre = rama_derAux;
                }
                rama_derAux.agregarNodo(nodo);

            } else if (i = valorMedio) {
                if (hoja) {
                    if(nodo.rama_Izq != null){
                        nodo.rama_Izq.ramaPadre = rama_derAux;
                    }
                    if(nodo.rama_Der != null){
                        nodo.rama_Der.ramaPadre = rama_derAux;
                    }
                    rama_derAux.agregarNodo(nodo);
                    medio = new Nodo(temp.valor);
                    medio.rama_Izq = rama_izAux;
                    medio.rama_Der = rama_derAux;
                } else if (hoja == false) {
                    medio = new Nodo(temp.valor);
                    medio.rama_Izq = rama_izAux;
                    medio.rama_Der = rama_derAux;
                }
            }
        }

        if(rama_derAux.indice.rama_Izq != null || rama_derAux.indice.rama_Der != null){
            rama_derAux.hoja = false;
        }
        if(rama_izAux.indice.rama_Izq != null || rama_izAux.indice.rama_Der != null){
            rama_izAux.hoja = false;
        }

        if (nuevaRaiz != null) {       
            rama_derAux.ramaPadre = nuevaRaiz;
            rama_izAux.ramaPadre = nuevaRaiz;                
            nuevaRaiz.agregarNodo(medio);           
            //nuevaRaiz.indice.rama_Izq = rama_izAux;
            //nuevaRaiz.indice.rama_Der = rama_derAux;
            if (hoja) {
                nuevaRaiz.indice.rama_Izq.ramaContinua = nuevaRaiz.indice.rama_Der;
            }
            nuevaRaiz.hoja = false;
            this.raiz = nuevaRaiz;
        } else {
            medio.rama_Izq.ramaPadre = ramaAux.ramaPadre;
            medio.rama_Der.ramaPadre = ramaAux.ramaPadre;
            ramaAux.ramaPadre.agregarNodo(medio);
            if (hoja) {
                medio.rama_Izq.ramaContinua = medio.rama_Der;
            }
            if (ramaAux.ramaPadre.contador == this.orden) {
                this.dividirRama(ramaAux.ramaPadre)
            }
        }
    }    
/*-----------------------------------------------
---------------Fin bloque Agregar ---------------
-----------------------------------------------*/

    eliminar(valor){    
        let arbolAux  = this.raiz;
        this._eliminar(valor, arbolAux);

    }

    _eliminar(valor, ramaAux){
        if(ramaAux.hoja != true){
            this._eliminar(valor, ramaAux.indice.rama_Izq)
        }else if(ramaAux.hoja == true){
            this.raiz = null;
            while(ramaAux != null){
                let nodotemp = ramaAux.indice;     
                for(let i = 1; i <= ramaAux.contador; i ++,nodotemp = nodotemp.siguiente){
                    if(nodotemp.valor == valor){
                        continue
                    }else{
                        this.agregar(nodotemp.valor)
                    }                     
                }ramaAux = ramaAux.ramaContinua
            }

        }

    }

    actualizar(valor, valorNuevo){
        this.eliminar(valor)
        this.agregar(valorNuevo)
    }

    buscar(valor){      
        let Encontrado = this._buscar(valor, this.raiz)  
        console.log(Encontrado.valor + "Aqui esta")
    }

    _buscar(valor, ramaAux){
        let temporal = ramaAux.indice;
        for(let  i = 1; i<=ramaAux.contador; i++, temporal = temporal.siguiente){
            if(temporal.valor > valor){
                if(ramaAux.hoja == false){
                   let nodo = this._buscar(valor, temporal.rama_Izq)
                   return nodo;
                }
            }else if(temporal.valor == valor){
                if(ramaAux.hoja == false){
                   let  nodo1 = this._buscar(valor, temporal.rama_Der)
                    if(nodo1 instanceof Nodo){
                        return nodo1
                    }
                    let nodo2 = this._buscar(valor, temporal.rama_Izq)
                    if(nodo2 instanceof Nodo){
                        return nodo2
                    }
                }else if(ramaAux.hoja == true){
                    return temporal;
                    break;
                }
            }
        }
    }


    cargar(arreglo) {
        let arreglo1 = arreglo;
        arreglo1.forEach(elemento => {
            this.agregar(elemento);
        });
}

    guardar(){}

}
module.exports.ArbolBplus = ArbolBplus;