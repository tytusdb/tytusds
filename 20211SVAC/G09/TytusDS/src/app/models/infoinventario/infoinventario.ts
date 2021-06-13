import { Productos } from "../Productos/productos";

export class Infoinventario {
    Tienda: string
    Departamento: string
    Calificacion: number
    Productos: Productos[]

    constructor(_Tienda: string, _Departamento: string,
        _Calificacion: number, _Productos: Productos[]){
        this.Tienda = _Tienda
        this.Departamento = _Departamento
        this.Calificacion = _Calificacion
        this.Productos = _Productos

    }
}
