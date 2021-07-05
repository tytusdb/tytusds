import React, {Component, createRef} from 'react';
import { DataSet, Network } from 'vis';

import Stack from './Modelo/Lineales/Pila/Stack'; // Importar la Estructura Lista Simple.
var pila = new Stack(); // Instancia de la ListaSimple.

var getNodes = new DataSet(pila.setNodesDataSet());  // Se Crean los Nodos.
var getEdges = new DataSet(pila.setEdgesDataSet());	// Se Crean los apuntadores.

var data = {
	nodes: getNodes,
	edge: getEdges
}

var options = {
	physics: {
		stabilization: false,
		barnesHut: {
		  springLength: 300,
		},
	},
    nodes:{
        borderWidth: 20,
        color: {
            background: '#FFFFFF', 
            border:  '#D366FF',
            highlight: { // cambia de color al qu selecciona
                border: '#1EFFB1', 
                background: '#FFFFFF'	
            }
        }
    }
}
class Pila extends Component {

	constructor(props) {
		super(props);
		this.state = {

			text: '',
			dato_actualizado: '',
			fileName: '',
			fileContent: '',
		};
		this.network = {};
	  	this.appRef = createRef();
		this.handleInputChange = this.handleInputChange.bind(this);
	}
  
	componentDidMount() {
		this.network = new Network(this.appRef.current, data, options);
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

	handleAdd = () => {
		pila.insertar(this.state.text);
		getNodes = new DataSet(pila.setNodesDataSet());
		getEdges = new DataSet(pila.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleDelete = () => {
		pila.pop();
		getNodes = new DataSet(pila.setNodesDataSet());
		getEdges = new DataSet(pila.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleUpdate = () => {
		pila.update(this.state.text, this.state.dato_actualizado);
		getNodes = new DataSet(pila.setNodesDataSet());
		getEdges = new DataSet(pila.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleSearch = () => {
		let dato = pila.search(this.state.text);
		if (0 <= parseInt(dato)){
			console.log(dato+" ENCONTRADO")
            getNodes = new DataSet(pila.setNodesDataSet());
            getEdges = new DataSet(pila.setEdgesDataSet());
			data = {
				nodes: getNodes,
				edges: getEdges
			}
			getEdges.add({from: parseInt(dato), to: parseInt(dato), value:parseInt(dato),color:{color:'#ff383f'}});
			
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}


	handleOpenFile = () => {

		const dataJson = JSON.parse(this.state.fileContent);

		if (dataJson.categoria == "Estructura Lineal" && dataJson.nombre == "Pila"){

			
			for (var i=0; i < dataJson.valores.length; i++) {
				console.log(dataJson.valores[i]);
				pila.insertar(dataJson.valores[i].toString());
				
			}
			getNodes = new DataSet(pila.setNodesDataSet());
			getEdges = new DataSet(pila.setEdgesDataSet());
			data = {
				nodes: getNodes,
				edges: getEdges
			}
			
			this.network = new Network(this.appRef.current, data, options);


		}else {

			alert("No es un Archivo de ESTRUCTURA LINEAL - PIla!! ")
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
				<div className="col-md-1" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="text" className="form-control" placeholder="Dato" id="InputCola" value={this.state.text} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-primary" onClick={() => this.handleAdd()}>Agregar</button>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-danger" onClick={() => this.handleDelete()} >Eliminar</button>
				</div>
				<div className="col-md-1" style={{marginLeft: 0 + 'em'}}>
					<input type="text" name="dato_actualizado" className="form-control" placeholder="Update" id="InputCola" value={this.state.dato_actualizado} onChange={this.handleInputChange} ></input>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-warning" onClick={() => this.handleUpdate()}>Actualizar</button>
				</div>
				<div className="col-md-1" style={{marginLeft: 0 + 'em'}}>
					<button type="button" className="btn btn-dark" onClick={() => this.handleSearch()}>Buscar</button>
				</div>
				<div className="col-md-2" style={{marginLeft: 0 + 'em'}}>
					<button type="button" className="btn btn-dark" onClick={() => this.handleOpenFile()}>Leer JSON</button>
				</div>
				<div className="col-md-2">
					<input className="form-control" type="file" id="formFile" onChange={this.handleFileChange}></input>
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
					<h5>Velocidad: x</h5>
				</div>
			</div>
			<div className="row">
			</div>
			<div style={{height: 28 + 'em'}} ref={this.appRef} />
		</>

	  );
	}
  }
  
  export default Pila;