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
    ArbolAvlComponent
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
