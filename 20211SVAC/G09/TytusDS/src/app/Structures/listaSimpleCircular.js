class Nodo{
    constructor(data, sig){
      this.data = data;
      this.sig = sig;
    }
  }
  class ListaDobleEnlazada{
    constructor(){
      this.head = null;
      this.size = 0;
    }
    
  
  add(data){
    const newNodo = new Nodo(data, this.head);
    if(this.head){        
      let aux = this.head
      while(aux.sig != this.head){
        aux = aux.sig;
      }
      aux.sig = newNodo;
    }else{
    this.head = newNodo
    this.head.sig=this.head
    }
    this.size++
    }
  delete(data){
    let aux = this.head
    let aux2
    if(data==aux.data){this.head=aux.sig
      return}
    while(aux.sig != this.head){
      aux2=aux.sig;
      console.log(aux.data+"  "+aux2.data)
      if(aux2.data==data){  
        aux2=aux2.sig
        aux.sig=aux2
        this.size--
        break
      }
    else{
      aux=aux.sig}
    }
  }
  refresh(dataActual,dataFinal){
    let aux = this.head
    while (aux.sig != this.head) {
      if (aux.data==dataActual) {
        aux.data=dataFinal
        return
      }
      aux=aux.sig
    }
    }

  search(data){
    let aux = this.head
    while (aux.sig != this.head) {
      if (aux.data==data) {
        return true
      }
      aux=aux.sig
    }return false
    }

  cargar(){}

  guardar(){}

  print(){
    var valores = []
      let aux = this.head;
      while (aux.sig != this.head) {
          valores.push(aux.data);
          aux = aux.sig;
      }
      return valores;
    }
}
  
const lSCircular = new ListaDobleEnlazada();

function lsimpleAdd(date){
  lSCircular.add(date);
  console.log(linkedList) 
}

function lsimpleDelete(date){
  lSCircular.delete(date);
  console.log(linkedList) 
}
function lsimpleRefresh(date1,date2){
  lSCircular.refresh(date1,date2);
  console.log(linkedList) 
}
function lsimpleSearch(date){
  return lSCircular.search(date); 
}
function lsimpleCargar(date){
  lSCircular.cargar();
}
function lsimpleGuardar(date){
  lSCircular.guardar();
}
function lsimplePrint(){return print()}
