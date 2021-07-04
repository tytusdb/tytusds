//Pagina para graficar Hamming
import React from 'react'

import Feistel from '../../Estructuras/codificacion/Feistel'

import Descarga from '../../Estructuras/DescargaTXT'

import '../styles/Grafica.css'

class pFeistel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            entrada: "",
            llave: "",
            iteraciones: 1,
            salida: "",
            velocidad: 5
        }
        this.feistel= new Feistel()
      }
    
    handleEntrada = e => {
        this.setState({ entrada: e.target.value })
    }

    handleLlave = e => {
        this.setState({ llave: e.target.value })
    }

    handleIteracion = e => {
        this.setState({ iteraciones: parseInt(e.target.value)})
    }

    handleVelocidad = e => {
        this.setState({ velocidad: e.target.value })
    }

    handleFiles = e => {
        let files = e.target.files
        let reader = new FileReader()
        reader.onload = e =>{
            var aux = e.target.result
            aux = aux.substring(0, aux.length-1)
            this.setState({ entrada: aux })
            document.getElementById("Entrada").value = (e.target.result).toString()
        }
        reader.readAsText(files[0])
    }

    handleClick = e => {
        const id = e.target.id
        if(this.state.entrada === "" && this.state.key === "" && this.state.iteraciones < 1 && id === "Calcular") alert("Ingrese una frase")

        else{
            if(id === "Calcular"){ 
                var salida = this.feistel.calcular(this.state.entrada, this.state.llave, this.state.iteraciones)
                this.setState({ salida: salida })
                document.getElementById("Resultado").value = salida
            }
            
            else if(id === "Guardar"){
                var output = this.feistel.guardar()
                Descarga(output.nombre, output.text)
            }
        }
    }

    render(){
        return (
            <div>
                <nav className="Bar">
                    <table>
                        <td>
                            <input type="number"  min="1" placeholder="Iteraciones" 
                            onChange={this.handleIteracion}/>
                        </td>
                        <td>
                            <button className="btn Boton" id="Calcular" 
                                onClick={this.handleClick}> Calcular
                            </button> 
                        </td>
                        <td>
                            <button className="btn btn-success" id="Guardar"
                                onClick={this.handleClick}> Guardar
                            </button>
                        </td>
                        <td>
                            <input type="file" multiple={false} accept=".txt"
                            onChange={this.handleFiles} />
                        </td>
                    </table>
                </nav>
                <div>
                    <div>
                        <label>Frase</label>
                        <textarea cols="189" rows="3" placeholder="Frase" id="Entrada" onChange={this.handleEntrada}></textarea>
                        <label>Llave</label>
                        <textarea cols="189" rows="3" placeholder="Llave" id="Llave" onChange={this.handleLlave}></textarea>
                        <label>Resultado</label>
                        <textarea disabled cols="189" rows="6" placeholder="Resultado" id="Resultado" ></textarea>
                    </div>
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

export default pFeistel