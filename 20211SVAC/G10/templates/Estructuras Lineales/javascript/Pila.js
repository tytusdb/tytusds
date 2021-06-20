class NodoPila{
    constructor(dato){
        this.valor = dato;
        this.arriba = null;
        this.abajo = null
    }
}

class Pila{
    constructor(){
        this.top = null
        this.bottom = null
        this.length = 0

    }

    push(dato){
        let nuevo = new NodoPila(dato);
        if (this.length > 0){
            this.top.arriba = nuevo;
            nuevo.abajo = this.top;
            this.top = nuevo;
            this.length++;
        }else{
            this.bottom = nuevo;
            this.top = nuevo;
            this.length++;
        }
    }

    pop(){
        if (this.length > 0){
            let nodo = this.top;
            this.top = nodo.abajo;
            this.length--;
            return nodo.valor;
        }else if(this.length == 1){
            let nodo = this.top;
            this.top = null;
            this.bottom = null;
            this.length--;
            return nodo.valor;
        }else{
            return null;
        }
    }

    actualizar(existente, nuevo){
        let nodo = this.bottom;
        let encontrado = false;
        let i = 0;

        while (encontrado == false && i < this.length){
            if (nodo.valor == existente){
                nodo.valor = nuevo;
                encontrado = true
            }else{
                nodo = nodo.arriba;
                i++;
            }
        }
        if (encontrado){
            console.log('Se actualizo el valor.');
        }else{
            console.log('No se encontró el dato.');
        }
    }

    buscar(dato){
        let nodo = this.bottom;
        let i = 0;

        while (i < this.length){
            if (nodo.valor == dato){
                return true;
            }else{
                nodo = nodo.arriba;
                i++;
            }
        }

        return false;
    }

    cargar(){
        console.log('leyendo json.');
    }

    guardar(){
        console.log('guardando en json.')
    }

    mostrar(){
        let actual = this.top;
        while(actual != null){
            console.log(actual.valor);
            actual = actual.abajo;
        }
    }
}

module.exports = Pila;