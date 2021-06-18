import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenamientosComponent } from './ordenamientos.component';

const routes: Routes = [
    {
        path: '',
        component: OrdenamientosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdenamientosRoutingModule {}
