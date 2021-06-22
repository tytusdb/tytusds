import React, { Component } from 'react'
import Stack from '../EDD/Stacks'
import './stack.css'




class StackComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            valorPila: "1",
            pila: new Stack()
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
        console.log({
            name: e.target.name,
            value: e.target.value

        });

        this.setState({
            valorPila: e.target.value
        })
    };

    handleClick = (e) => {
        console.log("banda hay fe")
    };

    handleSubmit = (e) => {
        e?.preventDefault();
        console.log("Formulario Subido")
        console.log(this.state.valorPila)

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

    render() {
        console.log(this.state.pila)
        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        <div className="row gap-2">
                            <div className="col-sm-2 d-grid gap-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Elemento"
                                    placeholder="Elemento"
                                    onChange={this.handleChange}
                                    value={this.state.valorBurbuja}
                                />
                            </div>

                            <div className="col-sm-2 d-grid gap-2">
                                <button type="submit" className="btn btn-success" onClick={this.handleClick} >Agregar elemento</button>
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