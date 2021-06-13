import { Comentarios } from "../Comentarios/comentarios";

export class ComentProducto {
    Dpi: number
    Producto: string
    Comentarios: Comentarios[]

    constructor(_Dpi: number, _Producto: string, _Comentarios: Comentarios[]){
        this.Dpi = _Dpi
        this.Producto = _Producto
        this.Comentarios = _Comentarios

    }
}
