import React, {Component, createRef} from 'react';
import { DataSet, Network } from 'vis';

import OrdenamientoInsercion from './Modelo/Ordenamientos/OrInsercion'; // Importar la Estructura Lista Simple.
var insercion = new OrdenamientoInsercion(); // Instancia de la ListaSimple.
var getNodes = new DataSet(insercion.setNodesDataSet());  // Se Crean los Nodos.
var getEdges = new DataSet(insercion.setEdgesDataSet());	// Se Crean los apuntadores.


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


class Insercion extends Component {

	constructor(props) {
		super(props);
		this.state = {
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

	handleOpenFile = () => {

		const dataJson = JSON.parse(this.state.fileContent);
		if (dataJson.categoria == "Estructura Lineal" && dataJson.nombre == "Ordenamiento"){

			
			for (var i=0; i < dataJson.valores.length; i++) {
				// console.log(dataJson.valores[i]);
				insercion.insertar(dataJson.valores[i].toString());
				
			}
			getNodes = new DataSet(insercion.setNodesDataSet());
			getEdges = new DataSet(insercion.setEdgesDataSet());
			data = {
				nodes: getNodes,
				edges: getEdges
			}
			
			this.network = new Network(this.appRef.current, data, options);


		}else {

			alert("No es un Archivo de ESTRUCTURA LINEAL!! -> Ordenamiento ")
		}
	
	}

	handleOrdenamiento = () => {

		insercion.ordenamiento_insercion()
		getNodes = new DataSet(insercion.setNodesDataSet());
		getEdges = new DataSet(insercion.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);

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
				<div className="col-md-4" style={{marginLeft: 2 + 'em'}}>
					<input className="form-control" type="file" onChange={this.handleFileChange} ></input>
				</div>
				<div className="col-md-1">
				</div>			
				<div className="col-md-2">
					<button type="button" class="btn btn-dark" onClick={() => this.handleOpenFile()}>Leer Json</button>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<button type="button" className="btn btn-primary" onClick={() => this.handleOrdenamiento()}>Ordenar</button>
				</div>
				<div className="col-md-2" style={{marginRight: 1 + 'em'}}>
					<button type="button" class="btn btn-success">Guardar</button>
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
  
export default Insercion;
