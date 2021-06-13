import { Pedirproductos } from "../pedirproductos/pedirproductos";

export class Infopedido {
    Fecha: string
    Tienda: string
    Departamento: string
    Calificacion: number
    Cliente: number
    Productos: Pedirproductos[]

    constructor(_Fecha: string, _Tienda: string, _Departamento: string,
        _Calificacion: number, _Cliente: number, _Productos: Pedirproductos[]){
        this.Fecha = _Fecha
        this.Tienda = _Tienda
        this.Departamento = _Departamento
        this.Calificacion = _Calificacion
        this.Cliente = _Cliente
        this.Productos = _Productos

    }
}
