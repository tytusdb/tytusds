import React from 'react';
import ListaSimple from '../../../EDD/ListaSimple';

// lista.add_f(1);
// lista.add_f(2);
// lista.add_f(3);
// lista.add_f(4);
// lista.add_f(5);
// lista.imprimir();
// console.log("");
// lista.update(2,10);
// lista.delete(5);
// lista.imprimir();
// lista.seek(8);

class ListaSimpleEnlazada extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            elemento: '',
            reemplazado: '',
            lista: new ListaSimple()
        };
       
        this.ContenidoElemento = this.ContenidoElemento.bind(this);
        this.ContenidoReemplazado = this.ContenidoReemplazado.bind(this);
        this.InsertarContenidoInicio = this.InsertarContenidoInicio.bind(this);
        this.InsertarContenidoFinal = this.InsertarContenidoFinal.bind(this);
        this.ImprimirLista = this.ImprimirLista.bind(this);
        this.EliminarElemento = this.EliminarElemento.bind(this);
        this.ModificarElemento = this.ModificarElemento.bind(this);
    }

    ContenidoElemento(e){
        this.setState({elemento:e.target.value});
    }

    ContenidoReemplazado(e){
        this.setState({reemplazado:e.target.value});
    }

    InsertarContenidoInicio(){
        this.state.lista.add_i(this.state.elemento);
    }

    InsertarContenidoFinal(){
        this.state.lista.add_f(this.state.elemento);
    }

    EliminarElemento(){
        this.state.lista.delete(this.state.elemento);
    }


    ImprimirLista(){
        this.state.lista.imprimir();
    }
    
    ModificarElemento(){
        this.state.lista.update(this.state.elemento, this.state.reemplazado);
    }

    render(){
        return(
            <div className="container"> 
                <div className="row gap-2">
                    <div className="col-sm-2 d-grid gap-2">
                        <input type="text" className="form-control" id="Elemento" placeholder="Elemento" value={this.state.elemento} onChange={this.ContenidoElemento}/>
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <button className="btn btn-success" onClick={this.InsertarContenidoInicio} >Insertar al Inicio</button>
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <button className="btn btn-success" onClick={this.InsertarContenidoFinal} >Insertar al Final</button>
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <button className="btn btn-danger" onClick={this.EliminarElemento} >Eliminar</button>
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <button className="btn btn-warning" onClick={this.ImprimirLista} >Imprimir</button>
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <input type="text" className="form-control" id="contenido" placeholder="Reemplazar" value={this.state.reemplazado} onChange={this.ContenidoReemplazado}/>
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <button className="btn btn-warning" onClick={this.ModificarElemento}>Modificar</button>
                    </div>
                </div>

                <div className="card mt-2">
                
                </div>

            </div>
        )
    }
}

export default ListaSimpleEnlazada;