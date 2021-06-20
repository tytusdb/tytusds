import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { pila } from 'src/app/helpers/Pila/pila';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-pila',
  templateUrl: './pila.component.html',
  styleUrls: ['./pila.component.css']
})
export class PilaComponent implements OnInit {

  nombre: number|string
  datoBuscar: number|string
  datoAntiguo: number|string
  datoNuevo: number|string
  pila: pila
  fileName= ""

  repetidos: boolean = false
  velocidad: number = 0.5
  @ViewChild('cuerpoDraw') cuerpoDraw: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.pila = new pila()
    
  }
  async pushbutton(){
    await this.push(this.nombre)
    this.nombre = ""
  }

  async push(dato){
    if (!this.repetidos) {
      let temp = this.pila.search(dato)
      if (temp !== null) {
        Swal.fire({
          target: document.getElementById('form-modal'),
          icon: 'error',
          title: 'Oops...',
          text: `El dato ${dato} ya existe en la pila`
        })
        this.nombre=""
        return -1;
      }
    }
  
    
      let dibujo = document.getElementById("cuerpoDraw")
      await this.pila.push(dato, dibujo, `${this.velocidad}s`)
      this.nombre=""
    return 1;
  }

  async onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {

      this.fileName = file.name;
      let data: any = await this.processFile(file)
      data = JSON.parse(data)
      data = data.valores
      for (let i = 0; i < data.length; i++) {
        await this.push(data[i])
      }


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

}
