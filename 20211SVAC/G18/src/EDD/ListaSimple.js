class NodoSimple {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}


class ListaSimple {
  constructor() {
    this.cabeza = null;
  }

  add_f(valor) {
    let nuevo = new NodoSimple(valor);
    if (this.cabeza == null) {
      this.cabeza = nuevo;
    } else {
      let aux = this.cabeza;
      while (aux.siguiente != null) {
        aux = aux.siguiente;
      }
      aux.siguiente = nuevo;
    }
  }

  add_i(valor) {
    let nuevo = new NodoSimple(valor);
    if (this.cabeza == null) {
      this.cabeza = nuevo;
    } else {
      let aux = this.cabeza;
      nuevo.siguiente = aux;
      this.cabeza = nuevo;
    }
  }

  delete(valor) {
    if (this.cabeza.valor == valor) {
      this.cabeza = this.cabeza.siguiente;
    } else {
      let aux = this.cabeza;
      while (aux.siguiente != null) {
        if (aux.siguiente.valor == valor) {
          aux.siguiente = aux.siguiente.siguiente;
          break
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
        console.log(aux.valor + "->");
        aux = aux.siguiente
      } else {
        console.log(aux.valor);
        aux = aux.siguiente;
      }
    }
  }

}



export default ListaSimple;

