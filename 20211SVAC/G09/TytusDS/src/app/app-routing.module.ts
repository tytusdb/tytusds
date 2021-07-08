import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importando los componentes a usar
import { EstructurasLinealesComponent} from './componentes/estructuraslineales/estructuras-lineales.component';
import {InicioComponent} from './componentes/inicio/inicio.component';
import { OrdenamientosComponent } from './componentes/ordenamientos/ordenamientos.component';
import { ArbolesComponent } from './componentes/arboles/arboles.component';

//Importando los subcomponentes de Cada componente
import { ListaSimpleComponent } from "./componentes/lista-simple/lista-simple.component";
import { ListaDobleEnlazadaComponent } from './componentes/lista-doble-enlazada/lista-doble-enlazada.component';
import { ListaCircularComponent } from './componentes/lista-circular/lista-circular.component';
import { ListaDobleCircularComponent } from './componentes/lista-doble-circular/lista-doble-circular.component';
import { PilaComponent } from './componentes/pila/pila.component';
import { ColaComponent } from './componentes/cola/cola.component';
import { ColaPrioridadComponent } from './componentes/cola-prioridad/cola-prioridad.component';
import { OrdenamientoBurbujaComponent } from './componentes/ordenamiento-burbuja/ordenamiento-burbuja.component';
import { OrdenamientoSeleccionComponent } from './componentes/ordenamiento-seleccion/ordenamiento-seleccion.component';
import { OrdenamientoInsercionComponent } from './componentes/ordenamiento-insercion/ordenamiento-insercion.component';
import { OrdenamientoRapidoComponent } from './componentes/ordenamiento-rapido/ordenamiento-rapido.component';
import { ArbolAvlComponent } from './componentes/arbol-avl/arbol-avl.component';
import { ArbolBinarioComponent } from './componentes/arbol-binario/arbol-binario.component';
import { ArbolBComponent} from './componentes/arbol-b/arbol-b.component';
import { ArbolBMasComponent} from './componentes/arbol-bmas/arbol-bmas.component';
import { ArbolMerkleComponent } from './componentes/arbol-merkle/arbol-merkle.component';
//*************************************** Componentes Fase Dos ******************************************
// ---------------------------------- Estructuras No Lineales --------------------------------------------
import { AlgoritmoCostoUniformeComponent} from './ComponentesFaseDos/EstructurasNoLineales/algoritmo-costo-uniforme/algoritmo-costo-uniforme.component';
import { ArbolRecubrimientoMinimoComponent } from './ComponentesFaseDos/EstructurasNoLineales/arbol-recubrimiento-minimo/arbol-recubrimiento-minimo.component';
import { RecorridoBusquedaAnchuraGrafoComponent } from './ComponentesFaseDos/EstructurasNoLineales/recorrido-busqueda-anchura-grafo/recorrido-busqueda-anchura-grafo.component';
import { RecorridoBusquedaProfundidadGrafoComponent } from './ComponentesFaseDos/EstructurasNoLineales/recorrido-busqueda-profundidad-grafo/recorrido-busqueda-profundidad-grafo.component';
import { TablaHashAbiertaComponent } from './ComponentesFaseDos/EstructurasNoLineales/tabla-hash-abierta/tabla-hash-abierta.component';
import { TablaHashCerradaComponent } from './ComponentesFaseDos/EstructurasNoLineales/tabla-hash-cerrada/tabla-hash-cerrada.component';
import { EstructuraNoLinealComponent } from './ComponentesFaseDos/estructura-no-lineal/estructura-no-lineal.component';

//---------------------------------- Algoritmos De Codificacion --------------------------------------------
import { AlgoritmoHuffmanComponent } from './ComponentesFaseDos/AlgoritmoDeCodificacion/algoritmo-huffman/algoritmo-huffman.component';
import { AlgoritmoLZWComponent } from './ComponentesFaseDos/AlgoritmoDeCodificacion/algoritmo-lzw/algoritmo-lzw.component';
import { CifradoFeistelComponent } from './ComponentesFaseDos/AlgoritmoDeCodificacion/cifrado-feistel/cifrado-feistel.component';
import { CifradoRSAComponent } from './ComponentesFaseDos/AlgoritmoDeCodificacion/cifrado-rsa/cifrado-rsa.component';
import { CodigoHammingComponent } from './ComponentesFaseDos/AlgoritmoDeCodificacion/codigo-hamming/codigo-hamming.component';
import { AlgoritmoCodificacionComponent } from './ComponentesFaseDos/algoritmo-codificacion/algoritmo-codificacion.component';

//---------------------------------------- Estructuras Compuestas ----------------------------------------
import { ColMajorComponent } from './ComponentesFaseDos/EstructurasCompuestas/col-major/col-major.component';
import { RowMajorComponent } from './ComponentesFaseDos/EstructurasCompuestas/row-major/row-major.component';
import { MatricesDispersasComponent } from './ComponentesFaseDos/EstructurasCompuestas/matrices-dispersas/matrices-dispersas.component';
import { ConstruccionEstructurasCompuestasComponent } from './ComponentesFaseDos/EstructurasCompuestas/construccion-estructuras-compuestas/construccion-estructuras-compuestas.component';
import { EstructuraCompuestaComponent } from './ComponentesFaseDos/estructura-compuesta/estructura-compuesta.component';
const routes: Routes = [
  {path: "EstructurasLineales",    component: EstructurasLinealesComponent},
  {path: "Inicio",    component: InicioComponent},
  {path: "Ordenamientos",    component: OrdenamientosComponent},
  {path: "Arboles",    component: ArbolesComponent},
  //Subcomponentes
  {path:"listaSimple",  component: ListaSimpleComponent},
  {path:"ListaDobleEnlazada", component:ListaDobleEnlazadaComponent},
  {path:"ListaCircular", component:ListaCircularComponent },
  {path:"ListaDobleCircular", component:ListaDobleCircularComponent},
  {path:"pila", component:PilaComponent},
  {path:"cola",component:ColaComponent},
  {path:"colaPrioridad", component:ColaPrioridadComponent},
  {path:"burbuja", component:OrdenamientoBurbujaComponent},
  {path:"seleccion", component:OrdenamientoSeleccionComponent},
  {path:"insercion", component:OrdenamientoInsercionComponent},
  {path:"rapido", component:OrdenamientoRapidoComponent},
  {path:"avl", component:ArbolAvlComponent},
  {path:"binario", component:ArbolBinarioComponent},
  {path:"arbolB", component:ArbolBComponent},
  {path:"arbolBMas", component:ArbolBMasComponent},
  {path:"merkle", component:ArbolMerkleComponent},
  //*************************************** Componentes Fase Dos ******************************************
// ---------------------------------- Estructuras No Lineales --------------------------------------------
  {path:"AlgoritmoCostoUniforme", component:AlgoritmoCostoUniformeComponent},
  {path:"ArbolRecubrimientoMinimo", component:ArbolRecubrimientoMinimoComponent},
  {path:"RecorridoBusquedaAnchuraGrafo", component:RecorridoBusquedaAnchuraGrafoComponent},
  {path:"RecorridoBusquedaProfundidadGrafo", component:RecorridoBusquedaProfundidadGrafoComponent},
  {path:"TablaHashAbierta", component:TablaHashAbiertaComponent},
  {path:"TablaHashCerrada", component:TablaHashCerradaComponent},
  {path:"EstructuraNoLineal", component:EstructuraNoLinealComponent},

  //---------------------------------- Algoritmos De Codificacion --------------------------------------------
  {path:"AlgoritmoHuffman", component:AlgoritmoHuffmanComponent},
  {path:"AlgoritmoLZW", component:AlgoritmoLZWComponent},
  {path:"CifradoFeistel", component:CifradoFeistelComponent},
  {path:"CifradoRSA", component:CifradoRSAComponent},
  {path:"CodigoHamming", component:CodigoHammingComponent},
  {path:"AlgoritmoCodificacion", component:AlgoritmoCodificacionComponent},

  //---------------------------------------- Estructuras Compuestas ----------------------------------------
  {path:"ColMajor", component:ColMajorComponent},
  {path:"RowMajor", component:RowMajorComponent},
  {path:"MatricesDispersas", component:MatricesDispersasComponent},
  {path:"ConstruccionEstructurasCompuestas", component:ConstruccionEstructurasCompuestasComponent},
  {path:"EstructuraCompuesta", component:EstructuraCompuestaComponent}







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
