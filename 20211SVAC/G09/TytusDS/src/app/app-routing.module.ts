import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importando los componentes a usar
import { EstructurasLinealesComponent} from './componentes/estructuraslineales/estructuras-lineales.component';
<<<<<<< HEAD
import { ListaSimpleComponent} from "./componentes/lista-simple/lista-simple.component";
=======
import {InicioComponent} from './componentes/inicio/inicio.component';
import { OrdenamientosComponent } from './componentes/ordenamientos/ordenamientos.component';
import { ArbolesComponent } from './componentes/arboles/arboles.component';
>>>>>>> 2264190e758e61d750ad1ad1448f55d7dcc0473c
const routes: Routes = [
  {
    path: "EstructurasLineales",
    component: EstructurasLinealesComponent
  },
  {
<<<<<<< HEAD
    path: "ListaSimple",
    component: ListaSimpleComponent
=======
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
>>>>>>> 2264190e758e61d750ad1ad1448f55d7dcc0473c
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
