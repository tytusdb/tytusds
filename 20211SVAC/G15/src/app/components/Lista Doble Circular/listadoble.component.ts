import { Component, OnInit } from '@angular/core';
import { ListaDobleCircular } from '../../helpers/DobleEnlazadaCircular/ListaDobleCircular'

@Component({
  selector: 'app-listadoble',
  templateUrl: './listadoble.component.html',
  styleUrls: ['./listadoble.component.css']
})
export class ListadobleCircularComponent implements OnInit {
  numero:number
  listaNumeros:any
  listaDoble:ListaDobleCircular

  constructor() { }

  ngOnInit(): void {
    this.listaDoble = new ListaDobleCircular()
  }

  add(){
    this.listaDoble.add(this.numero)
    this.listaNumeros = this.listaDoble.show()
    this.numero = 0

  }

}
