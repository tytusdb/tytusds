let l= require('./Lista');
let Nodo=require('./Nodo');
let lista=require('./listaaux')
class ABinario{
  constructor() {
    this.l_horizontal= new l();
    this.listaaux=new lista();
    this.l_edges=[];
    this.l_nodos=[];
    this.datos=[];
    this.size=0;
  }
  //RELLENAR LISTA CON LOS CABECALES AUXILIAR Y LA QUE CUENTA LAS REPETICIONES DE ESTOS
  Re_aux(){
    this.listaaux.Reset();
    let current=this.l_horizontal.head;
    while (current!=null){
      this.listaaux.append(current.valor);
      current=current.next;
    }
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
  //APARTADO DE ELIMINACION
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
      let nodoMin=this.Min(nodo.derecha);
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
      if(nodo.padre==null){
      this.l_horizontal.eliminar(nodo.valor);}else{
      this.E_NcH(nodo,null);
      this.E_Nodo(nodo);}
    }
  }
  Min(nodo){
    if(nodo==null){
      return null
    }
    if(nodo.izquierda!=null) {
      return this.Min(nodo.izquierda);
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
      console.log("-----------------------------------------------------")
     if(nodo.padre==null){
       //SE ELIMINA EL NODO DE LA LISTA HORIZONTAL
       this.l_horizontal.eliminar(nodo.valor);
       //INSERTAR EL NODO HIJO EN LA LISTA
       this.l_horizontal.appendO(nodo_hijo.valor);
       let new_nodo= this.l_horizontal.buscar(nodo_hijo.valor);
       //ENLAZO EL NODO INSERTADO CON LOS NODOS IZQUIERDO Y DERECHO DEL NODO HIJO  NULL-NODO-NODO_HIJO
       new_nodo.izquierda=nodo_hijo.izquierda;
       new_nodo.derecha=nodo_hijo.derecha
       if(nodo_hijo.izquierda!=null){
         nodo_hijo.izquierda.padre=new_nodo;
       }
       if(nodo_hijo.derecha!=null){
         nodo_hijo.derecha.padre=new_nodo;
       }
     }
    console.log("-----------------------------------------------------")
    this.recorrer();
  }
  buscar(valor){
    let current= this.l_horizontal.head;
    let nodo=null;
    while (current!=null){
      nodo=this._buscar(current,valor);
      if(nodo!=null) break;
      current=current.next
    }
    return nodo;
  }
  //METODO GRAFICO PARA BUSCAR
  Mbuscar(valor){
    let l=[]
    let current= this.l_horizontal.head;
    let nodo=null;
    let n=0;
    while (current!=null){
      nodo=this._buscar(current,valor);
      if(nodo!=null){
        l.push(current);
        break;
      }
      n+=1;
      current=current.next
    }
    l.push(nodo);
    l.push(n);
    //[cabecera, nodobuscado,n]
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

  //MODIFICAR
  modificar(valor,valor_nuevo){
    let nodo=this.buscar(valor);
    if(nodo!=null ){
      this._eliminar(nodo);
      if(this.l_horizontal.head!=null){
        this._append(valor_nuevo,this.l_horizontal.head,null,0);
      }else{
        this.l_horizontal.appendO(valor_nuevo);
      }
      return true;
    }else{
      alert('No existe tal valor en la lista de arboles')
      return false;
    }

  }
  //id= cabezal#nivel#(elemento)
  Rlnodos(){
    //SOLO SE AGREGO LO DEL CABEZAL EN ESTE RLNODOS
     this.l_nodos=[];
     this.Cniveles();
     let current= this.l_horizontal.head;
     let n=0;
     while (current!=null){
       //PARA REVISAR SI HAY REPETICIONES;
       //LO QUE SE MANDA DE CABEZAL ES EL VALOR DE LA CABECERA JUTNO A SU REPETICION
       let cabezal1=`${current.valor}(${n})`;
       n+=1;
       this.pre_orden1(current,cabezal1);
       current=current.next;

     }
     return this.l_nodos;
  }
  pre_orden1(nodo,cabezal){
    function NodoE(id,label,level=null,color="red"){
      this.id= id;
      this.label= label.toString();
      this.level=level;
      this.color=color
    }
    if (nodo!=null){
      if(nodo.padre==null){
        this.l_nodos.push(new NodoE(`C${cabezal}N${nodo.nivel}(${nodo.valor})`,nodo.valor,nodo.nivel,'red'))
      }else{
        this.l_nodos.push(new NodoE(`C${cabezal}N${nodo.nivel}(${nodo.valor})`,nodo.valor,nodo.nivel,'purple'))
      }
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
    let n=0;
    //enlazando del nodo raiz al resto de hijos
    let current= this.l_horizontal.head;
    while (current!=null){
      let cabezal1=`${current.valor}(${n})`
      this.pre_orden2(current,cabezal1);
      n+=1;
      current=current.next;
    }
    n=0;
    this.Re_aux();
    //enlazando entre nodos raices
    current=this.l_horizontal.head;
    if (current!=null){
      while (current.next!=null){
        let cabezal1=`${current.valor}(${n})`
        n+=1;
        let cabezal2=`${current.next.valor}(${n})`
        this.l_edges.push(new Edge(`C${cabezal1}N${current.nivel}(${current.valor})`,`C${cabezal2}N${current.next.nivel}(${current.next.valor})`))
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
  Rdatos(){
    this.datos=[];
    let current= this.l_horizontal.head;
    while (current!=null){
      this._Rdatos(current,current);
      current=current.next;
    }
    console.log(this.datos);
    return this.datos;
  }
  _Rdatos(nodo,cabezal){
    function nodo_json(principal,secundario){
      this.principal=principal
      this.secundario=secundario;
    }
    if (nodo!=null){
      if(nodo.padre!=null){
        this.datos.push(new nodo_json(cabezal.valor,nodo.valor))
      }
      this._Rdatos(nodo.izquierda,cabezal);
      this._Rdatos(nodo.derecha,cabezal);
    }
  }
}

module.exports = ABinario;
