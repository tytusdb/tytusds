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

  //que la columna exista pero no la fila,                             y columna x fila
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
        nodo.abajo=current;
        nodo.arriba=current.arriba;
        current.arriba.abajo=Nodo;
        current.arriba=nodo;
        return
      }
    }
    //si la fila es un numero mayor al resto se colocara de ultimo por lo cual se debe obtener el ultimo nodo
    //antes de la inserción de este.
    current=pos_y.abajo;
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
        current.izq.der=nodo;
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
    let pos_x=this.l_vertical.buscar(x);
    let pos_y=this.l_horizontal.buscar(y);
    let nodo= new Nodo(valor,x,y);
    let agregado=false;
    //POSICIONAR EN LA COLUMNA DESEADA BUSCANDO LA FILA CORRECTA
    let current=pos_y.abajo;
    while(current!=null){
      if(current.x<x){
        current=current.abajo;
      }else{
        nodo.abajo=current;
        current.arriba.abajo=nodo;
        nodo.arriba=current.arriba;
        current.arriba=nodo;
        agregado=true;
        break;
      }
    }
    //si la fila es un numero mayor al resto se colocara de ultimo por lo cual se debe obtener el ultimo nodo
    //antes de la inserción de este.
    if(agregado==false){
    current=pos_y.abajo;
    while (current.abajo!=null){
      current=current.abajo;
    }
    current.abajo=nodo;
    nodo.arriba=current;
    }
    //POSICIONAR EN LA FILA DESEADA BUSCANDO LA COLUMNA CORRECTA
    agregado=false
    current=pos_x.der
    while(current!=null){
      if(current.y<y){
        current=current.der;
      }else{
        nodo.der=current;
        current.izq.der=nodo;
        nodo.izq=current.izq;
        current.izq=nodo;
        agregado=true;
        break;
      }
    }
    //si la fila es un numero mayor al resto se colocara de ultimo por lo cual se debe obtener el ultimo nodo
    //antes de la inserción de este.
    if(agregado==false){
    current=pos_x.der;
    while (current.der!=null){
      current=current.der;
    }
    current.der=nodo;
    nodo.izq=current;
    }
  }
  printV(){
    let current=this.l_vertical.head;
    let aux;
    while (current!=null){
      aux=current.der;
      while (aux!=null){
        console.log(`${aux.valor} x: ${aux.x} y: ${aux.y}`);
        aux=aux.der;
      }
      current=current.next;
    }
  }
  printH(){
    let current=this.l_horizontal.head;
    let aux;
    while (current!=null){
      aux=current.abajo;
      while (aux!=null){
        console.log(`${aux.valor} x: ${aux.x} y: ${aux.y}`);
        aux=aux.abajo;
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
  //METODOS PARA RETORNAR UNA LISTA DE OBJETOS DE NODOS Y APUNTADORES
  Lnodos(){
    function NodoVis(id,label,shape,color="red"){
      this.id= id;
      this.label= label;
      this.shape=shape;
      this.color=color
    }
    let Lnodos=[];
    let nodovis;

    //llenar la lista de las cabeceras de las filas
    let current=this.l_vertical.head;
    //las cabeceras de las filas tendran un color azul
    while (current!=null){
      nodovis= new NodoVis(`F${current.valor}`,current.valor.toString(),"box","blue")
      Lnodos.push(nodovis);
      current=current.next;
    }
    //llenar la lista de las cabeceras de las columnas
    current=this.l_horizontal.head;
    while (current!=null){
      //las cabeceras de las filas tendran un color rojo
      nodovis= new NodoVis(`C${current.valor}`,current.valor.toString(),"box","red")
      Lnodos.push(nodovis);
      current=current.next;
    }
    //llenar la lista de los nodos insertados en la matriz
    current=this.l_vertical.head;
    let aux;
    while (current!=null){
      aux=current.der;
      while (aux!=null){
        //las cabeceras de las filas tendran un color rojo
        nodovis= new NodoVis(`F${aux.x}C${aux.y}`,aux.valor.toString(),"box","purple");
        Lnodos.push(nodovis);
        aux=aux.der;
      }
      current=current.next;
    }
    return Lnodos;
  }
  Ledges(){
    function Edge(from,to,label="",tailport="",headport=""){
      this.from=from
      this.to=to;
      this.label=label;
      this.tailport=tailport;
      this.headport=headport;
    }
    let Ledges=[]
    let edgevis;
    let aux;
    //QUE LAS CABECERAS DE LAS FILAS APUNTEN ENTRE SI
    let current=this.l_vertical.head;
    while (current.next!=null){
      edgevis= new Edge(`F${current.valor}`,`F${current.next.valor}`,"");
      Ledges.push(edgevis);
      current=current.next;
    }
    //QUE LAS CABECERAS DE LAS COLUMNAS APUNTEN ENTRE SI
    current=this.l_horizontal.head;
    while (current.next!=null){
      edgevis= new Edge(`C${current.valor}`,`C${current.next.valor}`,"");
      Ledges.push(edgevis);
      current=current.next;
    }
    //QUE LAS CABECERAS DE LAS FILAS APUNTEN A SU NODO DERECHA MAS PROXIMO
    current=this.l_vertical.head;
    while (current!=null){
      aux=current.der;
      edgevis= new Edge(`F${aux.x}`,`F${aux.x}C${aux.y}`,"","e","w");
      Ledges.push(edgevis);
      current=current.next;
    }
    //QUE LAS CABECERAS DE LAS COLUMNAS APUNTEN A SU NODO ABAJO MAS PROXIMO
    current=this.l_horizontal.head;
    while (current!=null){
      aux=current.abajo;
      edgevis= new Edge(`C${aux.y}`,`F${aux.x}C${aux.y}`,"","s","n");
      Ledges.push(edgevis);
      current=current.next;
    }
    //QUE CADA NODO INSERTADO A PUNTE A SU NODO DERECHO
    //acabar un nodo antes
    current=this.l_vertical.head;
    let aux2;
    while (current!=null){
      aux=current.der;
      while(aux.der!=null){
        aux2=aux.der;
        edgevis= new Edge(`F${aux.x}C${aux.y}`,`F${aux2.x}C${aux2.y}`,"");
        Ledges.push(edgevis);
        aux=aux.der
      }
      current=current.next;
    }
    //QUE CADA NODO APUNTE A SU NODO DE ABAJO
    current=this.l_horizontal.head;
    while (current!=null){
      aux=current.abajo;
      while(aux.abajo!=null){
        aux2=aux.abajo;
        edgevis= new Edge(`F${aux.x}C${aux.y}`,`F${aux2.x}C${aux2.y}`,"");
        Ledges.push(edgevis);
        aux=aux.abajo
      }
      current=current.next;
    }
    return Ledges;
  }

}

module.exports = MatrizDispersa;
