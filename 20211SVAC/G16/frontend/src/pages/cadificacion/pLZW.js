//Pagina para graficar Huffman
import React from 'react'

import LZW from '../../Estructuras/codificacion/LZW'

import Descarga from '../../Estructuras/DescargaTXT'

import '../styles/Grafica.css'

class pLZW extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            entrada: "",
            salida: "",
            velocidad: 5
        }
        this.lzw= new LZW()
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
            var aux = e.target.result
            aux = aux.substring(0, aux.length-1)
            this.setState({ entrada: aux })
            document.getElementById("Entrada").value = (e.target.result).toString()
        }
        reader.readAsText(files[0])
    }

    handleClick = e => {
        const id = e.target.id
        if(this.state.entrada === "" && id === "Calcular") alert("Ingrese una frase")

        else{
            if(id === "Calcular"){ 
                var aux = this.lzw.calcular(this.state.entrada) 
                document.getElementById("Resultado").value = aux
            }
            
            else if(id === "Guardar"){
                var output = this.lzw.guardar()
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
                    <textarea cols="189" rows="3" placeholder="Frase" id="Entrada" ></textarea>
                    </div>
                    <textarea disabled cols="30" rows="28" placeholder="Resultado" id="Resultado" ></textarea>
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

export default pLZW