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
import { HashAbiertaComponent } from './hash-abierta/hash-abierta.component';
import { HashCerradoComponent } from './hash-cerrado/hash-cerrado.component';
import { RBAnchuraGrafosComponent } from './rbanchura-grafos/rbanchura-grafos.component';
import { RBProfundidadGrafosComponent } from './rbprofundidad-grafos/rbprofundidad-grafos.component';
import { CostoUniformeComponent } from './costo-uniforme/costo-uniforme.component';
import { ArbolMinimoComponent } from './arbol-minimo/arbol-minimo.component';
import { HammingComponent } from './hamming/hamming.component';
import { HuffmanComponent } from './huffman/huffman.component';
import { LZWComponent } from './lzw/lzw.component';
import { FeistelComponent } from './feistel/feistel.component';
import { RSAComponent } from './rsa/rsa.component';
import { EstructurasCompuestasComponent } from './estructuras-compuestas/estructuras-compuestas.component';
import { MatricesDispersasComponent } from './matrices-dispersas/matrices-dispersas.component';
import { RowMajorComponent } from './row-major/row-major.component';
import { ColMajorComponent } from './col-major/col-major.component';

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
    SeleccionComponent,
    HashAbiertaComponent,
    HashCerradoComponent,
    RBAnchuraGrafosComponent,
    RBProfundidadGrafosComponent,
    CostoUniformeComponent,
    ArbolMinimoComponent,
    HammingComponent,
    HuffmanComponent,
    LZWComponent,
    FeistelComponent,
    RSAComponent,
    EstructurasCompuestasComponent,
    MatricesDispersasComponent,
    RowMajorComponent,
    ColMajorComponent
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
