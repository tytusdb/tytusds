//Pagina para grafo Lista dispersa
import React from 'react'
import ListaD from '../../Estructuras/noLineal/grafoL'
import Funciones from '../../Estructuras/Funciones.js'

import busquedaG from '../../animaciones/noLineal/gRecorrido'

import '../styles/Grafica.css'

class grafoAncho extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            entrada: "",
            peso: "",
            precede: "",
            nuevo: "",
            path: this.props.location.pathname,
            tipo: "Lista",
            velocidad: 5
        }
        this.metodo = this.setMetodo(this.state.path)
        this.grafo = new ListaD()
        this.resultado = ''
        this.camino = ''
        this.print = ''
      }
    
    handleEntrada = e => {
        this.setState({ entrada: e.target.value })
    }

    handlePrecede = e => {
        this.setState({ precede: e.target.value })
    }
    handlePeso = e => {
        this.setState({ peso: e.target.value })
    }

    handleNuevo = e => {
        this.setState({ nuevo: e.target.value })
    }

    handleVelocidad = e => {
        this.setState({ velocidad: e.target.value })
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
            this.grafo.cargar(json.valores)
            this.print = this.grafo.almacenamiento(this.state.tipo)
            document.getElementById("Resultado").value = this.print
        }
        reader.readAsText(files[0])
    }

    setMetodo(path){
        if(path.includes("AnchuraDeGrafos")) return "Anchura"
        
        else if(path.includes("ProfundidadDeGrafos")) return "Profundidad"

        else if(path.includes("CostoUniforme")) return "Costo uniforme"

        else if(path.includes("RecubrimientoMinimo")) return "Recubrimiento minimo"
    }

    handleClick = e => {
        const id = e.target.id
        if(this.state.entrada === "" && id !== "Nuevo" && id !== "Guardar" && id !== "Recorrer") alert("Ingrese un valor")

        else{
            if(id === "Agregar") {
                this.grafo.insertar(this.state.entrada,this.state.precede,this.state.peso)
                this.print = this.grafo.almacenamiento(this.state.tipo)
                document.getElementById("Resultado").value = this.print
            }
            
            else if(id === "Eliminar") this.grafo.eliminar(this.state.entrada)
            
            else if(id === "Buscar"){
                
                if(this.metodo === "Anchura"){
                    if(this.state.entrada !== "" && this.state.precede !== ""){
                        var aux = this.grafo.busquedaAnchura(this.state.entrada,this.state.precede)
                        if(aux) alert("Se encontro el valor")
                        else alert("No se encontro el valor")
                        this.resultado = "Busqueda por anchura: "+aux
                    }
                }
                else if(this.metodo === "Profundidad"){
                    if(this.state.entrada !== "" && this.state.precede !== ""){
                        var aux = this.grafo.busquedaProf(this.state.entrada,this.state.precede)
                        if(aux) alert("Se encontro el valor")
                        else alert("No se encontro el valor")
                        this.resultado = "Busqueda por profundidad: "+aux
                    }
                }
                else if(this.metodo === "Costo uniforme"){
                    if(this.state.entrada !== "" && this.state.precede !== ""){
                        var aux = this.grafo.costoU(this.state.entrada,this.state.precede)
                        if(aux) alert("Se encontro el valor")
                        else alert("No se encontro el valor")
                        this.resultado = "Busqueda por Costo uniforme: "+aux
                    }
                }
                else if(this.metodo === "Recubrimiento minimo"){
                    if(this.state.entrada !== ""){
                        var aux = this.grafo.busquedaProf(this.state.entrada)
                        if(aux) alert("Se encontro el valor")
                        else alert("No se encontro el valor")
                        this.resultado = "Busqueda por Recubrimiento minimo: "+aux
                    }
                }
            }
            else if(id === "Recorrer"){
                
                if(this.metodo === "Anchura"){
                    var aux = this.grafo.recorridoAnchura()
                    this.camino = "Recorrido por anchura: "+aux
                }
                else if(this.metodo === "Profundidad"){
                    var aux = this.grafo.recorridoProf()
                    this.camino = "Recorrido por profundidad: "+aux
                }
                else if(this.metodo === "Recubrimiento minimo"){
                    if(this.state.entrada !== ""){
                        var aux = this.grafo.recMin(this.state.entrada)
                        this.camino = "Recorrido por Recubrimiento minimo: "+aux
                    }
                }
            }
            else if(id === "Actualizar"){
                if(this.state.nuevo === "") alert("Ingrese el Nuevo valor")
                
                else this.grafo.actualizar(this.state.entrada, this.state.nuevo)
            } 
                
            else if(id === "Nuevo") {
                this.grafo = new ListaD()
                this.resultado = ''
                this.camino = ''
                this.print = ''
            }

            else if(id === "Guardar"){
                var output = this.grafo.guardar(this.state.tipo)
                Funciones(output.nombre, output.text)
            }

            document.getElementById("input").reset()
            document.getElementById("nuevo").reset()
            document.getElementById("precede").reset()
            document.getElementById("peso").reset()
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
                            <form id="peso">
                                <input type="text" style={{width: "100px"}} placeholder="Peso"
                                onChange={this.handlePeso}/>
                            </form>
                        </td>
                        <td>
                            <form id="precede">
                                <input type="text" style={{width: "100px"}} placeholder="Precede"
                                onChange={this.handlePrecede}/>
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
                            <button className="btn Boton" id="Recorrer"
                                onClick={this.handleClick}> Recorrer
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
                <div className = "Result">
                    <div className = "der">
                        <h3>{this.resultado}</h3>
                        <h3>{this.camino}</h3>
                        {busquedaG(this.grafo.dotG())}
                    </div>
                    <div className = "izq">
                        <textarea disabled cols="40" rows="30" id="Resultado"></textarea>
                    </div>
                </div>
                <nav className="Sub_bar">
                    <table>
                        <td>
                            <input type="range"  min="0" max="10" step="1"  onChange={this.handleVelocidad}
                            defaultValue={this.state.velocidad} width="100"/>
                        </td>
                        <td>
                            <select multiple="" onChange={this.handleTipo} style={{height: "30px"}} >
                                <option>Lista</option>
                                <option>Matriz</option>
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

export default grafoAncho