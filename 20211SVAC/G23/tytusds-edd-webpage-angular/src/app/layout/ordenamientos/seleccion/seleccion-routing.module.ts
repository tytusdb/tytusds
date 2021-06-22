import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionComponent } from './seleccion.component';

const routes: Routes = [
    {
        path: '',
        component: SeleccionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeleccionRoutingModule {}
