//Pagina para graficar Hamming
import React from 'react'

import ColMajor from '../../Estructuras/compuesta/ColMajor'
import RowMajor from '../../Estructuras/compuesta/RowMajor'

import Funcion from '../../Estructuras/Funciones'

import '../styles/Grafica.css'

class pRCMajor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salida: "",
            velocidad: 5,
            path: this.props.location.pathname,
        }
        this.major = null
      }
    
    handleEntrada = e => {
        this.setState({ entrada: e.target.value })
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
            this.major = this.setMajor(json.m[0], json.m[1])
            var aux = this.major.cargar(json.valores)
            document.getElementById("Resultado").value = aux
        }
        reader.readAsText(files[0])
    }

    handleClick = e => {
        const id = e.target.id
        if(id === "Guardar"){
            var output = this.major.guardar()
            Funcion(output.nombre, output.text)
        }
        
    }

    setMajor = (row, col) => {
        if(this.state.path.includes("ColMajor")) return new ColMajor(row, col)
        
        else if(this.state.path.includes("RowMajor")) return new RowMajor(row, col)
    }

    render(){
        return (
            <div>
                <nav className="Bar">
                    <table>
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
                    <textarea disabled cols="124" rows="31" placeholder="Resultado" id="Resultado" ></textarea>    
                </div>
                <nav className="Sub_bar">
                    <table>
                        <td>
                            <input type="range"  min="0" max="10" step="1"  onChange={this.handleVelocidad}
                            defaultValue={this.state.velocidad} width="100"/>
                        </td>
                    </table>
                </nav>
            </div>
        )
    }
}

export default pRCMajor