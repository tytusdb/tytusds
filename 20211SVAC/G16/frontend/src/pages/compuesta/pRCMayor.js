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
            entrada: "",
            i: 0,
            j: 0,
            salida: "",
            velocidad: 5,
            creado: false,
            path: this.props.location.pathname,
        }
        this.major = null
      }
    
    handleEntrada = e => {
        this.setState({ entrada: e.target.value })
    }

    handlei = e => {
        this.setState({ i: parseInt(e.target.value) })
    }

    handlej = e => {
        this.setState({ j: parseInt(e.target.value) })
    }

    handleVelocidad = e => {
        this.setState({ velocidad: e.target.value })
    }

    handleFiles = e => {
        let files = e.target.files
        let reader = new FileReader()
        reader.onload = e =>{
            const json = JSON.parse(e.target.result)
            this.major = this.setMajor(json.m[0], json.m[1])
            var aux = this.major.cargar(json.valores)
            document.getElementById("Resultado").value = aux
            this.setState({ 
                velocidad: json.animaicon, 
                creado: true})
        }
        reader.readAsText(files[0])
    }

    handleClick = e => {
        const id = e.target.id
        if(this.state.creado === true){

            if(this.state.entrada === "" && id === "Eliminar" && id === "Actualizar" && id === "Buscar" && id === "Agregar") alert("Ingrese un Valor")
            
            else{
                var aux
                if(id === "Agregar") aux = this.major.agregar(this.state.entrada, this.state.i, this.state.j)
                
                else if(id === "Eliminar") aux = this.major.eliminar(this.state.i, this.state.j)
                
                else if(id === "Actualizar") aux = this.major.actualizar(this.state.entrada, this.state.i, this.state.j)
                
                else if(id === "Buscar"){
                    aux = document.getElementById("Resultado").value
                    var temp = this.major.buscar(this.state.entrada)
                    if(temp) alert("Se encontro el Valor")
                    
                    else alert("No se encontro el Valor")
                }
                
                else if(id === "Guardar"){
                    aux = document.getElementById("Resultado").value
                    var output = this.major.guardar()
                    Funcion(output.nombre, output.text)
                }
                
                document.getElementById("Resultado").value = aux
                this.setState({
                    entrada: "",
                    i: 0,
                    j: 0
                })
                document.getElementById("input").reset()
            }
        }
        else alert("Debe cargar una matriz primero")
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
                            <form id="input">
                                <input type="text" style={{width: "100px"}} placeholder="Valor" id="Valor"
                                onChange={this.handleEntrada}/>
                                <input type="number" min="0" style={{width: "50px"}} placeholder="i"
                                onChange={this.handlei}/>
                                <input type="number" min="0" style={{width: "50px"}} placeholder="j"
                                onChange={this.handlej}/>
                            </form>
                        </td>
                        <td>
                            <button className="btn Boton" id="Agregar"
                                onClick={this.handleClick}> Agregar
                            </button>
                        </td>
                        <td>
                            <button className="btn Boton" id="Eliminar"
                                onClick={this.handleClick}> Eliminar
                            </button>
                        </td>
                        <td>
                            <button className="btn Boton" id="Actualizar"
                                onClick={this.handleClick}> Actualizar
                            </button>
                        </td>
                        <td>
                            <button className="btn Boton" id="Buscar"
                                onClick={this.handleClick}> Buscar
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