import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListaDobleCircularComponent } from './components/listadobleCircular/listadobleCircular.component';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ListaCircularSimpleComponent } from './components/lista-circular-simple/lista-circular-simple.component';
import { BinaryTreeComponent } from './components/binary-tree/binary-tree.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaDobleCircularComponent,
    ListaCircularSimpleComponent,
    BinaryTreeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
