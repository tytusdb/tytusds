import { Bar, defaults } from 'react-chartjs-2'
import React, { Component } from 'react'

export class Incersion extends Component {

    constructor(props) {
        super(props)

        this.state = {
            valorincersion: "",
            incersion: [],
          
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
            valorincersion: e.target.value
        })
    };


    handleSubmit = (e) => {
        e?.preventDefault();
        // console.log("Formulario Subido")
        // console.log(this.state.valorBurbuja)
        this.state.incersion.push(parseInt(this.state.valorincersion))

        this.setState({
            incersion: this.state.incersion
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



    ordenamientoAnimacion = (contador, listaIncersion) => {


        setTimeout(() => {
            this.setState({
                incersion: listaIncersion
            })
        }, contador*1000)
    }



    ordenamiento = () => {

        const tamañoLista = this.state.incersion.length
        const listaIncersion = this.state.incersion
        let contador = 0

        setTimeout (()=>{

        },)

        for(let i = 1; i<tamañoLista; i++){
            let elemento = listaIncersion[i];
            let j = i-1;

            while( j> -1 && elemento < listaIncersion[j] ){

                listaIncersion[j + 1] = listaIncersion[j];
                j--;
                this.ordenamientoAnimacion(++contador,listaIncersion )
            }

            listaIncersion[j+1] = elemento; 
            this.ordenamientoAnimacion(++contador,listaIncersion )
        }   
        
       console.log(listaIncersion)
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
                                    value={this.state.valorincersion}
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
                                labels: this.state.incersion,
                                datasets: [
                                    {
                                        label: 'ordenamiento de insercion ',
                                        data: this.state.incersion,
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
