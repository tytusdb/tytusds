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
    eliminar(valor){
        let nodoanterior=this.buscar(valor);
        if (nodoanterior!=null){
            if(nodoanterior.next===this.head){
                nodoanterior.next=this.head.next;
                this.head=nodoanterior.next;
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
        let nodo=new NodoE(i,current.valor);
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

}

module.exports = ListaCircular;
