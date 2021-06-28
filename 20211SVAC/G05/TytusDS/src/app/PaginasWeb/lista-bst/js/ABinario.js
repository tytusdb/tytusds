let l= require('./Lista');
let Nodo=require('./Nodo');
class ABinario{
  constructor() {
    this.l_horizontal= new l();
  }
  append(Columna,valor){
    let nodo=this.l_horizontal.buscar(columna);
    if(nodo==null){
      this.l_horizontal.appendO(columna);
      nodo=this.l_horizontal.buscar(columna);
    }
    nodo=this._append(valor,nodo,null);
  }
  _append(valor,nodo,padre){
    if(nodo==null){
      return new Nodo(valor,padre);
    }
    if(valor>nodo.valor){
      nodo.derecha=this._append(valor,nodo.derecha,nodo);
    }else if(valor<nodo.valor){
      nodo.izquierda=this._append(valor,nodo.izquierda,nodo);
    }else{
      nodo.derecha=this._append(valor,nodo.derecha,nodo);
    }
  }
  /// APARTADO DE LISTA-------------------------------------------------------------------

  ////APARTADO DE ARBOL-------------------------------------------------------------------


}
