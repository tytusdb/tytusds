import { Component, OnInit } from '@angular/core';
import { ServicioIntento1Service } from "../../Servicios/servicio-intento1.service";

declare var lsimpleAdd:any;
@Component({
  selector: 'app-lista-simple',
  templateUrl: './lista-simple.component.html',
  styleUrls: ['./lista-simple.component.css']
})
export class ListaSimpleComponent implements OnInit {
<<<<<<< HEAD
  displayVal='';
  getValue(val:string){
    console.warn(val)
    this.displayVal=val
  }

=======
>>>>>>> 6a464cd90a9f8c91775401daa836ce43bb4202fe
 
  elementos: any=[]

  constructor(private servicio: ServicioIntento1Service ) { }

  ngOnInit(): void {}
  add(dato:any){ lsimpleAdd(dato) }
  

}