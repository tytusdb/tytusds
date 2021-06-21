class NodoListaSimpleCirular{
    constructor(data, sig){
      this.data = data;
      this.sig = sig;
    }
  }
  class ListaSimpleCirular{
    constructor(){
      this.head = null;
      this.size = 0;
    }
    
  
  add(data){
    const newNodo = new NodoListaSimpleCirular(data, this.head);
    if(this.head){        
      let aux = this.head
      while(aux.sig != this.head){
        aux = aux.sig;
      }
      aux.sig = newNodo;
    }else{
    this.head = newNodo
    this.head.sig=this.head
    }
    this.size++
    }
  delete(data){
    let aux = this.head
    let aux2
    if(data==aux.data){
      if(this.head.sig==this.head)
      {this.head=null}
      else{
      this.head=aux.sig
      aux=this.head //Reiniciando aux, para que recorra hasta el último valor y cambiarle su cabecera

      while (aux.sig.sig!=this.head) { //Se recorre el siguiente del siguienta para que valide la nueva cabecera
        aux=aux.sig
      }
      aux.sig=this.head}
      this.size--
      return}

    do{
      aux2=aux.sig;
      //console.log(aux.data+"  "+aux2.data)
      if(aux2.data==data){  
        aux2=aux2.sig
        aux.sig=aux2
        this.size--
        break
      }
    else{
      aux=aux.sig}
    }while(aux != this.head)
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
    if(this.head!=null){
    do {
      if (aux.data==data) {
        return true
      }
      aux=aux.sig
    }while (aux != this.head)
    }
    return false
  }

  cargar(){}

  guardar(){}

  print(){
    var valores = []
    if(this.head!=null){
      let aux = this.head;
      do{
          valores.push(aux.data);
          aux = aux.sig;
      }while (aux != this.head);
      return valores;
  }
}
}
  
const lSCircular = new ListaSimpleCirular();
var categoriaCircular = "Estructura Lineal";
var nombreCircular = 'Lista Simple Circular';
var repeticionCircular = "True";
var animacionCircular = "0";

function lsimpleCircleAdd(date){
  lSCircular.add(date);
  console.log(lSCircular.print()) 
}

function lsimpleCircleDelete(date){
  lSCircular.delete(date);
  console.log(lSCircular.print()) 
}
function lsimpleCircleRefresh(date1,date2){
  lSCircular.refresh(date1,date2);
  console.log(lSCircular.print()) 
}
function lsimpleCircleSearch(date){
  console.log(lSCircular.search(date))
  return lSCircular.search(date); 
}
function lsimpleCrircleCargar(date){
  lSCircular.cargar();
}
function lsimpleCircleGuardar(date){
  lSCircular.guardar();
}
function lsimpleCriclePrint(){return print()}

function ArbrirArchivoListaSimpleCirular(event){
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
            categoriaCircular = doc[key]
            console.log(categoria)
        }
        if(key=='nombre'){
            nombreCircular = doc[key]
            console.log(nombre)
        }
        if(key=='repeticion'){
            repeticionCircular = doc[key]
            console.log(repeticion)
        }
        if(key=='animacion'){
            animacionCircular = doc[key]
            console.log(animacion)
        }
        if(key=='valores'){
            //console.log(doc[key].length)
            for (var k in doc[key]){
              lSCircular.add(doc[key][k])
            }
        }
     }
     console.log(lSCircular.print())

    };
    
    reader.readAsText(file);
}//guardar archivo
function downloadEnlazadaCircular(filename, text) {
    
  listaCir = lSCircular.print()

  var element = document.createElement('a');
  let doc = JSON.stringify({ "categoria": categoriaCircular, 'nombre': nombreCircular, 'repeticion':repeticionCircular, 'animacion':animacionCircular, 'valores': listaCir });
  
  //console.log(listSimple.print())
  element.setAttribute('href', 'data:json,' + doc);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


