/* import { v4 as uuidv4 } from 'uuid';
import { Cola } from '../EstructurasLineales/Cola'; */

class Nodo {
    constructor (dato){
        this.hash = null,
        this.dato = dato,
        this.siguiente = null
        //this.id = uuidv4();
    }
} 

class TablaHashAbierta {
    constructor (tamaño) {
        this.tabla = null,
        this.tamaño = tamaño,
        this.minimo = minimo,
        this.maximo = maximo,
        this.funcion = forma
        this.datosAgregados = 0
        this.iniciar();
        
    }
}