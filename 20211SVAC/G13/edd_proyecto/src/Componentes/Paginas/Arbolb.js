import React, {useState} from 'react';

export default function ArbolB(){
	const [valor,setValor] = useState("");
	const [rango,setRango] = useState("1");

	return (
		<>
			<div className="row">
				<div className="col-md-12">
					<table className="table table-hover"></table>
				</div>
			</div>
			<div className="row">
				<div className="col-md-3" style={{marginLeft: 2 + 'em'}}>
					<input type="text" className="form-control" placeholder="Ingrese Dato" id="InputCola"></input>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-primary">Agregar</button>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-danger">Eliminar</button>
				</div>
				<div className="col-md-1">
					<button type="button" className="btn btn-warning">Actualizar</button>
				</div>
				<div className="col-md-1" style={{marginLeft: 2 + 'em'}}>
					<button type="button" className="btn btn-dark">Buscar</button>
				</div>
				<div className="col-md-3">
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
		</>
	);
}