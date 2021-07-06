import React from 'react';
import huffma from '../../EDD/huffman';
import { render } from 'react-dom';
//import './Hamming.css';


var ahtml = "";
class CodHuffman extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elemento: '',
            reemplazado: '',
            data: null,
            huff: new huffma()
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
        const nuevo = this.state.huff.huffman(this.state.elemento);
        ahtml=this.state.huff.Graficar(nuevo);
        this.setState({
            huff: this.state.huff,
        });
    }

    Imprimir() {
        //this.state.hamm.PrintM2D(this.state.hamm.hamming(this.state.elemento));
    }



    leerJson(event) {
        const input = event.target
        const reader = new FileReader()
        ahtml=this.state.huff.Graficar(reader);
        this.setState({
            huff: this.state.huff,
        });
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
                        <button className="btn btn-success" onClick={this.InsertarCadena} >Insertar Cadena</button>
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <input type="file" class="form-control" onChange={this.leerJson} />
                    </div>

                </div>

                <div className="card mt-2">
                    <div className="contPadre">
                    <div dangerouslySetInnerHTML={{ __html: ahtml }} />
                    </div>


                </div>

            </div>
        )
    }
}

export default CodHuffman;