let Nodo= require('./Nodo');
class Abinario{
  constructor() {
    this.raiz=null;
  }
  add(valor){
    this.raiz=this._add(valor,nodo);

  }
  _add(valor,nodo){
    //si se repite mandar a la derecha
    if(nodo===null){
      let new_nodo=new Nodo(valor);
      return new_nodo;
    }
    //si el valor es mayor al nodo actual irse por el lado derecho
    if(valor>nodo.valor){
      nodo.right=this._add(valor,nodo.right);
    }else{
      //si el valor es menor al nod actual irse por el lado izquierdo
      nodo.left=this._add(valor,nodo.left);
    }
    return nodo;
  }
  //3 casos a la hora de eliminar, 1 que no tenga hijos, 2 que solo tenga un hijo, 3 que tenga 2 hijos
  // if nodoizquierdo ==null and nododerecho==null, etc.
  preorden(){
  //raiz->sub-arbol izquierdo->sub-arbol derecho
  }
  pre_orden(nodo){
    if(nodo!=null){
      console.log(nodo.valor);
      this.pre_orden(nodo.left);
      this.pre_orden(nodo.right);
    }
  }
  inorden(){
    //sub-arbol izquierdo->raiz->sub-arbol derecho

  }
  in_orden(nodo){


  }
  postorden(){
    //sub-arbol izquierdo->sub-arbol derecho->raiz
  }
  post_orden(){

  }

}

module.exports = Abinario;
