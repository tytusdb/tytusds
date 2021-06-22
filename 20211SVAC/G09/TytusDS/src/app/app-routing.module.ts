import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importando los componentes a usar
import { EstructurasLinealesComponent} from './componentes/estructuraslineales/estructuras-lineales.component';
import {InicioComponent} from './componentes/inicio/inicio.component';
import { OrdenamientosComponent } from './componentes/ordenamientos/ordenamientos.component';
import { ArbolesComponent } from './componentes/arboles/arboles.component';

//Importando los subcomponentes de Cada componente
import { ListaSimpleComponent } from "./componentes/lista-simple/lista-simple.component";
import { ListaDobleEnlazadaComponent } from './componentes/lista-doble-enlazada/lista-doble-enlazada.component';
import { ListaCircularComponent } from './componentes/lista-circular/lista-circular.component';
import { ListaDobleCircularComponent } from './componentes/lista-doble-circular/lista-doble-circular.component';
import { PilaComponent } from './componentes/pila/pila.component';
import { ColaComponent } from './componentes/cola/cola.component';
import { ColaPrioridadComponent } from './componentes/cola-prioridad/cola-prioridad.component';
import { OrdenamientoBurbujaComponent } from './componentes/ordenamiento-burbuja/ordenamiento-burbuja.component';
import { OrdenamientoSeleccionComponent } from './componentes/ordenamiento-seleccion/ordenamiento-seleccion.component';
import { OrdenamientoInsercionComponent } from './componentes/ordenamiento-insercion/ordenamiento-insercion.component';
import { OrdenamientoRapidoComponent } from './componentes/ordenamiento-rapido/ordenamiento-rapido.component';
const routes: Routes = [
  {path: "EstructurasLineales",    component: EstructurasLinealesComponent},
  {path: "Inicio",    component: InicioComponent},
  {path: "Ordenamientos",    component: OrdenamientosComponent},
  {path: "Arboles",    component: ArbolesComponent},
  //Subcomponentes
  {path:"listaSimple",  component: ListaSimpleComponent},
  {path:"ListaDobleEnlazada", component:ListaDobleEnlazadaComponent},
  {path:"ListaCircular", component:ListaCircularComponent },
  {path:"ListaDobleCircular", component:ListaDobleCircularComponent},
  {path:"pila", component:PilaComponent},
  {path:"cola",component:ColaComponent},
  {path:"colaPrioridad", component:ColaPrioridadComponent},
  {path:"burbuja", component:OrdenamientoBurbujaComponent},
  {path:"seleccion", component:OrdenamientoSeleccionComponent},
  {path:"insercion", component:OrdenamientoInsercionComponent},
  {path:"rapido", component:OrdenamientoRapidoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
