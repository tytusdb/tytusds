import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//########################## COMPONENTES #############################################

import { HomeComponent } from "./components/home/home.component"
import { ListaDobleCircularComponent} from "./components/listadobleCircular/listadobleCircular.component"
import { ListaCircularSimpleComponent } from "./components/lista-circular-simple/lista-circular-simple.component"
import { BinaryTreeComponent } from './components/binary-tree/binary-tree.component'
const routes: Routes = [
  {path: 'binaryTree', component: BinaryTreeComponent, pathMatch: 'full'},
  {path: 'listaDobleCircular', component: ListaDobleCircularComponent, pathMatch: 'full'},
  {path: 'listaSimpleCircular', component: ListaCircularSimpleComponent, pathMatch: 'full'},
  {path: '', component: HomeComponent, pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
