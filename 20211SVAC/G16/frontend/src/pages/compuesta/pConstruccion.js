//Pagina para graficar Compuestas Simples
import React from 'react'

import CSimple from '../../Estructuras/compuesta/CSimple'
import CDoble from '../../Estructuras/compuesta/CDoble'

import Funciones from '../../Estructuras/Funciones'

import lineal from '../../animaciones/lineal/gEnlazada'

import '../styles/Grafica.css'

class pCSimple extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          repeticion: true,
          ingreso: "Final",
          velocidad: 5,
          primario: "",
          secundario: "",
          nuevo: "",
          tipo: "Simple",
          subtipo: "Simple"
        }
        this.lista = this.setLista(this.state.tipo)
      }
    
    handlePrimario = e => {
        this.setState({ primario: e.target.value })
    }

    handleSecundario = e => {
        this.setState({ secundario: e.target.value })
    }

    handleNuevo = e => {
        this.setState({ nuevo: e.target.value })
    }

    handleRepeticion = () => {
        this.setState({ repeticion: !this.state.repeticion })
    }

    handleIngreso = e => {
        this.setState({ ingreso: e.target.value })
    }

    handleTipo = e => {
        this.setState({ tipo: e.target.value })
    }

    handleSubTipo = e => {
        this.setState({ subtipo: e.target.value })
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
            this.lista.cargar(json.valores)
        }
        reader.readAsText(files[0])
    }

    handleClick = e => {
        const id = e.target.id
        if(this.state.primario === "" && id !== "Nuevo" && id !== "Guardar") alert("Ingrese un valor")
        
        else{
            if(id === "Agregar") this.lista.agregar(this.state.primario, this.state.secundario)
            
            else if(id === "Eliminar") this.lista.eliminar(this.state.primario, this.state.secundario)
            
            else if(id === "Buscar"){
                var aux = this.lista.buscar(this.state.primario, this.state.secundario)
                if(aux) alert("Se encontro el valor")
                else alert("No se encontro el valor")
            }
            else if(id === "Actualizar"){
                if(this.state.nuevo === "") alert("Ingrese el Nuevo valor")
                else this.lista.actualizar(this.state.primario, this.state.secundario, this.state.nuevo)
            } 
                
            else if(id === "Nuevo") this.lista = this.setLista(this.state.tipo)
            
            else if(id === "Guardar"){
                var output = this.lista.guardar()
                Funciones(output.nombre, output.text)
            }
            this.setState({
                primario: "",
                secundario: "",
                nuevo: ""
            })
            document.getElementById("input").reset()
            document.getElementById("nuevo").reset()
        }
    }

    setLista(tipo){
        if(tipo === "Simple") return new CSimple(this.state.ingreso, this.state.repeticion, this.state.subtipo)

        else if(tipo === "Doble") return new CDoble(this.state.ingreso, this.state.repeticion, this.state.subtipo)
    }

    render(){
        return (
            <div>
                <nav className="Bar">
                    <table>
                        <td>
                            <form id="input">
                                <input type="text" style={{width: "100px"}} placeholder="Primario"
                                onChange={this.handlePrimario}/>
                                <input type="text" style={{width: "100px"}} placeholder="Secundario"
                                onChange={this.handleSecundario}/>
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
                    {lineal(this.lista.dotG())}
                </div>
                <nav className="Sub_bar">
                    <table>
                        <td>
                            <input type="range"  min="0" max="10" step="1"  onChange={this.handleVelocidad}
                            defaultValue={this.state.velocidad} width="100"/>
                        </td>
                        <td>
                            <select multiple="" onChange={this.handleIngreso} >
                                <option>Final</option>
                                <option>Inicio</option>
                                <option>Orden</option>
                            </select>
                        </td>
                        <td>
                            <select multiple="" onChange={this.handleTipo} >
                                <option>Simple</option>
                                <option>Doble</option>
                            </select>
                        </td>
                        <td>
                            <select multiple="" onChange={this.handleSubTipo} >
                                <option>Simple</option>
                                <option>Doble</option>
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

export default pCSimple