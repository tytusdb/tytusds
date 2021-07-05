class NodoEncabezado {

    public id: any
    public siguiente: any
    public anterior: any
    public nodoacceso: any

    constructor(id: any) {

        this.id = id

        this.siguiente = null

        this.anterior = null

        this.nodoacceso = null
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
  
    constructor(valor: any, fila: any, columna: any)
    
    {
  
        this.valor = valor
  
        this.fila = fila
  
        this.columna = columna
  
        this.derecha = null
  
        this.izquierda = null
  
        this.abajo = null
  
        this.arriba = null
    }
  
}



class listaencabezado {


    public primero: any


    constructor() {

        this.primero = null

    }

    setEncabezado(nuevo: any) {

        if (this.primero == null) {

            this.primero = nuevo

        } 
        
        else 
        
        {
        
            if (nuevo.id < this.primero.id) {

                nuevo.siguiente = this.primero

                this.primero.anterior = nuevo

                this.primero = nuevo

            } 
            
            else 
            
            {

                let actual = this.primero

                while (actual.siguiente != null) {

                    if (nuevo.id < actual.siguiente.id) {

                        nuevo.siguiente = actual.siguiente

                        actual.siguiente.anterior = nuevo

                        nuevo.anterior = actual

                        actual.siguiente = nuevo

                        break
                    }

                    actual = actual.siguiente
                }

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


class matrizdispersa {


    public eFilas: any

    public eColumnas: any


    constructor() {

        this.eFilas = new listaencabezado()

        this.eColumnas = new listaencabezado()

    }

    insertar(valor: any, fila: any, columna: any) 
    
    {

        let nuevo = new NodoM(valor, fila, columna)

        // Inserccion de encabezado Filas

        let efila = this.eFilas.getEncabezado(fila)

        if (efila == null) {

            efila = new NodoEncabezado(fila)

            efila.nodoacceso = nuevo

            this.eFilas.setEncabezado(efila)


        } else {

            if (nuevo.columna < efila.nodoacceso.columna) {

                nuevo.derecha = efila.nodoacceso

                efila.nodoacceso.izquierda = nuevo

                efila.nodoacceso = nuevo

            } else {

                let actual = efila.nodoacceso

                while (actual.derecha != null) {

                    if (nuevo.columna < actual.derecha.columna) {

                        nuevo.derecha = actual.derecha

                        actual.derecha.izquierda = nuevo

                        nuevo.izquierda = actual

                        actual.derecha = nuevo

                        break
                    }

                    actual = actual.derecha
                }

                if (actual.derecha == null) {

                    actual.derecha = nuevo

                    nuevo.izquierda = actual

                }
            }

            let ecolumna = this.eColumnas.getEncabezado(columna)


            if (ecolumna == null) {

                ecolumna = new NodoEncabezado(columna)

                ecolumna.nodoacceso = nuevo

                this.eColumnas.setEncabezado(ecolumna)

            }else{

                if (nuevo.fila < ecolumna.nodoacceso.fila) {

                    nuevo.abajo = ecolumna.nodoacceso

                    ecolumna.nodoacceso.arriba = nuevo

                    ecolumna.nodoacceso = nuevo

                } 
                
                else 
                
                {

                    let actual = ecolumna.nodoacceso

                    while (actual.abajo != null) {

                        if (nuevo.fila < actual.abajo.fila) {

                            nuevo.abajo = actual.abajo

                            actual.abajo.arriba = nuevo

                            nuevo.arriba = actual

                            actual.abajo = nuevo

                            break

                        }

                        actual = actual.abajo
                    }

                    if (actual.abajo == null) {

                        actual.abajo = nuevo

                        nuevo.arriba = actual

                    }

                }
            }
        }
    }
    

    //PRUEBA -------->

    recorrerfilas() {

        let efila = this.eFilas.primero

    
        while (efila != null) {
    
            let actual = efila.nodoacceso
    
            while (actual != null) {
    
                console.log("Valor :  " + actual.valor + "       Fila:     " + actual.fila + "Columna:   " + actual.columna) 
    
                if (efila.siguiente != null || actual.derecha != null){
    
                        console.log("->")
                    
                }

                    
                actual = actual.derecha
    
            }

            
            efila = efila.siguiente

        }
            
        console.log("Finaliza el recorrido")
    
    }

    recorrercolumna() {

        let ecolumna = this.eColumnas.primero
    
        while (ecolumna != null) {
    
            let actual = ecolumna.nodoacceso
    
            while (actual != null) {
    
                console.log("Valor :  " + actual.valor + "       Fila:     " + actual.fila + "Columna:   " + actual.columna) 
    
                if (ecolumna.siguiente != null || actual.abajo != null){
    
                        console.log("->")
                    
                }
                    
                actual = actual.abajo
    
            }
    
            ecolumna = ecolumna.siguiente
        }
            
        console.log("Finaliza el recorrido")
    
    }

}