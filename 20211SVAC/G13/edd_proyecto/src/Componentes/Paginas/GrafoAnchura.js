import React, {Component, createRef} from 'react';
import { DataSet, Network } from 'vis';
import Grafo from './Modelo/NoLineal/Grafo'; // Importar la Estructura Lista Simple.
var grafo = new Grafo();
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
    			  direction: "UD",
    			  sortMethod: "directed",
    			},
  	},
  };


class GrafoAnchura extends Component {

	constructor(props) {
		super(props);
		this.state = {
			opcion: 'No Dirigido',
			origen: '',
			donde: '',
			distancia: '',
			inicio: '',
			fin: '',
			buscar: '',
			text: '',
			actualizar: '',
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

	handleAgregarArista=()=>{
		grafo.AgregarArista(this.state.origen,this.state.donde,this.state.distancia);
		if(this.state.opcion=="No Dirigido"){
			getNodes = new DataSet(grafo.getDataSetNoDirigido()[0]);
			getEdges = new DataSet(grafo.getDataSetNoDirigido()[1]);
		}else if(this.state.opcion=="Dirigido"){
			getNodes = new DataSet(grafo.getDataSetDirigido()[0]);
			getEdges = new DataSet(grafo.getDataSetDirigido()[1]);
		}
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		this.network = new Network(this.appRef.current, data, options);
	}
	handleRecorrer=()=>{

	}
	handleBusqueda=()=>{

	}

	handleAdd = () => {
		let esentero = true;
		let entero = parseInt(this.state.text); 
		if(isNaN(entero)){
			esentero=false;
		}
		if(esentero==true){
			grafo.Insertar(parseInt(this.state.text),[]);
		}else{
			grafo.Insertar(this.state.text,[]);
		}
		if(this.state.opcion=="No Dirigido"){
			getNodes = new DataSet(grafo.getDataSetNoDirigido()[0]);
			getEdges = new DataSet(grafo.getDataSetNoDirigido()[1]);
		}else if(this.state.opcion=="Dirigido"){
			getNodes = new DataSet(grafo.getDataSetDirigido()[0]);
			getEdges = new DataSet(grafo.getDataSetDirigido()[1]);
		}
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		this.network = new Network(this.appRef.current, data, options);
	}
	handleLista=()=>{
		getNodes2 = new DataSet(grafo.getDataSetLista()[0]);
		getEdges2 = new DataSet(grafo.getDataSetLista()[1]);
		data2 = {
			nodes: getNodes2,
			edges: getEdges2
		}
		this.network = new Network(this.appRef2.current, data2, options2);
	}
	handleMatriz=()=>{
		getNodes2 = new DataSet(grafo.getDataSetMatriz()[0]);
		getEdges2 = new DataSet(grafo.getDataSetMatriz()[1]);
		data2 = {
			nodes: getNodes2,
			edges: getEdges2
		}
		this.network = new Network(this.appRef2.current, data2, options2);
	}

	handleDelete = () => {
		let esentero = true;
		let entero = parseInt(this.state.text); 
		if(isNaN(entero)){
			esentero=false;
		}
		if(esentero==true){
			grafo.Eliminar(parseInt(this.state.text));
		}else{
			grafo.Eliminar(this.state.text);
		}
		if(this.state.opcion=="No Dirigido"){
			getNodes = new DataSet(grafo.getDataSetNoDirigido()[0]);
			getEdges = new DataSet(grafo.getDataSetNoDirigido()[1]);
		}else if(this.state.opcion=="Dirigido"){
			getNodes = new DataSet(grafo.getDataSetDirigido()[0]);
			getEdges = new DataSet(grafo.getDataSetDirigido()[1]);
		}
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		this.network = new Network(this.appRef.current, data, options);
	}

	handleUpdate = () => {
		grafo.Actualizar(this.state.text,this.state.actualizar);
		if(this.state.opcion=="No Dirigido"){
			getNodes = new DataSet(grafo.getDataSetNoDirigido()[0]);
			getEdges = new DataSet(grafo.getDataSetNoDirigido()[1]);
		}else if(this.state.opcion=="Dirigido"){
			getNodes = new DataSet(grafo.getDataSetDirigido()[0]);
			getEdges = new DataSet(grafo.getDataSetDirigido()[1]);
		}
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		this.network = new Network(this.appRef.current, data, options);
	}

	handleSearch = () => {
		let indice=grafo.Buscar(this.state.text);
		if(indice!=-1){
			if(this.state.opcion=="No Dirigido"){
				getNodes = new DataSet(grafo.getDataSetNoDirigido()[0]);
				getEdges = new DataSet(grafo.getDataSetNoDirigido()[1]);
			}else if(this.state.opcion=="Dirigido"){
				getNodes = new DataSet(grafo.getDataSetDirigido()[0]);
				getEdges = new DataSet(grafo.getDataSetDirigido()[1]);
			}
			getEdges.add({from: parseInt(indice), to: parseInt(indice),color:{color:'#ff383f'}});
		}
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		this.network = new Network(this.appRef.current, data, options);
	}

	handleOpenFile = () => {
		let paraarreglo=[]
		const dataJson = JSON.parse(this.state.fileContent);
		//let nombre = "Estructura Compuesta";
		if (dataJson.categoria == "Estructura No Lineal"){
			for (var i=0; i < dataJson.valores.length; i++) {
				let aristas=[];
				if(dataJson.valores[i].aristas.length!=0){
					for(let j=0; j<dataJson.valores[i].aristas.length; j++){
						console.log("Aqui1 "+dataJson.valores[i].aristas[j].arista);
						console.log("Aqui2 "+dataJson.valores[i].aristas[j].distancia);
						let aux1=dataJson.valores[i].aristas[j].arista;
						let aux2=dataJson.valores[i].aristas[j].distancia;
						aristas.push([aux1,aux2]);
					}
				}
				grafo.Insertar(dataJson.valores[i].vertice,aristas);
			}
			if(dataJson.nombre=="Grafo Dirigido"){
				getNodes = new DataSet(grafo.getDataSetDirigido()[0]);
				getEdges = new DataSet(grafo.getDataSetDirigido()[1]);
			}else{
				getNodes = new DataSet(grafo.getDataSetNoDirigido()[0]);
				getEdges = new DataSet(grafo.getDataSetNoDirigido()[1]);
			}
			if(dataJson.almacenamiento=="Matriz"){
				getNodes2 = new DataSet(grafo.getDataSetMatriz()[0]);
				getEdges2 = new DataSet(grafo.getDataSetMatriz()[1]);
			}else{
				getNodes2 = new DataSet(grafo.getDataSetLista()[0]);
				getEdges2 = new DataSet(grafo.getDataSetLista()[1]);
			}
			data = {
				nodes: getNodes,
				edges: getEdges
			}
			data2 = {
				nodes: getNodes2,
				edges: getEdges2
			}
			this.network = new Network(this.appRef.current, data, options);
			this.network = new Network(this.appRef2.current, data2, options2);
		}else {

			alert("No es un Archivo de ESTRUCTURA COMPUESTA O DE COLUMN MAJOR!! ")
		}
	}

	handleSaveFileMatriz = () => {
		const element = document.createElement("a");
		var contenido = grafo.generateJSONMatriz(this.state.opcion);
		const blob = new Blob([contenido]);                   
		element.href = URL.createObjectURL(blob);
	    element.download = "Grafo.json";
	    document.body.appendChild(element);
	    element.click();
	    alert("Documento Creado!")
	}
	handleSaveFileLista = () => {
		const element = document.createElement("a");
		var contenido = grafo.generateJSONFila(this.state.opcion);
		const blob = new Blob([contenido]);                   
		element.href = URL.createObjectURL(blob);
	    element.download = "Grafo.json";
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
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<input type="minimo" name="origen" className="form-control" placeholder="Ingresar Origen" id="InputFilas" value={this.state.origen} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<input type="maximo" name="donde" className="form-control" placeholder="Ingresar Hacia Donde" id="InputColumnas" value={this.state.donde} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<input type="maximo" name="distancia" className="form-control" placeholder="Ingresar Distancia" id="InputColumnas" value={this.state.distancia} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-3" style={{marginLeft: 2 + 'em'}}>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAgregarArista()}>Agregar Arista</button>
				</div>
				<div className="col-md-2">
					<button type="button" className="btn btn-primary" onClick={() => this.handleLista()}>Generar Lista</button>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<table className="table table-hover"></table>
				</div>
			</div>
			<div className="row">
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="text" className="form-control" placeholder="Ingresar Dato" id="InputCola" value={this.state.text} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="actualizar" className="form-control" placeholder="Ingresar Dato a Actualizar" id="InputCola" value={this.state.actualizar} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<select type="opcion" name="opcion" className="form-select" onChange={this.handleInputChange}>
        				<option value="No Dirigido">No Dirigido</option>
        				<option value="Dirigido">Dirigido</option>
      				</select>
      			</div>
				<div className="col-md-3">
					<input className="form-control" type="file" onChange={this.handleFileChange} ></input>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<button type="button" className="btn btn-primary" onClick={() => this.handleMatriz()}>Generar Matriz</button>
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
					<button type="button" className="btn btn-primary" onClick={() => this.handleAdd()}>Agregar Vertice</button>
				</div>
				<div className="col-md-2">
					<button type="button" className="btn btn-danger" onClick={() => this.handleDelete()} >Eliminar Vertice</button>
				</div>
				<div className="col-md-2">
					<button type="button" className="btn btn-warning" onClick={() => this.handleSearch()}>Buscar Vertice</button>
				</div>
				<div className="col-md-2">
					<button type="button" className="btn btn-danger" onClick={() => this.handleUpdate()} >Actualizar Vertice</button>
				</div>				
				<div className="col-md-1" style={{marginLeft: 1 + 'em'}}>
					<button type="button" class="btn btn-dark" onClick={() => this.handleOpenFile()}>Leer</button>
				</div>
				<div className="col-md-1">
					<button type="button" class="btn btn-success" onClick={() => this.handleSaveFileMatriz()}>Guardar Matriz</button>
				</div>
				<div className="col-md-1">
					<button type="button" class="btn btn-success" onClick={() => this.handleSaveFileLista()}>Guardar Lista</button>
				</div>
				
			</div>
			<div className="row">
				<div className="col-md-12">
					<table className="table table-hover"></table>
				</div>
			</div>
			<div className="row">
				<div className="col-md-2" style={{marginLeft: 2 + 'em'}}>
					<button type="button" class="btn btn-success" onClick={() => this.handleRecorrer()}>Recorrer</button>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="inicio" className="form-control" placeholder="Ingresar Inicio" id="InputCola" value={this.state.inicio} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="fin" className="form-control" placeholder="Ingresar Fin" id="InputCola" value={this.state.fin} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="buscar" className="form-control" placeholder="Ingresar Dato" id="InputCola" value={this.state.buscar} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-2" style={{marginLeft: 2 + 'em'}}>
					<button type="button" class="btn btn-success" onClick={() => this.handleBusqueda()}>Busqueda</button>
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
			<div style={{height: 30 + 'em'}} ref={this.appRef2} />
		</>

	  );
	}
  }
  
  export default GrafoAnchura;