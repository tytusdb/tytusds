export default class NodoDoble {
    private data: any;
    private next: NodoDoble;
    private prev: NodoDoble;

    constructor(data: any) {
      this.data = data;
      this.next = null;
      this.prev = null;
    }
    public getNext(): NodoDoble {
      return this.next;
    }
    public getPrev(): NodoDoble {
        return this.prev;
      }
    public getData(): any {
      return this.data;
    }
    public setNext(next: NodoDoble): void {
      this.next = next;
    }
    public setPrev(prev: NodoDoble): void {
        this.prev = prev;
      }
    public setData(data: any): void {
      this.data = data;
    }
}