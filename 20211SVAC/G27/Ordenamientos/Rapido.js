let arreglo = [];
var elements = [];
var dataset;
//metodo de ordenamiento rapido se creo a base de la logica del editor si en dado caso no funciona borralo e intentar con los otros 2 metodos
class QuickSort{

    sort(array){
        if(array.length > 0){
            this.quicksort(array, 0, array.length - 1);

        }
    }
    
    quicksort(array, low, high){
        if(low > high){
            return;
        }

        var i = low;

        var j = high;

        var threshold = array[low];
        
        //Escaneando desde ambos extremos de la lista
        while(i<j){
            //Encuentra la primera posición inferior al umbral de derecha a izquierda

            while(i<j && array[j]>threshold){
                j--;
            }
            //Reemplaze low por un menor
            if(i<j)
                array[i++] = array[j];
                console.log("1");
                crearDatos();
            // Encuentre la primera posición mayor que el umbral de izquierda a derecha

            while(i<j && array[i]<=threshold){
                i++;
            }

            if(i<j)
                array[j--]=array[i];
                console.log("1");
                crearDatos();

        }

        array[i] = threshold;

        this.quicksort(array, low, i-1); //izquierda rapido ordenar
        this.quicksort(array, i+1, high) //Derecharapido ordenar

    }
};

var QS = new QuickSort();

function ordenar(){
  QS.sort(arreglo);
}

function AbrirArchivo(files){
  var file = files[0];
  var reader = new FileReader();
  reader.onload = function(event){
    contents = event.target.result;
    var json = JSON.parse(contents);
    var count = Object.keys(json.valores).length;
    arreglo = json.valores;
    for (let index = 0; index < count; index++) {
      console.log(arreglo[index]); 
    }
    graficar();
  };
  reader.onerror = function(event) {
    console.error("Archivo no pudo ser encontrado! Codigo de Error " + event.target.error.code);
};
  reader.readAsText(file);
}


function graficar(){
  var label1;
  var pos_x = 0;
  elements = [];
  var container = document.getElementById("visualization");
  for(let index = 0; index < arreglo.length; index++) {
      label1 = {
          content: arreglo[index],
          xOffset: 20,
          yOffset: 20
      }
      elements.push({group:1, x: pos_x, y: arreglo[index],label: label1});
      pos_x++;
  }

var groups = new vis.DataSet();
groups.add(
  {
    id: 1,
    content: "Only draw elements with labels. Make the data point bigger and a square.",
    options: {
      drawPoints: function group1Renderer(item, group, grap2d) {
    if (item.label == null) {
          return false;
        }
        return {
          style: 'square',
          size: 5
        };
      }
    }
  }
);

dataset = new vis.DataSet(elements);
var options = {
  start: -100,
  end: 100,
  style: 'bar',
  drawPoints: {
    onRender: function(item, group, grap2d) {
      return item.label != null;
    },
    style: 'circle'
  }
  
};

var graph2d = new vis.Graph2d(container, dataset, groups, options);
}

  // Actualizar los datos se separa en tres pasos
  function crearDatos() {
      setTimeout(generarDatos,1);
  }

  function generarDatos() {
      var label1;
      var pos_x = 0;
      elements = [];
      var container = document.getElementById("visualization");
      for(let index = 0; index < arreglo.length; index++) {
          label1 = {
              content: arreglo[index],
              xOffset: 20,
              yOffset: 20
          }
          elements.push({group:1, x: pos_x, y: arreglo[index],label: label1});
          pos_x++;
      }
      setTimeout(function() {loadDataIntoVis(elements);},10);

  }

  function loadDataIntoVis(nuevos) {
      dataset.clear();
      dataset.add(nuevos);
  }

  var contents;

    function DescargarArchivo(){
      var json = JSON.parse(contents);
      json.valores = arreglo;
      const myJSON = JSON.stringify(json);
      //console.log(json);
      //texto de vent actual
  
      //formato para guardar el archivo
      var nombre="RapidoOrdenado.json";//nombre del archivo
      var file=new Blob([myJSON], {type: 'text/plain'});
  
      if(window.navigator.msSaveOrOpenBlob){
          window.navigator.msSaveOrOpenBlob(file, nombre);
      }else{
          var a=document.createElement("a"),url=URL.createObjectURL(file);
          a.href=url;
          a.download=nombre;
          document.body.appendChild(a);
          a.click();
          setTimeout(function(){
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);  
          },0); 
      }
  }

/* metodo numero 2 por si el uno no funciona

    function partition(arr, start, end){
    // Taking the last element as the pivot
    const pivotValue = arr[end];
    let pivotIndex = start; 
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
        // Swapping elements
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        // Moving to next element
        pivotIndex++;
        }
    }
    
    // Putting the pivot value in the middle
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
    return pivotIndex;
};


function quickSortRecursive(arr, start, end) {
    // Base case or terminating case
    if (start >= end) {
        return;
    }
    
    // Returns pivotIndex
    let index = partition(arr, start, end);
    
    // Recursively apply the same logic to the left and right subarrays
    quickSort(arr, start, index - 1);
    quickSort(arr, index + 1, end);
}


array = [7, -2, 4, 1, 6, 5, 0, -4, 2]
quickSortRecursive(array, 0, array.length - 1)

console.log(array)


*/


/*
MEtodo no.3  por si no entiendes los primeros 2 o hay algun problema este tambien funciona
function QuickSort(arr, left = 0, right = arr.length - 1) {
  let len = arr.length,
      index

  if(len > 1) {

    index = partition(arr, left, right)

    if(left < index - 1) {
      QuickSort(arr, left, index - 1)
    } 

    if(index < right) {
      QuickSort(arr, index, right)
    }

  }

  return arr

}

function partition(arr, left, right) {
  let middle = Math.floor((right + left) / 2),
      pivot = arr[middle],
      i = left,                 // Start pointer at the first item in the array
      j = right                 // Start pointer at the last item in the array

  while(i <= j) {

    // Move left pointer to the right until the value at the
    // left is greater than the pivot value
    while(arr[i] < pivot) {
      i++
    }

    // Move right pointer to the left until the value at the
    // right is less than the pivot value
    while(arr[j] > pivot) {
      j--
    }

    // If the left pointer is less than or equal to the 
    // right pointer, then swap values
    if(i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]  // ES6 destructuring swap
      i++
      j--
    }
  }

  return i

}

*/