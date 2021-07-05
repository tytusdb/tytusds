import React, {useState} from 'react';

export default function Rapido(){
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
				<div className="col-md-6" style={{marginLeft: 2 + 'em'}}>
					<input className="form-control" type="file" id="formFile"></input>
				</div>
				<div className="col-md-1">
				</div>
				<div className="col-md-2" style={{marginLeft: 2 + 'em'}}>
					<button type="button" className="btn btn-primary">Ordenar</button>
				</div>
				<div className="col-md-2" style={{marginRight: 2 + 'em'}}>
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