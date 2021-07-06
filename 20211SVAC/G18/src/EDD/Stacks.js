class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor(){
        this.top = null;
        this.bottom = null;
        this.length = 0;
    }

    peek(){
        return this.top;
    }

    push (value){
        const newNode = new Node(value);

        //validacion

        if (this.length === 0) {
            this.top = newNode;
            this.bottom = newNode;
        }else {
            const holdingPointer = this.top;
            this.top = newNode;
            this.top.next = holdingPointer;
        }

        this.length++;

        return this;
    }

    pop(){
        if (!this.length){
            console.error("No nodes in the stack");
            return;
        }

        const topNode = this.top;

        if(this.length === 1){
            this.top = null;
            this.bottom = null;
        }else {
            this.top = this.top.next;
        }
        this.length--;
        return topNode;
    }

    get(index){
        let nodo = this.top
        for(let i =0; i<this.length; i++ ){
            if(i==index){
                break
            }
            nodo = nodo.next
        }
        return nodo
    }

    
        modificar(valor, nuevo) {
		if (this.top != null) {
			if (this.top.value == valor) {
				this.top.value = nuevo
			} else {
				let aux = this.top
				while (aux != null) {
					if (aux.value == valor) {
						aux.value = nuevo
						break
					}
					aux = aux.next
				}
			}
		}
	}

    buscar(valor) {
		if (this.top != null) {
			let aux = this.top
			while (aux != null) {
				if (aux.value == valor.toString() ) {
					return aux
				}
				aux = aux.next
			}
		}
		return null
	}


    obtenerIndice(valor) {
		let nodo = this.top
		let indice = 0

		for (let i = 0; i < this.length; i++) {
			if (nodo.value.toString() === valor.toString()) {
				indice = i
				break
			}
			nodo = nodo.next
		}

		return indice
	}

    
    
}

export default Stack
