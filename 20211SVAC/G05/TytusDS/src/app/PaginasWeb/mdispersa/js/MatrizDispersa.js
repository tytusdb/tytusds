let lista= require('./Lista');
let Nodo= require('./Nodo');
class MatrizDispersa{
  constructor() {
    this.l_horizontal=new lista();
    this.l_vertical=new lista();
  }
  //X FILA Y COLUMNA
  append(valor,x,y){
    let nodo_x=this.l_vertical.buscar(x);
    let nodo_y=this.l_horizontal.buscar(y);
    if(nodo_y==null && nodo_x==null){
      this.caso1(valor,x,y);
    }else if(nodo_y!=null && nodo_x==null){
      this.caso2(valor,x,y);
    }else if(nodo_y==null && nodo_x!=null){
      this.caso3(valor,x,y);
    }else{
      this.caso4(valor,x,y);
    }
  }
  //no existe cabecera en x ni y para colocar el nuevo nodo en la posicion en la que se quiere
  caso1(valor,x,y){
    this.l_horizontal.appendO(y);
    this.l_vertical.appendO(x);
    let pos_x=this.l_vertical.buscar(x);
    let pos_y=this.l_horizontal.buscar(y);
    let nodo= new Nodo(valor,x,y);
    pos_x.der=nodo;
    pos_y.abajo=nodo;
    nodo.arriba=pos_y;
    nodo.izq=pos_x;
  }

  //que la columna exista pero no la fila, y columna x fila
  caso2(valor,x,y){
    this.l_vertical.appendO(x);
    let pos_x=this.l_vertical.buscar(x);
    let pos_y=this.l_horizontal.buscar(y);
    let nodo= new Nodo(valor,x,y);
    pos_x.der=nodo;
    nodo.izq=pos_x;
    //insertar en una columna;
    let current=pos_y.abajo
    while(current!=null){
      if(current.x<x){
        current=current.abajo;
      }else{
        current.arriba.abajo=Nodo;
        nodo.abajo=current;
        nodo.arriba=current.arriba;
        current.arriba=nodo;
        return
      }
    }
    //si la fila es un numero mayor al resto se colocara de ultimo por lo cual se debe obtener el ultimo nodo
    //antes de la inserción de este.
    current=pos_y;
    while (current.abajo!=null){
      current=current.abajo;
    }
    current.abajo=nodo;
    nodo.arriba=current;
  }

  //que no existe la columna pero si la fila
  caso3(valor,x,y){
    this.l_horizontal.appendO(y);
    let pos_x=this.l_vertical.buscar(x);
    let pos_y=this.l_horizontal.buscar(y);
    let nodo= new Nodo(valor,x,y);
    pos_y.abajo=nodo;
    nodo.arriba=pos_y;
    //insertar en una columna;
    let current=pos_x.der
    while(current!=null){
      if(current.y<y){
        current=current.der;
      }else{
        current.der.izq=nodo;
        nodo.der=current;
        nodo.izq=current.izq;
        current.izq=nodo;
        return
      }
    }
    //si la fila es un numero mayor al resto se colocara de ultimo por lo cual se debe obtener el ultimo nodo
    //antes de la inserción de este.
    current=pos_x;
    while (current.der!=null){
      current=current.der;
    }
    current.der=nodo;
    nodo.izq=current;
  }
  //QUE EXISTAN AMBOS VALORES:
  caso4(valor,x,y){
    this.l_horizontal.appendO(y);
    let pos_x=this.l_vertical.buscar(x);
    let pos_y=this.l_horizontal.buscar(y);
    let nodo= new Nodo(valor,x,y);
    let agregado=false;
    //POSICIONAR EN LA COLUMNA DESEADA BUSCANDO LA FILA CORRECTA
    let current=pos_x.der
    while(current!=null){
      if(current.y<y){
        current=current.der;
      }else{
        current.der.izq=nodo;
        nodo.der=current;
        nodo.izq=current.izq;
        current.izq=nodo;
        agregado=true;
      }
    }
    //si la fila es un numero mayor al resto se colocara de ultimo por lo cual se debe obtener el ultimo nodo
    //antes de la inserción de este.
    if(agregado==false){
    current=pos_x;
    while (current.der!=null){
      current=current.der;
    }
    current.der=nodo;
    nodo.izq=current;
    }
    //POSICIONAR EN LA FILA DESEADA BUSCANDO LA COLUMNA CORRECTA
    agregado=false
    current=pos_x.der
    while(current!=null){
      if(current.y<y){
        current=current.der;
      }else{
        current.der.izq=nodo;
        nodo.der=current;
        nodo.izq=current.izq;
        current.izq=nodo;
        agregado=true;
      }
    }
    //si la fila es un numero mayor al resto se colocara de ultimo por lo cual se debe obtener el ultimo nodo
    //antes de la inserción de este.
    if(agregado==false){
    current=pos_x;
    while (current.der!=null){
      current=current.der;
    }
    current.der=nodo;
    nodo.izq=current;}
  }
  printV(){
    let current=this.l_vertical.head;
    let aux;
    while (current!=null){
      aux=current.der;
      while (aux!=null){
        console.log(aux.valor);
        aux=aux.der;
      }
      current=current.next;
    }
  }
  //BUSCAR VALOR
  buscar(valor,x,y){
    let current=this.l_vertical.head;
    let aux;
    while (current!=null){
      aux=current.der;
      while (aux!=null){
        if(aux.valor==valor && aux.x==x && aux.y==y) return aux;
        aux=aux.der;
      }
      current=current.next;
    }
    return null;
  }
  //ELIMINAR:
  delete(valor,x,y){
    let current=this.l_vertical.head;
    let aux;
    while (current!=null){
      aux=current.der;
      while (aux!=null){
        if(aux.valor==valor && aux.x==x && aux.y==y){
          //eliminar arriba
          aux.arriba.abajo=aux.abajo;
          if(aux.abajo!=null){
            aux.abajo.arriba=aux.arriba;
          }
          //eliminar a los lados
          aux.izq.der=aux.der;
          if(aux.der!=null){
            aux.der.izq=aux.izq;
          }
          return;
        }
        aux=aux.der;
      }
      current=current.next;
    }
    console.log("No existe tal valor en dicha posicion");
  }
  update(valor,new_valor,x,y){
    let nodo= this.buscar(valor,x,y);
    nodo.valor=new_valor;
  }
  guardar(){
    let lista=[];
    let current=this.l_vertical.head;
    let aux;
    while (current!=null){
      aux=current.der;
      while (aux!=null){
        lista.push(aux.valor);
        aux=aux.der;
      }
      current=current.next;
    }
    return lista;
  }

}

module.exports = MatrizDispersa;
