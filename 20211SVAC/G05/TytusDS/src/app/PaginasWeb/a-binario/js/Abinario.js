let Nodo= require('./Nodo');
class Abinario{
  constructor() {
    this.raiz=null;
    this.size=0
  }
  append(valor){
    this.raiz=this._append(valor,this.raiz,null);
  }
  _append(valor,nodo,padre){
    //si se repite mandar a la derecha
    if(nodo==null){
      let new_nodo=new Nodo(valor,padre);
      return new_nodo;
    }
    //si el valor es mayor al nodo actual irse por el lado derecho
    if(valor>nodo.valor){
      nodo.right=this._append(valor,nodo.right,nodo);
    }else{
      //si el valor es menor al nod actual irse por el lado izquierdo
      nodo.left=this._append(valor,nodo.left,nodo);
    }
    this.size+=1;
    return nodo;
  }
  //una funcion que no retorna nada hara que las variables iguales a esta sean indefinidas.
  //BUSCAR
  buscar(valor){
    let nodo=this._buscar(valor,this.raiz);
    return nodo;
  }
  _buscar(valor,nodo){
    if(nodo!=null) {
      if (nodo.valor > valor) {
        nodo = this._buscar(valor, nodo.left);
      } else if (nodo.valor < valor) {
        nodo = this._buscar(valor, nodo.right);
      }
      if(nodo==null) return null;
      if (nodo.valor == valor) {
        return nodo
      }
    }
  }
  //ACTUALIZAR
  update(valor,new_valor){
    let nodo=this.buscar(valor);
    nodo.valor=new_valor;
  }
  _update(nodo,valor,new_valor){

  }
  //4 CASOS: a la hora de eliminar, 1 que no tenga hijos, 2 que solo tenga un hijo a la izquierda , 3 que tenga un hijo a la derecha, 4 que tenga 2 hijos
  // if nodoizquierdo ==null and nododerecho==null, etc.
  //raiz valor = valor
  eliminar(valor){
    let nodo=this.buscar(valor);
    this._eliminar(nodo);
  }

  _eliminar(nodo){
    if (nodo!=null){
      //caso 1:
      if(nodo.right==null && nodo.left==null){
        this.E_hijo(nodo,null);
        this.E_Nodo(nodo);
      }
      //caso 2
      else if(nodo.left!=null && nodo.right==null){
        this.E_hijo(nodo,nodo.left);
        this.E_Nodo(nodo);
        //caso 3
      }else if(nodo.right!=null && nodo.left==null){
        this.E_hijo(nodo,nodo.right);
        this.E_Nodo(nodo);
      }
      //caso4
      else if(nodo.right!=null && nodo.left!=null){
        let nodoMin=this.minimo(nodo.right);
        nodo.valor=nodoMin.valor;
        this._eliminar(nodoMin);
      }
    }
  }
  //eliminar nodo
  E_Nodo(nodo){
    nodo.left=null;
    nodo.right=null;
    nodo=null;
  }

  //Eliminar en caso tenga un solo hijo
  E_hijo(nodo,nodo_hijo){
    if(nodo.padre!=null){
      //si el nodo a eliminar se encuentra de lado izquierdo para que esto se cumpla se debe de cumplir la igualacion
      if(nodo.valor==nodo.padre.left.valor){
        nodo.padre.left=nodo_hijo;
        //si el nodo a eliminar se encuentra de lado derecho
      }else if(nodo.valor==nodo.padre.right.valor){
        nodo.padre.right=nodo_hijo;
      }
    }
    if(nodo_hijo){
      nodo_hijo.padre=nodo.padre
    }
  }

  //MINIMO
  minimo(nodo){
    if(nodo==null){
      return null
    }
    if(nodo.left!=null) {
      return this.minimo(nodo.left);
    }else{
      return nodo
    }
  }
  //MAXIMO
  preorden(){
  //raiz->sub-arbol izquierdo->sub-arbol derecho
    this.pre_orden(this.raiz);
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
    this.in_orden(this.raiz);
  }
  in_orden(nodo){
    if (nodo!=null){
      this.in_orden(nodo.left);
      console.log(nodo.valor);
      this.in_orden(nodo.right);
    }

  }
  postorden(){
    //sub-arbol izquierdo->sub-arbol derecho->raiz
    this.post_orden(this.raiz);
  }
  post_orden(nodo){
      if(nodo!=null){
        this.post_orden(nodo.left);
        this.post_orden(nodo.right);
        console.log(nodo.valor);
      }
  }

}

module.exports = Abinario;
