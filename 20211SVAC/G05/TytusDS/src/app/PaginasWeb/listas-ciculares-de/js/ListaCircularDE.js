let Nodo= require("./NodoCde");
class ListaCircularDE{
    constructor(repeat=false) {
        this.head=null
        this.tail=null
        this.size=0
        this.repeat=repeat;
    }
    //cambiar el repeat
    set setRepeat(repeat){
      this.repeat=repeat;
    }
    appendF(valor) {
        if(this.repeat==true){
            this.append_f(valor);
        }else if (this.repeat===false && this.buscar(valor)==null){
            this.append_f(valor);
        }
    }
    append_f(valor){
        let nodo= new Nodo(valor);
        if(this.head==null){
            this.head=nodo;
            this.head.next=this.head;
            this.head.prev=this.head;
            this.tail=this.head;
        }else{
            this.tail.next=nodo;
            nodo.prev=this.tail;
            nodo.next=this.head;
            this.head.prev=nodo;
            this.tail=nodo;
        }
        this.size+=1;
    }
    appendI(valor) {
        if(this.repeat==true){
            this.append_i(valor);
        }else if (this.repeat===false && this.buscar(valor)==null){
            this.append_i(valor);
        }
    }
    append_i(valor) {
        let nodo=new Nodo(valor)
        if (this.head == null) {
            this.head=nodo;
            this.head.next=this.head;
            this.head.prev=this.head;
            this.tail=this.head;
        } else {
            this.head.prev=nodo;
            nodo.next=this.head;
            this.head=nodo;
            //Con el head ya cambiada
            this.head.prev=this.tail;
            this.tail.next=this.head;
        }
        this.size+=1;
    }
  appendO(valor) {
    if(this.repeat==true){
      this.append_O(valor);
    }else if (this.repeat===false && this.buscar(valor)==null){
      this.append_O(valor);
    }
  }
    append_O(valor){
        if(this.cabeza=null){
            this.append_i(valor)
        }else{
            let nodoM=this.buscarO(valor);
            let new_nodo=new Nodo(valor);
            if(nodoM!=null) {
                if (nodoM == this.head) {
                    this.append_i(valor);
                } else {
                   nodoM.prev.next=new_nodo;
                   new_nodo.prev=nodoM.prev;
                   new_nodo.next=nodoM;
                   nodoM.prev=new_nodo;
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
    buscar(valor){
        let current=this.head;
        for( let i=0; i<this.size;i++) {
            if (current.valor === valor) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
    eliminar(valor){
        let nodo=this.buscar(valor);
        if (nodo!=null){
            if(nodo==this.tail){
                this.tail=nodo.prev;
                this.tail.next=this.head;
                this.head.prev=this.tail;
            }else if (nodo==this.head){
                this.head=nodo.next;
                this.head.prev=this.tail;
                this.tail.next=this.head;
            }else{
                nodo.prev.next=nodo.next;
                nodo.next.prev=nodo.prev;
            }
            this.size-=1;
            return 1;
        }
        return null;
    }
    actualizar(valor,new_valor){
        let nodo=this.buscar(valor);
        nodo.valor=new_valor;
        return 1;
    }
    imprimir(){
        let current=this.head
      console.log(`tamaño de la lista ${this.size}`)
        for(let i=0; i<this.size;i++){

            console.log(current.valor);
            current=current.next;
        }
    }
    //METODOS PARA DEVOLVER OBJETOS DE NODOS Y APUNTADORES
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
    function Edge(from,to,label=""){
      this.from=from
      this.to=to;
      this.label=label;
    }
    let LEdges=[];
    for(let i=0;i<this.size-1;i++){
      let edge=new Edge(i,i+1);
      LEdges.push(edge);
      edge= new Edge((i+1),i);
      LEdges.push(edge)
      //En el caso de que este en el ultimo nodo
      if ((i+1)==this.size-1){
        edge=new Edge(i+1,0);
        LEdges.push(edge);
        edge= new Edge(0,i+1);
        LEdges.push(edge)
      }
    }
    //si existe un solo valor
    if (this.size==1){
      let edge=new Edge(0,0,"next-prev")
      LEdges.push(edge);
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

module.exports = ListaCircularDE;
