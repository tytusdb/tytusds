class Nodo{
    constructor(valor, x, y){
        this.valor = valor; //valor con el que vamos a comparar
        this.x = x; //posicion en la cabecera en horizontal 
        this.y = y; //posicion en la cabecera en vertical
        this.siguiente = null; //enlace para la cabecera en x
        this.anterior = null; //enlace para la cabecera en y
        this.arriba = null; //enlace para moverse hacia arriba en el nodo matriz
        this.abajo = null; //enlace para moverse hacia abajo en el nodo matriz
        this.izquierda = null; //enlace para moverse hacia la izquierda en el nodo matriz
        this.derecha = null; //enlace para moverse hacia la derecha en el nodo matriz
    }
}

class Lista{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    ordenar(nodo){
        let aux = this.primero;
        while(aux != null){
            if(aux.valor < nodo.valor){
                aux = aux.siguiente;
            }else{
                if(aux == this.primero){
                    nodo.siguiente = aux;
                    aux.anterior = nodo;
                    this.primero = nodo;
                    return;
                }else{
                    nodo.anterior = aux.anterior;
                    aux.anterior.siguiente = nodo;
                    nodo.siguiente = aux;
                    aux.anterior = nodo;
                    return;
                }
            }
        }
        this.ultimo.siguiente = nodo;
        nodo.anterior = this.ultimo;
        this.ultimo = nodo;
    }

    insertar(valor){
        let nodo = new Nodo(valor, null, null)
        if(this.primero == null){
            this.primero = this.ultimo = nodo;
            return;
        }
        this.ordenar(nodo);
    }

    busqueda(valor){
        let temp = this.primero;
        while(temp != null){
            if(temp.valor == valor) return temp;
            temp = temp.siguiente;
        }
        return null;
    }
}

class Matriz{
    constructor(){
        this.lista_horizontal = new Lista();
        this.lista_vertical = new Lista();
    }

    insertar(valor, x, y){
        let nodo_x = this.lista_horizontal.busqueda(x);
        let nodo_y = this.lista_vertical.busqueda(y);

        if(nodo_x == null && nodo_y == null){
            this.caso1(valor, x, y);
        }else if(nodo_x == null && nodo_y != null){
            this.caso2(valor, x, y);
        }else if(nodo_x != null && nodo_y == null){
            this.caso3(valor, x, y);
        }else{
            this.caso4(valor, x, y);
        }
    }

    caso1(valor, x, y){
        this.lista_horizontal.insertar(x);
        this.lista_vertical.insertar(y);

        let nodo_x = this.lista_horizontal.busqueda(x);
        let nodo_y = this.lista_vertical.busqueda(y);

        let nuevo = new Nodo(valor, x, y);
        nodo_x.abajo = nuevo;
        nuevo.arriba = nodo_x;

        nodo_y.derecha = nuevo;
        nuevo.izquierda = nodo_y;
    }

    caso2(valor, x, y){
        this.lista_horizontal.insertar(x);

        let nodo_x = this.lista_horizontal.busqueda(x);
        let nodo_y = this.lista_vertical.busqueda(y);

        let agregado = false;

        let nuevo = new Nodo(valor, x, y);
        let aux = nodo_y.derecha;// nos movemos hacia la derecha una posicion
        let cabecera = 0;

        while(aux != null){
            cabecera = aux.x;
            if(cabecera < x){
                aux = aux.derecha;
            }else{
                nuevo.derecha = aux;
                nuevo.izquierda = aux.izquierda;
                aux.izquierda.derecha = nuevo;
                aux.izquierda = nuevo;
                agregado = true;
                break;
            }
        }
        if(agregado == false){
            aux = nodo_y.derecha;
            while(aux.derecha != null){
                aux = aux.derecha;
            }
            nuevo.izquierda = aux;
            aux.derecha = nuevo;
        }

        nodo_x.abajo = nuevo;
        nuevo.arriba = nodo_x;
    }

    caso3(valor, x, y){
        this.lista_vertical.insertar(y);

        let nodo_x = this.lista_horizontal.busqueda(x);
        let nodo_y = this.lista_vertical.busqueda(y);

        let agregado = false;

        let nuevo = new Nodo(valor, x, y);
        let aux = nodo_x.abajo;
        let cabecera = 0;

        while(aux != null && !agregado){
            cabecera = aux.y
            if(cabecera < y){
                aux = aux.abajo;
            }else{
                nuevo.abajo = aux;
                nuevo.arriba = aux.arriba;
                aux.arriba.abajo = nuevo;
                aux.arriba = nuevo;
                agregado = true;
            }
        }
        if(!agregado){
            aux = nodo_x.abajo;
            while(aux.abajo != null){
                aux = aux.abajo;
            }
            aux.abajo = nuevo;
            nuevo.arriba = aux;
        }

        nodo_y.derecha = nuevo;
        nuevo.izquierda = nodo_y;
    }

    caso4(valor, x, y){

        let nodo_x = this.lista_horizontal.busqueda(x);
        let nodo_y = this.lista_vertical.busqueda(y);

        let agregado = false;
        let nuevo = new Nodo(valor, x, y);
        let aux = nodo_y.derecha;
        let cabecera = 0;
        while(aux != null){
            cabecera = aux.x;
            if(cabecera < x){
                aux = aux.derecha;
            }else{
                nuevo.derecha = aux;
                nuevo.izquierda = aux.izquierda;
                aux.izquierda.derecha = nuevo;
                aux.izquierda = nuevo;
                agregado = true;
                break;
            }
        }
        if(agregado == false){
            aux = nodo_y.derecha;
            while(aux.derecha != null){
                aux = aux.derecha;
            }
            nuevo.izquierda = aux;
            aux.derecha = nuevo;
        }

        agregado = false;
        aux = nodo_x.abajo;
        cabecera = 0;

        while(aux != null && !agregado){
            cabecera = aux.y;
            if(cabecera < y){
                aux = aux.abajo;
            }else{
                nuevo.abajo = aux;
                nuevo.arriba = aux.arriba;
                aux.arriba.abajo = nuevo;
                aux.arriba = nuevo;
                agregado = true;
            }
        }

        if(!agregado){
            aux = nodo_x.abajo;
            while(aux.abajo != null){
                aux = aux.abajo;
            }
            aux.abajo = nuevo;
            nuevo.arriba = aux;
        }
    }

    imprimir_vertical(){
        let cabecera = this.lista_vertical.primero;
        let aux;
        while(cabecera != null){
            aux = cabecera.derecha;
            while(aux != null){
                console.log("valor: ", aux.valor, "x: ", aux.x, "y: ", aux.y);
                aux = aux.derecha;
            }
            cabecera = cabecera.siguiente;
        }
    }

    imprimir_horizontal(){
        let cabecera = this.lista_horizontal.primero;
        let aux;
        while(cabecera != null){
            aux = cabecera.abajo;
            while(aux != null){
                console.log("valor: ", aux.valor, "x: ", aux.x, "y: ", aux.y);
                aux = aux.abajo;
            }
            cabecera = cabecera.siguiente;
        }
    }
}

module.exports = Matriz;