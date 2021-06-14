import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListasCircularesComponent} from './PaginasWeb/listas-circulares/listas-circulares.component'

const routes: Routes = [
  {path:'ListasCirculares', component:ListasCircularesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
