import { Enlace } from "../enlace/enlace";

export class Nodo {
    Nombre: string
    Enlaces: Enlace[]

    constructor(_Nombre: string, _Enlaces: Enlace[]){
        this.Nombre = _Nombre
        this.Enlaces = _Enlaces
    }
}
