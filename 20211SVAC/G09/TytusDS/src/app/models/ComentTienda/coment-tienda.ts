import { Comentarios } from "../Comentarios/comentarios";

export class ComentTienda {
    Dpi: number
    Tienda: string
    Comentarios: Comentarios[]

    constructor(_Dpi: number, _Tienda: string, _Comentarios: Comentarios[]){
        this.Dpi = _Dpi
        this.Tienda = _Tienda
        this.Comentarios = _Comentarios

    }
}
