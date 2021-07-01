import { Component, OnInit } from '@angular/core';

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

      for(let i = 0; i < temp.length; i++){
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

      for(let i = 0; i < temp.length; i++){
        this.major.push(temp[i])
        await this.sleep(this.duracion * 1000)
      }
    }
  }


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
