class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.derecha=null;
    this.izquierda=null;
  }
}


class Arbol {
  constructor() {
    this.raiz=null;
  }

//Anchura

anchura(){
  var arreglo=[];
  var temp = this.raiz;
  arreglo.push(temp.nodo.valor);
  this.auxanchura(temp,arreglo);
  return arreglo;
}

auxanchura(nodo,arreglo){
  if (nodo.izquierda!=null) {
      arreglo.push(nodo.izquierda.nodo.valor);
  }
  if (nodo.derecha!=null) {
    arreglo.push(nodo.derecha.nodo.valor);
  }
  if (nodo.izquierda!=null) {
    this.auxanchura(nodo.izquierda,arreglo);
  }
  if (nodo.derecha!=null) {
    this.auxanchura(nodo.derecha,arreglo);
  }
}

buscaranchura(buscar){
  var nodo = this.raiz;
  if (nodo.nodo.valor==buscar) {
    drawCoordinates(nodo.posX,nodo.posY,"red");
    return;
  }
  this.auxBuscaranchura(nodo,buscar);
}

 auxBuscaranchura(nodo,buscar){
if (nodo.izquierda!=null) {
  if (nodo.izquierda.nodo.valor==buscar) {
    drawCoordinates(nodo.izquierda.posX,nodo.izquierda.posY,"red");
    return;
  }
}
if (nodo.derecha!=null) {
    if (nodo.derecha.nodo.valor==buscar) {
    drawCoordinates(nodo.derecha.posX,nodo.derecha.posY,"red");
    return;
  }
}
  this.auxBuscaranchura(nodo.izquierda,buscar);
  this.auxBuscaranchura(nodo.derecha,buscar);
}


// profundidad
profundidad(){
  var arreglo=[];
  var temp = this.raiz;
  this.auxProfundidad(temp,arreglo);
  return arreglo;
}

auxProfundidad(nodo,arreglo){
  if (nodo==null) {
    return;
  }
  this.auxProfundidad(nodo.izquierda,arreglo);
  arreglo.push(nodo.nodo.valor);
  this.auxProfundidad(nodo.derecha,arreglo);
}

buscarProfundidad(buscar){
  var temp = this.raiz;
  this.auxBuscarProfundidad(temp,buscar);
}
 auxBuscarProfundidad(nodo,buscar){
  if (nodo==null) {
    return;
  }
   this.auxBuscarProfundidad(nodo.izquierda,buscar);

  if (nodo.nodo.valor==buscar) {
    drawCoordinates(nodo.posX,nodo.posY,"red");
    return;
  }
  this.auxBuscarProfundidad(nodo.derecha,buscar);
}

vacio(){
  return this.raiz===null;
}
crearRaiz(valor){
  this.raiz=new Nodo(valor);
}

crearNodo(valor){
return new Nodo(valor);
}

agregarHijo(padre,hijo){
if (this.vacio()) {
  this.raiz=padre;
}

if (hijo==this.raiz) {
  this.raiz=padre;
}
  if (padre.izquierda==null) {
    padre.izquierda=hijo;
    return padre.izquierda;
  }else if (padre.derecha==null) {
    padre.derecha=hijo;
    return padre.derecha;
  }else {
    return null;
  }
}

}
