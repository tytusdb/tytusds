import { Nodo } from "../nodo/nodo";

export class Grafo {
    Nodos: Nodo[]
    PosicioInicialRobot: string
    Entrega: string

    constructor(_Nodos: Nodo[], _PosicionInicialRobot: string, _Entrega: string){
        this.Nodos = _Nodos
        this.PosicioInicialRobot = _PosicionInicialRobot
        this.Entrega = _Entrega
    }
}
