import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../services/documento.service';
import { Cow} from './js/cow';
import { saveAs } from 'file-saver';
declare var require: any;
let Lista=require('./js/cow');
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-cow',
  templateUrl: './cow.component.html',
  styleUrls: ['./cow.component.css']
})
export class CowComponent implements OnInit {
  opciones = {
    sizeNoLineales: 10,
    funcionHash: "simple",
    rangoHashMinimo: 45,
    rangoHashMaximo: 85,
    pruebaHashCerrado: "lineal",
    velocidadNoLineales: 2000,
    constante: 0.1625277911
  };
  lista=Lista;
  grafo;
  m = '';
  n = '';
  nx = '';
  ny = '';
  nvalor = '';
  valorAgregar = '';
  valorAgregar1 = '';
  valorAgregar2 = '';
  valorEliminar = '';
  valorAntiguo = '';
  valorActualizar = '';
  valorBuscar = '';

  primero = true;



  constructor(private documentoService: DocumentoService) {
    this.lista=new Lista();
  }

  ngOnInit(): void {}

  getOpciones(opciones: any): void {
    this.opciones = opciones;
    console.log(opciones);
  }

  getDocumento(documento: any): void{
    this.documentoService.getDocumento(documento).then( contenido => {
      
        this.agregar1(contenido['m'][0],contenido['m'][1])

      contenido['valores'].forEach(valor => { 
        this.lista.agregar(valor['indices'][0],valor['indices'][1],valor['valor'])
        });   
        this.lista.tabla();
        this.lista.tabla1();
        this.lista.imprimir2();
       
      
      });
}


actual(){
  this.list();
  this.list1();
}

  agregar(v1,v2,v3){
   this.lista.agregar(v1,v2,v3)
   this.lista.tabla();
   this.lista.tabla1();
    this.lista.imprimir2();
    this.list();
    this.listx(v1,v2)
    this.nx="";
    this.ny="";
    this.nvalor="";
  }

  agregar1(v1,v2){
    this.lista.matriz(v1,v2)
    this.m="";
    this.n="";
    
   }

  eliminar(v1,v2) {
    this.lista.eliminar(v1,v2);
    this.lista.tabla();
    this.lista.tabla1();
    this.lista.imprimir2();
    this.list();
    this.listx(v1,v2)
    this.m="";
    this.n="";
  }

  actualizar(v1,v2,nuevo){
    this.lista.modificar(v1,v2,nuevo);
    this.lista.tabla();
    this.lista.tabla1();
    this.lista.imprimir2();
    this.list();
    this.listx(v1,v2)
    this.nx="";
    this.ny="";
    this.nvalor="";
  }

  buscar(x,y){
  this.anibus(x,y);
  this.m="";
    this.n="";


  }

  graficar(){
   
  }

  guardar(): void {
    const contenido: any = {
      categoria: "Estructura No Lineal",
      nombre: "Row/Column Major",
      animacion:10,
      m: [],
      valores: []
    };
    contenido.m=contenido.m.concat(this.lista.leer1());
    contenido.valores=contenido.valores.concat(this.lista.leer());
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'cow major.json');
  }

  list(){
    let contenedor= document.getElementById("myDiv1");
    let datos=this.lista.vector();
    let Nodos=datos[0];
    let edges=datos[1];
    let data={nodes:Nodos,edges:edges};
  
    let opciones={
      edges:{
        font: {
          align: "top"
        },
        arrows:{
          to:{
            enabled:false
          }
        },
        color:{
          color:"#013ADF"
        }
      },
      nodes:{
        color:{
          border:"white",background:"rgb(25, 25, 112)"
        },
        font:{
          color:"white"
        }
      },
      physics:{
        enabled: false},
      layout:{
        hierarchical: {
          direction: "LR",
          sortMethod: "directed",
          nodeSpacing: 20,
          treeSpacing: 50
        }
      }
    };
    this.grafo= new vis.Network(contenedor,data,opciones);
    }


    anibus(x,y){
      let h=this.lista.mapeo(x,y);
      let gl=this.grafo;
      var n=0;
        let AnimLista = setInterval(function(){
          if(n<=h.length){
            let nodo=h[n];
            if(nodo!=""){
              if(nodo!=null){
                //id:F#C#
                let id=nodo;
                let options={
                  scale: 5,
                 
                  locked: false,
                  animation: {
                    //duración en ms
                    duration: 1000,
                    easingFunction: "easeInOutQuad"
                  }
                }
          
                gl.focus(id,options);
              }
            }
              
        
            if(n== h.length){
              alert("Dato encontrado con: fila + columna*#filas");
            
        
              clearInterval(AnimLista);
            }
            n++;
    
          }
        
        },1000);
    
    
    
      
    
      
    }
    list1(){
      let h=this.lista.mapeo1();
      let gl=this.grafo;
      var n=0;
        let AnimLista = setInterval(function(){
          if(n<=h.length){
            let nodo=h[n];
            if(nodo!=""){
              if(nodo!=null){
                //id:F#C#
                let id=nodo;
                let options={
                  scale: 5,
                 
                  locked: false,
                  animation: {
                    //duración en ms
                    duration: 1000,
                    easingFunction: "easeInOutQuad"
                  }
                }
          
                gl.focus(id,options);
              }
            }
              
        
            if(n== h.length){
              alert("Datos guardados");  
            
        
              clearInterval(AnimLista);
            }
            n++;
    
          }
        
        },1000);
    
    
    
      
    
      
    }

    listx(x,y){
      let h=this.lista.verificar(x,y);
            let nodo=h;
            if(nodo!=""){
              if(nodo!=null){
                //id:F#C#
                let id=nodo;
                let options={
                  scale: 5,
                 
                  locked: false,
                  animation: {
                    //duración en ms
                    duration: 1000,
                    easingFunction: "easeInOutQuad"
                  }
                }
          
                this.grafo.focus(id,options);
              }
            }
           
        
    
    
    
      
    
      
    }


}
