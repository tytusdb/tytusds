import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EstructurasLinealesComponent} from './componentes/estructuraslineales/estructuras-lineales.component';
const routes: Routes = [
  {
    path: "EstructurasLineales",
    component: EstructurasLinealesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
