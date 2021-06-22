import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            {
                path: 'listas-edd/:idTipoLista',
                loadChildren: () => import('./estructuras-lineales/listas-edd.module').then((m) => m.ListasEddModule)
            }
            ,
            {
                path: 'ordenamientos/:idOrdenamiento',
                loadChildren: () => import('./ordenamientos/ordenamientos.module').then((m) => m.OrdenamientosModule)
            }
            ,
            {
                path: 'seleccion',
                loadChildren: () => import('./ordenamientos/seleccion/seleccion.module').then((m) => m.SeleccionModule)
            }
            ,
            {
                path: 'insercion',
                loadChildren: () => import('./ordenamientos/insercion/insercion.module').then((m) => m.InsercionModule)
            }
            ,
            {
                path: 'quick',
                loadChildren: () => import('./ordenamientos/quick/quick.module').then((m) => m.QuickModule)
            }
            ,
            {
                path: 'Abb',
                loadChildren: () => import('./estructuras-arboreas/abb/abb.module').then((m) => m.AbbModule)
            }
            ,
            {
                path: 'Avl',
                loadChildren: () => import('./estructuras-arboreas/avl/avl.module').then((m) => m.AvlModule)
            }
            ,
            {
                path: 'B',
                loadChildren: () => import('./estructuras-arboreas/b/b.module').then((m) => m.BModule)
            }
            ,
            {
                path: 'BPlus',
                loadChildren: () => import('./estructuras-arboreas/bplus/bplus.module').then((m) => m.BplusModule)
            }
            ,
            {
                path: 'Merkle',
                loadChildren: () => import('./estructuras-arboreas/merkle/merkle.module').then((m) => m.MerkleModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
