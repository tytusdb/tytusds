class NodoListaTwoEnlazada{
    constructor(data, sig, ant){
      this.data = data
      this.sig = sig
      this.ant = ant
    }
  }
  class ListaDobleEnlazada{
    constructor(){
      this.head = null;
      this.size = 0;
    }
  
  add(data){
    const newNodo = new NodoListaTwoEnlazada(data, null, null)
    if(this.head){        
      let current = this.head
      while(current.sig){
        current = current.sig
      }
      current.sig = newNodo
      newNodo.ant = current
    }else{
      this.head = newNodo
    }
    this.size++
    
    }
  delete(data){
    let aux = this.head
    if(data==aux.data){this.head=aux.sig 
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
    let aux = this.head
    while (aux.sig != null) {
      if (aux.data==dataActual) {
        aux.data=dataFinal
        return
      }
      aux=aux.sig
      }
    }

  search(data){
    let aux = this.head
    while (aux.sig != null) {
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
      while (aux != null) {
          valores.push(aux.data);
          aux = aux.sig;
      }
      return valores;
    }
}
  
const lDEnlazada = new ListaDobleEnlazada();

function ldobleAdd(date){
  lDEnlazada.add(date);
  console.log(lDEnlazada.print())
}

function ldobleDelete(date){
  lDEnlazada.delete(date) 
  console.log(lDEnlazada.print())
}
function ldobleRefresh(date1,date2){
  lDEnlazada.refresh(date1,date2)
  console.log(lDEnlazada.print())
}
function ldobleSearch(date){
  console.log(lDEnlazada.search(date)) 
  return lDEnlazada.search(date)
  
}
function ldobleCargar(date){
  lDEnlazada.cargar()
}
function ldobleGuardar(date){
  lDEnlazada.guardar()
}
function ldoblePrint(){return print()}

//FUncion Guardar Archivo
function AbrirArchivoListaDobleEnlazada(event) {
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
            lDEnlazada.add(doc[key][k])
            
          }
      }
    
   }
   console.log(lDEnlazada.print())

  };

  reader.readAsText(file);
  
}/////////////////////

function downloadListaDobleEnlazada(filename, text) {
    
  lista = lDEnlazada.print()

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


