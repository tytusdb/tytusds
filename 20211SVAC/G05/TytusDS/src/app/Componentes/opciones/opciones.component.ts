import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css','../../../../css/bootstrap.min.css']
})
export class OpcionesComponent implements OnInit {

  @Output() opcionesEvento = new EventEmitter<any>();

  ingreso = 'final';
  velocidadLineales = 1000;
  repeticionLineales = true;
  velocidadOrdenamientos = 1000;
  velocidadArboles = 1000;
  grado = 3;
  repeticionArboles = true;
  sizeNoLineales = 10;
  funcionHash = "simple";
  rangoHashMinimo = 45;
  rangoHashMaximo = 85;
  pruebaHashCerrado = "lineal";
  velocidadNoLineales = 2000;

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

  guardarOpciones(): void {
    const opciones = {
      ingreso: this.ingreso,
      velocidadLineales: this.velocidadLineales,
      repeticionLineales: this.repeticionLineales,
      velocidadOrdenamientos: this.velocidadOrdenamientos,
      velocidadArboles: +this.velocidadArboles,
      grado: +this.grado,
      repeticionArboles: this.repeticionArboles,
      sizeNoLineales: this.sizeNoLineales,
      funcionHash: this.funcionHash,
      rangoHashMinimo: this.rangoHashMinimo,
      rangoHashMaximo: this.rangoHashMaximo,
      pruebaHashCerrado: this.pruebaHashCerrado,
      velocidadNoLineales: this.velocidadNoLineales,
    };
    this.opcionesEvento.emit(opciones);
    this.op_cerrada();
  }
  

}
