import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

declare var lsimpleAdd:any;
declare var convertToText:any;
declare var lsimpleCargar:any;
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
    
  }
  
  onUpload(){
    console.log(this.selectedFile)
    lsimpleCargar(this.selectedFile)
    //let fileReader = new FileReader();
    console.log(String(this.selectedFile))
    console.log(JSON.stringify(this.selectedFile))
    var hola = convertToText(this.selectedFile)
    console.log('a = ' + hola)
    console.log('Item: ' + JSON.stringify(this.selectedFile));
    JSON.parse(JSON.stringify(this.selectedFile))


    
  }

}