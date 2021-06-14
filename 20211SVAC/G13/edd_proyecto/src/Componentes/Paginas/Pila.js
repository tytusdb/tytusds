import React from 'react';

export default function Pila(){
	return (
		<>
			<div>
				<table className="table table-hover">
  					<thead>
  					  <tr>
  					    <th scope="col"> </th>
  					    <th scope="col">
  					    	<input type="text" className="form-control" placeholder="Ingrese Dato" id="InputListaSE"></input>
  					    </th>
  					    <th scope="col">
  					    	<button type="button" className="btn btn-primary">Agregar</button>
  					    </th>
  					    <th>
  					    	<button type="button" className="btn btn-danger">Eliminar</button>
  					    </th>
  					    <th>
  					    	<button type="button" className="btn btn-warning">Actualizar</button>
  					    </th>
  					    <th>
  					    	<button type="button" className="btn btn-dark">Buscar</button>
  					    </th>
  					    <th>
					      <input className="form-control" type="file" id="formFile"></input>
  					    </th>
  					    <th>
  					    	<button type="button" class="btn btn-success">Guardar</button>
  					    </th>	
  					  </tr>
  					</thead>
  				</table>
  				

			</div>
			<h1>Pila</h1>
		</>
	);
}