let arreglo = [];
var elements = [];
var dataset;

function insertSort(array){
    for(var i = 0; i < array.length;i++){
        var Elemento = array[i];
        var posicion = i;
        for(var j = posicion - 1; j>= 0;j--){
            if(Elemento < array[j]){
                array[j+1] = array[j];
                posicion --;
            }
        }
        array[posicion] = Elemento;
        crearDatos();
    }
}

function ordenar(){
    insertSort(arreglo);
}

function AbrirArchivo(files){
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function(event){
      var contents = event.target.result;
      var json = JSON.parse(contents);
      var count = Object.keys(json.valores).length;
      arreglo = json.valores;
      for (let index = 0; index < count; index++) {
        console.log(arreglo[index]); 
      }
      graficar();
    };
    reader.onerror = function(event) {
      console.error("Archivo no puso ser encontrado! Codigo de Error " + event.target.error.code);
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