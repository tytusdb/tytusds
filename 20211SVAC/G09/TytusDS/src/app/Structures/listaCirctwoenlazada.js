class Nodo{
    constructor(data, sig, ant){
      this.data = data
      this.sig = sig
      this.ant = ant
    }
  }
  class ListaCircularDoblEnlazada{
    constructor(){
      this.head = null;
      this.size = 0;
    }

  add(data){
    const newNodo = new Nodo(data, null, this.head)
    if(this.head){        
      let aux = this.head
      while(aux.sig){
        aux = aux.sig
      }
      aux.sig = newNodo
      newNodo.ant = aux
      this.head.ant = newNodo
    }else{
      this.head = newNodo
      this.head.ant=newNodo
    }
    this.size++
    }
  delete(data){
    let aux = this.head
    if(data==aux.data){this.head=aux.sig 
      return}
    while(aux.sig != null){
      if(aux.data==data){
        aux.ant.sig =aux.sig
        aux.sig.ant=aux.ant
        this.size--
        return
      }
    else{
      aux=aux.sig}
    }
  }
  refresh(dataActual,dataFinal){
    let aux = this.head
    while (aux.sig != null) {
      if (aux.data==dataActual) {
        aux.data=dataFinal
        return
      }
      aux=aux.sig
      }
    }

  search(data){
    let aux = this.head
    while (aux.sig != null) {
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
      while (aux != null) {
          valores.push(aux.data);
          aux = aux.sig;
      }
      return valores;
    }
}
  
const lCircularDEnlazada = new ListaCircularDoblEnlazada();

function ldobleAdd(date){
  lCircularDEnlazada.add(date);
  console.log(linkedList) 
}

function ldobleDelete(date){
  lCircularDEnlazada.delete(date);
  console.log(linkedList) 
}
function ldobleRefresh(date1,date2){
  lCircularDEnlazada.refresh(date1,date2);
  console.log(linkedList) 
}
function ldobleSearch(date){
  return lCircularDEnlazada.search(date); 
}
function ldobleCargar(date){
  lCircularDEnlazada.cargar();
}
function ldobleGuardar(date){
  lCircularDEnlazada.guardar();
}
function ldoblePrint(){return print()}
