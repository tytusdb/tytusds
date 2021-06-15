export default class NodoSimple {
    private data: any;
    private next: NodoSimple;
  
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
  
    public setNext(next: NodoSimple): void {
      this.next = next;
    }
  
    public setData(data: any): void {
      this.data = data;
    }
  
}