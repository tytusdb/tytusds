class NodoSimpleCircular {
  constructor(valor, siguiente) {
    this.valor = valor;
    this.siguiente = siguiente;
    this.primero = false;
  }
}

class ListaSimpleCircular {
  constructor() {
    this.cabeza = null;
    this.length = 0;
  }

  add_f(valor) {
    let nuevo = new NodoSimpleCircular(valor, null);
    if (this.cabeza == null) {
      this.cabeza = nuevo;
      nuevo.primero = true;
    } else if (this.cabeza.siguiente == null) {
      let aux = this.cabeza;
      aux.siguiente = nuevo;
      nuevo.siguiente = aux;
    } else {
      let aux = this.cabeza;
      while (!aux.siguiente.primero){
        aux=aux.siguiente;
      }
      aux.siguiente = nuevo;
      nuevo.siguiente = this.cabeza;
    }
    this.length++;
  }

  add_i(valor) {
    let nuevo = new NodoSimpleCircular(valor, null);
    if (this.cabeza == null) {
      this.cabeza = nuevo;
      nuevo.primero = true;
    } else if (this.cabeza.siguiente == null) {
      let aux = this.cabeza;
      aux.primero = false;
      nuevo.siguiente = aux;
      aux.siguiente = nuevo;
      this.cabeza = nuevo;
      nuevo.primero = true;
    } else {
      let aux = this.cabeza;
      while (!aux.siguiente.primero){
        aux=aux.siguiente;
      }
      aux.siguiente.primero = false;
      aux.siguiente=nuevo;
      nuevo.siguiente = this.cabeza;
      this.cabeza = nuevo;
      nuevo.primero = true;
    }
    this.length++;
  }


  delete(valor){
    if(this.cabeza.valor == valor){
      this.cabeza=this.cabeza.siguiente;
      this.length--;
      if(this.cabeza!=null){
        this.cabeza.primero=true;
        let aux = this.cabeza;
        while (!aux.siguiente.primero){
          aux=aux.siguiente;
        }
        aux.siguiente=this.cabeza;
        if(this.cabeza.siguiente.primero){
          this.cabeza.siguiente=null;
        }
      }
      
    }else{
      let aux = this.cabeza;
      while(!aux.siguiente.primero){
        if(aux.siguiente.valor==valor){
          aux.siguiente=aux.siguiente.siguiente;
          this.length--;
          if(this.cabeza.siguiente.primero){
            this.cabeza.siguiente=null;
            break;
          }
        }
        aux=aux.siguiente;
      }
    }
  }

  update(valor, nvalor) {
    let aux = this.cabeza;
    let casoPrimero = true;
    while (aux != null && (casoPrimero || !aux.primero)) {
      if (aux.valor == valor) {
        aux.valor = nvalor;
        console.log("se reemplazo: " + valor + ", por: " + aux.valor);
        casoPrimero = false;
        break;
      }else if(aux.primero){
        casoPrimero=false;
      }
      aux = aux.siguiente;
    }
  }

  seek(valor) {
    let aux = this.cabeza;
    let casoPrimero = true;
    while (aux != null && (casoPrimero || !aux.primero)) {
      if (aux.valor == valor) {
        console.log("encontrado paps: " + aux.valor);
        casoPrimero=false;
        return aux.valor;
      }else if(aux.primero){
        casoPrimero=false;
      }
      aux = aux.siguiente;
    }
    console.log("se busco: " + valor + " pero no esta paps");
    return null;
  }

  get(index) {
    let aux = this.cabeza;
    for(let i =0; i<this.length; i++ ){
      if(i==index){
          break
      }
      aux = aux.siguiente;
    }
    return aux.valor
  }

  first(){
    let casoPrimero = true;
    let actual = this.cabeza;
    for (; actual != null && (casoPrimero || !actual.primero); actual = actual.siguiente) {
      casoPrimero = false;
    }
    return actual.valor
  }


  imprimir() {
    let casoPrimero = true;
    let actual = this.cabeza;
    for (; actual != null && (casoPrimero || !actual.primero); actual = actual.siguiente) {
      casoPrimero = false;
      console.log(actual.valor+"->");
    }
    console.log(actual.valor+"->");
  }


}

let lista = new ListaSimpleCircular();

lista.add_f(1);
lista.add_f(2);
lista.add_i(3);
lista.imprimir();
console.log("");

lista.delete(2);
lista.imprimir();

export default ListaSimpleCircular;