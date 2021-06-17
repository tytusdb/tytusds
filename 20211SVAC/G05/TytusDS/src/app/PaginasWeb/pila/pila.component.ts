import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
declare var require: any;
let Lista=require('./js/Pila');
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-pila',
  templateUrl: './pila.component.html',
  styleUrls: ['./pila.component.css','../../../../css/bootstrap.min.css','../../../../vis-4.21.0/dist/vis.css']
})
export class PilaComponent implements OnInit {
  lista=Lista;

  constructor(private documentoService: DocumentoService) {
  this.lista=new Lista();
  }

  ngOnInit(): void {
  }

  getDocumento(documento: any): void{
    this.documentoService.getDocumento(documento).then( contenido => {
      console.log(contenido);
      contenido['valores'].forEach(valor => { 
        this.lista.guardar(valor)
        
        });     
    
    
    });




  }

  Add(valor){
   let add= this.lista.guardar(valor);
   if (this.Add!==null){
  }else{
    alert("Dicho nodo no ha sido ingresado")
  }
    
  
    //this.graficar();
  }
  delete(){
    this.lista.desapila();
    

  }
 bus(valor){
    let bus= this.lista.buscar(valor);
    if (bus!==null){
    }else{
      alert("Dicho nodo no ha sido ingresado")
    }

  }

  modi(valor,valor1){
    let bus= this.lista.modificar(valor,valor1);
    if (bus!==null){
    }else{
      alert("Dicho nodo no ha sido ingresado")
    }

  }




  //OPCIONES PARA GRAFICAR------------------------
  //

}
