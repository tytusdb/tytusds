export class Nodolistsimpenl {
  dato:any;
  siguiente:Nodolistsimpenl;
  anterior:Nodolistsimpenl;

  constructor(dato:any) {
      this.dato = dato;
      this.siguiente = null;
      this.anterior = null;
  }
}
