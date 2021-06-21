import React, {Component} from "react";
import {Bar} from "react-chartjs-2";


let arreglo = [
    4025,
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
    8546
];
let cambios = 0;



class Seleccion extends Component {

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

        for (let i = cambios; i< arreglo.length; i++){ //Aquí vamos a buscar el número mínimo en el array que no está ordenado
            let min = i; //Establecemos nuestro número actual como mínimo
            for (let j = i+1;j < arreglo.length ; j++){  //utilizamos el segundo valor
                console.log("Comparamos "+arreglo[j] + " < "+arreglo[min])
                if(arreglo [j] < arreglo[min]){ // comparamos si j es menor que nuestro actual
                    console.log("Si es menor, cambiamos")
                    min = j; // cambiamos nuestro numero actual con j
                }
            }
            if(min !== i){
                let tmp = arreglo[i]; //utilizamos como temporal nuestro número
                arreglo[i]= arreglo[min]; //cambiamos nuestro número mínimo con el actual
                arreglo[min] = tmp; //
                console.log("cambiamos el array")
                console.log("##########")
                cambios++
                break;
            }
            console.log("No cambiamos el array")
            console.log("##########")
            cambios ++
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
                <center><button onClick={this.change1}>Ordenar</button></center>
                <h3>Ver en consola :3</h3>
                <center>Arreglo:</center>
                <h4> [{arreglo.toString()}]</h4>
            </div>
        )
    }

}

export default Seleccion;