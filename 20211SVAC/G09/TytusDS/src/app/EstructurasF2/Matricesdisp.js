class Nodo {
    constructor(valor, x, y) {
        this.valor = valor;//Valor con el que vamos a comparar
        this.x = x;//posicion en la cabecera en horizontal
        this.y = y;//posicion en la cabecera en vertical
        this.arriba = null;//enlace para moverse hacia arriba en el nodo matriz
        this.abajo = null;//enlace para moverse hacia abajo en el nodo matriz
        this.izquierda = null;//enlace para moverse hacia izquierda en el nodo matriz
        this.derecha = null;//enlace para moverse hacia derecha en el nodo matriz
        this.siguiente = null;//enlace para la cabecera en x
        this.anterior = null;//enlace para la cabera en y
    }
}

class Lista {
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }

    ordenar(nodo) {
        let aux = this.primero;
        while (aux != null) {
            if (aux.valor < nodo.valor) {
                aux = aux.siguiente;
            } else {
                if (aux != this.primero) {
                    nodo.anterior = aux.anterior;
                    aux.anterior.siguiente = nodo;
                    nodo.siguiente = aux;
                    aux.anterior = nodo;
                    return;                    
                } else {
                    nodo.siguiente = aux;
                    aux.anterior = nodo
                    this.primero = nodo
                    return
                }
            }
        }
        this.ultimo.siguiente = nodo;
        nodo.anterior = this.ultimo;
        this.ultimo = nodo;
    }

    insertar(valor) {
        let nodo = new Nodo(valor, null, null)
        if (this.primero == null) {
            this.primero = this.ultimo = nodo;
            return;
        }
        this.ordenar(nodo);
    }

    busqueda(valor) {
        let temp = this.primero
        while (temp != null) {
            if (temp.valor == valor) return temp
            temp = temp.siguiente
        }
        return null
    }
    existe(valor) {
        let temp = this.primero
        while (temp != null) {
            if (temp.valor == valor) return true
            temp = temp.siguiente
        }
        return false
    }
}

class Matriz {
    constructor() {
        this.lista_horizontal = new Lista();
        this.lista_vertical = new Lista();
    }

    insertar(valor, x, y) {
        let nodo_x = this.lista_horizontal.existe(x);
        let nodo_y = this.lista_vertical.existe(y);

        if (!nodo_x && !nodo_y) {//Si no encontro entonces retorna falso, por lo que hay que por "!"para que cambie
            this.caso1(valor, x, y);//No existe ninguna cabecera
        } else if (!nodo_x && nodo_y) {//No existe la cabecera en x
            this.caso2(valor, x, y);
        } else if (nodo_x && !nodo_y) {//No existe la cabecera en y
            this.caso3(valor, x, y);
        } else {//las dos caberas existen
            this.caso4(valor, x, y);
        }
    }

    caso1(valor, x, y) {
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

    caso2(valor, x, y) {
        this.lista_horizontal.insertar(x);

        let nodo_x = this.lista_horizontal.busqueda(x);
        let nodo_y = this.lista_vertical.busqueda(y);

        let agregado = false;

        let nuevo = new Nodo(valor, x, y);
        let aux = nodo_y.derecha;// nos movemos hacia la derecha una posicion
        let cabecera = 0;

        while (aux != null) {
            cabecera = aux.x;
            if (cabecera < x) { // 3 < 4
                aux = aux.derecha;
            } else {
                nuevo.derecha = aux;//aux toma valor de nodo(2)
                nuevo.izquierda = aux.izquierda;
                aux.izquierda.derecha = nuevo;
                aux.izquierda = nuevo;
                agregado = true;
                break;
            }
        }

        if (!agregado) {
            aux = nodo_y.derecha;
            while (aux.derecha != null) {
                aux = aux.derecha;
            }
            nuevo.izquierda = aux;
            aux.derecha = nuevo;
        }

        nodo_x.abajo = nuevo;
        nuevo.arriba = nodo_x;
    }

    caso3(valor, x, y) {
        // solo existe la cabecera en x
        this.lista_vertical.insertar(y) // inserta la cabecera en y

        let nodo_x = this.lista_horizontal.busqueda(x);
        let nodo_y = this.lista_vertical.busqueda(y);

        let agregado = false;

        let nuevo = new Nodo(valor, x, y);//interno de matriz
        let aux = nodo_x.abajo; // obtenemos el primer nodo de la cabecera
        let cabecera = 0;

        while (aux != null && !agregado) {
            cabecera = aux.y;//1
            if (cabecera < y) {//1<2;2<2;3<2
                aux = aux.abajo;//aux-> nodo(valor:3, x:2, y:3)
            } else {
                nuevo.abajo = aux;
                nuevo.arriba = aux.arriba;
                aux.arriba.abajo = nuevo;
                aux.arriba = nuevo;
                agregado = true;
            }
        }

        if (!agregado) {
            aux = nodo_x.abajo;
            while (aux.abajo != null) {
                aux = aux.abajo;
            }
            aux.abajo = nuevo;
            nuevo.arriba = aux;
        }

        nodo_y.derecha = nuevo;
        nuevo.izquierda = nodo_y;
    }

    caso4(valor, x, y) {

        let nodo_x = this.lista_horizontal.busqueda(x);
        let nodo_y = this.lista_vertical.busqueda(y);

        let agregado = false;
        let nuevo = new Nodo(valor, x, y);
        let aux = nodo_y.derecha;
        let cabecera = 0;
        while (aux != null) {
            cabecera = aux.x;
            if (cabecera < x) {
                aux = aux.derecha;
            } else {
                nuevo.derecha = aux;
                nuevo.izquierda = aux.izquierda;
                aux.izquierda.derecha = nuevo;
                aux.izquierda = nuevo;
                agregado = true;
                break;
            }
        }
        if (!agregado) {
            aux = nodo_y.derecha;
            while (aux.derecha != null) {
                aux = aux.derecha;
            }
            nuevo.izquierda = aux;
            aux.derecha = nuevo;
        }

        agregado = false;
        aux = nodo_x.abajo;
        cabecera = 0;

        while (aux != null && !agregado) {
            cabecera = aux.y;
            if (cabecera < y) {
                aux = aux.abajo;
            } else {
                nuevo.abajo = aux;
                nuevo.arriba = aux.arriba;
                aux.arriba.abajo = nuevo;
                aux.arriba = nuevo;
                agregado = true;
            }
        }

        if (!agregado) {
            aux = nodo_x.abajo;
            while (aux.abajo != null) {
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
            while(aux!=null){
                console.log("Valor:",aux.valor, "X:", aux.x, "Y:", aux.y);
                aux = aux.derecha//iteraciones dentro de la matriz;
            }
            cabecera = cabecera.siguiente;//iteraciones de lista ordenada
        }
    }

    imprimir_horizontal(){
        let cabecera = this.lista_horizontal.primero;
        let aux;
        while(cabecera != null){
            aux = cabecera.abajo;
            while(aux!= null){
                console.log("Valor:",aux.valor, "X:", aux.x, "Y:", aux.y);
                aux = aux.abajo;
            }
            cabecera = cabecera.siguiente;
        }
    }
}
let a= new Matriz()

addMatriz("DC",0,0)
addMatriz("DD",0,2)
addMatriz("2D",2,1)
addMatriz("53D",3,9)
addMatriz("21D",0,12)
addMatriz("D432",5,5)

function addMatriz(valor, x, y) {
    a.insertar(valor,x,y)
}

module.exports = Matriz;
