import React, {useState} from 'react';
import AnimacionListaSE from './Animaciones/AnimacionListaSE';
const ListaSimple = require('./Modelo/Lineales/ListaSimple/ListaSimple.js');
var ListaS = new ListaSimple();

		

export default function ListaSE(){
	const [valor,setValor] = useState("");
	const [rango,setRango] = useState("1");

	const [datos, setDatos] = useState({
        text: '',
		dato_actualizado: '',
    })

	// var ListaS = new ListaSimple();
	const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }
	const agregar = () =>{
		console.log("------------")
		ListaS.mostrar()
		console.log("Agregando " + datos.text)
		ListaS.insertar(datos.text)
		ListaS.mostrar()
	}

	const eliminar = () =>{
		ListaS.eliminar(datos.text)
		ListaS.mostrar()
	}

	const insertarInicio = () =>{
		ListaS.insertar_inicio(datos.text)
		ListaS.mostrar()
	}
	const insertarFin = () =>{
		ListaS.insertar_ultimo(datos.text)
		ListaS.mostrar()
	}
	const actualizar = () =>{
		ListaS.update(datos.text, datos.dato_actualizado)
		ListaS.mostrar()
	}
	const buscar = () =>{
		ListaS.search(datos.text)
		ListaS.mostrar()
	}


	

	return (
		<>
			<div className="row">
				<div className="col-md-12">
					<table className="table table-hover"></table>
				</div>
			</div>
			<div className="row">
				<div className="col-md-1" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="text" className="form-control" placeholder="Dato" id="InputCola" onChange={handleInputChange}></input>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-primary" onClick={()=>{agregar()}}>Agregar</button>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-primary" onClick={()=>{insertarInicio()}}>Inicio</button>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-primary" onClick={()=>{insertarFin()}}>Fin</button>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-danger" onClick={()=>{eliminar()}}>Eliminar</button>
				</div>
				<div className="col-md-2" style={{marginLeft: 1 + 'em'}}>
					<input type="text" name="dato_actualizado" className="form-control" placeholder="Dato a Actualizar" id="InputCola" onChange={handleInputChange}></input>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-warning" onClick={()=>{actualizar()}}>Actualizar</button>
				</div>
				<div className="col-md-1" style={{marginLeft: 1 + 'em'}}>
					<button type="button" className="btn btn-dark" onClick={()=>{buscar()}}>Buscar</button>
				</div>
				<div className="col-md-1">
					<input className="form-control" type="file" id="formFile"></input>
				</div>
				<div className="col-md-1">
					<button type="button" class="btn btn-success">Guardar</button>
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
					<input type="range" className="form-range" min="1" max="10" step="1" defaultValue="1" name="RangoCola" onChange={(e) => setRango(e.target.value)}></input>
				</div>
				<div className="col-md-3" style={{marginLeft: 1 + 'em'}}>
					<h5>Velocidad: x{rango}</h5>
				</div>
			</div>
			<div className="row">
			</div>
				<AnimacionListaSE />
		</>
	);
}