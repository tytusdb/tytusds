import React, {Component, createRef} from 'react';
import { DataSet, Network } from 'vis';

import ListaDoble from './Modelo/Lineales/ListaDoble/ListaDoble'; // Importar la Estructura Lista Simple.
var listaDoble = new ListaDoble(); // Instancia de la ListaSimple.

var getNodes = new DataSet(listaDoble.setNodesDataSet());  // Se Crean los Nodos.
var getEdges = new DataSet(listaDoble.setEdgesDataSet());	// Se Crean los apuntadores.

var data = {
	nodes: getNodes,
	edge: getEdges
}

var options = {
	physics: {
		stabilization: false,
		barnesHut: {
		  springLength: 200,
		},
	},
    nodes:{
        borderWidth: 20,
        color: {
            background: '#00FE92',
            border:  '#37F300',
            highlight: {
                border: '#2B7CE9',
                background: '#0008FE'
            }
        }
    }
}
class ListaDE extends Component {

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
		listaDoble.insertar(this.state.text);
		getNodes = new DataSet(listaDoble.setNodesDataSet());
		getEdges = new DataSet(listaDoble.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleDelete = () => {
		listaDoble.eliminar(this.state.text);
		getNodes = new DataSet(listaDoble.setNodesDataSet());
		getEdges = new DataSet(listaDoble.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleUpdate = () => {
		listaDoble.update(this.state.text, this.state.dato_actualizado);
		getNodes = new DataSet(listaDoble.setNodesDataSet());
		getEdges = new DataSet(listaDoble.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleAddTop = () => {
		listaDoble.insertar_inicio(this.state.text);
		getNodes = new DataSet(listaDoble.setNodesDataSet());
		getEdges = new DataSet(listaDoble.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleAddLower = () => {
		listaDoble.insertar_ultimo(this.state.text);
		getNodes = new DataSet(listaDoble.setNodesDataSet());
		getEdges = new DataSet(listaDoble.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleSearch = () => {
		let dato = listaDoble.search(this.state.text);
		if (0 <= parseInt(dato)){
			console.log(dato+" ENCONTRADO")
            getNodes = new DataSet(listaDoble.setNodesDataSet());
            getEdges = new DataSet(listaDoble.setEdgesDataSet());
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
		let nombre = "Lista Simplemente/doblemente/circular simplemente/circular doblemente Enlazada"
		if (dataJson.categoria == "Estructura Lineal" && dataJson.nombre == nombre){

			
			for (var i=0; i < dataJson.valores.length; i++) {
				console.log(dataJson.valores[i]);
				listaDoble.insertar(dataJson.valores[i].toString());
				
			}
			getNodes = new DataSet(listaDoble.setNodesDataSet());
			getEdges = new DataSet(listaDoble.setEdgesDataSet());
			data = {
				nodes: getNodes,
				edges: getEdges
			}
			
			this.network = new Network(this.appRef.current, data, options);

		}else {

			alert("No es un Archivo de ESTRUCTURA LINEAL!! ")
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
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="text" className="form-control" placeholder="Ingresar Dato" id="InputCola" value={this.state.text} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-primary" onClick={() => this.handleAdd()}>Agregar</button>
				</div>
				
				<div className="col-md-1">
					<button type="button" className="btn btn-danger" onClick={() => this.handleDelete()} >Eliminar</button>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="dato_actualizado" className="form-control" placeholder="Dato a Actualizar" id="InputCola" value={this.state.dato_actualizado} onChange={this.handleInputChange} ></input>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-warning" onClick={() => this.handleUpdate()}>Actualizar</button>
				</div>
				<div className="col-md-1" style={{marginLeft: 1 + 'em'}}>
					<button type="button" className="btn btn-dark" onClick={() => this.handleSearch()}>Buscar</button>
				</div>
				<div className="col-md-3">
					<input className="form-control" type="file" id="formFile" onChange={this.handleFileChange}></input>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<table className="table table-hover"></table>
				</div>
			</div>

			<div className="row">
				<div className="col-md-12">
					<table className="table table-hover"></table>
				</div>
			</div>
			<div className="row">
				<div className="col-md-2" style={{marginLeft: 2 + 'em'}}>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAddTop()}>Agregar Dato Al Inicio</button>
				</div>
				<div className="col-md-5">
					<button type="button" className="btn btn-primary" onClick={() => this.handleAddLower()}>Agregar Dato al Final</button>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<button type="button" className="btn btn-dark" onClick={() => this.handleOpenFile()} >Generar Datos del JSON</button>
				</div>
				<div className="col-md-2">
					<button type="button" class="btn btn-success">Guardar Datos</button>
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
  
  export default ListaDE; 