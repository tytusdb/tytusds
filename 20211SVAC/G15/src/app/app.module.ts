import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListaDobleCircularComponent } from './components/listadobleCircular/listadobleCircular.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ListaCircularSimpleComponent } from './components/lista-circular-simple/lista-circular-simple.component';
import { ColaComponent } from './components/cola/cola.component';
import { ColaPrioridadComponent } from './components/cola-prioridad/cola-prioridad.component';
import { ListaDobleComponent } from './components/lista-doble/lista-doble.component';
import { OrdenamientosComponent } from './components/ordenamientos/ordenamientos.component';
import { EstructuraslinealesComponent } from './components/estructuraslineales/estructuraslineales.component';
import { BurbujaComponent } from './components/burbuja/burbuja.component';
import { PilaComponent } from './components/pila/pila.component';
import { ListasimpleComponent } from './components/listasimple/listasimple.component'
import { BinaryTreeComponent } from './components/binary-tree/binary-tree.component';
import { EstructuraArboreaComponent } from './components/estructura-arborea/estructura-arborea.component'

import { InsertionSortComponent } from './components/insertion-sort/insertion-sort.component';
import { AVLComponent } from './components/avl/avl.component';
import { MetodorapidoComponent } from './components/metodorapido/metodorapido.component';
import { MetodoSeleccionComponent } from './components/metodo-seleccion/metodo-seleccion.component';
import { HashabiertaComponent } from './components/hashabierta/hashabierta.component';
import { EstructuranolinealesComponent } from './components/estructuranolineales/estructuranolineales.component';
import { CodificacionhuffmannComponent } from './components/codificacionhuffmann/codificacionhuffmann.component';
import { CifradofeisComponent } from './components/cifradofeis/cifradofeis.component';
import { CodificacionComponent } from './components/codificacion/codificacion.component';
import { LZWComponent } from './components/lzw/lzw.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaDobleCircularComponent,
    ListaCircularSimpleComponent,

    ColaComponent,
    ColaPrioridadComponent,
    ListaDobleComponent,
    OrdenamientosComponent,
    EstructuraslinealesComponent,
    BurbujaComponent,
    PilaComponent,
    ListasimpleComponent,
    BinaryTreeComponent,
    EstructuraArboreaComponent,
    InsertionSortComponent,
    AVLComponent,
    MetodorapidoComponent,
    MetodoSeleccionComponent,
    HashabiertaComponent,
    EstructuranolinealesComponent,
    CodificacionhuffmannComponent,
    CifradofeisComponent,
    CodificacionComponent,
    LZWComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
