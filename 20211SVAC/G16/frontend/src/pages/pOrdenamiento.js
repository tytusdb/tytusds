//Pagina para graficar Ordenamientos
import React from 'react';

import Rapido from '../Estructuras/ordenamiento/Rapido'
import Seleccion from '../Estructuras/ordenamiento/Seleccion'
import Burbuja from '../Estructuras/ordenamiento/Burbuja'
import Insercion from '../Estructuras/ordenamiento/Insercion'
import ordena from '../animaciones/gOrder'

import Funciones from '../Estructuras/Funciones'

import './styles/Grafica.css'

class pOrdenamiento extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          tipo: "Burbuja",
          velocidad: 5,
        }
        this.vector = this.setvector(this.state.tipo)
    }

    handleTipo = e => {
        this.setState({ tipo: e.target.value })
    }

    handleVelocidad = e => {
        this.setState({ velocidad: e.target.value })
    }

    handleFiles = e => {
        let files = e.target.files
        let reader = new FileReader()
        reader.onload = e =>{
            const json = JSON.parse(e.target.result)
            this.setState({ velocidad: json.animaicon })
            this.vector.cargar(json.valores)
        }
        reader.readAsText(files[0])
    }

    handleClick = e => {
        const id = e.target.id
        if(id === "Guardar"){
            var output = this.vector.guardar()
            Funciones(output.nombre, output.text)
        }
        else if(id === "Ordenar") this.vector.ordenar()
        else if(id === "Nuevo") this.vector = this.setvector(this.state.tipo)
    }

    setvector = tipo => {
        if(tipo === "Selección") return new Seleccion()
        
        else if(tipo === "Rápido") return new Rapido()

        else if(tipo === "Burbuja") return new Burbuja()

        else if(tipo === "Inserción") return new Insercion()
    }

    render(){
        return (
            <div>
                <nav className="Bar">
                    <table>
                        <td>
                            <button className="btn Boton" id="Ordenar"
                                onClick={this.handleClick}> Ordenar
                            </button>
                        </td>
                        <td>
                            <button className="btn btn-success" id="Guardar"
                                onClick={this.handleClick}> Guardar
                            </button>
                        </td>
                        <td>
                            <input type="file" multiple={false} accept=".json" 
                                onChange={this.handleFiles} />
                        </td>
                    </table>
                </nav>
                <div>
                    {ordena()}
                </div>
                <nav className="Sub_bar">
                    <table>
                        <td>
                            <input type="range"  min="0" max="10" step="1" onChange={this.handleVelocidad}
                                defaultValue={this.state.velocidad} width="100"/>
                        </td>
                        <td>
                            <select multiple=""
                                onChange={this.handleTipo}>
                                <option>Burbuja</option>
                                <option>Selección</option>
                                <option>Inserción</option>
                                <option>Rápido</option>
                            </select>
                        </td>
                        <td>
                            <button className="btn btn-danger" id="Nuevo"
                                onClick={this.handleClick}> Nuevo
                            </button>
                        </td>
                    </table>
                </nav>
            </div>
        )
    }

}

export default pOrdenamiento