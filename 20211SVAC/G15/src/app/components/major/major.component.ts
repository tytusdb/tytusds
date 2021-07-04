import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.css']
})
export class MajorComponent implements OnInit {
  fileName

  arreglo: any[][] = []
  major: any[]

  duracion: number = 0.3
  constructor() { }

  ngOnInit(): void {
    this.llenarArreglo()
  }


  llenarArreglo() {

    this.arreglo = [
      [3, 4, 8, 6, 9],
      [1, 6, 7, 5, 10]
    ]
  }

  async rowMajor() {

    this.major = []
    if (this.arreglo.length > 0) {
      let n = this.arreglo.length;
      let m = this.arreglo[0].length;
      let temp = new Array(n * m)

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          temp[i * m + j] = this.arreglo[i][j]
        }
      }

      for (let i = 0; i < temp.length; i++) {
        this.major.push(temp[i])
        await this.sleep(this.duracion * 1000)
      }
    }

  }

  async colMajor() {
    this.major = []
    if (this.arreglo.length > 0) {
      let n = this.arreglo.length;
      let m = this.arreglo[0].length;
      let temp = new Array(n * m)

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          temp[j * n + i] = this.arreglo[i][j]
        }
      }

      for (let i = 0; i < temp.length; i++) {
        this.major.push(temp[i])
        await this.sleep(this.duracion * 1000)
      }
    }
  }



  async onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {

      this.fileName = file.name;
      let data: any = await this.processFile(file)
      data = JSON.parse(data)
      this.duracion = +data.animacion
      let x = +data.m[0]
      let y = +data.m[1]
      let temp = Array.from(Array(x), () => new Array(y));
      data = data.valores
      for (let i = 0; i < data.length; i++) {
        let valor = data[i]
        temp[+valor.indices[0]][+valor.indices[1]] = valor.valor
      }
      this.arreglo = temp

      Swal.fire({
        icon: 'success',
        title: ':)',
        text: `Recorrido Completo `
      })


    }
  }

  async processFile(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onload = (event) => {
        resolve(event.target.result.toString())
      }
      reader.onerror = reject;

      reader.readAsText(file);
    })
  }


  generarJSON() {
    let data = {
      categoria: "Estructura Compuesta",
      nombre: "Row/Column Major",
      animacion: this.duracion,
      valores: []
    }

    for (let i = 0; i < this.arreglo.length; i++) {
      for (let j = 0; j < this.arreglo[i].length; j++) {
        if (this.arreglo[i][j]) {
          data.valores.push({
            indices : [i,j],
            valor: this.arreglo[i][j]
          })
        }
      }
    }
    let jsonData = JSON.stringify(data)
    var link = document.createElement("a");
    link.download = "data.json";
    var info = "text/json;charset=utf-8," + encodeURIComponent(jsonData);
    link.href = "data:" + info;
    link.click();
    link.remove()
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
