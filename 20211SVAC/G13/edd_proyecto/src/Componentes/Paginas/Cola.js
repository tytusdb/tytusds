import { DataSet, Network } from 'vis';
import React, { Component, createRef } from "react";
import { render } from 'react-dom';
import EstructuraCola from './Modelo/Lineales/Cola/EstructuraCola';


var estructuracola = new EstructuraCola();
var nodos = new DataSet(estructuracola.setNodesDataSet());
var flechas = new DataSet(estructuracola.setEdgesDataSet());
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
      dato_actualizado: '',
      valoreliminar:'',
      valorbuscar: '',
      rango: '1',
			fileName: '',
			fileContent: '',
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
  
  handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      this.setState({fileName: file.name, fileContent: reader.result})
    }
  }


  AgregarDato = () => { 
    estructuracola.insertar(this.state.agregar);
    nodos = new DataSet(estructuracola.setNodesDataSet());
    flechas = new DataSet(estructuracola.setEdgesDataSet());
    datos = {nodes:nodos, edges:flechas,};
    this.network = new Network(this.appRef.current, datos, options);
  }
  EliminarDato = () =>{
    estructuracola.Desencolar();
    nodos = new DataSet(estructuracola.setNodesDataSet());
    flechas = new DataSet(estructuracola.setEdgesDataSet());
    datos = {nodes:nodos, edges:flechas,};
    this.network = new Network(this.appRef.current, datos, options);
  }
  ActualizarDato = () => {
    estructuracola.update(this.state.agregar, this.state.dato_actualizado);
    nodos = new DataSet(estructuracola.setNodesDataSet());
    flechas = new DataSet(estructuracola.setEdgesDataSet());
    datos = {nodes:nodos, edges:flechas,};
    this.network = new Network(this.appRef.current, datos, options);
  }
  BuscarDato = () => {
    let dato = estructuracola.search(this.state.agregar);
    if (0 <= dato){
      nodos = new DataSet(estructuracola.setNodesDataSet());
      flechas = new DataSet(estructuracola.setEdgesDataSet());
      datos = {
        nodes: nodos,
        edges: flechas,
      }
      flechas.add({from: parseInt(dato), to: parseInt(dato), value:parseInt(dato),color:{color:'#ff383f'}});
    }
    this.network = new Network(this.appRef.current, datos, options);
  }

  handleOpenFile = () => {

		const dataJson = JSON.parse(this.state.fileContent);

		if (dataJson.categoria == "Estructura Lineal" && dataJson.nombre == "Cola"){

			
			for (var i=0; i < dataJson.valores.length; i++) {
				console.log(dataJson.valores[i]);
				estructuracola.insertar(dataJson.valores[i].toString());
				
			}
			nodos = new DataSet(estructuracola.setNodesDataSet());
      flechas = new DataSet(estructuracola.setEdgesDataSet());
      datos = {
        nodes: nodos,
        edges: flechas,
      }
			
      this.network = new Network(this.appRef.current, datos, options);


		}else {

			alert("No es un Archivo de ESTRUCTURA LINEAL - Cola!! ")
		}
	
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
        <div className="col-md-1" style={{marginLeft: 0 + 'em'}}>
          <input type="text" name="agregar" className="form-control" placeholder="Dato" id="InputCola" value={this.state.agregar} onChange={this.handleInputChange}></input>
        </div>
        <div className="col-md-1">
          <button type="button" className="btn btn-primary" onClick={() => this.AgregarDato()}>Agregar</button>
        </div>
        <div className="col-md-1" style={{marginLeft: 0 + 'em'}}>
          <input type="text" name="dato_actualizado" className="form-control" placeholder="Update" id="InputCola" value={this.state.dato_actualizado} onChange={this.handleInputChange} ></input>
        </div>
        <div className="col-md-1">
          <button type="button" className="btn btn-warning" onClick={() => this.ActualizarDato()}>Actualizar Dato</button>
        </div>
        <div className="col-md-1">
          <button type="button" className="btn btn-danger" onClick={() => this.EliminarDato()}>Eliminar</button>
        </div>
        <div className="col-md-1" style={{marginLeft: 0 + 'em'}}>
          <button type="button" className="btn btn-dark" onClick={() => this.BuscarDato()}>Buscar</button>
        </div>
        <div className="col-md-2" style={{marginLeft: 0 + 'em'}}>
          <button type="button" className="btn btn-dark" onClick={() => this.handleOpenFile()}>Leer Json</button>
        </div>
        <div className="col-md-2">
          <input className="form-control" type="file" id="formFile" onChange={this.handleFileChange}></input>
        </div>
        <div className="col-md-1">
          <button type="button" class="btn btn-success">Guardar</button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12"  style={{marginLeft: 3 + 'em'}}>
          <fieldset class="form-group">
            <legend>Repetidos</legend>
            <div class="form-check">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" ></input>
                Si
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2"></input>
                No
              </label>
            </div>
          </fieldset>
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