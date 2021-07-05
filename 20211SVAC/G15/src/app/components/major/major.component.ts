import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.css']
})
export class MajorComponent implements OnInit {
  fileName
  m: number = 5
  n: number = 6

  mAdd: number = 0
  nAdd: number = 0
  value: number | string = ''

  valueBuscar: number | string = ''


  valueViejo: number | string = ''
  valueNuevo: number | string = ''

  valueEliminar: number | string = ''


  flagCrado: boolean = false

  arreglo: any[][] = []
  major: any[]

  duracion: number = 1
  constructor() { }

  ngOnInit(): void {

  }




  async add() {

    if (this.mAdd >= this.m || this.mAdd < 0 || this.nAdd >= this.n || this.nAdd < 0) {
      Swal.fire({
        icon: 'error',
        title: ':(',
        text: `Ingresa Coordenadas Correctas`
      })
      return
    }

    if (!this.flagCrado) {
      this.arreglo = Array.from(Array(this.n), () => new Array(this.m))
      this.flagCrado = true
    }

    this.arreglo[this.nAdd][this.mAdd] = this.convertir(this.value)

    await this.sleep(100)
    let id = "nodo" + this.mAdd + "-" + this.nAdd
    await this.animateNode(id, 'headShake', this.duracion + 's')

    this.mAdd = 0
    this.nAdd = 0
    this.value = 0
  }
  async search() {
    let flag: boolean = false
    let x = 0
    let y = 0
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        let id = "nodo" + j + "-" + i
        await this.animateNode(id, 'jello', this.duracion + 's')
        if (flag) break;
        if (this.convertir(this.arreglo[i][j]) === this.convertir(this.valueBuscar)) {
          x = j
          y = i
          flag = true
          break;
        }
      }
      if (flag) break;
    }

    if (flag) {
      Swal.fire({
        icon: 'success',
        title: ':)',
        text: `Se encontro el valor ${this.valueBuscar} en la coordenada x: ${x} y: ${y} `
      })
      this.valueBuscar = ''
    }
    else {
      Swal.fire({
        icon: 'error',
        title: ':/',
        text: `No se encontro el valor ${this.valueBuscar} `
      })
    }

  }

  async edit() {
    let flag: boolean = false
    let x = 0
    let y = 0
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        let id = "nodo" + j + "-" + i
        await this.animateNode(id, 'jello', this.duracion + 's')
        if (flag) break;
        if (this.convertir(this.arreglo[i][j]) === this.convertir(this.valueViejo)) {
          this.arreglo[i][j] = this.convertir(this.valueNuevo)
          x = j
          y = i
          flag = true
          break;
        }
      }
      if (flag) break;
    }

    if (flag) {
      Swal.fire({
        icon: 'success',
        title: ':)',
        text: `Se Edit el valor ${this.valueViejo} en la coordenada x: ${x} y: ${y} `
      })
      this.valueViejo = ''
      this.valueNuevo = ''
    }
    else {
      Swal.fire({
        icon: 'error',
        title: ':/',
        text: `No se encontro el valor ${this.valueViejo} `
      })
    }

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

  async delete() {
    let flag: boolean = false
    let x = 0
    let y = 0
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        let id = "nodo" + j + "-" + i
        await this.animateNode(id, 'jello', this.duracion + 's')
        if (flag) break;
        if (this.convertir(this.arreglo[i][j]) === this.convertir(this.valueEliminar)) {
          await this.animateNode(id, 'fadeOut', this.duracion + 's')
          this.arreglo[i][j] = ''
          x = j
          y = i
          flag = true
          break;
        }
      }
      if (flag) break;
    }

    if (flag) {
      Swal.fire({
        icon: 'success',
        title: ':)',
        text: `Se Elimino el valor ${this.valueEliminar} en la coordenada x: ${x} y: ${y} `
      })
      this.valueEliminar = ''
    }
    else {
      Swal.fire({
        icon: 'error',
        title: ':/',
        text: `No se encontro el valor ${this.valueEliminar} `
      })
    }
  }



  async onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {

      this.fileName = file.name;
      let data: any = await this.processFile(file)
      data = JSON.parse(data)
      this.duracion = +data.animacion
      this.m = +data.m[0]
      this.n = +data.m[1]
      this.flagCrado = true
      this.arreglo = Array.from(Array(this.n), () => new Array(this.m));
      data = data.valores
      for (let i = 0; i < data.length; i++) {
        let valor = data[i]
        this.arreglo[+valor.indices[1]][+valor.indices[0]] = valor.valor
        await this.sleep(100)
        let id = "nodo" + +valor.indices[0] + "-" + +valor.indices[1]
        await this.animateNode(id, 'headShake', this.duracion + 's')
      }
     

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
            indices: [i, j],
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


  animateNode(element, animation, duration) {
    let prefix = 'animate__'
    return new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      const node = document.getElementById(element);
      node.classList.add(animationName)
      node.style.setProperty('--animate-duration', duration);

      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(animationName);
        resolve('Animation ended');
      }

      node.addEventListener('animationend', handleAnimationEnd, { once: true });

      //resolve('Animation ended');
    });
  }

  private convertir(value) {
    if (isNaN(value)) return value
    return +value
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
