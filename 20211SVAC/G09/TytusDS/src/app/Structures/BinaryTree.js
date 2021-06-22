let hola = [];
class NodoBinaryTree {
    constructor (value) {
      this.value = value
      this.derecha = null
      this.izquierda = null
    }
  }
  
  class Tree {
    constructor () {
      this.raiz = null
    }
  
    isEmpty () {
      return this.raiz === null
    }
  
    addBinary (value) {
      // arbol no tiene elementos
      if (this.isEmpty()) {
        this.raiz = new NodoBinaryTree(value)
        return
      }
      var aux = this.raiz
  
      while (aux) {
        // vamos hacia la izquierda
        if (value < aux.value) {
          if (aux.izquierda) {
            aux = aux.izquierda
          } else {
            aux.izquierda = new NodoBinaryTree(value)
            return
          }
        } else { // vamos hacia la derecha
          if (aux.derecha) {
            aux = aux.derecha
          } else {
            aux.derecha = new NodoBinaryTree(value)
            return
          }
        }
      }
    }
  
     agregarRecursivo (value, node = this.raiz) {
      if (!node) {
        this.raiz = new NodoBinaryTree(value)
        return
      }
  
      if (value < node.value) {
        if (node.izquierda) {
          return this.agregarRecursivo(value, node.izquierda)
        }
        node.izquierda = new NodoBinaryTree(value)
        return
      } else { // vamos hacia la derecha
        if (node.derecha) {
          return this.agregarRecursivo(value, node.derecha)
        }
        node.derecha = new NodoBinaryTree(value)
        return
      }
    }
  
    find (value) {
      if (this.isEmpty()) {
        return null
      }
  
      var aux = this.raiz
      //console.log(aux)
      if (aux.value === value) {
       
        return aux
      }
  
      while(aux) {
        // si encontramos el nodo con el valor
        // paramos de iterar.
        if (aux.value === value) {
  
          console.log(aux)
          break
        }
        // seguimos buscando a la derecha
        if (aux.value < value) {
          aux = aux.derecha
        } else if (aux.value > value) {
          // seguimos buscando a la izquierda
          aux = aux.izquierda
        }
      }
      // retornamos el nodo encontrado.
      // si no encontramos el nodo con el valor
      // aux, toma el valor null.
      return aux
    }
  
  
    findMin(node = this.raiz) {
      if (!this.isEmpty()) {
        /**
          * siempre a la izquierda de cualquier nodo
          * estará el menor valor.
          * iteramos hasta el último menor.
          */
        while (node.izquierda) {
          node = node.izquierda
        }
        return node
      }
    }
  
    delete (value, node = this.raiz) {
      if (!node) {
        return null
      }
      if (node.value === value) {
        // no tiene hijos
        if (!node.izquierda && !node.derecha) {
          return null
        }
        // no tiene hijo izquierdo
        if (!node.izquierda) {
          return node.derecha
        }
        // no tiene hijo derecho
        if (!node.derecha) {
          return node.izquierda
        }
  
        // tiene dos hijos
        // buscamos el menor de los hijos
        var temp = this.findMin(node.derecha)
        // con ese valor reemplazamos el valor del nodo que queremos eliminar.
        node.value = temp.value;
        // seguimos iterando para reemplazar la rama que cambio,
        // eliminando el nodo que está repetido
        node.derecha = this.delete(temp.value, node.derecha)
        return node;
      }
      // buscamos a la derecha
      if (node.value < value) {
        node.derecha = this.delete(value, node.derecha)
        return node
      }
      // buscamos a la izquierda
      if (node.value > value) {
        node.izquierda = this.delete(value, node.izquierda)
        return node
      }
    }
    
    imprimir (node = this.raiz) {
      
      if (!node) {
        return
      }
      this.imprimir(node.izquierda);
      console.log(node.value)
      hola.push(node.value)
      this.imprimir(node.derecha);
    }
    /**
      * recorre primero toda la rama izquierda
      * de izquierda al centro.
      * Luego imprime la raíz, y finalmente
      * recorre la rama derecha, del centro hacia
      * la derecha.
      */
    inOrder (node = this.raiz) {
      if (!node) {
        return
      }
      this.inOrder(node.izquierda)
      console.log(node.value)
      hola.push(node.value)
      this.inOrder(node.derecha)
    }
    /**
      * Imprime primero la raíz, luego
      * toda la rama izquierda de izquierda al centro.
      * y finalmente recorre la rama derecha,
      * del centro hacia la derecha.
      */
    preOrder (node = this.raiz) {
      if (!node) {
        return
      }
      console.log(node.value)
      this.preOrder(node.izquierda)
    }
    /**
      * Recorre el árbol de izquierda hacia el centro.
      * Luego del centro hacia la derecha, y finalmente
      * imprime la raíz.
      */
    postOrder (node = this.raiz) {
      if (!node) {
        return
      }
      this.postOrder(node.izquierda)
      this.postOrder(node.derecha)
      console.log(node.value)
    }
  }
  
  var binary= new Tree()
  var categoriaBinario  = "Arboles";
  var nombreBinario  = 'Arbol Binario';
  var repeticionBinario  = "True";
  var animacionBinario  = "0";
 
  function agregarBinary(data){
    console.log("******************")
    binary.addBinary(data)
    binary.imprimir()
  }
  function eliminarBinario(data){
    console.log("******************")
    binary.delete(data)
    binary.imprimir()
  }
  function buscarBinario(data){
    console.log(binary.find(data))
  }
  function actualizarBinario(data1,data2){
    console.log("******************")
    binary.delete(data1)
    binary.addBinary(data2)
    binary.imprimir()
  }
  
  //for (var i = 0; i < arr.length; i++) {
   // t.agregarRecursivo(arr[i])
  //}
  
  //t.inOrder()
  //t.preOrder()
  //t.postOrder()

  //console.log(t.find(12))
  //console.log(t.findRecursive(12))
  //console.log(t.find(4))
  //t.delete(12)
 
 // t.imprimir();
function AbrirBinario(event) {
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
            binary.addBinary(doc[key][k])
            
          }binary.imprimir()
      }
   }
   

  };

  reader.readAsText(file);
}//guardar archivo

function downloadBinario(filename, text) {
  


var element = document.createElement('a');
let doc = JSON.stringify({ "categoria": categoriaBinario , 'nombre': nombreBinario, 'repeticion':repeticionBinario, 'animacion':animacionBinario, 'valores': hola });

//console.log(listSimple.imprimir())
element.setAttribute('href', 'data:json,' + doc);
element.setAttribute('download', filename);

element.style.display = 'none';
document.body.appendChild(element);

element.click();

document.body.removeChild(element);
}
