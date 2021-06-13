import { Departamentos } from "../departamentos/departamentos";
import { Binary } from "@angular/compiler";

export class Datos {
    Indice: string
    Departamentos: Departamentos[]

    constructor(_Indice: string, _Departamentos: Departamentos[]){
        this.Indice = _Indice
        this.Departamentos = _Departamentos

    }
}
