import { DataSet, Network } from 'vis';
import React, { Component, createRef } from "react";
import { render } from 'react-dom';
import EstructuraCola from './Modelo/Lineales/Cola/EstructuraCola';


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
  nodes:{
        borderWidth: 30,
        color: {
            background: '#FF5733',
            border:  '#FF5733',
            highlight: {
                border: '#9E3D28',
                background: '#9E3D28'
            }
        }
    }
  };


class Cola extends Component {

  constructor(props) {
    super(props);
    this.state = {
      agregar: '',
      valoreliminar:'',
      valorbuscar: '',
      rango: '1',
    }
    this.network = {};
    this.appRef = createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.network = new Network(this.appRef.current, datos, options);
  }
  handleInputChange(e) {
    const {value, name} = e.target;
    console.log(value, name);
    this.setState({
      [name]: value
    });
    }
  AgregarDato = () => { 
    estructuracola.Encolar(this.state.agregar);
    nodos = new DataSet(estructuracola.GenerarNodosDOT());
    flechas = new DataSet(estructuracola.GenerarEdgesDOT());
    datos = {nodes:nodos, edges:flechas,};
    this.network = new Network(this.appRef.current, datos, options);
  }
  EliminarDato = () =>{
    estructuracola.Desencolar();
    nodos = new DataSet(estructuracola.GenerarNodosDOT());
    flechas = new DataSet(estructuracola.GenerarEdgesDOT());
    datos = {nodes:nodos, edges:flechas,};
    this.network = new Network(this.appRef.current, datos, options);
  }
  BuscarDato = () => {
    let dato = estructuracola.Buscar(this.state.agregar);
    if (0 <= dato){
      nodos = new DataSet(estructuracola.GenerarNodosDOT());
      flechas = new DataSet(estructuracola.GenerarEdgesDOT());
      datos = {
        nodes: nodos,
        edges: flechas,
      }
      flechas.add({from: parseInt(dato), to: parseInt(dato), value:parseInt(dato),color:{color:'#ff383f'}});
    }
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
        <div className="col-md-3" style={{marginLeft: 1 + 'em'}}>
          <input type="text" name="agregar" className="form-control" placeholder="Dato" id="InputCola" value={this.state.agregar} onChange={this.handleInputChange}></input>
        </div>
        <div className="col-md-1">
          <button type="button" className="btn btn-primary" onClick={() => this.AgregarDato()}>Agregar</button>
        </div>
        <div className="col-md-1">
          <button type="button" className="btn btn-danger" onClick={() => this.EliminarDato()}>Eliminar</button>
        </div>
        <div className="col-md-1" style={{marginLeft: 2 + 'em'}}>
          <button type="button" className="btn btn-dark" onClick={() => this.BuscarDato()}>Buscar</button>
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
          <input type="range" className="form-range" min="1" max="10" step="1" defaultValue="1" name="rango" onChange={this.handleInputChange}></input>
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