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
