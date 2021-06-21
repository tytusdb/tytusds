export class Nodo {

    dato: number|string;
    anterior: Nodo;
    siguiente: Nodo;
    identificador: number;

    constructor (dato : string|number , identificador: number){
        this.dato=dato;
        this.anterior=null;
        this.siguiente=null;
        this.identificador=identificador;
    }

    getIdentificador(){
        return this.identificador;
    }

    setIdentificador(identificador:number){
        this.identificador=this.identificador;
    }
}