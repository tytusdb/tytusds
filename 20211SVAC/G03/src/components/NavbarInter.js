import React, { Component } from 'react'
import { Menu, Input } from 'semantic-ui-react'
import Cargar from './Cargar'
import Agregar from './Agregar'
import Eliminar from './Eliminar'
import Actualizar from './Actualizar'
import {Link} from 'react-router-dom'
import Dibujar from './Dibujar';
import Buscar from './Buscar'
import GraficarTablaHash from './GraficarTablaHash'
import GraficarTablaHashCerrada from './GraficarTablaHashCerrada'

import Seleccion from '../estructuras/Ordenamientos/Seleccion'
import Insercion from '../estructuras/Ordenamientos/Insercion'
import ordRapido from '../estructuras/Ordenamientos/OrdRapido'
import Ordenamiento from '../estructuras/Ordenamientos/OrdBurbuja'

import GraficarArboles from './GraficarArboles'
import GraficarArbol from './GraficarArbol'


import './NavbarInter.css'
import GraficaLinealizado from './GraficaLinealizado'
import GraficarMDispersa from './GraficarMDispersa'
import GraficarGrafo from './GraficarGrafo'
import TablaCodificacion from './TablaCodificacion'


let count = 0;
export default class NavbarInter extends Component {

    state = {
      estrutura : null,
      busqueda: "",
      nombre: '',
      datoaencriptar: '',
      fileDownloadUrl: null,
      valorGrafo: ""
     }


     componentDidMount(){
       this.setState({nombre: this.props.location.state.nombre})
     }
    
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
     
    obtenerDatos = (edd) =>{
      this.setState({
        estrutura: edd
      })
      if(this.state.nombre ==="Código de Hamming" || this.state.nombre ==="Algoritmo de Huffman" || this.state.nombre ==="Algoritmo LZW" || this.state.nombre ==="Cifrado Feistel"){
        this.setState({
          datoaencriptar: this.state.estrutura.dato
        })
      }
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
            break;
          
          case "Ordenamiento Inserción":
            arregloOrdenado = Insercion(this.state.estrutura);
            break;
          case "Ordenamiento Burbuja":
            let burbuja = new Ordenamiento()
            arregloOrdenado = burbuja.ordenar(this.state.estrutura); 
            break;
          case "Ordenamiento Rapido":
              arregloOrdenado = ordRapido(this.state.estrutura);
            break;
          default:
            break;
          
        }

        this.setState({
          estrutura: arregloOrdenado
        })
    }

    desencolar=()=>{
        switch (this.state.nombre) {
          case "Cola":
            this.state.estrutura.Pop()
            break;
          
          case "Cola de prioridad":
            this.state.estrutura.Pop()
            break;
          case "Pila":
            this.state.estrutura.eliminar()
            break;
          default:
            break;
          
        }

        this.setState({
          estrutura: this.state.estrutura
        })
    }

    linealizar=()=>{
      switch (this.state.nombre) {
        case "Col Major":
          this.state.estrutura.colMajor()
          break;
        
        case "Row Major":
          this.state.estrutura.rowMajor()
          break;
        default:
          break;
        
      }

      this.setState({
        estrutura: this.state.estrutura
      })
  }

  recorridosAnchura=()=>{
    switch (this.state.nombre) {
      case "Grafo Dirigido":
        this.state.estrutura.BFS()
        break;
      case "Grafo No Dirigido":
        this.state.estrutura.BFS()
        break;
     
      default:
        break;
      
    }
    this.setState({
      estrutura: this.state.estrutura
    })
}

obtenerText = e =>{
  this.setState({
      [e.target.name]: e.target.value
  })
  
}

encryptado = () =>{
  if(this.state.nombre === "Cifrado Feistel"){
    let splitEntrada = this.state.datoaencriptar.split(",")

    this.state.estrutura.cargar(splitEntrada[0],splitEntrada[1],splitEntrada[2])
  }else{
    this.state.estrutura.cargar(this.state.datoaencriptar)
  }
  this.setState({
    estrutura: this.state.estrutura
  })
}

recorridosProfundidad=()=>{
  switch (this.state.nombre) {
    case "Grafo Dirigido":
      this.state.estrutura.DFS()
      break;
    case "Grafo No Dirigido":
      this.state.estrutura.DFS()
      break;
   
    default:
      break;
    
  }

this.setState({
  estrutura: this.state.estrutura
})
}

busquedaConRecorrido=()=>{
  this.state.estrutura.busquedaEspecifica(this.state.busqueda)

  this.setState({
    estrutura: this.state.estrutura
  })
}

costoUniforme=()=>{

  let splitEntrada = this.state.valorGrafo.split(",")
  this.state.estrutura.costoMinimo(splitEntrada[0], splitEntrada[1])

  this.setState({
    estrutura: this.state.estrutura
  })
}

recubrimientoMinimo=()=>{
  this.state.estrutura.recubrimientoMinimo(this.state.valorGrafo)

  this.setState({
    estrutura: this.state.estrutura
  })
}



   guardarOrdenamiento=(event) =>{

     event.preventDefault();
      let archivoJSON = JSON.stringify({valores: this.state.estrutura}, null,4)
      const blob = new Blob([archivoJSON])

      const fileDownloadUrl = URL.createObjectURL(blob);
      this.setState ({fileDownloadUrl: fileDownloadUrl}, 
        () => {
          this.dofileDownload.click(); 
          URL.revokeObjectURL(fileDownloadUrl); 
          this.setState({fileDownloadUrl: ""})
      })    

  }

  guardarEstructuras=(event) =>{

    event.preventDefault();
     let archivoJSON = JSON.stringify({nombre:this.state.nombre,valores: this.state.estrutura.guardar()}, null,4)
     const blob = new Blob([archivoJSON])

     const fileDownloadUrl = URL.createObjectURL(blob);
     this.setState ({fileDownloadUrl: fileDownloadUrl}, 
       () => {
         this.dofileDownload.click(); 
         URL.revokeObjectURL(fileDownloadUrl); 
         this.setState({fileDownloadUrl: ""})
     })    

 }


 
 guardarCodificados=(event) =>{

  event.preventDefault();
   let archivoJSON = this.state.estrutura.guardar()
   const blob = new Blob([archivoJSON])

   const fileDownloadUrl = URL.createObjectURL(blob);
   this.setState ({fileDownloadUrl: fileDownloadUrl}, 
     () => {
       this.dofileDownload.click(); 
       URL.revokeObjectURL(fileDownloadUrl); 
       this.setState({fileDownloadUrl: ""})
   })    

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
                <Menu.Item name="Guardar" icon='save'  onClick={this.handleItemClick, this.guardarEstructuras}>
                </Menu.Item>
                
              </Menu.Menu>
            </Menu>
            
           
            <a className="hidden"
              download={this.state.nombre+".json"}
              href={this.state.fileDownloadUrl}
              ref={e=>this.dofileDownload = e}
              >download it</a>
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
              <a className="hidden"
              download={this.state.nombre+".json"}
              href={this.state.fileDownloadUrl}
              ref={e=>this.dofileDownload = e}
              >download it</a>
               <h1 style={{ color: 'white' }}>{this.state.nombre}</h1>
               {/* <h3>{this.state.estructura.Imprimir()}</h3> */}
              <Dibujar nombre={this.state.nombre} estructura={this.state.estrutura}  key={count++}/>
            </div>
          )
        }else if(this.state.nombre == "Arbol ABB"
              ||this.state.nombre == "Arbol AVL"){
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
                  <Menu.Item name="Guardar" icon='save'  onClick={this.handleItemClick, this.guardarEstructuras}>
                  </Menu.Item>
                  
                </Menu.Menu>
              </Menu>
              <br/>
              <a className="hidden"
              download={this.state.nombre+".json"}
              href={this.state.fileDownloadUrl}
              ref={e=>this.dofileDownload = e}
              >download it</a>
               <h1 style={{ color: 'white' }}>{this.state.nombre}</h1>
               {/* <h3>{this.state.estructura.Imprimir()}</h3> */}
               <GraficarArbol nombre={this.state.nombre} estructura={this.state.estrutura} valorBusqueda={this.state.busqueda} key={count++}/>
            </div>
          )
        }else if(this.state.nombre == "Arbol B"
              ||this.state.nombre == "Arbol B+"
              ||this.state.nombre == "Arbol Merkle"
        ){
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
            <Menu.Item name="Guardar" icon='save'  onClick={this.handleItemClick, this.guardarEstructuras}>
            </Menu.Item>
            
          </Menu.Menu>
        </Menu>
        <br/>
        <a className="hidden"
              download={this.state.nombre+".json"}
              href={this.state.fileDownloadUrl}
              ref={e=>this.dofileDownload = e}
              >download it</a>
         <h1 style={{ color: 'white' }}>{this.state.nombre}</h1>
         {/* <h3>{this.state.estructura.Imprimir()}</h3> */}
         <GraficarArboles nombre={this.state.nombre} estructura={this.state.estrutura} valorBusqueda={this.state.busqueda} key={count++}/>
      </div>
    )
        }else if(this.state.nombre == "Tabla Hash Abierta"
        ){
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
            <Menu.Item name="Guardar" icon='save'  onClick={this.handleItemClick, this.guardarEstructuras}>
            </Menu.Item>
            
          </Menu.Menu>
        </Menu>
        <br/>
        <a className="hidden"
              download={this.state.nombre+".json"}
              href={this.state.fileDownloadUrl}
              ref={e=>this.dofileDownload = e}
              >download it</a>
        <h1 style={{ color: 'white' }}>{this.state.nombre}</h1>
        {/* <h3>{this.state.estructura.Imprimir()}</h3> */}
        <GraficarTablaHash nombre={this.state.nombre} estructura={this.state.estrutura} valorBusqueda={this.state.busqueda} key={count++}/> 
      </div>
      )
        }else if(this.state.nombre == "Matriz Dispersa"
        ){
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
            <Menu.Item name="Guardar" icon='save'  onClick={this.handleItemClick, this.guardarEstructuras}>
            </Menu.Item>
            
          </Menu.Menu>
        </Menu>
        <br/>
        <a className="hidden"
              download={this.state.nombre+".json"}
              href={this.state.fileDownloadUrl}
              ref={e=>this.dofileDownload = e}
              >download it</a>
        <h1 style={{ color: 'white' }}>{this.state.nombre}</h1>
        {/* <h3>{this.state.estructura.Imprimir()}</h3> */}
        <GraficarMDispersa nombre={this.state.nombre} estructura={this.state.estrutura} valorBusqueda={this.state.busqueda} key={count++}/> 
      </div>
      )
        }else if(this.state.nombre == "Col Major" || this.state.nombre == "Row Major"
        ){
      return (
      <div>
          <Menu className="ui tpo inverted attached menu">
            <Menu.Item>
                        <Link to="/tytusds/20211SVAC/G03/build/">TytusDS</Link>
            </Menu.Item>
            <Cargar obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++}/>
            <Agregar  obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++} />
            <Menu.Item name="Linealizar" icon='chart bar' 
                    onClick={this.handleItemClick, this.linealizar}>
            </Menu.Item>
            <Eliminar obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++}/> 
            <Actualizar obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++}/>
            <Buscar busqueda={this.obtenerBusqueda} key={count++}/>
          <Menu.Menu position='right'>
            <Menu.Item name="Guardar" icon='save'  onClick={this.handleItemClick, this.guardarEstructuras}>
            </Menu.Item>
            
          </Menu.Menu>
        </Menu>
        <br/>
        <a className="hidden"
              download={this.state.nombre+".json"}
              href={this.state.fileDownloadUrl}
              ref={e=>this.dofileDownload = e}
              >download it</a>
        <h1 style={{ color: 'white' }}>{this.state.nombre}</h1>
        {/* <h3>{this.state.estructura.Imprimir()}</h3> */}
        <GraficaLinealizado nombre={this.state.nombre} estructura={this.state.estrutura} valorBusqueda={this.state.busqueda} key={count++}/> 
      </div>
      )
        }else if(this.state.nombre == "Tabla Hash Cerrada"
        ){
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
            <Menu.Item name="Guardar" icon='save'  onClick={this.handleItemClick, this.guardarEstructuras}>
            </Menu.Item>
            
          </Menu.Menu>
        </Menu>
        <br/>
        <a className="hidden"
              download={this.state.nombre+".json"}
              href={this.state.fileDownloadUrl}
              ref={e=>this.dofileDownload = e}
              >download it</a>
        <h1 style={{ color: 'white' }}>{this.state.nombre}</h1>
        {/* <h3>{this.state.estructura.Imprimir()}</h3> */}
        <GraficarTablaHashCerrada nombre={this.state.nombre} estructura={this.state.estrutura} valorBusqueda={this.state.busqueda} key={count++}/> 
      </div>
      )
        }else if(this.state.nombre == "Grafo Dirigido" || this.state.nombre == "Grafo No Dirigido" || this.state.nombre == "Algoritmo de costo uniforme"
        ){
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
            
            <Menu.Item name="Buscar con Recorrido"
                    onClick={this.handleItemClick, this.busquedaConRecorrido}> 
            </Menu.Item>

            <Menu.Item name="Profundidad"
                    onClick={this.handleItemClick, this.recorridosProfundidad}>
            </Menu.Item>
            <Menu.Item name="Anchura"
                    onClick={this.handleItemClick, this.recorridosAnchura}> 
            </Menu.Item>
            
            <Menu.Item name="Costo Uniforme"
                    onClick={this.handleItemClick, this.costoUniforme}> 
            </Menu.Item>

            <Menu.Item name="Recubrimiento mínimo"
                    onClick={this.handleItemClick, this.recubrimientoMinimo}> 
            </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item name="Guardar" icon='save'  onClick={this.handleItemClick, this.guardarEstructuras}>
            </Menu.Item>
            
          </Menu.Menu>
        </Menu>
        <br/>
        <a className="hidden"
              download={this.state.nombre+".json"}
              href={this.state.fileDownloadUrl}
              ref={e=>this.dofileDownload = e}
              >download it</a>
        <h1 style={{ color: 'white' }}>{this.state.nombre}</h1>
        {/* <h3>{this.state.estructura.Imprimir()}</h3> */}
        <Input className="inputAgregar" type="text" name="valorGrafo" value={this.state.valorGrafo}  fluid placeholder="opciones" onChange={this.obtenerText}/>
        <br/>
        <GraficarGrafo nombre={this.state.nombre} estructura={this.state.estrutura} valorBusqueda={this.state.busqueda} key={count++}/> 
      </div>
      )
        }else if(this.state.nombre == "Código de Hamming" || this.state.nombre == "Algoritmo de Huffman" || this.state.nombre == "Algoritmo LZW" ||this.state.nombre == "Cifrado Feistel"
        ){
      return (
      <div>
          <Menu className="ui tpo inverted attached menu">
            <Menu.Item>
                        <Link to="/tytusds/20211SVAC/G03/build/">TytusDS</Link>
            </Menu.Item>
            <Cargar obtenerDatos={this.obtenerDatos} nombre={this.state.nombre} edd={this.state.estrutura} key={count++}/>
            <Menu.Item name="Encriptar"
                    onClick={this.handleItemClick, this.encryptado}> 
            </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item name="Guardar" icon='save'  onClick={this.handleItemClick, this.guardarCodificados}>
            </Menu.Item>
            
          </Menu.Menu>
        </Menu>
        <br/>
        <a className="hidden"
              download={this.state.nombre+".txt"}
              href={this.state.fileDownloadUrl}
              ref={e=>this.dofileDownload = e}
              >download it</a>
        <h1 style={{ color: 'white' }}>{this.state.nombre}</h1>
        {/* <h3>{this.state.estructura.Imprimir()}</h3> */}
        <h3 style={{ color: 'white' }}>Entrada</h3>
        <Input className="inputAgregar" type="text" name="datoaencriptar" value={this.state.datoaencriptar}  fluid placeholder="agregar dato" onChange={this.obtenerText}/>
        <br/>
        <TablaCodificacion nombre={this.state.nombre} estructura={this.state.estrutura} valorBusqueda={this.state.busqueda} key={count++}/> 

        <h3 style={{ color: 'white' }}>Resultado</h3>
        <Input className="inputAgregar" type="text" name="textoDato" value={this.state.estrutura.ecriptado}  fluid placeholder="agregar dato" />
      </div>
      )
        }else if(this.state.nombre == "Pila"
              || this.state.nombre == "Cola"
              || this.state.nombre == "Cola de prioridad"){
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
                  <Menu.Item name="Desencolar" 
                    onClick={this.handleItemClick, this.desencolar}>
                  </Menu.Item>
                <Menu.Menu position='right'>
                  <Menu.Item name="Guardar" icon='save'  onClick={this.handleItemClick, this.guardarEstructuras}>
                  </Menu.Item>
                  
                </Menu.Menu>
              </Menu>
              <br/>
              <a className="hidden"
              download={this.state.nombre+".json"}
              href={this.state.fileDownloadUrl}
              ref={e=>this.dofileDownload = e}
              >download it</a>

               <h1 style={{ color: 'white' }}>{this.state.nombre}</h1>
               {/* <h3>{this.state.estructura.Imprimir()}</h3> */}
              <Dibujar nombre={this.state.nombre} estructura={this.state.estrutura} valorBusqueda={this.state.busqueda} key={count++}/>
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
                  <Menu.Item name="Guardar" icon='save'  onClick={this.handleItemClick, this.guardarEstructuras}>
                  </Menu.Item>
                  
                </Menu.Menu>
              </Menu>
              <br/>
              <a className="hidden"
              download={this.state.nombre+".json"}
              href={this.state.fileDownloadUrl}
              ref={e=>this.dofileDownload = e}
              >download it</a>
            
               <h1 style={{ color: 'white' }}>{this.state.nombre}</h1>
               {/* <h3>{this.state.estructura.Imprimir()}</h3> */}
              <Dibujar nombre={this.state.nombre} estructura={this.state.estrutura} valorBusqueda={this.state.busqueda} key={count++}/>
            </div>
          )
        }
      }
    }
}
