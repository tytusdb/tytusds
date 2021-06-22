import React, {Component, createRef} from 'react';
import { DataSet, Network } from 'vis';
import Colaprioridad from './Modelo/Lineales/ColaPrioridad/ColaPrioridad'; // Importar la Estructura Lista Circular Doble.
var colaprioridad = new Colaprioridad(); // Instancia de la ListaCDE.
var nodos = new DataSet(colaprioridad.GenerarNodosDOT());  // Se Crean los Nodos.
var flechas = new DataSet(colaprioridad.GenerarEdgesDOT());	// Se Crean las flechas.
var filePath;

var datos = {
	nodes: nodos,
	edge: flechas,
}

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
            background: '#00F3B8',
            border:  '#00F3B8',
            highlight: {
                border: '#00F3B8',
                background: '#00F3B8'
            }
        }
    }
  };

class ColaPrioridad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      agregar: '',
      prioridad:'',
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
    colaprioridad.Encolar(this.state.agregar, this.state.prioridad);
    nodos = new DataSet(colaprioridad.GenerarNodosDOT());
    flechas = new DataSet(colaprioridad.GenerarEdgesDOT());
    datos = {nodes:nodos, edges:flechas,};
    this.network = new Network(this.appRef.current, datos, options);
  }
  EliminarDato = () =>{
    colaprioridad.Desencolar();
    nodos = new DataSet(colaprioridad.GenerarNodosDOT());
    flechas = new DataSet(colaprioridad.GenerarEdgesDOT());
    datos = {nodes:nodos, edges:flechas,};
    this.network = new Network(this.appRef.current, datos, options);
  }
  BuscarDato = () => {
    let dato = colaprioridad.Buscar(this.state.agregar);
    if (0 <= dato){
      nodos = new DataSet(colaprioridad.GenerarNodosDOT());
      flechas = new DataSet(colaprioridad.GenerarEdgesDOT());
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
        <div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
          <input type="text" name="agregar" className="form-control" placeholder="Dato" id="InputCola" value={this.state.agregar} onChange={this.handleInputChange}></input>
        </div>
        <div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
          <input type="text" name="prioridad" className="form-control" placeholder="Prioridad" id="InputPrioridad" value={this.state.prioridad} onChange={this.handleInputChange}></input>
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

export default ColaPrioridad;