import React, {Component, createRef} from 'react';
import { DataSet, Network } from 'vis';

import HashAbierta from './Modelo/NoLineal/HashAbierta'; // Importar la Estructura Lista Simple.
var tablahash = new HashAbierta(5,30,80);
var getNodes = new DataSet([]);  // Se Crean los Nodos.
var getEdges = new DataSet([]);	// Se Crean los apuntadores.
var filePath;

var data = {
	nodes: getNodes,
	edge: getEdges
}

var options = {
	nodes:{
        borderWidth: 30,
        shape: "box",
        color: {
            background: '#FEFEFE',
            border:  '#FFF300',
            highlight: {
                border: '#00F3B8',
                background: '#FF1F00'
            }
        }
    },
    layout:{
    			hierarchical: {
    			  direction: "DU",
    			  sortMethod: "directed",
    			},
  	},
  };


class TablaHashAbierta extends Component {

	constructor(props) {
		super(props);
		this.state = {
			opcion: 'Simple',
			tamanio: '',
			minimo: '',
			maximo: '',
			text: '',
			dato_actualizado: '',
			fileName: '',
			fileContent: '',
		};
		this.network = {};
		//this.tablahash;
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

	handleGenerate = () => {
		tablahash.set_m(parseInt(this.state.tamanio));
		tablahash.set_min(parseInt(this.state.minimo));
		tablahash.set_max(parseInt(this.state.maximo));
		tablahash.InicializarArreglo();
		let numero = 2
		console.log(typeof numero);
		console.log("Generado");
	}

	handleAdd = () => {
		let esentero = true;
		let entero = parseInt(this.state.text); 
		if(isNaN(entero)){
			esentero=false;
		}
		if(this.state.opcion=="Simple"){
			if(esentero==true){
				tablahash.InsertarSimple(parseInt(this.state.text));
			}else{
				tablahash.InsertarSimple(this.state.text);
			}
			getNodes = new DataSet(tablahash.setDataSet()[0]);
			getEdges = new DataSet(tablahash.setDataSet()[1]);
		}else if(this.state.opcion=="Division"){
			if(esentero==true){
				tablahash.InsertarDivision(parseInt(this.state.text));
			}else{
				tablahash.InsertarDivision(this.state.text);
			}
			getNodes = new DataSet(tablahash.setDataSet()[0]);
			getEdges = new DataSet(tablahash.setDataSet()[1]);
			console.log("Div");
		}else if(this.state.opcion=="Multiplicacion"){
			if(esentero==true){
				tablahash.InsertarMultiplicacion(parseInt(this.state.text));
			}else{
				tablahash.InsertarMultiplicacion(this.state.text);
			}
			getNodes = new DataSet(tablahash.setDataSet()[0]);
			getEdges = new DataSet(tablahash.setDataSet()[1]);
			console.log("Mult");
		}
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		console.log(getNodes);
		console.log(getEdges);
		this.network = new Network(this.appRef.current, data, options);
	}

	handleDelete = () => {
		let esentero = true;
		let entero = parseInt(this.state.text); 
		if(isNaN(entero)){
			esentero=false;
		}
		if(this.state.opcion=="Simple"){
			if(esentero==true){
				tablahash.EliminarSimple(parseInt(this.state.text));
			}else{
				tablahash.EliminarSimple(this.state.text);
			}
			getNodes = new DataSet(tablahash.setDataSet()[0]);
			getEdges = new DataSet(tablahash.setDataSet()[1]);
		}else if(this.state.opcion=="Division"){
			if(esentero==true){
				tablahash.EliminarDivision(parseInt(this.state.text));
			}else{
				tablahash.EliminarDivision(this.state.text);
			}
			getNodes = new DataSet(tablahash.setDataSet()[0]);
			getEdges = new DataSet(tablahash.setDataSet()[1]);
			console.log("Div");
		}else if(this.state.opcion=="Multiplicacion"){
			if(esentero==true){
				tablahash.EliminarMultiplicacion(parseInt(this.state.text));
			}else{
				tablahash.EliminarMultiplicacion(this.state.text);
			}
			getNodes = new DataSet(tablahash.setDataSet()[0]);
			getEdges = new DataSet(tablahash.setDataSet()[1]);
			console.log("Mult");
		}
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		console.log(getNodes);
		console.log(getEdges);
		this.network = new Network(this.appRef.current, data, options);
	}

	handleUpdate = () => {
		let esentero = true;
		let entero = parseInt(this.state.text); 
		if(isNaN(entero)){
			esentero=false;
		}
		let esentero2 = true;
		let entero2 = parseInt(this.state.dato_actualizado); 
		if(isNaN(entero2)){
			esentero2=false;
		}
		if(this.state.opcion=="Simple"){
			if(esentero==true){
				if(esentero2==true){
					tablahash.Actualizar(parseInt(this.state.text),parseInt(this.state.dato_actualizado),"Simple");
				}else{
					tablahash.Actualizar(parseInt(this.state.text),this.state.dato_actualizado,"Simple");
				}
			}else{
				if(esentero2==true){
					tablahash.Actualizar(this.state.text,parseInt(this.state.dato_actualizado),"Simple");
				}else{
					tablahash.Actualizar(this.state.text,this.state.dato_actualizado,"Simple");
				}
			}
			tablahash.Actualizar(this.state.text,this.state.dato_actualizado,"Simple");
			getNodes = new DataSet(tablahash.setDataSet()[0]);
			getEdges = new DataSet(tablahash.setDataSet()[1]);
		}else if(this.state.opcion=="Division"){
			if(esentero==true){
				if(esentero2==true){
					tablahash.Actualizar(parseInt(this.state.text),parseInt(this.state.dato_actualizado),"Division");
				}else{
					console.log("DIVIVIIVIVIVI");
					tablahash.Actualizar(parseInt(this.state.text),this.state.dato_actualizado,"Division");
				}
			}else{
				if(esentero2==true){
					tablahash.Actualizar(this.state.text,parseInt(this.state.dato_actualizado),"Division");
				}else{
					tablahash.Actualizar(this.state.text,this.state.dato_actualizado,"Division");
				}
			}
			getNodes = new DataSet(tablahash.setDataSet()[0]);
			getEdges = new DataSet(tablahash.setDataSet()[1]);
		}else if(this.state.opcion=="Multiplicacion"){
			if(esentero==true){
				if(esentero2==true){
					tablahash.Actualizar(parseInt(this.state.text),parseInt(this.state.dato_actualizado),"Multiplicacion");
				}else{
					tablahash.Actualizar(parseInt(this.state.text),this.state.dato_actualizado,"Multiplicacion");
				}
			}else{
				if(esentero2==true){
					tablahash.Actualizar(this.state.text,parseInt(this.state.dato_actualizado),"Multiplicacion");
				}else{
					tablahash.Actualizar(this.state.text,this.state.dato_actualizado,"Multiplicacion");
				}
			}
			getNodes = new DataSet(tablahash.setDataSet()[0]);
			getEdges = new DataSet(tablahash.setDataSet()[1]);
		}
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		console.log(getNodes);
		console.log(getEdges);
		this.network = new Network(this.appRef.current, data, options);
	}

	handleSearch = () => {
		let esentero = true;
		let entero = parseInt(this.state.text); 
		if(isNaN(entero)){
			esentero=false;
		}
		if(this.state.opcion=="Simple"){
			if(esentero==true){
				tablahash.BuscarSimple(parseInt(this.state.text));
			}else{
				tablahash.BuscarSimple(this.state.text);
			}
			getNodes = new DataSet(tablahash.setDataSet()[0]);
			getEdges = new DataSet(tablahash.setDataSet()[1]);
		}else if(this.state.opcion=="Division"){
			if(esentero==true){
				tablahash.BuscarDivision(parseInt(this.state.text));
			}else{
				tablahash.BuscarDivision(this.state.text);
			}
			getNodes = new DataSet(tablahash.setDataSet()[0]);
			getEdges = new DataSet(tablahash.setDataSet()[1]);
		}else if(this.state.opcion=="Multiplicacion"){
			if(esentero==true){
				tablahash.BuscarMultiplicacion(parseInt(this.state.text));
			}else{
				tablahash.BuscarMultiplicacion(this.state.text);
			}
			getNodes = new DataSet(tablahash.setDataSet()[0]);
			getEdges = new DataSet(tablahash.setDataSet()[1]);
		}
		data = {
			nodes: getNodes,
			edges: getEdges
		}
		console.log(getNodes);
		console.log(getEdges);
		this.network = new Network(this.appRef.current, data, options);
	}

	handleOpenFile = () => {
		let paraarreglo=[]
		const dataJson = JSON.parse(this.state.fileContent);
		//let nombre = "Lista Simplemente/doblemente/circular simplemente/circular doblemente Enlazada"
		if (dataJson.categoria == "Estructura No Lineal"){

			tablahash.set_m(parseInt(dataJson.m));
			tablahash.set_min(parseInt(dataJson.minimo));
			tablahash.set_max(parseInt(dataJson.maximo));
			tablahash.InicializarArreglo();
			for (var i=0; i < dataJson.valores.length; i++) {
				if(dataJson.funcion=="Simple"){
					console.log(dataJson.valores[i]);
					tablahash.InsertarSimple(dataJson.valores[i].toString())
				}else if(dataJson.funcion=="Division"){
					console.log(dataJson.valores[i]);
					tablahash.InsertarDivision(dataJson.valores[i].toString())
				}else if(dataJson.funcion=="Multiplicacion"){
					console.log(dataJson.valores[i]);
					tablahash.InsertarMultiplicacion(dataJson.valores[i].toString())
				}

			}
			getNodes = new DataSet(tablahash.setDataSet()[0]);
			getEdges = new DataSet(tablahash.setDataSet()[1]);
			data = {
				nodes: getNodes,
				edges: getEdges
			}
			
			this.network = new Network(this.appRef.current, data, options);


		}else {

			alert("No es un Archivo de ESTRUCTURA NO LINEAL!! ")
		}
	
	}

	handleSaveFile = () => {

		//listaSimple.generateJSON(listaSimple)
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
				<div className="col-md-3" style={{marginLeft: 1 + 'em'}}>
					<input type="tamanio" name="tamanio" className="form-control" placeholder="Ingresar Tamaño Tabla" id="InputTamanio" value={this.state.tamanio} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-3" style={{marginLeft: 1 + 'em'}}>
					<input type="minimo" name="minimo" className="form-control" placeholder="Ingresar Minimo" id="InputMinimo" value={this.state.minimo} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-3" style={{marginLeft: 1 + 'em'}}>
					<input type="maximo" name="maximo" className="form-control" placeholder="Ingresar Maximo" id="InputMaximo" value={this.state.maximo} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-2" style={{marginLeft: 2 + 'em'}}>
					<button type="button" className="btn btn-primary" onClick={() => this.handleGenerate()}>Generar Tabla</button>
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
				<div className="col-md-3">
					<select type="opcion" name="opcion" className="form-select" onChange={this.handleInputChange}>
        				<option value="Simple">Simple</option>
        				<option value="Division">Division</option>
        				<option value="Multiplicacion">Multiplicacion</option>
      				</select>
      			</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="dato_actualizado" className="form-control" placeholder="Dato a Actualizar" id="InputCola" value={this.state.dato_actualizado} onChange={this.handleInputChange} ></input>
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
					<button type="button" className="btn btn-warning" onClick={() => this.handleUpdate()}>Actualizar Dato</button>
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
			<div style={{height: 28 + 'em'}} ref={this.appRef} />
		</>

	  );
	}
  }
  
  export default TablaHashAbierta;