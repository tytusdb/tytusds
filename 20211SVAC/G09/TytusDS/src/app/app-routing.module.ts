import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importando los componentes a usar
import { EstructurasLinealesComponent} from './componentes/estructuraslineales/estructuras-lineales.component';
import { ListaSimpleComponent} from "./componentes/lista-simple/lista-simple.component";
const routes: Routes = [
  {
    path: "EstructurasLineales",
    component: EstructurasLinealesComponent
  },
  {
    path: "ListaSimple",
    component: ListaSimpleComponent,
  }
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
