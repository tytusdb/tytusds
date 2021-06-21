var fileInput = document.querySelector('input[type="file"]');
var ctx = document.getElementById('myChart').getContext('2d');
var slider = document.getElementById("customRange2")
// ejeX
var labels = []
// eje Y
var data = []
var temp = []
var copiaTemp = []

function insercion(arreglo) {
    var j,aux
    for ( var i = 0; i < arreglo.length; i++ ) {   
      aux = arreglo[i]
      for ( j = i - 1; j >= 0 && arreglo[j] > aux; j-- ){
        arreglo[ j + 1 ] = arreglo[j]
      }
      arreglo[ j + 1 ] = aux
    }
    return arreglo
}


function read() {
  
    var file = fileInput.files.item(0);
    var reader = new FileReader();
  
    reader.readAsText(file);
    
    reader.onload = function() {
        var obj = JSON.parse(reader.result)
        let val = obj.valores
        slider.value = obj.animacion
        if(slider.value == 10){
            slider.value = 9
        }

        if(typeof val[0] === "string"){
            let labelsX = []
            let datosYtemp = []
            let arrayGeneral = []
            let copiaTemp = []
            let letter
            let suma =0
            for (let i=0; i<val.length;i++){
              labelsX.push(val[i])
              for(let y=0; y<val[i].length; y++){
                letter = val[i].charAt(y)
                // console.log("letra: "+ letter)
                suma = suma + letter.charCodeAt(0)
                // console.log("codigo:" + letter.charCodeAt(0))
              }
              datosYtemp.push(suma)
              arrayGeneral.push({
                "codigo": suma,
                "palabra" : val[i]
              })
              suma = 0
            }
            
            let chart1 = graficar(labelsX, datosYtemp)
            let datosY = [...datosYtemp]
            insercion(datosY)
            let contador = 0
            for(let i=0; i<datosYtemp.length; i++){
                for(let y=0; y<arrayGeneral.length; y++){
                    if(datosY[i] == arrayGeneral[y].codigo){
                        contador += 1
                        setTimeout(function () {
                            updateChart(chart1,arrayGeneral[y].palabra,arrayGeneral[y].codigo,i)        
                        },100*(11-parseInt(slider.value))*contador)
                        //   1000*)*contador
                        copiaTemp.push(arrayGeneral[y].palabra)
                    } else{
                        continue
                    }
                }
            }
            descargar(copiaTemp)
      
        } else {
            for(let i=0; i<val.length; i++){
                temp.push(val[i])
                labels.push(val[i])
            }
          
            let chart1 = graficar(labels, temp)
            copiaTemp = [...temp]
            insercion(copiaTemp)
            let copiaLabels = [...labels]
            insercion(copiaLabels)
            let contador = 1

            for(let i=0; i<temp.length; i++){
                setTimeout(function () {
                  // console.log(slider.value)
                updateChart(chart1,copiaLabels[i],copiaTemp[i],i)        
            },300*(11-parseInt(slider.value))*contador)
            contador += 1
            }
        
            descargar(copiaTemp)
        }

    }

}

function descargar(array){
    let arrayTemp = array
      
    let arrayDescargado ={
      categoria: "Estructura lineal",
      nombre: "Ordenamiento Insercion",
      valores: arrayTemp
    }
  
    var data1 = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(arrayDescargado, null, '\t'));
    var a = document.createElement('a');
    a.innerHTML = 'Descargar JSON';
  
    a.href = 'data:' + data1;
    a.download = 'dataOrdenadaInsercion.json';
    var container = document.getElementById('container');
    container.appendChild(a);
}

function updateChart(chart, ejex, ejey, conteo) {
    chart.data.labels[conteo] = ejex.toString()
    console.log(temp)
    chart.data.datasets[0].data[conteo] = ejey
    chart.update()
  }
  
  
  
  function graficar(ejeX, ejeY){
    
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      // ejeX
        labels: ejeX,
        datasets: [{
            label: 'Insercion',
            // ejeY
            data: ejeY,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
        }]
    }
    
    });
    return myChart
  }
  