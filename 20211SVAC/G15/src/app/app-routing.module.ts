import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//########################## COMPONENTES #############################################

import { HomeComponent } from "./components/home/home.component"
import { ListaDobleCircularComponent} from "./components/listadobleCircular/listadobleCircular.component"
import { ListaCircularSimpleComponent } from "./components/lista-circular-simple/lista-circular-simple.component"
import { ListaDobleComponent } from "./components/lista-doble/lista-doble.component"
import { ColaComponent } from "./components/cola/cola.component"
import { ColaPrioridadComponent } from './components/cola-prioridad/cola-prioridad.component';

import { OrdenamientosComponent } from './components/ordenamientos/ordenamientos.component';
import { EstructuraslinealesComponent } from './components/estructuraslineales/estructuraslineales.component';
import { BurbujaComponent } from './components/burbuja/burbuja.component';
import { PilaComponent } from './components/pila/pila.component';
import { ListasimpleComponent } from './components/listasimple/listasimple.component';
import { InsertionSortComponent } from './components/insertion-sort/insertion-sort.component'

import { BinaryTreeComponent } from './components/binary-tree/binary-tree.component'
import { EstructuraArboreaComponent } from './components/estructura-arborea/estructura-arborea.component';

import { AVLComponent } from './components/avl/avl.component';

import { MetodorapidoComponent } from './components/metodorapido/metodorapido.component';
import { MetodoSeleccionComponent } from './components/metodo-seleccion/metodo-seleccion.component';

import { CompuestasComponent } from './components/compuestas/compuestas.component'


import { DispersaComponent } from './components/dispersa/dispersa.component'
import { MajorComponent } from './components/major/major.component'


import { NoLinealesComponent } from './components/no-lineales/no-lineales.component'
import { HashCerradaComponent } from './components/hash-cerrada/hash-cerrada.component'

const routes: Routes = [
  {path: 'binaryTree', component: BinaryTreeComponent, pathMatch: 'full'},
  {path: 'listaDobleCircular', component: ListaDobleCircularComponent, pathMatch: 'full'},
  {path: 'listaSimpleCircular', component: ListaCircularSimpleComponent, pathMatch: 'full'},
  {path: 'listadoblementeEnlazada', component: ListaDobleComponent, pathMatch: 'full'},
  {path: 'cola', component: ColaComponent, pathMatch: 'full'},
  {path: 'colaPrioridad' , component:ColaPrioridadComponent, pathMatch: 'full'},
  {path: 'Ordenamiento', component: OrdenamientosComponent, pathMatch: 'full'},
  {path: 'estructuraLineales', component: EstructuraslinealesComponent, pathMatch: 'full'},
  {path: 'burbuja', component: BurbujaComponent, pathMatch: 'full'},
  {path: 'pila', component: PilaComponent, pathMatch: 'full'},
  {path: 'listaSimple', component: ListasimpleComponent, pathMatch: 'full'},
  {path: 'estructuraArborea', component: EstructuraArboreaComponent, pathMatch: 'full'},
  {path: 'ordenamiento/insercion', component: InsertionSortComponent, pathMatch: 'full'},
  {path: 'compuesta/dispersa', component: DispersaComponent, pathMatch: 'full'},
  {path: 'AVL', component: AVLComponent, pathMatch: 'full'},
  {path: 'rapido', component: MetodorapidoComponent, pathMatch: 'full'},
  {path: 'seleccion',component:MetodoSeleccionComponent,pathMatch:'full'},
  {path: 'compuestas',component:CompuestasComponent,pathMatch:'full'},
  {path: 'compuestas/major',component:MajorComponent,pathMatch:'full'},
  {path: 'NoLineales',component:NoLinealesComponent,pathMatch:'full'},
  {path: 'nolineales/hash/cerrada',component:HashCerradaComponent,pathMatch:'full'},
  {path: '', component: HomeComponent, pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
