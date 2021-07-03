import React, {Component, createRef} from 'react';
import { DataSet, Network } from 'vis';
import EstructuraCompuesta from './Modelo/Compuesta/EstructuraCompuesta/Compuesta.js'; // Importar la Estructura Lista Simple.
var filePath;
var compuesta = new EstructuraCompuesta(); // Instancia de la compuesta.
var data, data2;
var options, options2;
class Compuesta extends Component {

	constructor(props) {
		super(props);
		this.state = {

			dato1: '',
			dato2: '',
			estructura1: '',
			estructura2: '',
			update1: '',
			update2: '',
			fileName: '',
			fileContent: '',
		};
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


	handleAdd = () => {
		
		compuesta.insertar(this.state.estructura1, this.state.estructura2, this.state.dato1, this.state.dato2);
		var getNodes = new DataSet(compuesta.getEstructuraPrimaria().setNodesDataSet());  // Se Crean los Nodos.
		var getEdges = new DataSet(compuesta.getEstructuraPrimaria().setEdgesDataSet());	// Se Crean los apuntadores.
		var getNodes2 = new DataSet(compuesta.getEstructuraSecundaria().setNodesDataSet());  // Se Crean los Nodos.
		var getEdges2 = new DataSet(compuesta.getEstructuraSecundaria().setEdgesDataSet());	// Se Crean los apuntadores.
		var data ={
			nodes: getNodes,
			edges: getEdges
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
		            border:  '#df77e7',
		            highlight: {
		                border: '#00F3B8',
		                background: '#FF1F00'
		            }
		        }
		    }
		};
		var data2 ={
			nodes: getNodes2,
			edges: getEdges2
		}

		var options2 = {
			physics: {
				stabilization: false,
				barnesHut: {
					springLength: 120,
				},
			},
			nodes:{
		        borderWidth: 20,
		        color: {
		            background: '#ffffff',
		            border:  '#ffef50',
		            highlight: {
		                border: '#00F3B8',
		                background: '#FF1F00'
		            }
		        }
		    }
		};
		
		this.network = new Network(this.appRef.current, data, options);
		this.network2 = new Network(this.appRef2.current, data2, options2);
	
		
	}

	handleDelete = () => {
		compuesta.eliminar(this.state.estructura1, this.state.estructura2, this.state.dato1, this.state.dato2);
		var getNodes = new DataSet(compuesta.getEstructuraPrimaria().setNodesDataSet());  // Se Crean los Nodos.
		var getEdges = new DataSet(compuesta.getEstructuraPrimaria().setEdgesDataSet());	// Se Crean los apuntadores.
		var getNodes2 = new DataSet(compuesta.getEstructuraSecundaria().setNodesDataSet());  // Se Crean los Nodos.
		var getEdges2 = new DataSet(compuesta.getEstructuraSecundaria().setEdgesDataSet());	// Se Crean los apuntadores.
		var data ={
			nodes: getNodes,
			edges: getEdges
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
		            border:  '#df77e7',
		            highlight: {
		                border: '#00F3B8',
		                background: '#FF1F00'
		            }
		        }
		    }
		};
		var data2 ={
			nodes: getNodes2,
			edges: getEdges2
		}

		var options2 = {
			physics: {
				stabilization: false,
				barnesHut: {
					springLength: 120,
				},
			},
			nodes:{
		        borderWidth: 20,
		        color: {
		            background: '#ffffff',
		            border:  '#ffef50',
		            highlight: {
		                border: '#00F3B8',
		                background: '#FF1F00'
		            }
		        }
		    }
		};
		
		this.network = new Network(this.appRef.current, data, options);
		this.network2 = new Network(this.appRef2.current, data2, options2);
	}

	handleUpdate = () => {
		compuesta.update(this.state.estructura1, this.state.estructura2, this.state.dato1, this.state.dato2, this.state.update1, this.state.update2);
		var getNodes = new DataSet(compuesta.getEstructuraPrimaria().setNodesDataSet());  // Se Crean los Nodos.
		var getEdges = new DataSet(compuesta.getEstructuraPrimaria().setEdgesDataSet());	// Se Crean los apuntadores.
		var getNodes2 = new DataSet(compuesta.getEstructuraSecundaria().setNodesDataSet());  // Se Crean los Nodos.
		var getEdges2 = new DataSet(compuesta.getEstructuraSecundaria().setEdgesDataSet());	// Se Crean los apuntadores.
		var data ={
			nodes: getNodes,
			edges: getEdges
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
		            border:  '#df77e7',
		            highlight: {
		                border: '#00F3B8',
		                background: '#FF1F00'
		            }
		        }
		    }
		};
		var data2 ={
			nodes: getNodes2,
			edges: getEdges2
		}

		var options2 = {
			physics: {
				stabilization: false,
				barnesHut: {
					springLength: 120,
				},
			},
			nodes:{
		        borderWidth: 20,
		        color: {
		            background: '#ffffff',
		            border:  '#ffef50',
		            highlight: {
		                border: '#00F3B8',
		                background: '#FF1F00'
		            }
		        }
		    }
		};
		
		this.network = new Network(this.appRef.current, data, options);
		this.network2 = new Network(this.appRef2.current, data2, options2);
	}

	handleSearch = () => {
		var {nodo1, nodo2} = compuesta.search(this.state.estructura1, this.state.estructura2, this.state.dato1, this.state.dato2)
		console.log("pero bueno")
		console.log(String(nodo1)+"->"+String(nodo2))
		if (0 <= parseInt(nodo1) || 0 <= parseInt(nodo2)){
			var getNodes = new DataSet(compuesta.getEstructuraPrimaria().setNodesDataSet());  // Se Crean los Nodos.
			var getEdges = new DataSet(compuesta.getEstructuraPrimaria().setEdgesDataSet());	// Se Crean los apuntadores.
			var getNodes2 = new DataSet(compuesta.getEstructuraSecundaria().setNodesDataSet());  // Se Crean los Nodos.
			var getEdges2 = new DataSet(compuesta.getEstructuraSecundaria().setEdgesDataSet());	// Se Crean los apuntadores.
			var data ={
				nodes: getNodes,
				edges: getEdges
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
			            border:  '#df77e7',
			            highlight: {
			                border: '#00F3B8',
			                background: '#FF1F00'
			            }
			        }
			    }
			};
			var data2 ={
				nodes: getNodes2,
				edges: getEdges2
			}

			var options2 = {
				physics: {
					stabilization: false,
					barnesHut: {
						springLength: 120,
					},
				},
				nodes:{
			        borderWidth: 20,
			        color: {
			            background: '#ffffff',
			            border:  '#ffef50',
			            highlight: {
			                border: '#00F3B8',
			                background: '#FF1F00'
			            }
			        }
			    }
			};
			
			getEdges.add({from: parseInt(nodo1), to: parseInt(nodo1), value:parseInt(nodo1),color:{color:'#ff383f'}});
			getEdges2.add({from: parseInt(nodo2), to: parseInt(nodo2), value:parseInt(nodo2),color:{color:'#ff383f'}});
			
		}else{
			var getNodes = new DataSet(compuesta.getEstructuraPrimaria().setNodesDataSet());  // Se Crean los Nodos.
			var getEdges = new DataSet(compuesta.getEstructuraPrimaria().setEdgesDataSet());	// Se Crean los apuntadores.
			var getNodes2 = new DataSet(compuesta.getEstructuraSecundaria().setNodesDataSet());  // Se Crean los Nodos.
			var getEdges2 = new DataSet(compuesta.getEstructuraSecundaria().setEdgesDataSet());	// Se Crean los apuntadores.
			var data ={
				nodes: getNodes,
				edges: getEdges
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
			            border:  '#df77e7',
			            highlight: {
			                border: '#00F3B8',
			                background: '#FF1F00'
			            }
			        }
			    }
			};
			var data2 ={
				nodes: getNodes2,
				edges: getEdges2
			}

			var options2 = {
				physics: {
					stabilization: false,
					barnesHut: {
						springLength: 120,
					},
				},
				nodes:{
			        borderWidth: 20,
			        color: {
			            background: '#ffffff',
			            border:  '#ffef50',
			            highlight: {
			                border: '#00F3B8',
			                background: '#FF1F00'
			            }
			        }
			    }
			};	


		}

		
		this.network = new Network(this.appRef.current, data, options);
		this.network2 = new Network(this.appRef2.current, data2, options2);
	}


	handleAddTop = () => {
		compuesta.insertar_inicio(this.state.estructura1, this.state.estructura2, this.state.dato1, this.state.dato2);
		var getNodes = new DataSet(compuesta.getEstructuraPrimaria().setNodesDataSet());  // Se Crean los Nodos.
		var getEdges = new DataSet(compuesta.getEstructuraPrimaria().setEdgesDataSet());	// Se Crean los apuntadores.
		var getNodes2 = new DataSet(compuesta.getEstructuraSecundaria().setNodesDataSet());  // Se Crean los Nodos.
		var getEdges2 = new DataSet(compuesta.getEstructuraSecundaria().setEdgesDataSet());	// Se Crean los apuntadores.
		var data ={
			nodes: getNodes,
			edges: getEdges
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
		            border:  '#df77e7',
		            highlight: {
		                border: '#00F3B8',
		                background: '#FF1F00'
		            }
		        }
		    }
		};
		var data2 ={
			nodes: getNodes2,
			edges: getEdges2
		}

		var options2 = {
			physics: {
				stabilization: false,
				barnesHut: {
					springLength: 120,
				},
			},
			nodes:{
		        borderWidth: 20,
		        color: {
		            background: '#ffffff',
		            border:  '#ffef50',
		            highlight: {
		                border: '#00F3B8',
		                background: '#FF1F00'
		            }
		        }
		    }
		};
		
		this.network = new Network(this.appRef.current, data, options);
		this.network2 = new Network(this.appRef2.current, data2, options2);
		
	}
	handleAddLower = () => {
		compuesta.insertar_ultimo(this.state.estructura1, this.state.estructura2, this.state.dato1, this.state.dato2);
		var getNodes = new DataSet(compuesta.getEstructuraPrimaria().setNodesDataSet());  // Se Crean los Nodos.
		var getEdges = new DataSet(compuesta.getEstructuraPrimaria().setEdgesDataSet());	// Se Crean los apuntadores.
		var getNodes2 = new DataSet(compuesta.getEstructuraSecundaria().setNodesDataSet());  // Se Crean los Nodos.
		var getEdges2 = new DataSet(compuesta.getEstructuraSecundaria().setEdgesDataSet());	// Se Crean los apuntadores.
		var data ={
			nodes: getNodes,
			edges: getEdges
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
		            border:  '#df77e7',
		            highlight: {
		                border: '#00F3B8',
		                background: '#FF1F00'
		            }
		        }
		    }
		};
		var data2 ={
			nodes: getNodes2,
			edges: getEdges2
		}

		var options2 = {
			physics: {
				stabilization: false,
				barnesHut: {
					springLength: 120,
				},
			},
			nodes:{
		        borderWidth: 20,
		        color: {
		            background: '#ffffff',
		            border:  '#ffef50',
		            highlight: {
		                border: '#00F3B8',
		                background: '#FF1F00'
		            }
		        }
		    }
		};
		
		this.network = new Network(this.appRef.current, data, options);
		this.network2 = new Network(this.appRef2.current, data2, options2);
	}

	handleOpenFile = () => {

		const dataJson = JSON.parse(this.state.fileContent);
		if (dataJson.categoria == "Estructura Compuesta"){
			dataJson.valores.forEach(element =>{		
				console.log(element.principal + "->"+element.secundario)
				compuesta.insertar(this.state.estructura1, this.state.estructura2, String(element.principal), String(element.secundario));
			});


			var getNodes = new DataSet(compuesta.getEstructuraPrimaria().setNodesDataSet());  // Se Crean los Nodos.
			var getEdges = new DataSet(compuesta.getEstructuraPrimaria().setEdgesDataSet());	// Se Crean los apuntadores.
			var getNodes2 = new DataSet(compuesta.getEstructuraSecundaria().setNodesDataSet());  // Se Crean los Nodos.
			var getEdges2 = new DataSet(compuesta.getEstructuraSecundaria().setEdgesDataSet());	// Se Crean los apuntadores.
			var data ={
				nodes: getNodes,
				edges: getEdges
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
			            border:  '#df77e7',
			            highlight: {
			                border: '#00F3B8',
			                background: '#FF1F00'
			            }
			        }
			    }
			};
			var data2 ={
				nodes: getNodes2,
				edges: getEdges2
			}

			var options2 = {
				physics: {
					stabilization: false,
					barnesHut: {
						springLength: 120,
					},
				},
				nodes:{
			        borderWidth: 20,
			        color: {
			            background: '#ffffff',
			            border:  '#ffef50',
			            highlight: {
			                border: '#00F3B8',
			                background: '#FF1F00'
			            }
			        }
			    }
			};
			
			this.network = new Network(this.appRef.current, data, options);
			this.network2 = new Network(this.appRef2.current, data2, options2);


		}else {

			alert("No es un Archivo de ESTRUCTURA LINEAL!! ")
		}
	
	}

	handleSaveFile = () => {
		// compuesta.generateJSON(compuesta)
		console.log("Guardar :c")
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
					<input type="text" name="estructura1" className="form-control" placeholder="Estructura 1" id="InputCola" value={this.state.estructura1} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-1" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="dato1" className="form-control" placeholder="Dato 1" id="InputCola" value={this.state.dato1} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-primary" onClick={() => this.handleAdd()}>Agregar</button>
				</div>

				<div className="col-md-1">
					<button type="button" className="btn btn-danger" onClick={() => this.handleDelete()} >Eliminar</button>
				</div>
				<div className="col-md-1">
					<input type="text" name="update1" className="form-control" placeholder="Update 1" id="InputCola" value={this.state.update1} onChange={this.handleInputChange} ></input>
				</div>
				<div className="col-md-2">
					<button type="button" className="btn btn-warning" onClick={() => this.handleUpdate()}>Actualizar Dato</button>
				</div>
				<div className="col-md-2">
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
					<input type="text" name="estructura2" className="form-control" placeholder="Estructura 2" id="InputCola" value={this.state.estructura2} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-1" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="dato2" className="form-control" placeholder="Dato 2" id="InputCola" value={this.state.dato2} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-primary" onClick={() => this.handleAddTop()}>Inicio</button>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-primary" onClick={() => this.handleAddLower()}>Final</button>
				</div>
				<div className="col-md-1">
					<input type="text" name="update2" className="form-control" placeholder="Update 2" id="InputCola" value={this.state.update2} onChange={this.handleInputChange}></input>
				</div>
				<div className="col-md-2">
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
			
			
			<div style={{height: 20 + 'em'}} ref={this.appRef} />
			<div style={{height: 20 + 'em'}} ref={this.appRef2} />
			{/*<tr>
				<td><div style={{height: 30 + 'em'}} ref={this.appRef} /></td>
				<td><div style={{height: 30 + 'em'}} ref={this.appRef2} /></td>
			</tr>*/}
		
		</>

	  );
	}
  }
  
  export default Compuesta;