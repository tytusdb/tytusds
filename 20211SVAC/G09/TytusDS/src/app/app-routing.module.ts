import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importando los componentes a usar
import { EstructurasLinealesComponent} from './componentes/estructuraslineales/estructuras-lineales.component';
import {InicioComponent} from './componentes/inicio/inicio.component';
import { OrdenamientosComponent } from './componentes/ordenamientos/ordenamientos.component';
import { ArbolesComponent } from './componentes/arboles/arboles.component';

//Importando los subcomponentes de Cada componente
import { ListaSimpleComponent } from "./componentes/lista-simple/lista-simple.component";
const routes: Routes = [
  {path: "EstructurasLineales",    component: EstructurasLinealesComponent},
  {path: "Inicio",    component: InicioComponent},
  {path: "Ordenamientos",    component: OrdenamientosComponent},
  {path: "Arboles",    component: ArbolesComponent},
  //Subcomponentes
  {path:"listaSimple",  component: ListaSimpleComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
