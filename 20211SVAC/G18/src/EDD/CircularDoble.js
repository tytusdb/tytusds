class NodoDobleCircular {
  constructor(valor, siguiente, anterior) {
    this.valor = valor;
    this.siguiente = siguiente;
    this.anterior = anterior;
    this.primero = false;
  }
}


class ListaDobleCircular {
  constructor() {
    this.cabeza = null;
  }

  add_f(valor) {
    let nuevo = new NodoDobleCircular(valor, null, null);
    if (this.cabeza == null) {
      this.cabeza = nuevo;
      nuevo.primero = true;
    } else if (this.cabeza.siguiente == null) {
      let aux = this.cabeza;
      aux.siguiente = nuevo;
      aux.anterior = nuevo;
      nuevo.anterior = aux;
      nuevo.siguiente = aux;
    } else {
      let aux = this.cabeza;
      let ultimo = aux.anterior;
      aux.anterior = nuevo;
      ultimo.siguiente = nuevo;
      nuevo.siguiente = aux;
      nuevo.anterior = ultimo;
    }
  }

  add_i(valor) {
    let nuevo = new NodoDobleCircular(valor, null, null);
    if (this.cabeza == null) {
      this.cabeza = nuevo;
      nuevo.primero = true;
    } else if (this.cabeza.siguiente == null) {
      let aux = this.cabeza;
      aux.primero = false;
      nuevo.siguiente = aux;
      nuevo.anterior = aux;
      aux.anterior = nuevo;
      aux.siguiente = nuevo;
      this.cabeza = nuevo;
      nuevo.primero = true;
    } else {
      let aux = this.cabeza;
      let ultimo = aux.anterior;
      aux.primero = false;
      aux.anterior = nuevo;
      ultimo.siguiente = nuevo;
      nuevo.siguiente = aux;
      nuevo.anterior = ultimo;
      this.cabeza = nuevo;
      nuevo.primero = true;
    }
  }

  delete(valor){
    if(this.cabeza.valor == valor){
      this.cabeza=this.cabeza.siguiente;
      if(this.cabeza!=null){
        this.cabeza.primero=true;
        this.cabeza.anterior.anterior.siguiente=this.cabeza;
        this.cabeza.anterior=this.cabeza.anterior.anterior;
        if(this.cabeza.siguiente.primero){
          this.cabeza.siguiente=null;
          this.cabeza.anterior=null;
        }
      }
    }else{
      let aux = this.cabeza;
      while(!aux.siguiente.primero){
        if(aux.siguiente.valor==valor){
          aux.siguiente=aux.siguiente.siguiente;
          aux.siguiente.anterior=aux;
          if(this.cabeza.siguiente.primero){
            this.cabeza.siguiente=null;
            this.cabeza.anterior=null;
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



  imprimir() {
    let aux = this.cabeza;
    let casoPrimero = true;
    for (let actual = this.cabeza; actual != null && (casoPrimero || !actual.primero); actual = actual.siguiente) {
      casoPrimero = false;
      console.log(actual.valor);
    }
    casoPrimero = true;
    for (let actual = this.cabeza; actual != null && (casoPrimero || !actual.primero); actual = actual.siguiente) {
      casoPrimero = false;
      console.log(actual.valor);
    }
  }

}

let lista = new ListaDobleCircular();
lista.add_f(1);
lista.add_f(2);
lista.add_i(3);
lista.imprimir();
console.log("");
lista.update(40,6);
lista.seek(3);
lista.imprimir();
lista.delete(40);
console.log("");
lista.imprimir();
