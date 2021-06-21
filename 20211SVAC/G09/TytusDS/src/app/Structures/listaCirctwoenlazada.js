class NodoListaCircularDoble{
    constructor(data, sig, ant){
      this.data = data
      this.sig = sig
      this.ant = ant
    }
  }
  class ListaCircularDoblEnlazada{
    constructor(){
      this.head = null;
      this.size = 0;
    }

  add(data){
    const newNodo = new NodoListaCircularDoble(data, this.head, null )
    if(this.head){        
      let aux = this.head
      while(aux.sig != this.head){
        aux = aux.sig
      }
      newNodo.ant = aux
      aux.sig = newNodo
      this.head.ant = aux.sig
    }else{
      this.head = newNodo
      this.head.sig = this.head
      this.head.ant=this.head
    }
    this.size++
    }
  delete(data){
    let aux = this.head
    let aux2 = this.head
    if(data==aux.data){//Comprobando si la cabeza es igual al data
      if(this.head.sig == this.head){
        this.head=null
        return
      }
      this.head=aux.sig
      while(aux.sig != aux2){
        aux = aux.sig
      }
      aux.sig = this.head
      this.head.ant=aux
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
    if(this.head!=null){
    let aux = this.head
    do {
      if (aux.data==dataActual) {
        aux.data=dataFinal
        return
      }
      aux=aux.sig
      }while (aux != this.head)
    }
    }

  search(data){
    let aux = this.head
    do {
      if (aux.data==data) {
        return true
      }
      aux=aux.sig
      }while (aux != this.head)
      return false
    }

  cargar(){}

  guardar(){}

  print(){
    var valores = []
      let aux = this.head;
      do {
          valores.push(aux.data);
          aux = aux.sig;
      }while (aux != this.head)
      return valores;
    }
}
  
const lCircularDEnlazada = new ListaCircularDoblEnlazada();
var categoriaCircular = "Estructura Lineal";
var nombreCircular = 'Lista doble Circular';
var repeticionCircular = "True";
var animacionCircular = "0";

function ldobleCircleAdd(date){
  lCircularDEnlazada.add(date);
  console.log(lCircularDEnlazada.print()) 
}

function ldobleCircleDelete(date){
  lCircularDEnlazada.delete(date);
  console.log(lCircularDEnlazada.print()) 
}
function ldobleCircleRefresh(date1,date2){
  lCircularDEnlazada.refresh(date1,date2);
  console.log(lCircularDEnlazada.print()) 
}
function ldobleCircleSearch(date){
  console.log(lCircularDEnlazada.search(date))
  return lCircularDEnlazada.search(date); 
}
function ldobleCircleCargar(date){
  lCircularDEnlazada.cargar();
}
function ldobleCircleGuardar(date){
  lCircularDEnlazada.guardar();
}
function ldobleCirclePrint(){return print()}

function AbrirListaDobleCircular(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    // El texto del archivo se mostrará por consola aquí
   // console.log(event.target.result)
    let doc = JSON.parse(event.target.result);
    //console.log(doc)

    for (var key in doc) {
      //console.log('name=' + key + ' value=' + doc[key]);
      if(key=='categoria'){
          categoria = doc[key]
          console.log(categoria)
      }
      if(key=='nombre'){
          nombre = doc[key]
          console.log(nombre)
      }
      if(key=='repeticion'){
          repeticion = doc[key]
          console.log(repeticion)
      }
      if(key=='animacion'){
          animacion = doc[key]
          console.log(animacion)
      }
      if(key=='valores'){
          //console.log(doc[key].length)
          for (var k in doc[key]){
            lCircularDEnlazada.add(doc[key][k])
          }
      }
   }
   console.log(lCircularDEnlazada.print())

  };
  
  reader.readAsText(file);
  
}//guardar archivo
function downloadListaDobleCircular(filename, text) {
    
  lista = lCircularDEnlazada.print()

  var element = document.createElement('a');
  let doc = JSON.stringify({ "categoria": categoria, 'nombre': nombre, 'repeticion':repeticion, 'animacion':animacion, 'valores': lista });
  
  //console.log(listSimple.print())
  element.setAttribute('href', 'data:json,' + doc);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
