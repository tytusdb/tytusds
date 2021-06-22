import React, {Component}from "react";
import {Bar} from "react-chartjs-2";
import {useState,useEffect} from "react";
import axios from 'axios';


var arreglo =[
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
    8546]





class Burbuja extends Component {
    onFileChange = event =>{
        this.setState({
            selectedFile: event.target.files[0]
        });
    }


    onFileUpload = ()=>{
        const formData = new FormData();
        formData.append(
            "myfile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        console.log(this.state.selectedFile)
        axios.post("burbuja", formData)
    }




    constructor() {
        super();
        this.state={
            barChartData:[],
            selectedFile:null

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
    fileData=()=>{
        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Escoge un archivo.json luego presiona en subir</h4>
                </div>
            );
        }
    };


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
                <center><button onClick={this.change1}>Ordenar</button></center>
                <h3>Ver en consola :3</h3>
                <center>Arreglo:</center>
                <h4> [{arreglo.toString()}]</h4>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Subir!
                    </button>
                </div>
                {this.fileData()}

            </div>
        )
    }

}


export default (Burbuja);



