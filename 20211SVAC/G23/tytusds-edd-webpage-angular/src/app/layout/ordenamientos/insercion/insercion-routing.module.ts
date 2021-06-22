import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsercionComponent } from './insercion.component';

const routes: Routes = [
    {
        path: '',
        component: InsercionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InsercionRoutingModule {}
