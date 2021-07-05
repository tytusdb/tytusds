// NODO MATRIZ DISPERSA
var contador = 1
class Nodo{
    constructor(fila, columna, valor, id){
        this.id = id
        this.fila = fila
        this.columna = columna
        this.valor = valor
        this.derecha = null
        this.izquierda = null
        this.arriba = null
        this.abajo = null
    }
}

// NODO DE LISTADOBLEMENTE ENLAZADA
class nodoEncabezado{
    constructor(id, id2){
        this.id2 = id2
        this.id = id
        this.siguiente = null
        this.anterior = null
        this.accessoNodo = null
    }
}

// LISTA DOBLEMENTE ENLAZADA
class ListaEncabezado{
    constructor(primero = null){
        this.primero = primero
    }
    
    // AGREGA  NODO ORDENADO
    setEncabezado(nuevo){
        if (this.primero == null){
            this.primero = nuevo
        // el valor del nuevo nodo es menor al primero, se ingresa antes
        } else if (nuevo.id < this.primero.id){ 
            nuevo.siguiente = this.primero
            this.primero.anterior = nuevo
            this.primero = nuevo
        } else {
            let actual = this.primero
            
            while (actual.siguiente != null){
                if (nuevo.id < actual.siguiente.id){
                    nuevo.siguiente = actual.siguiente
                    actual.siguiente.anterior = nuevo
                    nuevo.anterior = actual
                    actual.siguiente = nuevo
                    break
                }
                actual = actual.siguiente
            }
            
            // al entrar aqui el valor es mayor al actual y se agregaria de ultimo
            if (actual.siguiente == null){
                actual.siguiente = nuevo
                nuevo.anterior = actual
            }
        }
    }
    
    // busqueda de nodo, recorriendo la lista.
    buscarEncabezado(id){
        let actual = this.primero
        
        while (actual != null){
            if (actual.id == id){
                return actual
            }
            actual = actual.siguiente
        }
        return null
    }
}

class MatrizDispersa{

    constructor(){
        this.efilas = new ListaEncabezado()
        this.ecolumnas = new ListaEncabezado()
    }
    
    agregar(fila, columna, valor){
        let nuevo = new Nodo(fila, columna, valor, contador++)
        let efila = this.efilas.buscarEncabezado(fila)
        
        if (efila == null){
            efila = new nodoEncabezado(fila, contador++)
            //accesoNodo va ser el nuevo nodo que queremos insertar en la matriz
            efila.accesoNodo = nuevo
            // el nodo ya se inserta en el encabezado de fila
            this.efilas.setEncabezado(efila)
        } else{
            // si el valor nuevo es menor al nodo siguiente para insertar en orden
            if (nuevo.columna < efila.accesoNodo.columna){
                // accesoNodo es el que esta insertado antes
                nuevo.derecha = efila.accesoNodo
                // accesoNodo.izquierda es el nuevo
                efila.accesoNodo.izquierda = nuevo
                efila.accesoNodo = nuevo
            }else{
                let actual = efila.accesoNodo
                while (actual.derecha != null){
                    if(nuevo.columna < actual.derecha.columna){
                        nuevo.derecha = actual.derecha
                        // validacion para ingresar en medio de dos nodos ya creados
                        actual.derecha.izquierda = nuevo
                        nuevo.izquierda = actual
                        actual.derecha = nuevo
                        break
                    }
                    actual = actual.derecha
                }
                
                if (actual.derecha = null){
                    actual.derecha = nuevo
                    nuevo.izquierda = actual
                }
           
            }
            
            
        }
        
        let eColumna = this.ecolumnas.buscarEncabezado(columna)
        if (eColumna == null){
            eColumna = new nodoEncabezado(columna, contador++)
            eColumna.accesoNodo = nuevo
            this.ecolumnas.setEncabezado(eColumna)
        }else{
            if(nuevo.fila < eColumna.accesoNodo.fila){
                nuevo.abajo = eColumna.accesoNodo
                eColumna.accessoNodo.arriba = nuevo
                eColumna.accesoNodo = nuevo
            } else {
                let actual = eColumna.accesoNodo
                while(actual.abajo != null){
                    if (nuevo.fila < actual.abajo.fila){
                        nuevo.abajo = actual.abajo
                        actual.abajo.arriba = nuevo
                        nuevo.arriba = actual
                        actual.abajo = nuevo
                        break
                    }
                    actual = actual.abajo
                }
                if (actual.abajo == null){
                    actual.abajo = nuevo
                    nuevo.arriba = actual
                }
            }
        }
    }
    
    recorrerFilas(){
        let efila = this.efilas.primero
        console.log("recorrido de filas")
        while (efila != null){
            let actual = efila.accesoNodo
            console.log("\nFila " + actual.fila)
            console.log("Columna    valor")
            while (actual != null){
                console.log(actual.columna + "            " + actual.valor)
                actual = actual.derecha
            
            }
            efila = efila.siguiente
        }
        console.log("****************************")
    }
    
    recorrerColumnas(){
        let ecolumna = this.ecolumnas.primero
        console.log("recorrido por columnas")
        while (ecolumna != null){
            let actual = ecolumna.accesoNodo
            console.log("\nColumna " + actual.columna)
            console.log("Fila   valor")
            while (actual != null){
                console.log(actual.fila+ "       " + actual.valor)
                actual = actual.abajo
            }
            ecolumna = ecolumna.siguiente
        }
        console.log("************************")
    }
    
    devolverValor(fila, columna){
        let ecolumna = this.ecolumnas.primero
        let encontrado = false
        while (ecolumna != null){
            let actual = ecolumna.accesoNodo
            if(actual.columna == columna){
                while(actual != null){
                    if(actual.fila == fila){
                        encontrado = true
                        return actual.valor 
                    }
                    actual = actual.abajo
                }
            }
            ecolumna = ecolumna.siguiente
        }
        if(encontrado == false){
            return null
        }
    }
    
}

m = new MatrizDispersa()
m.agregar(1,1, "*")
m.agregar(1,2, "*")
m.agregar(1,3, "*")
m.agregar(1,5, "*")
m.agregar(1,6, "encontrado")
m.agregar(1,7, "*")
m.agregar(2,2, "-")
m.agregar(2,5, "*")
m.agregar(2,6, "$")
m.agregar(2,7, "-")
