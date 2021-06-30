import { Bar, defaults } from 'react-chartjs-2'
import React, { Component } from 'react'

export class Incersion extends Component {

    constructor(props) {
        super(props)

        this.state = {
            valorincersion: "",
            incersion: [],
            arregloPalabra: [],
            valoresAscci: [],
            arregloPalabraOrdenado: [],
            tamañoAscci: 0


        }
        this.leerJson = this.leerJson.bind(this)
    }



    handleClick = (e) => {
        console.log("bonton regresar presionado")
    };

    handleChange = (e) => {


        this.setState({
            valorincersion: e.target.value
        })
    };


    handleSubmit = (e) => {
        e?.preventDefault();
        
        
        let numero = parseInt(this.state.valorincersion);
        let palabra = this.state.valorincersion;

        if (Number.isNaN(numero)) {

            this.state.arregloPalabra.push(palabra);

        } else {

            this.state.incersion.push(numero);
        };



        
        this.setState({
            incersion: this.state.incersion
        });

        this.letrasAnumeros(this.state.arregloPalabra);
    };


    leerJson(event) {
        const input = event.target
        const reader = new FileReader()
        reader.onload = (event) => {
            const text = reader.result

            const json = JSON.parse(text)
            const valores = json.valores

            valores.forEach((element, index) => {
                setTimeout(() => {
                    this.setState({
                        valorincersion: element,
                    }, () => {
                        this.handleSubmit()
                    })

                }, index * 1000)
            });

            this.setState({
                data: json
            })
        }
        reader.readAsText(input.files[0], "UTF-8")
    }



    ordenamientoAnimacion = (contador, listaIncersion,siesTexto) => {


        setTimeout(() => {
            this.setState({
                incersion: siesTexto ? []:  listaIncersion,
                arregloPalabraOrdenado: siesTexto ? listaIncersion : []
            })
        }, contador * 1000)
    }



    sumaAscii = (cadena) => {

        for (let i = 0; i < cadena.length; i++) {

            this.state.tamañoAscci = this.state.tamañoAscci + parseInt(cadena.charCodeAt(i))
        }
    }

    letrasAnumeros = (arreglo) => {


     
        this.state.valoresAscci = []
        for (let i = 0; i < arreglo.length; i++) {
            let tmp = arreglo[i]
            this.sumaAscii(tmp)

            this.state.valoresAscci.push(this.state.tamañoAscci)
            this.state.tamañoAscci = 0

        }

        this.state.arregloPalabraOrdenado = []

        for (let x = 0; x < this.state.valoresAscci.length; x++) {

            this.state.arregloPalabraOrdenado.push(
                {
                    palabra: {
                        string: this.state.arregloPalabra[x],
                        tamañoAscci: this.state.valoresAscci[x]
                    }


                }
            )


        }

        this.setState({
            arregloPalabra: arreglo
        })
    }



    ordenamiento = () => {


        let valor = parseInt(this.state.incersion[0])

        if (Number.isNaN(valor)) {
            const tamañoLista = this.state.arregloPalabraOrdenado.length
            const listaIncersion = this.state.arregloPalabraOrdenado
            let contador = 0

            
        for (let i = 1; i < tamañoLista; i++) {
            let elemento = listaIncersion[i]
            let j = i - 1;

            while (j > -1 && elemento['palabra']['tamañoAscci'] < listaIncersion[j]['palabra']['tamañoAscci']) {

                listaIncersion[j + 1] = listaIncersion[j];
                j--;
                this.ordenamientoAnimacion(++contador, [...listaIncersion],true)
            }

            listaIncersion[j + 1] = elemento;
            this.ordenamientoAnimacion(++contador, [...listaIncersion],true)
        }




        } else {
            const tamañoLista = this.state.incersion.length
            const listaIncersion = this.state.incersion
            let contador = 0
    
          
            for (let i = 1; i < tamañoLista; i++) {
                let elemento = listaIncersion[i];
                let j = i - 1;
    
                while (j > -1 && elemento < listaIncersion[j]) {
    
                    listaIncersion[j + 1] = listaIncersion[j];
                    j--;
                    this.ordenamientoAnimacion(++contador, [...listaIncersion],false)
                }
    
                listaIncersion[j + 1] = elemento;
                this.ordenamientoAnimacion(++contador, [...listaIncersion],false)
            }
        }


    }



    render() {
        console.log(this.state.arregloPalabra)
        console.log(this.state.arregloPalabraOrdenado)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="container">

                        <div className="row gap-2">
                            <div className="col-sm-2 d-grid gap-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Elemento"
                                    placeholder="Elemento"
                                    onChange={this.handleChange}
                                    value={this.state.valorincersion}
                                />
                            </div>

                            <div className="col-sm-2 d-grid gap-2">
                                <button type="submit" className="btn btn-success" onClick={this.handleClick} >Agregar elemento</button>
                            </div>

                            <div className="col-sm-2 d-grid gap-2">
                                <button type="button" className="btn btn-success" onClick={this.ordenamiento} >Ordenar</button>
                            </div>

                            <div className="col-sm-2 d-grid gap-2">
                                <input type="file" class="form-control" onChange={this.leerJson} />


                            </div>
                        </div>

                    </div>
                </form>


                <div className="container">
                    <div className="card mt-4">

                        <Bar
                            data={{
                                labels:  this.state.incersion.length > 0 ? this.state.incersion : this.state.arregloPalabraOrdenado.map((palabra) => palabra.palabra.string),
                                datasets: [
                                    {
                                        label: 'ordenamiento de insercion ',
                                        data:  this.state.incersion.length > 0 ? this.state.incersion : this.state.arregloPalabraOrdenado.map((palabra) => palabra.palabra.tamañoAscci),
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)',
                                        ],
                                        borderWidth: 1,
                                    },
                                    // {
                                    //   label: 'Quantity',
                                    //   data: [47, 52, 67, 58, 9, 50],
                                    //   backgroundColor: 'orange',
                                    //   borderColor: 'red',
                                    // },
                                ],
                            }}
                            height={400}
                            width={600}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [
                                        {
                                            ticks: {
                                                beginAtZero: true,
                                            },
                                        },
                                    ],
                                },
                                legend: {
                                    labels: {
                                        fontSize: 25,
                                    },
                                },
                            }}
                        />


                    </div>


                    <div className="">

                    </div>
                </div>
            </div>
        )
    }
}

export default Incersion
