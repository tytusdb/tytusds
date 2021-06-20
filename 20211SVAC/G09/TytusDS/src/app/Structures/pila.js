
class NodoPila {
    constructor(dato, siguiente) {
      this.dato = dato;
      this.siguiente = siguiente;
    }
}
  
class Pila{

    constructor() {
      this.primero = null;
    }
    
    //Ingresar datos
    push(dato) {
      const nuevo = new NodoPila(dato, this.primero);
      this.primero = nuevo;
    }

    //Sacar el ultimo de la pila
    pop() {
      if (this.primero) {
        if (this.primero.siguiente) {
          const nodoAux = this.primero.siguiente;
          this.primero = nodoAux;
        } else {
          this.primero = null;
        }
      }
    }

    //Mostrar valores de la pila
    print() {
      let mostrarNodo = this.primero;
      while (mostrarNodo) {
        console.log(mostrarNodo.dato);
        mostrarNodo = mostrarNodo.siguiente;
      }
    }
}
const stack = new Pila();
function addValuePila(data){
  stack.push(data);
  console.log("-------------Nueva Pila----------------");
  stack.print();
}
function getValuePilaDelet(){
  stack.pop();
  console.log("-------------Nueva Pila----------------");
  stack.print();//
}

console.log("Ingresando valores");
//stack.push(1);
//stack.push(2);
//stack.push(3);
//stack.print();
//console.log("Sacamos ultimo de la pila: ");
//stack.pop(); //Sacamos 3
//stack.print();
function AbrirArchivoPila(event) {
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
              listSimple.add(doc[key][k])
          }
      }
   }
   

  };

  reader.readAsText(file);
}//guardar archivo
function downloadPila(filename, text) {
  
  lista = listSimple.print()

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


