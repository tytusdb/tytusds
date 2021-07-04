//Pagina para graficar Huffman
import React from 'react'

import Huffman from '../../Estructuras/codificacion/Huffman'

import Descarga from '../../Estructuras/DescargaTXT'

import huffman from '../../animaciones/codificacion/gHuffman'

import '../styles/Grafica.css'

class pHuffman extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            entrada: "",
            velocidad: 5
        }
        this.huffman= new Huffman()
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
            if(id === "Calcular"){ this.huffman.calcular(this.state.entrada) }
            
            else if(id === "Guardar"){
                var output = this.huffman.guardar()
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
                    <textarea cols="189" rows="3" placeholder="Frase" id="Entrada" 
                    onChange={this.handleEntrada}></textarea>
                    {huffman(this.huffman.dotG())}
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

export default pHuffman