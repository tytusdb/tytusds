import React, { Component } from 'react'
import Stack from '../EDD/Stacks'

import './stack.css'




class StackComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            valorPila: "",
            pila: new Stack(),
            valorPilaModificar: "",
            valorbuscar: ""
        }

        this.leerJson = this.leerJson.bind(this)
        this.actualizarDatos = this.actualizarDatos.bind(this)
        this.borrar = this.borrar.bind(this)

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
                        valorPila: element,
                    }, () => {
                        this.handleSubmit()
                    })

                }, index * 1000)
            });

            this.setState({
                data: json
            })
        }
        reader.readAsText(input.files[0], "UTF-8")
    }

    actualizarDatos() {
        this.setState({
            data: {
                ...this.state.data,
                browserslist: "hola perro"
            }
        });
    }

    handleChange = (e) => {
  
        this.setState({
            valorPila: e.target.value
        })
    };


    handleChangeModificar = (e) => {
      

        this.setState({
            valorPilaModificar: e.target.value
        })
    };


    handleChangeBuscar = (e) => {
      

        this.setState({
            valorbuscar: e.target.value
        })
    };



    handleClick = (e) => {
   
    };

    handleSubmit = (e) => {
        e?.preventDefault();
      
        this.state.pila.push(this.state.valorPila)
        this.setState({
            pila: this.state.pila
        })


    };

    borrar = () => {
        this.state.pila.pop()
        this.setState({
            pila: this.state.pila,
        })
    }




    modificar = () =>{
        this.state.pila.modificar(this.state.valorPila,this.state.valorPilaModificar)

        this.setState({
            pila: this.state.pila
        })


    };



    buscar = () =>{
        let nodo =  this.state.pila.buscar(this.state.valorbuscar)
        let indice = this.state.pila.obtenerIndice(this.state.valorbuscar)

        if (nodo.value != null && indice != null){
            alert(`el indice del nodo es: ${indice} con valor : ${nodo.value}`)

        }else{
            alert("Nodo no encontrado a perro")
        }
        
    }


    render() {
        
        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        <div className="row gap-1">
                            <div className="col-sm-2 d-grid gap-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Elemento"
                                    placeholder="Elemento"
                                    onChange={this.handleChange}
                                    value={this.state.valorPila}
                                />
                            </div>


                            <div className="col-sm-2 d-grid gap-2">
                                <button type="submit" className="btn btn-success" onClick={this.handleClick} >Agregar elemento</button>
                            </div>


                            <div className="col-sm-2 d-grid gap-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Elemento"
                                    placeholder="modificar"
                                    onChange={this.handleChangeModificar}
                                    value={this.state.valorPilaModificar}
                                />
                            </div>

                                         
                            <div className="col-sm-2 d-grid gap-2">
                                <button type="button" className="btn btn-success" onClick={this.modificar} >Modificar</button>
                            </div>


                            <div className="col-sm-2 d-grid gap-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Elemento"
                                    placeholder="buscar"
                                    onChange={this.handleChangeBuscar}
                                    value={this.state.valorbuscar}
                                />
                            </div>
                            <div className="col-sm-2 d-grid gap-2">
                                <button type="button" className="btn btn-success" onClick={this.buscar} >buscar</button>
                            </div>


               
                            


                            <div className="col-sm-2 d-grid gap-2">
                                <button type="button" className="btn btn-danger" onClick={this.borrar} >Borrar</button>
                            </div>

                            <div className="col-sm-2 d-grid gap-2">
                              
                                    <input type="file" class="form-control" onChange={this.leerJson}/>
        
                                
                            </div>
                        </div>
                    </div>
                </form>


                <div className="container">
                    <div className="card mt-4">
                        <div className="bloques">
                            {
                                Array(this.state.pila.length).fill({}).map((_e, i) => (
                                    <div className="container__bloques animate__animated animate__fadeInDown">{this.state.pila.get(i).value}</div>
                                ))

                            }

                        </div>
                    </div>
                </div>



            </div>
        )
    }
}





export default StackComponent;
