class NodoDoble {
  constructor(valor, siguiente, anterior) {
    this.valor = valor;
    this.siguiente = siguiente;
    this.anterior = anterior;
  }
}


class ListaDobleEnlazada {
  constructor() {
    this.cabeza = null;
  }

  add_f(valor){
    let nuevo = new NodoDoble(valor, null, null);
    if (this.cabeza == null){
      this.cabeza = nuevo;
    }else{
      let aux = this.cabeza;
      while(aux.siguiente != null){
        aux = aux.siguiente;
      }
      aux.siguiente = nuevo;
      nuevo.anterior = aux;
    }
  }


  add_i(valor){
    let nuevo = new NodoDoble(valor,null,null);
    if (this.cabeza == null){
      this.cabeza = nuevo;
    }else{
      let aux = this.cabeza;
      nuevo.siguiente = aux;
      aux.anterior = nuevo;
      this.cabeza = nuevo;
    }
  }

  delete(valor) {
    if (this.cabeza.valor == valor) {
      this.cabeza = this.cabeza.siguiente;
      if (this.cabeza != null){
        this.cabeza.anterior=null;
      }
    } else {
      let aux = this.cabeza;
      while (aux.siguiente != null) {
        if (aux.siguiente.valor == valor) {
          aux.siguiente = aux.siguiente.siguiente;
          if (aux.siguiente != null){
            aux.siguiente.anterior=aux;
          }
          break;
        }
        aux = aux.siguiente;
      }
    }
  }

  update(valor, nvalor){
      let aux = this.cabeza;
      while (aux != null) {
        if (aux.valor == valor) {
          aux.valor = nvalor;
          console.log("se reemplazo: " + valor + ", por: "+ aux.valor);
        }
        aux = aux.siguiente;
    }
  }

  seek(valor){
    let aux = this.cabeza;
    while (aux != null) {
      if (aux.valor == valor) {
        console.log("encontrado paps: " + aux.valor);
        return aux.valor;
      }
      aux = aux.siguiente;
  }
    console.log("se busco: "+ valor + " pero no esta paps");
    return null;
  }

    imprimir() {
      let aux = this.cabeza;
      while (aux != null) {
        if (aux.siguiente != null) {
          console.log(aux.valor + "<->");
          aux = aux.siguiente
        } else {
          console.log(aux.valor);
          aux = aux.siguiente;
        }
      }
    }

}

let lista = new ListaDobleEnlazada();
lista.add_i(7);
lista.add_i(5);
lista.add_f(1);
lista.add_f(2);
lista.add_f(3);
lista.add_f(4);
lista.add_f(6);
lista.imprimir();
console.log("");
lista.update(7,9);
lista.imprimir();
console.log("");
lista.delete(9);
lista.imprimir();
