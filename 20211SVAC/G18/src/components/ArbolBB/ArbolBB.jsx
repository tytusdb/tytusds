import React from 'react';
import './ArbolBB.css';
import arbolBB from '../../EDD/abb';
import StyledNode from '../ListaCircularSimple/StyledNode'
import { Tree, TreeNode } from 'react-organizational-chart';


class ArbolBinariodeB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elemento: '',
            reemplazado: '',
            data: null,
            Arbol: new arbolBB()
        };

        this.ContenidoElemento = this.ContenidoElemento.bind(this);
        this.ContenidoReemplazado = this.ContenidoReemplazado.bind(this);
        this.InsertarContenidoInicio = this.InsertarContenidoInicio.bind(this);
        this.ImprimirArbol = this.ImprimirArbol.bind(this);
        this.EliminarElemento = this.EliminarElemento.bind(this);
        this.ModificarElemento = this.ModificarElemento.bind(this);
        this.leerJson = this.leerJson.bind(this);
        this.BuscarElemento = this.BuscarElemento.bind(this);
    }

    ContenidoElemento(e) {
        this.setState({ elemento: e.target.value });
    }

    ContenidoReemplazado(e) {
        this.setState({ reemplazado: e.target.value });
    }

    InsertarContenidoInicio() {
        this.state.Arbol.insertar(this.state.elemento);
        this.setState({
            Arbol: this.state.Arbol,
        });
    }

    BuscarElemento() {
        if (this.state.Arbol.seek(this.state.elemento) != null){
            alert("Elemento encontrado: " + this.state.elemento)
        }else{
            alert("Elemento "+ this.state.elemento +  ", inexistente")
        }
    }


    EliminarElemento() {
        this.state.Arbol.delete(this.state.elemento);
        this.setState({
            Arbol: this.state.Arbol,
        });
    }


    ImprimirArbol() {
        this.state.Arbol.inOrden();
    }

    ModificarElemento() {
        this.state.Arbol.update(this.state.elemento, this.state.reemplazado);
        this.setState({
            Arbol: this.state.Arbol,
        });
    }


    leerJson(event) {
        const input = event.target
        const reader = new FileReader()
        reader.onload = (event) => {
            const text = reader.result

            const json = JSON.parse(text)
            const valores = json.valores

            valores.forEach((element, index) => {
                setTimeout(() => {
                    this.setState({
                        elemento: element,
                    }, () => {
                        this.InsertarContenidoInicio()
                    })

                }, index * 1000)
            });

            this.setState({
                data: json
            })
        }
        reader.readAsText(input.files[0], "UTF-8")
    }




    render() {
        return (
            <div className="container">
                <div className="row gap-2">
                    <div className="col-sm-2 d-grid gap-2">
                        <input type="text" className="form-control" id="Elemento" placeholder="Elemento" value={this.state.elemento} onChange={this.ContenidoElemento} />
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <button className="btn btn-success" onClick={this.InsertarContenidoInicio} >Insertar Elemento</button>
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <button className="btn btn-success" onClick={this.BuscarElemento} >Buscar Elemento</button>
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <button className="btn btn-danger" onClick={this.EliminarElemento} >Eliminar</button>
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <input type="file" class="form-control" onChange={this.leerJson} />
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <input type="text" className="form-control" id="contenido" placeholder="Reemplazar" value={this.state.reemplazado} onChange={this.ContenidoReemplazado} />
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <button className="btn btn-warning" onClick={this.ModificarElemento}>Modificar</button>
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <button className="btn btn-success" onClick={this.ImprimirArbol} >Imprimir</button>
                    </div>


                </div>

                <div className="card mt-2">
                    <div className="contPadre">
                        <Tree
                            lineWidth={'2px'}
                            lineColor={'green'}
                            lineBorderRadius={'10px'}
                            label={<StyledNode>Root</StyledNode>}
                        >
                            <TreeNode label={<StyledNode>Child 1</StyledNode>}>
                                <TreeNode label={<StyledNode>Grand</StyledNode>} />
                            </TreeNode>
                            <TreeNode label={<StyledNode>Child 2</StyledNode>}>
                                <TreeNode label={<StyledNode>Grand</StyledNode>} />
                                <TreeNode label={<StyledNode>Grand</StyledNode>} />
                            </TreeNode>
                            
                            
                        </Tree>

                    </div>
                </div>

            </div>
        )
    }
}

export default ArbolBinariodeB;