export default class NodoSimple {
    private data: any;
    private next: NodoSimple;
    private prioridad:number;
  
    constructor(data: any) {
      this.data = data;
      this.next = null;
    }
    public getNext(): NodoSimple {
      return this.next;
    }
    public getData(): any {
      return this.data;
    }
    public getPrioridad():number{
      return this.prioridad;
    }
    public setPrioridad(prioridad:number){
      this.prioridad=prioridad;
    }
    public setNext(next: NodoSimple): void {
      this.next = next;
    }
    public setData(data: any): void {
      this.data = data;
    }
    
}