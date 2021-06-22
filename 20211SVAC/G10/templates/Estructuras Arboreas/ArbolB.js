class NodoB{
    constructor(valor = null, padre = null){
        if(valor != null){
            this.primero = new Llave(valor, this);  //Al crear un nodo se crea una llave.
            this.size = 1;  //tamaño de uno por la llave
            this.padre = padre; //llave padre del nodo.
            this.tieneHijo = false;
        }else{
            this.primero = null;  //Al crear un nodo se crea una llave.
            this.size = 0;  //tamaño de uno por la llave
            this.padre = padre; //llave padre del nodo.
            this.tieneHijo = false;
        }
    }

    agregar(dato){  //metodo para agregar llave a un nodo
        let agregado = false;
        let actual = this.primero;

        if(this.primero == null){
            this.primero = new Llave(dato, this);
        }else{
            while(!agregado){
                if(actual.valor < dato){
                    if(actual.siguiente != null){ //dato es mayor y siguiente no es nulo
                        actual = actual.siguiente;
                    }else{  //dato nuevo es mayor al actual y sig es nulo
                        let nuevo = new Llave(dato, this);
                        actual.siguiente = nuevo;
                        nuevo.anterior = actual;
                        agregado = true;
                    }
                }else{  //dato nuevo es menor o igual
                    if(actual != this.primero){ //nodo actual no es el primero
                        let nuevo = new Llave(dato, this);
                        actual.anterior = actual.anterior.siguiente = nuevo;
                        nuevo.anterior = actual.anterior;
                        nuevo.siguiente = actual;
                        agregado = true;
                    }else{  //nodo actual es el primero
                        let nuevo = new Llave(dato, this);
                        actual.anterior = nuevo;
                        nuevo.siguiente = actual;
                        agregado = true;
                    }
                }
            }
        }

        
        this.size++;
    }

    agregarLlave(llave){
        let agregado = false;
        let actual = this.primero;

        if(this.primero == null){
            this.primero = new Llave(llave.valor, this);
            this.primero.nodo = this;
            this.primero
        }else{
            while(!agregado){
                if(actual.valor < llave.valor){
                    if(actual.siguiente != null){ //dato es mayor y siguiente no es nulo
                        actual = actual.siguiente;
                    }else{  //dato nuevo es mayor al actual y sig es nulo
                        let nuevo = new Llave(llave.valor, this);
                        actual.siguiente = nuevo;
                        nuevo.anterior = actual;
                        agregado = true;
                    }
                }else{  //dato nuevo es menor o igual
                    if(actual != this.primero){ //nodo actual no es el primero
                        let nuevo = new Llave(llave.valor, this);
                        actual.anterior = actual.anterior.siguiente = nuevo;
                        nuevo.anterior = actual.anterior;
                        nuevo.siguiente = actual;
                        agregado = true;
                    }else{  //nodo actual es el primero
                        let nuevo = new Llave(llave.valor, this);
                        actual.anterior = nuevo;
                        nuevo.siguiente = actual;
                        agregado = true;
                    }
                }
            }
        }

        
        this.size++;
    }

    llaveMid(pos){
        let i = 1;
        let actual = this.primero;

        while(i < pos){
            actual = actual.siguiente;
            i++;
        }
        return actual;
    }

    llave(valor){
        let actual = this.primero;
        let encontrado = false;

        while(actual != null && !encontrado){
            if(actual.valor == valor){
                encontrado = true;
            }else{
                actual = actual.siguiente;
            }
        }
        if(encontrado){
            return actual;
        }else{
            return null;
        }
    }
}

class Llave{
    constructor(dato, nodo){
        this.valor = dato;      //valor guardado
        this.derecha = null;    //nodo hijo R
        this.izquierda = null;  //nodo hijo L
        this.siguiente = null;  //llave sig
        this.anterior = null;   //llave ant
        this.nodo = nodo;       //nodo padre
    }
}

class ArbolB{
    constructor(orden){
        this.root = null;
        this.orden = orden;
        this.size = 0;
    }

    minHijos(){ //metodo para el num minimo de hijos en cada nodo, tambien para pos de llave media
        return Math.ceil(this.orden / 2);
    }

    minLlaves(){//min de llaves en un nodo
        return this.minHijos - 1;
    }

    maxLlaves(){//max llaves en un nodo
        return this.orden - 1;
    }

    maxHijos(){
        return this.orden;
    }

    agregar(dato){
        this.root = this.insertar(dato, this.root);
    }

    insertar(dato, nodo, isDerecha = null){
        if(nodo == null){   //Se cumple solo con el primer nodo raiz
            return new NodoB(dato);
        }else{
            if(nodo.tieneHijo){ //Arbol B siempre agrega en el ultimo nodo.
                let encontrado = false; //Si el nodo tiene hijo, busca donde agregarlo
                let actual = nodo.primero;
                while(!encontrado){
                    if(actual.valor < dato){
                        if(actual.siguiente != null){
                            actual = actual.siguiente;
                        }else{  //inserta un dato en el nodo hijo a la derecha
                            actual.derecha = this.insertar(dato, actual.derecha, true);
                            encontrado = true;
                        }
                    }else{  //cuando valor de actual es mayor al dato nuevo
                        if(actual != nodo.primero){ //insertando en el nodo hijo de un llave que no es primero
                            actual.izquierda = actual.anterior.derecha = this.insertar(dato, actual.izquierda, false);
                            encontrado = true;
                        }else{  //insertando a la izquierda de la primera llave
                            actual.izquierda = this.insertar(dato, actual.izquierda, false);
                            encontrado = true;
                        }
                    }
                }
            }else{  //si el nodo no tiene hijos, agrega una llave y aumenta el tamano
                nodo.agregar(dato);
                this.size++;
            }
        }
        if(isDerecha != null){
            nodo = this.update(nodo, isDerecha);    //actualiza el nodo
            
            
        }else{
            nodo = this.update(nodo);    //actualiza el nodo
        }
        return nodo;
    }

    update(nodo, isDerecha = null){
        if(nodo.size > this.maxLlaves()){
            let mid = nodo.llaveMid(this.minHijos());
            let llaveL = mid.anterior;
            let llaveR = mid.siguiente;
            let padre = null;
            let llaveP = null;
            if(nodo.padre == null){ //si no existe llave padre
                padre = new NodoB();
                padre.tieneHijo = true; 
                padre.agregarLlave(mid);
                llaveP = padre.primero;

                let nodoL = new NodoB(null,llaveP); //crea nuevo nodo hijo a la izquierda
                llaveP.izquierda = nodoL;
                
                let nueva = null;
                while(llaveL != null){  //agregando al nodo hijo L todas las llaves L
                    nodoL.agregarLlave(llaveL); //agrega nuevo valor

                    nueva = nodoL.llave(llaveL.valor);  //recibe la llave y le asigna los hijos de la anterior
                    nueva.izquierda = llaveL.izquierda;
                    nueva.derecha = llaveL.derecha;

                    llaveL = llaveL.anterior;   //sigue a la anterior llave
                }

                let nodoR = new NodoB(null,llaveP); //crea nuevo nodo hijo a la derecha
                llaveP.derecha = nodoR;

                while(llaveR != null){
                    nodoR.agregarLlave(llaveR);

                    nueva = nodoR.llave(llaveR.valor);
                    nueva.izquierda = llaveR.izquierda;
                    nueva.derecha = llaveR.derecha;

                    llaveR = llaveR.siguiente;
                }

                return padre;
            }else{  //si la llave padre existe
                padre = nodo.padre.nodo;
                padre.agregarLlave(mid);
                llaveP = padre.llave(mid.valor);

                let nodoL = new NodoB(null,llaveP); //crea nuevo nodo hijo a la izquierda
                llaveP.izquierda = nodoL;
                if(llaveP.anterior != null){    //asigna hijo a la llave adyacente si existe
                    llaveP.anterior.derecha = nodoL;
                }
                
                let nueva = null;
                while(llaveL != null){  //agregando al nodo hijo L todas las llaves L
                    nodoL.agregarLlave(llaveL); //agrega nuevo valor

                    nueva = nodoL.llave(llaveL.valor);  //recibe la llave y le asigna los hijos de la anterior
                    nueva.izquierda = llaveL.izquierda;
                    nueva.derecha = llaveL.derecha;

                    llaveL = llaveL.anterior;   //sigue a la anterior llave
                }

                let nodoR = new NodoB(null,llaveP); //crea nuevo nodo hijo a la derecha
                llaveP.derecha = nodoR;
                if(llaveP.siguiente != null){
                    llaveP.siguiente.izquierda = nodoR;
                }

                while(llaveR != null){  //lo mismo para llave derecha
                    nodoR.agregarLlave(llaveR);

                    nueva = nodoR.llave(llaveR.valor);
                    nueva.izquierda = llaveR.izquierda;
                    nueva.derecha = llaveR.derecha;

                    llaveR = llaveR.siguiente;
                }

                if(isDerecha){  //chequea si el padre que mando a llamar el metodo insertar tiene
                    return nodo.padre.derecha;  //a nodo como hijo derecha o izquierda y devuelve acorde.
                }else{
                    return nodo.padre.izquierda;
                }
            }

             
        }else{
            return nodo;
        }
    }

    elementos(nodo = this.root){
        let a = [];
        let llave = nodo.primero;
        if(nodo.tieneHijo){
            a = a.concat(this.elementos(llave.izquierda));
            while(llave != null){
                a[a.length] = llave.valor;
                a = a.concat(this.elementos(llave.derecha));
                llave = llave.siguiente;
            }
        }else{
            while(llave != null){
                a[a.length] = llave.valor;
                llave = llave.siguiente;
            }
        }
        return a;
    }


    eliminar(dato){
        if(this.buscar(dato)){
            let elementos = this.elementos();
            this.root = null;
            let borrado = false;
            for(let i = 0; i < elementos.length; i++){
                if(!borrado){
                    if(elementos[i] != dato){
                        this.agregar(elementos[i]);
                    }else{
                        borrado = true;
                    }
                }else{
                    this.agregar(elementos[i]);
                }
            }
            this.size--;
        }else{
            console.log('Este dato no existe el dato en el arbol.')
        }
    }

    buscar(dato){
        let actual = this.root;
        let llave = actual.primero;
        let ultimo = false;
        let siguiente = false;

        while(!ultimo){ //ciclo buscando en nodos
            llave = actual.primero;
            siguiente = false;

            while(!siguiente){  //ciclo buscando en llaves

                if(llave.valor < dato){ //valor de la llave es menor
                    if(llave.siguiente != null){    //siguiente nodo no es nulo
                        llave = llave.siguiente;    //pasa a llave siguiente
                    }else{  //siguiente nodo es nulo
                        if(actual.tieneHijo){   //llave tiene hijo
                            actual = llave.derecha; //pasa a nodo hijo derecha
                            siguiente = true;
                        }else{  //llave no tiene hijo
                            ultimo = true;
                            siguiente = true;   //sale del ciclo
                        }
                    }

                }else if(llave.valor > dato){   //valor de la llave es mayor
                    if(actual.tieneHijo){   //llave tiene nodo hijo
                        actual = llave.izquierda;   //pasa a nodo hijo izquierda
                        siguiente = true;
                    }else{  //llave no tiene hijo
                        ultimo = true;
                        siguiente = true;   //sale del ciclo
                    }
                    
                }else{  //valor de la llave no es mayor ni menor, es igual
                    return true;
                }
            }
        }
        return false;   //si se sale del ciclo quiere decir que llego al final sin encontrar dato
    }

    llave(dato){
        let actual = this.root;
        let llave = actual.primero;
        let ultimo = false;
        let siguiente = false;

        while(!ultimo){ //ciclo buscando en nodos
            llave = actual.primero;
            siguiente = false;

            while(!siguiente){  //ciclo buscando en llaves

                if(llave.valor < dato){ //valor de la llave es menor
                    if(llave.siguiente != null){    //siguiente nodo no es nulo
                        llave = llave.siguiente;    //pasa a llave siguiente
                    }else{  //siguiente nodo es nulo
                        if(actual.tieneHijo){   //llave tiene hijo
                            actual = llave.derecha; //pasa a nodo hijo derecha
                            siguiente = true;
                        }else{  //llave no tiene hijo
                            ultimo = true;
                            siguiente = true;   //sale del ciclo
                        }
                    }

                }else if(llave.valor > dato){   //valor de la llave es mayor
                    if(actual.tieneHijo){   //llave tiene nodo hijo
                        actual = llave.izquierda;   //pasa a nodo hijo izquierda
                        siguiente = true;
                    }else{  //llave no tiene hijo
                        ultimo = true;
                        siguiente = true;   //sale del ciclo
                    }
                    
                }else{  //valor de la llave no es mayor ni menor, es igual
                    return llave;
                }
            }
        }
        return null;   //si se sale del ciclo quiere decir que llego al final sin encontrar dato
    }

    actualizar(existente, nuevo){
        if(this.buscar(existente)){
            this.eliminar(existente);
            this.agregar(nuevo);
        }else{
            console.log('El dato no existe en el arbol.')
        }
    }

    cargar(ruta){
        console.log('Leyendo json');
    }

    guardar(ruta){
        console.log('Guardando en json');
    }
}

module.exports = ArbolB;