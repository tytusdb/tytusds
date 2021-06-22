import React, {Component, createRef} from 'react';
import { DataSet, Network } from 'vis';

import ListaSimple from './Modelo/Lineales/ListaSimple/ListaSimple'; // Importar la Estructura Lista Simple.
var listaSimple = new ListaSimple(); // Instancia de la ListaSimple.
var getNodes = new DataSet(listaSimple.setNodesDataSet());  // Se Crean los Nodos.
var getEdges = new DataSet(listaSimple.setEdgesDataSet());	// Se Crean los apuntadores.
var filePath;

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
        borderWidth: 30,
        color: {
            background: '#FEFEFE',
            border:  '#FFF300',
            highlight: {
                border: '#00F3B8',
                background: '#FF1F00'
            }
        }
    }
  };


class ListaSE extends Component {

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
		listaSimple.insertar(this.state.text);
		getNodes = new DataSet(listaSimple.setNodesDataSet());
		getEdges = new DataSet(listaSimple.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleDelete = () => {
		listaSimple.eliminar(this.state.text);
		getNodes = new DataSet(listaSimple.setNodesDataSet());
		getEdges = new DataSet(listaSimple.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleUpdate = () => {
		listaSimple.update(this.state.text, this.state.dato_actualizado);
		getNodes = new DataSet(listaSimple.setNodesDataSet());
		getEdges = new DataSet(listaSimple.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleAddTop = () => {
		listaSimple.insertar_inicio(this.state.text);
		getNodes = new DataSet(listaSimple.setNodesDataSet());
		getEdges = new DataSet(listaSimple.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleAddLower = () => {
		listaSimple.insertar_ultimo(this.state.text);
		getNodes = new DataSet(listaSimple.setNodesDataSet());
		getEdges = new DataSet(listaSimple.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleSearch = () => {
		let dato = listaSimple.search(this.state.text);
		if (0 <= parseInt(dato)){
			console.log(dato+" ENCONTRADO")
			getNodes = new DataSet(listaSimple.setNodesDataSet());
			getEdges = new DataSet(listaSimple.setEdgesDataSet());
			data = {
				nodes: getNodes,
				edges: getEdges
			}
			getEdges.add({from: parseInt(dato), to: parseInt(dato), value:parseInt(dato),color:{color:'#ff383f'}});
			
		}else{
			console.log(dato)

		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleOpenFile = () => {

		const dataJson = JSON.parse(this.state.fileContent);
		let nombre = "Lista Simplemente/doblemente/circular simplemente/circular doblemente Enlazada"
		if (dataJson.categoria == "Estructura Lineal" && dataJson.nombre == nombre){

			
			for (var i=0; i < dataJson.valores.length; i++) {
				console.log(dataJson.valores[i]);
				listaSimple.insertar(dataJson.valores[i].toString());
				
			}
			getNodes = new DataSet(listaSimple.setNodesDataSet());
			getEdges = new DataSet(listaSimple.setEdgesDataSet());
			data = {
				nodes: getNodes,
				edges: getEdges
			}
			
			this.network = new Network(this.appRef.current, data, options);


		}else {

			alert("No es un Archivo de ESTRUCTURA LINEAL!! ")
		}
	
	}

	handleSaveFile = () => {

		listaSimple.generateJSON(listaSimple)
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
				<div className="col-md-2">
					<button type="button" className="btn btn-primary" onClick={() => this.handleAdd()}>Agregar Dato</button>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="dato_actualizado" className="form-control" placeholder="Dato a Actualizar" id="InputCola" value={this.state.dato_actualizado} onChange={this.handleInputChange} ></input>
				</div>
				<div className="col-md-2">
					<button type="button" className="btn btn-warning" onClick={() => this.handleUpdate()}>Actualizar Dato</button>
				</div>
				<div className="col-md-3">
					<input className="form-control" type="file" onChange={this.handleFileChange} ></input>
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
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAddTop()}>Agregar al Inicio</button>
				</div>
				<div className="col-md-2">
					<button type="button" className="btn btn-primary" onClick={() => this.handleAddLower()}>Agregar al Final</button>
				</div>
				<div className="col-md-2">
					<button type="button" className="btn btn-danger" onClick={() => this.handleDelete()} >Eliminar</button>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<button type="button" className="btn btn-warning" onClick={() => this.handleSearch()}>Buscar Dato</button>
				</div>				
				<div className="col-md-2">
					<button type="button" class="btn btn-dark" onClick={() => this.handleOpenFile()}>Leer Json</button>
				</div>
				<div className="col-md-1">
					<button type="button" class="btn btn-success" onClick={() => this.handleSaveFile()}>Guardar</button>
				</div>
				
			</div>


			<div className="row">
				<div className="col-md-12">
					<table className="table table-hover"></table>
				</div>
			</div>
			<div className="row">
				<div className="col-md-2" style={{marginLeft: 4 + 'em'}}>
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
  
  export default ListaSE;