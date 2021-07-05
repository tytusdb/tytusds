import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { NodoGrafo } from 'src/app/helpers/NodoGrafo/NodoGrafo';
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';
declare var vis: any;

@Component({
  selector: 'app-grafo-no-dirigido',
  templateUrl: './grafo-no-dirigido.component.html',
  styleUrls: ['./grafo-no-dirigido.component.css']
})
export class GrafoNoDirigidoComponent implements OnInit {

  @ViewChild('visNetwork', { static: false }) visNetwork!: ElementRef;
  private networkInstance: any;

  arregloDistancias=[]
  matris: any[][] = []
  GrafoRol: boolean = true;
  distancia: any;
  vector: any;
  arista: any
  datoBuscar: any
  datoEliminar: any
  datoModificar: any
  datoModificado: any
  GrafoInicio: NodoGrafo = null;
  mostrarRecorrido = null;
  fileName = ""
  repetidos: boolean = false
  velocidad: number = 0.5
  alfinal: boolean = true
  alinicio: boolean = false
  ordenado: boolean = false
  nodes = []
  edges = []
  //graficar
  constructor() { }
  ngOnInit(): void {



  }

  menorDistancia(){
   
    //let min = Math.min(this.arregloDistancias)
     // console.log(min)
    
  
  }

  Recorrido(opcion) {
    if (opcion) {

      this.mostrarRecorrido = "RecorridoProfundidad:->";
      this.GraficarRecprridoProfundidad(this.GrafoInicio);
      this.nodes = []
      this.edges = []
      let arreglo = `${this.mostrarRecorrido}`.split('->');
      for (let x = 1; x < arreglo.length - 1; x++) {
        const element = arreglo[x];
        this.nodes.push({ id: `${x}${element}`, label: `Nodo ${element}` })
        this.edges.push({ from: `${x}${element}`, to: `${x + 1}${arreglo[x + 1]}` })

      }
      this.ngAfterViewInit();
    } else {
      this.mostrarRecorrido = "RecorridoAnchura:";
      for (let x = 0; x < 500; x++) {
        this.GraficarRecorridoAnchura(x, this.GrafoInicio);

      }

      this.nodes = []
      this.edges = []
      let arreglo = `${this.mostrarRecorrido}->`.split('->');
      for (let x = 1; x < arreglo.length - 1; x++) {
        const element = arreglo[x];
        this.nodes.push({ id: `${x}${element}`, label: `Nodo ${element}` })
        this.edges.push({ from: `${x}${element}`, to: `${x + 1}${arreglo[x + 1]}` })

      }
      this.ngAfterViewInit();
    }

  }

  GraficarRecorridoAnchura(altura: number, nodo: NodoGrafo) {
    if (nodo.altura === altura) {
      this.mostrarRecorrido = `${this.mostrarRecorrido}->${nodo.id}`
    }
    nodo.hijos.forEach(element => {
      this.GraficarRecorridoAnchura(altura, element);
    });

  }
  ngAfterViewInit(): void {
    // create an array with nodes
    const nodes = new DataSet<any>(this.nodes);

    // create an array with edges
    const edges = new DataSet<any>(this.edges);

    const data = { nodes, edges };

    const container = this.visNetwork;
    this.networkInstance = new Network(container.nativeElement, data, {
      height: '100%',
      width: '100%',
      nodes: {
        shape: 'hexagon',
        font: {
          color: 'white',
        },
      },
      edges: {
        smooth: false,
        arrows: {
          to: {
            enabled: false,
            type: 'vee',
          },
        },
      },
    });
  }
  async insertanButton() {
    if (this.arista == "" || this.distancia == "" || this.vector == "") {
      alert("Llene todos los campos")
      return
    }
    if (this.GrafoInicio === null) {
      this.GrafoInicio = new NodoGrafo(this.vector, 0, 0);
      let nodo = this.GrafoInicio.insertar(this.arista, Number(this.distancia), 1);
      nodo.insertar(this.GrafoInicio.id, Number(this.distancia), 0)
      this.GrafoInicio.insertar(this.arista, Number(this.distancia), 1);
      alert("Nodo ingresado")
    }
    else {
      let aux = this.GrafoInicio.buscar(this.vector);
      if (aux !== null) {
        let nodo = aux.insertar(this.arista, Number(this.distancia), aux.altura + 1);
        nodo.insertar(aux.id, Number(this.distancia), aux.altura)
        alert("Nodo ingresado")
      }
      else { alert("Vector no encontrado") }

    }
    this.vector = this.distancia = this.arista = ""
  }

  buscar(){
    // console.log("entre al metodo")
    this.GraficarBusqueda(this.GrafoInicio,0,"");
    var result = this.GrafoInicio.buscar(this.datoBuscar)
    if(result===null) { alert("No existe el Vector Ingresado")}
    else{alert("Se encontro el vector")}
  }


  //Busqueda por profundidad :v
  GraficarBusqueda(nodo: NodoGrafo, distancia: number, nodos: string) {
  //  this.mostrarRecorrido = "RUTAS" + "\n"
    nodos = `${nodos} ${nodo.id}->`
    if (`${this.datoBuscar}` === `${nodo.id}`) {
      return { 'distancia': distancia, 'nodo': nodos };
    } else {
      for (let x = 0; x < nodo.hijos.length; x++) {
        let nodito = nodo.hijos[x];
        //console.log(nodito)
        let aux = this.GraficarBusqueda(nodito, distancia + nodito.distancia, nodos);
        // console.log(aux)
        if (aux !== null) {
          // console.log("rutas de nodos activos ")
          
          this.mostrarRecorrido = `${this.mostrarRecorrido}  Nodo ${this.datoBuscar}, Distancia:${distancia + nodito.distancia}, Recorrido:${nodos}${this.datoBuscar}\n`

        
        }

 
     }
      return null;
    }
  }
  //Busqueda por profundidad :v
  GraficarRecprridoProfundidad(nodo: NodoGrafo) {

    this.mostrarRecorrido = `${this.mostrarRecorrido}${nodo.id}->`

    for (let x = 0; x < nodo.hijos.length; x++) {
      let nodito = nodo.hijos[x];
      this.GraficarRecprridoProfundidad(nodito);
    }
  }



  graficar() {
    this.nodes = []
    this.edges = []
    this.graficarGrafo(this.GrafoInicio);
    this.ngAfterViewInit();
  }
  matriz() {
    this.mostrarRecorrido = "Matriz de Adyacencia\n";;
    this.indicesMatriz(this.GrafoInicio);
    this.matris[0] = [];
    this.matris[0][0] = "#"
    for (let x = 0; x < this.indice.length; x++) {
      const element = this.indice[x];
      this.matris[x + 1] = [];

      this.matris[x + 1][0] = this.matris[0][x + 1] = element;

    }
    this.matrizAdya(this.GrafoInicio)
  }

  indice: any[] = [];
  indicesMatriz(nodo: NodoGrafo) {
    let bandera = true;
    this.indice.forEach(element => {
      if (element === nodo.id) { bandera = false; }
    });
    if (bandera) {
      this.indice.push(nodo.id);
    }
    nodo.hijos.forEach(element => {
      this.indicesMatriz(element);
    });
  }
  matrizAdya(nodo: NodoGrafo) {
    nodo.hijos.forEach(element => {

      for (let x = 0; x < this.indice.length; x++) {
        for (let y = 0; y < this.indice.length; y++) {
          if (this.indice[x] === nodo.id && this.indice[y] === element.id) {
            this.matris[x + 1][y + 1] = element.distancia;
          }

        }

      }
      nodo.hijos.forEach(element => {
        this.matrizAdya(element);
      });

    });

  }
  ListaAdya() {
    this.mostrarRecorrido = "Lista de Adyacencia\n";
    this.ListaAdyas(this.GrafoInicio);
  }
  ListaAdyas(nodo: NodoGrafo) {
    this.mostrarRecorrido = `${this.mostrarRecorrido}${nodo.id}->`;
    nodo.hijos.forEach(element => {
      this.mostrarRecorrido = `${this.mostrarRecorrido}${element.id},`;
    });
    this.mostrarRecorrido = `${this.mostrarRecorrido}\n`;
    nodo.hijos.forEach(element => {
      this.ListaAdyas(element);
    })
  }

  search(bandera) {
    this.mostrarRecorrido = "";
    this.mostrarRecorrido = "Busqueda del nodo" + this.datoBuscar + " ";
    if (bandera) {
      this.mostrarRecorrido = this.mostrarRecorrido + "por Anchura: "
      for (let x = 0; x < 500; x++) {
        this.GraficarRecorridoAnchura(x, this.GrafoInicio);

      }

      let valor = `${this.mostrarRecorrido}->`.split(`->${this.datoBuscar}->`);
      if (valor.length == 1) { alert("Dato no encontrado"); this.mostrarRecorrido = ""; return; }
      this.mostrarRecorrido = valor[0] + `->${this.datoBuscar}`;
      this.nodes = []
      this.edges = []
      let arreglo = `${this.mostrarRecorrido}->`.split('->');
      for (let x = 1; x < arreglo.length - 1; x++) {
        const element = arreglo[x];
        this.nodes.push({ id: `${x}${element}`, label: `Nodo ${element}` })
        this.edges.push({ from: `${x}${element}`, to: `${x + 1}${arreglo[x + 1]}` })

      }
      this.ngAfterViewInit();

    }
    else {

      this.mostrarRecorrido = this.mostrarRecorrido + "por Profundidad: ->"
      this.GraficarRecprridoProfundidad(this.GrafoInicio);
      let valor = `${this.mostrarRecorrido}->`.split(`->${this.datoBuscar}->`);
      if (valor.length == 1) { alert("Dato no encontrado"); this.mostrarRecorrido = ""; return; }
      this.mostrarRecorrido = valor[0] + `->${this.datoBuscar}->`;
      this.nodes = []
      this.edges = []
      let arreglo = `${this.mostrarRecorrido}`.split('->');
      for (let x = 1; x < arreglo.length - 1; x++) {
        const element = arreglo[x];
        this.nodes.push({ id: `${x}${element}`, label: `Nodo ${element}` })
        this.edges.push({ from: `${x}${element}`, to: `${x + 1}${arreglo[x + 1]}` })

      }
      this.ngAfterViewInit();

    }
  }

  delete() {
    if (this.GrafoInicio === null) { alert("Grafo vacio"); return; }
    if (`${this.GrafoInicio.id}` === this.datoEliminar) {
      this.GrafoInicio = null;
      alert("Nodo eliminado"); return
    }
    else {
      this.GrafoInicio.eliminar(this.datoEliminar)
      alert("Nodo eliminado"); return
    }
  }


  async actualizar() {
    if (this.datoModificar == null) {
      alert("Error Campo nulo");
      return;
    }
    if (this.GrafoInicio == null) {
      alert("No hay datos en el grafo");
      return;
    }
    let valor = this.GrafoInicio.buscar(this.datoModificar);
    let modificado = this.GrafoInicio.buscar(this.datoModificado);
    if (valor === null) {
      alert(`Nodo no encontrado: ${this.datoModificar}`);

    } else {
      if (modificado === null) {
        valor.id = this.datoModificado;
        alert("Nodo modificado con exito!!");
      }
      else {
        alert("Nodo ya existente");
      }

    }


    this.datoModificar = null;
    this.datoModificado = null;
  }




  async onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      let data: any = await this.processFile(file)
      data = JSON.parse(data)
      data = data.valores
      data.forEach(element => {
        if (this.GrafoInicio === null) {
          this.GrafoInicio = new NodoGrafo(element.vertice, 0, 0);
          element.aristas.forEach(arista => {
            let nodo = this.GrafoInicio.insertar(arista.arista, arista.distancia, 1)
            nodo.insertar(this.GrafoInicio.id, arista.distancia, this.GrafoInicio.altura)
          });
        } else {
          let nodoEncontrado: NodoGrafo = this.GrafoInicio.buscar(element.vertice);
          if (nodoEncontrado !== null) {
            element.aristas.forEach(arista => {
              let nodo = nodoEncontrado.insertar(arista.arista, arista.distancia, 1 + nodoEncontrado.altura);
              if (nodo !== null) {
                nodo.insertar(nodoEncontrado.id, arista.distancia, nodoEncontrado.altura)
              }
            });
          }
        }
      });
      //graficar
      this.graficar();
    }
  }

  graficarGrafo(nodo: NodoGrafo) {
    let bandera = true;
    this.nodes.forEach(elemento => {
      if (elemento.id === nodo.id) { bandera = false; }
    });
    if (bandera) { this.nodes.push({ id: nodo.id, label: `Node ${nodo.id}` }) }

    nodo.hijos.forEach(element => {
      this.edges.push({ from: nodo.id, to: element.id })
    });
    nodo.hijos.forEach(element => {
      this.graficarGrafo(element)
    });
  }


  async processFile(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onload = (event) => {
        resolve(event.target.result.toString())
      }
      reader.onerror = reject;

      reader.readAsText(file);
    })
  }

  generarJSON() {
    // let data = this.ListaDobleEnlazada.generarJSON()
    var link = document.createElement("a");
    link.download = "grafoNoDirigido.json";
    //var info = "text/json;charset=utf-8," + encodeURIComponent(data);
    // link.href = "data:" + info;
    link.click();
    link.remove()
  }





}
