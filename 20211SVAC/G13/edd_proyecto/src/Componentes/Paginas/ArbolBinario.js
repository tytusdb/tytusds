import React, {Component, createRef} from 'react';
import { DataSet, Network } from 'vis';
import ArbolBB from './Modelo/Arboles/ArbolBB/ArbolBB'; // Importar la Estructura Lista Simple.
let nuevodot=[];
let edgesdot=[];
var arbolbinario = new ArbolBB(); // Instancia de la ListaSimple.
//var getNodes =[]
var getNodes = new DataSet(arbolbinario.setNodesDataSet(arbolbinario.get_raiz(),0,[])[0]);
//var getEdges =[]  // Se Crean los Nodos.
var getEdges = new DataSet(arbolbinario.setEdgesDataSet(arbolbinario.get_raiz(),0,[])[0]);	// Se Crean los apuntadores.
var filePath;

var data = {
	nodes: getNodes,
	edge: getEdges
}

var options = {
	layout: {
    	hierarchical: {
    	  direction: "UD",
    	  sortMethod: "directed",
    	},
  	},
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

class ArbolBinario extends Component {

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

	handleAdd = () => {
		arbolbinario.Insertar(this.state.text);
		
		//console.log(arbolbinario.setNodesDataSet(arbolbinario.get_raiz(),0,nuevodot));
		//console.log(arbolbinario.setEdgesDataSet(arbolbinario.get_raiz(),0,edgesdot));
		getNodes = new DataSet(arbolbinario.setNodesDataSet(arbolbinario.get_raiz(),0,[])[0]);
		getEdges = new DataSet(arbolbinario.setEdgesDataSet(arbolbinario.get_raiz(),0,[])[0]);
		console.log(getNodes);
		console.log(getEdges);
		data = {
			nodes: getNodes,
			edges: getEdges,
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleDelete = () => {
		arbolbinario.EliminarNodo(this.state.text);
		getNodes = new DataSet(arbolbinario.setNodesDataSet());
		//getEdges = new DataSet(arbolbinario.setEdgesDataSet());
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
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="text" className="form-control" placeholder="Ingresar Dato" id="InputCola" value={this.state.text} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-primary" onClick={() => this.handleAdd()}>Agregar Dato</button>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-danger" onClick={() => this.handleDelete()} >Eliminar</button>
				</div>
				<div className="col-md-1" style={{marginLeft: 1 + 'em'}}>
					<button type="button" className="btn btn-warning" onClick={() => this.handleSearch()}>Buscar Dato</button>
				</div>		
				<div className="col-md-2">
					<input className="form-control" type="file" onChange={this.handleFileChange} ></input>
				</div>
				<div className="col-md-1">
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
  
export default ArbolBinario;
