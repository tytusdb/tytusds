export class JsonNodo
{
    constructor(public categoria:string,
        public nombre:string,
        public valores:string[]) {}
}
export class JsonNodoPrioridad
{
    constructor(public categoria:string,
        public nombre:string,
        public valores:any[]) {}
}
export class JsonSalidaNodoPrioridad{
    constructor(public valor:any,public prioridad: number) {} 
  }
