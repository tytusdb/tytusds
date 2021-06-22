class NodoSimple {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}


class ListaSimple {
  constructor() {
    this.cabeza = null;
    this.length = 0;
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
    this.length++;
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
    this.length++;
  }

  delete(valor) {
    if (this.cabeza.valor == valor) {
      this.cabeza = this.cabeza.siguiente;
      this.length--;
    } else {
      let aux = this.cabeza;
      while (aux.siguiente != null) {
        if (aux.siguiente.valor == valor) {
          aux.siguiente = aux.siguiente.siguiente;
          this.length--;
          break
        }
        aux = aux.siguiente;
      }
    }
  }


  update(valor, nvalor) {
    let aux = this.cabeza;
    while (aux != null) {
      if (aux.valor == valor) {
        aux.valor = nvalor;
        console.log("se reemplazo: " + valor + ", por: " + aux.valor);
        break;
      }
      aux = aux.siguiente;
    }
  }

  seek(valor) {
    let aux = this.cabeza;
    while (aux != null) {
      if (aux.valor == valor) {
        console.log("encontrado paps: " + aux.valor);
        return aux.valor;
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
