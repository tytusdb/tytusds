class NodoEncabezado {

    public id: any
    public siguiente: any
    public anterior: any
    public nodoacceso: any

    constructor(id: any, siguiente: any, anterior: any, nodoacceso: any) {

        this.id = id

        this.siguiente = siguiente

        this.anterior = anterior

        this.nodoacceso = nodoacceso
    }
}

class NodoM {

    public valor: any
    public fila: any
    public columna: any
  
    public derecha: any
    public izquierda: any
    public abajo: any
    public arriba: any
  
    constructor(valor: any, fila: any, columna: any, derecha: any, izquierda: any, abajo: any, arriba: any)
    
    {
  
        this.valor = valor
  
        this.fila = fila
  
        this.columna = columna
  
        this.derecha = derecha
  
        this.izquierda = izquierda
  
        this.abajo = abajo
  
        this.arriba = arriba
    }
  
}



class listaencabezado {


    public primero: any


    constructor(primero: any) {

        this.primero = primero

    }

    setEncabezado(nuevo: any) {

        if (this.primero == null) {

            this.primero = nuevo

        } else if (nuevo.id < this.primero.id) {

            nuevo.siguiente = this.primero

            this.primero.anterior = nuevo

            this.primero = nuevo

        } else {

            let actual = this.primero

            while (actual.siguiente != null) {

                if (nuevo.id < actual.siguiente.id) {

                    nuevo.siguiente = actual.siguiente

                    actual.siguiente.anterior = nuevo

                    nuevo.anterior = actual

                    actual = nuevo

                    break
                }

                actual = actual.siguiente


                if (actual.siguiente == null) {

                    actual.siguiente = nuevo

                    nuevo.anterior = actual
                }
            }
        }
    }

    getEncabezado(id: any) {

        let actual = this.primero

        while (actual != null) {

            if (actual.id == id) {

                return actual

            }

            actual = actual.siguiente
        }

        return null
    }

}


class matrizortogonal {


    public eFilas: any

    public eColumnas: any


    constructor() {

        this.eFilas = new listaencabezado(null)

        this.eColumnas = new listaencabezado(null)

    }

    



}