import React, {Component, createRef} from 'react';
import { DataSet, Network } from 'vis';
import Major from './Modelo/Compuesta/Major/RowColumnMajor'; // Importar la Estructura Lista Simple.
var columnmajor = new Major(5,5);
var getNodes = new DataSet([]);  // Se Crean los Nodos.
var getEdges = new DataSet([]);	// Se Crean los apuntadores.
var getNodes2 = new DataSet([]);  // Se Crean los Nodos.
var getEdges2 = new DataSet([]);	// Se Crean los apuntadores.
var filePath;

var data = {
	nodes: getNodes,
	edge: getEdges
}
var data2 = {
	nodes: getNodes,
	edge: getEdges
}
var options = {
	nodes:{
		shape: "box",
    	margin: 10,
    	widthConstraint: {
    	  maximum: 300,
    	},
        borderWidth: 30,
    },
    layout:{
    			hierarchical: {
    			  direction: "UD",
    			  sortMethod: "directed",
    			},
  	},
};
var options2 = {
	nodes:{
		shape: "box",
    	margin: 10,
    	widthConstraint: {
    	  maximum: 300,
    	},
        borderWidth: 30,
    },
    layout:{
    			hierarchical: {
    			  direction: "LR",
    			  sortMethod: "directed",
    			},
  	},
  };


class MatrizColumnMajor extends Component {

	constructor(props) {
		super(props);
		this.state = {
			opcion: 'Simple',
			tamanio: '',
			filas: '',
			columnas: '',
			filaingresar: '',
			columnaingresar: '',
			text: '',
			dato_actualizado: '',
			fileName: '',
			fileContent: '',
		};
		//this.tablahash;
	  	this.network = {};
		this.network2 = {};
	  	this.appRef = createRef();
	  	this.appRef2 = createRef();
		this.handleInputChange = this.handleInputChange.bind(this);
	}
  
	componentDidMount() {
		this.network = new Network(this.appRef.current, data, options);
	  }
	componentDidMount2() {
		this.network2 = new Network(this.appRef2.current, data2, options2);
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

	handleGenerate = () => {
		columnmajor.set_i(parseInt(this.state.filas));
		columnmajor.set_j(parseInt(this.state.columnas));
		columnmajor.InicializarMatriz();
		getNodes = new DataSet(columnmajor.setDataNodes()[0]);
		getEdges = new DataSet(columnmajor.setDataNodes()[1]);
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		console.log(getNodes);
		console.log(getEdges);
		this.network = new Network(this.appRef.current, data, options);
		console.log("Generado")
	}

	handleAdd = () => {
		columnmajor.InsertarDato(parseInt(this.state.filaingresar),parseInt(this.state.columnaingresar),this.state.text);
		getNodes = new DataSet(columnmajor.setDataNodes()[0]);
		getEdges = new DataSet(columnmajor.setDataNodes()[1]);
		console.log(getNodes);
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		this.network = new Network(this.appRef.current, data, options);
	}

	handleDelete = () => {
		columnmajor.EliminarDato(parseInt(this.state.filaingresar),parseInt(this.state.columnaingresar));
		getNodes = new DataSet(columnmajor.setDataNodes()[0]);
		getEdges = new DataSet(columnmajor.setDataNodes()[1]);
		console.log(getNodes);
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		this.network = new Network(this.appRef.current, data, options);
	}

	handleGenerar = () => {
		columnmajor.ConvertirColumnMajor();
		getNodes2 = new DataSet(columnmajor.setData()[0]);
		getEdges2 = new DataSet(columnmajor.setData()[1]);
		console.log(getNodes);
		data2 = {
			nodes: getNodes2,
			edges: getEdges2
		}
		this.network = new Network(this.appRef2.current, data2, options2);
	}

	handleSearch = () => {
		getNodes2 = new DataSet(columnmajor.setData()[0]);
		getEdges2 = new DataSet(columnmajor.setData()[1]);
		let indice = columnmajor.BuscarDatoColumnMajor(parseInt(this.state.filaingresar),parseInt(this.state.columnaingresar));
		getEdges2.add({from: parseInt(indice), to: parseInt(indice),value:parseInt(indice),color:{color:'#ff383f'}});
		data2 = {
			nodes: getNodes2,
			edges: getEdges2
		}
		this.network = new Network(this.appRef2.current, data2, options2);
	}

	handleOpenFile = () => {
		let paraarreglo=[]
		const dataJson = JSON.parse(this.state.fileContent);
		//let nombre = "Estructura Compuesta";
		if ((dataJson.categoria == "Estructura Compuesta")&&(dataJson.nombre=="Column Major")){
			columnmajor.set_i(parseInt(dataJson.m[0]));
			columnmajor.set_j(parseInt(dataJson.m[1]));
			columnmajor.InicializarMatriz();
			for (var i=0; i < dataJson.valores.length; i++) {
				columnmajor.InsertarDato(parseInt(dataJson.valores[i].indices[0]),parseInt(dataJson.valores[i].indices[1]),dataJson.valores[i].valor);
			}
			getNodes = new DataSet(columnmajor.setDataNodes()[0]);
			getEdges = new DataSet(columnmajor.setDataNodes()[1]);
			data = {
				nodes: getNodes,
				edges: getEdges
			}
			this.network = new Network(this.appRef.current, data, options);
		}else {

			alert("No es un Archivo de ESTRUCTURA COMPUESTA O DE COLUMN MAJOR!! ")
		}
	}

	handleSaveFile = () => {
		const element = document.createElement("a");
		var contenido = columnmajor.generateJSONColumnMajor();
		const blob = new Blob([contenido]);                   
		element.href = URL.createObjectURL(blob);
	    element.download = "ColumnMajor.json";
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
				<div className="col-md-4" style={{marginLeft: 1 + 'em'}}>
					<input type="minimo" name="filas" className="form-control" placeholder="Ingresar No. Filas" id="InputFilas" value={this.state.filas} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-4" style={{marginLeft: 1 + 'em'}}>
					<input type="maximo" name="columnas" className="form-control" placeholder="Ingresar No. Columnas" id="InputColumnas" value={this.state.columnas} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-3" style={{marginLeft: 2 + 'em'}}>
					<button type="button" className="btn btn-primary" onClick={() => this.handleGenerate()}>Generar Matriz</button>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<table className="table table-hover"></table>
				</div>
			</div>
			<div className="row">
				<div className="col-md-3" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="text" className="form-control" placeholder="Ingresar Dato" id="InputCola" value={this.state.text} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="filaingresar" className="form-control" placeholder="No. Fila" id="InputCola" value={this.state.filaingresar} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="columnaingresar" className="form-control" placeholder="No. Columna" id="InputCola" value={this.state.columnaingresar} onChange={this.handleInputChange} ></input>
				</div>
				<div className="col-md-4">
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
				<div className="col-md-2" style={{marginLeft: 2 + 'em'}}>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAdd()}>Agregar Dato</button>
				</div>
				<div className="col-md-2">
					<button type="button" className="btn btn-danger" onClick={() => this.handleDelete()} >Eliminar</button>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<button type="button" className="btn btn-warning" onClick={() => this.handleSearch()}>Buscar Dato</button>
				</div>				
				<div className="col-md-2">
					<button type="button" className="btn btn-warning" onClick={() => this.handleGenerar()}>Generar Column Major</button>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
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
			<div className="row">
			</div>
			<div style={{height: 28 + 'em'}} ref={this.appRef} />
			<div className="row">
			</div>
			<div style={{height: 20 + 'em'}} ref={this.appRef2} />
		</>

	  );
	}
  }
  
  export default MatrizColumnMajor;