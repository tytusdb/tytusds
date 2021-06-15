import { Component, OnInit, ɵɵpureFunction1 } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from "@angular/common/http";
declare var funcion1:any;
declare var noda:any;

@Component({
  selector: 'app-estructuras-lineales',
  templateUrl: './estructuras-lineales.component.html',
  styleUrls: ['./estructuras-lineales.component.css']
})
export class EstructurasLinealesComponent implements OnInit {

  onClick1(){
    funcion1("hola")
    funcion1("assaas")
    
  }
  constructor() { }

  ngOnInit(): void {
  }
}
