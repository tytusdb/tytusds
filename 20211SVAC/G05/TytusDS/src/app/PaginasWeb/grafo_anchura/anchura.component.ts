import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
declare var require: any;
let Lista=require('./js/Ganchura');
let vis=require('../../../../vis-4.21.0/dist/vis');
@Component({
  selector: 'app-anchura',
  templateUrl: './anchura.component.html',
  styleUrls: ['./anchura.component.css','../../../../css/bootstrap.min.css','../../../../vis-4.21.0/dist/vis.css']
})
export class AnchuraComponent implements OnInit {
  lista=Lista;
  grafo;
  opcion=true;
  ag = '';
  ag1 = '';
  ag2 = '';
  ag3 = '';
  ag4 = '';
  ag5 = '';
  ag6 = '';
  ag7 = '';
  opciones = {
    ingreso: 'final',
    velocidadLineales: 1000,
    repeticionLineales: true,
    velocidadOrdenamientos: 1000,
    velocidadArboles: 1000,
    grado: 3,
    repeticionArboles: true,
  };

  constructor(private documentoService: DocumentoService)  {
  this.lista=new Lista();
  
  }

  ngOnInit(): void {
  }

  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }


 
  getDocumento(documento: any): void{
    this.documentoService.getDocumento(documento).then( contenido => {
      contenido['valores'].forEach(valor => { 
        this.lista.insertar_vertices(valor['vertice'].toString());
        valor['aristas'].forEach(valor1 => { 
          this.lista.isertar_aristas(valor['vertice'].toString(),valor1['arista'].toString(),valor1['distancia'].toString(),"","");
        }); 
       
        });   
        var s=this.lista.identificar();
      if (s==true){this.graficar1();  this.opcion=false;}
      else{this.graficarb1();  this.opcion=true;}
      alert("Datos guardados");  
      
      
      
      });
  
  
  
}

guardar(): void {
  const contenido: any = {
    categoria: "Estructura No Lineal",
    nombre: "Grafo Dirigido/No Dirigido",
    almacenamiento: "Matriz/Lista",
    animacion:10,
    valores: []
  };
  contenido.valores=contenido.valores.concat(this.lista.leer());
  let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
  saveAs(blob, 'Grafo.json');
}


Add(valor){
    this.lista.insertar_vertices(valor);
    this.ag = '';
    if (this.opcion==true){
  this.graficarb1();
    }else{
  this.graficar1();
    }
    return;
}


Add2(valor1,valor2,peso){
  if (valor1=="" || valor2=="" ||peso==""){
    alert("algun campo esta vacio"); 
  }else{
    if (this.opcion==true){
      this.lista.isertar_aristas(valor1,valor2,peso,"","");
  this.graficarb1();
    }else{
      
      this.lista.isertar_aristas(valor1,valor2,peso,valor1,valor2);
      this.lista.isertar_aristas(valor2,valor1,peso,"","");
  this.graficar1();
    }
    
  this.ag1 = '';
  this.ag2 = '';
  this.ag3 = '';
  return;
  }
  
}

graficar1(){
  let contenedor= document.getElementById("myDiv1");
  let datos=this.lista.as();
  let Nodos=datos[0];
  let edges=datos[1];
  let data={nodes:Nodos,edges:edges};

  //OPCIONES PARA LOS NODOS----------------------------------------------------------
  let opciones={
    edges:{

      color:{
        color:"#013ADF"
      }, 
      arrows:{ 
        to:true,
          from:true
      }
    },
    nodes:{
      color:{
        border:"white",background:"red"
      },
      font:{
        color:"white"
      }
    }, 
    
  };
  //------------------------------------------------------------------------
  this.grafo= new vis.Network(contenedor,data,opciones);
}


graficarb1(){
  let contenedor= document.getElementById("myDiv1");
  let datos=this.lista.as1();
  let Nodos=datos[0];
  let edges=datos[1];
    let data={nodes:Nodos,edges:edges};
    let duracion=this.opciones['velocidadLineales'];
    //OPCIONES PARA LOS NODOS----------------------------------------------------------
    let opciones={
      edges:{
        arrows:{
          to:{
            enabled:true
          }
        },
        color:{
          color:"#013ADF"
        }
      },
      nodes:{
        color:{
          border:"white",background:"red"
        },
        font:{
          color:"white"
        }
      }
    };
    //------------------------------------------------------------------------
    this.grafo= new vis.Network(contenedor,data,opciones);
    
  
}


graficaranchura(){
  let contenedor= document.getElementById("myDiv1");
  let datos=this.lista.asbus();
  let Nodos=datos[0];
  let edges=datos[1];
    let data={nodes:Nodos,edges:edges};
    let duracion=this.opciones['velocidadLineales'];
    //OPCIONES PARA LOS NODOS----------------------------------------------------------
    let opciones={
      edges:{
  
        color:{
          color:"#013ADF"
        }, 
        arrows:{ 
          to:{
            enabled:true
          }
        }
      },
      nodes:{
        color:{
          border:"white",background:"red"
        },
        font:{
          color:"white"
        }
      },
      physics:{
        enabled: true,
        barnesHut: {
          gravitationalConstant: -1000,
          centralGravity: 0.3,
          springLength: 95
        }},
      layout:{
        hierarchical: {
          sortMethod: 'directed',
          nodeSpacing: 200,
          treeSpacing: 400
        }
      } 
      
    };
    //------------------------------------------------------------------------
    this.grafo= new vis.Network(contenedor,data,opciones);
    
  
}


  bus(valor){
    this.lista.bus(valor);
    this.ag3 = '';
    this.graficaranchura()
  }

  delete(valor){
    this.lista.eliminar(valor);
    if (this.opcion==true){
      this.graficarb1();
        }else{
      this.graficar1();
        }
        this.ag = '';
  }


  modi(valor,valor1){
    this.lista.modificar(valor,valor1);
    if (this.opcion==true){
     this.graficarb1();
       }else{
     this.graficar1();
       }
    this.ag4 = '';
    this.ag5 = '';
   }
 
   matriz(){
     this.lista.matriz();
   }
 
 
   list(){
   let contenedor= document.getElementById("myDiv1");
   let datos=this.lista.li();
   let Nodos=datos[0];
   let edges=datos[1];
   let data={nodes:Nodos,edges:edges};
 
   let opciones={
     edges:{
       arrows:{
         to:{
           enabled:true
         }
       },
       color:{
         color:"#013ADF"
       }
     },
     nodes:{
       color:{
         border:"white",background:"red"
       },
       font:{
         color:"white"
       }
     },
     physics:{
       enabled: false},
     layout:{
       hierarchical: {
         direction: "RL",
         sortMethod: "directed",
         nodeSpacing: 10,
         treeSpacing: 50
       }
     }
   };
   this.grafo= new vis.Network(contenedor,data,opciones);
   }




}
