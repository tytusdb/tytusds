import React, { Component } from 'react'
import Queue from '../EDD/Queue'
import './queue.css'

export class Cola extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            valorcola: 1,
            cola: new Queue(),
           


        }
    }
      
    handleChange = (e) => {
            console.log({
                name: e.target.name,
                value: e.target.value

            });

            this.setState({
                valorcola: e.target.value
            })
        };

        handleClick = (e) => {
            console.log("banda hay fe")
        };

        handleSubmit = (e) => {
            e.preventDefault();
            console.log("Formulario Subido")
            console.log(this.state.valorcola)
            this.state.cola.enqueue(this.state.valorcola)

            this.setState({
                cola: this.state.cola
            })


        };

        salirDecola = () => {
            this.state.cola.dequeue()
            
            this.setState({
                cola: this.state.cola,
            })
        }
        

        render() {
            return (
                <div>
                        
                    <div className="contenedor-formulario ">
                        <form onSubmit={this.handleSubmit} className="formularioCola">
                            <div className="form-group">
                                <label htmlFor="" className="form__lbl">Ingrese un valor</label>

                                <input 
                                    onChange={this.handleChange}
                                    type="text"
                                    className="form-control label_cola"
                                    name="valorPila"
                                    value={this.state.valorcola}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-secondary"
                                    onClick={this.handleClick} >
                                    agregar
                            </button>
                                <button type="button" className="btn btn-danger" onClick={this.salirDecola}>Borrar</button>
                            </div>
                            <input type="file" onChange={this.leerJson} />
                        </form>



                    </div>
                    <div className="bloques_cola">
                        {
                            Array(this.state.cola.length).fill({}).map((_e, i) => (
                                <div className="container__bloquesCola animate__animated animate__bounceInLeft">{this.state.cola.get(i).value}</div>
                            ))

                        }

                    </div>
                
                </div>
            )
        }


    }




export default Cola
