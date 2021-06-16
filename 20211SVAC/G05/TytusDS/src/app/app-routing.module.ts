import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListasCircularesComponent} from './PaginasWeb/listas-circulares/listas-circulares.component';
import {ListasCicularesDEComponent} from './PaginasWeb/listas-ciculares-de/listas-ciculares-de.component';
import { ListaSimpleComponent } from './PaginasWeb/lista-simple/lista-simple.component';
import { ListaDobleComponent } from './PaginasWeb/lista-doble/lista-doble.component';
import { PilaComponent } from './PaginasWeb/pila/pila.component';
import { MenuComponent } from './PaginasWeb/menu/menu.component';

const routes: Routes = [
  {path:'menu', component: MenuComponent},
  {path:'ListasCirculares', component: ListasCircularesComponent},
  {path:'ListasCircularesDE', component:ListasCicularesDEComponent},
  {path:'ListaSimple', component: ListaSimpleComponent},
  {path:'ListaDoble', component: PilaComponent},
  {path:'ListaDoble', component: ListaDobleComponent},
  {path:'**', redirectTo: 'menu'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
