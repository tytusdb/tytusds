import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
declare var lsimpleAdd:any;
declare var lsimpleRefresh:any;
declare var lsimpleSearch:any;
declare var lsimpleDelete:any;
@Component({
  selector: 'app-lista-simple',
  templateUrl:'./lista-simple.component.html',
  styleUrls: ['./lista-simple.component.css']
})
export class ListaSimpleComponent implements OnInit {
  displayVal='';


  getValue(val:string){
    console.warn(val)
    var hola = lsimpleAdd(val)
    this.displayVal=hola
  }

  elementos: any=[]

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}
  
  selectedFile = null;
 
  getRefresh(valactual:string,valreplace:string){
    lsimpleRefresh(valactual,valreplace)
  }
  getSearch(val:string){
    lsimpleSearch(val)
  }
  getDelete(val:string){
    lsimpleDelete(val)
  }
}

