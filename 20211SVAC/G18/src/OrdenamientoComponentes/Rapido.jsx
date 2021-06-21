import React, { Component } from 'react'
import { Bar, defaults } from 'react-chartjs-2'


export class Rapido extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            valorRapido: "",
            rapido: [],
        
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
            valorRapido: e.target.value
        })
    };


    handleSubmit = (e) => {
        e?.preventDefault();
        // console.log("Formulario Subido")
        // console.log(this.state.valorBurbuja)
        this.state.rapido.push(parseInt(this.state.valorRapido))

        this.setState({
            rapido: this.state.rapido

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
                        valorRapido: element,
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



    ordenamientoAnimacion = (contador, lista) => {


        setTimeout(() => {
            this.setState({
                rapido: lista
            })
        }, contador*1000)
    }



    ordenamiento = (lista) => {

        const tamañoLista = this.state.rapido.length
        lista = this.state.rapido
        let contador = 0

        if(tamañoLista<1){
            return []
        }

        var izquierda = [] ; 
        var derecha = [];
        var pivote = [0];
        
        for(var i = 1; i<tamañoLista; i ++){
            if(lista[i] < pivote){
                izquierda.push(lista[i]) ; 
            }else{
                derecha.push(lista[i])
            }
        }

        return [].concat(this.ordenamiento(izquierda), pivote, this.ordenamiento(derecha))

    }



    render() {
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
                                    value={this.state.valorRapido}
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
                                labels: this.state.rapido,
                                datasets: [
                                    {
                                        label: 'ordenamiento de rapdio ',
                                        data: this.state.rapido,
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

export default Rapido
