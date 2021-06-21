import React, { Component } from 'react'
import './burbuja.css'
import { Bar, defaults } from 'react-chartjs-2'



export class Burbuja extends Component {
    constructor(props) {
        super(props)

        this.state = {
            valorBurbuja: "",
            burbuja: [],
        
        }
        this.leerJson = this.leerJson.bind(this)
    }



    handleClick = (e) => {
        console.log("bonton regresar presionado")
    };

    handleChange = (e) => {
        // console.log({
        //     name: e.target.name,
        //     value: e.target.value

        // });

        this.setState({
            valorBurbuja: e.target.value
        })
    };


    handleSubmit = (e) => {
        e?.preventDefault();
        // console.log("Formulario Subido")
        // console.log(this.state.valorBurbuja)
        this.state.burbuja.push(parseInt(this.state.valorBurbuja))

        this.setState({
            burbuja: this.state.burbuja
        })
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

    ordenamientoAnimacion = (contador, listaBurbuja) => {
        setTimeout(() => {
            this.setState({
                burbuja: listaBurbuja
            })
        }, 800*contador)
    }

    ordenamiento = () => {

        const tamañoLista = this.state.burbuja.length
        const listaBurbuja = this.state.burbuja
        let contador = 0


        for (var i = 1; i < tamañoLista; i++) {
            for (var j = 0; j < (tamañoLista - i ); j++) {

                if (listaBurbuja[j] > listaBurbuja[j + 1]) {
                    var aux = listaBurbuja[j];
                    listaBurbuja[j] = listaBurbuja[j + 1];
                    listaBurbuja[j + 1] = aux

                }

                this.ordenamientoAnimacion(++contador, [...listaBurbuja])
            }

            this.ordenamientoAnimacion(++contador, [...listaBurbuja])
        }

    }



    render() {
        console.log(this.state.burbuja)
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
                                <button type="submit" className="btn btn-outline-success" onClick={this.handleClick} >Agregar elemento</button>
                            </div>

                            <div className="col-sm-2 d-grid gap-2">
                                <button type="button" className="btn btn-outline-success" onClick={this.ordenamiento} >Ordenar</button>
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
                                labels: this.state.burbuja,
                                datasets: [
                                    {
                                        label: 'ordenamiento de burbuja ',
                                        data: this.state.burbuja,
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
