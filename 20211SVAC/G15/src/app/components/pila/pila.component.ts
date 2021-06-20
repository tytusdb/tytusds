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
  svg1
  fileName= ""

  repetidos: boolean = false
  velocidad: number = 0.5
  @ViewChild('cuerpoDraw') cuerpoDraw: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.pila = new pila()
    this.svg1 = document.getElementById("svg")
    this.svg1.style.position = 'absolute';
    this.svg1.style.top = '0';
    this.svg1.style.left = '0';
    this.svg1.style.width = '100%';
    this.svg1.style.height = '100vh';
    this.svg1.style.zIndex = '0';
  }

  async push(){
    if (!this.repetidos) {
      let temp = this.pila.search(this.nombre)
      if (temp !== null) {
        Swal.fire({
          target: document.getElementById('form-modal'),
          icon: 'error',
          title: 'Oops...',
          text: `El dato ${this.nombre} ya existe en la pila`
        })
        this.nombre=""
        return -1;
      }
    }
    
      let dibujo = document.getElementById("cuerpoDraw")
      await this.pila.push(this.nombre, this.svg1, dibujo, `${this.velocidad}s`)
      this.nombre=""
    return 1;
  }

}
