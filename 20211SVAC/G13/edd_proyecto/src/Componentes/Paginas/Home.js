import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

export default function Home(){
	return (
		<>	
			<table className="table table-hover">
  				<thead>
  				  <tr>
  				  	<th scope="col"></th>
  				  	<th scope="col"></th>
  				  	<th scope="col"></th>
  				  	<th scope="col"></th>
  				  	<th scope="col"></th>
  				  	<th scope="col"></th>
  				  	<th scope="col"></th>
  				  	<th scope="col"></th>
  				    <th scope="col">
  				    	<div className="card border-light mb-3">
  							<div className="card-body"><div className="page-header"><h1>Indice de Estructura de Datos</h1></div></div>
  							<div className="card-body">
  							  <ul>
        	  					<li><h4>Estuctura Lineales</h4></li>
        	  					<ul>
        	  					  <li><a href="./Listasimplementeenlazada"><h5>Lista simplemente enlazada</h5></a></li>
        	  					  <li><a href="./Listadoblementeenlazada"><h5>Lista doblemente enlazada</h5></a></li>
        	  					  <li><a href="./Listacircularsimplementeenlazada"><h5>Lista circular simplemente enlazada</h5></a></li>
        	  					  <li><a href="./Listacirculardoblementeenlazada"><h5>Lista circular doblemente enlazada</h5></a></li>
        	  					  <li><a href="./Pila"><h5>Pila</h5></a></li>
        	  					  <li><a href="./Cola"><h5>Cola</h5></a></li>
        	  					  <li><a href="./Colaprioridad"><h5>Cola de prioridad</h5></a></li>  
        	  					</ul>
        	  					<li><h4>Ordenamientos</h4></li>
        	  					<ul>
        	  					  <li><a href="./Burbuja"><h5>Burbuja</h5></a></li>
        	  					  <li><a href="./Seleccion"><h5>Selección</h5></a></li>
        	  					  <li><a href="./Insercion"><h5>Inserción</h5></a></li>
        	  					  <li><a href="./Rapido"><h5>Rápido</h5></a></li>  
        	  					</ul>
        	  					<li><h4>Estructuras Árboreas</h4></li>
        	  					<ul>
        	  					  <li><a href="./ArbolBinario"><h5>Árbol binario de búsqueda</h5></a></li>
        	  					  <li><a href="./AVL"><h5>AVL</h5></a></li>
        	  					  <li><a href="./ArbolB"><h5>Árbol B</h5></a></li>
        	  					  <li><a href="./ArbolBPlus"><h5>Árbol B+</h5></a></li>
        	  					  <li><a href="./ArbolMerkle"><h5>Árbol de Merkle</h5></a></li>  
        	  					</ul>
        					  </ul>
  							</div>
        				</div>
  				    </th>
  				    <th scope="col"></th>
  				    <th scope="col"></th>
  				    <th scope="col"></th>
  				  	<th scope="col"></th>
  				  	<th scope="col"></th>
  				  	<th scope="col"></th>
  				  	<th scope="col"></th>
  				  	<th scope="col"></th>
  				  </tr>
  				</thead>
			</table>
			
		</>
	);
}