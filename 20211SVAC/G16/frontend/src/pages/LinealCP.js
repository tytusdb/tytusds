//Pagina para graficar Cola de Prioridad
import React from 'react';

import ColaP from '../Estructuras/lineales/ColaPrioridad'

import Funciones from '../Estructuras/Funciones'

import lineal from '../animaciones/gLineal'
import VisNetwork from 'vis-network-react'

import './styles/Grafica.css'

class LinealCP extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          repeticion: true,
          velocidad: 5,
          entrada: "",
          prioridad: 1,
          nuevo: "",
          path: this.props.location.pathname,
        }
        this.cola = new ColaP(this.state.repeticion)
      }
    
    handleEntrada = e => {
        this.setState({ entrada: e.target.value })
    }

    handlePrioridad = e => {
        this.setState({ prioridad: e.target.value })
    }

    handleNuevo = e => {
        this.setState({ nuevo: e.target.value })
    }

    handleRepeticion = () => {
        this.setState({ repeticion: !this.state.repeticion  })
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
            this.cola = new ColaP(json.repeticion)
            this.cola.cargar(json.valores)
        }
        reader.readAsText(files[0])
    }

    handleClick = e => {
        const id = e.target.id
        if(this.state.entrada === "" && id === "Agregar" && id === "Buscar" && id === "Actualizar"){
            alert("Ingrese un valor")
        } 
        else{
            if(id === "Agregar") this.cola.agregar(this.state.entrada, this.state.prioridad)
               
            else if(id === "Eliminar") this.cola.eliminar()
            
            else if(id === "Buscar"){
                var aux = this.cola.buscar(this.state.entrada)
                if(aux) alert("Se encontro el valor")
                else alert("No se encontro el valor")
            }
            else if(id === "Actualizar"){
                if(this.state.nuevo === "") alert("Ingrese Nuevo Valor")

                else this.cola.actualizar(this.state.entrada, this.state.nuevo)
            }
            else if(id === "Guardar"){
                var output = this.cola.guardar()
                Funciones(output.nombre, output.text)
            } 
    
            else if(id === "Nuevo") this.cola = new ColaP(this.state.repeticion)

            document.getElementById("input").reset()
            document.getElementById("nuevo").reset()
            this.setState({
                entrada: "",
                nuevo: "",
                prioridad: 0
            })
        }
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
                            <select multiple="" onChange={this.handlePrioridad} style={{height: "30px"}} >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
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
                    {lineal(this.cola.dotG())}
                   
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

export default LinealCP