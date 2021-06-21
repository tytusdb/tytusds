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
    this.length = 0;
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
    this.length++;
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
    this.length++;
  }

  delete(valor) {
    if (this.cabeza.valor == valor) {
      this.cabeza = this.cabeza.siguiente;
      this.length--;
      if (this.cabeza != null){
        this.cabeza.anterior=null;
      }
    } else {
      let aux = this.cabeza;
      while (aux.siguiente != null) {
        if (aux.siguiente.valor == valor) {
          aux.siguiente = aux.siguiente.siguiente;
          this.length--;
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
          break;
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
          console.log(aux.valor + "<->");
          aux = aux.siguiente
        } else {
          console.log(aux.valor);
          aux = aux.siguiente;
        }
      }
    }

}

export default ListaDobleEnlazada;
