let Nodo = require("./Nodo");

class ListaCircular{
    constructor() {
        this.head=null;
        this.tail=null;
        this.repeat=false;
        this.size=0
    }
    set setRepeat(repeat){
      this.repeat=repeat;
    }
    //AGREGAR AL INICIO
    appendI(valor){
      if(this.repeat==true){
        this.append_i(valor)
      }else if (this.repeat==false && this.buscar(valor)==null){
        this.append_i(valor)
      }
    }

    append_i(valor){
      let nodo=new Nodo(valor);
      if(this.head==null){
        this.head=nodo;
        this.head.next=this.head;
        this.tail=this.head;
      }else{
        nodo.next=this.head;
        this.head=nodo;
        this.tail.next=this.head;
      }
      this.size+=1;
    }
    //AGREGAR AL FINAL
  appendF(valor){
    if(this.repeat==true){
      this.append_f(valor)
    }else if (this.repeat==false && this.buscar(valor)==null){
      this.append_f(valor)
    }
  }
    append_f(valor){
        let nodo = new Nodo(valor);
        if(this.head===null){
            this.head=nodo;
            this.head.next=this.head;
            this.tail=this.head;
        }else{
            this.tail.next=nodo;
            this.tail=nodo;
            this.tail.next=this.head;
        }
        this.size+=1;
    }
    //AGREGAR DE FORMA ORDENADA
  appendO(valor){
    if(this.repeat===true){
      this.append_O(valor);
    }else if (this.repeat==false && this.buscar(valor)==null){
      this.append_O(valor);
    }
  }
  append_O(valor){
      if(this.cabeza===null){
        this.append_i(valor)
      }else{
        let nodoM=this.buscarO(valor);
        if(nodoM!=null) {
          if (nodoM == this.head) {
            this.append_i(valor);
          } else {
            let new_nodo=new Nodo(valor);
            nodoM=this.buscar(nodoM.valor);
            new_nodo.next=nodoM.next;
            nodoM.next=new_nodo;
            this.size+=1;
          }
        }else{
          this.append_f(valor);
        }
      }
    }
    buscarO(valor){
      let current=this.head;
      for( let i=0; i<this.size;i++) {
        if (current.valor > valor) {
          return current;
        }
        current = current.next;
      }
      return null;
    }

    //regresa el nodo que esta una posición anterior al nodo buscado
    buscar(valor){
        let current=this.head;
        for( let i=0; i<this.size;i++) {
            if (current.next.valor === valor) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
    //ELIMINAR
    eliminar(valor){
        let nodoanterior=this.buscar(valor);
        if (nodoanterior!==null){
            if(nodoanterior.next===this.head){
                if(this.size!==1){
                  nodoanterior.next=this.head.next;
                  this.head=nodoanterior.next;
                }else{
                  this.head=null;
                }
            }else if (nodoanterior.next===this.tail){
                nodoanterior.next==this.tail.next;
                this.tail=nodoanterior.next;
            }else{
                nodoanterior.next=nodoanterior.next.next;
            }
          this.size-=1;
            return 1;
        }else{

          return null;
        }

    }
    //ACTUALIZAR UN NODO
    actualizar(valor,new_valor){
        let nodo=this.buscar(valor);
        if(nodo!=null){
          nodo=nodo.next;
          nodo.valor=new_valor;
          return 1;
        }else{
          return null;
        }
    }

    imprimir(){
        let current= this.head;
        for(let i=0; i<this.size;i++){
            console.log(current.valor);
            current=current.next
        }
    }
    Lnodos(){
      let Lnodo=[]
      let current=this.head;
      //Nodo estructura
      function NodoE(id,label){
        this.id= id;
        this.label= label;
      }

      for(let i=0; i<this.size;i++){
        let vnodo=current.valor.toString();
        let nodo=new NodoE(i,vnodo);
        Lnodo.push(nodo);
        current=current.next
      }
      return Lnodo;
    }
    Ledges(){
      function Edge(from,to){
        this.from=from
        this.to=to;
      }
      let LEdges=[];
      for(let i=0;i<this.size-1;i++){
        let edge=new Edge(i,i+1);
        LEdges.push(edge);
        if ((i+1)==this.size-1){
          edge=new Edge(i+1,0);
          LEdges.push(edge)
        }
      }
      return LEdges;
    }
    Rdatos(){
      let ldatos=[];
      let current=this.head;
      for(let i=0; i<this.size; i++){
        ldatos.push(current.valor);
        current=current.next;
      }
      return ldatos;
    }

}

module.exports = ListaCircular;
