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
            backgroundColor.push("#78d7d7")
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
        BurbujaN()
    } else {
        BurbujaT()
    }
}

async function BurbujaT() {
    var speed = document.getElementById("formControlRange").value;
    speed = convertir(speed)
    let aux;
    let aux2;
    for (let i = 0; i < (MyChart.data.datasets[0].data.length - 1); i++) {
        MyChart.data.datasets[0].backgroundColor[i] = '#030106'
        MyChart.update()
        await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
        for (let j = 0; j < (MyChart.data.datasets[0].data.length - i - 1); j++) {
            let seg = 0
            let pri = 0
            for (k = 0; k < MyChart.data.labels[j + 1].length; k++) {
                seg += MyChart.data.labels[j + 1].toString().charCodeAt(k)
            }
            for (k = 0; k < MyChart.data.labels[j].length; k++) {
                pri += MyChart.data.labels[j].toString().charCodeAt(k)
            }
            if (seg < pri) {
                aux2 = MyChart.data.labels[j + 1]
                MyChart.data.labels[j + 1] = MyChart.data.labels[j]
                MyChart.data.labels[j] = aux2
            }
            MyChart.data.datasets[0].backgroundColor[j] = '#030106'
            MyChart.update()
            await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
            MyChart.data.datasets[0].backgroundColor[j] = '#78d7d7'
        }
        MyChart.data.datasets[0].backgroundColor[i] = '#78d7d7'
    }
    MyChart.update()
}

async function BurbujaN() {
    var speed = document.getElementById("formControlRange").value;
    speed = convertir(speed)
    let aux;
    let aux2;
    for (let i = 0; i < (MyChart.data.datasets[0].data.length - 1); i++) {
        MyChart.data.datasets[0].backgroundColor[i] = '#030106'
        MyChart.update()
        await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
        for (let j = 0; j < (MyChart.data.datasets[0].data.length - i - 1); j++) {
            if (MyChart.data.datasets[0].data[j + 1] < MyChart.data.datasets[0].data[j]) {
                aux = MyChart.data.datasets[0].data[j + 1]
                MyChart.data.datasets[0].data[j + 1] = MyChart.data.datasets[0].data[j]
                MyChart.data.datasets[0].data[j] = aux
                console.log(MyChart.data.datasets[0].data)
                aux2 = MyChart.data.labels[j + 1]
                MyChart.data.labels[j + 1] = MyChart.data.labels[j]
                MyChart.data.labels[j] = aux
                console.log(MyChart.data.labels)
            }
            MyChart.data.datasets[0].backgroundColor[j] = '#030106'
            MyChart.update()
            await new Promise(resolve => setTimeout(resolve, speed)); // 3 sec
            MyChart.data.datasets[0].backgroundColor[j] = '#78d7d7'
        }
        MyChart.data.datasets[0].backgroundColor[i] = '#78d7d7'
    }
    MyChart.update()
}


function guardarJson() {
    var speed = document.getElementById("formControlRange").value;
    //verificamos si son numeros o string
    var objeto
    if (type == "number") {
        objeto = {
            categoria: "Ordenamiento",
            nombre: "Burbuja",
            animacion: speed / 10,
            valores: MyChart.data.datasets[0].data
        }
    } else {
        objeto = {
            categoria: "Ordenamiento",
            nombre: "Burbuja",
            animacion: speed / 10,
            valores: MyChart.data.labels
        }
    }
    var texto = JSON.stringify(objeto);
    download("Burbuja.json", texto);
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