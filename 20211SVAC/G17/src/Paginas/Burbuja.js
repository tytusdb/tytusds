import React, {Component, component} from "react";
import {Bar,Line,Pie} from "react-chartjs-2";

var arreglo =[23,4,6,7,10,11,4545,20,80,90]

class Burbuja extends Component {

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
        for (let i = 0; i < arreglo.length; i++) {
            for (let j = 0; j < arreglo.length; j++) {
                console.log("Comparamos "+arreglo[j] +" > "+ arreglo[j+1])
                console.log("¿Es mayor?")
                if (arreglo[j] > arreglo[j + 1]) {
                    console.log("Si")
                    console.log("Cambiamos")
                    let temp = arreglo[j];
                    arreglo[j] = arreglo[j + 1];
                    arreglo[j + 1] = temp;
                    console.log("__________")
                }
                console.log("No")
            }
            console.log("##########" )
            break;
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

export default Burbuja;