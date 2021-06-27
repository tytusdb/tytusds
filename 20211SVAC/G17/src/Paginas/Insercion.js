import React, {Component, component} from "react";
import {Bar} from "react-chartjs-2";
let arreglo = [4025,
    7677,
    3875,
    8107,
    7531,
    4912,
    9515,
    3150,
    1593,
    3114,
    3943,
    3616,
    636,
    5351,
    6885,
    634,
    5761,
    9193,
    5218,
    1949,
    5386,
    6154,
    7323,
    3221,
    2508,
    5443,
    9096,
    7239,
    795,
    7735,
    890,
    1167,
    7555,
    6764,
    1998,
    7113,
    8213,
    8894,
    10,
    540,
    2132,
    7847,
    5041,
    3295,
    5668,
    1842,
    8142,
    3909,
    2499,
    8546]
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