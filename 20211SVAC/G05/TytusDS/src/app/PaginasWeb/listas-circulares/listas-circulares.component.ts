import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
declare var require: any;
let Lista=require('./js/ListaCircular');
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-listas-circulares',
  templateUrl: './listas-circulares.component.html',
  styleUrls: ['./listas-circulares.component.css','../../../../vis-4.21.0/dist/vis.css']
})
export class ListasCircularesComponent implements OnInit {
  lista=Lista;
  opciones = {
    ingreso: 'final',
    velocidadLineales: 1000,
    repeticionLineales: true,
    velocidadOrdenamientos: 1000,
    velocidadArboles: 1000,
    grado: 3,
    repeticionArboles: true,
  };

  constructor(private documentoService: DocumentoService) {
  this.lista=new Lista();
  }

  ngOnInit(): void {
  }
  ///CAMBIO DE OPCIONES--------------------------------------
  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }
  //LEER ARCHIVOS DE ENTRADA--------------------------------
  getDocumento(documento: any): void{
    this.documentoService.getDocumento(documento).then( contenido => {
      console.log(contenido);
      contenido['valores'].forEach(valor => {
        this.Add1(valor);
      });
      this.graficar();
    });

  }
  //Add sin graficar
  Add1(valor){
    //Con la opcion de repetir activada
    if(this.opciones['repeticionLineales']===true){
      this.lista.repeat=true;
    }else{
      this.lista.repeat=false;
    }
    this._Add(valor)
  }
  //AGREGAR UN NODO---------------------------
  Add(valor){
    //Con la opcion de repetir activada
    if(this.opciones['repeticionLineales']===true){
      this.lista.repeat=true;
    }else{
      this.lista.repeat=false;
    }
    this._Add(valor)
    this.graficarI();
  }
  _Add(valor){
    //Ingresar al final
   if(this.opciones['ingreso']==='final'){
     this.lista.appendF(valor);
     //Ingresar al inicio
   }else if (this.opciones['ingreso']==='inicio'){
     this.lista.appendI(valor);
     //Ingresar de forma ordenada
   }else{
     this.lista.appendO(valor);
   }
  }
  //ELIMINAR UN NODO
  delete(valor){
    let eliminar=this.lista.eliminar(valor);
    if (eliminar!==null){
      this.graficar();
    }else{
      alert("Dicho nodo no ha sido ingresado")
    }

  }
  //ACTUALIZAR UN NODO
  update(valor,new_valor){
    let act=this.lista.actualizar(valor,new_valor)
    if(act!=null){
      this.graficar();
    }else{
      alert("Dicho nodo no ha sido ingresado")
    }
  }
  //OPCIONES PARA GRAFICAR------------------------
  graficar():void{
    //Retorno de la lista con los objetos de nodos y edges
    let Nodos=this.lista.Lnodos();
    let Edges=this.lista.Ledges();
    //se escoge el div a utilizar como contenedor
    let contenedor= document.getElementById("contenedor");
    let datos={nodes:Nodos,edges:Edges};
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
    let grafo= new vis.Network(contenedor,datos,opciones);
    //OPCIONES ANIMACION:
    //n:contador velE:velocidad de estiramiento dur:duración
    let n = 0, velE = 100, dur =this.opciones['velocidadLineales'];
    // xinicio,yinicio: Distancia desde el centro, x y y positivo mandan hacia la derecha y abajo respectivamente
    //x y y negativos mandan a la izquierda y arriba respectivamente
    let xinicio =0, yinicio=0
    //NEst=numero de estiramientos que tendran los nodos Math.floor redondea al valor entero hacia la izquierda
    var NEst = Math.floor( dur / velE);
    //Obtencion de las posicionesa actuales de los nodos
    let pos=grafo.getPositions();
    let AnimLista = setInterval(function(){
      n++;
      //Por_est: porcentaje para estirarse, si NEst es muy grande se estirara mas
      //entre mayor sea el porcentaje en cada iteración mas pronto volvera al origen
      let por_est = n / NEst;
      for (let i = 0; i < Nodos.length; i++) {
        //en lugar de i podria ir un string, como se realizaria en un diccionario
        let posx = pos[i].x, posy=pos[i].y;
       //para mover de posicion yinicio * (1 - l) llegara un punto donde l sera 0 y se volver a la posicion
        //de origen.
        let xt =  posx* por_est;
        let yt =  posy * por_est;
        //Mover cada nodo, luego del move los nodos vuelven a su posicion normal
        grafo.moveNode(i,xt,yt);
      }
      //PARA LUEGO DE
      if(n== NEst){
        clearInterval(AnimLista);
      }
    //tiempo de repeticion de cada nodo
    },10);

  }
  //------------------------------------------------------------------------------------------------------
  busqueda(valor){
    let indexDB=this.lista.indexBusqueda(valor);
    console.log(indexDB);
    if(indexDB==this.lista.Size()){
      this.graficarB(this.lista.Size()-1);
    }else{
      this.graficarB(indexDB);
    }
  }
  //graficar busqueda
  graficarB(k){
    //Retorno de la lista con los objetos de nodos y edges
    let Nodos=this.lista.Lnodos();
    let Edges=this.lista.Ledges();
    //se escoge el div a utilizar como contenedor
    let contenedor= document.getElementById("contenedor");
    let datos={nodes:Nodos,edges:Edges};
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
    let grafo= new vis.Network(contenedor,datos,opciones);
    //OPCIONES ANIMACION:
    //n:contador velE:velocidad de estiramiento dur:duración
    let n = 0, velE = 100, dur =this.opciones['velocidadLineales'];
    //NEst=numero de estiramientos que tendran los nodos Math.floor redondea al valor entero hacia la izquierda
    var NEst = Math.floor( dur / velE);
    //Obtencion de las posicionesa actuales de los nodos
    let pos=grafo.getPositions();

    let AnimLista = setInterval(function(){

      //Por_est: porcentaje para estirarse, si NEst es muy grande se estirara mas
      //entre mayor sea el porcentaje en cada iteración mas pronto volvera al origen
      let por_est = n / NEst;
        //en lugar de i podria ir un string, como se realizaria en un diccionario
        let posx = pos[n].x, posy=pos[n].y;
        let xt =  posx* por_est;
        let yt =  posy * por_est;
        //Mover cada nodo, luego del move los nodos vuelven a su posicion normal
        grafo.moveNode(n,xt,yt);

      //PARA LUEGO DE
      if(n==k){
        clearInterval(AnimLista);
      }
      n+=1;
      //tiempo de repeticion de cada nodo
    },dur);
  }
  //graficar ingreso
  graficarI(){
    console.log(this.lista.Lnodos())
    console.log(this.lista.Ledges())
    //Retorno de la lista con los objetos de nodos y edges
    let Nodos=this.lista.Lnodos();
    let Edges=this.lista.Ledges();
    //se escoge el div a utilizar como contenedor
    let contenedor= document.getElementById("contenedor");
    let datos={nodes:Nodos,edges:Edges};
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
    let grafo= new vis.Network(contenedor,datos,opciones);
    //OPCIONES ANIMACION:
    //n:contador velE:velocidad de estiramiento
    let n = 0, velE = 100;
    //NEst=numero de estiramientos que tendran los nodos Math.floor redondea al valor entero hacia la izquierda
    var NEst = Math.floor( duracion / velE);
    //Obtencion de las posicionesa actuales de los nodos
    let pos=grafo.getPositions();
    let AnimLista = setInterval(function(){
      n++;
      //Por_est: porcentaje para estirarse, si NEst es muy grande se estirara mas
      //entre mayor sea el porcentaje en cada iteración mas pronto volvera al origen
      let por_est = n / NEst;
        let posx=pos[Nodos.length-1].x,posy=pos[Nodos.length-1].y;
        //en lugar de i podria ir un string, como se realizaria en un diccionario
        let xt =  posx* por_est;
        let yt =  posy * por_est;
        //Mover cada nodo, luego del move los nodos vuelven a su posicion normal
        grafo.moveNode(Nodos.length-1,xt,yt);

      //PARA LUEGO DE
      if(n== NEst){
        clearInterval(AnimLista);
      }
      //tiempo de repeticion de cada nodo
    },duracion/10);
  }
  //GUARDAR
  guardar(): void {
    const contenido: any = {
      categoria: "Estructura Lineal",
      nombre: "Lista Circular Simplemente Enlazada",
      repeticion:true,
      animacion:10,
      valores: []
    };
    contenido.valores=contenido.valores.concat(this.lista.Rdatos());
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'descarga.json');
  }

}
