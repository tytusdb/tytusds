import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

declare var lsimpleAdd:any;
declare var lsimpleCargar:any;
declare var anima:any;
@Component({
  selector: 'app-lista-simple',
  templateUrl: './lista-simple.component.html',
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
  add(dato:any){ lsimpleAdd(dato) }
  
  selectedFile = null;
  onFileSelected(event:any){
    console.log(event)
    
    this.selectedFile = event.target.files[0]
    let fileReader = new FileReader();
    fileReader.onload = function(event){

    }
  }
  
  onUpload(){
    console.log(this.selectedFile)
    lsimpleCargar(this.selectedFile)
    console.log(String(this.selectedFile))
    
  }
  animar(){
    anima()
  }


  }

