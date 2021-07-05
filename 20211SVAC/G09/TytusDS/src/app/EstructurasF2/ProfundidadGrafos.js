class ProfundidadGrafos{
    constructor() {
        this.DatoNodo = [];
        this.id = 1;
    }

    getKey(DatoActual) {
        let hash = 0
        if (typeof DatoActual === 'string') {
            for (let i = 0; i < DatoActual.length; i++) {
                hash += DatoActual.charCodeAt(i)
            }
        } else {
            hash = DatoActual
        }
        return hash
    }

    ObtenerDato() {
        return this.DatoNodo
    }

    ObtenerArista(DatoActual) {
        for (let i = 0; i < this.DatoNodo.length; i++) {
            if (this.DatoNodo[i].Vertices == DatoActual) {
                return this.DatoNodo[i].id
            }
        }
        return null
    }

    ActualizarNodo(DatoActual, NuevoDato) {
        var NodoActualizar
        for (let i = 0; i < this.DatoNodo.length; i++) {
            if (this.DatoNodo[i].Vertices == DatoActual) {
                NodoActualizar = this.DatoNodo[i].id
                this.DatoNodo[i].Vertices = NuevoDato
                continue
            }
            for (let j = 0; j < this.DatoNodo[i].Aristas.length; j++) {
                if (this.DatoNodo[i].Aristas[j] == DatoActual) {
                    this.DatoNodo[i].Aristas[j] = NuevoDato
                    this.Insertar(this.DatoNodo[i].Aristas)
                    continue
                }

            }
        }
        return NodoActualizar
    }

    Insertar(array) {
        for (let i = 1; i < array.length; i++) {
            let key = array[i]
            let j = i - 1
            while (j >= 0 && this.getKey(array[j]) > this.getKey(key)) {
                array[j + 1] = array[j]
                j = j - 1
            }
            array[j + 1] = key
        }
    }

    AgregarNodo(DatoActual) {
        let nodo = {
            Vertices: DatoActual,
            id: this.id++,
            Aristas: []
        }
        this.DatoNodo.push(nodo)
    }

    VerificarExisteNodo(DatoActual) {
        for (let i = 0; i < this.DatoNodo.length; i++) {
            if (this.DatoNodo[i].Vertices == DatoActual) {
                return true
            }
        }
        return false
    }

    EliminarNodo(DatoActual) {
        var NodoEliminar
        for (let i = 0; i < this.DatoNodo.length; i++) {
            if (this.DatoNodo[i].Vertices == DatoActual) {
                NodoEliminar = this.DatoNodo[i].id
                this.DatoNodo.splice(i, 1)
                continue
            }
            for (let j = 0; j < this.DatoNodo[i].Aristas.length; j++) {         
                if (this.DatoNodo[i].Aristas[j] == DatoActual) {
                    this.DatoNodo[i].Aristas.splice(j, 1)
                    this.Insertar(this.DatoNodo[i].Aristas)
                    continue
                }

            }
        }
        return NodoEliminar
    }

    AgregarVertice(from, to) {
        //Obtenemos el nodo from
        for (let i = 0; i < this.DatoNodo.length; i++) {
            if (this.DatoNodo[i].Vertices == from) {
                this.DatoNodo[i].Aristas.push(to)
                this.Insertar(this.DatoNodo[i].Aristas)
            }
        }
    }

    ObtenerDatoNodo(DatoActual) {
        for (let i = 0; i < this.DatoNodo.length; i++) {
            if (DatoActual == this.DatoNodo[i].Vertices) {
                return this.DatoNodo[i].Aristas
            }
        }
        return []
    }

    //Primer Intento, falta comprobar si es correcto
    RecorrerProfundidad(NodoInicial, NodoFinal) {
        var ListaNodo = [NodoInicial];
        var res = []
        while (ListaNodo.length > 0) {
            var current = ListaNodo.shift();
            res.push(current)
                console.log("current", current)
            if (current == NodoFinal) {
                console.log("Lo encontramos");
                return res
            }
            var auxiliar = this.ObtenerDatoNodo(current);
            auxiliar.reverse()
            ListaNodo = auxiliar.concat(ListaNodo);
        }
        console.log("No se ha encontrado una ruta")
    }

    MostrarGrafo(){
		console.log(this.DatoNodo)
	}
}
module.exports = ProfundidadGrafos