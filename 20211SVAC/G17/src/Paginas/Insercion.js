import React, {Component} from "react";
import {Bar} from "react-chartjs-2";
let arreglo = [15,2,5,8,4,1]


class Insercion extends Component {
    constructor() {
        super();
        this.state={
            barChartData:[]

        }
        this.change1= this.change1.bind(this);
    }
    componentDidMount() {
        this.setState({
            barChartData: {
                labels: arreglo,
                datasets: [
                    {
                        backgroundColor: 'rgba(255,99,132,9.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        data: arreglo
                    }
                ]}
        })
    }


    change1(){
        let tamaño = arreglo.length;
        for (let i = 1; i <tamaño; i ++) { //Empezamos en el índice 1
            let numero = arreglo [i];
            let j = i - 1;   //Guardamos el número de la izquierda
            console.log("Comparamos si "+arreglo[j] +" > "+ numero)
            while (j >= 0 && arreglo [j]> numero) {  // SI el izquierdo es mayor que el indice
                console.log("Cambiamos "+arreglo[j+1]+" por "+arreglo[j])
                arreglo [j + 1] = arreglo [j];  // Cambiamos el índice
                j = j - 1;
                console.log("___________________")
                break;
            }
            arreglo [j + 1] = numero;
        }

        this.setState({
            barChartData: {
                labels: arreglo,
                datasets: [
                    {
                        backgroundColor: 'rgba(255,99,132,9.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        data: arreglo
                    }
                ]}
        })
    }


    render(){
        return (
            <div>
                <Bar data = {this.state.barChartData}/>
                <button onClick={this.change1}>Ordenar</button>
                <h3>Ver en consola :3 Arreglo: {arreglo.toString()}</h3>
            </div>
        )
    }

}



export default Insercion;