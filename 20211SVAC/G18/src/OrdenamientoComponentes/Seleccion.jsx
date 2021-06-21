import React, { Component } from 'react'
import { Bar, defaults } from 'react-chartjs-2'
import "./seleccion.css"

export class Seleccion extends Component {
    constructor(props) {
        super(props)

        this.state = {
            valorSeleccion: "",
            seleccion: [],

        }
    }


    handleChange = (e) => {
        // console.log({
        //     name: e.target.name,
        //     value: e.target.value

        // });

        this.setState({
            valorSeleccion: e.target.value
        })
    };



    handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Formulario Subido")
        // console.log(this.state.valorBurbuja)
        this.state.seleccion.push(parseInt(this.state.valorSeleccion))

        this.setState({
            burbuja: this.state.seleccion
        })
    };





    ordenamientoAnimacion = (contador, listaSeleccion) => {


        setTimeout(() => {
            this.setState({
                seleccion: listaSeleccion
            })
        },  contador*800)
    }


    ordenamiento = () => {
        const tamañoLista = this.state.seleccion.length;
        const seleccionLista = this.state.seleccion;
        let contador = 0

        for (let i = 0; i < tamañoLista; i++) {
            let minimo = i
            for (let j = i + 1; j < tamañoLista; j++) {
                if (seleccionLista[minimo] > seleccionLista[j]) {

                    minimo = j;
                    this.ordenamientoAnimacion(++contador, seleccionLista)
         
                }
      
            }
            
            if(minimo != i){
                let temporal = seleccionLista[i]
                seleccionLista[i] =  seleccionLista[minimo]
                seleccionLista[minimo] = temporal
            }
            this.ordenamientoAnimacion(++contador, seleccionLista)
         
        }


        this.setState({
            seleccion: seleccionLista,
        })

    }


    render() {
        console.log(this.state.seleccion)
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
                                    value={this.state.valorSeleccion}
                                />
                            </div>

                            <div className="col-sm-2 d-grid gap-2">
                                <button type="submit" className="btn btn-success" onClick={this.handleClick} >Agregar elemento</button>
                            </div>

                            <div className="col-sm-2 d-grid gap-2">
                                <button type="button" className="btn btn-success" onClick={this.ordenamiento} >Ordenar</button>
                            </div>

                        </div>

                    </div>
                </form>

                <div className="container">
                    <div className="card mt-4">
                        <Bar
                            data={{
                                labels: this.state.seleccion,
                                options: {
                                    plugins: {
                                        legend: {
                                            labels: {
                                                // This more specific font property overrides the global property
                                                font: {
                                                    size: 200
                                                }
                                            }
                                        }
                                    }
                                },

                                datasets: [
                                    {
                                        label: 'ordenamiento de seleccion ',
                                        data: this.state.seleccion,
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


                </div>

            </div>
        )
    }
}

export default Seleccion
