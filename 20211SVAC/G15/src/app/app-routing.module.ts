import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//########################## COMPONENTES #############################################

import { HomeComponent } from "./components/home/home.component"
import { ListaDobleCircularComponent} from "./components/listadobleCircular/listadobleCircular.component"
import { ListaCircularSimpleComponent } from "./components/lista-circular-simple/lista-circular-simple.component"
import { ListaDobleComponent } from "./components/lista-doble/lista-doble.component"
import { ColaComponent } from "./components/cola/cola.component"
import { ColaPrioridadComponent } from './components/cola-prioridad/cola-prioridad.component';

const routes: Routes = [
  {path: 'listaDobleCircular', component: ListaDobleCircularComponent, pathMatch: 'full'},
  {path: 'listaSimpleCircular', component: ListaCircularSimpleComponent, pathMatch: 'full'},
  {path: 'listadoblementeEnlazada', component: ListaDobleComponent, pathMatch: 'full'},
  {path: 'cola', component: ColaComponent, pathMatch: 'full'},
  {path: 'colaPrioridad' , component:ColaPrioridadComponent, pathMatch: 'full'},
  
  {path: '', component: HomeComponent, pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
