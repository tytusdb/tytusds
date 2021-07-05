class Nodo {
    constructor(valor, x, y) {
        this.valor = valor;//Valor con el que vamos a comparar
        this.x = x;//posicion en la cabecera en horizontal
        this.y = y;//posicion en la cabecera en vertical
        this.siguiente = null;//enlace para la cabecera en x
        this.anterior = null;//enlace para la cabera en y
        this.arriba = null;//enlace para moverse hacia arriba en el nodo matriz
        this.abajo = null;//enlace para moverse hacia abajo en el nodo matriz
        this.izquierda = null;//enlace para moverse hacia izquierda en el nodo matriz
        this.derecha = null;//enlace para moverse hacia derecha en el nodo matriz
        this.id = newId()
    }
}

let contadorId = 0

function newId(){
	contadorId++
	return contadorId
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
                if (aux == this.primero) {
                    nodo.siguiente = aux;
                    aux.anterior = nodo;
                    this.primero = nodo;
                    return;
                } else {
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

    insertar(valor) {
        let nodo = new Nodo(valor, null, null)
        if (this.primero == null) {
            this.primero = this.ultimo = nodo;
            return;
        }
        this.ordenar(nodo);
    }

    busqueda(valor) {
        let temp = this.primero;
        while (temp != null) {
            if (temp.valor == valor) return temp;
            temp = temp.siguiente;
        }
        return null;
    }

    deleteEmptyList(tipo){
    	let tmp = this.primero
    	while(tmp != null){
    		if(tipo == "vertical" && tmp.derecha == null){
    			//Eliminamos el nodo
    			if(tmp == this.primero && tmp == this.ultimo){
    				this.primero = null
    				this.ultimo = null
    				return
    			} else if (tmp == this.primero){
    				tmp.siguiente.anterior = null
    				this.primero = tmp.siguiente
    				return
    			} else if (tmp == this.ultimo){
    				tmp.anterior.siguiente = null
    				this.ultimo = tmp.anterior
    				return
    			} else {
    				tmp.anterior.siguiente = tmp.siguiente
    				tmp.siguiente.anterior = tmp.anterior
    				return
    			}
    		}
    		if(tipo == "horizontal" && tmp.abajo == null){
    			//Eliminamos el nodo
    			if(tmp == this.primero && tmp == this.ultimo){
    				this.primero = null
    				this.ultimo = null
    				return
    			} else if (tmp == this.primero){
    				tmp.siguiente.anterior = null
    				this.primero = tmp.siguiente
    				return
    			} else if (tmp == this.ultimo){
    				tmp.anterior.siguiente = null
    				this.ultimo = tmp.anterior
    				return
    			} else {
    				tmp.anterior.siguiente = tmp.siguiente
    				tmp.siguiente.anterior = tmp.anterior
    				return
    			}
    		}
    		tmp = tmp.siguiente
    	}
    }

}

class Matriz {
    constructor() {
        this.lista_horizontal = new Lista();
        this.lista_vertical = new Lista();
    }

    existNode(valor, x, y){
    	let recorrido = []
        let cabecera = this.lista_vertical.primero;
        let aux;
        while(cabecera != null){
        	recorrido.push(cabecera.id)
            aux = cabecera.derecha;
            while(aux!=null){
            	recorrido.push(aux.id)
                if(aux.x == x && aux.y == y){
                	aux.valor = valor
                	return true
                }
                aux = aux.derecha
            }
            cabecera = cabecera.siguiente
        }
        return false
    }

    insertar(valor, x, y) {
    	if(this.existNode(valor, x, y)) return
        let nodo_x = this.lista_horizontal.busqueda(x);
        let nodo_y = this.lista_vertical.busqueda(y);

        if (nodo_x == null && nodo_y == null) {
            this.caso1(valor, x, y);
        } else if (nodo_x == null && nodo_y != null) {
            this.caso2(valor, x, y);
        } else if (nodo_x != null && nodo_y == null) {
            this.caso3(valor, x, y);
        } else {
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

        if (agregado == false) {
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
        if (agregado == false) {
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

    search(valor){
    	let recorrido = []
        let cabecera = this.lista_vertical.primero;
        let aux;
        while(cabecera != null){
        	recorrido.push(cabecera.id)
            aux = cabecera.derecha;
            while(aux!=null){
            	recorrido.push(aux.id)
                if(aux.valor == valor){
                	return{recorrido: recorrido, encontrado: true}
                }
                aux = aux.derecha
            }
            cabecera = cabecera.siguiente
        }
        return{recorrido: recorrido, encontrado: false}
    }

    update(valor, nuevoValor){
    	let recorrido = []
        let cabecera = this.lista_vertical.primero;
        let aux;
        while(cabecera != null){
        	recorrido.push(cabecera.id)
            aux = cabecera.derecha;
            while(aux!=null){
            	recorrido.push(aux.id)
                if(aux.valor == valor){
                	aux.valor = nuevoValor
                	return{recorrido: recorrido, encontrado: true, actualizado: aux.id}
                }
                aux = aux.derecha
            }
            cabecera = cabecera.siguiente
        }
        return{recorrido: recorrido, encontrado: false, actualizado: null}
    }

    delete(valor){
    	let recorrido = []
        let cabecera = this.lista_vertical.primero;
        let aux;
        while(cabecera != null){
        	recorrido.push(cabecera.id)
            aux = cabecera.derecha;
            while(aux!=null){
            	recorrido.push(aux.id)
                if(aux.valor == valor){
                	//Eliminamos horizontalmente
                	if(aux.izquierda != null) aux.izquierda.derecha = aux.derecha
                	if(aux.derecha != null) aux.derecha.izquierda = aux.izquierda
                	if(aux.arriba != null) aux.arriba.abajo = aux.abajo
                	if(aux.abajo != null) aux.abajo.arriba = aux.arriba
                	//Ahora intentamos ver que onda
                	this.lista_vertical.deleteEmptyList("vertical")
                	this.lista_horizontal.deleteEmptyList("horizontal")
                	return{recorrido: recorrido, encontrado: true}
                }
                aux = aux.derecha
            }
            cabecera = cabecera.siguiente
        }
        return{recorrido: recorrido, encontrado: false}
    }

    getValores(){
    	let valores = []
        let cabecera = this.lista_vertical.primero;
        let aux;
        while(cabecera != null){
            aux = cabecera.derecha;
            while(aux!=null){
                valores.push({
                	indices: [aux.x, aux.y],
                	valor: aux.valor
                })
                aux = aux.derecha//iteraciones dentro de la matriz;
            }
            cabecera = cabecera.siguiente;//iteraciones de lista ordenada
        }
        return valores
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
                console.log("Valor:",aux.valor, "X:", aux.x, "Y:", aux.y, " Id: ", aux.id);
                aux = aux.abajo;
            }
            cabecera = cabecera.siguiente;
        }
    }

    createGraph(){
    	let dot = 'digraph G{'
    	dot += 'Principal[label="Matriz", shape=circle, style=filled, color="#FA4964"];'
    	//Ahora graficamos verticalmente
    	let cabecera = this.lista_vertical.primero
    	while(cabecera != null){
    		dot += cabecera.id + '[label="' + cabecera.valor + '", shape=box, style=filled, color="#7C68DC"];'
    		if(cabecera.anterior != null){
    			dot += cabecera.anterior.id + '->' + cabecera.id + '[dir="both", label="y"];'
    		} else {
    			dot += 'Principal->' + cabecera.id + '[dir="both", label="y"];'
    		}
    		let aux = cabecera.abajo
    		cabecera = cabecera.siguiente
    	}
    	//Ahora graficamos horizontalmente
    	cabecera = this.lista_horizontal.primero
    	while(cabecera != null){
    		dot += cabecera.id + '[label="' + cabecera.valor + '", shape=box, style=filled, color="#7C68DC"];'
    		if(cabecera.anterior != null){
    			dot += cabecera.anterior.id + '->' + cabecera.id + '[dir="both", label="x"];'
    		} else {
    			dot += 'Principal->' + cabecera.id + '[dir="both", label="x"];'
    		}
    		let aux = cabecera.abajo
    		cabecera = cabecera.siguiente
    	}
    	//Ahora cada nodo
    	cabecera = this.lista_vertical.primero
    	while(cabecera != null){
    		let tmp = cabecera.derecha
    		while(tmp != null){
    			dot += tmp.id + '[label="' + tmp.valor + '", style=filled, color="#68DCD5"];'
    			if(tmp.izquierda != null){
    				dot += tmp.izquierda.id + '->' + tmp.id + '[dir="both"];'
    			}
    			if(tmp.arriba != null){
    				dot += tmp.arriba.id + '->' + tmp.id + '[dir="both"];'
    			}
    			tmp = tmp.derecha
    		}
    		cabecera = cabecera.siguiente
    	}
    	dot += '}'
    	return dot
    }
}

function exec(){
	let matricita = new Matriz()
	matricita.insertar("Hola", 0,0)
	matricita.insertar("Pepe", 6,2)
	matricita.imprimir_horizontal()
}

//exec()