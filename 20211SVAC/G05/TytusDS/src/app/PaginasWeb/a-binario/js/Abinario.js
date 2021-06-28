let Nodo= require('./Nodo');
let listaaux=require('./listaaux');
class Abinario{
  constructor() {
    //LISTAS CON TODOS LOS VALORES QUE CONTENDRA EL ARBOL
    this.listaaux=new listaaux();
    this.raiz=null;
    this.json=[];
    this.repeat=false;
    this.dot="";
    this.L_nodos=[]
    this.L_edges=[]
    this.nNulls=0;
  }
  set Repeat(repeat){
    this.repeat=repeat
  }
  Dot(){
    this.L_edges=[]
    this.L_nodos=[]
    this.Dotgen();
    let ldata=[]
    ldata.push(this.L_nodos);
    ldata.push(this.L_edges);
    return ldata
  }
  append(valor){
    let existe=this.buscar(valor)
    if (this.repeat==true) {
      this.raiz = this._append(valor, this.raiz, null);
    }else if(this.repeat==false && existe==null ){
      this.raiz = this._append(valor, this.raiz, null);
    }
  }
  _append(valor,nodo,padre){
    //si se repite mandar a la derecha
    if(nodo==null){
      let new_nodo=new Nodo(valor,padre);
      if(this.listaaux.buscar(valor)==null) this.listaaux.append(valor);
      return new_nodo;
    }
    //si el valor es mayor al nodo actual irse por el lado derecho
    if(valor>nodo.valor){
      nodo.right=this._append(valor,nodo.right,nodo);
    }else if(valor==nodo.valor){
      nodo.right=this._append(valor,nodo.right,nodo);
    }
    else{
      //si el valor es menor al nod actual irse por el lado izquierdo
      nodo.left=this._append(valor,nodo.left,nodo);
    }
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
    //caso 1:
    if(nodo.right==null && nodo.left==null){
      this.E_NcH(nodo,null);
      this.E_Nodo(nodo);
      this.nNulls-=2;
    }
    //caso 2
    else if(nodo.left!==null && nodo.right===null){
      this.E_NcH(nodo,nodo.left);
      this.E_Nodo(nodo);
      this.nNulls-=1;
      //caso 3
    }else if(nodo.right!==null && nodo.left===null){
      this.E_NcH(nodo,nodo.right);
      this.E_Nodo(nodo);
      this.nNulls-=1;
    }
    //caso4
    else if(nodo.right!=null && nodo.left!=null){
      let nodoMin=this.minimo(nodo.right);
      nodo.valor=nodoMin.valor;
      this._eliminar(nodoMin);
    }

  }
  //eliminar nodo
  E_Nodo(nodo){
    nodo.left=null;
    nodo.right=null;
    nodo=null;
  }

  //Eliminar nodo con un hijo
  E_NcH(nodo,nodo_hijo){
    if(nodo==this.raiz){
      this.raiz=nodo_hijo;
    }else{
    if(nodo.padre!=null){
      //si el nodo a eliminar se encuentra de lado izquierdo para que esto se cumpla se debe de cumplir la igualacion
      if(nodo.padre.left!=null) {

        if (nodo.valor == nodo.padre.left.valor) {

          nodo.padre.left = nodo_hijo;
          //si el nodo a eliminar se encuentra de lado derecho
        }
      }
      if(nodo.padre.right!=null) {

        if (nodo.valor == nodo.padre.right.valor) {
          nodo.padre.right = nodo_hijo;
        }
      }
    }
      if(nodo_hijo!=null){
      nodo_hijo.padre=nodo.padre
      }
    }

    this.preorden();
  }

  //MINIMO, obtener el valor mas a la izquierda de la rama derecha.
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
      console.log(`${nodo.valor} padre: ${nodo.padre}`);
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
      console.log(`${nodo.valor} padre: ${nodo.padre}`);
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
      console.log(`${nodo.valor} padre: ${nodo.padre}`);
    }
  }
  Dotgen(){
    //se resetea la lista;
    this.listaaux.Reset();
    //se recorre la lista de nuevo en caso se elimine o  actualice un valor
    this.Recorrer(this.raiz);
    //se recorre todo el arbol y se llena con todos los valores de la lista
    this.dotgen(this.raiz);
    //reset de la lista:
  }
  Recorrer(nodo){
    if(nodo!=null){
      if(this.listaaux.buscar(nodo.valor)==null){
        this.listaaux.append(nodo.valor);
      }
      this.Recorrer(nodo.left);
      this.Recorrer(nodo.right);
    }
  }
  //METODOS PARA DEVOLVER OBJETOS DE NODOS Y APUNTADORES
  dotgen(nodo){
    if(nodo!=null){
      //los apostrofes son el numero que acompañara a cada elemento del arbol
      //su funcion principal es que no ocurran errores a la hora de repetir valores
      //se implemento una lista auxiliar que se encargaria de contar las repeticiones de haberlas
      //en caso se elimine un valor la lista se resetearia y se volveria a colocar los elementos del nuevo arbol
      //Restar siempre -1 para que los nodos esten conectaos si no se crearian nodos en posiciones aleatorias
      let apostrofe=this.listaaux.buscar(nodo.valor).apostrofe-1;
      //la raiz es la unica posicion donde no se debe de restar ese valor, como se realizo se le coloco 0
      let nodoraiz=nodo.valor+`(${apostrofe})`;
      //INGRESO DE OBJETOS NODO
      this.Lnodos(nodoraiz,nodo.valor);
      //si tiene un nodo izquierdo
      if(nodo.left!=null) {
        let nodoizq = nodo.left.valor + `(${this.listaaux.buscar(nodo.left.valor).apostrofe})`;
        this.Lnodos(nodoizq,nodo.left.valor);
        this.Ledges(nodoraiz,nodoizq);
        //se le suma +1 para que luego ya no surgan errores a la hora de graficar repetidos
        this.listaaux.buscar(nodo.left.valor).apostrofe+=1;
      }else{
        //agregacion de nodos
        this.Lnodos(`null(${this.nNulls})`,"null")
        this.Ledges(nodoraiz,`null(${this.nNulls})`)
        this.nNulls+=1;
      }
      //si tiene un nodo derecho
      if(nodo.right!=null){
        let nododer = nodo.right.valor + `(${this.listaaux.buscar(nodo.right.valor).apostrofe})`;
        this.dot+=`${nodoraiz}--${nododer};`;
        this.Lnodos(nododer,nodo.right.valor)
        this.Ledges(nodoraiz,nododer);
        this.listaaux.buscar(nodo.right.valor).apostrofe+=1;
      } else{
        this.Lnodos(`null(${this.nNulls})`,"null")
        this.Ledges(nodoraiz,`null(${this.nNulls})`)
        this.nNulls+=1;
      }
      this.dotgen(nodo.left);
      this.dotgen(nodo.right);
      this.listaaux.buscar(nodo.valor).apostrofe+=1;
    }
  }
  //LISTA DE NODOS
  Lnodos(id,label){
    //Nodo estructura
    function NodoE(id,label){
      this.id= id;
      this.label= label.toString();
    }
    let vnodo= new NodoE(id,label);
    if(this.CompararNodos(vnodo)==false){
      this.L_nodos.push(vnodo);}
  }
  //LISTA DE EDGES
  Ledges(from,to){
    function Edge(from,to){
      this.from=from
      this.to=to;
    }
    let edge=new Edge(from,to);
    if(this.CompararEdges(edge)==false){
      this.L_edges.push(edge);}
  }
  Rdot(){
    return this.dot;
  }
  ///PARA EVITAR CREAR OBJETOS REPETIDOS EN LA LISTA DE NODOS PARA GRAFICAR EL ARBOL
  CompararNodos(Nodo){
    for(let i in this.L_nodos){
      if(JSON.stringify(this.L_nodos[i])===JSON.stringify(Nodo)){
        return true;
      }
    }
    return false;
  }
  ///PARA EVITAR CREAR OBJETOS REPETIDOS EN LA LISTA DE EDGES PARA GRAFICAR EL ARBOL
  CompararEdges(edge){
    for(let i in this.L_edges){
      if(JSON.stringify(this.L_edges[i])===JSON.stringify(edge)){
        return true;
      }
    }
    return false;
  }
  /////////----------------------------------------------------
  //Retornar Json
  Rjson(){
    this.json=[];
    this._Rjson(this.raiz);
    return this.json;
  }
  _Rjson(nodo){
    if(nodo!=null){
      this.json.push(nodo.valor);
      this._Rjson(nodo.left);
      this._Rjson(nodo.right);
    }
  }

}

module.exports = Abinario;
