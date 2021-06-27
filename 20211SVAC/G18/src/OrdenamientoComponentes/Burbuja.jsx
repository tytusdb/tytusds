import React, { Component } from 'react'
import './burbuja.css'
import { Bar, defaults } from 'react-chartjs-2'



export class Burbuja extends Component {
    constructor(props) {
        super(props)

        this.state = {
            valorBurbuja: 0,
            burbuja: [],
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
            valorBurbuja: e.target.value
        })
    };


    handleSubmit = (e) => {
        e?.preventDefault();


        let numero = parseInt(this.state.valorBurbuja)
        let palabra = this.state.valorBurbuja

        if (Number.isNaN(numero)) {

            this.state.arregloPalabra.push(palabra)

        } else {

            this.state.burbuja.push(numero)
        }



        this.setState({
            burbuja: this.state.burbuja
        })

        this.letrasAnumeros(this.state.arregloPalabra)
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
                        valorBurbuja: element,
                    }, () => {
                        this.handleSubmit()
                    })

                }, index * 600)
            });

            this.setState({
                data: json
            })
        }
        reader.readAsText(input.files[0], "UTF-8")
    }

    ordenamientoAnimacion = (contador, listaBurbuja, siesTexto) => {
        setTimeout(() => {
            this.setState({
                burbuja: siesTexto ? [] : listaBurbuja,
                arregloPalabraOrdenado: siesTexto ? listaBurbuja : []
            })
        }, 500 * contador)
    }

    sumaAscii = (cadena) => {

        for (let i = 0; i < cadena.length; i++) {
            // console.log(`El carácter ascci en el índice ${i} es '` + cadena.charCodeAt(i) + "'")
            this.state.tamañoAscci = this.state.tamañoAscci + parseInt(cadena.charCodeAt(i))
        }
    }

    letrasAnumeros = (arreglo) => {


        var nombres = {
            nombre: "",
            tamañoAscci: 0
        }
        this.state.valoresAscci = []
        for (let i = 0; i < arreglo.length; i++) {
            let tmp = arreglo[i]
            this.sumaAscii(tmp)
            // console.log(tmp)
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



        let valor = parseInt(this.state.burbuja[0])

        if (Number.isNaN(valor)) {


            const tamañoLista = this.state.arregloPalabraOrdenado.length
            const listaBurbuja = this.state.arregloPalabraOrdenado
            let contador = 0
            
            for (var i = 1; i < tamañoLista; i++) {
                for (var j = 0; j < (tamañoLista - i); j++) {

                    if (listaBurbuja[j]['palabra']['tamañoAscci'] > listaBurbuja[j + 1]['palabra']['tamañoAscci']) {
                        var aux = listaBurbuja[j];
                        listaBurbuja[j] = listaBurbuja[j + 1]
                        listaBurbuja[j + 1] = aux

                    }
                    this.ordenamientoAnimacion(++contador, [...listaBurbuja], true)

                }
                this.ordenamientoAnimacion(++contador, [...listaBurbuja], true)

            }

        } else {

            const tamañoLista = this.state.burbuja.length
            const listaBurbuja = this.state.burbuja
            let contador = 0


            for (var i = 1; i < tamañoLista; i++) {
                for (var j = 0; j < (tamañoLista - i); j++) {

                    if (listaBurbuja[j] > listaBurbuja[j + 1]) {
                        var aux = listaBurbuja[j];
                        listaBurbuja[j] = listaBurbuja[j + 1];
                        listaBurbuja[j + 1] = aux

                    }

                    this.ordenamientoAnimacion(++contador, [...listaBurbuja], false)
                }

                this.ordenamientoAnimacion(++contador, [...listaBurbuja], false)
            }

        }

    }



    render() {
        console.log(this.state.arregloPalabra)

        console.log(this.state.arregloPalabraOrdenado)
        console.log(this.state.valoresAscci)
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
                                    value={this.state.valorBurbuja}
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
                                labels: this.state.burbuja.length > 0 ? this.state.burbuja : this.state.arregloPalabraOrdenado.map((palabra) => palabra.palabra.string),
                                datasets: [
                                    {
                                        label: 'ordenamiento de burbujaaaa ',
                                        data: this.state.burbuja.length > 0 ? this.state.burbuja : this.state.arregloPalabraOrdenado.map((palabra) => palabra.palabra.tamañoAscci),
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

export default Burbuja
