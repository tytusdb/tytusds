import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObjToArrayPipe } from './objToArray.pipe';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { EstructurasLinealesComponent } from './componentes/estructuraslineales/estructuras-lineales.component';
import { OrdenamientosComponent } from './componentes/ordenamientos/ordenamientos.component';
import { ArbolesComponent } from './componentes/arboles/arboles.component';
import { ListaSimpleComponent } from './componentes/lista-simple/lista-simple.component';
import { ListaDobleEnlazadaComponent } from './componentes/lista-doble-enlazada/lista-doble-enlazada.component';
import { PilaComponent } from './componentes/pila/pila.component';
import { ColaComponent } from './componentes/cola/cola.component';
import { ColaPrioridadComponent } from './componentes/cola-prioridad/cola-prioridad.component';
import { ListaCircularComponent } from './componentes/lista-circular/lista-circular.component';
import { ListaDobleCircularComponent } from './componentes/lista-doble-circular/lista-doble-circular.component';
import { OrdenamientoBurbujaComponent } from './componentes/ordenamiento-burbuja/ordenamiento-burbuja.component';
import { OrdenamientoSeleccionComponent } from './componentes/ordenamiento-seleccion/ordenamiento-seleccion.component';
import { OrdenamientoInsercionComponent } from './componentes/ordenamiento-insercion/ordenamiento-insercion.component';
import { OrdenamientoRapidoComponent } from './componentes/ordenamiento-rapido/ordenamiento-rapido.component';
import { ArbolAvlComponent } from './componentes/arbol-avl/arbol-avl.component';
import { ArbolBinarioComponent } from './componentes/arbol-binario/arbol-binario.component';
import { ArbolBComponent } from './componentes/arbol-b/arbol-b.component';
import { ArbolBMasComponent } from './componentes/arbol-bmas/arbol-bmas.component';
import { ArbolMerkleComponent } from './componentes/arbol-merkle/arbol-merkle.component';
import { CodigoHammingComponent } from './ComponentesFaseDos/AlgoritmoDeCodificacion/codigo-hamming/codigo-hamming.component';
import { AlgoritmoHuffmanComponent } from './ComponentesFaseDos/AlgoritmoDeCodificacion/algoritmo-huffman/algoritmo-huffman.component';
import { AlgoritmoLZWComponent } from './ComponentesFaseDos/AlgoritmoDeCodificacion/algoritmo-lzw/algoritmo-lzw.component';
import { CifradoFeistelComponent } from './ComponentesFaseDos/AlgoritmoDeCodificacion/cifrado-feistel/cifrado-feistel.component';
import { CifradoRSAComponent } from './ComponentesFaseDos/AlgoritmoDeCodificacion/cifrado-rsa/cifrado-rsa.component';
import { MatricesDispersasComponent } from './ComponentesFaseDos/EstructurasCompuestas/matrices-dispersas/matrices-dispersas.component';
import { RowMajorComponent } from './ComponentesFaseDos/EstructurasCompuestas/row-major/row-major.component';
import { ColMajorComponent } from './ComponentesFaseDos/EstructurasCompuestas/col-major/col-major.component';
import { ConstruccionEstructurasCompuestasComponent } from './ComponentesFaseDos/EstructurasCompuestas/construccion-estructuras-compuestas/construccion-estructuras-compuestas.component';
import { RecorridoBusquedaAnchuraGrafoComponent } from './ComponentesFaseDos/EstructurasNoLineales/recorrido-busqueda-anchura-grafo/recorrido-busqueda-anchura-grafo.component';
import { RecorridoBusquedaProfundidadGrafoComponent } from './ComponentesFaseDos/EstructurasNoLineales/recorrido-busqueda-profundidad-grafo/recorrido-busqueda-profundidad-grafo.component';
import { AlgoritmoCostoUniformeComponent } from './ComponentesFaseDos/EstructurasNoLineales/algoritmo-costo-uniforme/algoritmo-costo-uniforme.component';
import { ArbolRecubrimientoMinimoComponent } from './ComponentesFaseDos/EstructurasNoLineales/arbol-recubrimiento-minimo/arbol-recubrimiento-minimo.component';
import { TablaHashAbiertaComponent} from './ComponentesFaseDos/EstructurasNoLineales/tabla-hash-abierta/tabla-hash-abierta.component';
import { TablaHashCerradaComponent } from './ComponentesFaseDos/EstructurasNoLineales/tabla-hash-cerrada/tabla-hash-cerrada.component';
import { EstructuraNoLinealComponent } from './ComponentesFaseDos/estructura-no-lineal/estructura-no-lineal.component';
import { EstructuraCompuestaComponent } from './ComponentesFaseDos/estructura-compuesta/estructura-compuesta.component';
import { AlgoritmoCodificacionComponent } from './ComponentesFaseDos/algoritmo-codificacion/algoritmo-codificacion.component';
@NgModule({
  declarations: [
    AppComponent,
    //InicioComponent,
    InicioComponent,
    ObjToArrayPipe,
    EstructurasLinealesComponent,
    OrdenamientosComponent,
    ArbolesComponent,
    ListaSimpleComponent,
    ListaDobleEnlazadaComponent,
    PilaComponent,
    ColaComponent,
    ColaPrioridadComponent,
    ListaCircularComponent,
    ListaDobleCircularComponent,
    OrdenamientoBurbujaComponent,
    OrdenamientoSeleccionComponent,
    OrdenamientoInsercionComponent,
    OrdenamientoRapidoComponent,
    ArbolAvlComponent,
    ArbolBinarioComponent,
    ArbolBComponent,
    ArbolBMasComponent,
    ArbolMerkleComponent,
    CodigoHammingComponent,
    AlgoritmoHuffmanComponent,
    AlgoritmoLZWComponent,
    CifradoFeistelComponent,
    CifradoRSAComponent,
    MatricesDispersasComponent,
    RowMajorComponent,
    ColMajorComponent,
    ConstruccionEstructurasCompuestasComponent,
    RecorridoBusquedaAnchuraGrafoComponent,
    RecorridoBusquedaProfundidadGrafoComponent,
    AlgoritmoCostoUniformeComponent,
    ArbolRecubrimientoMinimoComponent,
    TablaHashAbiertaComponent,
    TablaHashCerradaComponent,
    EstructuraNoLinealComponent,
    AlgoritmoCodificacionComponent,
    EstructuraCompuestaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ListaSimpleComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
