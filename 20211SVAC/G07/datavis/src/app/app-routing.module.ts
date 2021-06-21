import { PilaComponent } from './pila/pila.component';
import { SeleccionComponent } from './seleccion/seleccion.component';
import { QuickComponent } from './quick/quick.component';
import { PrincipalComponent } from './principal/principal.component';
import { MerkleComponent } from './merkle/merkle.component';
import { ListasimpleComponent } from './listasimple/listasimple.component';
import { ListadobleComponent } from './listadoble/listadoble.component';
import { InsertComponent } from './insert/insert.component';
import { ColaprioridadComponent } from './colaprioridad/colaprioridad.component';
import { ColaComponent } from './cola/cola.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvlComponent } from './avl/avl.component';
import { BstComponent } from './bst/bst.component';
import { BtreeComponent } from './btree/btree.component';
import { BtreeplusComponent } from './btreeplus/btreeplus.component';
import { BubblesortComponent } from './bubblesort/bubblesort.component';
import { CirculardobleComponent } from './circulardoble/circulardoble.component';
import { CircularsimpleComponent } from './circularsimple/circularsimple.component';

const routes: Routes = [
  {
    path:'',
    component: PrincipalComponent
  },
  {
    path:'listasimple',
    component: ListasimpleComponent
  },
  {
    path:'listadoble',
    component: ListadobleComponent
  },
  {
    path:'pilaxd',
    component: PilaComponent
  },
  {
    path:'rapidoxd',
    component: QuickComponent
  },
  {
    path:'seleccionxd',
    component: SeleccionComponent
  },
  {
    path:'insercionxd',
    component: InsertComponent
  },
  {
    path:'colaxd',
    component: ColaComponent
  },
  {
    path:'colapriorixd',
    component: ColaprioridadComponent
  },
  {
    path:'circularsimpxd',
    component: CircularsimpleComponent
  },
  {
    path:'circulardoblexd',
    component: CirculardobleComponent
  },
  {
    path:'burbujaxd',
    component: BubblesortComponent
  },
  {
    path:'avlxd',
    component: AvlComponent
  },
  {
    path:'arbolbxd',
    component: BtreeComponent
  },
  {
    path:'arbolbplusxd',
    component: BtreeplusComponent
  },
  {
    path:'arbolbinxd',
    component: BstComponent
  },
  {
    path:'arbolmerklexd',
    component: MerkleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
