import { Info } from "../info/info";
import { Binary } from "@angular/compiler";

export class Departamentos {
    Nombre: string
    Tiendas: Info[]

    constructor(_Nombre: string, _Tiendas: Info[]){
        this.Nombre = _Nombre
        this.Tiendas = _Tiendas

    }

}
