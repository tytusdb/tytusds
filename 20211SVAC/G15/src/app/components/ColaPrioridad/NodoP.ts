
export class NodoP {

    dato: number|string;
    sigueinte : NodoP
    identificador: number;
    prioridad: number
    anterior: NodoP

    constructor (dato : string|number , prioridad: number, identificador: number){
        this.dato = dato
        this.identificador=identificador;
        this.sigueinte = null
        this.prioridad=prioridad
        this.anterior = null
    }
    
}
