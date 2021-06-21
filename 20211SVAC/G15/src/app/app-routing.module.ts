import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//########################## COMPONENTES #############################################

import { HomeComponent } from "./components/home/home.component"
import { ListaDobleCircularComponent} from "./components/listadobleCircular/listadobleCircular.component"
import { ListaCircularSimpleComponent } from "./components/lista-circular-simple/lista-circular-simple.component"
import { OrdenamientosComponent } from './components/ordenamientos/ordenamientos.component';
import { EstructuraslinealesComponent } from './components/estructuraslineales/estructuraslineales.component';
import { BurbujaComponent } from './components/burbuja/burbuja.component';
import { PilaComponent } from './components/pila/pila.component';
import { ListasimpleComponent } from './components/listasimple/listasimple.component';

import { BinaryTreeComponent } from './components/binary-tree/binary-tree.component'
import { EstructuraArboreaComponent } from './components/estructura-arborea/estructura-arborea.component';
const routes: Routes = [
  {path: 'binaryTree', component: BinaryTreeComponent, pathMatch: 'full'},
  {path: 'listaDobleCircular', component: ListaDobleCircularComponent, pathMatch: 'full'},
  {path: 'listaSimpleCircular', component: ListaCircularSimpleComponent, pathMatch: 'full'},
  {path: 'Ordenamiento', component: OrdenamientosComponent, pathMatch: 'full'},
  {path: 'estructuraLineales', component: EstructuraslinealesComponent, pathMatch: 'full'},
  {path: 'burbuja', component: BurbujaComponent, pathMatch: 'full'},
  {path: 'pila', component: PilaComponent, pathMatch: 'full'},
  {path: 'listaSimple', component: ListasimpleComponent, pathMatch: 'full'},
  {path: 'estructuraArborea', component: EstructuraArboreaComponent, pathMatch: 'full'},
  {path: '', component: HomeComponent, pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
