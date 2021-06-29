let l= require('./Lista');
let Nodo=require('./Nodo');
let lista=require('./listaaux')
class ABinario{
  constructor() {
    this.l_horizontal= new l();
    //this.listaaux=new lista();
    this.l_edges=[];
    this.l_nodos=[];

    this.size=0;
  }
  //APPEND
  append(columna,valor){
    let nodo=this.l_horizontal.buscar(columna);
    if(nodo==null){
      //se crean nodos con index 0 por default
      this.l_horizontal.appendO(columna);
      nodo=this.l_horizontal.buscar(columna);
    }
    nodo=this._append(valor,nodo,null,0);
  }
  _append(valor,nodo,padre,nivel){
    if(nodo==null){
        return new Nodo(valor,padre,nivel);
    }
    if(valor>nodo.valor){
      nodo.derecha=this._append(valor,nodo.derecha,nodo,nodo.nivel+1);
    }else if(valor<nodo.valor){
      nodo.izquierda=this._append(valor,nodo.izquierda,nodo,nodo.nivel+1);
      //si son iguales los valores
    }else{
      nodo.derecha=this._append(valor,nodo.derecha,nodo,nodo.nivel+1);
    }
    return nodo;
  }
  /// APARTADO DE LISTA-------------------------------------------------------------------
  recorrer(){
    let current=this.l_horizontal.head;
    while (current!=null){
      this.pre_orden(current);
      current=current.next;
    }
  }
  preorden(){
    //raiz->sub-arbol izquierdo->sub-arbol derecho
    let nodo=this.l_horizontal.head;
    this.pre_orden(nodo);
  }
  pre_orden(nodo){
    if (nodo!=null){
      console.log(nodo.valor+`nivel: ${nodo.nivel}`);
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
      this.post_orden(nodo.izquierda);
      this.post_orden(nodo.derecha);
      console.log(nodo.valor);
    }
  }
  inorden(){
    //sub-arbol izquierdo->raiz->sub-arbol derecho
    this.in_orden(nodo);
  }
  in_orden(){
    if (nodo!=null){
      this.in_orden(nodo.izquierda);
      console.log(nodo.valor);
      this.in_orden(nodo.derecha);

    }
  }
  ////APARTADO DE ARBOL-------------------------------------------------------------------
  //ELIMINAR
  //4 tipos de eliminación,1 que el nodo no tenga hijos, 2 que el nodo tenga un hijo a la derecha, 3 que el nodo tenga un hijo a la izquierda, 4 que el nodo tenga dos hijos
  delete(valor){
    let nodo=this.buscar(valor);
    if(nodo!=null){
      this._eliminar(nodo);
      return true;
    }else{
      alert('No existe dicho nodo en la lista de arboles');
      return false;
    }
  }
  _eliminar(nodo){
    if(nodo.izquierda!=null && nodo.derecha!=null){
      let nodoMin=this.minimo(nodo.derecha);
      nodo.valor=nodoMin.valor;
      this._eliminar(nodoMin);
    }
    else if(nodo.izquierda==null && nodo.derecha!=null){
      this.E_NcH(nodo,nodo.derecha);
      this.E_Nodo(nodo);
    }else if(nodo.izquierda!=null && nodo.derecha==null){
      this.E_NcH(nodo,nodo.izquierda);
      this.E_Nodo(nodo);
    }else{
      this.E_NcH(nodo,null);
      this.E_Nodo(nodo);
    }
  }
  Min(nodo){
    if(nodo==null){
      return null
    }
    if(nodo.izquierda!=null) {
      return this.minimo(nodo.izquierda);
    }else{
      return nodo
    }
  }
  //eliminar nodo
  E_Nodo(nodo){
    nodo.izquierda=null;
    nodo.derecha=null;
    nodo=null;
  }

  //Eliminar nodo con un hijo
  E_NcH(nodo,nodo_hijo){
      if(nodo.padre!=null){
        //si el nodo a eliminar se encuentra de lado izquierdo para que esto se cumpla se debe de cumplir la igualacion
        if(nodo.padre.izquierda!=null) {
          if (nodo.valor == nodo.padre.izquierda.valor) {
            nodo.padre.izquierda= nodo_hijo;
            //si el nodo a eliminar se encuentra de lado derecho
          }
        }
        if(nodo.padre.derecha!=null) {
          if (nodo.valor == nodo.padre.derecha.valor) {
            nodo.padre.derecha = nodo_hijo;
          }
        }
      }
      if(nodo_hijo!=null){
        nodo_hijo.padre=nodo.padre
        nodo_hijo.nivel=nodo.nivel;
      }
  }
  buscar(valor){
    let current= this.l_horizontal.head;
    let nodo=null;
    while (current!=null|| nodo==null){
      nodo=this._buscar(current,valor);
      current=current.next
    }
    return nodo;
  }
  //METODO GRAFICO PARA BUSCAR
  Mbuscar(valor){
    let l=[]
    let current= this.l_horizontal.head;
    let nodo=null;
    while (current!=null){
      nodo=this._buscar(current,valor);
      if(nodo!=null){
        l.push(current);
        break;
      }
      current=current.next
    }
    l.push(nodo);
    //[cabecera, nodobuscado]
    return l;
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
  //id= cabezal#nivel#(elemento)
  Rlnodos(){
     this.l_nodos=[];
     this.Cniveles();
     let current= this.l_horizontal.head;
     while (current!=null){
       this.pre_orden1(current,current.valor);
       current=current.next;

     }
     return this.l_nodos;
  }
  pre_orden1(nodo,cabezal){
    function NodoE(id,label,level=null){
      this.id= id;
      this.label= label.toString();
      this.level=level;
    }
    if (nodo!=null){
      this.l_nodos.push(new NodoE(`C${cabezal}N${nodo.nivel}(${nodo.valor})`,nodo.valor,nodo.nivel))
      this.pre_orden1(nodo.izquierda,cabezal);
      this.pre_orden1(nodo.derecha,cabezal);
    }
  }

  Rledges(){
    function Edge(from,to){
      this.from=from
      this.to=to;
    }
    this.l_edges=[];
    this.Cniveles();
    //enlazando del nodo raiz al resto de hijos
    let current= this.l_horizontal.head;
    while (current!=null){
      this.pre_orden2(current,current.valor);
      current=current.next;
    }
    //enlazando entre nodos raices
    current=this.l_horizontal.head;
    if (current!=null){
      while (current.next!=null){
        this.l_edges.push(new Edge(`C${current.valor}N${current.nivel}(${current.valor})`,`C${current.next.valor}N${current.next.nivel}(${current.next.valor})`))
        current=current.next;
      }
    }
    return this.l_edges;
  }
  pre_orden2(nodo,cabezal){
    function Edge(from,to){
      this.from=from
      this.to=to;
    }
    if (nodo!=null){
      if(nodo.izquierda!=null){
        this.l_edges.push(new Edge(`C${cabezal}N${nodo.nivel}(${nodo.valor})`,`C${cabezal}N${nodo.izquierda.nivel}(${nodo.izquierda.valor})`))
      }
      if(nodo.derecha!=null){
        this.l_edges.push(new Edge(`C${cabezal}N${nodo.nivel}(${nodo.valor})`,`C${cabezal}N${nodo.derecha.nivel}(${nodo.derecha.valor})`))
      }
      this.pre_orden2(nodo.izquierda,cabezal);
      this.pre_orden2(nodo.derecha,cabezal);
    }
  }
  //CORRECCION DE NIVELES EN CASO EN ALGUNA ELIMINACIÓN SE HAYA PRODUCIDO ALGUN ERROR
  Cniveles(){
    let current=this.l_horizontal.head;
    while (current!=null){
      this._Cniveles(current);
      current=current.next
    }
  }

  _Cniveles(nodo){
    if (nodo!=null){
      if(nodo.izquierda!=null){
        nodo.izquierda.nivel=nodo.nivel+1;
      }
      if(nodo.derecha!=null){
        nodo.derecha.nivel=nodo.nivel+1;
      }
      this._Cniveles(nodo.izquierda);
      this._Cniveles(nodo.derecha);
    }
  }



}

module.exports = ABinario;
