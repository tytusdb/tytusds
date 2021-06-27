function selectionSort(inputArr) { 
    let n = inputArr.length;
        
    for(let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for(let j = i+1; j < n; j++){
            if(inputArr[j] < inputArr[min]) {
                min=j; 
            }
         }
         if (min != i) {
             // Swapping the elements
             let tmp = inputArr[i]; 
             inputArr[i] = inputArr[min];
             inputArr[min] = tmp; 
             crearDatos()     
        }
    }
    return inputArr;
    }

let arreglo = [];
var elements = [];
var dataset;

function ordenar(){
    arreglo = selectionSort(arreglo);
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
      var nombre="SelectionOrdenado.json";//nombre del archivo
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