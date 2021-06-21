
export class NodoCola {

    dato: number|string;
    sigueinte : NodoCola
    //anterior: NodoCola
    identificador: number;

    constructor (dato : string|number , identificador: number){
        this.dato=dato;
        this.sigueinte=null;
       // this.anterior=null;
        this.identificador=identificador;
    }

    // getIdentificador(){
    //     return this.identificador;
    // }

    // setIdentificador(identificador:number){
    //     this.identificador=this.identificador;
}