import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpcionesComponent } from './Componentes/opciones/opciones.component';
import { ListasCircularesComponent } from './PaginasWeb/listas-circulares/listas-circulares.component';
import { ListaSimpleComponent } from './PaginasWeb/lista-simple/lista-simple.component';
import { ListaDobleComponent } from './PaginasWeb/lista-doble/lista-doble.component';
import { MenuComponent } from './PaginasWeb/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    OpcionesComponent,
    ListasCircularesComponent,
    ListaSimpleComponent,
    ListaDobleComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
