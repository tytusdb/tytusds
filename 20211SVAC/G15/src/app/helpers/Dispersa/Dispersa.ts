import { ListaCabecera } from "./ListaCabecera";
import { NodoCabecera } from "./NodoCabecera";
export enum Tipo {
    SIMPLE,
    DOBLE
}
export class Dispersa {
    private columnas: ListaCabecera
    private filas: ListaCabecera
    private tipo: Tipo;

    constructor(tipo:Tipo) {
        this.columnas = new ListaCabecera()
        this.filas = new ListaCabecera()
        this.tipo = tipo;
    }

    public add(x: number | string, y: number | string, value: number | string) {
        this.addColumna(x)
        this.columnas.mostrarCabecera()
    }

    private addColumna(x:number|string){
        let temp:NodoCabecera = this.buscarColumna(x)
        if(temp !== null) return temp 
        return this.columnas.addCabecera(x,this.tipo)
    }

    private buscarColumna(x: number | string):NodoCabecera {
        return  this.columnas.buscarCabecera(x)
    }
}