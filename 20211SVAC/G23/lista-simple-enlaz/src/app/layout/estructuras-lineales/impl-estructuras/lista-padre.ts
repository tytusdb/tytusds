export default interface ListaPadre  {
    inicio: any;
    estaVacia(): boolean;
    toArray(): any[];
    estaVacia(): boolean;
    size(): number;
    agregarAlInicio(data: any): void;
    agregarAlFinal(data: any): void;
    borrarAlInicio(): any;
    borrarAlFinal(): any;
    push(data:any):void;
    pop():any;
    actualizar(posicion, newData):void;
}
