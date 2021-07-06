import React from 'react';
import hamming from '../../EDD/hamming';
import { render } from 'react-dom';
import './Hamming.css';
import {Viz} from 'viz.js/viz';



class CodHamming extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elemento: '',
            reemplazado: '',
            data: null,
            hamm: new hamming()
        };

        this.ContenidoElemento = this.ContenidoElemento.bind(this);
        this.ContenidoReemplazado = this.ContenidoReemplazado.bind(this);
        this.InsertarCadena = this.InsertarCadena.bind(this);
        this.Imprimir = this.Imprimir.bind(this);
        this.leerJson = this.leerJson.bind(this);
    }

    ContenidoElemento(e) {
        this.setState({ elemento: e.target.value });
    }

    ContenidoReemplazado(e) {
        this.setState({ reemplazado: e.target.value });
    }

    InsertarCadena() {
        //this.state.hamm.hamming(this.state.elemento);
        this.state.hamm.PrintM2D(this.state.hamm.hamming(this.state.elemento));
        this.setState({
            hamm: this.state.hamm,
        });
    }

    Imprimir() {
        //this.state.hamm.PrintM2D(this.state.hamm.hamming(this.state.elemento));
    }



    leerJson(event) {
        const input = event.target
        const reader = new FileReader()
        reader.onload = (event) => {
            const text = reader.result

            const json = JSON.parse(text)
            console.log(json.categoria);
            const valores = json.valores

            valores.forEach((element, index) => {
                setTimeout(() => {
                    this.setState({
                        elemento: element,
                    }, () => {
                        this.InsertarCadena()
                    })

                }, index * 1000)
            });

            this.setState({
                data: json
            })
        }
        reader.readAsText(input.files[0], "UTF-8")
    }




    render() {
        //var svgGraph = Viz("digraph { a -> b; }");
        return (
            <div className="container">
                <div className="row gap-2">
                    <div className="col-sm-2 d-grid gap-2">
                        <input type="text" className="form-control" id="Elemento" placeholder="Elemento" value={this.state.elemento} onChange={this.ContenidoElemento} />
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <input type="file" class="form-control" onChange={this.leerJson} />
                    </div>



                </div>

                <div className="card mt-2">
                    <div className="contPadre">
                            <div dangerouslySetInnerHTML={{ __html: this.state.hamm.Graficar(this.state.hamm.hamming(this.state.elemento)) }} />
                    </div>


                </div>

            </div>
        )
    }
}

export default CodHamming;