var type = "number"

var data = {};

var options = {
    scales: {
        yAxes: [{
            afterBuildTicks: (x) => {
                console.log(x);
            },
            ticks: {
                callback: (value) => {
                    console.log(value);
                    return value;
                }
            },
        }]
    }
};

var ctx = document.getElementById("myChart");
var MyChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
});

/*EVENTOS*/
$('#ordenar').on('click', () => Seleccion())
$('#cargar').on('click', () => cargarJson())
$('#guardar').on('click', () => guardarJson())


async function cargarJson() {
    type = "number"
    var objeto = null
        //Obtenemos el archivo 
    let upload = document.getElementById('formFileSm');
    let fr = new FileReader()
    fr.readAsText(upload.files[0])
    fr.onload = async function() {
        objeto = JSON.parse(fr.result)
            //SETEAMOS LA ANIMACION
        document.getElementById("formControlRange").value = (objeto.animacion * 10).toString();
        //SETEAMOS LA GRAFICA
        let labels = []
        let backgroundColor = []
        let numeros = []
        for (let i = 0; i < objeto.valores.length; i++) {
            labels.push(objeto.valores[i].toString())
            backgroundColor.push("#c0a1a7")
            if (typeof objeto.valores[i] == 'number') {
                numeros.push(objeto.valores[i])
            } else {
                type = "string"
                numeros.push(10);
            }
        }
        MyChart.data = {
            labels: labels,
            datasets: [{
                label: "Ordenamiento",
                backgroundColor: backgroundColor,
                data: numeros
            }]
        }
        MyChart.update()
    }
}

async function Seleccion() {
    if (type == "number") {
        QuickSortN(MyChart.data.datasets[0].data, 0, MyChart.data.datasets[0].data.length - 1)
    } else {
        Prueba(MyChart.data, 0, MyChart.data.labels.length - 1)
    }
}

async function QuickSortT(arreglo, izq, der) {
    var speed = document.getElementById("formControlRange").value;
    speed = convertir(speed)
    let medio = Math.round((izq + der) / 2)
    let pivote = 0
    for (k = 0; k < arreglo.labels[medio].length; k++) {
        pivote += arreglo.labels[medio].toString().charCodeAt(k)
    }
    console.log(pivote)
    let i = izq
    let j = der
    let aux, aux2
    do {
        let seg = 0
        let pri = 0
        for (k = 0; k < arreglo.labels[i].length; k++) {
            seg += arreglo.labels[i].toString().charCodeAt(k)
        }
        console.log(seg)
        for (k = 0; k < arreglo.labels[j].length; k++) {
            pri += arreglo.labels[j].toString().charCodeAt(k)
        }
        console.log(pri)
        while (seg < pivote) i++;
        while (pri > pivote) j--;
        console.log("d")
        await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
        if (i <= j) {
            MyChart.data.datasets[0].backgroundColor[i] = '#030106'
            MyChart.data.datasets[0].backgroundColor[j] = '#030106'
            MyChart.update()
            await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
            aux = arreglo.datasets[0].data[i]
            arreglo.datasets[0].data[i] = arreglo.datasets[0].data[j]
            arreglo.datasets[0].data[j] = aux
            aux2 = MyChart.data.labels[i]
            MyChart.data.labels[i] = MyChart.data.labels[j]
            MyChart.data.labels[j] = aux2
            MyChart.data.datasets[0].backgroundColor[i] = '#78d7d7'
            MyChart.data.datasets[0].backgroundColor[j] = '#78d7d7'
            MyChart.update()
            await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
            i++
            j--
        }
    } while (i <= j);
    if (izq < j) {
        QuickSortT(arreglo, izq, j)
    }
    if (i < der) {
        QuickSortT(arreglo, i, der)
    }
    MyChart.data.datasets[0].backgroundColor[i] = '#78d7d7'
    MyChart.data.datasets[0].backgroundColor[j] = '#78d7d7'
    MyChart.update()
    await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
}

async function Prueba(arreglo, izq, der) {
    var speed = document.getElementById("formControlRange").value;
    speed = convertir(speed)
    let pivote = arreglo.labels[izq]
    let i = izq
    let j = der
    let aux, aux2
    while (i < j) {
        while (arreglo.labels[i] <= pivote) i++;
        while (arreglo.labels[j] > pivote) j--;
        if (i < j) {
            MyChart.data.datasets[0].backgroundColor[i] = '#030106'
            MyChart.data.datasets[0].backgroundColor[j] = '#030106'
            MyChart.update()
            await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
            /* aux = arreglo.datasets[0].data[i]
             arreglo.datasets[0].data[i] = arreglo.datasets[0].data[j]
             arreglo.datasets[0].data[j] = aux*/
            aux2 = arreglo.labels[i]
            arreglo.labels[i] = arreglo.labels[j]
            arreglo.labels[j] = aux2
            MyChart.data.datasets[0].backgroundColor[i] = '#c0a1a7'
            MyChart.data.datasets[0].backgroundColor[j] = '#c0a1a7'
            MyChart.update()
            await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
        }
    }
    console.log(arreglo.labels[izq])
    arreglo.labels[izq] = arreglo.labels[j]
    arreglo.labels[j] = pivote
    console.log(arreglo.labels)
    if (izq < j - 1) {
        console.log("h1")
        Prueba(arreglo, izq, j - 1)
    }
    if (j + 1 < der) {
        console.log(j + 1)
        console.log(der + "der")
        Prueba(arreglo, j + 1, der)
    }
    MyChart.data.datasets[0].backgroundColor[i] = '#c0a1a7'
    MyChart.data.datasets[0].backgroundColor[j] = '#c0a1a7'
    MyChart.update()
    await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
}

async function QuickSortN(arreglo, izq, der) {
    var speed = document.getElementById("formControlRange").value;
    speed = convertir(speed)
    let medio = Math.round((izq + der) / 2)
    let pivote = arreglo[medio]
    let i = izq
    let j = der
    let aux, aux2
    do {
        while (arreglo[i] < pivote) i++;
        while (arreglo[j] > pivote) j--;
        await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
        if (i <= j) {
            MyChart.data.datasets[0].backgroundColor[i] = '#030106'
            MyChart.data.datasets[0].backgroundColor[j] = '#030106'
            MyChart.update()
            await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
            aux = arreglo[i]
            arreglo[i] = arreglo[j]
            arreglo[j] = aux
            aux2 = MyChart.data.labels[i]
            MyChart.data.labels[i] = MyChart.data.labels[j]
            MyChart.data.labels[j] = aux2
            MyChart.data.datasets[0].backgroundColor[i] = '#c0a1a7'
            MyChart.data.datasets[0].backgroundColor[j] = '#c0a1a7'
            MyChart.update()
            await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
            i++
            j--
        }
    } while (i <= j);
    if (izq < j) {
        QuickSortN(arreglo, izq, j)
    }
    if (i < der) {
        QuickSortN(arreglo, i, der)
    }
    MyChart.data.datasets[0].backgroundColor[i] = '#c0a1a7'
    MyChart.data.datasets[0].backgroundColor[j] = '#c0a1a7'
    MyChart.update()
    await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
}


function guardarJson() {
    var speed = document.getElementById("formControlRange").value;
    //verificamos si son numeros o string
    var objeto
    if (type == "number") {
        objeto = {
            categoria: "Ordenamiento",
            nombre: "QuickSort",
            animacion: speed / 10,
            valores: MyChart.data.datasets[0].data
        }
    } else {
        objeto = {
            categoria: "Ordenamiento",
            nombre: "QuickSort",
            animacion: speed / 10,
            valores: MyChart.data.labels
        }
    }
    var texto = JSON.stringify(objeto);
    download("QuickSort.json", texto);
}

function convertir(porcentaje) {
    let result = (100 - porcentaje) * 10
    if (result == 0) {
        result = 50
    }
    return result
}

function download(filename, textInput) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(textInput));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
}