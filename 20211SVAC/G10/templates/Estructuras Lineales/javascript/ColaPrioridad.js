class NodoColaP{
    constructor(dato, prioridad = 0){
        this.valor = dato;
        this.arriba = null;
        this.abajo = null
        this.prioridad = prioridad
    }
}

class ColaPrioridad{
    constructor(){
        this.top = null
        this.bottom = null
        this.length = 0
        this.maxprioridad = 0
    }

    push(dato, prioridad){
        let nuevo = new NodoColaP(dato, prioridad);
        if (prioridad > this.maxprioridad){
            this.maxprioridad = prioridad;
        }

        if (this.length > 0){
            this.bottom.abajo = nuevo;
            nuevo.arriba = this.bottom;
            this.bottom = nuevo;
            this.length++;
        }else{
            this.bottom = nuevo;
            this.top = nuevo;
            this.length++;
        }
    }

    pushMaxP(dato){
        this.push(dato, this.maxprioridad+1);
    }

    pop(){
        let candidato = this.top;
        let actual = this.top;
        if (this.length > 0){
            while (actual != this.bottom && candidato.prioridad < this.maxprioridad){
                actual = actual.abajo;
                if (actual.prioridad > candidato.prioridad){
                    candidato = actual;
                }
            }
            if (candidato.prioridad < this.maxprioridad){
                this.maxprioridad--;
            }
            return candidato;
        }else if(this.length == 1){
            this.top = null;
            this.bottom = null;
            this.length--;
            return candidato.valor;
        }else{
            return null;
        }
    }

    actualizar(existente, nuevo){
        let nodo = this.top;
        let encontrado = false;
        let i = 0;

        while (encontrado == false && i < this.length){
            if (nodo.valor == existente){
                nodo.valor = nuevo;
                encontrado = true
            }else{
                nodo = nodo.abajo;
                i++;
            }
        }
        if (encontrado){
            console.log('Se actualizo el valor.')
        }else{
            console.log('No se encontró el dato.')
        }
    }

    buscar(dato){
        let nodo = this.top;
        let i = 0;

        while (i < this.length){
            if (nodo.valor == dato){
                return true;
            }else{
                nodo = nodo.abajo;
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
        for(let p = this.maxprioridad; p >= 0; p--){
            actual = this.top;
            while(actual != null){
                if(actual.prioridad == p){
                    console.log(actual.valor);
                }
                actual = actual.abajo;
            }
        }
    }
}

module.exports = ColaPrioridad;