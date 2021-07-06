import React, {Component, createRef} from 'react';
import { DataSet, Network } from 'vis';

import EncodeHamming from './Modelo/Codificacion/Hamming/Hamming.js'; // Importar la Estructura Lista Simple.
var encodeHamming = new EncodeHamming(); // Instancia de la ListaSimple.
var getNodes = new DataSet(encodeHamming.setNodesDataSet());  // Se Crean los Nodos.
var getEdges = new DataSet(encodeHamming.setEdgesDataSet());	// Se Crean los apuntadores.


var data = {
	nodes: getNodes,
	edge: getEdges
}
var options = {
	physics: {
		stabilization: false,
		barnesHut: {
			springLength: 400,
		},
	},
	nodes:{
        borderWidth: 20,
        shape: "box",
        color: {
            background: '#FEFEFE',
            border:  '#00e53f',
            highlight: {
                border: '#00F3B8',
                background: '#FF1F00'
            }
        }
    },
    layout:{
		hierarchical: {
		  direction: "UD",
		},
  	},
  };


class Hamming extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: '',
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

		const encodeText = this.state.fileContent;
		console.log(encodeText)
				
		encodeHamming.encode(encodeText)
		getNodes = new DataSet(encodeHamming.setNodesDataSet());
		getEdges = new DataSet(encodeHamming.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);


	
	
	}

	handleEncode = () => {
		if(this.state.text!=""){
			encodeHamming.encode(this.state.text)
			getNodes = new DataSet(encodeHamming.setNodesDataSet());
				getEdges = new DataSet(encodeHamming.setEdgesDataSet());
				data = {
					nodes: getNodes,
					edges: getEdges
				}
				
				this.network = new Network(this.appRef.current, data, options);
		}else{
			alert("Debes de ingresar un numero Binario.")
		}
		

	}

	handleSaveFile = () => {
		const element = document.createElement("a");
		var contenido = encodeHamming.generateJSON()
		const blob = new Blob([contenido]);                   
		element.href = URL.createObjectURL(blob);
	    element.download = "hamming.txt";
	    document.body.appendChild(element);
	    element.click();
	    alert("Documento Creado!")
		
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
				<div className="col-md-1">
					<button type="button" class="btn btn-dark" onClick={() => this.handleOpenFile()}>Leer Json</button>
				</div>
				<div className="col-md-2">
					<input type="text" name="text" className="form-control" placeholder="Ingresar Dato" id="InputCola" value={this.state.text} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-1" style={{marginLeft: 1 + 'em'}}>
					<button type="button" className="btn btn-primary" onClick={() => this.handleEncode()}>Codificar</button>
				</div>
				<div className="col-md-2" style={{marginRight: 1 + 'em'}}>
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
  
  export default Hamming;