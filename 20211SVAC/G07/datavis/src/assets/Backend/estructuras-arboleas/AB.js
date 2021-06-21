class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.anterior = null;
        this.siguiente = null;
        this.derecho = null;
        this.izquierdo = null;    
    }
}

class Rama {
    constructor() {
        this.contador = 0;//contador de elementos insertados
        this.hoja = true;//Si es hoja el nodo que vamos a insertar
        this.raiz = null;//El inicio de la lista
    }

    insertar(nodo,bandera) {
        if (this.raiz == null) {
            this.raiz = nodo;
            this.contador++;
        } else {
            let actual = this.raiz;
            do {
                if (nodo.valor <= actual.valor) {
                    
                    if (nodo.valor == actual.valor) { //permite repeticion
                        if(bandera==true){
                            this.contador++;
                            this.raiz.siguiente = nodo;
                            nodo.anterior = this.raiz;
                            break;
                        }
                    } else {
                        this.contador++;
                        actual.anterior = nodo;
                        nodo.siguiente = actual;
                        this.raiz = nodo;
                        break;
                    }
                } else if (actual.siguiente == null) {
                    this.contador++;
                    actual.siguiente = nodo;
                    actual.derecho = nodo.izquierdo;
                    nodo.anterior = actual;
                    nodo.siguiente = null;
                    break;
                }
                actual = actual.siguiente;
            }
            while (actual!=null);
            
        }
    }

   
}

class ArbolB {
    
    constructor(orden,banderaRep) {
        this.raiz = null;
        this.orden = orden;
        this.arreglo = [];
        this.banderaRep = banderaRep;
       
    }

    insertar(valor) {
        this.arreglo.push(valor);
        let nodo = new Nodo(valor);
        if (this.raiz == null) {
            this.raiz = new Rama();
            this.raiz.insertar(nodo,this.banderaRep);
            return;
        } else {
            let temp = this.add(nodo, this.raiz);
            if (temp instanceof Nodo) {
                this.raiz = new Rama();
                this.raiz.insertar(temp,this.banderaRep);
                this.raiz.hoja = false;
            }

        }
    }
    print(){
        this._print(this.raiz);
     }

     _print(rama){
        if(rama==null) return;
        let aux = rama.raiz;
     }

    add(nodo, rama) {
        if (rama.hoja) {
            rama.insertar(nodo,this.banderaRep);
            if (rama.contador == this.orden) {
                return this.dividirRama(rama);
            } else {
                return rama;
            }
        } else {
            let temp = rama.raiz;
            do {
                if (nodo.valor == temp.valor) {
                    return rama;
                } else if (nodo.valor < temp.valor) {
                    let aux = this.add(nodo, temp.izquierdo);
                    if (aux instanceof Nodo) {
                        rama.insertar(aux,this.banderaRep);
                        if (rama.contador == this.orden) {
                            return this.dividirRama(rama);
                        }
                    }
                    return rama

                } else if (temp.siguiente == null) {
                    let aux = this.add(nodo, temp.derecho);
                    if (aux instanceof Nodo) {
                        rama.insertar(aux,this.banderaRep);
                        if (rama.contador == this.orden) return this.dividirRama(rama);

                    }
                    return rama
                }
                temp = temp.siguiente;
            } while (temp != null);
        }
        return rama;
    }

    dividirRama(rama) {
        let derecha = new Rama();
        let izquierda = new Rama();
        let medio = null;
        let temp = rama.raiz;

        let inicio = 1;
        let valorMedio = parseInt(this.orden / 2) + 1;
        let final = this.orden;
        for (let i = 1; i < this.orden + 1; i++, temp = temp.siguiente) {
            let nodo = new Nodo(temp.valor);
            nodo.izquierdo = temp.izquierdo;
            nodo.derecho = temp.derecho;

            if (nodo.derecho != null && nodo.izquierdo != null) {
                izquierda.hoja = false;
                derecha.hoja = false;
            }

            if (i >= inicio && i < valorMedio) {
                izquierda.insertar(nodo,this.banderaRep);
            } else if (i == valorMedio) {
                medio = nodo;
            } else if (i <= final && i > valorMedio) {
                derecha.insertar(nodo,this.banderaRep);
            }
        }

        medio.izquierdo = izquierda;
        medio.derecho = derecha;
        return medio;
    }

   
    buscar(buscado){
        let referencia = this.raiz.raiz;
        do{
            if(buscado == referencia.valor){
                console.log("encontrado");
                console.log(referencia.valor)
                return true;
                break;
            }else if(buscado < referencia.valor){
                 console.log("es menor");
                 if(referencia.izquierdo!=null){
                  referencia = referencia.izquierdo.raiz;   
                 }
             }else if(buscado > referencia.valor){
                 console.log("mayor")
                 if(referencia.siguiente!=null){
                     referencia = referencia.siguiente;
                 }else{
                     if(referencia.derecho!=null){
                         referencia = referencia.derecho.raiz;
                     }else{
                         console.log("NO encontrado");
                         return false;
                         break;
                     }
                 }
            }
            
 
        }while(true);
      

    }

    actualizar(buscado, sustituir){
        let referencia = this.raiz.raiz;
        do{
            if(buscado == referencia.valor){
                console.log("sustituido");
                referencia.valor = sustituir;
                break;
            }else if(buscado < referencia.valor){
                 console.log("es menor");
                 if(referencia.izquierdo!=null){
                  referencia = referencia.izquierdo.raiz;   
                 }
             }else if(buscado > referencia.valor){
                 console.log("mayor")
                 if(referencia.siguiente!=null){
                     referencia = referencia.siguiente;
                 }else{
                     if(referencia.derecho!=null){
                         referencia = referencia.derecho.raiz;
                     }else{
                         console.log("NO encontrado");
                         break;
                     }
                 }
            }
            
 
        }while(true);
    }


    eliminar(valor){
       this.raiz = null;
        
       //para eliminar
        for(let i=0;i<this.arreglo.length;i++){
            if(valor == this.arreglo[i]){
                this.arreglo.splice(i,1);
                break;
            }
        }
        console.log("Eliminado")
        // //para ingresar
        this.arreglo.forEach(dato => this.insertar(dato));
        console.log("Ingresado");
       
    }   

}

let b = new ArbolB(3,false);
b.insertar(10);
b.insertar(11);
b.insertar(12);
b.insertar(13);
b.insertar(14);
b.insertar(15);
b.insertar(16);
b.insertar(17);
//b.actualizar(17,20);
//b.buscar(14);
b.eliminar(17);
//b.buscar(15);
b.print(); // para debug
