import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css','../../../../css/bootstrap.min.css']
})
export class OpcionesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  op_abierta():void{
    let Opciones=document.getElementById("OpPrin");
    Opciones!.setAttribute("class","oscure activo");
  }
  op_cerrada():void{
    let Opciones=document.getElementById("OpPrin");
    Opciones!.setAttribute("class","oscure");
  }
  Inicio():void{

  }

}
