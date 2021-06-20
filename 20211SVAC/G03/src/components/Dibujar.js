import React, { Component } from 'react'
import GraficaListas from './GraficaListas'
import GraficaListaCircular from './GraficaListaCircular'
import GraficoOrdenamientos from './GraficoOrdenamientos'

export default class Dibujar extends Component {
  render() {
     if(this.props.nombre == "Lista circular simplemente enlazada" || this.props.nombre == "Lista circular doblemente enlazada"){
      return (
        <div>
            <GraficaListaCircular nombre={this.props.nombre} buscar={this.props.valorBusqueda} edd={this.props.estructura}/>
        </div>
      )
    
    }else if(this.props.nombre == "Ordenamiento Selección" ||
    this.props.nombre == "Ordenamiento Inserción" ||
    this.props.nombre == "Ordenamiento Burbuja" ||
    this.props.nombre == "Ordenamiento Rapido"){
      return(
        <div>
        <br/>
        <GraficoOrdenamientos arreglo={this.props.estructura}/> 
        </div>
      ) 
    }
    else{
      return (
        <div>
             <GraficaListas nombre={this.props.nombre}  buscar={this.props.valorBusqueda} edd={this.props.estructura}/> 
        </div>
      )
    } 
  }
}
