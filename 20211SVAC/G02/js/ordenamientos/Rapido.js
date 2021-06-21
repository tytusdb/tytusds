var fileInput = document.querySelector('input[type="file"]');
var ctx = document.getElementById('myChart').getContext('2d');
var slider = document.getElementById("customRange2");
// ejeX
var labels = [];
// eje Y
var data = [];
var temp = [];


function partition(arr, start, end) {
    const pivotVal = arr[Math.floor((start + end) / 2)];
    while (start <= end) {
        while (arr[start] < pivotVal) {
            start++;
        }
        while (arr[end] > pivotVal) {
            end--;
        }
        if (start <= end) {
            // swap
            let temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
    return start;
}

function quickSort(arr, start = 0, end = arr.length - 1) {
    if (start < end) {
        const index = partition(arr, start, end);
        quickSort(arr, start, index - 1);
        quickSort(arr, index, end);
    }
    return arr;
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
                    suma = suma + letter.charCodeAt(0)
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
            quickSort(datosY)

            let contador = 0

            for(let i=0; i<datosYtemp.length; i++){
                for(let y=0; y<arrayGeneral.length; y++){
                    if(datosY[i] == arrayGeneral[y].codigo){
                        contador += 1
                        setTimeout(function () {
                            updateChart(chart1,arrayGeneral[y].palabra,arrayGeneral[y].codigo,i)
                        },350*(11-parseInt(slider.value))*contador)
                        copiaTemp.push(arrayGeneral[y].palabra)
                    } else{
                        continue
                    }
                }
            }
            descargar(copiaTemp)

        }else{

            for(let i=0; i<val.length; i++){
                temp.push(val[i])
                labels.push(val[i])
            }

            let chart1 = graficar(labels, temp)
            copiaTemp = [...temp]
            quickSort(copiaTemp)
            let copiaLabels = [...labels]
            quickSort(copiaLabels)
            let contador = 1
            for(let i=0; i<temp.length; i++){
                setTimeout(function () {
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
        nombre: "ordenamiento Rapido",
        valores: arrayTemp
    }

    var data1 = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(arrayDescargado, null, '\t'));
    var a = document.createElement('a');
    a.innerHTML = 'Descargar JSON';

    a.href = 'data:' + data1;
    a.download = 'dataOrdenada_Rapido.json';
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
                label: 'Rapido',
                // ejeY
                data: ejeY,
                backgroundColor: 'rgba(245,135,1,0.57)',
                borderColor: 'rgb(0,14,123)',
                borderWidth: 1.5
            }]
        }

    });
    return myChart
}