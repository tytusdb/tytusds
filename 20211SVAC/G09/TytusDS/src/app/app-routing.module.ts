import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importando los componentes a usar
import { EstructurasLinealesComponent} from './componentes/estructuraslineales/estructuras-lineales.component';
import {InicioComponent} from './componentes/inicio/inicio.component';
import { OrdenamientosComponent } from './componentes/ordenamientos/ordenamientos.component';
import { ArbolesComponent } from './componentes/arboles/arboles.component';
const routes: Routes = [
  {
    path: "EstructurasLineales",
    component: EstructurasLinealesComponent
  },
  {
    path: "Inicio",
    component: InicioComponent
  },
  {
    path: "Ordenamientos",
    component: OrdenamientosComponent
  },
  {
    path: "Arboles",
    component: ArbolesComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
