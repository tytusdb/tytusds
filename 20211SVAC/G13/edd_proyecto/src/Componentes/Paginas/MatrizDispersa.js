import React, {Component, createRef} from 'react';
import { DataSet, Network } from 'vis';
import MatrizOrtogonal from './Modelo/Compuesta/MatrizDispersa/MatrizOrtogonal.js'; // Importar la Estructura Lista Simple.
var matrizDispersa = new MatrizOrtogonal(); // Instancia de la matrizDispersa.
var getNodes = new DataSet(matrizDispersa.setNodesDataSet());  // Se Crean los Nodos.
var getEdges = new DataSet(matrizDispersa.setEdgesDataSet());	// Se Crean los apuntadores.
var filePath;

var data = {
	nodes: getNodes,
	edge: getEdges
}

var options = {
	physics: {
		stabilization: false,
		barnesHut: {
			springLength: 120,
		},
	},
	nodes:{
        borderWidth: 20,
        color: {
            background: '#F2FF9D',
            border:  '#6CCECD',
            highlight: {
                border: '#00F3B8',
                background: '#FF1F00'
            }
        }
    }
  };


class MatrizDispersa extends Component {

	constructor(props) {
		super(props);
		this.state = {

			text: '',
			textX: '',
			textY: '',
			estado: '',
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
		let dato = matrizDispersa.search(this.state.textX, this.state.textY, this.state.text);
		console.log(dato)
		if(dato==null){

			matrizDispersa.insertar(this.state.textX, this.state.textY, this.state.text);
			getNodes = new DataSet(matrizDispersa.setNodesDataSet());
			getEdges = new DataSet(matrizDispersa.setEdgesDataSet());
			data = {
				nodes: getNodes,
				edges: getEdges
			}
			
			this.network = new Network(this.appRef.current, data, options);
		}else{

			alert("YA EXISTE UN DATO EN ESA POSICION")
		}
			
	}

	handleDelete = () => {
		matrizDispersa.delete(this.state.textX, this.state.textY, this.state.text);
		getNodes = new DataSet(matrizDispersa.setNodesDataSet());
		getEdges = new DataSet(matrizDispersa.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleUpdate = () => {
		matrizDispersa.update(this.state.textX, this.state.textY, this.state.text, this.state.dato_actualizado);
		getNodes = new DataSet(matrizDispersa.setNodesDataSet());
		getEdges = new DataSet(matrizDispersa.setEdgesDataSet());
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		
		this.network = new Network(this.appRef.current, data, options);
	}

	handleSearch = () => {
		let dato = matrizDispersa.getNodesDataSet(this.state.textX, this.state.textY, this.state.text);
		if (0 <= parseInt(dato)){
			console.log(dato+" ENCONTRADO")
			getNodes = new DataSet(matrizDispersa.setNodesDataSet());
			getEdges = new DataSet(matrizDispersa.setEdgesDataSet());
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
		if (dataJson.categoria == "Estructura Compuesta"){

			
			// for (var i=0; i < dataJson.valores.length; i++) {
			// 	console.log(dataJson.valores[i]);
			// 	// matrizDispersa.insertar(dataJson.valores[i].toString());
				
			// }
			var posicionX  = null;
			var posicionY = null; 
			var i = 0;
			dataJson.valores.forEach(function(element){
				i = 1
				element.indices.forEach(function(posicion){
					if(i==1){
						posicionX = posicion;
					}else if(i==2){
						posicionY = posicion;
					}
					i++;
				});
				console.log(posicionX+","+posicionY+"->"+element.valor);
				let dato = matrizDispersa.getData(posicionX, posicionY);
				if(dato!=null){
					matrizDispersa.update(posicionX, posicionY, dato, element.valor);
				}else{
					matrizDispersa.insertar(posicionX, posicionY, element.valor);	
				}
			});


			getNodes = new DataSet(matrizDispersa.setNodesDataSet());
			getEdges = new DataSet(matrizDispersa.setEdgesDataSet());
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
		// matrizDispersa.generateJSON(matrizDispersa)
		console.log("Guardar :c")
	}

	handleCabecera = () => {
		matrizDispersa.desactivarEncabezado(this.state.estado)
		getNodes = new DataSet(matrizDispersa.setNodesDataSet());
			getEdges = new DataSet(matrizDispersa.setEdgesDataSet());
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
				<div className="col-md-1" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="textX" className="form-control" placeholder="Posicion: X" id="InputCola" value={this.state.textX} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-1" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="textY" className="form-control" placeholder="Posicion: Y" id="InputCola" value={this.state.textY} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-1">
					<input type="text" name="estado" className="form-control" placeholder="True/False" id="InputCola" value={this.state.estado} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-danger" onClick={() => this.handleCabecera()} >Cabecera</button>
				</div>
				<div className="col-md-1">
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
  
  export default MatrizDispersa;