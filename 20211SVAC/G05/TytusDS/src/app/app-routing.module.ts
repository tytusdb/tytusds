import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ListasCircularesComponent} from './PaginasWeb/listas-circulares/listas-circulares.component';
import {ListasCicularesDEComponent} from './PaginasWeb/listas-ciculares-de/listas-ciculares-de.component';
import { ListaSimpleComponent } from './PaginasWeb/lista-simple/lista-simple.component';
import { ListaDobleComponent } from './PaginasWeb/lista-doble/lista-doble.component';
import { PilaComponent } from './PaginasWeb/pila/pila.component';
import { MenuComponent } from './PaginasWeb/menu/menu.component';
import { SeleccionComponent } from './PaginasWeb/seleccion/seleccion.component';
import {OrdQuicksortComponent} from './PaginasWeb/ord-quicksort/ord-quicksort.component';
import {OrdBurbujaComponent} from './PaginasWeb/ord-burbuja/ord-burbuja.component';
import { AvlComponent } from './PaginasWeb/avl/avl.component';
import {ABinarioComponent} from './PaginasWeb/a-binario/a-binario.component';
import {InserccionComponent} from './PaginasWeb/inserccion/inserccion.component';
import {BComponent} from './PaginasWeb/b/b.component';
import { ColaComponent } from './PaginasWeb/Cola/cola.component';
import { CpComponent } from './PaginasWeb/Cola-Prioridad/cp.component';
import { AnchuraComponent } from './PaginasWeb/grafo_anchura/anchura.component';
import {LZWComponent} from './PaginasWeb/lzw/lzw.component';
import {LBSTComponent} from './PaginasWeb/lista-bst/l-bst.component';
import {MDispersaComponent} from './PaginasWeb/mdispersa/mdispersa.component';
import { HammingComponent } from './PaginasWeb/hamming/hamming.component';
import { HuffmanComponent } from './PaginasWeb/huffman/huffman.component';
import { HashAbiertoComponent } from './PaginasWeb/hash-abierto/hash-abierto.component';


const routes: Routes = [
  {path:'menu', component: MenuComponent},
  {path:'ListasCirculares', component: ListasCircularesComponent},
  {path:'ListasCircularesDE', component:ListasCicularesDEComponent},
  {path:'ListaSimple', component: ListaSimpleComponent},
  {path:'Pila', component: PilaComponent},
  {path:'Cp', component: CpComponent},
  {path:'Cola', component: ColaComponent},
  {path:'ListaDoble', component: ListaDobleComponent},
  {path:'Seleccion', component: SeleccionComponent},
  {path:'OBurbuja', component: OrdBurbujaComponent},
  {path:'avl', component: AvlComponent},
  {path:'OQuicksort', component: OrdQuicksortComponent},
  {path:'Abinario', component: ABinarioComponent},
  {path:'Inserccion', component: InserccionComponent},
  {path:'B', component: BComponent},
  {path:'Anchura', component: AnchuraComponent},
  {path: 'MDispersa',component: MDispersaComponent},
  {path: 'CodigoHamming',component: HammingComponent},
  {path:'LBST',component: LBSTComponent},
  {path:'AlgoritmoHuffman',component: HuffmanComponent},
  {path:'HashAbierta',component: HashAbiertoComponent},
  {path:'lzw', component: LZWComponent},
  {path:'**', redirectTo: 'menu'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true, relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
