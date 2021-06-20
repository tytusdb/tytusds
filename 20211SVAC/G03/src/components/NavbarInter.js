import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import Cargar from './Cargar'
import Agregar from './Agregar'
import Eliminar from './Eliminar'
import Actualizar from './Actualizar'
import {Link} from 'react-router-dom'
import Dibujar from './Dibujar';
import Buscar from './Buscar'

import Seleccion from '../estructuras/Ordenamientos/Seleccion'
import Insercion from '../estructuras/Ordenamientos/Insercion'
import Grafica from './GraficaListas'
import GraficarArbol from './GraficarArbol'
let count = 0;
export default class NavbarInter extends Component {
    state = {
      estrutura : null,
      busqueda: "",
      nombre: ''
     }


     componentDidMount(){
       this.setState({nombre: this.props.location.state.nombre})
     }
    
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
     
    obtenerDatos = (edd) =>{
      this.setState({
        estrutura: edd
      })
    }

    obtenerBusqueda = (datoBuscar) =>{
      this.setState({
        busqueda: datoBuscar
      })
    }


    ordenarDatos=()=>{
      let arregloOrdenado = []
        switch (this.state.nombre) {
          case "Ordenamiento Selección":
            arregloOrdenado = Seleccion(this.state.estrutura);
            console.log("estoy ordenando Seleccion")
            break;
          
          case "Ordenamiento Inserción":
            arregloOrdenado = Insercion(this.state.estrutura);
            
            console.log("estoy ordenando Insercion")
            break;
          case "Ordenamiento Burbuja":
            
            console.log("estoy ordenando Burbuja")
            break;
          case "Ordenamiento Rapido":
            
            console.log("estoy ordenando Rapido")
            break;
          default:
            break;
          
        }

        this.setState({
          estrutura: arregloOrdenado
        })
    }


   guardarOrdenamiento=() =>{
      let archivoJSON = JSON.stringify(this.state.estrutura)

  }

    render() {
      const { activeItem } = this.state
  
      if(this.state.estrutura == null){
        return (
          <div>
              <Menu className="ui tpo inverted attached menu">
                <Menu.Item>
                            <Link to="/tytusds/20211SVAC/G03/build/">TytusDS</Link>
                </Menu.Item>
                <Cargar obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++} />
                <Agregar  obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++} />
                <Eliminar obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++}/>
                <Actualizar obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++}/>
                <Buscar  busqueda={this.obtenerBusqueda}  key={count++}/>
              <Menu.Menu position='right'>
                <Menu.Item name="Guardar" icon='save'>
                </Menu.Item>
                
              </Menu.Menu>
            </Menu>
            <h1 style={{ color: 'white' }}>{this.state.nombre}</h1>
            
          </div>
        )
      }else{
        if(this.state.nombre == "Ordenamiento Selección" ||
           this.state.nombre == "Ordenamiento Inserción" ||
           this.state.nombre == "Ordenamiento Burbuja" ||
           this.state.nombre == "Ordenamiento Rapido" ){
          return (
            <div>
                <Menu className="ui tpo inverted attached menu">
                  <Menu.Item>
                              <Link to="/tytusds/20211SVAC/G03/build/">TytusDS</Link>
                  </Menu.Item>
                  <Cargar obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++}/>
                  <Menu.Item name="Ordenar" icon='chart bar' 
                    onClick={this.handleItemClick, this.ordenarDatos}>
                  </Menu.Item>
                <Menu.Menu position='right'>
                  <Menu.Item name="Guardar" icon='save' onClick={this.handleItemClick, this.guardarOrdenamiento}>
                  </Menu.Item>
                  
                </Menu.Menu>
              </Menu>
              <br/>
               <h1 style={{ color: 'white' }}>{this.state.nombre}</h1>
               {/* <h3>{this.state.estructura.Imprimir()}</h3> */}
              <Dibujar nombre={this.state.nombre} estructura={this.state.estrutura}  key={count++}/>
            </div>
          )
        }else if(this.state.nombre == "Arbol ABB"){
          return (
            <div>
                <Menu className="ui tpo inverted attached menu">
                  <Menu.Item>
                              <Link to="/tytusds/20211SVAC/G03/build/">TytusDS</Link>
                  </Menu.Item>
                  <Cargar obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++}/>
                  <Agregar  obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++} />
                  <Eliminar obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++}/> 
                  <Actualizar obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++}/>
                  <Buscar busqueda={this.obtenerBusqueda} key={count++}/>
                <Menu.Menu position='right'>
                  <Menu.Item name="Guardar" icon='save'>
                  </Menu.Item>
                  
                </Menu.Menu>
              </Menu>
              <br/>
               <h1 style={{ color: 'white' }}>{this.state.nombre}</h1>
               {/* <h3>{this.state.estructura.Imprimir()}</h3> */}
               <GraficarArbol nombre={this.state.nombre} estructura={this.state.estrutura} valorBusqueda={this.state.busqueda} key={count++}/>
            </div>
          )
        }else{
          return (
            <div>
                <Menu className="ui tpo inverted attached menu">
                  <Menu.Item>
                              <Link to="/tytusds/20211SVAC/G03/build/">TytusDS</Link>
                  </Menu.Item>
                  <Cargar obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++}/>
                  <Agregar  obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++} />
                  <Eliminar obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++}/> 
                  <Actualizar obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++}/>
                  <Buscar busqueda={this.obtenerBusqueda} key={count++}/>
                <Menu.Menu position='right'>
                  <Menu.Item name="Guardar" icon='save'>
                  </Menu.Item>
                  
                </Menu.Menu>
              </Menu>
              <br/>
               <h1 style={{ color: 'white' }}>{this.state.nombre}</h1>
               {/* <h3>{this.state.estructura.Imprimir()}</h3> */}
              <Dibujar nombre={this.state.nombre} estructura={this.state.estrutura} valorBusqueda={this.state.busqueda} key={count++}/>
            </div>
          )
        }
      }
    }
}
