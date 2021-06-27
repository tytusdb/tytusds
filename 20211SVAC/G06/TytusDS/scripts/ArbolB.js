class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.anterior = null;
        this.siguiente = null;
        this.der = null;
        this.izq = null;
    }
}

class Rama {
    constructor(id) {
        this.cont = 0;//contador de elementos insertados
        this.leave = true;//Si es hoja el nodo que vamos a insertar
        this.root = null;//El inicio de la lista
        this.id = id
    }

    insertar(nodo) {
        if (this.root == null) {
            this.root = nodo;
            this.cont++;
        } else {
            let temp = this.root;
            do {
                if (nodo.valor <= temp.valor) {
                    this.cont++;
                    if (temp == this.root) {
                        this.root.anterior = nodo;
                        nodo.siguiente = this.root
                        this.root.izq = nodo.der;
                        this.root = nodo;
                        break;
                    } else {
                        nodo.anterior = temp.anterior;
                        nodo.siguiente = temp;
                        temp.anterior.siguiente = nodo;
                        temp.anterior.der = nodo.izq;
                        temp.anterior = nodo;
                        temp.izq = nodo.der;
                        break;
                    }
                } else if (temp.siguiente == null) {
                    this.cont++;
                    temp.siguiente = nodo;
                    temp.der = nodo.izq;
                    nodo.anterior = temp;
                    nodo.siguiente = null;
                    break;
                }
                temp = temp.siguiente;
            }
            while (temp != null);
        }
    }

    print() {
        let result = "";
        let temp = this.root;
        let cont = 0;
        while (temp != null) {
            if (this.cont == 0) {
                result = temp.valor;
            } else {
                result += "|" + temp.valor;
            }
            temp = temp.siguiente;
        }
        return result;
    }
}

class ArbolB {
    constructor(orden) {
        this.root = null;
        this.orden = orden;
        this.contAdd = 1
        this.contId = 0
        this.nodes = []
        this.edges = []
        this.data = []
    }

    insertar(valor) {
        let nodo = new Nodo(valor);
        this.contAdd++
        if (this.root == null) {
        	this.contId++
            this.root = new Rama(this.contId);
            this.root.insertar(nodo);
            return;
        } else {
            let temp = this.add(nodo, this.root);
            if (temp instanceof Nodo) {
            	this.contId++
                this.root = new Rama(this.contId);
                this.root.insertar(temp);
                this.root.leave = false;
            }

        }
    }

    add(nodo, rama) {
        if (rama.leave) {
            rama.insertar(nodo);
            if (rama.cont == this.orden) {
                return this.dividirRama(rama);
            } else {
                return rama;
            }
        } else {
            let temp = rama.root;
            do {
                if (nodo.valor == temp.valor) {
                    return rama;
                } else if (nodo.valor < temp.valor) {
                    let aux = this.add(nodo, temp.izq);
                    if (aux instanceof Nodo) {
                        rama.insertar(aux);
                        if (rama.cont == this.orden) {
                            return this.dividirRama(rama);
                        }
                    }
                    return rama

                } else if (temp.siguiente == null) {
                    let aux = this.add(nodo, temp.der);
                    if (aux instanceof Nodo) {
                        rama.insertar(aux);
                        if (rama.cont == this.orden){
                        	 return this.dividirRama(rama);
                        }
                    }
                    return rama
                }
                temp = temp.siguiente;
            } while (temp != null);
        }
        return rama;
    }

    dividirRama(rama) {
    	this.contId++
        let derecha = new Rama(this.contId);
        this.contId++
        let izquierda = new Rama(this.contId);
        let medio = null;
        let temp = rama.root;

        let inicio = 1;
        let valorMedio = parseInt(this.orden / 2) + 1;
        let final = this.orden;
        for (let i = 1; i < this.orden + 1; i++, temp = temp.siguiente) {
            let nodo = new Nodo(temp.valor);
            nodo.izq = temp.izq;
            nodo.der = temp.der;

            if (nodo.der != null && nodo.izq != null) {
                izquierda.leave = false;
                derecha.leave = false;
            }

            if (i >= inicio && i < valorMedio) {
                izquierda.insertar(nodo);
            } else if (i == valorMedio) {
                medio = nodo;
            } else if (i <= final && i > valorMedio) {
                derecha.insertar(nodo);
            }
        }

        medio.izq = izquierda;
        medio.der = derecha;
        return medio;
    }

    print(){
    	this.recorrer(this.root)
    }

    recorrer(rama){
    	console.log(rama.print())
    }

    getData(){
    	this.nodes = []
    	this.edges = []
    	this.data = []
    	this.getRamas(this.root)
    	return{nodes: this.nodes, edges: this.edges, array: this.data}
    }

    getRamas(rama){
    	let tmp = rama.root
    	let text = "| "
    	while(tmp != null){
    		this.data.push(tmp.valor)
    		text += tmp.valor + " | "
    		tmp = tmp.siguiente
    	}
    	this.nodes.push({id: rama.id*this.contId, label: text})
    	//Ahora recusrividad
    	tmp = rama.root
    	while(tmp != null){
    		if(tmp == rama.root){
    			if(tmp.izq != null){
    				this.edges.push({from: rama.id*this.contId, to: tmp.izq.id*this.contId})
    				this.getRamas(tmp.izq)
    			}
    		}
    		if(tmp.der != null){
    			this.edges.push({from: rama.id*this.contId, to: tmp.der.id*this.contId})
    			this.getRamas(tmp.der)
    		}
    		tmp = tmp.siguiente
    	}
    }

    search(valor){
    	this.nodes = []
    	let encontrado = this.buscar(this.root, valor)
    	return{recorrido: this.nodes, encontrado: encontrado}
    }

    buscar(rama, valor){
    	let encontrado = false
    	if(rama != null){
	    	this.nodes.push(rama.id*this.contId)
	    	let tmp = rama.root
	    	while(tmp != null){
	    		if(tmp.valor == valor){
	    			return true
	    		}
	    		tmp = tmp.siguiente
	    	}
	    	//Ahora recusrividad
	    	tmp = rama.root
	    	while(tmp != null){
	    		if(valor < tmp.valor){
	    			encontrado = this.buscar(tmp.izq, valor)
	    			if(encontrado == true){
	    				return encontrado
	    			}
	    		} else if (valor > tmp.valor && valor < tmp.siguiente){
	    			encontrado = this.buscar(tmp.der, valor)
	    			if(encontrado == true){
	    				return encontrado
	    			}
	    		} else if (valor > tmp.valor && tmp.siguiente == null){
	    			encontrado = this.buscar(tmp.der, valor)
	    			if(encontrado == true){
	    				return encontrado
	    			}
	    		}
	    		tmp = tmp.siguiente
	    	}
    	}
    	return encontrado
    }
}
