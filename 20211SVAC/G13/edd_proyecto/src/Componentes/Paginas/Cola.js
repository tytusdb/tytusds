import { DataSet, Network } from 'vis';
import React, { Component, createRef } from "react";
import { render } from 'react-dom';
import EstructuraCola from './Modelo/Lineales/Cola/EstructuraCola';


//var estructuracola = new EstructuraCola();
var estructuracola = new EstructuraCola();
var nodos = new DataSet(estructuracola.GenerarNodosDOT());
var flechas = new DataSet(estructuracola.GenerarEdgesDOT());
var datos = {nodes:nodos, edges:flechas,};
var options = {
  physics: {
    stabilization: false,
    barnesHut: {
      springLength: 200,
    },
  },
};

class Cola extends Component {

  constructor(props) {
    super(props);
    this.state = {
      agregar: '',
      valoreliminar:'',
      valorbuscar: '',
      rango: '',
    }
    this.network = {};
    this.appRef = createRef();
    //this.OnChange = this.OnChange.bind(this);
    //this.AgregarDato = this.AgregarDato.bind(this);
  }

  componentDidMount() {
    this.network = new Network(this.appRef.current, datos, options);
  }
  Cambio(dato){
    this.setState({
      agregar: dato
    })
  }
  AgregarDato = () => { 
    estructuracola.Encolar(this.state.agregar);
    console.log(this.state.agregar);
    console.log(estructuracola.GenerarNodosDOT());
    nodos = new DataSet(estructuracola.GenerarNodosDOT());
    flechas = new DataSet(estructuracola.GenerarEdgesDOT());
    datos = {nodes:nodos, edges:flechas,};
    options = {};
    console.log(estructuracola.GenerarNodosDOT());

    this.network = new Network(this.appRef.current, datos, options);
  }

  render() {
    return (
      <>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-hover"></table>
        </div>
      </div>
      <div className="row">
        <form className="col-md-3">
          <div>
            <input type="text" name="valoragregar" value={this.state.agregar} onChange={(ev) => {this.Cambio(ev.target.value)}}/>
            <button type="button" className="btn btn-primary" onClick={() => this.AgregarDato()}>Agregar</button>
          </div>
        </form>
        <div className="col-md-1">
          <button type="button" className="btn btn-danger">Eliminar</button>
        </div>
        <div className="col-md-1">
          <button type="button" className="btn btn-warning">Actualizar</button>
        </div>
        <div className="col-md-1" style={{marginLeft: 2 + 'em'}}>
          <button type="button" className="btn btn-dark">Buscar</button>
        </div>
        <div className="col-md-3">
          <input className="form-control" type="file" id="formFile"></input>
        </div>
        <div className="col-md-1">
          <button type="button" class="btn btn-success">Guardar</button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-hover"></table>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2" style={{marginLeft: 2 + 'em'}}>
          <h5>Rango de Animacion</h5>
        </div>
        <div className="col-md-6">
          <input type="range" className="form-range" min="1" max="10" step="1" defaultValue="1" name="RangoCola"></input>
        </div>
        <div className="col-md-3" style={{marginLeft: 1 + 'em'}}>
          <h5>Velocidad: x{this.state.rango}</h5>
        </div>

      </div>
      <div className="row">

      </div>
      <div style={{height: 28 + 'em'}} ref={this.appRef} />
    </>
    );
  }
}

export default Cola;