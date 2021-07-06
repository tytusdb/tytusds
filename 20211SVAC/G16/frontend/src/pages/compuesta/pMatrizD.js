//Pagina para Matriz dispersa
import React from 'react'
import MatrizD from '../../Estructuras/compuesta/Dispersa'
import Funciones from '../../Estructuras/Funciones.js'

import matrizG from '../../animaciones/compuestas/gMatriz'

import '../styles/Grafica.css'

class mDispersa extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            entrada: "",
            x: "",
            y: "",
            nuevo: "",
            tipo: "Activado",
            velocidad: 5
        }
        this.matriz = new MatrizD()
        this.resultado = ''
        this.camino = ''
        this.print = ''
      }
    
    handleEntrada = e => {
        this.setState({ entrada: e.target.value })
    }

    handleX = e => {
        this.setState({ x: e.target.value })
    }
    handleY = e => {
        this.setState({ y: e.target.value })
    }

    handleNuevo = e => {
        this.setState({ nuevo: e.target.value })
    }

    handleVelocidad = e => {
        this.setState({ velocidad: e.target.value })
    }

    handleMetodo = e => {
        this.setState({metodo: e.target.value})
    }
    handleTipo = e => {
        this.setState({tipo: e.target.value})
    }

    handleFiles = e => {
        let files = e.target.files
        let reader = new FileReader()
        reader.onload = e =>{
            const json = JSON.parse(e.target.result)
            this.setState({ velocidad: json.animaicon })
            this.matriz.cargar(json.valores)
        }
        reader.readAsText(files[0])
    }

    handleClick = e => {
        const id = e.target.id
        if(this.state.entrada === "" && id !== "Nuevo" && id !== "Guardar" && this.state.x !== "" && this.state.y !== ""){
            alert("Ingrese un valor")
        }
        else{
            if(id === "Agregar") {
                this.matriz.insertar(this.state.entrada,this.state.x,this.state.y)
            }
            else if(id === "Eliminar") this.matriz.eliminar(this.state.entrada)
            else if(id === "Buscar"){
                var aux = this.matriz.buscar(this.state.entrada)
                if(aux) alert("Se encontro el valor")
                else alert("No se encontro el valor")
            }
            else if(id === "Recorrer"){
                
                if(this.state.metodo === "Anchura"){
                    var aux = this.matriz.recorridoAnchura()
                    this.camino = "Recorrido por anchura: "+aux
                }
                else if(this.state.metodo === "Profundidad"){
                    var aux = this.matriz.recorridoProf()
                    this.camino = "Recorrido por profundidad: "+aux
                }
            }
            else if(id === "Actualizar"){
                if(this.state.nuevo === "") alert("Ingrese el Nuevo valor")
                
                else this.matriz.actualizar(this.state.entrada, this.state.nuevo)
            } 
                
            else if(id === "Nuevo") {
                this.matriz = new MatrizD()
                this.resultado = ''
                this.camino = ''
                this.print = ''
            }

            else if(id === "Guardar"){
                var output = this.matriz.guardar(this.state.tipo)
                Funciones(output.nombre, output.text)
            }

            document.getElementById("input").reset()
            document.getElementById("nuevo").reset()
            document.getElementById("X").reset()
            document.getElementById("Y").reset()
            this.setState({
                entrada: "",
                precede: "",
                nuevo: "",
                peso: ""
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
                            <form id="X">
                                <input type="text" style={{width: "100px"}} placeholder="X"
                                onChange={this.handleX}/>
                            </form>
                        </td>
                        <td>
                            <form id="Y">
                                <input type="text" style={{width: "100px"}} placeholder="Y"
                                onChange={this.handleY}/>
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
                        {matrizG(this.matriz.dotG(this.state.tipo))}
                    </div>
                <nav className="Sub_bar">
                    <table>
                        <td>
                            <input type="range"  min="0" max="10" step="1"  onChange={this.handleVelocidad}
                            defaultValue={this.state.velocidad} width="100"/>
                        </td>
                       
                        <td>
                            <h5>Encabezado:</h5> 
                        </td>
                        <td>
                            <select multiple="" onChange={this.handleTipo} style={{height: "30px"}} >
                                <option>Activado</option>
                                <option>Desactivado</option>
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

export default mDispersa