import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BstComponent } from './bst/bst.component';
import { AvlComponent } from './avl/avl.component';
import { MerkleComponent } from './merkle/merkle.component';
import { BtreeComponent } from './btree/btree.component';
import { BtreeplusComponent } from './btreeplus/btreeplus.component';
import { BubblesortComponent } from './bubblesort/bubblesort.component';
import { InsertComponent } from './insert/insert.component';
import { QuickComponent } from './quick/quick.component';
import { CirculardobleComponent } from './circulardoble/circulardoble.component';
import { CircularsimpleComponent } from './circularsimple/circularsimple.component';
import { ColaComponent } from './cola/cola.component';
import { ColaprioridadComponent } from './colaprioridad/colaprioridad.component';
import { ListadobleComponent } from './listadoble/listadoble.component';
import { ListasimpleComponent } from './listasimple/listasimple.component';
import { PilaComponent } from './pila/pila.component';
import { PrincipalComponent } from './principal/principal.component';
import { SeleccionComponent } from './seleccion/seleccion.component';

@NgModule({
  declarations: [
    AppComponent,
    BstComponent,
    AvlComponent,
    MerkleComponent,
    BtreeComponent,
    BtreeplusComponent,
    BubblesortComponent,
    InsertComponent,
    QuickComponent,
    CirculardobleComponent,
    CircularsimpleComponent,
    ColaComponent,
    ColaprioridadComponent,
    ListadobleComponent,
    ListasimpleComponent,
    PilaComponent,
    PrincipalComponent,
    SeleccionComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
