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
    if(data==aux.data){this.head=aux.sig
      return}
    while(aux.sig != this.head){
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
    }
  }
  refresh(dataActual,dataFinal){
    let aux = this.head
    while (aux.sig != this.head) {
      if (aux.data==dataActual) {
        aux.data=dataFinal
        return
      }
      aux=aux.sig
    }
    }

  search(data){
    let aux = this.head
    while (aux.sig != this.head) {
      if (aux.data==data) {
        return true
      }
      aux=aux.sig
    }return false
    }

  cargar(){}

  guardar(){}

  print(){
    var valores = []
      let aux = this.head;
      while (aux.sig != this.head) {
          valores.push(aux.data);
          aux = aux.sig;
      }
      return valores;
    }
}
  
const lSCircular = new ListaSimpleCirular();

function lsimplecircleAdd(date){
  lSCircular.add(date);
  console.log(lSCircular.print()) 
}

function lsimpleCircleDelete(date){
  lSCircular.delete(date);
  console.log(lSCircular.print()) 
}
function lsimpleCircleRefresh(date1,date2){
  lSCircular.refresh(date1,date2);
  //console.log(linkedList) 
}
function lsimpleCircleSearch(date){
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
              lSCircular.add(doc[key][k])
            }
        }
     }
     

    };
    console.log(lSCircular.print())
    reader.readAsText(file);
}//guardar archivo


