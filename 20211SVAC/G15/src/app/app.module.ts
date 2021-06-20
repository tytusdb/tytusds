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
import { OrdenamientosComponent } from './components/ordenamientos/ordenamientos.component';
import { EstructuraslinealesComponent } from './components/estructuraslineales/estructuraslineales.component';
import { BurbujaComponent } from './components/burbuja/burbuja.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaDobleCircularComponent,
    ListaCircularSimpleComponent,
    OrdenamientosComponent,
    EstructuraslinealesComponent,
    BurbujaComponent,
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
