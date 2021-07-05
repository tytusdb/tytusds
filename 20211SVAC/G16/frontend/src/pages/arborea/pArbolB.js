//Pagina para graficar Arbol B+ y B
import React from 'react'

//import Arbolb from '../Estructuras/arborea/ArbolB'
//import Arbolbm from '../Estructuras/arborea/ArbolBm'

import Funciones from '../../Estructuras/Funciones'


import arbolB from '../../animaciones/arborea/gArbolB'

import '../styles/Grafica.css'

class pArbolB extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          repeticion: true,
          velocidad: 5,
          entrada: "",
          orden: 3,
          tipo: "PreOrdne",
          nuevo: "",
          path: this.props.location.pathname,
        }
        this.arbol = this.setarbol(this.state.path)
      }
    
    handleEntrada = e => {
        this.setState({ entrada: e.target.value })
    }

    handleNuevo = e => {
        this.setState({ nuevo: e.target.value })
    }

    handleRepeticion = () => {
        this.setState({ repeticion: !this.state.repeticion })
    }

    handleTipo = e => {
        this.setState({ tipo: e.target.value })
    }

    handleOrden = e => {
        this.setState({ orden: e.target.value })
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
            this.arbol = this.setarbol(this.state.path, json.repeticion)
            this.arbol.cargar(json.valores)
        }
        reader.readAsText(files[0])
    }

    handleClick = e => {
        const id = e.target.id
        if(this.state.entrada === "" && id !== "Nuevo" && id !== "Guardar") alert("Ingrese un valor")
        
        else{
            if(id === "Agregar") this.arbol.agregar(this.state.entrada)
            
            else if(id === "Eliminar") this.arbol.eliminar(this.state.entrada)
            
            else if(id === "Buscar"){
                var aux = this.arbol.buscar(this.state.entrada)
                if(aux) alert("Se encontro el valor")
                else alert("No se encontro el valor")
            }
            else if(id === "Actualizar"){
                if(this.state.nuevo !== "") alert("Ingrese el Nuevo valor")
                else this.arbol.actualizar(this.state.entrada, this.state.nuevo)
            } 
                
            else if(id === "Nuevo") this.arbol = this.setarbol(this.state.path)
            
            else if(id === "Guardar"){
                var output = this.arbol.guardar(this.state.tipo)
                Funciones(output.nombre, output.text)
            }
            
            document.getElementById("input").reset()
            document.getElementById("nuevo").reset()
            this.setState({
                entrada: "",
                nuevo: ""
            })
        }
    }

    setarbol = path => {
        if(path.includes("ArbolB+")) return 
        else if(path.includes("ArbolB")) return
    }

    render(){
        return (
            <div>
                <nav className="Bar">
                    <table>
                        <td>
                            <form id="input">
                                <input type="text" style={{width: "100px"}} placeholder="Valor"
                                onChange={this.handleEntrada}/>
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
                            <button className="btn Boton" id="Buscar"
                                onClick={this.handleClick}> Buscar
                            </button>
                        </td>
                        <td>
                            <form id="nuevo">
                                <input type="txt" style={{width: "100px"}} placeholder="Nuevo Valor"
                                onChange={this.handleNuevo}/>
                            </form>
                        </td>
                        <td>
                            <button className="btn Boton" id="Actualizar"
                                onClick={this.handleClick}> Actualizar
                            </button>
                        </td>
                        <td>
                            <select multiple="" onChange={this.handleTipo} style={{height: "30px"}}>
                                <option>PreOrden</option>
                                <option>InOrden</option>
                                <option>PostOrden</option>
                                <option>Objeto</option>
                            </select>
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
                    {arbolB()}
                </div>
                <nav className="Sub_bar">
                    <table>
                        <td>
                            <input type="range"  min="0" max="10" step="1"  onChange={this.handleVelocidad}
                            defaultValue={this.state.velocidad} width="100"/>
                        </td>
                        <td>
                            <select multiple="" onChange={this.handleOrden} style={{height: "30px"}}>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                            </select>
                        </td>
                        <td>
                            <label>
                                <input type="checkbox" onChange={this.handleRepeticion}
                                    defaultChecked={this.state.repeticion}/>
                                Repeticiones
                            </label>
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

export default pArbolB