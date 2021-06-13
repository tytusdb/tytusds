import { Datos } from "../datos/datos";
import { Binary } from "@angular/compiler";

export class Tienda {
    Datos: Datos[]

    constructor(_Datos: Datos[]){
        this.Datos = _Datos
    }
}
