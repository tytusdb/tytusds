import React, { Component } from 'react'
import { Bar, defaults } from 'react-chartjs-2'
import "./seleccion.css"

export class Seleccion extends Component {
    constructor(props) {
        super(props)

        this.state = {
            valorSeleccion: "",
            seleccion: [],
            arregloPalabra: [],
            valoresAscci: [],
            arregloPalabraOrdenado: [],
            tamañoAscci: 0

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
       
        let numero = parseInt(this.state.valorSeleccion);
        let palabra = this.state.valorSeleccion;

        if (Number.isNaN(numero)) {

            this.state.arregloPalabra.push(palabra);

        } else {

            this.state.seleccion.push(numero);
        };

        this.setState({
            burbuja: this.state.seleccion
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
                        valorSeleccion: element,
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



    ordenamientoAnimacion = (contador, listaSeleccion, siesTexto) => {


        setTimeout(() => {
            this.setState({
                seleccion: siesTexto ? []:  listaSeleccion,
                arregloPalabraOrdenado: siesTexto ? listaSeleccion: []
            })
        },  contador*800)
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


        let valor  = parseInt(this.state.seleccion[0]);
        
        if(Number.isNaN(valor)){
            const listaSeleccion = this.state.arregloPalabraOrdenado
            const tamañoLista = this.state.arregloPalabraOrdenado.length
            let contador = 0

            for (let i = 0; i < tamañoLista; i++) {
            let minimo = i
            for (let j = i + 1; j < tamañoLista; j++) {
                if (listaSeleccion[minimo]['palabra']['tamañoAscci'] > listaSeleccion[j]['palabra']['tamañoAscci']) {

                    minimo = j;
                    this.ordenamientoAnimacion(++contador, listaSeleccion,true)
         
                }
      
            }
            
            if(minimo != i){
                let temporal = listaSeleccion[i]
                listaSeleccion[i] =  listaSeleccion[minimo]
                listaSeleccion[minimo] = temporal
            }
            this.ordenamientoAnimacion(++contador, listaSeleccion,true)
         
        }


        }else{

        }


        // const tamañoLista = this.state.seleccion.length;
        // const seleccionLista = this.state.seleccion;
        // let contador = 0

        // for (let i = 0; i < tamañoLista; i++) {
        //     let minimo = i
        //     for (let j = i + 1; j < tamañoLista; j++) {
        //         if (seleccionLista[minimo] > seleccionLista[j]) {

        //             minimo = j;
        //             this.ordenamientoAnimacion(++contador, seleccionLista)
         
        //         }
      
        //     }
            
        //     if(minimo != i){
        //         let temporal = seleccionLista[i]
        //         seleccionLista[i] =  seleccionLista[minimo]
        //         seleccionLista[minimo] = temporal
        //     }
        //     this.ordenamientoAnimacion(++contador, seleccionLista)
         
        // }



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
                                labels: this.state.seleccion.length > 0 ? this.state.incersion : this.state.arregloPalabraOrdenado.map((palabra) => palabra.palabra.string),
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
                                        data:  this.state.seleccion.length > 0 ? this.state.listaSeleccion : this.state.arregloPalabraOrdenado.map((palabra) => palabra.palabra.tamañoAscci),
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
