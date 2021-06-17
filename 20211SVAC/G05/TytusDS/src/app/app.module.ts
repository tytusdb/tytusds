import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpcionesComponent } from './Componentes/opciones/opciones.component';
import { ListasCircularesComponent } from './PaginasWeb/listas-circulares/listas-circulares.component';
import { ListasCicularesDEComponent } from './PaginasWeb/listas-ciculares-de/listas-ciculares-de.component';
import { ListaSimpleComponent } from './PaginasWeb/lista-simple/lista-simple.component';
import { ListaDobleComponent } from './PaginasWeb/lista-doble/lista-doble.component';
import { PilaComponent } from './PaginasWeb/pila/pila.component';
import { ColaComponent } from './PaginasWeb/cola/cola.component';
import { MenuComponent } from './PaginasWeb/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { DocumentoService } from './services/documento.service';

@NgModule({
  declarations: [
    AppComponent,
    OpcionesComponent,
    ListasCircularesComponent,
    ListaSimpleComponent,
    ListaDobleComponent,
    MenuComponent,
    ListasCicularesDEComponent,
    PilaComponent,
    ColaComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    DocumentoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
