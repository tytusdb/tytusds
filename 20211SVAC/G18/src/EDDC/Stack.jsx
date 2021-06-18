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
        e.preventDefault();
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
                <div className="contenedor-formulario ">
                    <form onSubmit={this.handleSubmit} className="formulario">
                        <div className="form-group">
                            <label htmlFor="" className="form__lbl">Ingrese un valor</label>

                            <input onChange={this.handleChange}
                                type="text"
                                className="form-control label_stack"
                                name="valorPila"
                                value={this.state.valorPila}
                            />
                            <button
                                type="submit"
                                className="btn btn-secondary"
                                onClick={this.handleClick} >
                                agregar
                            </button>
                            <button type="button" className="btn btn-danger" onClick={this.borrar}>Borrar</button>
                        </div>
                        <input type="file" onChange={this.leerJson} />
                    </form>

                   

                </div>
                <div className="bloques">
                    {
                        Array(this.state.pila.length).fill({}).map((_e, i) => (
                            <div className="container__bloques animate__animated animate__backInDown">{this.state.pila.get(i).value}</div>
                        ))

                    }

                </div>
            </div>
        )
    }
}





export default StackComponent;
