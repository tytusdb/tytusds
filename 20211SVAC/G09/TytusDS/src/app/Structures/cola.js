class NodoCola {
    constructor(dato, siguiente) {
      this.dato = dato;
      this.siguiente = siguiente;
    }
}
  
class Cola {
    constructor() {
      this.primero = null;
      this.guardarCola = null;
    }

    //Ingresar datos a la cola
    enqueue(dato) {
      const nuevo = new NodoCola(dato, null);
      if (this.guardarCola) {
        this.guardarCola.siguiente = nuevo;
      }
      this.guardarCola = nuevo
      if (!this.primero) {
        this.primero = this.guardarCola
      }
    }

    //Sacar el primero de la cola
    dequeue() {
      if (!this.primero) {
        return null;
      }
      const nodoPrimero = this.primero;
      if (this.primero.siguiente) {
        this.primero = this.primero.siguiente;
      } else {
        this.primero = null; 
        this.guardarCola = null; 
      }
      return nodoPrimero;
    }

    //mostrar datos de la cola
    print() {
      let mostrarNodo = this.primero;
      while (mostrarNodo) {
        console.log(mostrarNodo.dato);
        mostrarNodo = mostrarNodo.siguiente;
      }
    }

    //Metodo buscar
    buscar(dato){
      let mostrarNodo = this.primero;
      var encontrar = false;
      while (mostrarNodo) {
        if(mostrarNodo.dato === dato){
          encontrar = true;
          return encontrar;
        }
        mostrarNodo = mostrarNodo.siguiente;
      }
      return encontrar
    }
  }

const cola = new Cola();
var categoriaCola = "Estructura Lineal";
var nombreCola = 'Lista Simple';
var repeticionCola = "True";
var animacionCola = "0";

function adDCola(data){
  cola.enqueue(data)
  console.log("-------------------------------")
  cola.print()
}

function DeletCola(data){
  cola.dequeue(data)
  console.log("-------------------------------")
  cola.print()
}

function buscarCola(data){
  console.log(cola.buscar(data))
  console.log("-------------------------------")
 
}
//abrir un documento
function AbrirArchivoCola(event) {
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
          categoriaCola = doc[key]
          console.log(categoria)
      }
      if(key=='nombre'){
          nombreCola = doc[key]
          console.log(nombre)
      }
      if(key=='repeticion'){
          repeticionCola = doc[key]
          console.log(repeticion)
      }
      if(key=='animacion'){
          animacionCola = doc[key]
          console.log(animacion)
      }
      if(key=='valores'){
          //console.log(doc[key].length)
          for (var k in doc[key]){
              cola.enqueue(doc[key][k])
          }
      }
   }
   cola.print()

  };

  reader.readAsText(file);
}//guardar archivo
function downloadCola(filename, text) {
  
  lista = listSimple.print()

  var element = document.createElement('a');
  let doc = JSON.stringify({ "categoria": categoriaCola, 'nombre': nombreCola, 'repeticion':repeticionCola, 'animacion':animacionCola, 'valores': lista });
  
  //console.log(listSimple.print())
  element.setAttribute('href', 'data:json,' + doc);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
