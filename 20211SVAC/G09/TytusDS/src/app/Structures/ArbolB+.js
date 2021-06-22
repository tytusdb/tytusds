
leaf = function () {
    this.keyval = [];
    this.recnum = [];
    this.prevLf = null;
    this.nextLf = null;};
 
 node = function () {
    this.keyval = [];
    this.nodptr = [];};
 
 tree = function (orderecha) {
    // Private
    this.root = new leaf();
    this.maxkey = orderecha-1;
    this.minkyl = Math.floor(orderecha/2);
    this.minkyn = Math.floor(this.maxkey/2);
    this.leaf = null;
    this.item = -1;
    // Public
    this.keyval = '';
    this.recnum = -1;
    this.length = 0;
    this.eof = true;
    this.found = false;};
 
 
class Nodo {
 constructor(dato) {
    this.dato = dato;
    this.anterior = null;
    this.siguiente = null;
    this.derecha = null;
    this.izquierda = null;
    }
}
    
    class Rama {
        constructor(id) {
            this.contador = 0;
            this.leave = true;
            this.root = null;
            this.id = id
        }
    
        insertar(nodo) {
            if (this.root == null) {
                this.root = nodo;
                this.contador++;
            } else {
                let auxiliar = this.root;
                do {
                    if (nodo.dato <= auxiliar.dato) {
                        this.contador++;
                        if (auxiliar == this.root) {
                            this.root.anterior = nodo;
                            nodo.siguiente = this.root
                            this.root.izquierda = nodo.derecha;
                            this.root = nodo;
                            break;
                        } else {
                            nodo.anterior = auxiliar.anterior;
                            nodo.siguiente = auxiliar;
                            auxiliar.anterior.siguiente = nodo;
                            auxiliar.anterior.derecha = nodo.izquierda;
                            auxiliar.anterior = nodo;
                            auxiliar.izquierda = nodo.derecha;
                            break;
                        }
                    } else if (auxiliar.siguiente == null) {
                        this.contador++;
                        auxiliar.siguiente = nodo;
                        auxiliar.derecha = nodo.izquierda;
                        nodo.anterior = auxiliar;
                        nodo.siguiente = null;
                        break;
                    }
                    auxiliar = auxiliar.siguiente;
                }
                while (auxiliar != null);
            }
        }
    
        print() {
            let result = "";
            let auxiliar = this.root;
            let contador = 0;
            while (auxiliar != null) {
                if (this.contador == 0) {
                    result = auxiliar.dato;
                } else {
                    result += "|" + auxiliar.dato;
                }
                auxiliar = auxiliar.siguiente;
            }
            return result;
        }
    }
    
    class ArbolBMas {
        constructor(orden) {
            this.root = null;
            this.orden = orden;
            this.contadorAgregar = 1
            this.contadorId = 0
            this.nodoB = []
            this.edges = []
            this.data = []
        }
    
        insertar(dato) {
            let nodo = new Nodo(dato);
            this.contadorAgregar++
            if (this.root == null) {
                this.contadorId++
                this.root = new Rama(this.contadorId);
                this.root.insertar(nodo);
                return;
            } else {
                let auxiliar = this.Agregar(nodo, this.root);
                if (auxiliar instanceof Nodo) {
                    this.contadorId++
                    this.root = new Rama(this.contadorId);
                    this.root.insertar(auxiliar);
                    this.root.leave = false;
                }
    
            }
        }
    
        Agregar(nodo, rama) {
            if (rama.leave) {
                rama.insertar(nodo);
                if (rama.contador == this.orden) {
                    return this.DividirRama(rama);
                } else {
                    return rama;
                }
            } else {
                let auxiliar = rama.root;
                do {
                    if (nodo.dato == auxiliar.dato) {
                        return rama;
                    } else if (nodo.dato < auxiliar.dato) {
                        let aux = this.Agregar(nodo, auxiliar.izquierda);
                        if (aux instanceof Nodo) {
                            rama.insertar(aux);
                            if (rama.contador == this.orden) {
                                return this.DividirRama(rama);
                            }
                        }
                        return rama
    
                    } else if (auxiliar.siguiente == null) {
                        let aux = this.Agregar(nodo, auxiliar.derecha);
                        if (aux instanceof Nodo) {
                            rama.insertar(aux);
                            if (rama.contador == this.orden){
                                 return this.DividirRama(rama);
                            }
                        }
                        return rama
                    }
                    auxiliar = auxiliar.siguiente;
                } while (auxiliar != null);
            }
            return rama;
        }
    
        DividirRama(rama) {
            this.contadorId++
            let nodoDerecha = new Rama(this.contadorId);
            this.contadorId++
            let nodoIzquierda = new Rama(this.contadorId);
            let medio = null;
            let auxiliar = rama.root;
    
            let inicio = 1;
            let datoMedio = parseInt(this.orden / 2) + 1;
            let final = this.orden;
            for (let i = 1; i < this.orden + 1; i++, auxiliar = auxiliar.siguiente) {
                let nodo = new Nodo(auxiliar.dato);
                nodo.izquierda = auxiliar.izquierda;
                nodo.derecha = auxiliar.derecha;
    
                if (nodo.derecha != null && nodo.izquierda != null) {
                    nodoIzquierda.leave = false;
                    nodoDerecha.leave = false;
                }
    
                if (i >= inicio && i < datoMedio) {
                    nodoIzquierda.insertar(nodo);
                } else if (i == datoMedio) {
                    medio = nodo;
                } else if (i <= final && i > datoMedio) {
                    nodoDerecha.insertar(nodo);
                }
            }
    
            medio.izquierda = nodoIzquierda;
            medio.derecha = nodoDerecha;
            return medio;
        }
    
        print(){
            this.recorrer(this.root)
        }
    
        recorrer(rama){
            console.log(rama.print())
        }
    
        ObtenerDatos(){
            this.nodoB = []
            this.edges = []
            this.data = []
            this.ObtenerRama(this.root)
            return{nodoB: this.nodoB, edges: this.edges, array: this.data}
        }
    
        ObtenerRama(rama){
            let auxiliar = rama.root
            let text = "| "
            while(auxiliar != null){
                this.data.push(auxiliar.dato)
                text += auxiliar.dato + " | "
                auxiliar = auxiliar.siguiente
            }
            this.nodoB.push({id: rama.id*this.contadorId, label: text})
            auxiliar = rama.root
            while(auxiliar != null){
                if(auxiliar == rama.root){
                    if(auxiliar.izquierda != null){
                        this.edges.push({from: rama.id*this.contadorId, to: auxiliar.izquierda.id*this.contadorId})
                        this.ObtenerRama(auxiliar.izquierda)
                    }
                }
                if(auxiliar.derecha != null){
                    this.edges.push({from: rama.id*this.contadorId, to: auxiliar.derecha.id*this.contadorId})
                    this.ObtenerRama(auxiliar.derecha)
                }
                auxiliar = auxiliar.siguiente
            }
        }
    
        search(dato){
            this.nodoB = []
            let encontrado = this.buscar(this.root, dato)
            return{recorrido: this.nodoB, encontrado: encontrado}
        }
    
        buscar(rama, dato){
            let encontrado = false
            if(rama != null){
                this.nodoB.push(rama.id*this.contadorId)
                let auxiliar = rama.root
                while(auxiliar != null){
                    if(auxiliar.dato == dato){
                        return true
                    }
                    auxiliar = auxiliar.siguiente
                }
                auxiliar = rama.root
                while(auxiliar != null){
                    if(dato < auxiliar.dato){
                        encontrado = this.buscar(auxiliar.izquierda, dato)
                        if(encontrado == true){
                            return encontrado
                        }
                    } else if (dato > auxiliar.dato && dato < auxiliar.siguiente){
                        encontrado = this.buscar(auxiliar.derecha, dato)
                        if(encontrado == true){
                            return encontrado
                        }
                    } else if (dato > auxiliar.dato && auxiliar.siguiente == null){
                        encontrado = this.buscar(auxiliar.derecha, dato)
                        if(encontrado == true){
                            return encontrado
                        }
                    }
                    auxiliar = auxiliar.siguiente
                }
            }
            return encontrado
        }
    }