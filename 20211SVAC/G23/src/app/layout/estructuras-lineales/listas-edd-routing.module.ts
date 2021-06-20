import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListasEddComponent } from './listas-edd.component';

const routes: Routes = [
    {
        path: '',
        component: ListasEddComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListasEddRoutingModule {}
