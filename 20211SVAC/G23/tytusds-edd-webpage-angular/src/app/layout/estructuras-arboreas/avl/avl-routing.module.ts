import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvlComponent } from './avl.component';

const routes: Routes = [
    {
        path: '',
        component: AvlComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AvlRoutingModule {}
