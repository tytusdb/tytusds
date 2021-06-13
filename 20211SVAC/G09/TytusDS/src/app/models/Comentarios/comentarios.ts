import {SubComentarios} from "../SubComentarios/sub-comentarios";

export class Comentarios {
    Comentario: string
    SubComentarios: SubComentarios[]

    constructor(_Comentario: string, _SubComentarios: SubComentarios[]){
        this.Comentario = _Comentario
        this.SubComentarios = _SubComentarios

    }
}
