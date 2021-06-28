let l= require('./Lista');
let Nodo=require('./Nodo');
class ABinario{
  constructor() {
    this.l_horizontal= new l();
  }
  //APPEND
  append(columna,valor){
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
      //si son iguales los valores
    }else{
      nodo.derecha=this._append(valor,nodo.derecha,nodo);
    }
    return nodo;
  }
  /// APARTADO DE LISTA-------------------------------------------------------------------
  preorden(){
    //raiz->sub-arbol izquierdo->sub-arbol derecho
    let nodo=this.l_horizontal.head;
    this.pre_orden(nodo);
  }
  pre_orden(nodo){
    if (nodo!=null){
    console.log(nodo.valor);
    this.pre_orden(nodo.izquierda);
    this.pre_orden(nodo.derecha);
    }
  }
  postorden(nodo){
    //sub-arbol izquierdo->sub-arbol derecho->raiz
    this.post_orden(nodo);
  }
  post_orden(){
    if (nodo!=null){
      this.pre_orden(nodo.izquierda);
      this.pre_orden(nodo.derecha);
      console.log(nodo.valor);
    }
  }
  inorden(){
    //sub-arbol izquierdo->raiz->sub-arbol derecho
    this.in_orden(nodo);
  }
  in_orden(){
    if (nodo!=null){
      this.pre_orden(nodo.izquierda);
      console.log(nodo.valor);
      this.pre_orden(nodo.derecha);

    }
  }
  ////APARTADO DE ARBOL-------------------------------------------------------------------
  //ELIMINAR
  //4 tipos de eliminación,1 que el nodo no tenga hijos, 2 que el nodo tenga un hijo a la derecha, 3 que el nodo tenga un hijo a la izquierda, 4 que el nodo tenga dos hijos
  delete(valor){

  }
  _delete(nodo){
    if(nodo.izquierda!=null && nodo.derecha!=null){

    }
    else if(nodo.izquierda==null && nodo.derecha!=null){

    }else if(nodo.izquierda!=null && nodo.derecha==null){

    }else{

    }
  }
  Min(nodo){
    if(nodo.izquierda!=null){

    }
  }
  //BUSCAR
  _buscar(nodo, valor){
    if(nodo==null){
      return null;
    }
    else if(valor>nodo.valor){
      nodo=this._buscar(nodo.derecha,valor);
      return nodo
    }else if(valor<nodo.valor){
      nodo=this._buscar(nodo.izquierda,valor);
      return nodo
    }else{
      return nodo;
    }
  }

}

module.exports = ABinario;
