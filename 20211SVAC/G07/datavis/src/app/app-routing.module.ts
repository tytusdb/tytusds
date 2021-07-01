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
import { ArbolMinimoComponent } from './arbol-minimo/arbol-minimo.component';
import { ColMajorComponent } from './col-major/col-major.component';
import { CostoUniformeComponent } from './costo-uniforme/costo-uniforme.component';
import { EstructurasCompuestasComponent } from './estructuras-compuestas/estructuras-compuestas.component';
import { FeistelComponent } from './feistel/feistel.component';
import { HammingComponent } from './hamming/hamming.component';
import { HashAbiertaComponent } from './hash-abierta/hash-abierta.component';
import { HashCerradoComponent } from './hash-cerrado/hash-cerrado.component';
import { HuffmanComponent } from './huffman/huffman.component';
import { LZWComponent } from './lzw/lzw.component';
import { MatricesDispersasComponent } from './matrices-dispersas/matrices-dispersas.component';
import { RBAnchuraGrafosComponent } from './rbanchura-grafos/rbanchura-grafos.component';
import { RBProfundidadGrafosComponent } from './rbprofundidad-grafos/rbprofundidad-grafos.component';
import { RowMajorComponent } from './row-major/row-major.component';
import { RSAComponent } from './rsa/rsa.component';

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
  },
  {
    path:'abierta',
    component: HashAbiertaComponent
  },
  {
    path:'cerrada',
    component: HashCerradoComponent
  },
  {
    path:'anchura',
    component: RBAnchuraGrafosComponent
  },
  {
    path:'prof',
    component: RBProfundidadGrafosComponent
  },
  {
    path:'uniforme',
    component: CostoUniformeComponent
  },
  {
    path:'minimo',
    component: ArbolMinimoComponent
  },
  {
    path:'hamming',
    component: HammingComponent
  },
  {
    path:'huffman',
    component: HuffmanComponent
  },
  {
    path:'LZW',
    component: LZWComponent
  },
  {
    path:'ESComp',
    component:EstructurasCompuestasComponent
  },
  {
    path:'RSA',
    component: RSAComponent
  },
  {
    path:'feistel',
    component: FeistelComponent
  },
  {
    path:'dispersas',
    component: MatricesDispersasComponent
  },
  {
    path:'row',
    component: RowMajorComponent
  },
  {
    path:'col',
    component: ColMajorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
