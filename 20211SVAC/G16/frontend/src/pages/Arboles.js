//Pagina para graficar Arbol Binario y AVL
import React from 'react'

import Binario from '../Estructuras/Arboreas/Binario'
import AVL from '../Estructuras/Arboreas/AVL'

import Funciones from '../Estructuras/Funciones.js'

import three from '../animaciones/gArbol'

import './styles/Grafica.css'

class Arboles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          repeticion: true,
          velocidad: 5,
          entrada: "",
          orden: 3,
          tipo: "PreOrden",
          nuevo: "",
          path: this.props.location.pathname,
        }
        this.arbol = this.setarbol(this.state.path, this.state.repeticion)
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
                if(this.state.nuevo === "") alert("Ingrese el Nuevo valor")
                
                else this.arbol.actualizar(this.state.entrada, this.state.nuevo)
            } 
                
            else if(id === "Nuevo") this.arbol = this.setarbol(this.state.path, this.state.repeticion)
            
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

    setarbol = (path, repeticion) => {
        if(path.includes("ArbolBinario")) return new Binario(repeticion)
        
        else if(path.includes("AVL")) return new AVL(repeticion)
    }

    render(){
        return (
            <div>
                {console.log(this.arbol.dotG().nodes)}
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
                    {three(this.arbol.dotG())}
                </div>
                <nav className="Sub_bar">
                    <table>
                        <td>
                            <input type="range"  min="0" max="10" step="1"  onChange={this.handleVelocidad}
                            defaultValue={this.state.velocidad} width="100"/>
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

export default Arboles