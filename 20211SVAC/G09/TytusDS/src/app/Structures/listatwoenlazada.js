class Nodo{
    constructor(data, sig, ant){
      this.data = data
      this.sig = sig
      this.ant = ant
    }
  }
  class ListaDobleEnlazada{
    constructor(){
      this.head = null;
      this.size = 0;
    }
  
  add(data){
    const newNodo = new Nodo(data, null, null)
    if(this.head){        
      let current = this.head
      while(current.sig){
        current = current.sig
      }
      current.sig = newNodo
      newNodo.ant = current
    }else{
      this.head = newNodo
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
  
const lDEnlazada = new ListaDobleEnlazada();

function ldobleAdd(date){
  lDEnlazada.add(date);
}

function ldobleDelete(date){
  lDEnlazada.delete(date) 
}
function ldobleRefresh(date1,date2){
  lDEnlazada.refresh(date1,date2)
}
function ldobleSearch(date){
  return lDEnlazada.search(date) 
}
function ldobleCargar(date){
  lDEnlazada.cargar()
}
function ldobleGuardar(date){
  lDEnlazada.guardar()
}
function ldoblePrint(){return print()}
