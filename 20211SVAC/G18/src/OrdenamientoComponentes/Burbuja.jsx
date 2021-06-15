import React, { Component } from 'react'
import './burbuja.css'

export class Burbuja extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            valorBurbuja: 1,
            burbuja: []
        }
       
    }

    handleClick = (e) => {
        console.log("bonton regresar presionado")
    };

    handleChange = (e) => {
        // console.log({
        //     name: e.target.name,
        //     value: e.target.value

        // });

        this.setState({
            valorBurbuja: e.target.value
        })
    };


    handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Formulario Subido")
        // console.log(this.state.valorBurbuja)
        this.state.burbuja.push(parseInt(this.state.valorBurbuja))

        this.setState({
            burbuja: this.state.burbuja
        })
    };


    ordenamiento = () =>{

        const tamañoLista = this.state.burbuja.length
        const listaBurbuja = this.state.burbuja
     
        for (let i = 1; i < tamañoLista; i++) {
            for (let j = 0; j < (tamañoLista - i); j++) {
                if (listaBurbuja[j] > listaBurbuja[j +  1]) {
                    this.aux = listaBurbuja[j];
                    listaBurbuja[j] = listaBurbuja[j + 1];
                    listaBurbuja[j + 1] = this.aux
                    console.log(listaBurbuja)

                }
            }
        }
        this.setState({
            burbuja: listaBurbuja,
        })

       
    }

    

    render() {
        console.log(this.state.burbuja)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="burbuja">

                        <div className="burbuja__botones">
                            <button
                                onClick={this.handleClick}
                                type="submit"
                            >
                                Agregar
                            </button>
                            <button
                            onClick={this.ordenamiento}
                            type="button"
                            >

                                ordenar
                            </button>
                        </div>
                        <div className="burbuja_text">
                            <input
                                type="text"
                                className="burbuja_text__box"
                                name="valorBurbuja"
                                onChange={this.handleChange}
                                value={this.state.valorBurbuja}
                                placeholder="Agreue un valor" 
                                />
                        </div>
                    </div>
                </form>



            </div>
        )
    }
}

export default Burbuja
